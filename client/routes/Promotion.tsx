import * as React from 'react';
import SSelect from '../common/sselect/SSelect';
import { getProducts } from '../api/sampleData';

class Promotion extends React.Component<{}, {products: any}> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: null
    }
  }

  async componentDidMount () {
    const products = await getProducts();
    this.setState({ products });
  }

  render() {
    console.log('products', this.state.products);
    return (
      <div>
        {
          this.state.products &&
          <SSelect
            data={this.state.products}
          />
        }
      </div>
    );
  }
}

export default Promotion;
