"use client"

import { useState } from "react";

// react form 
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// icons 
import { Receipt, DollarSign, ListFilter, CreditCard } from "lucide-react";

// db imports
import { id, init, i, type InstaQLEntity } from "@instantdb/react";

// ID for app: expense-app
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string;

// schema declaration 
const schema = i.schema({
    entities: {
      expenses: i.entity({
        trx_amount: i.number(),
        trx_cost: i.number(),
        category: i.string(),
        payment_method: i.string(),
        paid_on: i.number(),
      })
    }
});

const formSchema = z.object({
  trx_amount: z.string().min(1, { message: "Transaction amount is required" }),
  trx_cost: z.string().min(1, { message: "Transaction cost is required" }),
  category: z.string().min(1, { message: "Please select a category" }),
  payment_method: z.string().min(1, { message: "Please select a payment method" }),
})

type Expense = InstaQLEntity<typeof schema, "expenses">;

const db = init({ appId: APP_ID, schema })

function ExpenseForm({
  onSuccess 
}: { 
    expenses: Expense[],
    onSuccess: () => void 
  }) {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trx_amount: "",
      trx_cost: "",
      category: "",
      payment_method: ""
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    form.reset()
    onSuccess()

    try {
      await db.transact(
        db.tx.expenses[id()].update({
          trx_amount: Number(values.trx_amount),
          trx_cost: Number(values.trx_cost),
          category: values.category,
          payment_method: values.payment_method,
          paid_on: Date.now()
        })
      )
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="trx_amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="0.00" className="pl-10" type="number" step="0.01" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="trx_cost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Cost</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Receipt className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input placeholder="0.00" className="pl-10" type="number" step="0.01" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <ListFilter className="h-4 w-4" />
                          <SelectValue placeholder="Select a category" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="transport">Transport</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="housing">Housing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="holiday">Holiday</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="payment_method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <SelectValue placeholder="Select a payment method" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="debit">Debit Card</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="bank_app">Bank App</SelectItem>
                      <SelectItem value="mpesa">Mpesa</SelectItem>
                      <SelectItem value="cheque">Cheque</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full text-green-500 bg-green-100" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ExpenseForm;