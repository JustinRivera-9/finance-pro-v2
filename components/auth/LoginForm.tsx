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
import BackBtn from "./BackBtn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export default function LoginFormV2() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <BackBtn />
      <Card className="bg-neutral-700">
        <CardHeader>
          <CardTitle className="text-2xl text-light">Welcome Back</CardTitle>
          <CardDescription>Login to your Finance Pro account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form action={login} className="flex flex-col gap-4 mx-auto">
              {/* EMAIL INPUT */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter email"
                        type="email"
                        {...field}
                      />
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
                    <div className="flex items-center justify-between">
                      <FormLabel>Password</FormLabel>
                      <p className="text-sm text-light/70">Forgot password?</p>
                    </div>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* LOGIN AND SIGN UP BUTTONS */}
              <div className="flex flex-col gap-2 py-2 items-center">
                <Button className="w-full">Login</Button>
                <div className="text-sm text-light/70">
                  Do not have an account?{" "}
                  <Link href="signup" className="text-secondary underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
