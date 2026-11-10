
import { useState, type FormEvent } from "react";
import type { Category } from "./types";

type TaskCategoriesProps = {
    categories: Category[];
    onAdd: (name: string, color: string) => void;
    onRename: (id: number, name: string) => void;
    onDelete: (id: number) => void;
    onColorChange: (id: number, color: string) => void;
};

export default function TaskCategories({
    categories,
    onAdd,
    onRename,
    onDelete,
    onColorChange,
}: TaskCategoriesProps) {
    const [newName, setNewName] = useState("");
    const [newColor, setNewColor] = useState("#9AA4F1");

    const [editingId, setEditingId] =
        useState<number | null>(null);

    const [editingName, setEditingName] = useState("");
    const [message, setMessage] = useState("");

    function nameExists(name: string, excludeId?: number) {
        return categories.some(
            (category) =>
                category.id !== excludeId &&
                category.name.toLowerCase() === name.toLowerCase()
        );
    }

  // Create a category
    function addCategory(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const name = newName.trim();

        if (!name || nameExists(name)) {
        setMessage(
            !name
            ? "Enter a category name."
            : "Category already exists."
        );
        return;
    }

    onAdd(name, newColor);

    setNewName("");
    setMessage("");
    }

  // Save a renamed category
    function saveRename(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (editingId === null) return;

        const name = editingName.trim();

        if (!name || nameExists(name, editingId)) {
            setMessage(
                !name
                ? "Name cannot be empty."
                : "Category already exists."
        );
        return;
    }

    onRename(editingId, name);

    setEditingId(null);
    setMessage("");
    }

    return (
        <section className="category-settings">
        <h3 className="section-heading">
            Task Categories
        </h3>

        <div className="category-grid">
            {categories.map((category) => (
            <div
                className="category-setting"
                key={category.id}
            >
                <span
                className="category-dot"
                style={{
                    backgroundColor: category.color,
                }}
                />

                {editingId === category.id ? (
                <form
                    className="rename-form"
                    onSubmit={saveRename}
                >
                    <input
                    className="text-input"
                    aria-label="Edit category name"
                    value={editingName}
                    onChange={(event) =>
                        setEditingName(event.target.value)
                    }
                    />

                    <button
                    type="submit"
                    className="small-button"
                    >
                    Save
                    </button>

                    <button
                    type="button"
                    className="small-button"
                    onClick={() => {
                        setEditingId(null);
                        setMessage("");
                    }}
                    >
                    Cancel
                    </button>
                </form>
                ) : (
                <>
                    <span className="category-name">
                    {category.name}
                    </span>

                    <button
                    type="button"
                    className="small-button"
                    onClick={() => {
                        setEditingId(category.id);
                        setEditingName(category.name);
                        setMessage("");
                    }}
                    >
                    Rename
                    </button>
                </>
                )}

                <input
                type="color"
                className="color-input"
                value={category.color}
                aria-label={`Color for ${category.name}`}
                onChange={(event) =>
                    onColorChange(
                    category.id,
                    event.target.value
                    )
                }
                />

                <button
                type="button"
                className="delete-button"
                aria-label={`Delete ${category.name}`}
                onClick={() => {
                    onDelete(category.id);

                    if (editingId === category.id) {
                    setEditingId(null);
                    }

                    setMessage("");
                }}
                >
                ×
                </button>
            </div>
            ))}
        </div>

        {/* Create new category */}
        <form
            className="add-category-form"
            onSubmit={addCategory}
        >
            <input
            className="text-input"
            type="text"
            placeholder="New category name..."
            aria-label="New category name"
            value={newName}
            onChange={(event) =>
                setNewName(event.target.value)
            }
            />

            <input
            type="color"
            className="color-input"
            value={newColor}
            aria-label="New category color"
            onChange={(event) =>
                setNewColor(event.target.value)
            }
            />

            <button
            className="primary-button"
            type="submit"
            >
            + Add
            </button>
        </form>

        {message && (
            <p className="form-message" role="alert">
            {message}
            </p>
        )}
        </section>
    );
}
