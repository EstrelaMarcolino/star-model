import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import ServerURL from '../../services/ServerURL'


export default function ProductCoop({text, path}) {
    const [data, setData] = useState([])

    useEffect(()=>{
        const getData = async()=>{
            const res = await axios.get(`${ServerURL}/modelo/pesquisa/${path}`)
            console.log(res.data)
            setData(res.data)
        }
        getData()
    }, [path])

    
  return (
    <div className='fullContentProductCoop'>
        <h5 className="headeProduct">{text}</h5>
        
        <div className="productContent">
            {data.map((data)=>(
                <Link to={`/produto/${data?._id}`} className="cardProductNew" key={data?._id}>
                <img src={data?.profilePic} alt="" className="imgCardProductnew" />
                <h6 className="nameProductNew">{data?.nome}</h6>
                <div className="precoCardNew">
                    <span className="PrecoProductnew atualnew">R ${data?.preco}</span>
                    <span className="PrecoProductnew deshednew">R ${data?.preco}</span>
                </div>
            </Link>
            ))}

        </div>
    </div>
  )
}
