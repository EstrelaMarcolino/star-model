import React, { useContext, useEffect, useState } from 'react'
import './AllChats.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import ChatUser from '../../Components/ChatUser/ChatUser'
import { Context } from '../../Context/Context'
// import Chat from '../../Components/Chat/Chat'
import Empty from '../../Components/Empty/Empty'
import ServerURL from '../../services/ServerURL'




export default function AllChats() {
    const [chatMatch, setChatMatch] = useState(true)
    const [objectUser, setObjectUser] = useState({})
    const [add, setAdd] = useState("border")
    const [addd, setAddd] = useState(" ")
    const [sms, setSms] = useState([])
    const { user } = useContext(Context)

    const location = useLocation()
    const path = location.pathname.split("/")[2]
    // console.log(path)


    useEffect(() => {
        const getChat = async () => {
            try {
                const ChatObject = await axios.get(`${ServerURL}/chat/chat/${path}`)
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
                        <img src={user.profilePic ? user.profilePic : user.logo} alt="" className="PhotoProfile" />
                        <h4 className='userAmaral'>{user.profilePic ? user.username : user.nome}</h4>
                    </div>
                    <div className=""></div>
                </menu>
                <div className="matchAndChat">
                    <div className={`chat ${add}`} onClick={setChat}>Chat</div>
                </div>
                <ChatUser setChatMatch={setChatMatch} setObjectUser={setObjectUser} />
            </section>
            <fieldset className='fieldBody'>
                <Empty />
            </fieldset>
        </div>
    )
}