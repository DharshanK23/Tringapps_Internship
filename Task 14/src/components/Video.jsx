import React from 'react';

function VideoFile({ file }) {
    return (
    <div className='card'><h3>{file.name}</h3><video controls width="500px"><source src={file.content} type={file.type}/></video></div>
    )
}
export default VideoFile;
