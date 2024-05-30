import React, { useEffect, useState } from 'react';
import mammoth from 'mammoth';

function Docx({ file }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(file.content);
                const arr = await response.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer: arr });
                setContent(result.value);
            }
            catch (error) {
                console.error('Error', error);
            }
        };
        fetchData();
    }, [file.content]);

    return (
        <div className="card">
            <h3>{file.name}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Docx;
