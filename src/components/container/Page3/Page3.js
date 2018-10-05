import React, { Component } from "react";
import "../container.css";
import sign1 from "../../../image/sign1.jpg";
import sign2 from "../../../image/sign2.jpg";
import sign3 from "../../../image/sign3.jpg";
import sign4 from "../../../image/sign4.jpg";
import Modal from "../Modal/Modal";

class Page3 extends Component {
  state = {
    tray: [],
    button: ["G", "B", "S", "I", "T", "N", "R", "E"],
    indexArray: [],
    hint: ["S", "I", "G", "N"],
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
      this.setState({ tray: trayCopy });
    }
    for (let p = z; p < this.state.tray.length; p++) {
      if (this.state.hint[p] !== this.state.tray[p]) {
        trayCopy[p] = hintCopy[p];
        this.setState({ hint: hintCopy, tray: trayCopy });
        break;
      }

      if (this.state.tray[p] === this.state.hint[p]) {
        trayCopy[p + 1] = hintCopy[p + 1];
        this.setState({ tray: trayCopy });
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
      this.state.tray.length === 4 &&
      this.state.tray.toString() === "S,I,G,N"
    ) {
      answer = this.state.tray.map((item, index) => {
        return <button key={index}>{item}</button>;
      });
      modal = <Modal open={true} link="Page4" />;
    } else if (this.state.tray.length <= 4) {
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
          <img src={sign1} alt="sign" />
          <img src={sign2} alt="sign" />
          <img src={sign3} alt="sign" />
          <img src={sign4} alt="sign" />
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

export default Page3;
