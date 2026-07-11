import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

export default function DeleteExpenseModal({
                                               open,
                                               expense,
                                               onClose,
                                               onConfirm,
                                           }) {
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
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        className="
                            w-full
                            max-w-md
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

                            <div className="flex items-center gap-3">

                                <div className="h-12 w-12 rounded-full bg-red-500/15 flex items-center justify-center">
                                    <AlertTriangle
                                        size={24}
                                        className="text-red-600"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-slate-800">
                                        Delete Expense
                                    </h2>

                                    <p className="text-sm text-slate-500">
                                        This action cannot be undone.
                                    </p>
                                </div>

                            </div>

                            <button
                                onClick={onClose}
                                className="rounded-full p-2 hover:bg-white/20"
                            >
                                <X size={18} />
                            </button>

                        </div>

                        <div className="px-8 py-6">

                            <p className="text-slate-700">
                                Are you sure you want to delete
                                <span className="font-semibold">
                                    {" "}
                                    "{expense?.title}"
                                </span>
                                ?
                            </p>

                        </div>

                        <div className="flex justify-end gap-3 px-8 pb-6">

                            <button
                                onClick={onClose}
                                className="rounded-xl border border-white/30 px-5 py-2.5 hover:bg-white/20 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={onConfirm}
                                className="rounded-xl bg-red-600 text-white px-5 py-2.5 hover:bg-red-700 transition"
                            >
                                Delete
                            </button>

                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}