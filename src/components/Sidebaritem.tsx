import { ReactElement } from "react";


interface Sidebar {
    text: string;
    label:string;
    icon: ReactElement;
    setType: (type: string) => void;
    active?: boolean;
}

export function Sidebaritem({ text, icon, setType, active,label }: Sidebar) {
    return (
        <button
            onClick={() => setType(text)}
                className={`flex items-center w-full min-w-[180px] max-w-[180px] px-6 py-2 cursor-pointer rounded transition-all duration-300 ${active ? "bg-purple-200 text-whitefont-bold" : "text-gray-700 hover:bg-gray-200"}`}
        >
            <div className="p-2">{icon}</div>
            <div className="p-2">{label}</div>
        </button>
    );
}
