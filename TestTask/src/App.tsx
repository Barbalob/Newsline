import { useEffect, useState } from 'react'
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import Menu from './Components/Menu/Menu'
import News from './Components/News/News';
import ColorThem from './Components/ColorTheme/ColorThem';
import { getPosts, getStyleColors } from './api/request';
import Spinner from './Components/Spinner/Spinner';


type NewsType = {
  title:string,
  content:string,
  id:number,
}

type ColorType = {
  name: string,
  mainColor: string,
  secondColor:string,
  textColor:string
}

const defaultStyleColor = {
  name: 'Default',
  mainColor: 'rgb(206, 240, 227)',
  secondColor:'rgb(255, 255, 255)',
  textColor:'rgb(10, 10, 10)'
}

function App({colorTheme='light'}) {
  const [news, setNews] = useState<Array<NewsType>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [loadingStyle, setLoadingStyle] = useState(true)
  const [fetching, setFetching] = useState(true)
  const [color, setColor]= useState(colorTheme)
  const [colorStyle, setColorStyle] =useState<ColorType>(defaultStyleColor)

  async function handleRefresh() {
    await getPosts(1)
      .then(response=>{
        setError(false)
        setNews(response.data)
        setCurrentPage(2)
      })
      .catch((err)=>{
        setError(true)
      })
      .finally(()=>{
        setFetching(false)
      })
  }

  async function OnClickUpdate () {
    setLoading(true)
    getPosts(1)
      .then(response=>{
        setNews(response.data)
        setCurrentPage(2)
      }).finally(()=>{
        setFetching(false)
        setLoading(false)
      })
  }
  
  useEffect(()=>{
    if (fetching){
      getPosts(currentPage)
      .then(response=>{
        setNews([...news,...response.data])
        setCurrentPage(page=>page+1)
      })
      .catch((err)=>{
        setError(true)
      })
      .finally(()=>{
        setFetching(false)
        setLoading(false)
      })
    }
  },[fetching])

  useEffect(
    ()=>{
      setLoadingStyle(true)
      getStyleColors(color)
      .then(response=>{
        setColorStyle(response.data)
      }).catch((err)=>{
        setColor('default')
        setColorStyle(defaultStyleColor)
        alert(`${err}\nНе удалось загрузить Стили. Будут применены cтандартные стили`)
      })
      .finally(()=>{setLoadingStyle(false)})
    },[])

  const changeColorThem = (color:string) => {
    setLoading(true)
    getStyleColors(color.toLowerCase()).then(response=>{
      setColorStyle(response.data)
      setColor(color)
    }).catch((err)=>{
      alert(`${err}\nНе удалось загрузить cтили`)
    })
    .finally(()=>{setLoading(false)})
    localStorage.setItem('colorTheme', JSON.stringify(color));
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={
        <Menu colorStyle={colorStyle}/>
      }>
        <Route path='' element={
          <News 
            news={news} 
            handleRefresh={handleRefresh}
            loading={loading}
            fetching={fetching}
            setFetching={setFetching}
            onClickHandler={OnClickUpdate}
            error={error}
            colorStyle={colorStyle}
            />
          }/>
        <Route path='theme' element={<ColorThem loading={loading} color={color} setColor={changeColorThem}/>}/>
      </Route>
    )
  )

  return (
    <>
      {loadingStyle ? <Spinner/> : <RouterProvider router={router} />}   
    </>
  )
}

export default App
