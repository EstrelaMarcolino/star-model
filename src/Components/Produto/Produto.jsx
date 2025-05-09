import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'


export default function Produto({ text, datad }) {
    const [data, setData] = useState([])

    useEffect(() => {
        setData((prev) => datad)
    }, [datad])

    return (
        <div className='fullContentProduct'>
            <h5 className="headeProduct">{text}</h5>

            <div className="productContent">
                {data?.map((data) => (
                    <Link to={`/produto/${data?._id}`} className="cardProductNew" key={data?._id}>
                        <img src={data?.profilePic ? data?.profilePic : ""} alt="" className="imgCardProductnew" />
                        <h6 className="nameProductNew">{data?.nome}</h6>
                        <div className="precoCardNew">
                            <span className="PrecoProductnew atualnew">R${data?.preco}</span>
                            {/* <span className="PrecoProductnew deshednew">R ${data?.preco}</span> */}
                        </div>
                    </Link>
                ))}

            </div>
        </div>
    )
}
