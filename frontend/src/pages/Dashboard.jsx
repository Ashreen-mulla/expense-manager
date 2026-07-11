import {
    Wallet,
    IndianRupee,
    PiggyBank,
    Layers3
} from "lucide-react";

import StatCard from "../components/dashboard/StatCard";

export default function Dashboard() {

    return (

        <div className="space-y-6">

            {/* Page Header */}

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
                    Dashboard
                </h1>

                <p className="mt-1 text-base text-slate-500">
                    Welcome back. Here's an overview of your finances.
                </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

                <StatCard
                    title="Total Expenses"
                    value="₹18,450"
                    icon={<Wallet size={28} />}
                />

                <StatCard
                    title="This Month"
                    value="₹6,200"
                    icon={<IndianRupee size={28} />}
                />

                <StatCard
                    title="Budget Left"
                    value="₹12,800"
                    icon={<PiggyBank size={28} />}
                />

                <StatCard
                    title="Categories"
                    value="8"
                    icon={<Layers3 size={28} />}
                />

            </div>

        </div>

    );

}