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
}

const productList = [
  {
    productId: "0001",
    name: "nike-01",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0002",
    name: "nike-02",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0003",
    name: "nike-03",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0004",
    name: "nike-04",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0005",
    name: "nike-05",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0006",
    name: "nike-06",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: [42, 43, 44, 45],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  }
]

// export default function ProductList() {
//   console.log(productList)
//   return (
//     <div>
//       <h1>ProductList</h1>
//       <div className="flex-row">
//         {
//           productList.map((item:Product) => (
//             <div className="flex-item">
//             {item.price}
//             </div>
//           ))
//         }
//       </div>
//     </div>
//   )
// }

const timeOut = 2000;

const api = {
  getProducts(url) {
    // return fetch(url, {
    //   method: 'get'
    // })
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(productList)
        // reject(new Error('Can not get products'))
      }, timeOut);
    })
  }
}

export default class ProductList extends React.Component {
  state = {
    isLoading: false,
    productsList: [],
    error: null
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    api.getProducts()
      .then(data => this.setState({ productsList: data }))
      .catch(err => this.setState({ error: err }))
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
                <h3 className="product__name">{item.name}</h3>

                {item.price}
                {item.name}
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}