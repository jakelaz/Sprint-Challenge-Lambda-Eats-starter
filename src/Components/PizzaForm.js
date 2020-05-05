import React, { useState, useEffect} from "react";
import * as Yup from "yup";
import { string, object } from "yup"; // for only what you need
import { Alert, Button, ButtonGroup, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import './PizzaForm.css'

const PizzaForm = props => {
    const [formState, setFormState] = useState({
        name:"",
        size:"",
        toppings:[],
        specialInstructions:""
    });
    const [errors, setErrors] = useState({
        name: "",
        size: "",
        toppings: ""
    });

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownToggle = () => setDropdownOpen(prevState => !prevState);

    const [toppings, setToppings] = useState([]);
    const onCheckboxBtnClick = (selected) => {
        const index = toppings.indexOf(selected);
        if (index < 0) {
            toppings.push(selected);
        } else {
            toppings.splice(index, 1);
        }
        setToppings([...toppings]);
        setFormState({
            ...formState,
            toppings: toppings
        });        
    }

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const handleChange = e => {
        e.persist();
        Yup
            .reach(schema, e.target.name)
            //we can then run validate using the value
            .validate(e.target.value)
            // if the validation is successful, we can clear the error message
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]: ""
                });
            })
            /* if the validation is unsuccessful, we can set the error message to the message 
            returned from yup (that we created in our schema) */
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
  
      // Wether or not our validation was successful, we will still set the state to the new value as the user is typing
            setFormState({
                ...formState,
                [e.target.name]: e.target.value
            });

    };


    let schema = Yup.object().shape({
        name: Yup
            .string()
            .min(2, "Name must be at least 2 characters long")
            .required("Name is required"),
        size: Yup
            .string()
            .required("Size is required"),
        toppings: Yup   
            .array()
            .min(4,"You must add at least 4 toppings"),
        specialInstructions: Yup
            .string(),
    });

    const handleSubmit = event => {
        event.preventDefault();    
        schema
            .isValid(formState)
            .then(function(valid) {
                props.handleSetNewPizza(formState)
            });
    };

    useEffect(() => {
        schema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);


    return (
        <div className="NewPizzaFormWrapper">
            <h2>Build Your Own Pizza</h2>

            <Form onSubmit={ handleSubmit }>
                <FormGroup>
                    <Label for="newPizzaName" className="formLabel">Pizza Name</Label>
                    <Input
                        type="text"
                        name="name"
                        id="newPizzaName"
                        placeholder="Enter a Name for Your Pizza"
                        value={formState.name}
                        onChange={handleChange}
                    />
                    {errors.name.length > 0 ? (<Alert className="error" color="danger">{errors.name}</Alert>) : null}
                </FormGroup>
                <FormGroup>  
                    <p className="formLabel" for="newPizzaSize">Pizza Size</p>  
                    <select name="size" id="newPizzaSize" onChange={handleChange}>
                        <option value='12" Round'>12" Round</option>
                        <option value='18" Round'>18" Round</option>
                        <option value='24" Round'>24" Round</option>
                        <option value='24" Square'>24" Square</option>
                    </select>
                </FormGroup>
                <FormGroup>
                    <p className="formLabel">Add Toppings (Select at least 4)</p>
                    <ButtonGroup className="toppingBtns">
                        <Button className="pepperoni" color="primary" onClick={() => onCheckboxBtnClick('Pepperoni')} active={toppings.includes('Pepperoni')}>Pepperoni</Button>
                        <Button className="dicedTomatoes" color="primary" onClick={() => onCheckboxBtnClick('Diced Tomatoes')} active={toppings.includes('Diced Tomatoes')}>Diced Tomatoes</Button>
                        <Button className="sausage" color="primary" onClick={() => onCheckboxBtnClick('Sausage')} active={toppings.includes('Sausage')}>Sausage</Button>
                        <Button className="blackOlives" color="primary" onClick={() => onCheckboxBtnClick('Black Olives')} active={toppings.includes('Black Olives')}>Black Olives</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Canadian Bacon')} active={toppings.includes('Canadian Bacon')}>Canadian Bacon</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Roasted Garlic')} active={toppings.includes('Roasted Garlic')}>Roasted Garlic</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Spicy Italian Sausage')} active={toppings.includes('Spicy Italian Sausage')}>Spicy Italian Sausage</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Artichoke Hearts')} active={toppings.includes('Artichoke Hearts')}>Artichoke Hearts</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Grilled Chicken')} active={toppings.includes('Grilled Chicken')}>Grilled Chicken</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Three Cheeses')} active={toppings.includes('Three Cheeses')}>Three Cheeses</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Onions')} active={toppings.includes('Onions')}>Onions</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Pineapple')} active={toppings.includes('Pineapple')}>Pineapple</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Green Pepper')} active={toppings.includes('Green Pepper')}>Green Pepper</Button>
                        <Button color="primary" onClick={() => onCheckboxBtnClick('Extra Cheese')} active={toppings.includes('Extra Cheese')}>Extra Cheese</Button>
                    </ButtonGroup>
                    {errors.toppings.length > 0 ? (<Alert className="error" color="danger">{errors.toppings}</Alert>) : null}
                </FormGroup>
                <FormGroup>
                    <Label for="newPizzaSpecialInstructions" className="formLabel">Special Instructions</Label>
                    <Input
                        type="text"
                        name="specialInstructions"
                        id="newPizzaSpecialInstructions"
                        placeholder="Anything else you'd like to add?"
                        value={formState.specialIntructions}
                        onChange={handleChange}
                    />
                </FormGroup>
                <Button id="addToOrderBtn" disabled={buttonDisabled} color="primary" size="lg" outline block>Add to Order</Button>
            </Form>
        </div>
    );

}



export default PizzaForm;
