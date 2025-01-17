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
    ApiV2TopicTopicIdResource,
    ApiV2TopicTopicIdResourceFromJSON,
    ApiV2TopicTopicIdResourceFromJSONTyped,
    ApiV2TopicTopicIdResourceToJSON,
} from './';

/**
 * 
 * @export
 * @interface InlineObject6
 */
export interface InlineObject6 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject6
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject6
     */
    language?: string;
    /**
     * 
     * @type {number}
     * @memberof InlineObject6
     */
    timeRequired?: number;
    /**
     * 
     * @type {boolean}
     * @memberof InlineObject6
     */
    shared?: boolean;
    /**
     * 
     * @type {string}
     * @memberof InlineObject6
     */
    description?: string;
    /**
     * 
     * @type {ApiV2TopicTopicIdResource}
     * @memberof InlineObject6
     */
    resource?: ApiV2TopicTopicIdResource;
}

export function InlineObject6FromJSON(json: any): InlineObject6 {
    return InlineObject6FromJSONTyped(json, false);
}

export function InlineObject6FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject6 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'language': !exists(json, 'language') ? undefined : json['language'],
        'timeRequired': !exists(json, 'timeRequired') ? undefined : json['timeRequired'],
        'shared': !exists(json, 'shared') ? undefined : json['shared'],
        'description': !exists(json, 'description') ? undefined : json['description'],
        'resource': !exists(json, 'resource') ? undefined : ApiV2TopicTopicIdResourceFromJSON(json['resource']),
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
        
        'name': value.name,
        'language': value.language,
        'timeRequired': value.timeRequired,
        'shared': value.shared,
        'description': value.description,
        'resource': ApiV2TopicTopicIdResourceToJSON(value.resource),
    };
}


