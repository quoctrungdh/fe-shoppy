//Lib
import * as React from 'react';
import { Link } from 'react-router-dom';
import Select from 'react-select';

//Component
import Loading from '../common/Loading';
import ProductListControl from '../component/ProductListControl';
import Pagination from '../component/Pagination';
import cartService from '../services/cart';
import SSelect from '../common/SSelect/SSelect';
import { SORT_TYPE } from '../helpers/constants';

//Image
import * as FavoriteIcon from '../assets/images/favorite_icon.png';
import * as FavoriteActiveIcon from '../assets/images/favorite_active_icon.png';
import * as PackgageIcon from '../assets/images/package_icon.png';
import * as PackgageActiveIcon from '../assets/images/package_active_icon.png';

interface SelectedOption {
  value: any,
  label: string
}

interface Product {
  productId: string;
  sku: string;
  name: string;
  price: number;
  images: string;
  sizes: number[];
  colors: string[];
  description: string;
  type: string;
}

interface ProductListState {
  products: Product[];
  selectedColor: SelectedOption,
  selectedSize: SelectedOption,
  sortType: string
}

const getProductsUrl = `http://localhost:12346/products`;

let filterProperties: any;

// component danh sách sản phẩm, sử dụng các prop truyền vào ở trên
const ProductListRender = ({ list, filterProperties, selectedSize, selectedColor, isShowGrid, onFavoriteClick, addToCart, filterSize, filterColor}) =>
  <div>
    <SSelect
      placeholder="Select size...<3"
      value={selectedSize}
      options={filterProperties.sizes}
      onChange={filterSize}
    />
    <SSelect
      placeholder="Select color...<3"
      value={selectedColor}
      options={filterProperties.colors}
      onChange={filterColor}
    />
    <div
      className={`flex ${isShowGrid ? 'row': ''}`}
    >
        {
        list
        .sort((a: any, b: any) => {
          return (a.pintop === b.pintop) ? 0 : a.pintop ? -1 : 1
        })
        .map(item => <div className="flex-item text-center" key={item.productId}>
            <div className="product__box">
                <p className="product__type">SHOE</p>
                <Link to={`/product-detail/${item.productId}`}>
                  <h3 className="product__name">{item.name}</h3>
                  <img src={item.colors[0].imageUrl} alt={item.name} className="product__image" />
                </Link>
                <p className="product__price">${item.price}</p>
                <p className="product__size">size: {item.sizes[0]}</p>
                <p className="product__size">color: {item.colors[0].color}</p>
                <button
                    className="product__favorite-icon product__top-icon"
                    onClick={() => onFavoriteClick(item.productId)}
                >
                    <img
                        src={FavoriteActiveIcon}
                        alt="Favorite icon"
                    />
                </button>
                <button
                    className="product__package-icon product__top-icon"
                    onClick={() =>  addToCart(item.productId)}
                >
                    <img src={PackgageIcon} alt="Package icon" />
                </button>
            </div>
        </div>)}
    </div>
  </div>;

export default class ProductListSimple extends React.Component<{}, {}> {
  state = {
    products: [],
    selectedColor: {
      label: null,
      value: null,
    },
    selectedSize: {
      label: null,
      value: null,
    },
    sortType: SORT_TYPE.ASCENDING,
    filterProperties: {
      sizes: null,
      colors: null,
    }
  }

  componentWillMount() {
    fetch(getProductsUrl)
      .then(response => response.json())
      .then(products => {
        const sizes = [...new Set(products.map(item => item.sizes[0]))]
        .sort((a, b) => +a===+b ? 0 : a ? -1 : 1 )
        .map(size => ({
          label: size,
          value: size
        }));
        const colors = [...new Set(products.map(item => item.colors[0].color))].map(color => ({
          label: color,
          value: color
        }));
        filterProperties = {
          sizes,
          colors
        }
        this.setState({ products, filterProperties });
      })
  }

  addToCart = (id: string) => {
    const { products } = this.state;
    const selectedProduct = products.find((product: Product) => product.productId === id) || products;
    cartService.addToCart(selectedProduct);
  }

  onFavoriteClick = () => {  }

  filterSize = (selectedSize: SelectedOption) => {
    this.setState({ selectedSize });
  }

  filterColor = (selectedColor: SelectedOption) => {
    this.setState({ selectedColor });
  }

  render() {
    const { products, selectedSize, selectedColor } = this.state;
    const size = selectedSize && selectedSize.value;
    const color = selectedColor && selectedColor.value;
    const filteredList = 
    ((size && color) && products.filter((item) => item.sizes[0] === size && item.colors[0].color === color)) 
    || (size && products.filter((item) => item.sizes[0] === size))
    || (color && products.filter((item) => item.colors[0].color === color))
    || this.state.products;
    return (this.state.products && <ProductListRender
      list={filteredList}
      filterProperties={this.state.filterProperties}
      selectedSize={size}
      selectedColor={color}
      isShowGrid={true}
      onFavoriteClick={this.onFavoriteClick}
      addToCart={this.addToCart}
      filterSize={this.filterSize}
      filterColor={this.filterColor}
    />)
  }
}
