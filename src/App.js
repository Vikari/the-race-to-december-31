import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import "react-dates/lib/css/_datepicker.css";
import "moment/locale/fi";

const initProps = {
  turn: true,
  date: moment({ date: 1, month: 0 }),
  displayFormat: "DD-MM",
  dates: [],
  winText: "",
  disabled: false,
  blockDate: moment("1-1-2017", "DD-MM-YYYY")
};

class App extends Component {
  constructor() {
    super();
    this.state = initProps;
  }

  restart = () => {
    this.state = initProps;
  };

  end = won => {
    this.setState({ disabled: true });
    if (won) {
      this.setState({ winText: "Player won!" });
    } else {
      this.setState({ winText: "Computer won!" });
    }
  };

  isDayBlocked = date => {
    return (
      date < this.state.blockDate ||
      (date.date() !== this.state.date.date() &&
        date.month() !== this.state.date.month())
    );
  };

  isOutsideRange = date => {
    return (
      date > moment("1-1-2018", "DD-MM-YYYY") ||
      date < moment("1-1-2017", "DD-MM-YYYY")
    );
  };

  dateChange = date => {
    this.state.dates.push(date);
    this.setState(this.state);
    if (date.date() === 31 && date.month() === 11) {
      this.setState({ blockDate: date });
      this.setState({ date });
      this.end(true);
    } else {
      date = this.getComputerMove(date);
      this.state.dates.push(date);
      this.setState(this.state);
      this.setState({ blockDate: date });
      if (date.date() === 31 && date.month() === 11) {
        this.setState({ date });
        this.end(false);
      } else {
        return this.setState({ date });
      }
    }
  };

  getComputerMove = a => {
    const b = a.date();
    if (31 === b) return moment({ date: 31, month: 11 });
    const c = a.month(),
      d = c + 20;
    if (d < b) {
      const e = b - 20,
        f = moment({ date: b, month: e });
      return f.isValid() ? f : moment({ date: b, month: e + 1 });
    }
    return moment(d === b ? { date: b, month: c + 1 } : { date: d, month: c });
  };

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to the race to december 31</h2>
        </div>
        <p className="App-intro">
          To get started, select date from date picker.
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
          disabled={this.state.disabled}
        />
        <div className="win">
          {this.state.winText}
        </div>
        <div>
          <ul>
            {this.state.dates.map(date => {
              return <li key={date.format("DD-MM")}>{date.format("DD-MM")}</li>;
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
