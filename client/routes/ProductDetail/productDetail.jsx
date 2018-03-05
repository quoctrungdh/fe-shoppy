import React, { Component } from 'react';
import classNames from 'classnames';
import Slider from 'react-slick';

const data = {
	"productId": "0001",
	"name": "nike-01",
	"price": 300,
	"isFavorite": true,
	"imageUrl": require("../../assets/imgs/shoes1.png"),
	"sizes": ["42", "43", "44", "45"],
	"colors": ["red", "gray", "pink", "black"],
	"description": "fdshksdhfkdshfsd fhdsskjjfhsdk fdhskfh fdshsfkjdjhskfbdsk dfsshfkjdjshf"
}

const changeColorAPI = {
	"imageUrl": require("../../assets/imgs/shoes1-pink.png")
}

class ProductDetail extends React.Component {
	//onClickTochangeColor
	constructor(props) {
		super(props);

		this.state = {
			img: data.imageUrl
		}
	}

  render() {
    const a = 10;
    console.log(data);
    const favClass = classNames({
    	'favorite': true,
    	'favorite active': data.isFavorite
    	});

    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      className: "product-detail-slider",
      focusOnSelect: true,
      useCSS: true,
      accessibility: true,
      arrows: true,
      centerMode: true,
      centerPadding: "10px",
    };

    const onClickTochangeColor = (e) => {
    	e.preventDefault();
	  	this.setState({
	  		img: changeColorAPI.imageUrl
	  	});
	  }

    return (
      <div>
        <div className="product-detail">
        	<div className="product-detail__info">
        		<span className="product-detail__info__name">{data.name}</span>
        		<span className={favClass}>Favorite</span>
        		<span className="product-detail__info__price">$ {data.price}</span>
        	</div>

        	<div className="product-detail__image">
        		<img src={this.state.img} alt={data.name} />
        	</div>

        	<div className="product-detail__options">
        		<div className="product-detail__options__sizes">
        			<span className="product-detail__options__title">choose size</span>
        			<Slider {...settings}>
        				{
        					data.sizes.map((item, index) => {
        						return <div className="item-size" key={index}><span>{item}</span></div>
        					})
        				}
        			</Slider>
        		</div>
        		<div className="product-detail__options__colors">
        		  <span className="product-detail__options__title">choose color</span>
        			<Slider {...settings}>
        				{
        					data.colors.map((item, index) => {
        						return <div className={`item-color ${item}`} onClick={onClickTochangeColor} key={index}><span>{item}</span></div>
        					})
        				}
        			</Slider>
        		</div>
        	</div>

        	<div className="product-detail__description">
        	</div>

        	<div className="add-cart">

        	</div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;