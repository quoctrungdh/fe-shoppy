//Lib
import * as React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';

//Component
import Loading from '../common/Loading';
import ProductListControl from '../component/ProductListControl';
import Pagination from '../component/Pagination';

//Image
import * as ProductImage1 from '../assets/images/shoes1.png';
import * as ProductImage2 from '../assets/images/shoes2.png';
import * as ProductImage3 from '../assets/images/shoes3.png';
import * as ProductImage4 from '../assets/images/shoes4.png';
import * as ProductImage5 from '../assets/images/shoes5.png';
import * as ProductImage6 from '../assets/images/shoes6.png';
import * as FavoriteIcon from '../assets/images/favorite_icon.png';
import * as FavoriteActiveIcon from '../assets/images/favorite_active_icon.png';
import * as PackgageIcon from '../assets/images/package_icon.png';
import * as PackgageActiveIcon from '../assets/images/package_active_icon.png';

interface Product {
    sku: string;
    name: string;
    price: number;
    images: string;
    sizes: number[];
    colors: string[];
    description: string;
    type: string;
}

const getProductsUrl = `http://localhost:12346/products`;

// component danh sách sản phẩm, sử dụng các prop truyền vào ở trên
const ProductListRender = ({ list, isShowGrid, onFavoriteClick, addToCart }) =>
    <div
        className={`flex ${isShowGrid ? 'row': ''}`}
    >
        {list.map(item => <div className="flex-item text-center" key={item.productId}>
            <div className="product__box">
                <p className="product__type">SHOE</p>
                <h3 className="product__name">{item.name}</h3>
                <img src={item.colors[0].imageUrl} alt={item.name} className="product__image" />
                <p className="product__price">${item.price}</p>
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
    </div>;

export default class ProductListSimple extends React.Component {
  state = {
    products: null
  }
  componentWillMount() {
    fetch(getProductsUrl)
      .then(response => response.json())
      .then(products => {
          console.log(products, 'products')
          this.setState({ products })
      })
  }

  addToCart = () => {

  }

  onFavoriteClick = () => {

  }

  render() {
    return (this.state.products && <ProductListRender
      list={this.state.products}
      isShowGrid={true}
      onFavoriteClick={this.onFavoriteClick}
      addToCart={this.addToCart}
    />)
  }
}
