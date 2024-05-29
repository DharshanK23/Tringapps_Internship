import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function Excel({ file }) {
    const [sheets, setSheets] = useState([]);

    useEffect(() => {
        const loadExcel = async () => {
            const arrayBuffer = await fetch(file.content).then(res => res.arrayBuffer());
            const workbook = XLSX.read(arrayBuffer, { type: 'array' });
            const sheetNames = workbook.SheetNames;
            const sheetData = sheetNames.map(sheetName => {
                const worksheet = workbook.Sheets[sheetName];
                return {
                    name: sheetName,
                    data: XLSX.utils.sheet_to_json(worksheet, { header: 1 })
                };
            });
            setSheets(sheetData);
        };

        loadExcel();
    }, [file]);

    return (
        <div className='center'>
            <h3>{file.name}</h3>
            {sheets.map((sheet, index) => (
                <div key={index}>
                    <h4>{sheet.name}</h4>
                    <table>
                        <tbody>
                            {sheet.data.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
}

export default Excel;