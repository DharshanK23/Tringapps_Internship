import React from 'react';

const Docx = ({ file }) => {
    return (
        <div className="docx-file">
            <h3>{file.name}</h3>
            <iframe src={file.content} width="100%" height="500px" title={file.name}></iframe>
        </div>
    );
};

export default Docx;
