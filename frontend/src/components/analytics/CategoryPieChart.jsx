import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

const COLORS = [
    "#2563eb",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#8b5cf6",
];

export default function CategoryPieChart({ data }) {

    return (

        <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-6">

            <h2 className="text-xl font-semibold mb-6">
                Category Spending
            </h2>

            <div className="h-80">

                <ResponsiveContainer>

                    <PieChart>

                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="category"
                            outerRadius={110}
                            label
                        >

                            {data.map((_, index) => (

                                <Cell
                                    key={index}
                                    fill={COLORS[index % COLORS.length]}
                                />

                            ))}

                        </Pie>

                        <Tooltip />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}