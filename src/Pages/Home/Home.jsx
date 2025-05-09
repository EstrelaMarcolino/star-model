import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Destaque from '../../Components/Destaque/Destaque'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Produto from '../../Components/Produto/Produto'
import './style.css'
import ServerURL from '../../services/ServerURL'

export default function Home() {
  const [datad, setDatad] = useState([])

  console.log(ServerURL)

  useEffect(()=>{
    const getData = async()=>{
        const res = await axios.get(`${ServerURL}/modelo`)
        // console.log(res.data)
        setDatad(res.data)
    }
    getData()
}, [])

  return (
    <div className='fullConteinerHome'>
        <Header />
        <Menu setDatad={setDatad} />
        <Destaque />
        <Produto text={"Modelos em Destaque"} datad={datad} />
        <div className="headerHome"></div>
    </div>
  )
}
