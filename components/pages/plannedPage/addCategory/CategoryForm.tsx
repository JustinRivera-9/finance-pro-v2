"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { fixedDateArray } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { CategorySchema } from "@/schema";
import { CategoryFormData } from "@/types/types";
import { addCategoryAction } from "@/app/app/planned/actions";
import { useToast } from "@/hooks/use-toast";

const CategoryForm = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      type: "expense",
      category: "",
      amount: "",
      isFixed: false,
      date: null,
    },
  });

  const type = form.watch("type");
  const isFixed = form.watch("isFixed");
  const category = form.watch("category");

  return (
    <Form {...form}>
      <form action={addCategoryAction} className="space-y-4 px-8">
        <div className="flex justify-between">
          {/* CATEGORY TYPE SLEECT */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="w-1/3">
                <FormLabel>Category Type</FormLabel>
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
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* CATEGORY NAME INPUT */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* AMOUNT INPUT */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Amount" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-around">
          {/* IS FIXED CHECKBOX */}
          {type === "expense" && (
            <FormField
              control={form.control}
              name="isFixed"
              render={({ field }) => (
                <FormItem className="flex items-center justify-start space-x-3 py-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      name="isFixed"
                    />
                  </FormControl>
                  <FormLabel className="items-center">Fixed Expense?</FormLabel>
                </FormItem>
              )}
            />
          )}

          {/* FIXED DATE SLEECT */}
          {type === "expense" && isFixed && (
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  {/* <FormLabel>Date of Fixed Expense</FormLabel> */}
                  <Select
                    required
                    onValueChange={field.onChange}
                    defaultValue={field.value ?? undefined}
                    name="date"
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {fixedDateArray().map((date) => {
                          return (
                            <SelectItem key={date} value={date.toString()}>
                              {date.toString()}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <Button
          type="submit"
          className="bg-accent text-dark"
          onClick={() => {
            // Need to figure out how to handle error case
            toast({
              title: `Successfully added the ${category} category.`,
            });
          }}
        >
          Add Category
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
