"use client";

import { FiCheckCircle } from "react-icons/fi";

export default function CartMessage({
    message,
}) {
    if (!message) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-lg bg-black px-4 py-3 text-sm font-medium text-white shadow-lg">
            <FiCheckCircle
                size={18}
                className="text-green-400"
            />

            {message}
        </div>
    );
}