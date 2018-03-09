import * as React from 'react';
import SSelect from '../../common/sselect/SSelect';
import { getProducts } from '../../api/sampleData';
import Select from 'react-select';

interface SelectedOption {
  value: any,
  label: string
}

class Promotion extends React.Component<{}, {
  products: Array<any>,
  selectedOption: any
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      selectedOption: null
    }

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(selectedOption: SelectedOption): void {
    console.log('selectedOption', selectedOption);
    this.setState({ selectedOption });
  }

  async componentDidMount () {
    const products = await getProducts();
    this.setState({ products });
  }

  render() {
    const { selectedOption, products } = this.state;
    const value = selectedOption && selectedOption.id;

    return (
      <div className="promotions">
        <SSelect
          placeholder="Select promotion"
          value={value}
          options={products}
          onChange={this.handleChange}
          labelKey="name"
          valueKey="id"
        />
      </div>
    );
  }
}

export default Promotion;
