import { useState, type FormEvent } from "react";
import type { Task, Category } from "./types";


type TaskItemProps = {
    task: Task;
    categories: Category[];

    onToggle: (id: number) => void;

    onCategoryChange: (
        id: number,
        categoryId: number | null
    ) => void;

    onEdit: (
        id: number,
        title: string,
        dueDate: string | null
    ) => void;

    onDelete: (id: number) => void;
};


export default function TaskItem({
    task,
    categories,
    onToggle,
    onCategoryChange,
    onEdit,
    onDelete
}: TaskItemProps) {

    //find the category associated with this task
    const category = categories.find((item) => item.id === task.categoryId);

    //editing states
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [editedDueDate, setEditedDueDate] = useState(task.dueDate ?? "");

    //start editing
    function startEditing() {
        setEditedTitle(task.title);
        setEditedDueDate(task.dueDate ?? "");    
        setIsEditing(true);
    }

    // save changes
    function saveChanges(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const title = editedTitle.trim()

        if (!title) return;

        onEdit(task.id, title, editedDueDate || null);

        setIsEditing(false);
    }

    //delete task
    function handleDelete() {
        const confirmed = window.confirm(`Are you sure you want to delete "$(task.title)"?`);

        if (confirmed) {onDelete(task.id);}
    }

    return (
        <div
            className="task-item"
            style={{borderLeftColor: category?.color ?? "#787980"}}
        >
            {isEditing ? (
                //Editing mode
                <form
                    className="task-edit-form"
                    onSubmit={saveChanges}
                >
                    <input
                        className="text-input edit-title"
                        type="text"
                        value={editedTitle}
                        onChange={(event)=>setEditedTitle(event.target.value)}
                        maxLength={120}
                        required
                        aria-label="Edit task title"
                    />

                    <input
                        className="text-input edit-date"
                        type="date"
                        value={editedDueDate}
                        onChange={(event)=>setEditedDueDate(event.target.value)}
                        aria-label="Edit task due date"
                    />
                    <button
                        type="submit"
                        className="primary-button"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        className="small-button"
                        onClick={()=>setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </form>
            ): (
                //Normal display mode
                <>
                    <label className="task-details">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={()=>onToggle(task.id)}
                        />

                        <div className="task-text">
                            <span className={`task-title ${task.done ? "completed": ""}`}>
                                {task.title}
                            </span>

                            <small className="task-date">
                                {task.dueDate ?? "No due date"}
                            </small>
                        </div>
                    </label>

                    <div className="task-actions">
                        <select
                            className="task-category-select"
                            value={task.categoryId ?? ""}
                            aria-label={`Category for ${task.title}`}
                            onChange={(event)=> {
                                const value = event.target.value;
                            
                                onCategoryChange(task.id, value === "" ? null : Number(value));
                            }}
                        >
                            <option value="">
                                Uncategorized
                            </option>

                            {categories.map((category)=> (
                                <option
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            className="small-button"
                            onClick={startEditing}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="delete-task-button"
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}