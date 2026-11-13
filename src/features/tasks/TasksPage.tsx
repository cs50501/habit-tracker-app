import { useState } from "react";
import TaskCategories from "./TaskCategories";
import TaskItem from "./TaskItem";
import type {
    Category,
    DueGroup,
    Task,
} from "./types";

// Types

type TaskView = "pending" | "all" | "completed";

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
        name: string
    ) => void;
};

// consts


const dueGroups: DueGroup[] = [
    "Today",
    "Tomorrow",
    "Later",
];


const taskViews: TaskView[] = [
    "pending",
    "all",
    "completed",
];


// task pages


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
    
    // remember which task view is selected

    const [taskView, setTaskView] = 
        useState<TaskView>("pending");

    // filter tasks according to their status

    const visibleTasks = tasks.filter((task) => {
        if (taskView == "pending") {
            return !task.done;
        }

        if (taskView === "completed") {
            return task.done;
        }

        return true;
    });

    return (
        <div className="card tasks-page">

            {/* CATEGORY MANAGEMENT */}

            <TaskCategories
                categories={categories}
                onAdd={onAddCategory}
                onRename={onRenameCategory}
                onDelete={onDeleteCategory}
                onColorChange={onChangeCategoryColor}
            />

            {/*TASK VIEW FILTER */}

            <div
                className="task-filters"
                role="group"
                aria-label="Filter tasks by completion status"
            >
                {taskViews.map((view) => (
                    <button
                        key={view}
                        type="button"
                        className={
                            taskView === view
                                ? "filter-button active"
                                : "filter-button"
                        }
                        aria-pressed={taskView === view}
                        onClick={() => setTaskView(view)}
                    >
                        {view === "pending"
                            ? "Pending"
                            : view === "all"
                            ? "All"
                            : "Completed"
                        }
                    </button>
                ))}
            </div>

            {/* Task list */}

            {visibleTasks.length === 0 ? (
                <p className="empty-state">
                    No tasks to display.
                </p>
            ): (
                dueGroups.map((group) => {
                    
                    // tasks belonging to current date group
                    const groupTasks = visibleTasks.filter(
                        (task) => task.due === group
                    );

                    //hide groups with no tasks
                    if (groupTasks.length === 0) {
                        return null;
                    }

                    return (
                        <section
                            className="task-section"
                            key={group}
                        >
                            <h3>
                                {group}
                            </h3>
                            
                            {groupTasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    categories={categories}
                                    onToggle={onToggleTask}
                                    onCategoryChange={onChangeTaskCategory}
                                />
                            ))}
                        </section>
                    );
                })
            )}
        </div>
    );
}