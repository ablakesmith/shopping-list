import "./App.css";
import "./index.css";
import React, { useState, useEffect } from "react";
import ShoppingForm from "./Components/ShoppingForm/ShoppingForm";
import ShoppingList from "./Components/ShoppingList/ShoppingList";

function App() {
    const [shoppingList, setShoppingList] = useState([]);

    function loadData() {
        fetch("https://9zdppw-8080.csb.app/api/list")
            .then((response) => response.json())
            .then((data) => setShoppingList(data))
            .catch((error) => console.log("Error loading data:", error));
    }

    useEffect(() => {
        loadData();
    }, []);

    function addItem(item, quantity) {
        fetch("https://9zdppw-8080.csb.app/api/list/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ item, quantity }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Item added:", data);
                loadData();
            })
            .catch((error) => console.log("Error adding item:", error));
    }


    function deleteItem(id) {
        fetch(`https://9zdppw-8080.csb.app/api/list/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Item deleted:", data);
                loadData();
            })
            .catch((error) => console.log("Error deleting item:", error));
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Shopping List</h1>
            </header>
            <main>
                <ShoppingForm addItem={addItem} />
                <ShoppingList items={shoppingList} deleteItem={deleteItem} />
            </main>
        </div>
    );
}

export default App;
