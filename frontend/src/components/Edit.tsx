import React from "react";
import {
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export interface EditProps {
  onEditAndSave: (title: string) => void;
}

interface EditState {
  open: boolean;
  title: string;
}

export class Edit extends React.Component<EditProps, EditState> {
  state: EditState = {
    open: false,
    title: "",
  };
  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleClick = () => {
    this.setState({ open: true }); // open the dialog when the edit button is clicked
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.props.onEditAndSave(this.state.title);
    this.handleClose();
  };
  handleClose = () => {
    this.setState({ open: false }); // close the dialog
  };

  render(): React.ReactNode {
    const { open } = this.state;

    return (
      <div>
        <Fab variant="extended" aria-label="add" onClick={this.handleClick}>
          <EditIcon sx={{ mr: 1, width: 20, height: 20, color: "green" }} />
        </Fab>

        <Dialog open={open}>
          <DialogTitle>Edit Todo Item</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Todo Item"
              type="text"
              fullWidth
              // Add any necessary props for the text area
              onChange={this.handleTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
