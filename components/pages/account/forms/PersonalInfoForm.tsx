"use client";
import { updatePersonalInfoAction } from "@/app/app/account/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import FormCard from "@/components/ui/FormCard";
import { Input } from "@/components/ui/input";
import { PersonalInfoFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type PersonalInfoFormProps = {
  data: {
    name: string;
    email: string | undefined;
  };
};

const PersonalInfoForm = ({ data }: PersonalInfoFormProps) => {
  const { name, email } = data;

  // SET DEFAULT VALUES TO USER OBJECT
  // if (form field !== user object) => show update button --> means user has updated information

  const form = useForm<z.infer<typeof PersonalInfoFormSchema>>({
    resolver: zodResolver(PersonalInfoFormSchema),
    defaultValues: {
      fullName: name || "",
      email: email || "",
    },
  });

  const { formState } = form;

  return (
    <>
      <Form {...form}>
        <form
          action={updatePersonalInfoAction}
          className="flex flex-col gap-2 w-10/12 mx-auto"
        >
          {/* FULL NAME INPUT */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {formState.isDirty && (
            <Button type="submit" className="bg-accent text-dark w-1/3 mt-2">
              Update
            </Button>
          )}
        </form>
      </Form>
    </>
  );
};

export default PersonalInfoForm;
