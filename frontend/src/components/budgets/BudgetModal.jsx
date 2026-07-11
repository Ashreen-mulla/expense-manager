import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

export default function BudgetModal({
                                        open,
                                        mode = "add",
                                        budget = null,
                                        onClose,
                                        onSubmit,
                                    }) {
    const [form, setForm] = useState({
        amount: "",
        month: "",
        year: new Date().getFullYear(),
    });

    useEffect(() => {
        if (budget) {
            setForm({
                amount: budget.amount,
                month: budget.month,
                year: budget.year,
            });
        } else {
            setForm({
                amount: "",
                month: "",
                year: new Date().getFullYear(),
            });
        }
    }, [budget, open]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        onSubmit({
            amount: Number(form.amount),
            month: Number(form.month),
            year: Number(form.year),
        });
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
                            scale: .95,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: .95,
                            y: 20,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 22,
                        }}
                        className="
                            w-full
                            max-w-xl
                            rounded-3xl
                            border
                            border-white/30
                            bg-white/20
                            backdrop-blur-3xl
                            shadow-[0_25px_80px_rgba(15,23,42,.25)]
                            overflow-hidden
                        "
                    >
                        <div className="flex items-center justify-between px-8 py-6 border-b border-white/20">

                            <div>

                                <h2 className="text-2xl font-semibold">
                                    {mode === "add"
                                        ? "Add Budget"
                                        : "Edit Budget"}
                                </h2>

                                <p className="text-slate-500 mt-1">
                                    Configure your monthly budget.
                                </p>

                            </div>

                            <button
                                onClick={onClose}
                                className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                            >
                                <X size={18}/>
                            </button>

                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="p-8 space-y-6"
                        >

                            <div>

                                <label className="block mb-2">
                                    Budget Amount
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    name="amount"
                                    value={form.amount}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3"
                                />

                            </div>

                            <div className="grid grid-cols-2 gap-6">

                                <div>

                                    <label className="block mb-2">
                                        Month
                                    </label>

                                    <select
                                        name="month"
                                        value={form.month}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3"
                                    >

                                        <option value="">
                                            Select Month
                                        </option>

                                        {months.map((month) => (

                                            <option
                                                key={month.value}
                                                value={month.value}
                                            >
                                                {month.label}
                                            </option>

                                        ))}

                                    </select>

                                </div>

                                <div>

                                    <label className="block mb-2">
                                        Year
                                    </label>

                                    <input
                                        type="number"
                                        name="year"
                                        value={form.year}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-xl bg-white/25 border border-white/30 px-4 py-3"
                                    />

                                </div>

                            </div>

                            <div className="flex justify-end gap-4">

                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="rounded-xl border border-white/30 px-6 py-3 hover:bg-white/20"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-xl bg-slate-900 text-white px-6 py-3 hover:bg-slate-800"
                                >
                                    {mode === "add"
                                        ? "Add Budget"
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