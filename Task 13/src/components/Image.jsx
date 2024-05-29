import React from 'react';

function Image({ file }) {
    return (
    <div className='center'><img alt={file.name} src={file.content} width="50%" height="80%"/>;</div>
    )
}

export default Image;
