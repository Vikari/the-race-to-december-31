import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/fi";

// getComputerMove :: (Moment a) -> Moment
function getComputerMove(a) {
  const b = a.date();
  if (31 === b) return moment({ date: 31, month: 11 });
  const c = a.month(),
    d = c + 20;
  if (d > b) return moment({ date: d, month: c });
  const e = moment({ date: b, month: c + 1 });
  return e.isValid() ? e : moment({ date: b, month: c + 2 });
}

//const props = {};

class App extends Component {
  constructor() {
    super();
    this.state = {
      turn: true,
      date: moment({ date: 1, month: 0 }),
      displayFormat: "DD-MM",
      dates: [],
      blockDate: moment("1-1-2017", "DD-MM-YYYY")
    };
    // this.setState(({ date }) => ({
    //   date: 1
    // }));
  }

  restart = () => {
    this.state = {
      turn: true,
      date: moment({ date: 1, month: 0 }),
      displayFormat: "DD-MM",
      dates: [],
      blockDate: moment("1-1-2017", "DD-MM-YYYY")
    };
  };

  isDayBlocked = date => {
    return (
      date > moment("1-1-2018", "DD-MM-YYYY") ||
      date < this.state.blockDate ||
      (date.date() !== this.state.date.date() &&
        date.month() !== this.state.date.month())
    );
  };

  isOutsideRange = day => {
    return false;
  };

  handleTurn = () => {
    if (!this.state.turn) this.setState(getComputerMove(this.state.date));
    this.state.turn = this.state.turn ? false : true;
  };

  dateChange = date => {
    if (
      (date.date() === this.state.date.date() &&
        date.month() !== this.state.date.month()) ||
      (date.date() !== this.state.date.date() &&
        date.month() === this.state.date.month())
    ) {
      // if (this.state.turn) this.state.turn = false;
      // else this.state.turn = true;
      // this.state.turn = this.state.turn ? false : true;
      this.state.dates.push(date);
      //this.state.blockDate = date; //setBlockDate(date);
      date = this.getComputerMove(date);
      this.state.blockDate = date;
      return this.setState({ date });
    }
  };

  getComputerMove = a => {
    // if (this.state.turn) this.state.turn = false;
    // else this.state.turn = true;
    //this.state.turn = this.state.turn ? false : true;
    const b = a.date();
    if (31 === b) return moment({ date: 31, month: 11 });
    const c = a.month(),
      d = c + 20;
    if (d > b) return moment({ date: d, month: c });
    const e = moment({ date: b, month: c + 1 });
    const f = e.isValid() ? e : moment({ date: b, month: c + 2 });
    this.state.blockDate = f;
    this.state.dates.push(f);
    return f;
  };

  // setBlockDate = blockDate =>
  //   this.setState(({ blockDate }) => ({ blockDate: blockDate }));

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <SingleDatePicker
          date={this.state.date} // momentPropTypes.momentObj or null
          onDateChange={this.dateChange} // PropTypes.func.isRequired
          focused={this.state.focused} // PropTypes.bool
          onFocusChange={({ focused }) => {
            return this.setState({ focused });
          }} // PropTypes.func.isRequired
          displayFormat={this.state.displayFormat}
          isDayBlocked={this.isDayBlocked}
          isOutsideRange={this.isOutsideRange}
        />
        <div>
          <ul>
            {this.state.dates.map(date => {
              if (date) {
                return (
                  <li key={date.format("DD-MM")}>{date.format("DD-MM")}</li>
                );
              }
            })}
          </ul>
        </div>
        <div>
          <form>
            <button onClick={this.restart}>Restart</button>
          </form>
        </div>
      </div>
    );
  }
}
//          enableOutsideDays={true}
/*else return this.setState(getComputerMove(this.state.date));
if (this.state.turn) {
  this.state.turn = false;

} else return this.setState(getComputerMove(this.state.date));
turn={this.handleTurn}
*/
export default App;
