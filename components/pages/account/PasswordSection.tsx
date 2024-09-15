"use client";
import { Button } from "@/components/ui/button";
import FormCard from "@/components/ui/FormCard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PasswordFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const PasswordSection = () => {
  // SET DEFAULT VALUES TO USER OBJECT
  // if (form field !== user object) => show update button --> means user has updated information
  const form = useForm<z.infer<typeof PasswordFormSchema>>({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof PasswordFormSchema>) => {
    console.log(values);
  };

  return (
    <FormCard title="Password" description="Update your password.">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
          {/* CURRENT PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="currentPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NEW PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CONFIRM PASSWORD FIELD */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cofirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* MAKE UPDATE BUTTON CONDITIONAL BASED ON DIRTY/MODIFIED FIELD */}
          <Button type="submit" className="bg-accent text-dark w-1/3 mt-2">
            Update
          </Button>
        </form>
      </Form>
    </FormCard>
  );
};

export default PasswordSection;
