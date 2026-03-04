import { useState, useEffect } from 'react'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { ShareModal } from '../components/Share'
import { Plusicon } from '../icons/Plusicon'
import { Hippo } from '../icons/Hippo'
import { LogoOutIcon } from '../icons/LogoOutIcon'
import { TwitterIcon } from '../icons/TwitterIcon'
import { YoutubeIcon } from '../icons/YoutuneIcon'
import { GoogleMapIcon } from '../icons/GooglemapIcon'
import { LinkedinIcon } from '../icons/LinkedinIcon'
import { AllIcon } from '../icons/AllIcon'
import { useContent } from '../hooks/useContent'
import {useNavigate} from 'react-router-dom'
import landingImg from '../img/landing.png';
function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')
  const [ModelOpen, SetModelOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("all");
  const { contents, refresh } = useContent()
  const filteredContent = selectedType === "all"
    ? contents
    : contents.filter((item: any) => item.type === selectedType);

     const navigate = useNavigate()
    function logout(){
        localStorage.removeItem("token")
        navigate('/')
    }

  useEffect(() => {
    refresh()
  }, [ModelOpen])

  return (
    <div>
      <div className="hidden md:flex"><Sidebar setType={setSelectedType} selectedType={selectedType} /></div>

      {/* Mobilenav bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-3 py-2.5 w-full">
          {/* Logo */}
          <div className="flex items-center gap-1.5 font-semibold text-base flex-1 min-w-0">
            <Hippo size={22} />
            <span className="truncate">Hippocampus</span>
          </div>

          {/* Add Button */}
          <button
            onClick={() => SetModelOpen(true)}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white shadow active:scale-95 transition-transform flex items-center justify-center ml-2"
          >
            <Plusicon />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <img
          src={landingImg}
          alt="background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="p-4 md:ml-72 min-h-screen border-purple-200 bg-white/20 pt-16 md:pt-4 pb-20 md:pb-4">
        <CreateContentModel ModelOpen={ModelOpen} SetModelOpen={() => { SetModelOpen(!ModelOpen) }} />
        <ShareModal isOpen={isOpen} onClose={() => setIsOpen(false)} url={url}></ShareModal>
        <div className="fixed top-4 right-4 z-40 hidden md:block">
          <Button variant="primary" onclick={() => { SetModelOpen(true) }} text="Add   " startIcon={<Plusicon />}></Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 md:mt-16">
          {filteredContent.map(({ type, link, title, _id }) =>
            <Card key={_id} title={title} link={link} type={type} _id={_id} refresh={refresh} setUrl={setUrl} setOpen={setIsOpen} />
          )}
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-gray-50 border-t border-gray-600 shadow-lg">
        <div className="flex justify-around items-center py-2">
          <button
            onClick={() => setSelectedType("all")}
            className={`flex flex-col items-center p-2 ${selectedType === "all" ? "text-purple-600" : "text-gray-500"}`}
          >
            <AllIcon />
          </button>
          <button
            onClick={() => setSelectedType("twitter")}
            className={`flex flex-col items-center p-2 ${selectedType === "twitter" ? "text-purple-600" : "text-gray-500"}`}
          >
            <TwitterIcon />
            
          </button>
          <button
            onClick={() => setSelectedType("youtube")}
            className={`flex flex-col items-center p-2 ${selectedType === "youtube" ? "text-purple-600" : "text-gray-500"}`}
          >
            <YoutubeIcon />
            
          </button>
          <button
            onClick={() => setSelectedType("googlemap")}
            className={`flex flex-col items-center p-2 ${selectedType === "googlemap" ? "text-purple-600" : "text-gray-500"}`}
          >
            <GoogleMapIcon />
            
          </button>
          <button
            onClick={() => setSelectedType("linkedin")}
            className={`flex flex-col items-center p-2 ${selectedType === "linkedin" ? "text-purple-600" : "text-gray-500"}`}
          >
            <LinkedinIcon />
          </button>
          <button onClick={()=>logout()}className="cursor-pointer">
                      <div className="flex items-center text-gray-500">
                          <div className="p-2">
                              <LogoOutIcon></LogoOutIcon>
                          </div>
                      </div>
                      </button>
        </div>
      </div>
      
  </div>)
}

export default Dashboard
