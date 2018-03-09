import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

interface SelectedOption {
  value: any,
  label: string
}

interface SSelectTypes {
  data: any
}

export default class SSelect extends React.Component<{
  data: any
}, {
  selectedOption: any
}> {

  constructor(props: any) {
    super(props);
    this.state = {
      selectedOption: null
    }
    console.log('SS', props);
  }

  handleChange(selectedOption: SelectedOption) {
    this.setState({ selectedOption });
    console.log(`Selected: ${selectedOption.label}`);
  }

  render() {
    const selectedOption = this.state;
    const value = selectedOption && selectedOption.value;
    console.log(this.props.data);

    return (
      <div>
        {
          this.props.data &&
          <Select
            name="form-field-name"
            value={value}
            onChange={() => this.handleChange}
            options={this.props.data}
          />
        }
      </div>
    )
  }
};
