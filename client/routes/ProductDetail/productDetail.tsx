import * as React from 'react';
import * as classNames from 'classnames';
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
}

interface IMyComponentProps {
  someDefaultValue?: string,
}

interface IMyComponentState {
  img?: string
}

class ProductDetail extends React.Component<IMyComponentProps, IMyComponentState> {
	constructor(props: IMyComponentProps) {
    super(props);
		this.state = {
			img: data.imageUrl
    }
    this.onClickTochangeColor = this.onClickTochangeColor.bind(this);
  }

  onClickTochangeColor(e: any) {
    e.preventDefault();
    this.setState({
      img: changeColorAPI.imageUrl
    });
  }

  render() {
    const favClass = classNames({
    	'favorite': true,
    	'active': data.isFavorite
      });

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
        						return <div className={`item-color ${item}`} onClick={(e) => this.onClickTochangeColor(e)} key={index}><span>{item}</span></div>
        					})
        				}
        			</Slider>
        		</div>
        	</div>

        	<div className="product-detail__description">
            {data.description}
        	</div>

        	<div>
            <button className="btn add-cart">Add To Cart</button>
        	</div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;