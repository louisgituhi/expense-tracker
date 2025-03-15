"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs"
import ExpenditureList from "./expenditure-list"
import ExpenseChart from "./expense-chart"
import ExpenseTable from "./expense-table"

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

export default function NavigationTab({ expenses }: { expenses: Expense[] } ) {

    const [activeTab, setActiveTab] = useState("summary")

    return (
        <Tabs defaultValue="summary" className="w-full mt-10" onValueChange={setActiveTab}>

            <div className="flex justify-center w-full">

                <TabsList>

                    <TabsTrigger value="summary" className="px-4">
                        Summary
                    </TabsTrigger>

                    <TabsTrigger value="expense-chart" className="px-4">
                        All Expenses
                    </TabsTrigger>

                </TabsList>

            </div>

                <TabsContent value="summary" className="mt-4">
                    <ExpenditureList expenses={ expenses } />
                </TabsContent>

                <TabsContent value="expense-chart" className="mt-4">
                    <ExpenseChart expenses={ expenses } />
                    {/* <ExpenseTable expenses={ expenses } /> */}
                </TabsContent>

        </Tabs>
    )
}