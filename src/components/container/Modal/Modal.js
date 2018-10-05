import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

class Modal extends React.Component {
  render() {
    let message;
    if (this.props.link === "") {
      message = (
        <span style={{ color: "rgb(107, 107, 107)" }}>
          Congrats!! you cleared All the rounds
        </span>
      );
    } else {
      message = (
        <span style={{ color: "rgb(107, 107, 107)" }}>
          Congrats!! Go to next Level
        </span>
      );
    }

    return (
      <div>
        <Dialog
          open={this.props.open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Keep it Up!</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Link to={`/${this.props.link}`} style={{ textDecoration: "none" }}>
              <Button color="primary" autoFocus>
                <span style={{ color: "blue" }}>Go</span>
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Modal;
