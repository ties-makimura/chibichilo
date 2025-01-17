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
 * @interface InlineObject9
 */
export interface InlineObject9 {
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    event?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    detail?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    file?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    query?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    current?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    rid?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    uid?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    cid?: string;
    /**
     * 
     * @type {string}
     * @memberof InlineObject9
     */
    nonce?: string;
}

export function InlineObject9FromJSON(json: any): InlineObject9 {
    return InlineObject9FromJSONTyped(json, false);
}

export function InlineObject9FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineObject9 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'event': !exists(json, 'event') ? undefined : json['event'],
        'detail': !exists(json, 'detail') ? undefined : json['detail'],
        'file': !exists(json, 'file') ? undefined : json['file'],
        'query': !exists(json, 'query') ? undefined : json['query'],
        'current': !exists(json, 'current') ? undefined : json['current'],
        'rid': !exists(json, 'rid') ? undefined : json['rid'],
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
        'cid': !exists(json, 'cid') ? undefined : json['cid'],
        'nonce': !exists(json, 'nonce') ? undefined : json['nonce'],
    };
}

export function InlineObject9ToJSON(value?: InlineObject9 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'event': value.event,
        'detail': value.detail,
        'file': value.file,
        'query': value.query,
        'current': value.current,
        'rid': value.rid,
        'uid': value.uid,
        'cid': value.cid,
        'nonce': value.nonce,
    };
}


