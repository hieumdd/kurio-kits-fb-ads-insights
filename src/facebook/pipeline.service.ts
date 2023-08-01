import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Joi from 'joi';
import ndjson from 'ndjson';

import { createLoadStream } from '../bigquery.service';
import { createTasks } from '../cloud-tasks.service';
import { ReportOptions, get } from './insights.service';
import * as pipelines from './pipeline.const';

dayjs.extend(utc);

export const runPipeline = async (reportOptions: ReportOptions, pipeline_: pipelines.Pipeline) => {
    const stream = await get(reportOptions, pipeline_.insightsConfig);

    return pipeline(
        stream,
        new Transform({
            objectMode: true,
            transform: (row, _, callback) => {
                callback(null, {
                    ...Joi.attempt(row, pipeline_.validationSchema),
                    _batched_at: dayjs().toISOString(),
                });
            },
        }),
        ndjson.stringify(),
        createLoadStream({
            table: `p_${pipeline_.name}__${reportOptions.accountId}`,
            schema: [...pipeline_.schema, { name: '_batched_at', type: 'TIMESTAMP' }],
        }),
    ).then(() => true);
};

export type CreatePipelineTasksOptions = {
    start?: string;
    end?: string;
};

export const createPipelineTasks = async ({ start, end }: CreatePipelineTasksOptions) => {
    const accounts = ['2126087831112839', '1025617681713252'];

    return createTasks(
        accounts.flatMap((accountId) => {
            return Object.keys(pipelines).map((pipeline) => ({ accountId, start, end, pipeline }));
        }),
        (task) => [task.pipeline, task.accountId].join(''),
    );
};
