import TaskCategories from "./TaskCategories";
import TaskItem from "./TaskItem";

import type {
    Category,
    DueGroup,
    Task,
} from "./types";

type TasksPageProps = {
    tasks: Task[];
    categories: Category[];

    onToggleTask: (id: number) => void;

    onChangeTaskCategory: (
        taskId: number,
        categoryId: number | null
    ) => void;

    onAddCategory: (
        name: string,
        color: string
    ) => void;

    onRenameCategory: (
        id: number,
        name: string
    ) => void;

    onDeleteCategory: (id: number) => void;

    onChangeCategoryColor: (
        id: number,
        color: string
    ) => void;
};

const dueGroups: DueGroup[] = [
    "Today",
    "Tomorrow",
    "Later",
];

export default function TasksPage({
    tasks,
    categories,
    onToggleTask,
    onChangeTaskCategory,
    onAddCategory,
    onRenameCategory,
    onDeleteCategory,
    onChangeCategoryColor,
}: TasksPageProps) {
    return (
        <div className="card tasks-page">

        {/* Category management */}
        <TaskCategories
            categories={categories}
            onAdd={onAddCategory}
            onRename={onRenameCategory}
            onDelete={onDeleteCategory}
            onColorChange={onChangeCategoryColor}
        />

      {/* Task groups */}
        {dueGroups.map((group) => (
            <section
            className="task-section"
            key={group}
            >
            <h3>{group}</h3>

            {tasks
                .filter((task) => task.due === group)
                .map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    categories={categories}
                    onToggle={onToggleTask}
                    onCategoryChange={
                    onChangeTaskCategory
                    }
                />
                ))}
            </section>
        ))}
        </div>
    );
}
