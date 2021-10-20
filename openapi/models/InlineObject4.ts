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
/**
 * 
 * @export
 * @interface InlineObject4
 */
export interface InlineObject4 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject4
     */
    json?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject4
     */
    file?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject4
     */
    provider: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject4
     */
    wowzaBaseUrl: string;
}

export function InlineObject4FromJSON(json: any): InlineObject4 {
    return InlineObject4FromJSONTyped(json, false);
}

export function InlineObject4FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject4 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'json': !exists(json, 'json') ? undefined : json['json'],
        'file': !exists(json, 'file') ? undefined : json['file'],
        'provider': json['provider'],
        'wowzaBaseUrl': json['wowzaBaseUrl'],
    };
}

export function InlineObject4ToJSON(value?: InlineObject4 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'json': value.json,
        'file': value.file,
        'provider': value.provider,
        'wowzaBaseUrl': value.wowzaBaseUrl,
    };
}


