import { TwitterIcon } from '../icons/TwitterIcon'
import { YoutubeIcon } from '../icons/YoutuneIcon'
import { GoogleMapIcon } from '../icons/GooglemapIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { AllIcon } from '../icons/AllIcon'
import { LogoOutIcon } from '../icons/LogoOutIcon'
import { Hippo } from '../icons/Hippo'
import { Sidebaritem } from './Sidebaritem'
export function Sidebar({ setType, selectedType }: { setType: (type: string) => void, selectedType: string }) {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
        <div className="flex text-2xl pt-4 items-center">
            <div className='pr-2'>
                <Hippo size={32}></Hippo>
            </div>
            Hippocampus</div>
        <div className="pt-4">
            <Sidebaritem setType={setType} text="all" icon={<AllIcon></AllIcon>} active={selectedType === "all"} />
            <Sidebaritem setType={setType} text="twitter" icon={<TwitterIcon></TwitterIcon>} active={selectedType === "twitter"} />
            <Sidebaritem setType={setType} text="youtube" icon={<YoutubeIcon></YoutubeIcon>} active={selectedType === "youtube"} />
            <Sidebaritem setType={setType} text="googlemap" icon={<GoogleMapIcon></GoogleMapIcon>} active={selectedType === "googlemap"} />
            <Sidebaritem setType={setType} text="linkedin" icon={<LinkedinIcon></LinkedinIcon>} active={selectedType === "linkedin"} />
        </div>
        <div className="absolute bottom-3">
            {/* <Sidebaritem text="Log Out" icon={<LogoOutIcon></LogoOutIcon>}></Sidebaritem> */}
        </div>

    </div>
}