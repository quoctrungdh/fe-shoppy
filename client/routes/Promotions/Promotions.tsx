import * as React from 'react';
import SSelect from '../../common/SSelect/SSelect';
import { getProducts, getPromotions } from '../../api/sampleData';
import Select from 'react-select';
import { DATE_TIME_LOCALE, SORT_TYPE } from '../../helpers/constants';
import { formatDate, isSameOrBefore } from '../../helpers/common';
import PromotionItem from '../../common/PromotionItem/PromotionItem';
import PromotionResult from '../../common/PromotionResult/PromotionResult';
import SortByName from '../../common/SortByName/SortByName';

interface SelectedOption {
  value: any,
  label: string
}

class Promotion extends React.Component<{}, {
  products: any[],
  promotions: any[],
  selectedOption: any,
  sortType: string
}> {
  constructor(props: any) {
    super(props);
    this.state = {
      products: [],
      promotions: [],
      selectedOption: null,
      sortType: SORT_TYPE.ASCENDING
    }

    this.handleChange = this.handleChange.bind(this);
    this.sortList = this.sortList.bind(this);
  }


  async componentDidMount () {
    const products = await getProducts();
    const promotions = await getPromotions();
    for (const value of promotions) {
      value.dateFormated = formatDate(value.date);
      value.isHide = isSameOrBefore(value.date);
    }

    this.setState({
      products,
      promotions
    });
  }

  handleChange(selectedOption: SelectedOption): void {
    console.log('selectedOption', selectedOption);
    this.setState({ selectedOption });
  }

  sortList() {
    const isAscending = this.state.sortType === SORT_TYPE.ASCENDING;
    this.setState({
      sortType: isAscending ? SORT_TYPE.DESCENDING : SORT_TYPE.ASCENDING
    });
  }

  render() {
    const { selectedOption, products, promotions, sortType } = this.state;
    const value = selectedOption && selectedOption.id;
    const results = (value && promotions.filter(item => item.id === value)) || promotions;
    const Enhancer = SortByName(PromotionResult, sortType);

    return (
      <div className="promotions">
        <SSelect
          placeholder="Select promotion...<3"
          value={value}
          options={promotions}
          onChange={this.handleChange}
          labelKey="name"
          valueKey="id"
        />
        <div className="promotions__button-groups">
          {
            sortType === SORT_TYPE.ASCENDING &&
            <div className="promotions__sortBtn" onClick={this.sortList}>
              <i className="fas fa-angle-double-up"></i>
            </div>

          }
          {
            sortType === SORT_TYPE.DESCENDING &&
            <div className="promotions__sortBtn" onClick={this.sortList}>
              <i className="fas fa-angle-double-down"></i>
            </div>
          }
        </div>

        <Enhancer
          results={results}
        />
      </div>
    );
  }
}

export default Promotion;
