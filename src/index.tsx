import { createRoot } from 'react-dom/client';
import {Component} from 'react';
import {HashRouter, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {Container, Card, Button} from 'react-bootstrap';
import { NewExpenseMVVM } from './mvvms/new-expense';
import { EditExpenseMVVMWrapper } from './mvvms/edit-expenses';
import { AllExpensesMVVM } from './mvvms/all-expenses';



class App extends Component {

    public constructor(props) {
        super(props);
    }

	render() {
        return (
            <Container fluid>
                <p className="title">Expenses - CRUD App Demo</p>
                <HashRouter>
                    <Switch>
                        <Route exact path="/">
                            <AllExpensesMVVM {...this.state} />
                            <br></br>
                            <NewExpenseMVVM></NewExpenseMVVM>
                        </Route>
                        <Route path="/edit/:id" >
                            <Card body>
                                <Link to='/'><Button variant="secondary">Back</Button></Link>
                            </Card>
                            <br></br>
                            <EditExpenseMVVMWrapper></EditExpenseMVVMWrapper>
                        </Route>
                    </Switch>
                </HashRouter>
            </Container>
        );
  }
}

createRoot(document.getElementById('root') as Element).render(<App />);


