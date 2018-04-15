import * as React from 'react';

function Cart() {
    const items = [];
    const listener = [];

    function addListener(l) {
        listener.push(l);
    }

    function removeListener(l) {
        listener.filter(listener => listener === l);
    }

    function notify() {
        listener.forEach(l => {
            l();
        });
    }

    function addToCart(item) {
        let isFound = false;
        if (items.length > 0) {
            items.forEach(elm => {
                if (elm.sku === item.sku && elm.size === item.size) {
                    elm.quantity = elm.quantity + 1;
                    isFound = true;
                    return;
                }
            });      
            if(!isFound) {
                items.push(item);  
            }
        } else {
            items.push(item); 
        }
        notify();
    }

    function getItems() {
        return items;
    }

    return {
        addListener,
        removeListener,
        getItems,
        addToCart        
    }
}

const cart = new Cart();
export default cart;