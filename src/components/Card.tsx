import { Shareicon } from "../icons/Shareicon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutuneIcon";
import { DeleteIcon } from '../icons/DeleteIcon';
import {useState} from 'react'
import {LoadingIcon} from "../icons/Loading";
import axios from "axios";
interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    _id:string;
    refresh:()=>void;
}
export function Card({ title, link, type,_id,refresh }: CardProps) {
    const [loading,isloading] = useState(false)
    
    async function deletedata(){
        isloading(true)
        
        await axios.delete(`http://localhost:3001/api/v1/content`,{
            data: { contentId: _id },
            headers:{ "autherization": localStorage.getItem("token")}
        })
        await new Promise((resolve) => {
  setTimeout(resolve, 5000);
});
        refresh()
        isloading(false)
    }

    return <div>
        <div className="p-4 bg-white rounded shadow-md border-slate-200 border max-w-72 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md text-md">
                    <div className="flex text-gray-500 pr-2">
                        <a href={link} target="_blank">
                        {type==="twitter"?<TwitterIcon/>:<YoutubeIcon/>}
                        </a>
                    </div>
                    {title}
                </div>
                <div className="flex items-center text-gray-500">
                    <div className="pr-2"> 
                        <button onClick={()=>deletedata()} className="cursor-pointer">
                            {loading?<DeleteIcon></DeleteIcon>:<LoadingIcon></LoadingIcon> }
                        
                        </button>
                            
                    </div>
                    <div>
                        <Shareicon />
                    </div>
                </div>


            </div>
            <div className="pt-4">
                {type === "youtube" && (() => {
                    const url = new URL(link);
                    const videoId = url.searchParams.get("v");

                    return (
                        <iframe
                            className="w-full"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    );
                })()}
                {/* {type==="youtube" &&<iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/")} title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}               */}
                {type === "twitter" && <blockquote className="twitter-tweet"><a href={link.replace("x.com", "twitter.com")}></a></blockquote>}
            </div>
        </div>




    </div>

}
