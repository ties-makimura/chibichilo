import { UserProps } from "$server/models/user";

const users: readonly Omit<UserProps, "ltiConsumerId">[] = [
  {
    ltiUserId: "2",
    name: "Admin User",
    email: "",
  },
];

export default users;
