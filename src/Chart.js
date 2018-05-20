import React from "react"
import {Bar} from 'react-chartjs-2'

class ChartComponent extends React.Component {



  render(){
    return (
      <div className = "col s6">
        <Bar
          data={this.props.chartData()}
          options= {{
            title:{
              display:true,
              position: 'top',
              text: "Spin-Color Distribution",
              fontSize:25
            },
            legend:{
              display:false
            }
          }}
        />
      </div>
    )
  }
}

export default ChartComponent
