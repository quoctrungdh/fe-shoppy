import * as React from 'react';

interface Product {
  productId:string;
  name:string;
  price:number;
  isFavorite:boolean;
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
    price: 300,
    isFavorite: true,
    imageUrl: '../assets/images/shoes1.png',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0002",
    name: "nike-02",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0003",
    name: "nike-03",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0004",
    name: "nike-04",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0005",
    name: "nike-05",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf",
    type: "shoes"
  },
  {
    productId: "0006",
    name: "nike-06",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
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
              <div className="flex-item" key={item.productId}>
                <p className="product__type">{item.type}</p>
                <h3 className="product__name">{item.name}</h3>
                <img src="item.imageUrl" alt="" className="product__image" />
                <p className="product__price">{item.price}</p>
                <img src="{item.isFavorite ? '../assets/images/like_active_icon.png' : '../assets/images/like_icon.png'}" alt="" className="product__like-status" />
                <button type="button"><img src="../assets/images/bag_icon.png" alt="" className="product__cart-button" /></button>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
