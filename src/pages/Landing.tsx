
import landingImg from '../img/landing.png';
import { Hippo } from '../icons/Hippo';
import {Button} from '../components/Button'
import { useNavigate } from "react-router-dom";
import "../index.css";

export function Landing() {
    const navigate = useNavigate();

    return (
    <div className="relative ">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={landingImg}
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>

      {/* Your Components */}
      <div className="flex flex-col justify-center items-center h-screen z-10">
        <div className="animate-[float_2s_ease-in-out_infinite]">
          <Hippo size={100} ></Hippo>
        </div>
         <div className='flex flex-col justify-center items-center text-center max-w-md sm:max-w-4xl'>
            <h1 className="text-2xl sm:text-4xl font-inter text-purple-600 mb-4">Welcome to Hippocampus</h1>
            <h2 className="sm:text-2xl text-purple-600 mb-4">Capture, organize,and share notes, videos,tweets and links in one beautiful place</h2>
        </div>
        <div className="flex gap-4 mt-8 ">
            <Button onclick={() => navigate("/signup")} variant="primary" text="Sign up"></Button>
            <Button onclick={() => navigate("/signin")} variant="secondary" text="Log In"></Button>
          
        </div>
      </div>
    </div>
  );
}