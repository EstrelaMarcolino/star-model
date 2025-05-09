import React from 'react'
import './Adm.css'
import Header from '../../Components/Header/Header'
import Menu from '../../Components/Menu/Menu'



export default function Adm() {

       
    return (
        <div className='Fullcontent'>
            <Header />
            <Menu />

            <div className="cardsAdm">
                <div className="contentCardAdm">
                    
                    {/* CardComponent */}
                    <div className="cardComponentAdm">
                        <div className="iconAdm"><i class="fa-regular fa-user styIconAdm"></i></div>
                        <div className="textAdm">
                            <div className="descAdm">Usuários</div>
                            <div className="quantAdm">200</div>
                        </div>
                    </div>

                    <div className="cardComponentAdm">
                        <div className="iconAdm"><i className="fa-solid fa-shop styIconAdm"></i></div>
                        <div className="textAdm">
                            <div className="descAdm">Agencias</div>
                            <div className="quantAdm">25</div>
                        </div>
                    </div>
                    <div className="cardComponentAdm">
                        <div className="iconAdm"><i className="fa-solid fa-user-tag styIconAdm"></i></div>
                        <div className="textAdm">
                            <div className="descAdm">Modelos</div>
                            <div className="quantAdm">23</div>
                        </div>
                    </div>
                    <div className="cardComponentAdm">
                        <div className="iconAdm"><i class="fa-regular fa-comment-dots styIconAdm"></i></div>
                        <div className="textAdm">
                            <div className="descAdm">Chat</div>
                            <div className="quantAdm">30/200</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
