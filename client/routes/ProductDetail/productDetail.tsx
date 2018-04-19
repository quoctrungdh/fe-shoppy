import * as React      from 'react';
import * as classNames from 'classnames';
import Slider          from 'react-slick';
import cartService     from '../../services/cart';
import agent      from '../../agent';

const settings = {
  dots          : false,
  infinite      : true,
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

interface IMyComponentProps {
  someDefaultValue?: string,
}
interface IMyComponentState {
	imageUrl?: string,
	selectedProduct: {
		productId: string,
		size     : number,
		price    : number,
		color    : string,
		name     : string,
	},
	dataProduct: {}
	isLoading  : boolean,
	isRetried  : boolean,
	totalCart  : object[],
	error      : string,
	isFavorite : boolean,
}

class ProductDetail extends React.Component<IMyComponentProps, IMyComponentState> {
	constructor(props: IMyComponentProps) {
		super(props);
		this.state = {
			isLoading : true,
			error     : '',
			totalCart : [],
			isFavorite: false,
		}
	}

	componentDidMount() {
    const productId = this.getProductId();
		agent.Product.getProductDetails(productId)
			.then((data) => {
				this.setState({
					selectedProduct: {
						productId: data.productId,
						size     : data.sizes[0],
						price    : data.price,
						color    : data.colors[0].color,
						name     : data.name,
					},
					dataProduct: data,
					imageUrl   : data.colors[0].imageUrl,
					isLoading  : false,
					isRetried  : false,
					isFavorite : data.isFavorite
				})
			})
			.catch((error:any) => {
				this.setState({
					isLoading: false,
					error: error.message,
				})
			})
  }

  getProductId = () => {
    const arr = window.location.href.split('/');
    const id = arr[arr.length-1].substring(3);
    console.log(id);
    return id;
  }

  onClickTochangeColor =(e: any) => {
    e.preventDefault();
    const colorID = e.target.innerText;
    const selectedImg = this.state.dataProduct.colors.find((item:any) => {
      return (item.color === colorID) ? item.imageUrl : '';
    });

		const { imageUrl, color } = selectedImg;
		this.setState({
			imageUrl,
			selectedProduct: {
				...this.state.selectedProduct,
				color
			}
    });
  }

	onClickToChangeSize(e: any) {
		e.preventDefault();
		this.setState({
			selectedProduct: {
				...this.state.selectedProduct,
				size: Number(e.target.innerText)
			}
		});
	}

	onloadImage () {
		return this.state.dataProduct.colors.map((item, index) => {
			const onStyle = {
				backgroundColor: `${item.color}`
			}
			return (
				<div
					className={`item-color ${item.color}`}
					onClick={(e) => this.onClickTochangeColor(e)}
					key={index}>
						<span style={onStyle}>{item.color}</span>
				</div>
			)
		})
	}

	addToCart() {
		cartService.addToCart(this.state.selectedProduct);
	}

	render() {
		const loadingClass = classNames('loading', {
				'hidden': !this.state.isLoading
		});

		const { dataProduct } = this.state;

		const isFavoriteClass = classNames('favorite', {
			active: dataProduct && dataProduct.isFavorite
		})

		return (
			<div>
				{
					this.state.isLoading &&
					<div className="loading">
						<div className="lds-ring"><div></div><div></div><div></div><div></div></div>
					</div>
				}
				{
					this.state.error &&
					<div className="retry">{this.state.error}</div>
				}
				{
					dataProduct &&
					<div className="product-detail">
						<div className="product-detail__info">
							<span className="product-detail__info__name">{this.state.dataProduct.name}</span>
							<span className={isFavoriteClass}>Favorite</span>
							<span className="product-detail__info__price">$ {this.state.dataProduct.price}</span>
						</div>

						<div className="product-detail__image">
							<img src={this.state.imageUrl} alt={this.state.dataProduct.name} />
						</div>

						<div className="product-detail__options">
							<div className="product-detail__options__sizes">
								<span className="product-detail__options__title">choose size</span>
								<Slider {...settings}>
									{
										this.state.dataProduct.sizes.map((item, index) => {
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
							{this.state.dataProduct.description}
						</div>

						<div className="text-center">
							<button onClick={() => this.addToCart()} className="btn add-cart">Add To Cart</button>
						</div>
					</div>
				}
			</div>
		);
	}
}

export default ProductDetail;
