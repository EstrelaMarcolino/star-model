import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { Context } from '../../Context/Context'
import './style.css'
import { imageDb } from '../../services/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import ServerURL from '../../services/ServerURL'


//upload img
const handleClick = async (URL) => {
    try {
        const imgRef = ref(imageDb, `files/${v4()}`)
        uploadBytes(imgRef, URL)
        const snapshot = await uploadBytes(imgRef, URL)
        const downloadURL = await getDownloadURL(snapshot.ref);
        return (downloadURL)
    } catch (error) {
        console.log(error)
    }
}
//upload img
async function postImage({ image, description }) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await handleClick(image)
    console.log(result)
    return result;
}

export default function EditCoop() {
  const [id, setId] = useState("")
  const [email, setEmail] = useState("")
  const [desc, setDesc] = useState("")
  const [zap, setZap] = useState("")
  const [horario, setHorario] = useState("")
  const [file, setFile] = useState(null)
  const [emailCard, setEmailCard] = useState("")
  const [fname, setFname] = useState("")
  const [ncard, setNcard] = useState()
  const [cvc, setCvc] = useState()
  const [validade, setValidade] = useState()
  const [showEdit, setshowEdit] = useState(false)
  // let navigate = useNavigate()


  const { user } = useContext(Context)
  const { dispatch } = useContext(Context)

  useEffect(() => {
    const getCard = async () => {
      try {
        const checkCard = await axios.get(`${ServerURL}/card/${user._id}`)
        console.log(checkCard.data.length)
        if (checkCard.data.length > 0) {
          setId(checkCard.data[0]._id)
          setshowEdit(false)
        } else {
          setshowEdit(true)
        }
      } catch (error) { }
    }
    getCard()
  }, [user._id])

  const AddCard = async () => {
    try {
      const card = await axios.post(`${ServerURL}/card`, {
        emailCard,
        fname,
        ncard,
        cvc,
        validade,
        coopid: user._id,
      })
      console.log(card)
    } catch (error) {
      console.log(error)
    }
  }
  const EditCard = async () => {
    try {
      const card = await axios.put(`${ServerURL}/card/${id}`, {
        emailCard,
        fname,
        ncard,
        cvc,
        validade,
        coopid: user._id,
      })
      console.log(card)
    } catch (error) {
      console.log(error)
    }
  }


  const Update = async (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    const newPost = {
      zap,
      horario,
      email: email,
      coopid: user._id,
      sobre: desc
    };

    var imgPopap = "";

    if (file) {
      try {
        const description = Date.now() + file.name;
        const result = await postImage({ image: file, description })
        imgPopap = result
        console.log(result)
        newPost.logo = imgPopap;
        newPost.banner = imgPopap;
      } catch (err) { }
    }
    try {
      const userUpdate = await axios.put(`${ServerURL}/agencia/${user._id}`, newPost)
      await dispatch({ type: "UPDATE_SUCCESS", payload: userUpdate.data })

      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })

      Toast.fire({
        icon: 'success',
        title: 'Atualizado com sucesso!'
      })

      // navigate('/')
      window.location.reload()

    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" })
      alert(err)
    }
  }


  return (
    <div className='fullEditCoopConteiner'>
      <div className="imgEditConteiner">
        {file ? (
          <img
            className="getImgCoop"
            src={file && URL.createObjectURL(file)}
            alt=""
          />) : (
          // <img src={host + user.profilePic} alt="" className="getImgCoop" />
          <img src={user.logo} alt="" className="getImgCoop" />

        )}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
        <label htmlFor="imgff" className='labalImgCoop'><i className="fa-solid fa-upload"></i> Imagem</label>

      </div>
      <div className="dataCoopFuull">
        <div className="sobreAllInputs">
          <h3 className='marginTextCoop'>Editar Agência</h3>
          <input type="text" placeholder='Whatsapp' onChange={(e) => setZap(e.target.value)} className='inpData' />
          <input type="text" placeholder='Sobre' onChange={(e) => setDesc(e.target.value)} className='inpData' />
          <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='inpData' />
          <input type="text" placeholder='Horário' onChange={(e) => setHorario(e.target.value)} className='inpData' />
        </div>
        <button className="fonfirmEditCoop inpData" onClick={Update}>Salvar</button>

        <div className="cardCoop">
          <h3 className='hCoop'>Cadastrar Cartão</h3>
          <input type="text" placeholder='Nome Completo' onChange={(e) => setFname(e.target.value)} name="" className='inPut' />
          <input type="email" placeholder='E-mial' onChange={(e) => setEmailCard(e.target.value)} name="" className='inPut' />
          <input type="Number" placeholder='Card Number' onChange={(e) => setNcard(e.target.value)} name="" className='inPut' />
          <div className="dataCard">
            <input type="date" name="" placeholder='Validade' onChange={(e) => setValidade(e.target.value)} className='dtInp' />
            <input type="Number" name="" placeholder='CVC' onChange={(e) => setCvc(e.target.value)} className='dtInp' />
          </div>
          {showEdit && (<button className='saveCard' onClick={AddCard}>Cadastrar</button>)}
          {!showEdit && (<button className='saveCardEdit' onClick={EditCard}>Editar</button>)}
        </div>
      </div>
    </div>
  )
}
