import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface FormProps {
  onAddTodo: (title: string) => void;
}

interface FormState {
  title: string;
}

export class MyForm extends React.Component<FormProps, FormState> {
  constructor(props: FormProps) {
    super(props);
    this.state = { title: "" };
  }

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value });
  };

  handleButtonClick = () => {
    this.props.onAddTodo(this.state.title);
    this.setState({ title: "" });
  };

  render() {
    return (
      <div>
        <TextField
          id="filled-basic"
          label="To..."
          variant="filled"
          value={this.state.title}
          onChange={this.handleTitleChange}
        />
        <Button variant="contained" onClick={this.handleButtonClick}>
          Add
        </Button>
      </div>
    );
  }
}
