import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlantDiseasePrediction from './Components/PlantDiseasePrediction/PlantDiseasePrediction'
import ChimneyDetection from './Components/ChimneyDetection/ChimneyDetection'
// import Contact from './Components/Contact/contact'
// import Register from './Components/Register/Register'
import Home from './Pages/Home/Home'
import About from './Components/About/About'
import CrackDetection from './Components/CrackDetection/CrackDetection'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/plantdisease' element={<PlantDiseasePrediction/>}/>
        <Route path='/chimneydetection' element={<ChimneyDetection/>}/>
        <Route path='/crackdetection' element={<CrackDetection/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
