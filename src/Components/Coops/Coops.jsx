import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import ServerURL from '../../services/ServerURL'


export default function Coops({ text }) {
    const [data, setData] = useState([])


    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${ServerURL}/agencia`)
            setData(res.data)
        }
        getData()
    }, [])
    return (
        <div className='fullContentProductCop'>
            <h5 className="headeProduct">{text}</h5>

            <div className="productContent">
                {data?.map((post) => (
                    <Link className="titleColor" to={`/cooperativa/${post?._id}`} key={post?._id}>
                        <div className="Produto" key={post?._id}>
                            <div className='imgProduto' id='Produto'>
                                <img className='imagemCard sizePhoto' src={post?.logo} alt=' ' />
                            </div>
                            <div className='nomePreco'>
                                <h5 className='valorNome'>{post?.nome}</h5>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
