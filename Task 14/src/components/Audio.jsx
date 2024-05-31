import React from 'react';

function Audio({file}){
    return (
        <div className="card"><h3>{file.name}</h3><audio controls src={file.content} type={file.type}></audio></div>
    )
}

export default Audio;