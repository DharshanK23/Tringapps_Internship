import React from 'react';

const Pdf = ({ file }) => {
    return (
        <div className="pdf-file">
            <h3>{file.name}</h3>
            <embed src={file.content} type="application/pdf" width="100%" height="500px" />
        </div>
    );
};

export default Pdf;
