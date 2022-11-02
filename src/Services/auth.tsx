import { apiCaller } from "../Utils/RestApi";
export const Login = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<{ token: string }> =>
  apiCaller(
    `/login`,
    {
      email,
      password,
    },
    "post"
  );
