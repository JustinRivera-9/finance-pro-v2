"use client";
import { submitContactFormAction } from "@/app/app/settings/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import FormCard from "@/components/ui/FormCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ContactFormSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ContactForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      type: "feature",
      message: "",
    },
  });

  const { formState } = form;

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-10/12 mx-auto pb-4"
        // @ts-ignore
        action={submitContactFormAction}
      >
        {/* TYPE SELECT */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select
                required
                onValueChange={field.onChange}
                defaultValue={field.value}
                name="type"
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="feature">Feature Idea</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="customerService">
                      Customer Service
                    </SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* MESSAGE TEXTAREA */}
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Let us know how we are doing or help improve the experience!"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Only shows submit button if message input has something */}
        {formState.dirtyFields.message && (
          <Button
            type="submit"
            className="bg-accent text-dark w-1/3"
            onClick={() => {
              // Need to figure out how to handle error case
              toast({
                title:
                  "Thank you for the message. We will review as soon as possible!",
              });
            }}
          >
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
};

export default ContactForm;
