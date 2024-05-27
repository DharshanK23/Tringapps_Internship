import React from 'react';

function Audio({file}) {
    return <audio controls src={file.content}></audio>;
}

export default Audio;
