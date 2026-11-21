import { useState, type FormEvent } from "react";
import type { Category, DueGroup } from "./types";

type TaskFormProps = {
    categories: Category[];
    onAdd: (
        title: string,
        due: DueGroup,
        categoryId: number | null
    ) => void;
};


export default function TaskForm({
    categories,
    onAdd,
}: TaskFormProps) {

    // form input states
    const [title, setTitle] = useState("");
    const [due, setDue] = useState<DueGroup>("Today");
    const [categoryId, setCategoryId] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const taskTitle = title.trim();

        if (!taskTitle) return;

        onAdd(
            taskTitle,
            due,
            categoryId === "" ? null: Number(categoryId)
        );

        // clear title after adding the task
        setTitle("");
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
                    Due
                    <select
                        value={due}
                        onChange={(event)=>setDue(event.target.value as DueGroup)}
                    >
                        <option value="Today">
                            Today
                        </option>
                        <option value="Tomorrow">
                            Tomorrow
                        </option>
                        <option value="Later">
                            Later
                        </option>
                    </select>
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