import React, { Component } from 'react';
// importing react-router-dom
import { Route, Router } from 'react-router-dom';
// importing pages
import Navbar from '../../Components/Navbar/Navbar';
import Login from '../Login/Login';
import QuestionsForm from '../QuestionsForm/QuestionsForm';
import AnswerForm from '../AnswerForm/AnswerForm';
import Dashboard from '../Dashboard/Dashboard';
import YourScore from '../YourScore/YourScore';
// history
import history from '../History/History';

class MainPage extends Component {
    render() {
        return (
            <div>
                <div id="phoneContent">
                    <Navbar />
                    <Router history={history}>
                        <Route path='/' exact component={Login} />
                        <Route path='/questionsForm' exact component={QuestionsForm} />
                        <Route path='/answerForm' exact component={AnswerForm} />
                        <Route path='/dashboard' exact component={Dashboard} />
                        <Route path='/yourScore' exact component={YourScore} />
                    </Router>
                </div>
                <div id="restContent">Oppsee, only for mobile devices!!!</div>
            </div>
        );
    }
}

export default MainPage;