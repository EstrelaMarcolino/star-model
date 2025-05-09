import React, { useContext, useEffect, useState } from 'react'
import './style.css'
import axios from 'axios';
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';
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


export default function FormEditProduct({ data, setActiveEdit }) {

    const [file, setFile] = useState(null)
    const [nome, setNome] = useState("")
    const [desc, setDesc] = useState("")
    const [precoatual, setPrecoatual] = useState("")
    const [precoanterior, setPrecoanterior] = useState("")
    const { user } = useContext(Context)

    useEffect(() => {
        setNome(data.nome)
        setDesc(data.desc)
        setPrecoatual(data.precoatual)
        setPrecoanterior(data.precoanterior)
    }, [data])



    const cadastrarProduct = async () => {
        try {

            const modelProdct = {
                nome,
                desc,
                precoatual,
                precoanterior,
                idcoop: user._id
            }

            var imgPopap = "";

            if (file) {
                try {
                    const description = Date.now() + file.name;
                    const result = await postImage({ image: file, description })
                    imgPopap = result
                    modelProdct.profilePic = imgPopap;
                } catch (err) { }

            }
            const res = await axios.put(`${ServerURL}/product/${data._id}`, modelProdct)
            console.log(res)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Produto cadastrado com SUCESSO!',
                showConfirmButton: false,
                timer: 3000
            })
            SetShow()
        } catch (error) {
            console.log(error)
        }
    }

    const SetShow = () => {
        setActiveEdit(true)
    }

    return (
        <div className='FullcontentFormCad'>
            <div className="FormCad">
                <div className="imgCadForm">

                    {file && (
                        <img
                            className="imgFormAtual"
                            src={file && URL.createObjectURL(file)}
                            alt=""
                        />)}
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} name='imgff' id='imgff' alt="" className='imgAtual' />
                    <label htmlFor="imgff" className='labelImgCad'><i className="fa-regular fa-image imar"></i> Imagem</label>
                    {/* <img src="" alt="" className="imgForm" /> */}
                </div>
                <div className="nomeFormProd">
                    <input type="text" value={nome} className="nomeatual" placeholder='Nome' onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="nomeFormProd">
                    <input type="text" value={desc} className="nomeatual" placeholder='Descrição' onChange={(e) => setDesc(e.target.value)} />
                </div>
                <div className="precoAtual">
                    <input type="number" value={precoatual} className="precoAtualFo" placeholder='Preço Atual' onChange={(e) => setPrecoatual(e.target.value)} />
                    <input type="number" value={precoanterior} className="precoAtualFo" placeholder='Preço Anterior' onChange={(e) => setPrecoanterior(e.target.value)} />
                </div>
                <div className="buttonSubmitAtual">
                    <button className="buttonFormCad" onClick={cadastrarProduct}>Cadastrar</button>
                </div>
            </div>
            <button className='buttonBackAbsolut'>
                <i className="fa-regular fa-circle-xmark voltarForm" onClick={SetShow}></i>
            </button>
        </div>
    )
}
