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
import { BACKEND_URL } from '../config';

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
    setOpen: (value: boolean) => void;
    setUrl: (value: string) => void;
}
export function Card({ title, link, type, _id, refresh, setOpen ,setUrl}: CardProps) {
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
            await new Promise(resolve => setTimeout(resolve, 200))

            await axios.delete(`${BACKEND_URL}/api/v1/content`, {
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
        <div className="p-2 sm:p-4 bg-white rounded shadow-md border-slate-200 border w-full h-58 overflow-hidden flex flex-col">
            <div className="flex justify-between items-start gap-2">
                <div className="flex items-center gap-2 min-w-0 flex-1">
                    <a href={link} target="_blank" className="flex-shrink-0 text-gray-500 hover:text-gray-700">
                        {type === "twitter" && <TwitterIcon />}
                        {type === "youtube" && <YoutubeIcon />}
                        {type === "linkedin" && <LinkedinIcon />}
                        {type === "googlemap" && <GoogleMapIcon />}
                    </a>
                    <span className="text-sm sm:text-base font-medium text-gray-800 truncate">{title}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0 text-gray-500">
                    <button onClick={() => deletedata()} className="cursor-pointer hover:text-red-600 transition-colors">
                        {loading ? <LoadingIcon /> : <DeleteIcon></DeleteIcon>}
                    </button>
                    <button onClick={() => {
                        setUrl(link);
                        setOpen(true);
                    }} className="cursor-pointer hover:text-blue-600 transition-colors">
                        <Shareicon />
                    </button>
                </div>


            </div>
            <div className="pt-4 flex-1 overflow-auto">
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
        
                {type === "twitter" && (
                    <div className="max-w-full">
                        <blockquote className="twitter-tweet" data-width="250">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
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
                            className="w-full h-full"
                            src={`https://www.linkedin.com/embed/feed/update/urn:li:share:${shareId}`}
                            frameBorder="0"
                            allowFullScreen
                            title="LinkedIn Post"
                        />
                    );
                })()}
            </div>
        </div>




    </div>

}
