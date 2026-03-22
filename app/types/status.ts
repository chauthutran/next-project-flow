export const STATUS_DETAILS = {
    not_started: {
        name: "Not Started",
        textColor: "text-gray-800",
        bgColor: "bg-gray-200",
    },
    pending: {
        name: "Pending",
        textColor: "text-white",
        bgColor: "bg-gray-500",
    },
    planning: {
        name: "Planning",
        textColor: "text-green-700",
        bgColor: "bg-green-100",
    },
    in_progress: {
        name: "In Progress",
        textColor: "text-blue-700",
        bgColor: "bg-blue-100",
    },
    on_hold: {
        name: "On Hold",
        textColor: "text-purple-700",
        bgColor: "bg-purple-100",
    },
    completed: {
        name: "Completed",
        textColor: "text-green-700",
        bgColor: "bg-green-100",
    },
    cancelled: {
        name: "Cancelled",
        textColor: "text-gray-700",
        bgColor: "bg-gray-300",
    },
    delayed: {
        name: "Delayed",
        textColor: "text-orange-700",
        bgColor: "bg-orange-100",
    },
} as const;

export const STATUS_KEYS = Object.keys(STATUS_DETAILS) as (keyof typeof STATUS_DETAILS)[];

export type ProjectStatus = keyof typeof STATUS_DETAILS;