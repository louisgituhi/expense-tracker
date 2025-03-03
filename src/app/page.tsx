"use client"

import { useState } from "react";

// react form 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// icons 
import { ChevronRight, Receipt, DollarSign, ListFilter, CreditCard, Trash2, Edit, TrendingUp } from "lucide-react";

// shad components 
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle, CardContent, CardHeader, CardFooter, CardDescription } from "@/components/ui/card";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Bar, BarChart,CartesianGrid,Label,XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// db imports
import { id, init, i, type InstaQLEntity } from "@instantdb/react";

// ID for app: finance-app
const APP_ID = "e1067022-0a5c-472c-a97b-b3caf26ac02d";

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

type Finance = InstaQLEntity<typeof schema, "expenses">;

const db = init({ appId: APP_ID, schema })

function App () {

  // Read Data
  const { isLoading, error, data } = db.useQuery({ expenses: {} });
  if (isLoading) {
    return;
  }
  if (error) {
    return <div className="text-red-500 p-4">Error: {error.message}</div>;
  }
  const { expenses } = data;

  return (

    <div className="flex justify-center items-center p-4">
  
      <div className="w-full overflow-hidden rounded-3xl text-black shadow-xl">

        {/* Balance Section */}
        <div className="px-4 pt-2">
          <div className="text-xs text-gray-400 flex items-center">
            Total Expenses <ChevronRight className="h-3 w-3 ml-1" />
          </div>
          <div className="flex justify-between items-center mt-1 text-rose-500">
              <div className="text-3xl font-bold">
                KSh {expenses.map(expense => expense.trx_amount + expense.trx_cost).reduce((acc, curr) => acc + curr, 0).toFixed(2)}
              </div>
            <FormDialogue expenses={[]} />
          </div>
        </div>
            

        {/* Tabs */}
        <div className="flex mt-4 px-4 border-b border-gray-800">
          <div className="pb-2 px-2 border-b-2 border-white font-medium text-sm">All Exps</div>
          <div className="pb-2 px-2 text-gray-400 text-sm">All costs</div>
        </div>

        {/* Expense chart  */}
        <ExpenseChart expenses={ expenses } />

        {/* Expense list */}
        <div className="px-2 pb-20">
          <ExpenseTable expenses={ expenses } />
        </div>

      </div>
    </div>
  )
}

function FormDialogue({ expenses }: { expenses: Finance[] }) {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-green-500 bg-green-100">New EXP</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Expense</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ExpenseForm expenses={ expenses } onSuccess={() => setOpen(false)} />
        </div>

      </DialogContent>
    </Dialog>
  )
}

// ui comps
function ExpenseForm({ 
  expenses,
  onSuccess 
}: { 
    expenses: Finance[],
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

// expense list 
function ExpenseTable({ expenses }: { expenses: Finance[] }) {

  const [selectedRows, setSelectedRows] = useState<string[]>([])

  // Toggle selection of a row
  const toggleRowSelection = (id: string) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  // Select or deselect all rows
  const toggleAllRows = () => {
    if (selectedRows.length === expenses.length) {
      setSelectedRows([])
    } else {
      setSelectedRows(expenses.map((expense) => expense.id))
    }
  }

   // Handle delete action
   const handleDelete = () => {
    // Implement delete functionality here
    console.log("Deleting rows:", selectedRows)
    // After deletion, clear selection
    setSelectedRows([])
  }

  // Handle edit action
  const handleEdit = (id: string) => {
    // Implement edit functionality here
    console.log("Editing row:", id)
  }

  // function get method styling
  const getMethodStyle = (payment_method: string) => {
    switch (payment_method.toLowerCase()) {
      case "mpesa":
        return "bg-green-100 text-green-500"
      case "cheque":
        return "bg-blue-950 text-blue-100"
      case "debit":
        return "bg-rose-100 text-rose-500"
      case "cash":
        return "bg-amber-100 text-amber-500"
      case "credit":
        return "bg-purple-100 text-purple-500"
      case "bank_app":
        return "bg-blue-100 text-blue-500"
      case "other":
        return "bg-gray-100 text-gray-500"
    }
  }
  // Function to get category styling
  const getCategoryStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "food":
        return "bg-orange-100 text-orange-500"
      case "housing":
        return "bg-cyan-100 text-cyan-500"
      case "utilities":
        return "bg-yellow-100 text-yellow-500"
      case "transport":
        return "bg-blue-100 text-blue-500"
      case "entertainment":
        return "bg-purple-100 text-purple-500"
      case "healthcare":
        return "bg-green-100 text-green-500"
      case "shopping":
        return "bg-pink-100 text-pink-500"
      case "holiday":
        return "bg-teal-100 text-teal-500"
      case "clothing":
        return "bg-purple-100 text-purple-500"
      default:
        return "bg-gray-100 text-gray-500"
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KSh"
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string | number) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="flex items-center justify-between py-3">
      <Card className="w-full">
        <div className="flex items-center justify-between">
          <CardHeader>
            {selectedRows.length > 0 && (
              <Button variant="destructive" size="sm" className="flex items-center gap-2" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                Delete {selectedRows.length > 1 ? "rows" : "row"} ({selectedRows.length})
              </Button>
            )}
          </CardHeader>
        </div>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200 w-12">
                    <Checkbox
                      checked={selectedRows.length === expenses.length && expenses.length > 0}
                      onCheckedChange={toggleAllRows}
                      aria-label="Select all rows"
                      className=" rounded-none"
                    />
                  </TableHead>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200">Category</TableHead>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200">Trx Amount</TableHead>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200">Trx Cost</TableHead>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200">Method</TableHead>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className=" text-gray-500 text-xs">
                { expenses
                  .sort((a,b) => new Date(b.paid_on).getTime() - new Date(a.paid_on).getTime())
                  .map((expense) => (
                  <TableRow key={expense.id} className="group relative">
                    <TableCell className="border border-gray-200 w-24">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedRows.includes(expense.id)}
                          onCheckedChange={() => toggleRowSelection(expense.id)}
                          aria-label={`Select row ${expense.id}`}
                          className=" rounded-none"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                          onClick={() => handleEdit(expense.id)}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className=" border border-gray-200">
                      <span className={`px-2 py-1 rounded-md ${getCategoryStyle(expense.category)}`}>
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className=" border border-gray-200">{formatCurrency(expense.trx_amount)}</TableCell>
                    <TableCell className=" border border-gray-200">{formatCurrency(expense.trx_cost)}</TableCell>
                    <TableCell className=" border border-gray-200">
                      <span className={`px-2 py-1 rounded-md ${getMethodStyle(expense.payment_method)}`}>
                        { expense.payment_method}
                      </span>
                    </TableCell>
                    <TableCell className=" border border-gray-200">{formatDate(expense.paid_on)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}

function ExpenseChart({ expenses }: { expenses: Finance[] }) {

  const chartData = expenses.map(expense => ({
    month: "May",
    trx_amount: expense.trx_amount,
    trx_cost: expense.trx_cost
  }))

  const chartConfig = {
    desktop: {
      label: "trx_amount",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "trx_cost",
      color: "hsl(var(--chart-2))",
    }
  } satisfies ChartConfig

  return (
    <Card className=" mt-4 ">
      <CardHeader>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="trx_amount"
              stackId="a"
              fill="var(--color-trx_amount)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="trx_cost"
              stackId="a"
              fill="var(--color-trx_cost)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>

  )
}
export default App;