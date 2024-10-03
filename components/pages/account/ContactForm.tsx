"use client";
import { submitContactFormAction } from "@/app/app/account/actions";
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
      type: "feedback",
      message: "",
    },
  });

  const { formState } = form;

  return (
    <FormCard
      title="Contact Us"
      description="Get in touch with us by filling out the form below, and we'll respond as soon as possible."
    >
      <Form {...form}>
        <form className="flex flex-col gap-4" action={submitContactFormAction}>
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
                    placeholder="Let us know how we are doing or help improve the experience by reporting bugs and ideas for feature imporovements!"
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
    </FormCard>
  );
};

export default ContactForm;
