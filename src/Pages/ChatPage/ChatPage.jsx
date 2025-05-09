import React, { useContext, useEffect, useState } from 'react'
import './ChatPage.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import ChatUser from '../../Components/ChatUser/ChatUser'
import { Context } from '../../Context/Context'
import Chat from '../../Components/Chat/Chat'



export default function ChatPage() {
    const [chatMatch, setChatMatch] = useState(true)
    const [objectUser, setObjectUser] = useState({})
    const [add, setAdd] = useState("border")
    const [addd, setAddd] = useState(" ")
    const [sms, setSms] = useState([])
    // const navegar = useNavigate()
    const { user } = useContext(Context)

    const location = useLocation()
    const path = location.pathname.split("/")[2]
    // console.log(path)


    useEffect(() => {
        const getChat = async () => {
            try {
                const ChatObject = await axios.get(`http://localhost:8000/chat/chat/${path}`)
                setSms(ChatObject.data)
            } catch (err) {
                console.log(err)
            }
        }
        getChat()
    }, [path])

    const setChat = () => {
        setAdd(" ")
        setAddd("border")
    }

    return (
        <div className='fullPrincipal'>
            <section className='sectMenu'>
                <menu className='menuImgSeta'>
                    <div className="imgName">
                        <img 
                            src={user.profilePic ? user.profilePic : user.logo}
                            alt="" className="PhotoProfile" 
                        />
                        <h4 className='userAmaral'>{user.profilePic ? user.username : user.nome}</h4>
                    </div>
                    <div className=""><Link to="/"><i class="fa-solid fa-angles-left ArrowLeftChat"></i></Link></div>
                </menu>
                <div className="matchAndChat">
                    <div className={`chat ${add}`} onClick={setChat}>Chat</div>
                </div>
                <ChatUser setChatMatch={setChatMatch} setObjectUser={setObjectUser} />
            </section>
            <fieldset className='fieldBody'>
                {chatMatch && (<Chat objectUser={objectUser} sms={sms} path={path} />)}

            </fieldset>
        </div>
    )
}