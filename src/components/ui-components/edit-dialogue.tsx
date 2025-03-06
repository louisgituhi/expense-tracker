import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

import ExpenseForm from "./expense-form";

// icons 
import {  Edit } from "lucide-react";

// db imports
import { i, type InstaQLEntity } from "@instantdb/react";

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

function EditDialogue({ expenses }: { expenses: Expense[] }) {

  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>

        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 hover:bg-blue-200 hover:text-blue-500 hover:border-blue-500"
        >
        <Edit className="h-4 w-4" />
        <span className="sr-only">Edit</span>
        </Button>
        
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

export default EditDialogue;