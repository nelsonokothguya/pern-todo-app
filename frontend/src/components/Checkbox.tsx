import * as React from "react";
import { Switch, FormControlLabel } from "@mui/material";


interface CheckboxProps {
  label: string;
  id: number;
  completed: boolean;
  onCheckboxChange: (checked: boolean, todoId: number) => void;
}

class Checkbox extends React.Component<CheckboxProps> {
  handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    const { id, onCheckboxChange } = this.props;
    onCheckboxChange(checked, id);
  };
  render() {
    const checkboxStyle = {
      color: this.props.completed ? "red" : "blue",
    };

    const labelStyle = {
      textDecoration: this.props.completed ? "line-through" : "none",
    };

    return (
      <FormControlLabel
        control={
          <Switch
            checked={this.props.completed}
            onChange={this.handleCheckboxChange}
            style={checkboxStyle}
          />
        }
        label={<span style={labelStyle}>{this.props.label}</span>}
      />
    );
  }
}

export default Checkbox;
