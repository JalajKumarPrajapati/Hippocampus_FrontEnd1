import {ReactElement} from "react";

interface Sidebar{
    text:string;
    icon:ReactElement;
}

export function Sidebaritem({text,icon}:Sidebar){
    return <div className="flex items-center text-gray-700 cursor-pointer hover:bg-gray-200 rounded max-w-48 transition-all duration-300">
    <div className="p-2">{icon}</div>
    <div className="p-2">{text}</div>
        
    </div>
}
