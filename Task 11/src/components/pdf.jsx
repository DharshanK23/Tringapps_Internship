import React, { useState } from 'react';
import {Document, Page ,pdfjs} from 'react-pdf';

const Pdf =() =>{
    pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js",import.meta.url).toString();

const[file,setfile]=useState(null);
const[numpage,setnumpage]=useState(null);
const[pgno,setpgno]=useState(1);
const[data,setdata]=useState(null);

// const onfile = event => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

// reader.onload=(e)=>{
//     setdata(e.target.result);
// }
// reader.readAsDataURL(file);
// setfile(file);
const document = ({numpage}) =>{
    setnumpage(numpage);
};

return (
    <div>
        {data && (
            <Document file ={data} onLoadSuccess={document}>
                <Page pgno={pgno}/>
            </Document>
        )}
        {data && (
            <p>
                Page {pgno} of {numpage}
            </p>
        )}
    </div>
)
}
// function Pdf({file}) {
//     return <div src={file.content} width="100%" height="500px"></div>;
// }

export default Pdf;
