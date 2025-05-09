import axios from 'axios';
import React, { useContext, useState } from 'react'
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


export default function EditUse() {
  const [email, setEmail] = useState("")
  const [desc, setDesc] = useState("")
  const [zap, setZap] = useState("")
  const [file, setFile] = useState(null)
  // let navigate = useNavigate()


  const { user } = useContext(Context)
  const { dispatch } = useContext(Context)


  const Update = async (e) => {
    e.preventDefault()
    dispatch({ type: "UPDATE_START" })
    const newPost = {
      whatsapp: zap,
      email: email,
      endereco: desc
    };

    var imgPopap = "";

    if (file) {

      try {
        const description = Date.now() + file.name;
        const result = await postImage({ image: file, description })
        imgPopap = result
        console.log(result)
        newPost.profilePic = imgPopap;
      } catch (err) { }
    }
    try {
      const userUpdate = await axios.put(`${ServerURL}/auth/${user._id}`, newPost)
      await dispatch({ type: "UPDATE_SUCCESS", payload: userUpdate.data })
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
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
          <img src={user.profilePic} alt="" className="getImgCoop" />

        )}
        <input type="file" onChange={(e) => setFile(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
        <label htmlFor="imgff" className='labalImgCoop'><i className="fa-solid fa-upload"></i> Imagem</label>

      </div>
      <div className="dataCoopFuull">
        <div className="sobreAllInputs">
          <h3 className='marginTextCoop'>Editar Usuário</h3>
          <input type="text" placeholder='Whatsapp' onChange={(e) => setZap(e.target.value)} className='inpData' />
          <input type="text" placeholder='Endereço' onChange={(e) => setDesc(e.target.value)} className='inpData' />
          <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} className='inpData' />
        </div>
        <button className="fonfirmEditCoop inpData" onClick={Update}>Salvar</button>
      </div>
    </div>
  )
}
