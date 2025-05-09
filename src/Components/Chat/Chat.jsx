import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie'
import './Chat.css'
import { Context } from '../../Context/Context'
import ServerURL from '../../services/ServerURL'


export default function Chat({ sms, path }) {
    const [userA, setUserA] = useState({})
    const [newSms, setNewSms] = useState([])
    const [OldSms, setOldSms] = useState([])
    const [newtext, setNewtext] = useState(" ")
    const { user } = useContext(Context)


    const sendSms = async () => {
        try {

            const message = await axios.post(`${ServerURL}/chat/sme`, {
                author: user._id,
                sms: newtext,
                chatId: path,
            })

            if (message) {
                const allSms = await axios.get(`${ServerURL}/chat/sme/${path}`)
                setOldSms(allSms.data)
            }

            setNewtext(" ")
        } catch (err) {
            console.log(err)
        }
    }



    useEffect(() => {
        const getUser = async () => {
            setNewSms(sms)
            try {
                const res = await axios.get(`${ServerURL}/chat/chat/${path}`)
                const idUser = await res.data.users.find((idd) => idd !== user._id)

                const allSms = await axios.get(`${ServerURL}/chat/sme/${path}`)
                setOldSms(allSms.data)

                if (idUser) {
                    try {
                        const newRes = await axios.get(`${ServerURL}/${user.profilePic ? "agencia" : "auth"}/${idUser}`)
                        setUserA(newRes.data)
                        // console.log(newRes.data.nome)
                    } catch (err) {
                        console.log(err)
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }
        getUser()
    }, [path, user._id, sms])


    return (
        <div className='fullContentChat'>
            <header className="headerChat">
                <img
                    // src= userA.logo}
                    src={user.profilePic ? userA.logo : userA.profilePic}
                    alt=""
                    className="imgChat" />
                {/* <h3 className="nameChat">{userA.nome}</h3> */}
                <h3 className="nameChat">{user.profilePic ? userA.nome : userA.username}</h3>
            </header>
            <section className='sectionMessage backgroundEmpty'>

                {OldSms?.map((men) => (
                    <div className={men.author === user._id ? `authorsms` : `message`} key={men._id}>
                        <h6 className="textMessage">{men.sms}</h6>
                        <i className="date">{new Date(men.createdAt).toDateString()}</i>
                    </div>
                ))}
            </section>
            <footer className='footerChat'>
                <input type="text" className="textChatFooter" value={newtext} onChange={(e) => setNewtext(e.target.value)} />
                <button className='buttonFooter' onClick={sendSms}>Enviar</button>
            </footer>
        </div>
    )
}