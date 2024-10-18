import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ExpenseSchema } from "@/schema";
import { useToast } from "@/hooks/use-toast";
import type { Expense } from "@/types/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  addExpenseAction,
  editExpenseAction,
} from "@/app/app/spent/[month]/actions";

type ExpenseFormProps = {
  category: string;
  expenseData?: Expense;
};

const ExpenseForm = ({ category, expenseData }: ExpenseFormProps) => {
  const { amount, date, description } = expenseData || {};
  const isEdit = expenseData?.id ? true : false;

  const { toast } = useToast();

  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      amount: amount?.toString() || "",
      description: description || "",
      date: new Date() || date || null,
    },
  });

  const { formState } = form;

  // const amountWatch = form.watch("amount");
  // const descriptionWatch = form.watch("description");
  // const dateWatch = form.watch("date");

  return (
    <Form {...form}>
      <form
        action={isEdit ? editExpenseAction : addExpenseAction}
        className="space-y-4 px-8"
      >
        {/* AMOUNT INPUT */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter Amount" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* DATE PICKER */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Expense Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* EXPENSE DESCRIPTION INPUT */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Expense Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expense description"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HIDDEN CATEGORY INPUT FOR EDITING */}
        <input type="hidden" name="category" value={category} />

        {/* HIDDEN ID INPUT FOR EDITING */}
        {isEdit && <input type="hidden" name="id" value={expenseData?.id} />}

        {/* DISABLE BUTTON OPTION */}
        <Button
          type="submit"
          className="bg-accent text-dark"
          disabled={!formState.isDirty}
          onClick={() => {
            // Need to figure out how to handle error case
            toast({
              title: isEdit
                ? `Successfully updated expense`
                : `Successfully added expense`,
            });
          }}
        >
          {isEdit ? "Update" : "Add Expense"}
        </Button>

        {/* HIDE BUTTON OPTION */}
        {/* {formState.isDirty && (
          <Button
            type="submit"
            className="bg-accent text-dark"
            disabled={!formState.isDirty}
            onClick={() => {
              // Need to figure out how to handle error case
              toast({
                title: isEdit
                  ? `Successfully updated expense`
                  : `Successfully added expense`,
              });
            }}
          >
            {isEdit ? "Update" : "Add Expense"}
          </Button>
        )} */}
      </form>
    </Form>
  );
};

export default ExpenseForm;
