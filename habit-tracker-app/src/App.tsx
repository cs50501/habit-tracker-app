import { useState } from "react";

// The three pages of our application
type Page = "Calendar" | "Tasks" | "Habits";

type Task = {
  id: number;
  title: string;
  due: "Today" | "Tomorrow" | "Later";
  done: boolean;
  color: string;
};


function App() {
  // Remember which page the user is currently viewing
  const [currentPage, setCurrentPage] = useState<Page>("Calendar");

  
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Finish assignment",
      due: "Today",
      done: false,
      color: "#9AA4F1",
    },
    {
      id: 2,
      title: "Review research progress",
      due: "Today",
      done: false,
      color: "#8EC5AD",
    },
    {
      id: 3,
      title: "Buy groceries",
      due: "Tomorrow",
      done: false,
      color: "#E3AE85",
    },
    {
      id: 4,
      title: "Work on habit tracker",
      due: "Later",
      done: false,
      color: "#D6A2CE",
    },
  ]);



  function toggleTask(id: number) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task
      )
    );
  }

  function changeTaskColor(id: number, newColor: string) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, color: newColor }
          : task
      )
    );
  }



  const pages: Page[] = ["Calendar", "Tasks", "Habits"];

  return (
    <>
      <style>{`
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
        }

        .sidebar {
          width: 230px;
          padding: 30px 18px;
          background: #292a2d;
          border-right: 1px solid #3b3c40;
        }

        .logo {
          font-size: 26px;
          font-weight: 700;
          margin: 0 0 40px 12px;
          letter-spacing: -1px;
          color: #ffffff;
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
          color: #888888;
          margin-bottom: 30px;
        }

        .card {
          background: #333438;
          color: #f5f5f5;
          border: 1px solid #45464b;
          border-radius: 15px;
          padding: 24px;
          max-width: 650px;
        }

        .task-section {
          margin-bottom: 28px;
        }

        .task-section h3 {
          color: #b8bac0;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 12px;
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
          border-left: 5px solid;
          border-radius: 10px;
        }

        .task-details {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .task-details input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
        }

        .task-item input[type="color"] {
          width: 32px;
          height: 32px;
          padding: 2px;
          background: transparent;
          border: none;
          cursor: pointer;
        }


        @media (max-width: 650px) {
          .app {
            flex-direction: column;
          }

          .sidebar {
            width: 100%;
            padding: 18px;
            border-right: none;
            border-bottom: 1px solid #dddddd;
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
        }
      `}</style>

      <div className="app">
        {/* Sidebar navigation */}
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

        {/* Main page */}
        <main className="main-content">
          <h2 className="page-title">{currentPage}</h2>

          <p className="subtitle">
            Your personal productivity space.
          </p>

          <div className="card">
            {currentPage === "Calendar" && (
              <p>Our calendar will appear here.</p>
            )}


            {currentPage === "Tasks" && (
              <div className="task-list">
                {(["Today", "Tomorrow", "Later"] as const).map((day) => (
                  <section key={day} className="task-section">
                    <h3>{day}</h3>

                    {tasks
                      .filter((task) => task.due === day)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="task-item"
                          style={{ borderLeftColor: task.color }}
                        >
                          <label className="task-details">
                            <input
                              type="checkbox"
                              checked={task.done}
                              onChange={() => toggleTask(task.id)}
                            />

                            <span
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

                          <input
                            type="color"
                            value={task.color}
                            aria-label={`Change color for ${task.title}`}
                            onChange={(event) =>
                              changeTaskColor(task.id, event.target.value)
                            }
                          />
                        </div>
                      ))}
                  </section>
                ))}
              </div>
            )}


            {currentPage === "Habits" && (
              <p>Our habit tracker will appear here.</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
