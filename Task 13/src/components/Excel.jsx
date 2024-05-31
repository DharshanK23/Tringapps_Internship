import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

function Excel({ file }) {
    const [sheets, setSheets] = useState([]);

    useEffect(() => {
        const loadExcel = async () => {
            const response = await fetch(file.content);
            const arr = await response.arrayBuffer();
            const workbook = XLSX.read(arr, { type: 'array' });
            const sheetData = workbook.SheetNames.map(sheetName => ({
                name: sheetName,
                data: XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
            }));
            setSheets(sheetData);
        };

        loadExcel();
    }, [file]);

    return (
        <div className="card">
            <h3>{file.name}</h3>
            {sheets.map((sheet, index) => (
                <div key={index}>
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




// [
//     {
//         name: 'Sheet1',
//         data: [
//             ['A', 'B', 'C'],
//             [1, 2, 3],
//             [4, 5, 6]
//         ]
//     },
//     {
//         name: 'Sheet2',
//         data: [
//             ['X', 'Y', 'Z'],
//             [7, 8, 9],
//             [10, 11, 12]
//         ]
//     }
// ]
