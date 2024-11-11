"use client";
import { login } from "@/app/auth/login/actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form action={login} className="flex flex-col gap-4 w-10/12 mx-auto">
        {/* EMAIL INPUT */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PASSWORD INPUT */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="******" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 py-2">
          <Button className="w-full">Login</Button>
          <div>
            Do not have an account?{" "}
            <Link href="signup" className="text-secondary underline">
              Sign Up
            </Link>{" "}
            here
          </div>
        </div>
      </form>
    </Form>

    // <form className="pt-8 flex flex-col gap-4 justify-center items-stretch w-full px-8">
    //   <div className="flex gap-4 items-center">
    //     <Label htmlFor="email" className="text-lg">
    //       Email:
    //     </Label>
    //     <Input
    //       className="text-light"
    //       id="email"
    //       name="email"
    //       type="email"
    //       required
    //     />
    //   </div>
    //   <div className="flex gap-4 items-center">
    //     <Label htmlFor="password" className="text-lg">
    //       Password:
    //     </Label>
    //     <Input
    //       className="text-light"
    //       id="password"
    //       name="password"
    //       type="password"
    //       required
    //     />
    //   </div>
    //   <div className="flex justify-center items-center gap-4">
    //     <button
    //       formAction={login}
    //       className="text-dark bg-accent rounded-lg py-2 px-6"
    //     >
    //       Log in
    //     </button>
    //     <button formAction={signup}>Sign up</button>
    //   </div>
    // </form>
  );
}
