import React, { useState } from "react";
import './style.css'
function Toast(){
    const [toast,settoast]= useState(false);
    function buttonclick(){
        settoast(true);
    }
    function Onclose(){
        settoast(false);
    }
    return (
        <div>
            <button  className="btn" onClick={buttonclick}>Click Here</button>
            {toast && (<div id="snackbar">
            This is toast notification
            <button className='close' onClick={Onclose}>&times;</button>
            </div>)}
        </div>
    )
}
export default Toast;