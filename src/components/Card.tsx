import { Shareicon } from "../icons/Shareicon";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutuneIcon";
import { DeleteIcon } from '../icons/DeleteIcon';
import { GoogleMapIcon } from '../icons/GooglemapIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { useState } from 'react'
import { useEffect } from "react";
import { LoadingIcon } from "../icons/Loading";
import axios from "axios";

declare global {
  interface Window {
    twttr: any;
  }
}

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube" | "googlemap" | "linkedin";
    _id: string;
    refresh: () => void;
}
export function Card({ title, link, type, _id, refresh }: CardProps) {
    const [loading, isloading] = useState(false)
 useEffect(() => {
  if (type === "twitter" && window.twttr) {
    window.twttr.widgets.load();
  }
}, [link, type]);

    async function deletedata() {
        try {
            isloading(true)

            // React repaint just for testing
            await new Promise(resolve => setTimeout(resolve, 500))

            await axios.delete(`http://localhost:3001/api/v1/content`, {
                data: { contentId: _id },
                headers: { autherization: localStorage.getItem("token") }
            })

            refresh()

        } catch (err) {
            console.error(err)
        } finally {
            isloading(false)
        }
    }

    return <div>
        <div className="p-4 bg-white rounded shadow-md border-slate-200 border max-w-72 min-h-48 min-w-72">
            <div className="flex justify-between">
                <div className="flex items-center text-md text-md">
                    <div className="flex text-gray-500 pr-2">
                        <a href={link} target="_blank">
                            {type === "twitter" &&<TwitterIcon />}
                            {type === "youtube" &&<YoutubeIcon />}
                            {type === "linkedin" &&<LinkedinIcon />}
                            {type === "googlemap" &&<GoogleMapIcon />}
                        </a>
                    </div>
                    {title}
                </div>
                <div className="flex items-center text-gray-500">
                    <div className="pr-2">
                        <button onClick={() => deletedata()} className="cursor-pointer">
                            {loading ? <LoadingIcon /> : <DeleteIcon></DeleteIcon>}

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
                {type === "twitter" && (
                    <>
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </>
                )}
                {type === "googlemap" && (() => {
                    const match = link.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);

                    if (!match) return <p>Invalid Google Maps URL</p>;

                    const lat = match[1];
                    const lng = match[2];

                    return (
                        <iframe
                            className="w-full"
                            src={`https://www.google.com/maps?q=${lat},${lng}&output=embed`}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    );
                })()}
                {type === "linkedin" && (() => {
                    const match = link.match(/(\d{19})/);

                    if (!match) return <p>Invalid LinkedIn URL</p>;

                    const shareId = match[1];

                    return (
                        <iframe
                            className="w-full"
                            src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${shareId}`}
                            height="600"
                            frameBorder="0"
                            allowFullScreen
                            title="LinkedIn Post"
                            style={{ borderRadius: "8px" }}
                        />
                    );
                })()}
            </div>
        </div>




    </div>

}
