import { DollarSign, PiggyBank, Building, Users, Gift, CreditCard, ShoppingCart, Plus, Minus, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function FinanceDashboard() {
    return (
        <div className="container mx-auto p-4 space-y-6 w-full max-w-3xl px-4">

            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-100">

                <CardHeader className="pb-2">

                    <CardDescription>Liquidity</CardDescription>

                    <CardTitle className="text-4xl font-bold flex items-center">

                        <DollarSign className="h-8 w-8 text-green-600 p-1.5 bg-green-100 rounded-full mr-2" />
                        
                            500

                    </CardTitle>

                </CardHeader>

                <CardContent>
                    <p className="text-sm text-muted-foreground">Tracks all-time finances</p>
                </CardContent>

            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                <Card>

                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <PiggyBank className="h-6 w-6 mr-2 text-pink-500 p-1 bg-pink-100 rounded-full" />

                                Savings Account

                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">

                            0

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {/* <p className="text-xs text-muted-foreground">Savings</p> */}

                        <div className="flex space-x-2">
                            
                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="h-8 text-xs"
                            />

                            <Button
                                size="sm"
                                className="bg-pink-500 hover:bg-pink-600 h-8"
                            >
                                Save

                            </Button>

                        </div>

                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <Building className="h-6 w-6 mr-2 text-blue-500 p-1 bg-blue-100 rounded-full" />

                                Other Bank Accounts
                                
                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">
                            
                            0

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {/* <p className="text-xs text-muted-foreground">Balances in other accounts</p> */}

                        <div className="flex space-x-2">

                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="h-8 text-xs"
                            />

                            <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600 h-8"
                            >
                                Save
                            </Button>

                        </div>

                    </CardContent>
                </Card>

                <Card>

                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <Users className="h-6 w-6 mr-2 text-amber-500 p-1 bg-amber-100 rounded-full" />

                                Lending

                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">
                            0
                        </CardTitle>

                    </CardHeader>

                    <CardContent>
                        {/* <p className="text-xs text-muted-foreground">Money given to others</p> */}

                        <div className="flex space-x-2">

                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="h-8 text-xs"
                            />

                            <Button
                                size="sm"
                                className="bg-amber-500 hover:bg-amber-600 h-8"
                            >

                                Save

                            </Button>

                        </div>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <Gift className="h-6 w-6 mr-2 text-purple-500 p-1 bg-purple-100 rounded-full" />

                                Gifts

                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">
                            0
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {/* <p className="text-xs text-muted-foreground">Gift</p> */}

                        <div className="flex space-x-2">

                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="h-8 text-xs"
                            />

                            <Button
                                size="sm"
                                className="bg-purple-500 hover:bg-purple-600 h-8"
                            >
                                Save
                            </Button>

                        </div>

                    </CardContent>

                </Card>

                <Card>

                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <CreditCard className="h-6 w-6 mr-2 text-red-500 p-1 bg-red-100 rounded-full" />
                                Borrowing

                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">
                            0
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {/* <p className="text-xs text-muted-foreground mb-2">Loans taken from others</p> */}

                        <div className="flex space-x-2">

                            <Input
                                type="number"
                                placeholder="Enter amount"
                                className="h-8 text-xs"
                            />
                            <Button
                                size="sm"
                                className="bg-red-500 hover:bg-red-600 h-8"
                            >
                                Save
                            </Button>

                        </div>

                    </CardContent>

                </Card>

                <Card>
                    <CardHeader className="pb-2">

                        <CardDescription className="flex items-center">

                            <ShoppingCart className="h-6 w-6 mr-2 text-gray-500 p-1 bg-gray-100 rounded-full" />
                                Expenditures

                        </CardDescription>

                        <CardTitle className="text-2xl font-semibold">
                            0
                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {/* <p className="text-xs text-muted-foreground mb-2">Total money spent</p> */}

                    </CardContent>

                </Card>
            </div>
        </div>
    )
}