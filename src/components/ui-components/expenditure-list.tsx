"use client"

export default function ExpenditureList() {
    return (
        <div className="space-y-3 mb-6">
            
            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-red-100 text-red-600 rounded-full">
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                    </div>

                    <div>
                        <p className="font-medium">Money out</p>
                        <p className="text-xs text-muted-foreground">11 transactions</p>
                    </div>

                </div>

                <div className="flex items-center">

                    <span className="font-medium mr-2">$464.89</span>

                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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

            {/* Groceries item */}
            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-green-100 text-green-600 rounded-full">

                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 6H21M3 12H21M3 18H21"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        </svg>

                    </div>

                    <div>
                        <p className="font-medium">Groceries</p>
                        <p className="text-xs text-muted-foreground">5 transactions</p>
                    </div>

                </div>

                <div className="flex items-center">

                    <span className="font-medium mr-2">$269.27</span>

                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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

                  {/* Electronics item */}
            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-blue-100 text-blue-600 rounded-full">

                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                          <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                          <path d="M8 16H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>

                    <div>
                        <p className="font-medium">Electronics</p>
                        <p className="text-xs text-muted-foreground">2 transactions</p>
                    </div>

                </div>

                <div className="flex items-center">

                    <span className="font-medium mr-2">$143.91</span>
                      
                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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

                  {/* Transportation item */}
            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-amber-100 text-amber-600 rounded-full">

                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 11L5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M19 11L19 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <rect x="3" y="8" width="18" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
                          <path d="M7 18H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </div>

                    <div>
                        <p className="font-medium">Transportation</p>
                        <p className="text-xs text-muted-foreground">2 transactions</p>
                    </div>

                </div>
                    
                <div className="flex items-center">

                    <span className="font-medium mr-2">$243.91</span>

                      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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

                  {/* Rent item */}
            <div className="flex items-center justify-between p-3 rounded-lg border">

                <div className="flex items-center gap-3">

                    <div className="p-2 bg-purple-100 text-purple-600 rounded-full">

                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                        <svg 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M3 10.5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10.5"
                            stroke="currentColor"
                            strokeWidth="2"
                          />
                          <path d="M12 3L22 10.5H2L12 3Z" stroke="currentColor" strokeWidth="2" />
                        </svg>

                    </div>

                    <div>
                        <p className="font-medium">Rent</p>
                        <p className="text-xs text-muted-foreground">1 transaction</p>
                    </div>

                </div>

                <div className="flex items-center">

                    <span className="font-medium mr-2">$523.91</span>
                        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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

        </div>
    )
}