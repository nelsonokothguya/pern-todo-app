import * as React from "react";
import { FormControl, FormGroup, Grid, TextField, Button } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";

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

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.addTodo();
  };

  handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.addTodo();
    }
  };

  addTodo = () => {
    if (this.state.title.trim() !== "") {
      this.props.onAddTodo(this.state.title);
      this.setState({ title: "" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={8} sm={4}>
              <FormControl fullWidth>
                <TextField
                  id="filled-basic"
                  label="To..."
                  variant="outlined"
                  value={this.state.title}
                  onChange={this.handleTitleChange}
                  onKeyPress={this.handleKeyPress}
                  multiline
                  rows={1}
                />
              </FormControl>
            </Grid>
            <Grid item xs={2} sm={2}>
              <FormControl fullWidth>
                <Button type="submit" variant="contained" color="primary">
                  <AddTaskIcon />
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </FormGroup>
      </form>
    );
  }
}
