import {Card, Button, Form, Row, Col} from 'react-bootstrap';
import {Expense, ExpenseType, Currency} from "../models";
import { GetExpense, GetExpenseResponse } from '../server/dtos/get-expense';
import { EditExpense, EditExpenseResponse } from '../server/dtos/edit-expense';
import { Server } from '../server/server';
import React from 'react';
import { useParams } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';


class EditExpenseMVVM extends React.Component {

    private server: Server = new Server();

    private id: Number;

    public state = {
        expense: {
            id: "",
            name: "",
            group: "",
            category: Object.keys(ExpenseType)[0] as ExpenseType,
            cost: 4.5,
            currency: Object.keys(Currency)[0] as Currency,
            date: new Date()
        } as Expense
    };

    public constructor(props) {
        super(props);
        this.id = props["id"];
        this.getExpense(this.id);
    }

    private getExpense = (id) => {
        let request : GetExpense = new GetExpense();
        request["id"] = id;

        this.server.run(request).then((result: GetExpenseResponse) => {
            this.setState({
                expense: {
                    name: result.expense["name"],
                    group: result.expense["group"],
                    category: ExpenseType[result.expense["category"]],
                    cost: Number(result.expense["cost"]),
                    currency: Currency[result.expense["currency"]],
                    date: new Date(result.expense["date"])
                }
            })
        });
    }


    private editExpense = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() == true) {
            let request : EditExpense = new EditExpense();
            request["id"] = this.id;
            request["name"] = this.state.expense.name;
            request["group"] = this.state.expense.group;
            request["category"] = this.state.expense.category;
            request["cost"] = this.state.expense.cost;
            request["currency"] = this.state.expense.currency;
            console.log(request);
           
            this.server.run(request).then((response: EditExpenseResponse) => {
             
            });
        }
    }

    public render() {
        return (
            <Card body>
            <Card.Title>Edit Expense</Card.Title>
            <Card.Body>
                <Form onSubmit={this.editExpense}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Retreat" 
                            value={this.state.expense["name"]} 
                            onChange={event => this.setState({expense: {...this.state.expense, name: event.target.value }})}>

                        </Form.Control>
                            
                    
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Group</Form.Label>
                        <Form.Control 
                            required
                            type="text" 
                            placeholder="Costa Rica" 
                            value={this.state.expense["group"]} 
                            onChange={event => this.setState({expense: {...this.state.expense, group: event.target.value }})}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select 
                            value={this.state.expense["category"]} 
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
                                value={this.state.expense["cost"]} 
                                onChange={event => this.setState({expense: {...this.state.expense, cost: event.target.value }})}
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                            <Form.Label>Currency</Form.Label>
                            <Form.Select
                                value={this.state.expense["currency"]} 
                                onChange={event => this.setState({expense: {...this.state.expense, currency: event.target.value }})}>
                                {Object.keys(Currency).map(key => (<option key={key} value={key}>{Currency[key]}</option>))}
                            </Form.Select>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">Edit</Button>
                </Form>
            </Card.Body>
        </Card>
        );
    }
 
}

export function EditExpenseMVVMWrapper() {

    const { id } = useParams();

    return (
        <EditExpenseMVVM {...{"id": id}}></EditExpenseMVVM>
    );
}

