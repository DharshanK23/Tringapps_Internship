import React, { useState } from "react";
import './style.css'
import Pdf from './Pdf';
import Excel from './Excel';
import Text from './Text';
import Image from './Image';
import Audio from './Audio';
import Video from './Video';

function Fileupload(){
    const [files,setFile]= useState([]);
    function handlefile(e){
        const select = Array.from(e.target.files);
        select.forEach(file =>
            {
                const type =file.type;
                const data = new FileReader();
                if (type.startsWith('image/')|| type.startsWith('application/pdf')||type.startsWith('audio/')||type.startsWith('video/')||type === ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||'application/vnd.ms-excel')){
                    data.readAsDataURL(file);
                }
                else {
                    data.readAsText(file);
                }
                data.onload =()=>{
                    setFile(prevFiles => [...prevFiles, { content: data.result, type: type, name: file.name }])
                };
            });
    };
    function func(file,index) {
        if (file.type.startsWith('image/')) {
            return <Image key={index} file={file}/>;
        }
        else if (file.type === 'application/pdf') {
            return <Pdf key={index} file={file}/>;
        }
        else if (file.type.startsWith('audio/')) {
            return <Audio key={index} file={file}/>;
        }
        else if (file.type.startsWith('video/')) {
            return <Video key={index} file={file}/>;
        }
        else if (file.type === ('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'||'application/vnd.ms-excel')) {
            return <Excel key={index} file={file}/>;
        }
        else {
            return <Text key={index} file={file}/>;
        }
    }
   return(
        <div className="center">
            <h1>File Upload</h1>
            <input type="file" name="file" onChange={handlefile} multiple/>
            <div>{files.map(func)}</div>
        </div>
    );  
}
export default Fileupload;