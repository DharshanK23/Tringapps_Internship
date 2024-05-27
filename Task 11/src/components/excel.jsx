import React from "react";
import Table from 'react-bootstrap/Table';

function Excel({ file }) {
  return (
    <div>
      <h2>{file.name}</h2>
      {Array.isArray(file.content) && file.content.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              {file.content[0].map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {file.content.slice(1).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No data to display</p>
      )}
    </div>
  );
}

export default Excel;
