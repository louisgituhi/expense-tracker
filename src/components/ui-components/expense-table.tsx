import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableCell, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import EditDialogue from "./edit-dialogue";

// icons 
import { Trash2 } from "lucide-react";

// db imports
import { init, i, type InstaQLEntity } from "@instantdb/react";

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

    function deleteExpense(expense: Expense) {
      db.transact(
        db.tx.expenses[expense.id].delete()
      );
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
          return  "bg-[#FD5E53] text-[#E2544A]";
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
  
                          <EditDialogue expenses={[]} />
  
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

  export default ExpenseTable;