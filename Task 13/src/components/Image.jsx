import React from 'react';

function Image({ file }) {
    return (
    <div className="card"><h5>{file.name}</h5><img alt={file.name} src={file.content}/></div>
    )
}

export default Image;
