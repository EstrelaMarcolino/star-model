import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import ServerURL from '../../services/ServerURL'


export default function Destaque() {

    const [vendaVazia, setVendaVazia] = useState(false)
    const carrocelVenda = useRef(null)
    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get(`${ServerURL}/agencia`)
            setData(res.data)
            setVendaVazia(false)
        }
        getData()
    }, [])

    const LeftVenda = (e) => {
        e.preventDefault()
        carrocelVenda.current.scrollLeft -= carrocelVenda.current.offsetWidth
    }
    const RightVenda = (e) => {
        e.preventDefault()
        carrocelVenda.current.scrollLeft += carrocelVenda.current.offsetWidth
    }

    return (
        <div>
            <div className="vendaDivulgacoes">
                <h5 className="vendaI">Agências Em Destaques</h5>
                <div className="compartilharDiv" ref={carrocelVenda}>
                    {data?.map((post) => (
                        <Link className="titleColor" to={`/cooperativa/${post?._id}`} key={post?._id}>
                            <div className="Produto" key={post?._id}>
                                <div className='imgProduto' id='Produto'>
                                    <img className='imagemCard sizePhoto' src={post?.logo} alt=' ' />
                                </div>
                                <div className='nomePreco'>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                {!vendaVazia && (
                    <div className='buttomGrupe'>
                        <button onClick={LeftVenda} className='buttomLeft margnLeft borderIcon'>
                            <i className="fa-solid fa-circle-chevron-left widthIconButtom borderIcon"></i>
                        </button>
                        <button onClick={RightVenda} className='buttomLeft marginRight borderIcon'>
                            <i className="fa-solid fa-circle-chevron-right widthIconButtom borderIcon"></i>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
