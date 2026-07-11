import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import ExpenseTable from "../components/expenses/ExpenseTable";
import ExpenseModal from "../components/expenses/ExpenseModal";
import DeleteExpenseModal from "../components/expenses/DeleteExpenseModal";

import {
    getExpenses,
    createExpense,
    updateExpense,
    deleteExpense,
} from "../services/expenseService";

import { getCategories } from "../services/categoryService";

export default function Expenses() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);

    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const [mode, setMode] = useState("add");
    const [selectedExpense, setSelectedExpense] = useState(null);

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [expenseToDelete, setExpenseToDelete] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);

            const [expenseData, categoryData] = await Promise.all([
                getExpenses(),
                getCategories(),
            ]);

            setExpenses(expenseData);
            setCategories(categoryData);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateExpense = async (expense) => {
        try {
            await createExpense({
                ...expense,
                amount: Number(expense.amount),
                categoryId: Number(expense.categoryId),
            });

            setModalOpen(false);

            await loadData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateExpense = async (expense) => {
        try {
            await updateExpense(selectedExpense.id, {
                ...expense,
                amount: Number(expense.amount),
                categoryId: Number(expense.categoryId),
            });

            setModalOpen(false);
            setSelectedExpense(null);
            setMode("add");

            await loadData();

        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteExpense = async () => {
        try {
            await deleteExpense(expenseToDelete.id);

            setDeleteOpen(false);
            setExpenseToDelete(null);

            await loadData();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between ml-6">

                <div>

                    <h1
                        className="
                            text-2xl
                            md:text-3xl
                            font-semibold
                            tracking-tight
                            text-slate-800
                        "
                    >
                        Expenses
                    </h1>

                    <p
                        className="
                            mt-1
                            text-base
                            text-slate-500
                        "
                    >
                        Track, manage and organize all your expenses.
                    </p>

                </div>

                <button
                    onClick={() => setModalOpen(true)}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-slate-900
                        text-white
                        px-5
                        py-3
                        hover:bg-slate-800
                        transition
                    "
                >
                    <Plus size={18} />
                    Add Expense
                </button>

            </div>

            <ExpenseTable
                expenses={expenses}
                loading={loading}
                onEdit={(expense) => {
                    setSelectedExpense(expense);
                    setMode("edit");
                    setModalOpen(true);
                }}
                onDelete={(expense) => {
                    setExpenseToDelete(expense);
                    setDeleteOpen(true);
                }}
            />

            <ExpenseModal
                open={modalOpen}
                mode={mode}
                expense={selectedExpense}
                categories={categories}
                onClose={() => {
                    setModalOpen(false);
                    setSelectedExpense(null);
                    setMode("add");
                }}
                onSubmit={
                    mode === "add"
                        ? handleCreateExpense
                        : handleUpdateExpense
                }
            />

            <DeleteExpenseModal
                open={deleteOpen}
                expense={expenseToDelete}
                onClose={() => {
                    setDeleteOpen(false);
                    setExpenseToDelete(null);
                }}
                onConfirm={handleDeleteExpense}
            />

        </div>
    );
}