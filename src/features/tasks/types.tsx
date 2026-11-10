
export type DueGroup = "Today" | "Tomorrow" | "Later";

export type Category = {
    id: number;
    name: string;
    color: string;
};

export type Task = {
    id: number;
    title: string;
    due: DueGroup;
    done: boolean;
    categoryId: number | null;
};
