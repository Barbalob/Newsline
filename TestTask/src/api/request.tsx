import axios from "axios";

export const getPosts = async (page:number)=>{
    const res = await axios.get(`https://frontappapi.dock7.66bit.ru/api/news/get?page=${page}&count=10`)
    return res
}
export const getStyleColors = async (color:string)=>{
    const res = await axios.get(`https://frontappapi.dock7.66bit.ru/api/theme/get?name=${color}`)
    return res
}