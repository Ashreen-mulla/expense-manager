import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import BudgetTable from "../components/budgets/BudgetTable";
import BudgetModal from "../components/budgets/BudgetModal";
import DeleteBudgetModal from "../components/budgets/DeleteBudgetModal";

import {
    getBudgets,
    createBudget,
    updateBudget,
    deleteBudget,
} from "../services/budgetService";

export default function Budgets() {

    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [mode, setMode] = useState("add");
    const [selectedBudget, setSelectedBudget] = useState(null);

    useEffect(() => {
        loadBudgets();
    }, []);

    const loadBudgets = async () => {

        try {

            setLoading(true);

            const data = await getBudgets();

            setBudgets(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreate = async (budget) => {

        try {

            await createBudget(budget);

            setModalOpen(false);

            await loadBudgets();

        } catch (error) {

            console.error(error);

        }

    };

    const handleUpdate = async (budget) => {

        try {

            await updateBudget(selectedBudget.id, budget);

            setModalOpen(false);

            setSelectedBudget(null);

            setMode("add");

            await loadBudgets();

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteBudget(selectedBudget.id);

            setDeleteOpen(false);

            setSelectedBudget(null);

            await loadBudgets();

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
                        Budgets
                    </h1>

                    <p
                        className="
                            mt-1
                            text-base
                            text-slate-500
                        "
                    >
                        Set spending limits and stay within your budget.
                    </p>

                </div>

                <button
                    onClick={() => {

                        setMode("add");
                        setSelectedBudget(null);
                        setModalOpen(true);

                    }}
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

                    Add Budget

                </button>

            </div>

            <BudgetTable
                budgets={budgets}
                loading={loading}
                onEdit={(budget) => {

                    setSelectedBudget(budget);

                    setMode("edit");

                    setModalOpen(true);

                }}
                onDelete={(budget) => {

                    setSelectedBudget(budget);

                    setDeleteOpen(true);

                }}
            />

            <BudgetModal
                open={modalOpen}
                mode={mode}
                budget={selectedBudget}
                onClose={() => {

                    setModalOpen(false);

                    setSelectedBudget(null);

                    setMode("add");

                }}
                onSubmit={
                    mode === "add"
                        ? handleCreate
                        : handleUpdate
                }
            />

            <DeleteBudgetModal
                open={deleteOpen}
                budget={selectedBudget}
                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedBudget(null);

                }}
                onConfirm={handleDelete}
            />

        </div>

    );

}