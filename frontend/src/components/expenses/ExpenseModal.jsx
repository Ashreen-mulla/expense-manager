import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

export default function ExpenseModal({
                                         open,
                                         onClose,
                                         onSubmit,
                                         categories = [],
                                         expense = null,
                                         mode = "add",
                                     }) {
    const [form, setForm] = useState({
        title: "",
        amount: "",
        description: "",
        expenseDate: "",
        categoryId: "",
    });

    useEffect(() => {
        if (expense) {
            setForm({
                title: expense.title,
                amount: expense.amount,
                description: expense.description,
                expenseDate: expense.expenseDate,
                categoryId: expense.categoryId,
            });
        } else {
            setForm({
                title: "",
                amount: "",
                description: "",
                expenseDate: "",
                categoryId: "",
            });
        }
    }, [expense, open]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(form);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-md p-6"
                >
                    <motion.div
                        initial={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.95,
                            y: 20,
                        }}
                        transition={{
                            duration: 0.25,
                        }}
                        className="
                            w-full
                            max-w-2xl
                            rounded-3xl
                            border
                            border-white/30
                            bg-white/20
                            backdrop-blur-3xl
                            shadow-[0_25px_80px_rgba(15,23,42,0.25)]
                            overflow-hidden
                        "
                    >
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/20">

                            <div>

                                <h2 className="text-2xl font-semibold text-slate-800">
                                    {mode === "add"
                                        ? "Add Expense"
                                        : "Edit Expense"}
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Fill in the expense details.
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="
                                    h-10
                                    w-10
                                    rounded-full
                                    bg-white/20
                                    hover:bg-white/30
                                    transition
                                    flex
                                    items-center
                                    justify-center
                                "
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-8 space-y-6"
                        >
                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Title
                                    </label>

                                    <input
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Amount
                                    </label>

                                    <input
                                        type="number"
                                        step="0.01"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                            </div>

                            <div className="grid grid-cols-2 gap-6">

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Category
                                    </label>

                                    <select
                                        name="categoryId"
                                        value={form.categoryId}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                                    >
                                        <option value="">
                                            Select category
                                        </option>

                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-2 text-sm font-medium">
                                        Expense Date
                                    </label>

                                    <input
                                        type="date"
                                        name="expenseDate"
                                        value={form.expenseDate}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>

                            </div>

                            <div>

                                <label className="block mb-2 text-sm font-medium">
                                    Description
                                </label>

                                <textarea
                                    rows="4"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    className="w-full resize-none rounded-xl bg-white/25 border border-white/30 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-400"
                                />

                            </div>

                            <div className="flex justify-end gap-4 pt-2">

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border border-white/30 px-6 py-3 hover:bg-white/20 transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition"
                                >
                                    {mode === "add"
                                        ? "Add Expense"
                                        : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}