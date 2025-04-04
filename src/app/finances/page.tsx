import FinanceDashboard from "./finance-dashboard"
export default function Page() {
    return (
        <div className="flex justify-center items-center p-4">
            <div className="w-full overflow-hidden rounded-3xl text-black shadow-xl">
                <div className="px-4 pt-2">
                    <FinanceDashboard />
                </div>
            </div>
        </div>
    )
}