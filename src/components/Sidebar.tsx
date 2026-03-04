import { TwitterIcon } from '../icons/TwitterIcon'
import { YoutubeIcon } from '../icons/YoutuneIcon'
import { GoogleMapIcon } from '../icons/GooglemapIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { AllIcon } from '../icons/AllIcon'
import { LogoOutIcon } from '../icons/LogoOutIcon'
import { Hippo } from '../icons/Hippo'
import { Sidebaritem } from './Sidebaritem'
import {useNavigate} from 'react-router-dom'
export function Sidebar({ setType, selectedType }: { setType: (type: string) => void, selectedType: string }) {
    const navigate = useNavigate()
    function logout(){
        localStorage.removeItem("token")
        navigate('/')
    }
    return <div className="h-screen bg-white border-gray-200 border-r w-72 fixed left-0 top-0 pl-4">
        <div className="flex text-2xl pt-4 items-center">
            <div className='pr-2'>
                <Hippo size={32}></Hippo>
            </div>
            Hippocampus</div>
        <div className="pt-4">
            <Sidebaritem setType={setType} label="All" text="all" icon={<AllIcon></AllIcon>} active={selectedType === "all"} />
            <Sidebaritem setType={setType} label="Twitter" text="twitter" icon={<TwitterIcon></TwitterIcon>} active={selectedType === "twitter"} />
            <Sidebaritem setType={setType} label="Youtube" text="youtube" icon={<YoutubeIcon></YoutubeIcon>} active={selectedType === "youtube"} />
            <Sidebaritem setType={setType} label="Googlemap" text="googlemap" icon={<GoogleMapIcon></GoogleMapIcon>} active={selectedType === "googlemap"} />
            <Sidebaritem setType={setType} label="Linkedin" text="linkedin" icon={<LinkedinIcon></LinkedinIcon>} active={selectedType === "linkedin"} />
        </div>
        <div className="absolute bottom-3">
            <button onClick={()=>logout()}className="cursor-pointer">
            <div className="flex items-center text-gray-500">
                <div className="p-2">
                    <LogoOutIcon></LogoOutIcon>
                </div>
                <div className="p-2">Log Out</div>
            </div>
            </button>
        </div>

    </div>
}