import { pipelineService } from './facebook.service';
import { ADS_INSIGHTS } from './pipeline.const';

it('pipeline', async () => {
    return pipelineService(
        {
            accountId: '2126087831112839',
            start: '2023-02-01',
            end: '2023-03-01',
        },
        ADS_INSIGHTS,
    ).catch((err) => {
        console.error(err);
        return Promise.reject(err);
    });
});
