
import { useState } from "react";

// The three pages of our application
type Page = "Calendar" | "Tasks" | "Habits";

function App() {
  // Remember which page the user is currently viewing
  const [currentPage, setCurrentPage] = useState<Page>("Calendar");

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
          max-width: none;
          margin: 0;
          padding: 0;
          text-align: left;
        }

        .app {
          display: flex;
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
          background: #ffffff;
          border: 1px solid #e5e5e5;
          border-radius: 15px;
          padding: 24px;
          max-width: 650px;
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
          <h1 className="logo">dayform.</h1>

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
              <p>Our task manager will appear here.</p>
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
