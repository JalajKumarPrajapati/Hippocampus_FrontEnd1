
import './App.css'
import Dashboard from './pages/dashboard'
import {Signup} from './pages/Signup'
import { Toaster } from "react-hot-toast";
import {Signin} from './pages/Signin'
import {Landing} from './pages/Landing'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return <>
  <Toaster />
  <BrowserRouter>
  <Routes>
   <Route path="/" element={<Landing></Landing>}></Route>
   <Route path="/signup" element={<Signup></Signup>}></Route>
   <Route path="/signin" element={<Signin></Signin>}></Route>
   <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
  </Routes>
  </BrowserRouter></>
}

export default App
