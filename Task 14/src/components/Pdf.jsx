import React, { useState, useEffect } from 'react';
import { getDocument } from 'pdfjs-dist/webpack';

function PdfViewer({ file }) {
    const [pdfContent, setPdfContent] = useState("");

    useEffect(() => {
        const loadPdfContent = async () => {
            try {
                const pdf = await getDocument({ data: file.content }).promise;
                const content = await extractTextFromPDF(pdf);
                setPdfContent(content);
            } catch (error) {
                console.error('Error', error);
            }
        };
        loadPdfContent();
    }, [file]);

    const extractTextFromPDF = async (pdf) => {
        let extractedContent = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map(item => item.str.trim())
                .filter(str => str)
                .join(' ');

            extractedContent += pageText + "\n";
        }

        return extractedContent;
    };

    return (
        <div className="card">
            <p>{pdfContent}</p>
        </div>
    );
}

export default PdfViewer;
