import Joi from 'joi';

import { InsightsConfig } from './insights.service';

export type Pipeline = {
    name: string;
    insightsConfig: InsightsConfig;
    validationSchema: Joi.Schema;
    schema: Record<string, any>[];
};

const actionBreakdownSchema = Joi.array()
    .items({ action_type: Joi.string(), value: Joi.number() })
    .optional();

export const ADS_INSIGHTS: Pipeline = {
    name: 'AdsInsights',
    insightsConfig: {
        level: 'ad',
        fields: [
            'date_start',
            'date_stop',
            'account_id',
            'campaign_id',
            'campaign_name',
            'adset_id',
            'adset_name',
            'ad_id',
            'ad_name',
            'clicks',
            'cpc',
            'cpm',
            'ctr',
            'frequency',
            'impressions',
            'inline_link_click_ctr',
            'inline_link_clicks',
            'reach',
            'spend',
            'video_30_sec_watched_actions',
            'video_avg_time_watched_actions',
            'video_p100_watched_actions',
            'video_p25_watched_actions',
            'video_p50_watched_actions',
            'video_p75_watched_actions',
            'video_p95_watched_actions',
            'video_play_actions',
            'actions',
            'action_values',
        ],
    },
    validationSchema: Joi.object({
        date_start: Joi.string(),
        date_stop: Joi.string(),
        account_id: Joi.number().unsafe(),
        campaign_id: Joi.number().unsafe(),
        campaign_name: Joi.string(),
        adset_id: Joi.number().unsafe(),
        adset_name: Joi.string(),
        ad_id: Joi.number().unsafe(),
        ad_name: Joi.string(),
        clicks: Joi.number().optional(),
        cpc: Joi.number().optional(),
        cpm: Joi.number().optional(),
        ctr: Joi.number().optional(),
        frequency: Joi.number().optional(),
        impressions: Joi.number().optional(),
        inline_link_click_ctr: Joi.number().optional(),
        inline_link_clicks: Joi.number().optional(),
        reach: Joi.number().optional(),
        spend: Joi.number().optional(),
        video_30_sec_watched_actions: actionBreakdownSchema,
        video_avg_time_watched_actions: actionBreakdownSchema,
        video_p100_watched_actions: actionBreakdownSchema,
        video_p25_watched_actions: actionBreakdownSchema,
        video_p50_watched_actions: actionBreakdownSchema,
        video_p75_watched_actions: actionBreakdownSchema,
        video_p95_watched_actions: actionBreakdownSchema,
        video_play_actions: actionBreakdownSchema,
        actions: actionBreakdownSchema,
        action_values: actionBreakdownSchema,
    }),
    schema: [
        { name: 'date_start', type: 'DATE' },
        { name: 'date_stop', type: 'DATE' },
        { name: 'account_id', type: 'NUMERIC' },
        { name: 'campaign_id', type: 'NUMERIC' },
        { name: 'campaign_name', type: 'STRING' },
        { name: 'adset_id', type: 'NUMERIC' },
        { name: 'adset_name', type: 'STRING' },
        { name: 'ad_id', type: 'NUMERIC' },
        { name: 'ad_name', type: 'STRING' },
        { name: 'clicks', type: 'NUMERIC' },
        { name: 'cpc', type: 'NUMERIC' },
        { name: 'cpm', type: 'NUMERIC' },
        { name: 'ctr', type: 'NUMERIC' },
        { name: 'frequency', type: 'NUMERIC' },
        { name: 'impressions', type: 'NUMERIC' },
        { name: 'inline_link_click_ctr', type: 'NUMERIC' },
        { name: 'inline_link_clicks', type: 'NUMERIC' },
        { name: 'reach', type: 'NUMERIC' },
        { name: 'spend', type: 'NUMERIC' },
        {
            name: 'actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'action_values',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_30_sec_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_avg_time_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_p100_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_p25_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_p50_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_p75_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_p95_watched_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
        {
            name: 'video_play_actions',
            type: 'RECORD',
            mode: 'REPEATED',
            fields: [
                { name: 'action_type', type: 'STRING' },
                { name: 'value', type: 'NUMERIC' },
            ],
        },
    ],
};
