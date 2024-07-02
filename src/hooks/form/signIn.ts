import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  username: z
    .string({ required_error: "user name required" })
    .min(4, { message: "username most be 4 characters" }),
  password: z
    .string({ required_error: "password required" })
    .min(8, { message: "password most be 8 characters" }),
});

export type SignInFormSchemaType = z.infer<typeof schema>;

function useSignInForm() {
  return useForm<SignInFormSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
}

export { useSignInForm };
