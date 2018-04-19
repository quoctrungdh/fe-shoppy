import * as React from 'react';
import authenService from '../authenService';
import Slider          from 'react-slick';
import { Link } from 'react-router-dom';
import Agent from '../agent';

import * as defaultImge from '../assets/images/avatar.png';
import agent from '../agent'

const data = [
	{
		productId: "PD0001",
		name: "Nike-001",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "69$"
	},
	{
		productId: "PD0002",
		name: "Nike-002",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "21$"
	},
	{
		productId: "PD0003",
		name: "Nike-003",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "19$"
	},
	{
		productId: "PD0004",
		name: "Nike-004",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "43$"
	},
	{
		productId: "PD0005",
		name: "Nike-005",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "73$"
	},
	{
		productId: "PD0006",
		name: "Nike-006",
		imageUrl: require("../assets/images/shoes1.png"),
		price: "96$"
	},
]

const sliderSettings = {
	dots: true,
	infinite: true,
	speed: 500,
	slidesToShow: 3,
	slidesToScroll: 1,
	centerMode: true,
	arrows: false,
	centerPadding: '0px',
	responsive: [
		{
			breakpoint: 768,
			settings: {
				slidesToShow: 2,
				centerMode: false,
				slidesToScroll: 2,
			}
		},
		{
			breakpoint: 480,
			settings: {
				slidesToShow: 1,
				centerMode: false,
				slidesToScroll: 1,
			}
		}
	]
}

class UserProfile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			profilePicture: '',
			username: '',
			phone: '',
			address: ''
		}
	}

	componentDidMount() {
		const token = authenService.getUserInfo();
		Agent.Auth
			.getUser(token)
			.then(res => {
				return this.setState({
					username: res.username,
					profilePicture: res.profilePicture
				})
			});
	}

	render() {
		const { profilePicture, username, phone, address } = this.state;

		return (
			<div className="user-profile">
				<div>
					<Link className="edit-icon" to="/user-profile/edit"></Link>
				</div>
				<div>
					{profilePicture ? <img className="user-image" src={profilePicture} /> : <img className="user-image" src={defaultImge} />}
					<div className="username">{username}</div>
					<div className="phone">{phone}</div>
					<div className="address">{address}</div>
				</div>
				<p className="wishlist-title">Wish list</p>
				<Slider {...sliderSettings}>
					{data.map((item) => {
						return (
							<div key={item.productId} className="wishlist-item">
								<span className="prod-name">{item.name}</span>
								<img src={item.imageUrl} className="prod-image" />
								<span className="prod-price">{item.price}</span>
							</div>
						)
					})}
				</Slider>
			</div>
		)
	}
}

export default UserProfile;
