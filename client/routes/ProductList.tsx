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
  productId: string;
  name: string;
  price: number;
  isFavorite: boolean;
  inPackage: boolean;
  imageUrl: string;
  sizes: number[];
  colors: string[];
  description: string;
  type: string;
}

const productList: Product[] = [
  {
    productId: "0001",
    name: "nike-01",
    price: 25678,
    isFavorite: false,
    inPackage: true,
    imageUrl: ProductImage1,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0002",
    name: "nike-02",
    price: 25678,
    isFavorite: true,
    inPackage: false,
    imageUrl: ProductImage2,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0003",
    name: "nike-03",
    price: 25678,
    isFavorite: true,
    inPackage: false,
    imageUrl: ProductImage3,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0004",
    name: "nike-04",
    price: 25678,
    isFavorite: true,
    inPackage: true,
    imageUrl: ProductImage4,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0005",
    name: "nike-05",
    price: 25678,
    isFavorite: true,
    inPackage: true,
    imageUrl: ProductImage5,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0006",
    name: "nike-06",
    price: 25678,
    isFavorite: true,
    inPackage: true,
    imageUrl: ProductImage6,
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  }
]

const timeOut: number = 2000;

const api = {
  getProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(productList)
      }, timeOut);
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
      .then((data:Product) => this.setState({ productList: data }))
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
              <div className="flex-item text-center" key={item.productId}>
                <div className="product__box">
                  <p className="product__type">{item.type}</p>
                  <h3 className="product__name">{item.name}</h3>
                  <img src={item.imageUrl} alt={item.name} className="product__image" />
                  <p className="product__price">${item.price}</p>
                  <button
                    className="product__favorite-icon product__top-icon"
                    onClick={() => this.setFavorite(index)}
                  >
                    <img
                      src={item.isFavorite ? FavoriteActiveIcon : FavoriteIcon}
                      alt="Favorite icon"
                    />
                  </button>
                  <Link to="/" className="product__package-icon product__top-icon">
                    <img
                      src={item.inPackage ? PackgageActiveIcon : PackgageIcon}
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
