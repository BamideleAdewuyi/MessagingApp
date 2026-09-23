import './App.css'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router'
import { useEffect, useState } from 'react'

function App() {

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default App
