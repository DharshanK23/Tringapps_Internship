import React from 'react';

function TextFile({ file }) {
    return <pre>{file.content}</pre>;
}

export default TextFile;
