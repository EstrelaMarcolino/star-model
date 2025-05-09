import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './Users.css'
import { Context } from '../../Context/Context';
import ServerURL from '../../services/ServerURL'


export default function Users({ chatId, userId }) {

    const [users, setUsers] = useState([])
    const { user } = useContext(Context)




    useEffect(() => {
        const getMatchs = async () => {
            try {
                const allUsers = await axios.get(`${ServerURL}/${user.profilePic ? "agencia" : "auth"}/${userId}`)
                setUsers(allUsers.data)
                // console.log(allUsers.data)
            } catch (err) {
                console.log("Algo deu errado!")
            }
        }
        getMatchs()
    }, [user.profilePic, userId])

    return (
        <Link className="cardUserLink" to={`/chat/${chatId}`} key={chatId}>
            <div className="cardUser" >
                <div className="im" >
                    <img
                        src={user.profilePic ? users.logo : users.profilePic}
                        alt=""
                        className="MatchImg" />
                    <i className="MatchName">{user.profilePic ? users.nome : users.username}</i>
                </div>
            </div>
        </Link>
    )
}