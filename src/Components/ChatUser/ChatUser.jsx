import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
// import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import './ChatUser.css'
import { Context } from '../../Context/Context';
import Users from '../Users/Users';
import ServerURL from '../../services/ServerURL'


export default function ChatUser() {
    // const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const [users, setUsers] = useState([])
    const { user } = useContext(Context)

    useEffect(() => {
        const getMatchs = async () => {
            try {
                const allUsers = await axios.get(`${ServerURL}/chat/chats/${user._id}`)
                setUsers(allUsers.data)
                // console.log(allUsers.data[0].users)
            } catch (err) {
                console.log("Algo deu errado!")
            }
        }
        getMatchs()
    }, [])

    return (
        <div className='MatchUserContent'>
            {users?.map((userValor) => <Users
                key={userValor._id}
                chatId={userValor._id} 
                userId={user.profilePic ? userValor.users[0] : userValor.users[1]}
            />)}
        </div>
    )
}