"use client"

import { Utensils, Home, Lightbulb, Car, Film, Heart, ShoppingBag, Plane, Shirt, FileX, PhoneCall, Scissors, Popcorn } from "lucide-react";

import { i, InstaQLEntity, init } from "@instantdb/react";

// ID for app: expense-app
const APP_ID = process.env.NEXT_PUBLIC_INSTANT_APP_ID as string;

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

const groupExpensesByCategory = (expenses: Expense[]) => {
  return expenses.reduce((acc, expense) => {
    if (!acc[expense.category]) {
      acc[expense.category] = { totalAmount: 0, count: 0 };
    }
    acc[expense.category].totalAmount += expense.trx_amount;
    acc[expense.category].count += 1;
    return acc;
  }, {} as Record<string, { totalAmount: number; count: number }>);
};

const getCategoryStyle = (category: string) => {
  switch (category.toLowerCase()) {
    case "food":
      return { style: "bg-orange-100 text-orange-500", icon: <Utensils className="w-4 h-4" /> };
    case "housing":
      return { style: "bg-cyan-100 text-cyan-500", icon: <Home className="w-4 h-4" /> };
    case "utilities":
      return { style: "bg-yellow-100 text-yellow-500", icon: <Lightbulb className="w-4 h-4" /> };
    case "transport":
      return { style: "bg-blue-100 text-blue-500", icon: <Car className="w-4 h-4" /> };
    case "entertainment":
      return { style: "bg-[#F0FFF0] text-[#90FCCF]", icon: <Film className="w-4 h-4" /> };
    case "healthcare":
      return { style: "bg-green-100 text-green-500", icon: <Heart className="w-4 h-4" /> };
    case "shopping":
      return { style: "bg-pink-100 text-pink-500", icon: <ShoppingBag className="w-4 h-4" /> };
    case "airtime": 
      return { style: "bg-[#FD7F5E] text-[#FC2011]", icon: <PhoneCall className="w-4 h-4" /> };
    case "haircut": 
      return { style: "bg-[#ED80E9] text-[#4F2B4E]", icon: <Scissors className="w-4 h-4" /> };
    case "groceries": 
      return { style: "bg-[#FFA3DD] text-[#FD3DB5]", icon: <Popcorn className="w-4 h-4" /> };
    case "clothing":
      return { style: "bg-purple-100 text-purple-500", icon: <Shirt className="w-4 h-4" /> };
    default:
      return { style: "bg-gray-100 text-gray-500", icon: <FileX className="w-4 h-4" /> }; // Default icon
  }
};    

  // Format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KSh"
    }).format(amount)
}


export default function ExpenditureList({ expenses }: { expenses: Expense[] }) {

  const groupedExpenses = groupExpensesByCategory(expenses);

    return (
        <div className="space-y-3 mb-6">

            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-red-100 text-red-600 rounded-full">

                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="#FF355E" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      className="lucide lucide-banknote">
                    <rect 
                      width="20" 
                      height="12" 
                      x="2" y="6" rx="2"
                    />
                    <circle 
                      cx="12" 
                      cy="12" 
                      r="2"
                    />
                  <path d="M6 12h.01M18 12h.01"/>
            </svg>

                    </div>

                    <div>
                        <p className="font-medium">Money spent</p>
                        <p className="text-xs text-muted-foreground">{ expenses.length }</p>
                    </div>

                </div>

                <div className="flex items-center">

                    <span className="font-medium mr-2">{formatCurrency(expenses.reduce((sum, expense) => sum + expense.trx_amount, 0))}</span>

                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M9 18L15 12L9 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        </svg>

              </div>

            </div>

            { Object.entries(groupedExpenses).map(([category, { totalAmount, count }]) => {

              const { style, icon } = getCategoryStyle(category);

              return (

                <div key={category} className="flex items-center justify-between p-3 rounded-lg border">

                  <div className="flex items-center gap-3">

                    <div className={`p-2 rounded-full ${style}`}>
                      {icon}
                    </div>

                    <div>
                      <p className="font-medium">{category}</p>
                      <p className="text-xs text-muted-foreground">{count} transactions</p>
                    </div>

                  </div>

                  <div className="flex items-center">
                    <span className="font-medium mr-2">{formatCurrency(totalAmount)}</span>
                    {/* Arrow Icon */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              );
            })}

        </div>
      )
    }