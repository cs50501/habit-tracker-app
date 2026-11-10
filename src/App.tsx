import { useState } from "react";

// Components
import Sidebar, {
  type Page,
} from "./components/Sidebar";

// Pages
import CalendarPage from "./features/calendar/CalendarPage";
import HabitsPage from "./features/habits/HabitsPage";
import TasksPage from "./features/tasks/TasksPage";

// Types
import type {
  Category,
  Task,
} from "./features/tasks/types";

// Styling
import "./App.css";

// ========================================
// INITIAL DATA
// ========================================

const startingCategories: Category[] = [
  {
    id: 1,
    name: "Academic",
    color: "#9AA4F1",
  },
  {
    id: 2,
    name: "Personal",
    color: "#E3AE85",
  },
  {
    id: 3,
    name: "Work",
    color: "#8EC5AD",
  },
  {
    id: 4,
    name: "Project",
    color: "#D6A2CE",
  },
];

const startingTasks: Task[] = [
  {
    id: 1,
    title: "Finish assignment",
    due: "Today",
    done: false,
    categoryId: 1,
  },
  {
    id: 2,
    title: "Review research progress",
    due: "Today",
    done: false,
    categoryId: 3,
  },
  {
    id: 3,
    title: "Buy groceries",
    due: "Tomorrow",
    done: false,
    categoryId: 2,
  },
  {
    id: 4,
    title: "Work on habit tracker",
    due: "Later",
    done: false,
    categoryId: 4,
  },
];

// ========================================
// MAIN APPLICATION
// ========================================

export default function App() {

  // Navigation
  const [currentPage, setCurrentPage] =
    useState<Page>("Calendar");

  // Shared data
  const [categories, setCategories] =
    useState<Category[]>(startingCategories);

  const [tasks, setTasks] =
    useState<Task[]>(startingTasks);

  // ========================================
  // CATEGORY FUNCTIONS
  // ========================================

  function addCategory(
    name: string,
    color: string
  ) {
    const nextId =
      Math.max(
        0,
        ...categories.map(
          (category) => category.id
        )
      ) + 1;

    setCategories((previous) => [
      ...previous,
      {
        id: nextId,
        name,
        color,
      },
    ]);
  }

  function renameCategory(
    id: number,
    name: string
  ) {
    setCategories((previous) =>
      previous.map((category) =>
        category.id === id
          ? { ...category, name }
          : category
      )
    );
  }

  function changeCategoryColor(
    id: number,
    color: string
  ) {
    setCategories((previous) =>
      previous.map((category) =>
        category.id === id
          ? { ...category, color }
          : category
      )
    );
  }

  function deleteCategory(id: number) {

    // Remove the category
    setCategories((previous) =>
      previous.filter(
        (category) => category.id !== id
      )
    );

    // Keep the tasks but make them Uncategorized
    setTasks((previous) =>
      previous.map((task) =>
        task.categoryId === id
          ? { ...task, categoryId: null }
          : task
      )
    );
  }

  // ========================================
  // TASK FUNCTIONS
  // ========================================

  function toggleTask(id: number) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function changeTaskCategory(
    taskId: number,
    categoryId: number | null
  ) {
    setTasks((previous) =>
      previous.map((task) =>
        task.id === taskId
          ? { ...task, categoryId }
          : task
      )
    );
  }

  // ========================================
  // APPLICATION LAYOUT
  // ========================================

  return (
    <div className="app">

      <Sidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <main className="main-content">

        <h2 className="page-title">
          {currentPage}
        </h2>

        <p className="subtitle">
          Your personal productivity space.
        </p>

        {/* CALENDAR */}
        {currentPage === "Calendar" && (
          <CalendarPage />
        )}

        {/* TASKS */}
        {currentPage === "Tasks" && (
          <TasksPage
            tasks={tasks}
            categories={categories}
            onToggleTask={toggleTask}
            onChangeTaskCategory={
              changeTaskCategory
            }
            onAddCategory={addCategory}
            onRenameCategory={renameCategory}
            onDeleteCategory={deleteCategory}
            onChangeCategoryColor={
              changeCategoryColor
            }
          />
        )}

        {/* HABITS */}
        {currentPage === "Habits" && (
          <HabitsPage />
        )}

      </main>
    </div>
  );
}
