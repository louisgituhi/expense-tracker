"use client"

// ui comps
import ExpenseChart from "@/ui-components/expense-chart";
import ExpenseTable from "@/ui-components/expense-table";
import FormDialogue from "@/ui-components/form-dialogue";

import { ChevronRight } from "lucide-react";

import { init, i } from "@instantdb/react";

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

const db = init({ appId: APP_ID, schema })

function App () {

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

        <ExpenseChart expenses={ expenses } />

        <div className="px-2 pb-20">
          <ExpenseTable expenses={ expenses } />
        </div>

      </div>
    </div>
  )
}
export default App;