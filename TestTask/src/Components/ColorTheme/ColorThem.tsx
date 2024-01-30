import { FC } from 'react';

const ColorThem:FC<{color:string, setColor:(color: string) => void}> = ({color, setColor}) => {
    const styleButton = {
        padding: '20px 30px',
        borderRadius: 10,
        border: '1px solid black'
    }
    return (
        <div style={{display:'flex', gap:20, flexDirection:'column', alignItems: 'center', padding: 30}}>
            <button style={styleButton} disabled={color==='Dark'} onClick={()=>{setColor('Dark')}}>Dark</button>
            <button style={styleButton} disabled={color==='Ligth'} onClick={()=>{setColor('Ligth')}}>Ligth</button>
            <button style={styleButton} disabled={color==='Blue'} onClick={()=>{setColor('Blue')}}>Blue</button>
        </div>
    );
};

export default ColorThem;