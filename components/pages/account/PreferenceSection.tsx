"use client";
import FormCard from "@/components/ui/FormCard";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  Form,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AccountPreferencesSchema } from "@/schema";
import { useUser } from "@/context/UserContext";
import { updatePreferencesAction } from "@/app/app/account/actions";

const PreferenceSection = () => {
  const user = useUser();

  // SET DEFAULT VALUES TO USER OBJECT
  // if (form field !== user object) => show update button --> means user has updated information

  const form = useForm<z.infer<typeof AccountPreferencesSchema>>({
    defaultValues: {
      emailNotifications: true,
      darkMode: false,
    },
  });
  const { formState } = form;

  return (
    <FormCard
      title="Account Preferences"
      description="Manage your account preferences."
    >
      <Form {...form}>
        <form action={updatePreferencesAction} className="flex flex-col gap-4">
          {/* EMAIL NOTIFICATIONS SWITCH */}
          <FormField
            control={form.control}
            name="emailNotifications"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">
                    Email Notifications
                  </FormLabel>
                  <FormDescription className="text-light">
                    Receive emails about new products, features, and more.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    name="emailNotifications"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* DARK MODE SWITCH */}
          <FormField
            control={form.control}
            name="darkMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Dark Mode</FormLabel>
                  <FormDescription className="text-light">
                    Switch to a dark color scheme.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    name="darkMode"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
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
    </FormCard>
  );
};

export default PreferenceSection;
