import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

function Docx({ file }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(file.content);
            const arrayBuffer = await response.arrayBuffer();
            mammoth.extractRawText({ arrayBuffer })
                .then((result) => {
                    setContent(result.value);
                })
                .catch((error) => {
                    console.error('Error extracting text from DOCX:', error);
                });
        };

        fetchData();
    }, [file.content]);

    return (
        <div>
            <h3>{file.name}</h3>
            <pre>{content}</pre>
        </div>
    );
}

export default Docx;
