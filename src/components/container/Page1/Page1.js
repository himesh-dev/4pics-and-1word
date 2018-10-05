import React, { Component } from "react";
import "../container.css";
import mouse1 from "../../../image/mouse1.jpg";
import mouse2 from "../../../image/mouse2.jpg";
import mouse3 from "../../../image/mouse3.jpg";
import mouse4 from "../../../image/mouse4.jpg";
import Modal from "../Modal/Modal";

class Page1 extends Component {
  state = {
    tray: [],
    button: ["A", "B", "M", "O", "U", "C", "S", "E"],
    indexArray: [],
    hint: ["M", "O", "U", "S", "E"],
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
    let answer;
    let modal;
    if (
      this.state.tray.length === 5 &&
      this.state.tray.toString() === "M,O,U,S,E"
    ) {
      answer = this.state.tray.map((item, index) => {
        return <button key={index}>{item}</button>;
      });
      modal = <Modal open={true} link="Page2" />;
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
          <img src={mouse1} alt="mouse" />
          <img src={mouse2} alt="mouse" />
          <img src={mouse3} alt="mouse" />
          <img src={mouse4} alt="mouse" />
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

export default Page1;
