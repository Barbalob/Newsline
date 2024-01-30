import { FC, useEffect} from 'react';
import './News.scss'
import PullToRefresh from 'react-simple-pull-to-refresh';

type PhotoType = {
  thumbnailUrl:string,
  title:string,
  url:string,
  albumId:number,
  id:number,
}

const News:FC<{
  photos:Array<PhotoType>,
  handleRefresh:()=>Promise<void>,
  onClickHandler:()=>Promise<void>,
  loading:boolean,
  fetching:boolean,
  setFetching:React.Dispatch<React.SetStateAction<boolean>>,
}> = ({photos, handleRefresh,loading,fetching,setFetching,onClickHandler}) => {

    const scrollHandler = (e:any)=>{
      if ( e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 100 ){
        console.log("scroll");
        setFetching(true)
      }
    }

    useEffect(()=>{
      document.addEventListener('scroll',scrollHandler)
      return function () {
        document.removeEventListener('scroll',scrollHandler)
      }
    },[]) 

    return (
      <>
        {loading ? 
          <div>Loading...</div>
          : 
          <>
            <button style={{padding:'10px 20px', margin:10, }} onClick={onClickHandler}>Update</button>
            <PullToRefresh 
                onRefresh={handleRefresh} >
                <>
                <h3>Pull down to refresh</h3>
                {photos.map(photo=>
                  <div style={{padding:10, marginBottom:20}} key={photo.id}>
                    <div>{photo.id}. {photo.title}</div>
                    <img src={photo.thumbnailUrl} alt="" />
                  </div>)
                }
                </>
            </PullToRefresh>
            {fetching ? <div>Fetching...</div> : ""}
          </>
        }   
      </>
    );
};

export default News;