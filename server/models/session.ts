import {
  LtiResourceLinkSchema,
  ltiResourceLinkSchema,
} from "./ltiResourceLink";
import { UserSchema, userSchema } from "$server/models/user";
import { OauthClientSchema } from "./oauthClient";
import { LtiVersionSchema } from "./ltiVersion";
import { LtiUserSchema } from "./ltiUser";
import { LtiRolesSchema } from "./ltiRoles";
import { LtiResourceLinkRequestSchema } from "./ltiResourceLinkRequest";
import { LtiContextSchema } from "./ltiContext";
import { LtiLaunchPresentationSchema } from "./ltiLaunchPresentation";
import { SystemSettingsSchema } from "./systemSettings";

/** セッション */
export type SessionSchema = {
  oauthClient: OauthClientSchema;
  ltiVersion: LtiVersionSchema;
  ltiUser: LtiUserSchema;
  ltiRoles: LtiRolesSchema;
  ltiResourceLinkRequest: LtiResourceLinkRequestSchema;
  ltiContext: LtiContextSchema;
  ltiLaunchPresentation?: LtiLaunchPresentationSchema;
  ltiResourceLink: null | LtiResourceLinkSchema;
  user: UserSchema;
  systemSettings: SystemSettingsSchema;
};

export const sessionSchema = {
  description: "セッション情報",
  type: "object",
  required: [
    "oauthClient",
    "ltiVersion",
    "ltiUser",
    "ltiRoles",
    "ltiResourceLinkRequest",
    "ltiContext",
    "user",
    "systemSettings",
  ],
  properties: {
    oauthClient: OauthClientSchema,
    ltiVersion: LtiVersionSchema,
    ltiUser: LtiUserSchema,
    ltiRoles: LtiRolesSchema,
    ltiResourceLinkRequest: LtiResourceLinkRequestSchema,
    ltiContext: LtiContextSchema,
    ltiLaunchPresentation: LtiLaunchPresentationSchema,
    ltiResourceLink: {
      ...ltiResourceLinkSchema,
      nullable: true,
    },
    user: userSchema,
    systemSettings: SystemSettingsSchema,
  },
  additionalProperties: false,
} as const;
