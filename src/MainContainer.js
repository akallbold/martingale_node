import React from "react"
import Inputs from "./Inputs"
import ChartComponent from "./Chart"
import Table from "./Table"

class MainContainer extends React.Component {

//lifetime variables
  redNums = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
  blackNums = [2,4,6,8,10,11,13,15,17,20,22,24,26,28,29,31,33,35];
  greenNums = [0,37];
  // probOfWin = 0;

  state = {
    colorChoice: "red",
    goal: 100,
    maxInvestment: 1000,
    bet: 10,
    gameWin: null,
    gameStats: [],
    probOfWin:0
  }

  handleRed = () => {this.setState({colorChoice: "red"})}
  handleBlack = () => {this.setState({colorChoice: "black"})}
  handleGoal = (event) => this.setState({goal: event.target.value, probOfWin:this.determineProb()})
  handleMaxInvestment = (event) => this.setState({maxInvestment: event.target.value, probOfWin:this.determineProb()})
  handleBet = (event) => this.setState({bet: event.target.value, probOfWin:this.determineProb()})

  componentDidMount(){
    // fetch chart data
  }




  //probability helper fuctions
  getBaseLog = (x, y) => {
    return Math.log(y) / Math.log(x);
  }

  factorial(n) {
    if (n < 0) {
      return "error";
    } else if (n === 0) {
      return 1;
    } else {
        return (n * this.factorial(n - 1));
    }
  }

  determineProb = () => {
    let probOfWin
    let winsNeededForGoal = Math.ceil(this.state.goal/this.state.bet)
    let lossesNeededForGameOver = Math.floor(this.getBaseLog(2,(this.state.maxInvestment/this.state.bet)))
    //now we calculate the probability that we will spin our wins needed before we spin our losses needed IN A ROW.

    //first we find the probability of losing x times in a row (resulting in losing our maxInvestment)
    let probOfLosingInARow= Math.pow(.53,lossesNeededForGameOver)

    //given probOfLosingInARow, we can find the median number of spins needed to reach probOfLosingInARow. We are using probOfLosingInARow here instead of probOfLosingOnce (53%) and demonstrating that we only need to experience probOfLosingInARow once to replicate the "lose x times in a row scenario"
    let averageSpinsForLoss = 1/probOfLosingInARow

    //we now have the average spins for a loss and need to calculate, what is the probability that we will win winNeededForGoal times before we hit the average spins needed to result in a loss.

    //using negative binomial distribution we can find the probability that we will win the game in a specific spin. We can then sum these probabilities to get the probability that we will spin enough wins to win the game before we get to the average amount of times it takes to lose the game. If our averageSpinsForLoss is less than our winsNeededForGoal then we find the inverse (1-probability).

    if (winsNeededForGoal > averageSpinsForLoss){
      probOfWin = 1
      for (let i = 0; i<=winsNeededForGoal; i++){
        probOfWin -= (this.factorial(i-1)/(this.factorial((i-1)-(winsNeededForGoal-1))*this.factorial(winsNeededForGoal-1))) * Math.pow(.47,winsNeededForGoal) * Math.pow(.53,(i-winsNeededForGoal))
      }
        // this.setState({probOfWin:probOfWin})
    } else {
      probOfWin = 0
      for (let i = winsNeededForGoal; i <= averageSpinsForLoss; i++){
        probOfWin += (this.factorial(i-1)/(this.factorial((i-1)-(winsNeededForGoal-1))*this.factorial(winsNeededForGoal-1))) * Math.pow(.47,winsNeededForGoal) * Math.pow(.53,(i-winsNeededForGoal))
      }
        // this.setState({probOfWin:probOfWin})
    }
    return probOfWin
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  startGame = () => {
    // this.determineProb()
    this.run()
  }

  run = () => {
    let pocket = 0;
    let currentSpin = null;
    let currentBet = 10;
    let spins = 0;
    let currentGameSpins = [];
    let colorOfSpin = null;
    let spinWin = null;
    let highestBet = 0
    // this.resetGame()

    while ((currentBet <= this.state.maxInvestment) && (this.state.goal > pocket)) {
      currentSpin = this.spin();
      colorOfSpin = this.colorOfSpin(currentSpin)
      spins++;
      if (this.win(colorOfSpin)) {
        spinWin = true
        pocket += this.state.bet
        currentGameSpins.push([{ spin:spins,
                                 resultNum: currentSpin,
                                 resultCol: colorOfSpin,
                                 spinWin: spinWin,
                                 currentBet: currentBet,
                                 pocket: pocket}])
        currentBet = this.state.bet
      } else {
        spinWin = false
        currentGameSpins.push([{ spin:spins,
                                 resultNum: currentSpin,
                                 resultCol: colorOfSpin,
                                 spinWin: spinWin,
                                 currentBet: currentBet,
                                 pocket: pocket}])
        currentBet *= 2
        if (currentBet > highestBet) highestBet = currentBet;
      }
    }
    let gameResults = this.gameOver(currentBet, pocket, spins, currentGameSpins, highestBet)
    if(gameResults){
      this.setState({gameStats:[...this.state.gameStats, gameResults], gameWin:gameResults.gameWin})
      this.fetchGameResults(gameResults, currentGameSpins)
    }
  }



  gameOver = (currentBet, pocket, spins, currentGameSpins, highestBet) => {
    if (currentBet >= this.state.maxInvestment){
      return
                          ({ gameWin: false,
                            numOfSpins: spins,
                            bet: this.state.bet,
                            goal: this.state.goal,
                            maxInvestment: this.state.maxInvestment,
                            colorChoice: this.state.colorChoice,
                            highestBet: highestBet,
                            pocket: pocket,
                            probOfWin: this.state.probOfWin,
                            currentGameSpins: currentGameSpins})
    } else if ((this.state.goal <= pocket)){
      return              ({ gameWin: true,
                            numOfSpins: spins,
                            bet: this.state.bet,
                            goal: this.state.goal,
                            maxInvestment: this.state.maxInvestment,
                            colorChoice: this.state.colorChoice,
                            highestBet: highestBet,
                            pocket: pocket,
                            probOfWin: this.state.probOfWin,
                            currentGameSpins: currentGameSpins})
    } else {
      console.log("game on")
      return false
    }
  }

  fetchGameResults = (gameResults, currentGameSpins) => {
    fetch('http://localhost:3000/games', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gameResults)
    })
    .then(response => response.json())
    .then(data => this.fetchSpinResults(data, currentGameSpins))
    .catch(error => console.log(error))
  }

  fetchSpinResults = (data, currentGameSpins) => {
    console.log("in fetch spins FE")
    fetch('http://localhost:3000/spins', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gameId: data.id,
        currentGameSpins: currentGameSpins
        })
    })
    // .then(response => console.log(response.json()))
    // .then(data => console.log(data))
    .catch(error => console.log(error))
  }

  spin = () => {
    return Math.floor(Math.random() * Math.floor(37))
  }

  colorOfSpin = (currentSpin) => {
    if (this.redNums.includes(currentSpin)){
      return "red"
    } else if (this.blackNums.includes(currentSpin)){
      return "black"
    } else if (this.greenNums.includes(currentSpin)){
      return "green"
    } else {
      return "error"
    }
  }

  win = (colorOfSpin) => {
    if (this.state.colorChoice === "red" && colorOfSpin === "red"){
      return true
    } else if (this.state.colorChoice === "black" && colorOfSpin === "black"){
      return true
    } else {
      return false
    }
  }

