import { TwitterIcon } from '../icons/TwitterIcon'
import { YoutubeIcon } from '../icons/YoutuneIcon'
import { LogoOutIcon } from '../icons/LogoOutIcon'
import { Hippo } from '../icons/Hippo'
import { Sidebaritem } from './Sidebaritem'
export function Sidebar() {
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-4">
        <div className="flex text-2xl pt-4 items-center">
            <div className='pr-2'>
                <Hippo size={32}></Hippo>
            </div>
            Hippocampus</div>
        <div className="pt-4">
            <Sidebaritem text="Twitter" icon={<TwitterIcon></TwitterIcon>}></Sidebaritem>

            <Sidebaritem text="Youtube" icon={<YoutubeIcon></YoutubeIcon>}></Sidebaritem>
        </div>
        <div className="absolute bottom-3">
            <Sidebaritem text="Log Out" icon={<LogoOutIcon></LogoOutIcon>}></Sidebaritem>
        </div>

    </div>
}