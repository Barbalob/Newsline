import { FC } from 'react';
import Spinner from '../Spinner/Spinner';

const ColorList = ['light', 'dark','blue']

const ColorThem:FC<{color:string, setColor:(color: string) => void, loading:boolean}> = ({color, setColor, loading}) => {
    const styleButton = {
        padding: '20px 30px',
        borderRadius: 10,
        border: '1px solid black'
    }
    return (
        <div style={{display:'flex', gap:20, flexDirection:'column', alignItems: 'center', padding: 30}}>
            {loading ? <Spinner /> : ''}
            {ColorList.map((btnColor) => {
                return (
                <button key={btnColor}  style={styleButton} disabled={color===btnColor} onClick={()=>{setColor(btnColor)}}>{btnColor}</button>
                )
            })}
        </div>
    );
};

export default ColorThem;