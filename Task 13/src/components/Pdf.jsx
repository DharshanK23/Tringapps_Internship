import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

function Pdf({ file }) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div className='center'>
            {file.content && (
                <Document file={file.content} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={pageNumber} />
                </Document>
            )}
            {file.content && (
                <p>
                    Page {pageNumber} of {numPages}
                </p>
            )}
        </div>
    );
}

export default Pdf;