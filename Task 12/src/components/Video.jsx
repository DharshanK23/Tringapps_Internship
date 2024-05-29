import React from 'react';

function VideoFile({ file }) {
    return <video controls width="100%"><source src={file.content} type={file.type}/></video>;
}

export default VideoFile;
