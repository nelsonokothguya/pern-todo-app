import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface FormProps {
  onAddTodo: (title: string) => void;  
}

export class Form extends React.Component<FormProps> {
  render() {
    return (
      <div>
        <TextField id="filled-basic" label="To..." variant="filled" />
        <Button variant="contained">Add</Button>
      </div>
    );
  }
}
