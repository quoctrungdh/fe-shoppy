import * as React      from 'react';
import * as classNames from 'classnames';
import Slider          from 'react-slick';
import cartService     from '../Services/cart';

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
			"sku": "sku003",
			"imageUrl": require("../../assets/imgs/shoes1.png"),
      "colorID": "M0001_ff0",
    },
    {
			"sku": "sku004",
			"imageUrl": require("../../assets/imgs/shoes1-pink.png"),
      "colorID": "M0001_000",
    },
    {
			"sku": "sku005",
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
	imageUrl?: string,
	dataAddCart: {
		productId: string,
		sku      : string,
		size     : number,
		quantity : number,
	},
	totalCart    : object[],
}

class ProductDetail extends React.Component<IMyComponentProps, IMyComponentState> {
	constructor(props: IMyComponentProps) {
    super(props);
		this.state = {
			imageUrl: data.skus[0].imageUrl,
			dataAddCart: {
				productId: data.productId,
				sku      : data.skus[0].sku,
				size     : data.sizes[0],
				quantity : 1,
			},
			totalCart: [],
		}
  }

  onClickTochangeColor =(e: any) => {
		e.preventDefault();
		const colorID = e.target.innerText;
		const selectedImg = data.skus.find((item) => {
			return (item.colorID === colorID) ? item.imageUrl : '';
		});

		const { imageUrl, sku } = selectedImg;
		this.setState({
			imageUrl,
			dataAddCart: {
				...this.state.dataAddCart,
				sku
			}
    });
  }

	onClickToChangeSize(e: any) {
		e.preventDefault();
		this.setState({
			dataAddCart: {
				...this.state.dataAddCart,
				size: Number(e.target.innerText)
			}
		});
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
				...this.state.dataAddCart,
				quantity: 1
			}
		});
		cartService.addToCart(this.state.dataAddCart);
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
        		<img src={this.state.imageUrl} alt={data.name} />
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