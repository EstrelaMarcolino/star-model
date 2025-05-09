import axios from 'axios'
import React, { useContext, useState } from 'react'
// import { toast } from 'react-toastify';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2'
import { Context } from '../../Context/Context'
import './style.css'
import ServerURL from '../../services/ServerURL'



export default function Login() {
    const [user, setUser] = useState("")
    const [senha, setSenha] = useState("")
    const [cpf, setCpf] = useState("")
    const [type, setType] = useState("Coop")
    const [create, setCreate] = useState("Coop")
    const [colorCoop, setColorCoop] = useState("cooperativaLogin")
    const [colorUse, setColorUse] = useState("UserLogin")
    const { dispatch } = useContext(Context)

    const setCreateForm = () => {
        setCreate("Use")
    }
    const setLoginForm = () => {
        setCreate("Coop")
    }
    const setTypeCoop = () => {
        setType("Coop")
        setColorCoop("cooperativaLogin")
        setColorUse("UserLogin")
    }
    const setTypeUse = () => {
        setType("Use")
        setColorCoop("UserLogin")
        setColorUse("cooperativaLogin")
    }

    const CheckLength = (senha) => {
        const verify = senha.length
        if (verify > 5) {
            return true;
        }
        else {
            return false;
        }
    }

    const CheckCaptal = (senha) => {
        for (let i = 0; i < senha.length; i++) {
            var charValue = senha[i].charCodeAt(0);

            if (charValue > 64 && charValue < 91) {
                return true;
            }
        }
        return false;
    }

    const CheckLow = (senha) => {
        for (let i = 0; i < senha.length; i++) {
            var charValue = senha[i].charCodeAt(0);

            if (charValue > 96 && charValue < 123) {
                return true;
            }
        }
        return false;
    }
    const CheckNum = (senha) => {
        for (let i = 0; i < senha.length; i++) {
            var charValue = senha[i].charCodeAt(0);

            if (charValue > 47 && charValue < 58) {
                return true;
            }
        }
        return false;
    }

    const CheckCarcter = (senha) => {
        for (let i = 0; i < senha.length; i++) {
            var charValue = senha[i].charCodeAt(0);

            if (charValue > 32 && charValue < 48) {
                return true;
            }
            if (charValue > 57 && charValue < 65) {
                return true;
            }
            if (charValue > 90 && charValue < 97) {
                return true;
            }
            if (charValue > 122 && charValue < 127) {
                return true;
            }
        }
        return false;
    }
    const CadastrarCoop = async () => {
        if (user && senha && cpf) {
            //verificar senha
            var passwordLength = await CheckLength(senha);
            var passwordCap = await CheckCaptal(senha);
            var passwordLow = await CheckLow(senha);
            var passwordCarcter = await CheckCarcter(senha);
            var passwordNum = await CheckNum(senha);

            if (passwordLength) {
                if (passwordCap) {
                    if (passwordLow) {
                        if (passwordNum) {
                            if (passwordCarcter) {
                                toast.success("Senha Forte!!!")
                                try {
                                    await axios.post(`${ServerURL}/agencia/criar`, {
                                        nome: user,
                                        senha: senha,
                                        cnpj: cpf,
                                        logo: "https://i.pinimg.com/474x/11/73/e3/1173e32890c0f9fab846b7218c7f3aa9.jpg"
                                    })
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Cooperativa criada com SUCESSO!',
                                        showConfirmButton: false,
                                        timer: 3000
                                    })
                                    setCreate("Coop")
                                } catch (error) {
                                    console.log(error)
                                }
                            } else {
                                toast.error("A senha deve Ter: Carater Específico")
                            }
                        } else {
                            toast.error("A senha deve Ter: Número")
                        }
                    } else {
                        toast.error("A senha deve Ter: Letra Minúscula")
                    }
                } else {
                    toast.error("A senha deve Ter: Letra Maiúscula")
                }
            } else {
                toast.error("A senha deve Ter: Mais de 6 Caracteres")
            }
        } else {
            toast.error("Preencha Todos Os Campos!!!")
        }
    }
    const CadastrarUser = async () => {
        if (user && senha && cpf) {
            //verificar senha
            var passwordLength = await CheckLength(senha);
            var passwordCap = await CheckCaptal(senha);
            var passwordLow = await CheckLow(senha);
            var passwordCarcter = await CheckCarcter(senha);
            var passwordNum = await CheckNum(senha);

            if (passwordLength) {
                if (passwordCap) {
                    if (passwordLow) {
                        if (passwordNum) {
                            if (passwordCarcter) {
                                toast.success("Senha Forte!!!")
                                try {
                                    await axios.post(`${ServerURL}/auth/criar`, {
                                        username: user,
                                        password: senha,
                                        cpf: cpf,
                                        email: ""
                                    })
                                    Swal.fire({
                                        position: 'center',
                                        icon: 'success',
                                        title: 'Usuário cadastrado com SUCESSO!',
                                        showConfirmButton: false,
                                        timer: 3000
                                    })
                                    setCreate("Coop")
                                } catch (error) {
                                    console.log(error)
                                }
                            } else {
                                toast.error("A senha deve Ter: Carater Específico")
                            }
                        } else {
                            toast.error("A senha deve Ter: Número")
                        }
                    } else {
                        toast.error("A senha deve Ter: Letra Minúscula")
                    }
                } else {
                    toast.error("A senha deve Ter: Letra Maiúscula")
                }
            } else {
                toast.error("A senha deve Ter: Mais de 6 Caracteres")
            }
        } else {
            toast.error("Preencha Todos Os Campos!!!")
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post(`${ServerURL}/agencia/login`, {
                nome: user,
                senha: senha,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            window.location.replace("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }
    const handleUser = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post(`${ServerURL}/auth/login`, {
                username: user,
                password: senha,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            window.location.replace("/");
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" })
        }
    }

    return (
        <div className='fullContentLogin'>
            <ToastContainer />
            <div className="imgContentLogin5">
                {create === "Coop" ?
                    (<div className="Cadastrar" onClick={setCreateForm}>Cadastrar</div>) : (
                        <div className="Cadastrar" onClick={setLoginForm}>Login</div>
                    )}
            </div>
            <div className="loginForm">
                <div className="logo">
                    <img src="../logos.png" alt="" className="logoLoginImg" />
                </div>
                {create === "Coop" ? (<h1 className="Login">Login</h1>) : (
                    <h1 className="Login">Cadastrar</h1>
                )}
                {create === "Coop" ? (
                    <div className="formLogin">
                        <div className="shoose">
                            <div className="cooperativaLogin" id={colorCoop} onClick={setTypeCoop}>Agência</div>
                            <div className="UserLogin" id={colorUse} onClick={setTypeUse}>Usuário</div>
                        </div>
                        <div className="inputs">
                            <input type="text" placeholder={type === "Coop" ? "Agência" : "Usuário"} className='input Cooperativa' onChange={(e) => setUser(e.target.value)} />
                            <input type="password" placeholder='Senha' className='input Senha' onChange={(e) => setSenha(e.target.value)} />
                            {type === "Coop" ? (
                                <button className='input btnLogin' onClick={handleSubmit}>Entrar</button>
                            ) : (
                                <button className='input btnLogin' onClick={handleUser}>Entrar</button>
                            )}
                        </div>
                        <div className="termo">
                            <span className='termoText'>Termo</span>
                            <b>&</b>
                            <span className='termoText'>Política de usuabilidade</span>
                        </div>
                    </div>

                ) : (
                    <div className="formLogin">
                        <div className="shoose">
                            <div className="cooperativaLogin" id={colorCoop} onClick={setTypeCoop}>Agência</div>
                            <div className="UserLogin" id={colorUse} onClick={setTypeUse}>Usuário</div>
                        </div>
                        <div className="inputs">
                            <input type="text" placeholder={type === "Coop" ? "Agência" : "Usuário"} className='input Cooperativa' onChange={(e) => setUser(e.target.value)} />
                            <input type="text" placeholder={type === "Coop" ? "CNPJ" : "CPF"} maxLength={14} className='input Cooperativa' onChange={(e) => setCpf(e.target.value)} />
                            {/* <input type="text" placeholder={type === "Coop" ? "Email" : "Email"} className='input Cooperativa' onChange={(e)=>setUser(e.target.value)} /> */}
                            <input type="password" placeholder='Senha' className='input Senha' onChange={(e) => setSenha(e.target.value)} />
                            {type === "Coop" ? (
                                <button className='input btnLogin' onClick={CadastrarCoop}>Cadastar</button>
                            ) : (
                                <button className='input btnLogin' onClick={CadastrarUser}>Cadastar</button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
