import { FC, useEffect} from 'react';
import './News.scss'
import PullToRefresh from 'react-simple-pull-to-refresh';
import Spinner from '../Spinner/Spinner';

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

const News:FC<{
  news:Array<NewsType>,
  handleRefresh:()=>Promise<void>,
  onClickHandler:()=>Promise<void>,
  loading:boolean,
  error:boolean,
  fetching:boolean,
  setFetching:React.Dispatch<React.SetStateAction<boolean>>,
  colorStyle:ColorType
}> = ({news, handleRefresh,loading,fetching,setFetching,onClickHandler,error,colorStyle}) => {

    const scrollHandler = (e:any)=>{
      if ( e.target.documentElement.scrollHeight - e.target.documentElement.scrollTop - window.innerHeight < 100 ){
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
            <Spinner />
          : <>
            <button style={{padding:'10px 20px', margin:10}} onClick={onClickHandler}>Update</button>
            <PullToRefresh 
                onRefresh={handleRefresh}
                refreshingContent={<Spinner /> }
                pullingContent={<Spinner />}
            >
                <>
                  <h3>Pull down to refresh</h3>
                  {news.map((article, index)=>
                    <div className='news' style={{padding:10, marginBottom:20}} key={index}>
                      <div style={{color:colorStyle.textColor,backgroundColor:colorStyle.secondColor}} className='title'>{index+1}. <b>{article.title}</b></div>
                      <div className='content'>{article.content}</div>
                    </div>)
                  }
                </>
            </PullToRefresh>
            {fetching ? <Spinner /> : ""}
            {error ? <div>Не удалось загрузить новости </div> : ''}
            </>
        }   
      </>
    );
};

export default News;