import { useEffect, useState } from "react";

import BiggestExpenseCard from "../components/analytics/BiggestExpenseCard";
import MonthlyLineChart from "../components/analytics/MonthlyLineChart";
import CategoryPieChart from "../components/analytics/CategoryPieChart";
import RecentExpensesTable from "../components/analytics/RecentExpensesTable";

import {
    getMonthlySpending,
    getCategorySpending,
    getRecentExpenses,
    getBiggestExpense,
} from "../services/analyticsService";

export default function Analytics() {

    const [monthlySpending, setMonthlySpending] = useState([]);
    const [categorySpending, setCategorySpending] = useState([]);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [biggestExpense, setBiggestExpense] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            setLoading(true);

            const [
                monthly,
                categories,
                recent,
                biggest,
            ] = await Promise.all([
                getMonthlySpending(),
                getCategorySpending(),
                getRecentExpenses(),
                getBiggestExpense(),
            ]);

            setMonthlySpending(monthly);
            setCategorySpending(categories);
            setRecentExpenses(recent);
            setBiggestExpense(biggest);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <div className="text-center text-slate-500 py-20">
                Loading analytics...
            </div>

        );

    }

    return (

        <div className="space-y-8">

            <div className="ml-6">

                <h1
                    className="
                        text-2xl
                        md:text-3xl
                        font-semibold
                        tracking-tight
                        text-slate-800
                    "
                >
                    Analytics
                </h1>

                <p
                    className="
                        mt-1
                        text-base
                        text-slate-500
                    "
                >
                    Visualize your spending trends and financial insights.
                </p>

            </div>

            <BiggestExpenseCard
                expense={biggestExpense}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                <MonthlyLineChart
                    data={monthlySpending}
                />

                <CategoryPieChart
                    data={categorySpending}
                />

            </div>

            <div>

                <h2 className="text-xl font-semibold text-slate-800 mb-4 ml-2">
                    Recent Expenses
                </h2>

                <RecentExpensesTable
                    expenses={recentExpenses}
                />

            </div>

        </div>

    );

}