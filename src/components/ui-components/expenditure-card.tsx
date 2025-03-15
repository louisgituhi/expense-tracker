"use client"

import FormDialogue from "./form-dialogue"
import NavigationTab from "./navigation-tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

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

export default function ExpenseCard({ expenses }: { expenses: Expense[] }) {

  const totalAmount = expenses.reduce((acc, expense) => acc + expense.trx_amount, 0)
  const totalCost = expenses.reduce((acc, cost) => acc + cost.trx_cost, 0)

  return (

    <div className="w-full max-w-3xl mx-auto px-4">

      <div className="flex items-center justify-between mb-4">
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="#5de5b7" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-snowflake">
          <path d="m10 20-1.25-2.5L6 18"/>
          <path d="M10 4 8.75 6.5 6 6"/>
          <path d="m14 20 1.25-2.5L18 18"/>
          <path d="m14 4 1.25 2.5L18 6"/>
          <path d="m17 21-3-6h-4"/>
          <path d="m17 3-3 6 1.5 3"/>
          <path d="M2 12h6.5L10 9"/>
          <path d="m20 10-1.5 2 1.5 2"/>
          <path d="M22 12h-6.5L14 15"/>
          <path d="m4 10 1.5 2L4 14"/>
          <path d="m7 21 3-6-1.5-3"/>
          <path d="m7 3 3 6h4"/>
        </svg>

        <FormDialogue expenses={[]} />

      </div>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center">
            {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 text-green-300"
            >
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
            <span className="font-medium">Activity</span>
          </div>
          {/* <span className="text-sm text-muted-foreground">February 2025</span> */}
        </CardHeader>

          <CardContent className="pb-2">

            <span className=" text-lg font-semibold flex items-center gap-2 text-gray-400">
              <h3 className=" text-red-500">Ksh { totalAmount }</h3>
              ||
              <h3 className=" text-[#0F0E47]">{ totalCost }</h3>
            </span>

          </CardContent>
      </Card>

      <NavigationTab expenses={ expenses } />

    </div>
  )
}