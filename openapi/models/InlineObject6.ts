/* tslint:disable */
/* eslint-disable */
/**
 * chibichilo-server
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    ApiV2TopicTopicIdActivityTimeRanges,
    ApiV2TopicTopicIdActivityTimeRangesFromJSON,
    ApiV2TopicTopicIdActivityTimeRangesFromJSONTyped,
    ApiV2TopicTopicIdActivityTimeRangesToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject6
 */
export interface InlineObject6 {
    /**
     * 
     * @type {Array<ApiV2TopicTopicIdActivityTimeRanges>}
     * @memberof InlineObject6
     */
    timeRanges?: Array<ApiV2TopicTopicIdActivityTimeRanges>;
}

export function InlineObject6FromJSON(json: any): InlineObject6 {
    return InlineObject6FromJSONTyped(json, false);
}

export function InlineObject6FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject6 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'timeRanges': !exists(json, 'timeRanges') ? undefined : ((json['timeRanges'] as Array<any>).map(ApiV2TopicTopicIdActivityTimeRangesFromJSON)),
    };
}

export function InlineObject6ToJSON(value?: InlineObject6 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'timeRanges': value.timeRanges === undefined ? undefined : ((value.timeRanges as Array<any>).map(ApiV2TopicTopicIdActivityTimeRangesToJSON)),
    };
}

