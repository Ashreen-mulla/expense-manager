import { ReceiptIndianRupee } from "lucide-react";

export default function BiggestExpenseCard({ expense }) {
    if (!expense) return null;

    return (
        <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-6">

            <div className="flex justify-between items-center mb-5">

                <div>

                    <h2 className="text-lg font-semibold text-slate-800">
                        Biggest Expense
                    </h2>

                    <p className="text-slate-500">
                        Your highest recorded expense.
                    </p>

                </div>

                <div className="text-red-500">
                    <ReceiptIndianRupee size={32} />
                </div>

            </div>

            <h1 className="text-3xl font-bold text-slate-900">
                ₹{expense.amount.toLocaleString("en-IN")}
            </h1>

            <div className="mt-5 space-y-2">

                <p>
                    <span className="font-semibold">Title:</span> {expense.title}
                </p>

                <p>
                    <span className="font-semibold">Category:</span> {expense.categoryName}
                </p>

                <p>
                    <span className="font-semibold">Date:</span>{" "}
                    {new Intl.DateTimeFormat("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    }).format(new Date(expense.expenseDate))}
                </p>

            </div>

        </div>
    );
}