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
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0002",
    name: "nike-02",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0003",
    name: "nike-03",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0004",
    name: "nike-04",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0005",
    name: "nike-05",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  },
  {
    productId: "0006",
    name: "nike-06",
    price: 300,
    isFavorite: true,
    imageUrl: '',
    sizes: ["42", "43", "44", "45"],
    colors: ["red", "gray", "pink", "black"],
    description: "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
  }
]

export default function ProductList() {
  return (
    <div>
      <h1>ProductList</h1>
      <div className="flex-row">
        {
          productList.map((item:Product) => (
            <div className="flex-item">
            </div>
          ))
        }
      </div>
    </div>
  )
}
