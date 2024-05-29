import React from 'react';

function Image({ file }) {
    return (
    <div className='center'><img alt={file.name} src={file.content}/>;</div>
    )
}

export default Image;
