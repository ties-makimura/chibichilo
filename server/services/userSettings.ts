import { FastifyRequest, FastifySchema } from "fastify";
import authUser from "$server/auth/authUser";
import { updateUserSettings } from "$server/utils/user";
import {
  UserSettingsProp,
  userSettingsPropSchema,
} from "$server/validators/userSettings";

export type Prop = UserSettingsProp;

const updateSchema: FastifySchema = {
  summary: "ユーザー設定値の更新",
  description: "ユーザーの設定内容を更新し、セッションとdbに保存します。",
  body: userSettingsPropSchema,
  response: {
    200: {},
  },
};

export const Schema = {
  put: updateSchema,
};

export const Hooks = {
  put: {
    auth: [authUser],
  },
};

export async function update({
  session,
  body,
}: FastifyRequest<{ Body: UserSettingsProp }>) {
  Object.assign(session.user.settings, body);
  await updateUserSettings(session.user.id, session.user.settings);

  return {
    status: 200,
    body: {},
  };
}
