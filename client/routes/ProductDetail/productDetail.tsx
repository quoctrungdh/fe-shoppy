import * as React from 'react';
import * as classNames from 'classnames';
import Slider from 'react-slick';

const data = {
  "productId": "PD0001",
  "name": "nike-001",
	"description": "test fdhkshf",
	"isFavorite": true,
  "price": 500,
  "sizes" : [37, 38, 39, 40],
  "skus" : [
    {
      "sku": "sku001",
      "imageUrl": require("../../assets/imgs/shoes1.png"),
      "colorID": "M0001_0f0",
    },
    {
			"sku": "sku002",
			"imageUrl": require("../../assets/imgs/shoes1-pink.png"),
      "colorID": "M0001_0ff",
    },
    {
			"sku": "sku004",
			"imageUrl": require("../../assets/imgs/shoes1.png"),
      "colorID": "M0001_ff0",
    },
    {
			"sku": "sku001",
			"imageUrl": require("../../assets/imgs/shoes1-pink.png"),
      "colorID": "M0001_000",
    },
    {
			"sku": "sku001",
			"imageUrl": require("../../assets/imgs/shoes1.png"),
      "colorID": "M0001_0f0",
    }
  ]
}

const settings = {
  dots          : false,
  infinite      : false,
  speed         : 500,
  slidesToShow  : 3,
  slidesToScroll: 1,
  className     : 'product-detail-slider',
  focusOnSelect : true,
  useCSS        : true,
  accessibility : true,
  arrows        : true,
  centerMode    : true,
  centerPadding : '8px',
}

interface ProductDetail {
	selectedColor: string,
	selectedSku  : string,
	selectedSize : number,
}

interface IMyComponentProps {
  someDefaultValue?: string,
}

interface IMyComponentState {
	img?: string,
	dataAddCart: {
		productId: string,
		sku      : string,
		size     : number,
	},
	totalCart    : object[],
}

class ProductDetail extends React.Component<IMyComponentProps, IMyComponentState> {
	constructor(props: IMyComponentProps) {
    super(props);
		this.state = {
			img: data.skus[0].imageUrl,
			dataAddCart: {
				productId: data.productId,
				sku      : data.skus[0].sku,
				size     : data.sizes[0],
			},
			totalCart: [],
		}
		// this.totalCart = [];
    this.onClickTochangeColor = this.onClickTochangeColor.bind(this);
  }

  onClickTochangeColor(e: any) {
		e.preventDefault();
		const colorID = e.target.innerText;
		const selectedImg = data.skus.filter((item) => {
			return (item.colorID === colorID) ? item.imageUrl : '';
		});
		this.setState({
			img: selectedImg[0].imageUrl,
    }, () => {
			this.state.dataAddCart.sku = selectedImg[0].sku;
		});
  }

	onClickToChangeSize(e: any) {
		e.preventDefault();
		this.state.dataAddCart.size = e.target.innerText;
	}

	getColor(colorId: string) {
		return colorId.split('_')[1];
	}

	onloadImage () {
		return data.skus.map((item, index) => {
			const onStyle = {
					backgroundColor: `#${this.getColor(item.colorID)}`
			}
			return (
				<div 
					className={`item-color ${item.colorID}`} 
					onClick={(e) => this.onClickTochangeColor(e)} 
					key={index}>
						<span style={onStyle}>{item.colorID}</span>
				</div>
			)
		})
	}

	addToCart() {
		this.setState({
			dataAddCart: {
				productId: data.productId,
				sku      : this.state.dataAddCart.sku,
				size     : this.state.dataAddCart.size,
			}
		},() => {
			const selectedSku = this.state.dataAddCart;
			console.log(selectedSku);
			this.setState({
				totalCart:this.state.totalCart.concat([selectedSku]),
				// [...this.state.totalCart, selectedSku]
			});
			// [...this.totalCart].push(selectedSku);
			console.log(this.state.totalCart);
		});

	}

  render() {
    const favClass = classNames('favorite', {
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
        						return <div className="item-size" key={index}><span onClick={(e) => this.onClickToChangeSize(e)}>{item}</span></div>
        					})
        				}
        			</Slider>
        		</div>
        		<div className="product-detail__options__colors">
        		  <span className="product-detail__options__title">choose color</span>
        			<Slider {...settings}>
        				{
        					this.onloadImage()
        				}
        			</Slider>
        		</div>
        	</div>

        	<div className="product-detail__description">
            {data.description}
        	</div>

        	<div className="text-center">
            <button onClick={() => this.addToCart()} className="btn add-cart">Add To Cart</button>
        	</div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;