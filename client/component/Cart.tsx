import * as React from 'react';
import cart       from '../routes/Services/cart.tsx'

class Cart extends React.Component {
    state = {
        totalItem: []
    }

    componentDidMount() {
        cart.addListener(this.updateCart);
    }

    componentWillUnmount() {
        cart.removeListener(this.updateCart);
    }

    updateCart = () => {
        const totalItem = cart.getItems();
        this.setState({
            totalItem
        });
    }

    render() {
        const { totalItem } = this.state;
        let   lengthCart    = 0;

        const items = totalItem.map((item, index) => {
            return <li className="item" key={index}><a href="#">{item.sku} - {item.size} - {item.quantity}</a></li>
        });

        totalItem.forEach(item => {
            lengthCart += item.quantity;
        });
        
        return (
            <div className='cart'>
                <span>Cart {lengthCart}</span>
                <ul>
                    {items}
                </ul>
            </div>
        )
    }
}

export default Cart;