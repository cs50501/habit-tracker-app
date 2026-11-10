
import type { Task, Category } from "./types";

type TaskItemProps = {
    task: Task;
    categories: Category[];
    onToggle: (id: number) => void;
    onCategoryChange: (
        id: number,
        categoryId: number | null
    ) => void;
};

function TaskItem({
    task,
    categories,
    onToggle,
    onCategoryChange,
}: TaskItemProps) {

  // Find the category associated with this task
    const category = categories.find(
        (item) => item.id === task.categoryId
    );

    return (
        <div
            className="task-item"
            style={{
                borderLeftColor: category?.color ?? "#787980",
            }}
        >
            <label className="task-details">
                <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => onToggle(task.id)}
                />

                <span
                    className="task-title"
                    style={{
                        textDecoration: task.done
                            ? "line-through"
                            : "none",
                        opacity: task.done ? 0.5 : 1,
                    }}
                >
                    {task.title}
                </span>
            </label>

            <div className="task-actions">
                <select
                    className="task-category-select"
                    value={task.categoryId ?? ""}
                    aria-label={`Category for ${task.title}`}
                    onChange={(event) => {
                        const value = event.target.value;

                        onCategoryChange(
                            task.id,
                            value === "" ? null : Number(value)
                        );
                    }}
            >
                <option value="">Uncategorized</option>

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
        </div>
    );
}

export default TaskItem;
