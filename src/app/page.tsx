"use client"

import FloatingNavbar from "@/components/ui-components/floating-navbar";
import ExpenseTable from "@/components/ui-components/expense-table";
import ExpenditureCard from "@/components/ui-components/expenditure-card";

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

        <div className="px-4 pt-2">

              <ExpenditureCard expenses={ expenses } />

        </div>

      </div>

      <FloatingNavbar />
      
    </div>
  )
}
export default App;