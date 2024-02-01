import { FC, memo } from 'react';
import {NavLink, Outlet} from 'react-router-dom'
import './Menu.scss'


interface ColorType {
    name: string,
    mainColor: string,
    secondColor:string,
    textColor:string
  }

interface StyleInterface{
    'backgroundColor': string,
    'color': string
}

const Menu:FC<{colorStyle:ColorType}> = memo(({colorStyle}) => {
    const style:StyleInterface = {
        'backgroundColor': colorStyle.mainColor,
        'color': colorStyle.textColor,     
    }

    return (
        <>
            <ul style={style} className='menu'>
                <NavLink to=''>News</NavLink>
                <NavLink to='theme'>Color Theme</NavLink>
            </ul>
            <Outlet  />
        </>
    );
});

export default Menu;