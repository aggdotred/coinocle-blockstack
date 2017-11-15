import React from 'react';
import {Table} from 'reactstrap';

export default (props) => {

  const bidRows = !!props.data ? props.data.map((row, idx) => (
              <tr key={idx}>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
              </tr>
          )
      ) : null;
  return (
      <Table bordered>
        <thead>
        <tr>
          <th>Price</th>
          <th>Volume</th>
        </tr>
        </thead>
        <tbody>
        {bidRows}
        </tbody>
      </Table>
  )
}
