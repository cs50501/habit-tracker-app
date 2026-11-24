import { useState } from "react";

// Components
import Sidebar, {
  type Page,
} from "./components/Sidebar";
import { useLocalStorage } from "./hooks/useLocalStorage";

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

import { toLocalDateString } from "./features/tasks/dateUtils";

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

// ========================================
// MAIN APPLICATION
// ========================================

type OldTask = {
  id: number;
  title: string;
  due: "Today" | "Tomorrow" | "Later";
  done: boolean;
  categoryId: number | null;
};

function migrateOldTasks(): Task[] {
  try {
    const saved = localStorage.getItem(
      "diddyblud-tasks-v1"
    );

    if (!saved) return [];

    const oldTasks: OldTask[] = JSON.parse(saved);

    if (!Array.isArray(oldTasks)) return [];

    return oldTasks.map((task) => {
      const date = new Date();

      if (task.due === "Tomorrow"){
        date.setDate(date.getDate() + 1);
      }

      return {
        id: task.id,
        title: task.title,
        done: task.done,
        categoryId: task.categoryId,
        dueDate: task.due === "Later" ? null : toLocalDateString(date),
      };
    });
  } catch (error) {
      console.error("Task migration failed:", error);
      return [];
  }
}

export default function App() {

  // Navigation
  const [currentPage, setCurrentPage] =
    useState<Page>("Calendar");

  // Shared data
  const [categories, setCategories] =
    useLocalStorage<Category[]>(
      "diddyblud-categories-v1",
      startingCategories
    );

  const [tasks, setTasks] =
    useLocalStorage<Task[]>(
      "diddyblud-tasks-v1",
      migrateOldTasks()
    );

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

  function addTask(
    title: string,
    dueDate: string | null,
    categoryId: number | null
  ) {
    setTasks((previousTasks) => {
      const nextId = Math.max(0, ...previousTasks.map((task) => task.id)) + 1;

      const newTask: Task = {
        id: nextId,
        title,
        dueDate,
        done: false,
        categoryId,
      };

      return [...previousTasks, newTask];
    });
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

  function editTask(
    id: number,
    title: string,
    dueDate: string | null
  ) {
    setTasks((previousTasks) => previousTasks.map((task) => task.id === id ? {...task, title, dueDate} : task));
  }

  function deleteTask(id: number) {
    setTasks((previousTasks) => previousTasks.filter((task) => task.id !== id));
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
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onChangeTaskCategory={changeTaskCategory}
            onAddCategory={addCategory}
            onRenameCategory={renameCategory}
            onDeleteCategory={deleteCategory}
            onChangeCategoryColor={changeCategoryColor}
            onEditTask={editTask}
            onDeleteTask={deleteTask}
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
