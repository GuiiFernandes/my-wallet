import React, { Component } from 'react';

import { tableHeaders } from '../helpers';

class Table extends Component {
  render() {
    return (
      <table>
        <thead>
          <tr>
            {tableHeaders.map((header) => <th key={ header }>{ header }</th>)}
          </tr>
        </thead>
        <tbody />
      </table>
    );
  }
}

export default Table;
