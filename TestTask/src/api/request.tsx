// import axios from "axios";

// const FIRST_API_URL = 'https://frontappapi.dock7.66bit.ru/api/news/get?page=1&count=10'

// const firstApiAxios = axios.create({
//     baseURL:FIRST_API_URL,
//     withCredentials:true,
// })


// export const getPosts = async ()=>{
//     const res = await firstApiAxios.get(``)
//     return res
// }
import axios from "axios";

const FIRST_API_URL = 'https://official-joke-api.appspot.com'

const firstApiAxios = axios.create({
    baseURL:FIRST_API_URL,
})


export const getPosts = async ()=>{
    const res = await firstApiAxios.get(`/jokes/programming/ten`)
    return res
}

