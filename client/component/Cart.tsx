import * as React from 'react';
import cartService from '../routes/Services/cart'
import * as classNames from 'classnames';

interface Item {
    sku     : string,
    size    : string,
    quantity: number,
    price   : number,
}

class Cart extends React.Component {
    state = {
        totalItem: [],
        isToggleOpen: false
    }

    componentDidMount() {
        cartService.addListener(this.updateCart);
    }

    componentWillUnmount() {
        cartService.removeListener(this.updateCart);
    }

    updateCart = () => {
        const totalItem = cartService.getItems();
        this.setState({
            totalItem
        });
    }

    toggleOpen = () => {
        this.setState({
            isToggleOpen: !this.state.isToggleOpen
        })
    }

    removeItem = (item:Item, e:any) => {
        e.stopPropagation();
        const totalItem = cartService.removeItem(item);
        
    }

    render() {
        const { totalItem } = this.state;
        let   lengthCart    = 0;

        const items = totalItem.map((item:Item, index) => {
            return (
                <tr className='item' key={index}>
                    <td><a href='#'>{item.sku}</a></td>
                    <td><a href='#'>{item.size}</a></td>
                    <td><a href='#'>{item.quantity}</a></td>
                    <td><a href='#'>{item.price * item.quantity}</a></td>
                    <td className='cart__remove'><span onClick={(e) => this.removeItem(item, e)}>X</span></td>
                </tr>
            )
        });

        totalItem.forEach((item:Item) => {
            lengthCart += item.quantity;
        });

        const cartClass = classNames('cart', {
            open: this.state.isToggleOpen
        })
        
        return (
            <div className={cartClass} onClick={this.toggleOpen}>
                <span className="cart__icon">
                    <span className="cart__numbers">{lengthCart}</span>
                </span>
                <div className="cart__content">
                    {
                        lengthCart > 0
                        ? <table className="cart__list">
                            <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Size</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Remove</th>
                                </tr>
                                {items}
                            </tbody>
                        </table>
                        : <span>Please go arround to choose your favourite products.</span>
                    }
                </div>
            </div>
        )
    }
}

export default Cart;
