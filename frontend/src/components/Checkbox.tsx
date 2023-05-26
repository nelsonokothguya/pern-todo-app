import * as React from "react";
import { Checkbox as MUICheckbox, FormControlLabel } from "@mui/material";

interface CheckboxProps {
    label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

class Checkbox extends React.Component<CheckboxProps>{
    handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      // Pass the new checked value to the parent component
      this.props.onChange(event.target.checked);
    }

    render() {
      return (
        <FormControlLabel
          control={
            <MUICheckbox 
              checked={this.props.checked} 
              onChange={this.handleCheckboxChange}
     
            />
          }

           label = {this.props.label}
        />
      );
    }
};

export default Checkbox;

