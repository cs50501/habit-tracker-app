
export type DueGroup = "Overdue" | "Today" | "Tomorrow" | "Next 7 Days" | "Next 30 Days" | "Later" | "No Due Date";

export type Category = {
    id: number;
    name: string;
    color: string;
};

export type Task = {
    id: number;
    title: string;
    dueDate: string | null;
    done: boolean;
    categoryId: number | null;
};
