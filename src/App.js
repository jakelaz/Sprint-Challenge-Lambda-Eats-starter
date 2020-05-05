import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import PizzaForm from './Components/PizzaForm';

import axios from 'axios';

import { Nav, NavItem, NavLink } from 'reactstrap';


const App = () => {
  const [pizzas, setPizzas] = useState([]);
  
  const handleSetNewPizza = (newPizza) =>{
    axios
      .post("https://reqres.in/api/unknown", newPizza)
      .then(res => {
        
        setPizzas([...pizzas, res.data])
        
      })
      .catch(err => console.log(err.response));    
  }

  console.log("success pizza", pizzas);

  return (
    <div className="appWrapper">
      
      <Nav>
        <NavItem>
          <NavLink href="/">Lambda Eats</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/pizza">Order Pizza</NavLink>
        </NavItem>
      </Nav>  
      <Route path="/pizza">
        <PizzaForm handleSetNewPizza={handleSetNewPizza} />
        <b id="orderData">{JSON.stringify(pizzas)}</b>
      </Route>
      <Route exact path="/">
        <h1>Welcome to Lambda Eats</h1>
      </Route>      
    </div>
  );
};
export default App;
