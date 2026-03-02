import { useState,useEffect } from 'react'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { Plusicon } from '../icons/Plusicon'
import { useContent } from '../hooks/useContent'
import landingImg from '../img/landing.png';
function Dashboard() {

  const [ModelOpen, SetModelOpen] = useState(false)
  const [selectedType, setSelectedType] = useState("all");
  const {contents,refresh}=useContent()
  const filteredContent = selectedType === "all"
  ? contents
  : contents.filter((item: any) => item.type === selectedType);

  useEffect(()=>{
    refresh()
  },[ModelOpen])

  return (
    <div>
      <div><Sidebar setType={setSelectedType} selectedType={selectedType} /></div>
      <div className="absolute inset-0 -z-10">
            <img
                src={landingImg}
                alt="background"
                className="w-full h-full object-cover opacity-50"
            />
        </div>
      <div className="p-4 ml-72 min-h-screen border-purple-200 bg-white/20">
        <CreateContentModel ModelOpen={ModelOpen} SetModelOpen={() => { SetModelOpen(!open) }} />
        <div className="flex gap-4 justify-end">
          <Button variant="primary" onclick={() => { SetModelOpen(true) }} text="Add   " startIcon={<Plusicon />}></Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {filteredContent.map(({type,link,title,_id}) =>
  <Card key={_id} title={title} link={link} type={type} _id={_id} refresh={refresh} />
)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard

// const [open, setOpen] = useState(false);

// <button
//   onClick={() => setOpen(true)}
//   className="rounded-lg bg-blue-600 px-4 py-2 text-white"
// >
//   Share
// </button>

// <ShareModal
//   isOpen={open}
//   onClose={() => setOpen(false)}
//   url={window.location.href}
//   title="Check this out"
// />