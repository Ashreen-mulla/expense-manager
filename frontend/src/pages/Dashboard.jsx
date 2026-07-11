import { useEffect, useState } from "react";
import {
    Wallet,
    IndianRupee,
    PiggyBank,
    AlertTriangle,
    Percent,
    Receipt,
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";
import { getDashboard } from "../services/analyticsService";

export default function Dashboard() {
    const [dashboard, setDashboard] = useState({
        totalBudget: 0,
        totalSpent: 0,
        remainingBudget: 0,
        expenseCount: 0,
        budgetUsagePercentage: 0,
        overBudget: false,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const data = await getDashboard();
                setDashboard(data);
            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const currency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);

    return (
        <div className="space-y-6">
            <div className="ml-6">
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-800">
                    Dashboard
                </h1>

                <p className="mt-1 text-base text-slate-500">
                    Welcome back. Here's an overview of your finances.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <StatCard
                    title="Total Budget"
                    value={loading ? "..." : currency(dashboard.totalBudget)}
                    icon={<PiggyBank size={28} />}
                />

                <StatCard
                    title="Total Spent"
                    value={loading ? "..." : currency(dashboard.totalSpent)}
                    icon={<Wallet size={28} />}
                />

                <StatCard
                    title="Remaining Budget"
                    value={loading ? "..." : currency(dashboard.remainingBudget)}
                    icon={<IndianRupee size={28} />}
                />

                <StatCard
                    title="Expense Count"
                    value={loading ? "..." : dashboard.expenseCount}
                    icon={<Receipt size={28} />}
                />

                <StatCard
                    title="Budget Usage"
                    value={loading ? "..." : `${dashboard.budgetUsagePercentage}%`}
                    icon={<Percent size={28} />}
                />

                <StatCard
                    title="Over Budget"
                    value={
                        loading
                            ? "..."
                            : dashboard.overBudget
                                ? "Yes"
                                : "No"
                    }
                    icon={<AlertTriangle size={28} />}
                />
            </div>
        </div>
    );
}