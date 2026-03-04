import { Input } from '../components/Input'
import { useRef, useState } from 'react'
import { Button } from '../components/Button'
import { BACKEND_URL } from "../config"
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"
import landingImg from '../img/landing.png';
import { LoadingIcon } from "../icons/Loading";
import { Hippo } from '../icons/Hippo';
import toast from "react-hot-toast";
import axios from 'axios'
export function Signin(){
    const usernameRef = useRef<HTMLInputElement | null>(null);
    const passwordRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const navigate=useNavigate();

    async function signin(): Promise<void> {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 200))
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        try {
            const respones = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
                username,
                password,
            });
            const jwt = respones.data?.token;
            console.log(jwt);
            if (jwt) localStorage.setItem("token", jwt);
             toast.success(respones?.data?.message || "Login Success");
            navigate("/dashboard")
            setLoading(false)

        } catch (error:any) {
            if (error.response) {
                toast.error(error.response?.data?.message || "Login failed");
                setLoading(false)
            } else {
                alert("Network error");
                setLoading(false)
            }
        }
    }
    return <div className="relative ">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
            <img
                src={landingImg}
                alt="background"
                className="w-full h-full object-cover opacity-50"
            />
        </div>
        {/* Your Components */}
        <div className="flex flex-col justify-center items-center h-screen z-10-center z-10">
            <div className='flex flex-col justify-center items-center'>
                <div className="bg-white/60 rounded-xl border border-purple-200 flex flex-col justify-center items-center min-w-48 p-8">
                    <Hippo size={100} ></Hippo>
                    <Input ref={usernameRef} placeholder="Username"></Input>
                    <div className="flex justify-center items-center">
                        <Input ref={passwordRef} placeholder="Password" type={show ? "text" : "password"}></Input>
                        <div><button
                            type="button"
                            onClick={() => setShow(prev => !prev)}
                            className="absolute -translate-y-1/2"
                        >
                            {show ? <EyeOff size={20} color="#b13939" /> : <Eye size={20} color="#b13939" />}
                        </button></div>
                    </div>
                    <div className="flex justify-center pt-4 min-w-48 p-8 rounded">
                        {loading?<LoadingIcon></LoadingIcon>:<Button onclick={signin} variant='primary' text='Login' fullWidth={true} loading={false}></Button>}
                    </div>
                </div>
            </div>

        </div>


    </div>
}