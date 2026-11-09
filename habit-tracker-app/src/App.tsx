
import { useState } from "react";

// ========================================
// 1. DATA TYPES
// ========================================

type Page = "Calendar" | "Tasks" | "Habits";

type DueGroup = "Today" | "Tomorrow" | "Later";

type Category = {
  id: number;
  name: string;
  color: string;
};

type Task = {
  id: number;
  title: string;
  due: DueGroup;
  done: boolean;
  categoryId: number | null;
};

// ========================================
// 2. MAIN APPLICATION
// ========================================

function App() {

  // Current page
  const [currentPage, setCurrentPage] =
    useState<Page>("Calendar");

  const pages: Page[] = [
    "Calendar",
    "Tasks",
    "Habits",
  ];

  // ========================================
  // 3. CATEGORIES
  // ========================================

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Academic", color: "#9AA4F1" },
    { id: 2, name: "Personal", color: "#E3AE85" },
    { id: 3, name: "Work", color: "#8EC5AD" },
    { id: 4, name: "Project", color: "#D6A2CE" },
  ]);

  // Inputs for creating categories
  const [newCategoryName, setNewCategoryName] =
    useState("");

  const [newCategoryColor, setNewCategoryColor] =
    useState("#9AA4F1");

  // Inputs for renaming categories
  const [editingCategoryId, setEditingCategoryId] =
    useState<number | null>(null);

  const [editingCategoryName, setEditingCategoryName] =
    useState("");

  const [categoryMessage, setCategoryMessage] =
    useState("");

  // Add a new category
  function addCategory() {
    const name = newCategoryName.trim();

    if (!name) {
      setCategoryMessage("Enter a category name.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      setCategoryMessage("That category already exists.");
      return;
    }

    const newId =
      Math.max(0, ...categories.map((category) => category.id)) + 1;

    const newCategory: Category = {
      id: newId,
      name: name,
      color: newCategoryColor,
    };

    setCategories((previousCategories) => [
      ...previousCategories,
      newCategory,
    ]);

    setNewCategoryName("");
    setCategoryMessage("");
  }

  // Change the color of a category
  function changeCategoryColor(
    id: number,
    newColor: string
  ) {
    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category.id === id
          ? { ...category, color: newColor }
          : category
      )
    );
  }

  // Begin renaming a category
  function startRenaming(category: Category) {
    setEditingCategoryId(category.id);
    setEditingCategoryName(category.name);
    setCategoryMessage("");
  }

  // Save a renamed category
  function saveCategoryName() {
    if (editingCategoryId === null) return;

    const name = editingCategoryName.trim();

    if (!name) {
      setCategoryMessage("Category name cannot be empty.");
      return;
    }

    const alreadyExists = categories.some(
      (category) =>
        category.id !== editingCategoryId &&
        category.name.toLowerCase() === name.toLowerCase()
    );

    if (alreadyExists) {
      setCategoryMessage("That category name already exists.");
      return;
    }

    setCategories((previousCategories) =>
      previousCategories.map((category) =>
        category.id === editingCategoryId
          ? { ...category, name: name }
          : category
      )
    );

    setEditingCategoryId(null);
    setCategoryMessage("");
  }

  // Delete a category without deleting its tasks
  function deleteCategory(id: number) {
    setCategories((previousCategories) =>
      previousCategories.filter(
        (category) => category.id !== id
      )
    );

    // Move affected tasks to Uncategorized
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.categoryId === id
          ? { ...task, categoryId: null }
          : task
      )
    );

    if (editingCategoryId === id) {
      setEditingCategoryId(null);
    }

    setCategoryMessage("");
  }

  // ========================================
  // 4. TASKS
  // ========================================

  const [tasks, setTasks] = useState<Task[]>([
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
  ]);

  // Mark a task as completed/incomplete
  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  // Assign a task to another category
  function changeTaskCategory(
    id: number,
    categoryId: number | null
  ) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, categoryId: categoryId }
          : task
      )
    );
  }

  // ========================================
  // 5. APPLICATION INTERFACE
  // ========================================

  return (
    <>
      <style>{`

        /* ===================================
           GENERAL STYLING
           =================================== */

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-width: 320px;
          display: block;
          background: #202124;
          color: #f5f5f5;
          font-family: Arial, sans-serif;
        }

        #root {
          width: 100%;
          max-width: none;
          margin: 0;
          padding: 0;
          text-align: left;
        }

        .app {
          display: flex;
          width: 100%;
          min-height: 100vh;
          color-scheme: dark;
        }

        /* ===================================
           SIDEBAR
           =================================== */

        .sidebar {
          width: 230px;
          flex-shrink: 0;
          padding: 30px 18px;
          background: #292a2d;
          border-right: 1px solid #3b3c40;
        }

        .logo {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 40px 12px;
          letter-spacing: -1px;
        }

        .nav-button {
          width: 100%;
          display: block;
          margin-bottom: 8px;
          padding: 13px 16px;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: #b8bac0;
          text-align: left;
          font-size: 15px;
          cursor: pointer;
        }

        .nav-button:hover {
          background: #393a3e;
        }

        .nav-button.active {
          background: #45464b;
          color: #ffffff;
          font-weight: 600;
        }

        /* ===================================
           MAIN CONTENT
           =================================== */

        .main-content {
          flex: 1;
          min-width: 0;
          padding: 45px;
        }

        .page-title {
          font-size: 30px;
          margin: 0 0 10px;
        }

        .subtitle {
          color: #a9abb2;
          margin-bottom: 30px;
        }

        .card {
          background: #333438;
          color: #f5f5f5;
          border: 1px solid #45464b;
          border-radius: 15px;
          padding: 24px;
          max-width: 800px;
        }

        /* ===================================
           CATEGORY SETTINGS
           =================================== */

        .category-settings {
          margin-bottom: 30px;
          padding-bottom: 25px;
          border-bottom: 1px solid #48494d;
        }

        .section-heading {
          font-size: 14px;
          font-weight: 600;
          color: #b8bac0;
          margin: 0 0 15px;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 10px;
          margin-bottom: 15px;
        }

        .category-setting {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: #3b3c40;
          border: 1px solid #48494d;
          border-radius: 10px;
          min-width: 0;
        }

        .category-dot {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
          border-radius: 50%;
        }

        .category-name {
          flex: 1;
          min-width: 0;
          overflow-wrap: anywhere;
          font-size: 13px;
        }

        .category-color {
          width: 32px;
          height: 30px;
          padding: 2px;
          background: transparent;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
        }

        .small-button {
          background: #45464b;
          color: #ffffff;
          border: 1px solid #55565b;
          border-radius: 7px;
          padding: 7px 10px;
          font-size: 12px;
          cursor: pointer;
        }

        .small-button:hover {
          background: #55565b;
        }

        .delete-button {
          background: transparent;
          color: #a9abb2;
          border: none;
          cursor: pointer;
          font-size: 18px;
          padding: 3px 6px;
        }

        .delete-button:hover {
          color: #ff9999;
        }

        .category-rename-form {
          display: flex;
          flex: 1;
          min-width: 0;
          gap: 5px;
          flex-wrap: wrap;
        }

        .category-rename-form input {
          flex: 1;
          min-width: 70px;
        }

        .category-input {
          background: #45464b;
          color: #ffffff;
          border: 1px solid #55565b;
          border-radius: 7px;
          padding: 9px 12px;
          font-size: 13px;
          min-width: 0;
        }

        .category-input:focus {
          outline: 1px solid #9aa4f1;
        }

        .add-category-form {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .add-category-form .category-input {
          flex: 1;
        }

        .primary-button {
          background: #55565e;
          color: #ffffff;
          border: 1px solid #666770;
          border-radius: 8px;
          padding: 10px 15px;
          font-size: 13px;
          cursor: pointer;
        }

        .primary-button:hover {
          background: #686971;
        }

        .category-message {
          color: #ffaaaa;
          font-size: 12px;
          margin: 10px 0 0;
        }

        /* ===================================
           TASKS
           =================================== */

        .task-section {
          margin-bottom: 28px;
        }

        .task-section:last-child {
          margin-bottom: 0;
        }

        .task-section h3 {
          color: #b8bac0;
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 12px;
        }

        .task-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 16px;
          margin-bottom: 10px;
          background: #3b3c40;
          border: 1px solid #48494d;
          border-left: 5px solid #787980;
          border-radius: 10px;
        }

        .task-details {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
          cursor: pointer;
        }

        .task-details input[type="checkbox"] {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          cursor: pointer;
        }

        .task-title {
          overflow-wrap: anywhere;
        }

        .task-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        .task-category-select {
          background: #45464b;
          color: #f5f5f5;
          border: 1px solid #55565b;
          border-radius: 7px;
          padding: 8px;
          font-size: 12px;
          cursor: pointer;
          max-width: 160px;
        }

        .task-category-select:focus {
          outline: 1px solid #9aa4f1;
        }

        /* ===================================
           MOBILE LAYOUT
           =================================== */

        @media (max-width: 650px) {

          .app {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            padding: 18px;
            border-right: none;
            border-bottom: 1px solid #3b3c40;
          }

          .logo {
            margin: 0 0 15px;
          }

          .navigation {
            display: flex;
            gap: 6px;
          }

          .nav-button {
            text-align: center;
            padding: 12px 8px;
          }

          .main-content {
            padding: 25px 18px;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }

          .add-category-form {
            flex-wrap: wrap;
          }

          .task-item {
            flex-wrap: wrap;
          }

          .task-actions {
            margin-left: auto;
          }

        }

      `}</style>

      <div className="app">

        {/* ===================================
            SIDEBAR
            =================================== */}

        <aside className="sidebar">

          <h1 className="logo">diddyblud.</h1>

          <nav className="navigation">

            {pages.map((page) => (
              <button
                key={page}
                className={
                  currentPage === page
                    ? "nav-button active"
                    : "nav-button"
                }
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          </nav>

        </aside>

        {/* ===================================
            MAIN CONTENT
            =================================== */}

        <main className="main-content">

          <h2 className="page-title">
            {currentPage}
          </h2>

          <p className="subtitle">
            Your personal productivity space.
          </p>

          {/* CALENDAR PAGE */}

          {currentPage === "Calendar" && (
            <div className="card">
              <p>Our calendar will appear here.</p>
            </div>
          )}

          {/* ===================================
              TASKS PAGE
              =================================== */}

          {currentPage === "Tasks" && (

            <div className="card">

              {/* CATEGORY SETTINGS */}

              <section className="category-settings">

                <h3 className="section-heading">
                  Task Categories
                </h3>

                <div className="category-grid">

                  {categories.map((category) => (

                    <div
                      key={category.id}
                      className="category-setting"
                    >

                      <span
                        className="category-dot"
                        style={{
                          backgroundColor: category.color,
                        }}
                      />

                      {editingCategoryId === category.id ? (

                        <form
                          className="category-rename-form"
                          onSubmit={(event) => {
                            event.preventDefault();
                            saveCategoryName();
                          }}
                        >

                          <input
                            className="category-input"
                            value={editingCategoryName}
                            onChange={(event) =>
                              setEditingCategoryName(
                                event.target.value
                              )
                            }
                            aria-label="New category name"
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
                              setEditingCategoryId(null);
                              setCategoryMessage("");
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
                            className="small-button"
                            onClick={() =>
                              startRenaming(category)
                            }
                          >
                            Rename
                          </button>
                        </>

                      )}

                      <input
                        type="color"
                        className="category-color"
                        value={category.color}
                        aria-label={
                          `Color for ${category.name}`
                        }
                        onChange={(event) =>
                          changeCategoryColor(
                            category.id,
                            event.target.value
                          )
                        }
                      />

                      <button
                        className="delete-button"
                        aria-label={
                          `Delete ${category.name}`
                        }
                        onClick={() =>
                          deleteCategory(category.id)
                        }
                      >
                        ×
                      </button>

                    </div>

                  ))}

                </div>

                {/* ADD NEW CATEGORY */}

                <form
                  className="add-category-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    addCategory();
                  }}
                >

                  <input
                    className="category-input"
                    type="text"
                    placeholder="New category name..."
                    value={newCategoryName}
                    onChange={(event) =>
                      setNewCategoryName(
                        event.target.value
                      )
                    }
                  />

                  <input
                    type="color"
                    className="category-color"
                    value={newCategoryColor}
                    aria-label="New category color"
                    onChange={(event) =>
                      setNewCategoryColor(
                        event.target.value
                      )
                    }
                  />

                  <button
                    type="submit"
                    className="primary-button"
                  >
                    + Add
                  </button>

                </form>

                {categoryMessage && (
                  <p className="category-message" role="alert">
                    {categoryMessage}
                  </p>
                )}

              </section>

              {/* ===================================
                  TASK LIST
                  =================================== */}

              <div className="task-list">

                {(["Today", "Tomorrow", "Later"] as const).map(
                  (day) => (

                    <section
                      key={day}
                      className="task-section"
                    >

                      <h3>{day}</h3>

                      {tasks
                        .filter((task) => task.due === day)
                        .map((task) => {

                          // Find the task's category
                          const category = categories.find(
                            (item) =>
                              item.id === task.categoryId
                          );

                          return (

                            <div
                              key={task.id}
                              className="task-item"
                              style={{
                                borderLeftColor:
                                  category?.color ?? "#787980",
                              }}
                            >

                              <label className="task-details">

                                <input
                                  type="checkbox"
                                  checked={task.done}
                                  onChange={() =>
                                    toggleTask(task.id)
                                  }
                                />

                                <span
                                  className="task-title"
                                  style={{
                                    textDecoration: task.done
                                      ? "line-through"
                                      : "none",
                                    opacity: task.done
                                      ? 0.5
                                      : 1,
                                  }}
                                >
                                  {task.title}
                                </span>

                              </label>

                              <div className="task-actions">

                                <select
                                  className="task-category-select"
                                  value={task.categoryId ?? ""}
                                  aria-label={
                                    `Category for ${task.title}`
                                  }
                                  onChange={(event) =>
                                    changeTaskCategory(
                                      task.id,
                                      event.target.value === ""
                                        ? null
                                        : Number(
                                            event.target.value
                                          )
                                    )
                                  }
                                >

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

                              </div>

                            </div>

                          );
                        })}

                    </section>

                  )
                )}

              </div>

            </div>

          )}

          {/* HABITS PAGE */}

          {currentPage === "Habits" && (
            <div className="card">
              <p>Our habit tracker will appear here.</p>
            </div>
          )}

        </main>

      </div>
    </>
  );
}

export default App;
