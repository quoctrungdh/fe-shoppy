import * as React from 'react';

interface Item {
    color   : string,
    size    : string,
    quantity: number,
    price   : number,
}

function Cart() {
    let   items:Item[] = [];
    const listener:any = [];

    function addListener(l:any) {
        listener.push(l);
    }

    function removeListener(l:any) {
        listener.filter((listener:any) => listener === l);
    }

    function notify() {
        listener.forEach((l:any) => {
            l();
        });
    }

    function addToCart(item:Item) {
        const itemToAdd = {
            ...item,
            quantity: 1
        }

        const itemIsFound = items.find((elm:Item) => (elm.color === item.color && elm.size === item.size))
        if(itemIsFound) {
            itemIsFound.quantity = itemIsFound.quantity + 1;
        } else {
            items.push(itemToAdd);
        }
        notify();
    }

    function getItems() {
        return items;
    }

    function removeItem(item:Item) {
        items = items.filter(elm => (
            elm.size !== item.size || elm.color !== item.color
        ));
        notify();
    }

    return {
        addListener,
        removeListener,
        getItems,
        addToCart,
        removeItem,
    }
}

const cart = new Cart();
export default cart;