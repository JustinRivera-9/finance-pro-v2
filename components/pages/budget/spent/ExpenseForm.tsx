import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExpenseSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

import type { Expense } from "@/types/types";
import { addExpenseAction, editExpenseAction } from "@/app/app/budget/actions";

type ExpenseFormProps = {
  category: string;
  expenseData?: Expense | null;
  setShowForm: (formOpen: boolean) => void;
  setExpenseData?: (expenseData: null) => void;
};

const ExpenseForm = ({
  category,
  expenseData,
  setShowForm,
  setExpenseData,
}: ExpenseFormProps) => {
  const { toast } = useToast();

  // Only for Edit scenarios
  const { amount, date, description, id } = expenseData || {};
  const isEdit = id ? true : false;

  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      amount: amount?.toString() || "",
      description: description || "",
      // @ts-ignore
      date: date || new Date() || null,
    },
  });
  const { formState, handleSubmit } = form;

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
              <input
                type="hidden"
                name={field.name}
                value={`${format(field.value, "P")}`}
              />
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
                    onSelect={(selectedDate) => {
                      field.onChange(
                        selectedDate ? selectedDate.toISOString() : ""
                      );
                    }}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    // initialFocus
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

        {/* HIDDEN CATEGORY INPUT */}
        <input type="hidden" name="category" value={category} />

        {/* HIDDEN ID INPUT FOR EDITING */}
        {isEdit && <input type="hidden" name="id" value={id} />}

        <div className="flex gap-2">
          {/* DISABLE BUTTON OPTION */}
          <Button
            type="submit"
            className="bg-accent text-dark"
            disabled={!formState.isDirty}
            onClick={() => {
              setShowForm(false);
              setExpenseData?.(null);
              toast({
                title: isEdit
                  ? `Successfully updated expense`
                  : `Successfully added expense`,
              });
            }}
          >
            {isEdit ? "Update" : "Add Expense"}
          </Button>

          {/* CANCEL BUTTON */}
          <Button
            variant="ghost"
            className="text-error text-md"
            onClick={() => {
              setShowForm(false);
              setExpenseData?.(null);
            }}
          >
            Cancel
          </Button>
        </div>

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
