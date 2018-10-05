import React, { Component } from "react";
import "../container.css";
import water1 from "../../../image/water1.jpg";
import water2 from "../../../image/water2.jpg";
import water3 from "../../../image/water3.jpg";
import water4 from "../../../image/water4.jpg";
import Modal from "../Modal/Modal";

class Page2 extends Component {
  state = {
    tray: [],
    button: ["L", "B", "W", "A", "T", "C", "R", "E"],
    indexArray: [],
    hint: ["W", "A", "T", "E", "R"],
    hintTray: [],
    i: 0,
  };

  passingToTray = (value, id) => {
    let Tray = this.state.tray.slice();
    let Index = this.state.indexArray.slice();
    Index.push(id);
    Tray.push(value);
    this.setState({
      tray: Tray,
      indexArray: Index
    });
  };

  printOnclick = indexArray => {
    let arrayIndex = this.state.indexArray.slice();
    let trayArray = this.state.tray.slice();
    trayArray[indexArray] = null;
    arrayIndex[indexArray] = null;

    return this.setState({
      indexArray: arrayIndex,
      tray: trayArray
    });
  };

  getHint = () => {
    let z = this.state.i;
    let hintCopy = this.state.hint.slice();
    let trayCopy = this.state.tray.slice();
    if (trayCopy.length === 0) {
      trayCopy[0] = hintCopy[0];
      this.setState({
        tray: trayCopy
      });
    }
    for (let p = z; p < this.state.tray.length; p++) {
      if (this.state.hint[p] !== this.state.tray[p]) {
        trayCopy[p] = hintCopy[p];
        this.setState({
          hint: hintCopy,
          tray: trayCopy
        });
        break;
      }

      if (this.state.tray[p] === this.state.hint[p]) {
        trayCopy[p + 1] = hintCopy[p + 1];
        this.setState({
          tray: trayCopy
        });
      }
    }
  };

  componentDidUpdate() {
    if (this.state.tray.includes(null)) {
      let trayArray = this.state.tray.slice().filter(el => el != null);
      let indexArray = this.state.indexArray.slice().filter(el => el != null);

      this.setState({
        tray: trayArray,
        indexArray: indexArray
      });
    }
  }

  render() {
    let modal;
    let answer;
    if (
      this.state.tray.length === 5 &&
      this.state.tray.toString() === "W,A,T,E,R"
    ) {
      answer = this.state.tray.map((item, index) => {
        return <button key={index}>{item}</button>;
      });
      modal = <Modal open={true} link="Page3" />;
    } else if (this.state.tray.length <= 5) {
      answer = this.state.tray.map((item, index) => {
        return (
          <button key={index} onClick={() => this.printOnclick(index)}>
            {item}
          </button>
        );
      });
    } else {
      answer = <span>Wrong</span>;
    }

    return (
      <div>
        <div className="container">
          <img src={water1} alt="water" />
          <img src={water2} alt="water" />
          <img src={water3} alt="water" />
          <img src={water4} alt="water" />
        </div>
        <h3>Guess the Word</h3>
        {/* answer tray part */}
        <div className="wordtray">
          {answer}
          {modal}
        </div>

        {/* button keyboard */}
        <div className="letters">
          {this.state.button.map((button, index) => {
            return (
              <button
                disabled={this.state.tray.includes(button) ? true : false}
                key={index}
                onClick={() => this.passingToTray(button, index)}
              >
                {button}
              </button>
            );
          })}
          <button className="hint" onClick={() => this.getHint()}>
            Hint
          </button>
        </div>
      </div>
    );
  }
}

export default Page2;
