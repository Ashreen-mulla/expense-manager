import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

import CategoryTable from "../components/categories/CategoryTable";
import InputModal from "../components/common/InputModal";
import ConfirmModal from "../components/common/ConfirmModal";

import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../services/categoryService";

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [mode, setMode] = useState("add");
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {

        try {

            setLoading(true);

            const data = await getCategories();

            setCategories(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    const handleCreate = async (name) => {

        try {

            await createCategory({ name });

            setModalOpen(false);

            await loadCategories();

        } catch (error) {

            console.error(error);

        }

    };

    const handleUpdate = async (name) => {

        try {

            await updateCategory(selectedCategory.id, { name });

            setModalOpen(false);

            setSelectedCategory(null);

            setMode("add");

            await loadCategories();

        } catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async () => {

        try {

            await deleteCategory(selectedCategory.id);

            setDeleteOpen(false);

            setSelectedCategory(null);

            await loadCategories();

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
                        Categories
                    </h1>

                    <p
                        className="
                            mt-1
                            text-base
                            text-slate-500
                        "
                    >
                        Organize your expenses into meaningful categories.
                    </p>

                </div>

                <button
                    onClick={() => {

                        setMode("add");
                        setSelectedCategory(null);
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

                    Add Category

                </button>

            </div>

            <CategoryTable
                categories={categories}
                loading={loading}
                onEdit={(category) => {

                    setSelectedCategory(category);

                    setMode("edit");

                    setModalOpen(true);

                }}
                onDelete={(category) => {

                    setSelectedCategory(category);

                    setDeleteOpen(true);

                }}
            />

            <InputModal
                open={modalOpen}
                title={
                    mode === "add"
                        ? "Add Category"
                        : "Edit Category"
                }
                label="Category Name"
                placeholder="Enter category name..."
                value={selectedCategory?.name ?? ""}
                submitText={
                    mode === "add"
                        ? "Add Category"
                        : "Save Changes"
                }
                onClose={() => {

                    setModalOpen(false);

                    setSelectedCategory(null);

                    setMode("add");

                }}
                onSubmit={
                    mode === "add"
                        ? handleCreate
                        : handleUpdate
                }
            />

            <ConfirmModal
                open={deleteOpen}
                title="Delete Category"
                message={`Are you sure you want to delete "${selectedCategory?.name}"?`}
                onClose={() => {

                    setDeleteOpen(false);

                    setSelectedCategory(null);

                }}
                onConfirm={handleDelete}
            />

        </div>

    );

}