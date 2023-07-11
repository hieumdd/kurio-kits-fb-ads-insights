import * as pipelines from './pipeline.const';
import { createPipelineTasks, runPipeline } from './pipeline.service';

it('pipeline', async () => {
    return runPipeline(
        {
            accountId: '2126087831112839',
            start: '2023-01-01',
            end: '2023-08-01',
        },
        pipelines.ACCOUNT_INSIGHTS,
    )
        .then((results) => expect(results).toBeDefined())
        .catch((error) => {
            console.error({ error });
            return Promise.reject(error);
        });
});

it('create-tasks', async () => {
    return createPipelineTasks({
        start: '2023-06-28',
        end: '2023-07-01',
    })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            console.error({ error });
            return Promise.reject(error);
        });
});
