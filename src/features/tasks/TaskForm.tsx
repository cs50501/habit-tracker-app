import { useState, type FormEvent } from "react";
import type { Category } from "./types";

type TaskFormProps = {
    categories: Category[];

    onAdd: (
        title: string,
        dueDate: string | null,
        categoryId: number | null
    ) => void;
};


export default function TaskForm({
    categories,
    onAdd,
}: TaskFormProps) {

    // form input states
    const [title, setTitle] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const taskTitle = title.trim();

        if (!taskTitle) return;

        onAdd(
            taskTitle,
            dueDate || null,
            categoryId === "" ? null: Number(categoryId)
        );

        // clear title after adding the task
        setTitle("");
        setDueDate("");
    }

    return (
        <section className="add-task-section">
            <h3 className="section-heading">
                Create a Task
            </h3>

            <form className="task-create-form" onSubmit={handleSubmit}>
                <label className="task-form-field">
                    Task Name
                    <input 
                        type="text"
                        placeholder="Enter task name..."
                        value={title}
                        onChange={(event)=> setTitle(event.target.value)}
                        maxLength={120}
                        required
                    />
                </label>

                <label className="task-form-field">
                    Category
                    <select
                        value={categoryId}
                        onChange={(event)=>setCategoryId(event.target.value)}>
                        
                        <option value="">
                            Uncategorized
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
                </label>

                <label className="task-form-field">
                    Due Date
                    
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(event)=>setDueDate(event.target.value)}
                    />
                </label>

                <button
                    type="submit"
                    className="primary-button"
                >
                    + Add Task
                </button>
            </form>
        </section>
    );
}