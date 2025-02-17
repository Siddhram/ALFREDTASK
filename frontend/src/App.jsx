import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import AddCards from './AddCards'
import cheakfunc from './url'
import { useNavigate } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)
  const nav=useNavigate()
 useEffect(()=>{
  if(!cheakfunc()){
       nav('/register')
  }
 },[])
  return (
    <>
      <AddCards></AddCards>
    </>
  )
}

export default App