////////////////////////////////////////////////////////////////////////////////////////////
lifetimeRBGStats = () => {
  let output = {red: 0, black: 0, green: 0}

  this.state.gameStats.forEach(game => {
    game.currentGameSpins.forEach(spin => {
      output[spin[0].resultCol]++
    })
  })
  // console.log(output)
  return output
}

createChartData = () => {
  let rbg = this.lifetimeRBGStats()
  let chartData = {labels: ["RED", "BLACK", "GREEN"],
                   datasets: [
                     {
                       data: [rbg.red, rbg.black, rbg.green],
                       backgroundColor: ["#E0080B", "#000000", "#016D29"]

                     }
                   ]
                  }
  return chartData
}

////////////////////////////////////////////////////////////////////////////////////////////
  render(){
    return (
      <div className= "container">
        <div className= "row">
          <Inputs className = "col s6"
                  goal={this.state.goal}
                  maxInvestment={this.state.maxInvestment}
                  bet={this.state.bet}
                  winBig={this.state.winBig}
                  colorChoice={this.state.colorChoice}
                  gameStats = {this.state.gameStats}
                  handleRed={this.handleRed}
                  handleBlack={this.handleBlack}
                  handleGoal={this.handleGoal}
                  handleMaxInvestment={this.handleMaxInvestment}
                  handleBet={this.handleBet}
                  startGame={this.startGame}
                  probOfWin={this.state.probOfWin}
          />
          <ChartComponent className = "col s6"
                          gameStats = {this.state.gameStats}
                          chartData = {this.createChartData}/>

          <Table  className = "col s12"
                  gameStats = {this.state.gameStats}/>

        </div>
      </div>
    )
  }
}

export default MainContainer
