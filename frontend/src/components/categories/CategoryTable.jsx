import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";

export default function CategoryTable({
                                          categories,
                                          loading,
                                          onEdit,
                                          onDelete,
                                      }) {

    if (loading) {
        return (
            <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-8 text-center text-slate-500">
                Loading categories...
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="rounded-3xl border border-white/30 bg-white/25 backdrop-blur-xl shadow-xl p-8 text-center text-slate-500">
                No categories found.
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

                    <th className="px-6 py-4">
                        Category
                    </th>

                    <th className="px-6 py-4 text-center">
                        Actions
                    </th>

                </tr>

                </thead>

                <tbody>

                {categories.map((category) => (

                    <tr
                        key={category.id}
                        className="border-t border-white/20 hover:bg-white/15 transition"
                    >

                        <td className="px-6 py-5 font-medium">
                            {category.name}
                        </td>

                        <td className="px-6 py-5">

                            <div className="flex justify-center gap-3">

                                <button
                                    onClick={() => onEdit(category)}
                                    className="rounded-lg p-2 text-blue-600 hover:bg-blue-100/50 transition"
                                >
                                    <Pencil size={18} />
                                </button>

                                <button
                                    onClick={() => onDelete(category)}
                                    className="rounded-lg p-2 text-red-600 hover:bg-red-100/50 transition"
                                >
                                    <Trash2 size={18} />
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