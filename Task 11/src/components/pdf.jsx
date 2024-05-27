import React from 'react';

function Pdf({file}) {
    return <div src={file.content} width="100%" height="500px"></div>;
}

export default Pdf;
