import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

const monthName = (month) =>
    new Date(2000, month - 1).toLocaleString("en-IN", {
        month: "long",
    });

const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
    }).format(amount);

export default function BudgetTable({
                                        budgets,
                                        loading,
                                        onEdit,
                                        onDelete,
                                    }) {
    if (loading) {
        return (
            <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-8 text-center text-slate-500">
                Loading budgets...
            </div>
        );
    }

    if (budgets.length === 0) {
        return (
            <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-8 text-center text-slate-500">
                No budgets found.
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl overflow-hidden"
        >
            <table className="w-full">

                <thead className="bg-white/40">

                <tr className="text-left text-slate-700">

                    <th className="px-6 py-4">Month</th>

                    <th className="px-6 py-4">Year</th>

                    <th className="px-6 py-4">Budget</th>

                    <th className="px-6 py-4 text-center">
                        Actions
                    </th>

                </tr>

                </thead>

                <tbody>

                {budgets.map((budget) => (

                    <tr
                        key={budget.id}
                        className="border-t border-white/20 hover:bg-white/15 transition"
                    >

                        <td className="px-6 py-5 font-medium">
                            {monthName(budget.month)}
                        </td>

                        <td className="px-6 py-5">
                            {budget.year}
                        </td>

                        <td className="px-6 py-5 font-semibold">
                            {formatCurrency(budget.amount)}
                        </td>

                        <td className="px-6 py-5">

                            <div className="flex justify-center gap-3">

                                <button
                                    onClick={() => onEdit(budget)}
                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-100/50 transition"
                                >
                                    <Pencil size={18}/>
                                </button>

                                <button
                                    onClick={() => onDelete(budget)}
                                    className="rounded-lg p-2 text-red-600 hover:bg-red-100/50 transition"
                                >
                                    <Trash2 size={18}/>
                                </button>

                            </div>

                        </td>

                    </tr>

                ))}

                </tbody>

            </table>

        </motion.div>
    );
}