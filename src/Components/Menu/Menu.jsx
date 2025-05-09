import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'
import './style.css'

export default function Menu({ setDatad }) {
  const [palavra, setPalavra] = useState("")
  const { user } = useContext(Context)
  console.log(setDatad)

  const pesquisar = () => {
    try {
      if (palavra.length > 0) {
        window.location.replace(`/search/${palavra}`);
      } else {
        window.location.replace("/");
      }
    } catch (error) { }
  }

  return (
    <div className='fullContentMenu'>
      <div className="itensMenu">
        <li className="itemContentMenu"><Link to="/" className='a'>Home</Link></li>
        <li className="itemContentMenu"><Link to="/cooperativa">Agências</Link></li>
        <li className="itemContentMenu"><Link to="/chat">Chat</Link></li>
      </div>
      <div className="serchMenu">
        <input type="text" onChange={(e) => setPalavra(e.target.value)} placeholder='Pesquisar Modelo' className="serchMEnuInput" />
        <button className="serchMenuButton" onClick={pesquisar}>
          <i className="fa-solid fa-magnifying-glass trocarCor"></i>
        </button>
      </div>
      <div className="vazia">
        {user.profilePic ? (
          <Link to={`/user/${user._id}`}>
            <img src={user.profilePic} alt="" className="imgProfileUseOrCoop" />
          </Link>
        ) : (
          <Link to={`/cooperativa/${user._id}`}>
            <img src={user.logo} alt="" className="imgProfileUseOrCoop" />
          </Link>
        )}
      </div>
    </div>
  )
}
