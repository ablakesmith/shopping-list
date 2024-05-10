import React from 'react';

function ShoppingItem({ id, item, quantity, deleteItem}) {

    function handleDelete(event) {
        event.preventDefault();
        deleteItem(id);
    }

    return (
        <div className="shopping-item">
            <li>
                <span>{item} ({quantity})</span> 
                <button className="delete-button" onClick={handleDelete}>Delete</button>
            </li>
        </div>
    );
}

export default function ShoppingList({ items, deleteItem }) {

    const ItemsJsx = items.map(listItem => 
        <ShoppingItem 
            key={listItem.id} 
            id={listItem.id}
            item={listItem.item}
            quantity={listItem.quantity}
            deleteItem={deleteItem}
        />
    );

    return <ul>{ ItemsJsx }</ul>;
}
