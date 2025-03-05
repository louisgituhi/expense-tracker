"use client"

import { useState } from "react";
import ExpenseForm from "./expense-form";

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
  
  type Expense = InstaQLEntity<typeof schema, "expenses">

// shadcn components 
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTrigger, DialogTitle } from "@/components/ui/dialog";

function FormDialogue({ expenses }: { expenses: Expense[] }) {

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

export default FormDialogue;