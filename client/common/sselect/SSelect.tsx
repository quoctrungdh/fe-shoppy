import * as React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class SSelect<T> extends React.Component<{
  valueKey?: string,
  labelKey?: string,
  value?: T,
  placeholder?: string,
  options: Array<T>,
  onChange?: any
}, {
  options: Array<T>
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: []
    }
  }

  render() {
    const { valueKey, labelKey, value } = this.props;

    return (
      <div className="custom-select">
        <Select
          name="form-field-name"
          placeholder="Select..."
          {...this.props}
        />
      </div>
    );
  }
}

export default SSelect;
