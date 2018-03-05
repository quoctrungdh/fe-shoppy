import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class SSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: ''
    }
  }  

  handleChange(selectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;
    
    return (
      <div>      
        <Select
          name="form-field-name"
          value={value}
          onChange={() => this.handleChange}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
      </div>
    )
  }
};
