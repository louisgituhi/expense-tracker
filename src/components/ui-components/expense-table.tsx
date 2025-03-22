"use client"

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectLabel, SelectTrigger, SelectContent, SelectValue, SelectItem } from "../ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetFooter } from "../ui/sheet";

// icons 
import { Trash2 } from "lucide-react";

// db imports
import { init, i, type InstaQLEntity, id } from "@instantdb/react";
import { Edit } from "lucide-react";

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

type Expense = InstaQLEntity<typeof schema, "expenses">;

const db = init({ appId: APP_ID, schema })

function ExpenseTable({ expenses }: { expenses: Expense[] }) {

  const [isEditSheetOpen, setIsEditSheetOpen] = useState(false)
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null)
  const [formData, setFormData] = useState({
    trx_amount: 0,
    trx_cost: 0,
    category: "",
    payment_method: "",
    paid_on: new Date().getTime(),
  })

    function deleteExpense(expense: Expense) {
      db.transact(
        db.tx.expenses[expense.id].delete()
      );
    }

    function openEditSheet(expense: Expense) {
      setCurrentExpense(expense)
      setFormData({
        trx_amount: expense.trx_amount,
        trx_cost: expense.trx_cost,
        category: expense.category,
        payment_method: expense.payment_method,
        paid_on: expense.paid_on,
      })
      setIsEditSheetOpen(true)
    }
  
    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: name === "trx_amount" || name === "trx_cost" ? Number.parseFloat(value) : value,
      }))
    }
  
    function handleSelectChange(name: string, value: string) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  
    function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
      const date = new Date(e.target.value).getTime()
      setFormData((prev) => ({
        ...prev,
        paid_on: date,
      }))
    }
  
    function updateExpense() {
      if (!currentExpense) return
  
      db.transact(
        db.tx.expenses[currentExpense.id].update({
          trx_amount: formData.trx_amount,
          trx_cost: formData.trx_cost,
          category: formData.category,
          payment_method: formData.payment_method,
          paid_on: formData.paid_on,
        }),
      )
  
      setIsEditSheetOpen(false)
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
          return  "bg-orange-100 text-orange-500";
        case "housing":
          return  "bg-cyan-100 text-cyan-500";
        case "utilities":
          return  "bg-yellow-100 text-yellow-500";
        case "transport":
          return  "bg-blue-100 text-blue-500";
        case "entertainment":
          return  "bg-[#F0FFF0] text-[#90FCCF]";
        case "healthcare":
          return  "bg-green-100 text-green-500";
        case "shopping":
          return  "bg-pink-100 text-pink-500";
        case "airtime": 
          return  "bg-[#0BDA8F] text-[#023012]";
        case "haircut": 
          return  "bg-[#ED80E9] text-[#4F2B4E]";
        case "groceries": 
          return  "bg-[#FFA3DD] text-[#FD3DB5]";
        case "clothing":
          return  "bg-purple-100 text-purple-500";
        default:
          return  "bg-gray-100 text-gray-500";
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

    // Format date for input
  const formatDateForInput = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toISOString().split("T")[0]
  }
  
    return (
      <div className="flex items-center justify-between py-3">
        <Card className="w-full">
          <div className="flex items-center justify-between">
            <CardHeader>
              Transaction history
            </CardHeader>
          </div>
          <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                  <TableHead className="font-semibold text-black text-xs border border-gray-200 w-24">
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
                    .slice(0, 10)
                    .map((expense) => (
                    <TableRow key={expense.id} className="group relative">
                      <TableCell className="border border-gray-200 w-24">
  
                        <div className="flex items-center gap-2">
  
                          <Button
                            variant="outline"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-red-200 hover:text-red-500 hover:border-red-500"
                            onClick={() => deleteExpense(expense)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-blue-200 hover:text-blue-500 hover:border-blue-500"
                            onClick={() => openEditSheet(expense)}
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
        {/* Edit Expense Sheet */}
      <Sheet open={isEditSheetOpen} onOpenChange={setIsEditSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Edit Expense</SheetTitle>
            <SheetDescription>Make changes to your expense here. Click save when you're done.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trx_amount" className="text-right">
                Amount
              </Label>
              <Input
                id="trx_amount"
                name="trx_amount"
                type="number"
                value={formData.trx_amount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="trx_cost" className="text-right">
                Cost
              </Label>
              <Input
                id="trx_cost"
                name="trx_cost"
                type="number"
                value={formData.trx_cost}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="housing">Housing</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="shopping">Shopping</SelectItem>
                  <SelectItem value="airtime">Airtime</SelectItem>
                  <SelectItem value="haircut">Haircut</SelectItem>
                  <SelectItem value="groceries">Groceries</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="payment_method" className="text-right">
                Method
              </Label>
              <Select
                value={formData.payment_method}
                onValueChange={(value) => handleSelectChange("payment_method", value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mpesa">MPesa</SelectItem>
                  <SelectItem value="cheque">Cheque</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="bank_app">Bank App</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="paid_on" className="text-right">
                Date
              </Label>
              <Input
                id="paid_on"
                name="paid_on"
                type="date"
                value={formatDateForInput(formData.paid_on)}
                onChange={handleDateChange}
                className="col-span-3"
              />
            </div>
          </div>
          <SheetFooter>
            <Button onClick={updateExpense}>Save changes</Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      </div>
    )
  }

  export default ExpenseTable;