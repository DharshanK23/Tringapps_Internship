import React, { useState } from "react";
import './style.css'
import Pdf from './Pdf';
import Text from './Text';
import Image from './Image';
import Audio from './Audio';
import Video from './Video';
import Docx from './doc';
import Excel from './Excel';

function Fileupload(){
    const [files,setFile]= useState([]);
    function handlefile(e){
        const select = Array.from(e.target.files);
        select.forEach(file =>
            {
                const type =file.type;
                const data = new FileReader();
                if (type.startsWith('image/') || type.startsWith('audio/') || type.startsWith('video/') ||
                 type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || type === 'application/vnd.ms-excel' ||
                 type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                data.readAsDataURL(file);
                }
                else if(type === ('application/pdf')){
                    data.readAsArrayBuffer(file);
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
        else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
            return <Excel key={index} file={file} />;
        }
        else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <Docx key={index} file={file} />;
        }
        else {
            return <Text key={index} file={file}/>;
        }
    }
   return(
        <div className="center">
            <h1>File Upload</h1>
            <input type="file" name="file" onChange={handlefile} multiple/>
            <div className="cards-container">{files.map(func)}</div>
        </div>
    );  
}
export default Fileupload;