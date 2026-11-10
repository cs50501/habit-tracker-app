export type Page = "Calendar" | "Tasks" | "Habits";

type SidebarProps = {
    currentPage: Page;
    onPageChange: (page: Page) => void;
};

const pages: Page[] = [
    "Calendar",
    "Tasks",
    "Habits",
];

function Sidebar({ currentPage, onPageChange }: SidebarProps) {
    return (
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
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
                ))}
            </nav>
        </aside>
    );
}

export default Sidebar