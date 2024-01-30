import { FC } from 'react';
import {NavLink, Outlet} from 'react-router-dom'
import './Menu.scss'

interface dictInterface  {
    [key: string]: string[]
}    
const colorDict:dictInterface = {
    'Dark':['#212121', '#E8A236'],
    'Ligth':['#DCEAF3', '#1436CA'],
    'Blue':['#2BA9EC', '#0F2496']
}

interface StyleInterface{
    'backgroundColor': string,
    'color': string
}

const Menu:FC<{color:string}> = ({color}) => {

    const style:StyleInterface = {
        'backgroundColor': colorDict[color][0],
        'color': colorDict[color][1],     
    }
    console.log(style);
    return (
        <>
            <ul style={style} className='menu'>
                <NavLink to=''>News</NavLink>
                <NavLink to='theme'>Color Theme</NavLink>
            </ul>
            <Outlet  />
        </>
    );
};

export default Menu;