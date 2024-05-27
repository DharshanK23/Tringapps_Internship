import React, { useState } from "react";
import './style.css'

function Fileupload(){
    const [file,setFile]= useState('');
    function handlefile(e){
        const file= e.target.files[0];
        const data=new FileReader();
        data.readAsText(file);
        data.onload =()=>{
            setFile(data.result);
        }
    };

   return(
        <div className="center">
            <h1>File Upload</h1>
            <input type="file" name="file" onChange={handlefile}/>
            <p>{file}</p>
        </div>
    );  
}
export default Fileupload;