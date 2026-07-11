import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";

export default function MonthlyLineChart({ data }) {

    const chartData = data.map((item) => ({
        month: new Date(item.year, item.month - 1).toLocaleString(
            "en-IN",
            {
                month: "short",
            }
        ),
        amount: item.amount,
    }));

    return (
        <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-6">

            <h2 className="text-xl font-semibold mb-6">
                Monthly Spending
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <LineChart data={chartData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="month" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="amount"
                            stroke="#2563eb"
                            strokeWidth={3}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}