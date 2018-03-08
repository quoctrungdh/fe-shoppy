import * as React from 'react';
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
import { Link } from 'react-router-dom';

interface Product {
  productId:string;
  name:string;
  price:number;
  isFavorite:boolean;
  inPackage:boolean;
  imageUrl:string;
  sizes:number[];
  colors:string[];
  description:string;
  type:string;
}

const productList = [
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

const timeOut = 2000;

const api = {
  getProducts() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(productList)
        // reject(new Error('Can not get products'))
      }, timeOut);
    })
  }
}

export default class ProductList extends React.Component<{}, {}> {
  state = {
    isLoading: false,
    productsList: [],
    error: null
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.getProducts()
      .then((data:Product) => this.setState({ productsList: data }))
      .catch((err:string) => this.setState({ error: err }))
      .finally(() => this.setState({ isLoading: false }))
  }

  render() {
    return (
      <div>
        <h1>ProductList</h1>
        <div className="flex-row">
          {
            this.state.error &&
            <p>{this.state.error.message}</p>
          }
          {
            this.state.isLoading &&
            <p>...loading</p>
          }
          {
            this.state.productsList.map((item:Product) => (
              <div className="flex-item text-center" key={item.productId}>
                <div className="product__box">
                  <p className="product__type">{item.type}</p>
                  <h3 className="product__name">{item.name}</h3>
                  <img src={item.imageUrl} alt="Product lists" className="product__image" />
                  <p className="product__price">${item.price}</p>
                  <Link to="" className="product__favorite-icon"><img src={item.isFavorite ? FavoriteActiveIcon : FavoriteIcon} alt="Favorite icon " /></Link>
                  <Link to="" className="product__package-icon"><img src={item.inPackage ? PackgageActiveIcon : PackgageIcon} alt="Package icon" /></Link>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
