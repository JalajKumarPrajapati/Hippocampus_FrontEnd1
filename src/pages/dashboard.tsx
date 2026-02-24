import { useState,useEffect } from 'react'
import { Button } from '../components/Button'
import { Sidebar } from '../components/Sidebar'
import { Card } from '../components/Card'
import { CreateContentModel } from '../components/CreateContentModel'
import { Shareicon } from '../icons/Shareicon'
import { Plusicon } from '../icons/Plusicon'
import { useContent } from '../hooks/useContent'
import landingImg from '../img/landing.png';
function Dashboard() {

  const [ModelOpen, SetModelOpen] = useState(false)
  const {contents,refresh}=useContent()

  useEffect(()=>{
    refresh()
  },[ModelOpen])

  return (
    <div>
      <div><Sidebar></Sidebar></div>
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
          <Button variant="secondary" text="Share Hipp" startIcon={<Shareicon />}></Button>
          <Button variant="primary" onclick={() => { SetModelOpen(true) }} text="Add   " startIcon={<Plusicon />}></Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({type,link,title,_id})=><Card title={title} link={link} type={type} _id={_id} refresh={refresh}></Card>)}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
