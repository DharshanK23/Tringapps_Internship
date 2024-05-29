import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

function Docx({ file }) {
    const [text, setText] = useState('');

    useEffect(() => {
        const arrayBuffer = atob(file.content.split(',')[1]);
        const byteArray = new Uint8Array(arrayBuffer.split('').map(char => char.charCodeAt(0)));

        mammoth.extractRawText({ arrayBuffer: byteArray })
            .then(result => setText(result.value))
            .catch(err => console.error('Error reading DOCX file:', err));
    }, [file.content]);

    return (
        <div className='center'>
            <h3>{file.name}</h3>
            <pre>{text}</pre>
        </div>
    );
}

export default Docx;