import React from "react"

class Inputs extends React.Component {

  // currentResults = this.props.gameStats[this.props.gameStats.length-1]

  render(){
    // debugger
    // let currentResults = this.props.gameStats[this.props.gameStats.length-1]
    return  (
      <div className = "col s6">
        <div className= "inputs  border">
          <h5>Inputs</h5>
          <button className= "btn red" onClick={this.props.handleRed}>Red</button>
          <button className= "btn black" onClick={this.props.handleBlack}>Black</button>
          <p>{`fingers crossed for ${this.props.colorChoice}`}</p>
          <br></br>
          <label> Goal Amount
            <input onChange={this.props.handleGoal} value={this.props.goal} placeholder="GOAL"></input>
          </label>
          <label> Max Investment
            <input onChange={this.props.handleMaxInvestment} value= {this.props.maxInvestment} placeholder="MAX INVESTMENT"></input>
          </label>
          <label> Bet
            <input onChange={this.props.handleBet} value= {this.props.bet} placeholder="BET"></input>
          </label>
          <button className = "btn" onClick={this.props.startGame}>Run</button>
        </div>
        <div>
          <h5>Results</h5>
          <h6>{this.props.gameStats.length > 0 ? this.props.gameStats[this.props.gameStats.length-1].gameWin ? "You Won!" : "Yikes! You Lost :(" : "Press Run Button to Start"}</h6>
          <h6> Total Number of Spins: {this.props.gameStats.length > 0 ? this.props.gameStats[this.props.gameStats.length-1].numOfSpins : 0}</h6>
          <h6> Probability of Winning: {this.props.probOfWin}</h6>
        </div>
      </div>
    )
  }
}


export default Inputs
