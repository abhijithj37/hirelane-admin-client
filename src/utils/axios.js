import axios from "axios"
const instance=axios.create({
baseURL:'https://admin.fashionbytes.online/api'
})
export default instance