import React from 'react';

function Audio({file}){
    return (
        <div className='center'><audio controls src={file.content} type={file.type}></audio>;</div>
    )
}

export default Audio;