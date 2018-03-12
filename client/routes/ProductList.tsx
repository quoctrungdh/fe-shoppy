//Lib
import * as React from 'react';
import { Link } from 'react-router-dom';

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
    isFavorite: boolean;
    inPackage: boolean;
    images: string;
    sizes: number[];
    colors: string[];
    description: string;
    type: string;
}

const api = {
  getProducts() {
    return new Promise((resolve, reject) => {
      fetch('http://localhost:1235/api/product').then(productList => {
          resolve(productList.json())
      });
    })
  }
}

export default class ProductList extends React.Component {
  state = {
    isLoading: false,
    productList: [],
    error: null,
    isShowGrid: true,
  }

  /***
   * Function: update display clicked like icon
   * Parameter: index number of product in array
   */
  setFavorite(index: number):void {
    const productList:Product[] = this.state.productList;
    productList[index].isFavorite = !productList[index].isFavorite;
    this.setState({ productList });
  }

  /**
   * Function: update display product list
  */
  setGrid():void {
    this.setState({ isShowGrid: !this.state.isShowGrid });
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.getProducts()
      .then((data:Product) => {
          console.log(data);
          this.setState({ productList: data });
      })
      .catch((err:string) => this.setState({ error: err }))
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    return (
      <div>
        {
          this.state.error &&
          <div>
            <p>{this.state.error.message}</p>
            <p className="text-center">
              <Link to="/products">Reload</Link>
            </p>
          </div>
        }
        {
          this.state.isLoading &&
          <Loading />
        }
        <h1>ProductList</h1>
        <ProductListControl
          isShowGrid={this.state.isShowGrid}
          onControlClick={() => this.setGrid()}
        />
        <div className={`flex ${this.state.isShowGrid ? 'row': ''}`}>
          {
            this.state.productList.map((item:Product, index:number) => (
              <div className="flex-item text-center" key={item.sku}>
                <div className="product__box">
                  <p className="product__type">SHOE</p>
                  <h3 className="product__name">{item.name}</h3>
                  <img src={`http://localhost:1235${item.images[Math.floor(Math.random()*item.images.length)]}`} alt={item.name} className="product__image" />
                  <p className="product__price">${item.price}</p>
                  <button
                    className="product__favorite-icon product__top-icon"
                    onClick={() => this.setFavorite(index)}
                  >
                    <img
                      src={Math.random() >= 0.5 ? FavoriteActiveIcon : FavoriteIcon}
                      alt="Favorite icon"
                    />
                  </button>
                  <Link to="/" className="product__package-icon product__top-icon">
                    <img
                      src={Math.random() >= 0.5 ? PackgageActiveIcon : PackgageIcon}
                      alt="Package icon"
                    />
                  </Link>
                </div>
              </div>
            ))
          }
        </div>
        <Pagination pageCounts={this.state.productList.length} />
      </div>
    )
  }
}
