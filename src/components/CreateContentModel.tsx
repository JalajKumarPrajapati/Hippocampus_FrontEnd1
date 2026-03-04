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
    TWITTER: "twitter",
    MAP:"googlemap",
    LINKEDIN:"linkedin"
} as const;

type ContentType = typeof ContentType[keyof typeof ContentType];

function detectType(link: string): ContentType | null {
  if (/youtube\.com|youtu\.be/.test(link)) return "youtube";
  if (/x\.com|twitter\.com/.test(link)) return "twitter";
  if (/google\.com\/maps/.test(link)) return "googlemap";
  if (/linkedin\.com\/(posts|feed|share)/.test(link)) return "linkedin";
  return null;
}

export function CreateContentModel({ModelOpen,SetModelOpen}:CreateContentModelProps){
    const linkRef = useRef<HTMLInputElement | null>(null);
    const titleRef = useRef<HTMLInputElement | null>(null);
    // const [type,setType]=useState<ContentType>(ContentType.YOUTUBE)
    async function addContent(){
        const link = linkRef.current?.value;
        const type =detectType(link || "")
        console.log(type)
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
    {ModelOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="flex flex-col ">
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
                    {/* <Button onclick={()=>setType(ContentType.YOUTUBE)} variant={type==ContentType.YOUTUBE?"primary":"secondary"} text="Youtube"></Button>
                    <Button onclick={()=>setType(ContentType.TWITTER)} variant={type==ContentType.TWITTER?"primary":"secondary"} text="Twitter"></Button>
                    <Button onclick={()=>setType(ContentType.MAP)} variant={type==ContentType.MAP?"primary":"secondary"} text="MAP"></Button>
                    <Button onclick={()=>setType(ContentType.LINKEDIN)} variant={type==ContentType.LINKEDIN?"primary":"secondary"} text="Linkedin"></Button> */}

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

