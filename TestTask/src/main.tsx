import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './nullstyle.scss'

let colorTheme;
if (localStorage.getItem('colorTheme')){
  const color:string = localStorage.getItem('colorTheme') || 'Ligth'
  colorTheme = JSON.parse(color);
} else {
    colorTheme='Ligth'
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App colorTheme={colorTheme}/>
)
