import React from "react"

class Table extends React.Component {

  // currentResults = this.props.gameStats[this.props.gameStats.length-1]

  createRows = () => {
    // debugger
    if (this.props.gameStats.length > 0) {
      return this.props.gameStats[this.props.gameStats.length-1].currentGameSpins.map((spin, index) => {
        // debugger
        return (
          <tr key= {index}>
            <td>{spin[0].spin}</td>
            <td className= {`${spin[0].resultCol}font`}>{spin[0].resultNum}</td>
            <td>{spin[0].spinWin ? "W" : "L"}</td>
            <td>{spin[0].currentBet}</td>
            <td>{spin[0].pocket}</td>
          </tr>
        )
      })
    }
  }

  render(){
    // debugger
    return  (
      <div className = "col s12">

        <table className = "striped centered responsive-table">
          <thead>
            <tr>
              <th>Spin</th>
              <th>Result</th>
              <th>W/L</th>
              <th>Bet</th>
              <th>Pocket</th>
            </tr>
          </thead>

          <tbody>
            {this.props.gameStats.length > 0 ? this.createRows() : ""}

          </tbody>
        </table>

      </div>
    )
  }
}


export default Table
