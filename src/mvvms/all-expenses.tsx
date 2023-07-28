import {Component} from 'react';
import { Link } from "react-router-dom";
import {Card, Table, Button, Form } from 'react-bootstrap';
import { Server } from '../server/server';
import { DeleteExpense, DeleteExpenseResponse } from '../server/dtos/delete-expense';
import { AllExpenses, AllExpensesResponse } from '../server/dtos/all-expenses';
import eventBus from "../utils/eventbus";
import { Expense, ExpenseType, Currency } from "../models";
import listSort from "../utils/listsort";

export class AllExpensesMVVM extends Component {

    server = new Server();

    public state = {
        sort: {
            name: "Sort",
            group: "Sort"
        },
        filter: {
            category: "All"
        },
        expenses: []
    }

    public constructor(props) {
        super(props);
        this.allExpenses();
    }

    public componentDidMount = () => eventBus.on("refreshAllExpenses", () => this.allExpenses())
    
    public componentWillUnmount = () => eventBus.remove("refreshAllExpenses", {})

    public deleteExpense = (id) => {
        let request: DeleteExpense = new DeleteExpense();
        request["id"] = id;
        this.server.run(request).then((response: DeleteExpenseResponse) => {
            this.allExpenses();
        })
    }

    public allExpenses = () => {
        let request : AllExpenses = new AllExpenses();
        request["category"] = this.state.filter.category;
        this.server.run(request).then((result: AllExpensesResponse) => {
            console.log(result);
            this.setState({expenses: result.expenses, sort: {...this.state.sort}, filter: {...this.state.filter}});
        });
    }

    public filterByCategory = (event) => {
        let category = event.target.value;
        this.setState({expenses: this.state.expenses, sort: {...this.state.sort}, filter: {category: category}}, this.allExpenses);
        console.log(category);
    }

    public sortByName = (event) => {
        console.log( event.target.value);
        let expenses = listSort.sortByString(this.state.expenses, "name", event.target.value == "Ascending"? true : false);
        console.log(expenses);
        this.setState({expenses: [...expenses], sort: {name: event.target.value, group: this.state.sort.group}, filter: {...this.state.filter}});
    }

    public sortByGroup = (event) => {
        console.log( event.target.value);
        let expenses = listSort.sortByString(this.state.expenses, "group", event.target.value == "Ascending"? true : false);
        this.setState({expenses: expenses, sort: {group: event.target.value, name: this.state.sort.name}, filter: {...this.state.filter}});

    }

    public render() {

        return (
            <Card body>
                <Card.Title>Expenses</Card.Title>
                <Card.Body>
                    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Group </th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>
                                <Form.Select 
                                    value={this.state.sort.name} 
                                    onChange={this.sortByName}>
                                    <option key="Sort" value="Sort">Sort</option>
                                    <option key="Ascending" value="Ascending">Ascending</option>
                                    <option key="Descending" value="Descending">Descending</option>
                                    
                                </Form.Select>
                            </th>
                            <th>
                                <Form.Select 
                                    value={this.state.sort.group} 
                                    onChange={this.sortByGroup}>
                                    <option key="Sort" value="Sort">Sort</option>
                                    <option key="Ascending" value="Ascending">Ascending</option>
                                    <option key="Descending" value="Descending">Descending</option>
                                    
                                </Form.Select>
                            </th>
                            <th>
                                <Form.Select 
                                    value={this.state.filter.category} 
                                    onChange={this.filterByCategory}>
                                    <option key="All" value="All">All</option>
                                    {Object.keys(ExpenseType).map(key => (<option key={key} value={key}>{ExpenseType[key]}</option>))}
                                </Form.Select>
                            </th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </tbody>
                    <tbody>
                        {
                            this.state.expenses.map((expense: Expense) => {
                                    expense["key"] = expense["id"];
                                    return (
                                        <tr>
                                            <th>{expense.group}</th>
                                            <th>{expense.name}</th>
                                            <th>{expense.category}</th>
                                            <th>
                                                {expense.cost} {expense.currency}
                                                <Card style={{ padding: '6px', width: '20em' }}>
                                                    {
                                                        "Convertions: " + expense.rates.join(", ")
                                                    }   
                                                </Card>
                                            </th>
                                            <th>{String(expense.date)}</th>
                                            <th>
                                            <Link to={{pathname: `/edit/${ expense.id }`}}><Button variant="secondary">Edit</Button></Link>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => this.deleteExpense(expense.id)}>Delete</Button>
                                        </th>
                                    </tr>
                                    )
                                }
                            )
                        }
                    </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}