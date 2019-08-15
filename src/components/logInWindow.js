import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const LogInWindow = ({value, onChange, logIn, logInOnKey, open}) => {

  return (
    <div>
      <Dialog open={open} disableBackdropClick={true}>
        <DialogTitle id="form-dialog-title">Enter your name to join</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            onChange={onChange}
            value={value}
            label="Your name"
            type="text"
            fullWidth
            onKeyPress={logInOnKey}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={logIn} color="primary">
            Join
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LogInWindow;