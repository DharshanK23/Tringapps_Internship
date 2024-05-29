import React from 'react';

const Ppt = ({ file }) => {
    return (
        <div className="ppt-file">
            <h3>{file.name}</h3>
            <embed src={file.content} type="application/vnd.ms-powerpoint" width="100%" height="500px" />
        </div>
    );
};

export default Ppt;
