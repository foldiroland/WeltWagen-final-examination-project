import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Login from './pages/Login'



function App() {

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
