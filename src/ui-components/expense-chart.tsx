"use client"

import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import { Bar, BarChart,CartesianGrid,Label,XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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


function ExpenseChart({ expenses }: { expenses: Expense[] }) {

    const formatDate = (dateString: string | number) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    }
  
    const chartData = expenses.slice(-10).map(expense => ({
      month: formatDate(expense.paid_on),
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
      <Card className=" mt-4 mx-2">
        <CardHeader>
          <CardDescription>Mar</CardDescription>
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
      </Card>
    )
  }

export default ExpenseChart;