import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'
import Produto from '../../Components/Produto/Produto'
import './style.css'
import { useLocation } from 'react-router-dom'
import ServerURL from '../../services/ServerURL'


export default function Search() {
    const [datad, setDatad] = useState([])
    const localization = useLocation()
    const Key = localization.pathname.split("/")[2]
    console.log(Key)

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${ServerURL}/modelo/search/${Key}`);
            console.log(res.data)
            setDatad(res.data)
        }
        getData()
    }, [])

    return (
        <div className='fullConteinerHome'>
            <Header />
            <Menu setDatad={setDatad} />
            <Produto text={"Procurar Modelos"} datad={datad} />
            <div className="headerHome"></div>
        </div>
    )
}
