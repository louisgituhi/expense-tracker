"use client"

import { ArrowUp, ArrowDown } from "lucide-react";
import FormDialogue from "./form-dialogue"
import NavigationTab from "./navigation-tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

import { init, i, type InstaQLEntity } from "@instantdb/react";

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


const formatDate = (dateString: string | number) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

const getYesterdayDate = () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return formatDate(yesterday.getTime())
}

export default function ExpenseCard({ expenses }: { expenses: Expense[] }) {

  const today = formatDate(Date.now());
  const yesterday = getYesterdayDate()

  const todaysExpenses = expenses.filter((expense) => formatDate(expense.paid_on) === today)
  const yesterdaysExpenses = expenses.filter((expense) => formatDate(expense.paid_on) === yesterday)

  const todaysTotal = todaysExpenses.reduce((acc, expense) => acc + expense.trx_amount, 0)
  const yesterdaysTotal = yesterdaysExpenses.reduce((acc, expense) => acc + expense.trx_amount, 0)

  const todaysCost = todaysExpenses.reduce((acc, expense) => acc + expense.trx_cost, 0)

  // Calculate percentage difference
  let percentageDiff = 0
  let isIncrease = false

  if (yesterdaysTotal > 0) {
    percentageDiff = Math.abs(((todaysTotal - yesterdaysTotal) / yesterdaysTotal) * 100)
    isIncrease = todaysTotal > yesterdaysTotal
  } else if (todaysTotal > 0) {
    // If yesterday was 0 but today has expenses, it's a 100% increase
    percentageDiff = 100
    isIncrease = true
  }

  return (

    <div className="w-full max-w-3xl mx-auto px-4">

      <div className="flex items-center justify-between mb-4">
       
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
          <title>svg</title>
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

          <div className="flex items-center gap-1">

          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#36ec97" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="lucide lucide-chart-spline">
            <title>svg</title>
            <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
            <path d="M7 16c.5-2 1.5-7 4-7 2 0 2 3 4 3 2.5 0 4.5-5 5-7"/>
          </svg>

            <span className="font-medium ">Todays expenses</span>

          </div>

          <span className="text-sm text-muted-foreground">{ today }</span>

        </CardHeader>

          <CardContent className="flex flex-row items-center justify-between pb-2">

            <span className=" text-lg font-semibold flex items-center gap-2 text-gray-400">
              <h3 className=" text-[#FF355E]">Ksh { todaysTotal }</h3>
              ||
              <h3 className=" text-[#0F0E47]">{ todaysCost }</h3>
            </span>

            {yesterdaysTotal > 0 || todaysTotal > 0 ? (
              <div className="flex items-center text-xs sm:text-sm">
                {isIncrease ? (
                  <ArrowUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 mr-1" />
                ) : (
                  <ArrowDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-1" />
                )}
                <span className={isIncrease ? "text-red-500" : "text-green-500"}>
                  {percentageDiff.toFixed(1)}% {isIncrease ? "increase" : "decrease"}
                  <span className="hidden xs:inline"> from yesterday</span>
                </span>
              </div>
            ) : null}

          </CardContent>
      </Card>

      <NavigationTab expenses={ expenses } />

    </div>
  )
}