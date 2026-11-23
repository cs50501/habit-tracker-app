import type { DueGroup } from "./types";

// this converts a date into YYYY-MM-DD using local time
export function toLocalDateString(date: Date): string {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// determine which date group a task belongs to
export function getDueGroup(dueDate: string | null): DueGroup {
    if (!dueDate) {
        return "No Due Date";
    }

    const today = toLocalDateString(new Date());

    const [year, month, day] = dueDate.split("-").map(Number);

    const [todayYear, todayMonth, todayDay] = today.split("-").map(Number);


    // compare calender dates using UTC day numbers to avoid daylight saving issues
    const dueTime = Date.UTC(year, month - 1, day);

    const todayTime = Date.UTC(todayYear, todayMonth - 1, todayDay);

    const daysDifference = Math.round(dueTime - todayTime) / 86400000;

    if (daysDifference < 0) return "Overdue";
    if (daysDifference === 0) return "Today";
    if (daysDifference === 1) return "Tomorrow";
    if (daysDifference <= 7) return "Next 7 Days";
    if (daysDifference <= 30) return "Next 30 Days";

    return "Later";
}