import { Route, Routes } from "react-router-dom"
import Footer from "./Components/Footer"
import Header from "./Components/Header"
import Auth from "./Page/Auth"
import Dashboard from "./Page/Dashboard"
import Home from "./Page/Home"
import Project from "./Page/Project"
import { useContext } from "react"
import { isAuthTokenContext } from "./Context/ContextShare"


function App() {
  
const {isAuthToken , SetIsAuthToken} = useContext(isAuthTokenContext)
  return (
    <>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/dashboard" element={isAuthToken? <Dashboard/> : <Home/>} />
      <Route path="/login" element={<Auth/>} />
      <Route path="/register" element={<Auth registerPage={'registerPage'}/>} />
      <Route path="/project" element={<Project/>} />
    </Routes>
     
     <Footer/>

    </>
  )
}

export default App
