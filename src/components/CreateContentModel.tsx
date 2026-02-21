import {Closeicon} from '../icons/Closeicon'
import { Button } from './Button';
import { Input } from './Input';
import {useRef,useState} from 'react';
import axios from 'axios';
interface CreateContentModelProps{
    ModelOpen: boolean;
    SetModelOpen: ()=>void;
}
const ContentType = {
    YOUTUBE: "youtube",
    TWITTER: "twitter"
} as const;

type ContentType = typeof ContentType[keyof typeof ContentType];

export function CreateContentModel({ModelOpen,SetModelOpen}:CreateContentModelProps){
    const linkRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    const [type,setType]=useState<ContentType>(ContentType.YOUTUBE)
    async function addContent(){
        const link = linkRef.current?.value;
        const title = titleRef.current?.value;
        await axios.post("http://localhost:3001/api/v1/content", {
            link,
            type,
            title
        },{
            headers:{ "autherization": localStorage.getItem("token")}
        })
        SetModelOpen()

    }

    return <div>
    {ModelOpen && <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 bg-slate-500/60 flex justify-center">
    <div className="flex flex-col justify-center">
        <span className="bg-white opacity-100 p-4 rounded">
            <div className="flex justify-end">
                <div onClick={SetModelOpen} className="cursor-pointer">
                <Closeicon></Closeicon>
                </div>
            </div>
            <div>
                <Input ref={titleRef} placeholder={"Title"}/>
                <Input ref={linkRef} placeholder={"Link"}/>
                <div className="flex p-4">
                    <Button onclick={()=>setType(ContentType.YOUTUBE)} variant={type==ContentType.YOUTUBE?"primary":"secondary"} text="Youtube"></Button>
                    <Button onclick={()=>setType(ContentType.TWITTER)} variant={type==ContentType.TWITTER?"primary":"secondary"} text="Twitter"></Button>
                </div>
                <div className="flex justify-center">
                <Button onclick={addContent} variant="primary" text="Submit"></Button>
                </div>

            </div>
        </span>
    </div>
    </div>}
    
    
    </div>

}

// function Input({onChange, placeholder}:{onChange: () => void}){
//     return <div>
//         <input placeholder={placeholder} type={"text"} className="px-4 py-2 border rounded m-2" onChange={onChange}></input>
//     </div>
// }