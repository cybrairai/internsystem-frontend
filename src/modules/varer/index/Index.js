import React from 'react'

export default class extends React.Component {

  render() {
    return (
      <div>
        <h1>Products</h1>
        <ul>
          <li><a href ui-sref="råvarer">Raw materials</a></li>
          <li><a href ui-sref="salgsvarer">Sales items</a></li>
          <li><a href ui-sref="kontoer">Account list</a></li>
          <li><a href ui-sref="leverandører">Vendor list</a></li>
          <li><a href ui-sref="salgskalkyler">Sales estimates</a></li>
          <li><a href ui-sref="varetellinger">Inventory counts</a></li>
        </ul>
      </div>
    )
  }
}
