import { useEffect, useState } from 'react'
import {createBrowserRouter,createRoutesFromElements,Route, RouterProvider} from 'react-router-dom'
import Menu from './Components/Menu/Menu'
import News from './Components/News/News';
import axios from 'axios';
import ColorThem from './Components/ColorTheme/ColorThem';

type PhotoType = {
  thumbnailUrl:string,
  title:string,
  url:string,
  albumId:number,
  id:number,
} 

function App({colorTheme='ligth'}) {
  const [photos, setPhotos] = useState<Array<PhotoType>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [fetching, setFetching] = useState(true)
  const [color, setColor]= useState(colorTheme)
  // const [totalCountPage, setTotalCountPage] = useState(0)

  console.log('Color', color);

  async function handleRefresh() {
    console.log('Start refresh!');
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1`)
      .then(response=>{
        setPhotos(response.data)
        setCurrentPage(2)
      }).finally(()=>{
        setFetching(false)
      })
  }

  async function OnClickUpdate () {
    console.log('Click');
    setLoading(true)
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=1`)
      .then(response=>{
        setPhotos(response.data)
        setCurrentPage(2)
      }).finally(()=>{
        setFetching(false)
        setLoading(false)
      })
  }
  
  useEffect(()=>{
    if (fetching){
      console.log('Effect');
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
        .then(response=>{
          setPhotos([...photos,...response.data])
          setCurrentPage(page=>page+1)
          // setTotalCountPage(response.headers['x-total-count'])
        }).finally(()=>{
          setFetching(false)
          setLoading(false)
        })
    }
  },[fetching])

  const changeColorThem = (color:string) => {
    setColor(color)
    localStorage.setItem('colorTheme', JSON.stringify(color));
  }


  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={
        <Menu color={color}/>
      }>
        <Route path='' element={
          <News 
            photos={photos} 
            handleRefresh={handleRefresh}
            loading={loading}
            fetching={fetching}
            setFetching={setFetching}
            onClickHandler={OnClickUpdate}/>
          }/>
        <Route path='theme' element={<ColorThem color={color} setColor={changeColorThem}/>}/>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
