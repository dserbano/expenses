import React from 'react';
import {Card, Button, Form, Row, Col} from 'react-bootstrap';
import {Expense, ExpenseType, Currency} from "../models";
import { Server } from '../server/server';
import { NewExpense, NewExpenseResponse } from '../server/dtos/new-expense';
import eventBus from "../utils/eventbus";


export class NewExpenseMVVM extends React.Component {

    server = new Server();

    public state = {
        expense: {
            id: "",
            name: "",
            group: "",
            category: Object.keys(ExpenseType)[0] as ExpenseType,
            cost: 4.5,
            currency: Object.keys(Currency)[0] as Currency,
            date: new Date()
        }
    };

    private newExpense = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        console.log(this.state);

        if (form.checkValidity() == true) {
            let request : NewExpense = new NewExpense();
            request["name"] = this.state.expense.name;
            request["group"] = this.state.expense.group;
            request["category"] = this.state.expense.category;
            request["cost"] = this.state.expense.cost;
            request["currency"] = this.state.expense.currency;
            console.log(request);
           
            this.server.run(request).then((response: NewExpenseResponse) => {
                eventBus.dispatch("refreshAllExpenses", {});
            });

        }
    }
    
	public render() {
        return (
            <Card body>
                <Card.Title>New Expense</Card.Title>
                <Card.Body>
                    <Form onSubmit={this.newExpense}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Retreat" 
                                value={this.state.expense.name} 
                                onChange={event => this.setState({expense: {...this.state.expense, name: event.target.value }})}>

                            </Form.Control>
                                
                        
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Group</Form.Label>
                            <Form.Control 
                                required
                                type="text" 
                                placeholder="Costa Rica" 
                                value={this.state.expense.group} 
                                onChange={event => this.setState({expense: {...this.state.expense, group: event.target.value }})}>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Category</Form.Label>
                            <Form.Select 
                                value={this.state.expense.category} 
                                onChange={event => this.setState({expense: {...this.state.expense, category: event.target.value }})}>
                                {Object.keys(ExpenseType).map(key => (<option key={key} value={key}>{ExpenseType[key]}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Row className="mb-2">
                            <Form.Group as={Col} md="10">
                                <Form.Label>Cost</Form.Label>
                                <Form.Control 
                                    required
                                    type="number" 
                                    placeholder="4.5"
                                    value={this.state.expense.cost} 
                                    onChange={event => this.setState({expense: {...this.state.expense, cost: event.target.value }})}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="2">
                                <Form.Label>Currency</Form.Label>
                                <Form.Select
                                    value={this.state.expense.currency} 
                                    onChange={event => this.setState({expense: {...this.state.expense, currency: event.target.value }})}>
                                    {Object.keys(Currency).map(key => (<option key={key} value={key}>{Currency[key]}</option>))}
                                </Form.Select>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">Add</Button>
                    </Form>
                </Card.Body>
            </Card>
        );
    }
}