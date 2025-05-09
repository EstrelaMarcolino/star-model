import axios from 'axios'; 
import ServerURL from '../../services/ServerURL'


const upload = axios.create({
    baseURL: ServerURL,
    // baseURL: 'https://uploadimgu.herokuapp.com/',
});


export default upload;