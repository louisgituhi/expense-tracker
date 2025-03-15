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
      day: formatDate(expense.paid_on),
      trx_amount: expense.trx_amount,
      trx_cost: expense.trx_cost
    }))
  
    const chartConfig = {
      desktop: {
        label: "trx_amount",
        color: "#FB4700",
      },
      mobile: {
        label: "trx_cost",
        color: "#2500FF",
      }
    } satisfies ChartConfig
  
    return (
      <Card className=" mt-4 mx-2 mb-4">

        <CardHeader className="pb-2">
          <CardDescription>Month</CardDescription>
        </CardHeader>

        <CardContent className="pt-0 w-full">

          <ChartContainer config={chartConfig} className="h-[150px] w-full">

            <BarChart 
              accessibilityLayer 
              data={chartData} 
              margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
              width={500}
              height={150}
              barGap={6}
              barCategoryGap={20}
            >

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
              height={ 20 }
            />

            <ChartTooltip 
              content={<ChartTooltipContent hideLabel />} 
            />

            <ChartLegend 
              content={<ChartLegendContent />} 
              verticalAlign="top" 
              height={20} 
            />

            <Bar
              dataKey="trx_amount"
              name="amount"
              stackId="a"
              fill="#adfa1d"
              radius={[0, 0, 4, 4]}
              barSize={35}
            />

            <Bar
              dataKey="trx_cost"
              name="cost"
              stackId="a"
              fill="#FB4700"
              radius={[4, 4, 0, 0]}
              barSize={35}
            />

            </BarChart>

          </ChartContainer>

        </CardContent>

      </Card>
    )
  }

export default ExpenseChart;