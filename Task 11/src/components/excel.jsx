import React from 'react';

function Excel({ file }) {
    return (
        <div className="file">
            <h3>{file.name}</h3>
            <embed src={file.content} type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" width="600" height="400" />
        </div>
    );
}

export default Excel;
