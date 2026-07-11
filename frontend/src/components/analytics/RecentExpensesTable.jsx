export default function RecentExpensesTable({ expenses }) {

    return (

        <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl overflow-hidden">

            <table className="w-full">

                <thead className="bg-white/40">

                <tr>

                    <th className="px-6 py-4 text-left">
                        Title
                    </th>

                    <th className="px-6 py-4 text-left">
                        Category
                    </th>

                    <th className="px-6 py-4 text-left">
                        Date
                    </th>

                    <th className="px-6 py-4 text-right">
                        Amount
                    </th>

                </tr>

                </thead>

                <tbody>

                {expenses.map((expense) => (

                    <tr
                        key={expense.id}
                        className="border-t border-white/20"
                    >

                        <td className="px-6 py-4">
                            {expense.title}
                        </td>

                        <td className="px-6 py-4">
                            {expense.categoryName}
                        </td>

                        <td className="px-6 py-4">
                            {new Intl.DateTimeFormat("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                            }).format(new Date(expense.expenseDate))}
                        </td>

                        <td className="px-6 py-4 text-right font-semibold">
                            ₹{expense.amount.toLocaleString("en-IN")}
                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </div>

    );

}