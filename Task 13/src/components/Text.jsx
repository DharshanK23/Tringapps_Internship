import React from 'react';

function TextFile({ file }) {
    return (
    <div className='card'><h3>{file.name}</h3><p>{file.content}</p></div>
)
}

export default TextFile;
