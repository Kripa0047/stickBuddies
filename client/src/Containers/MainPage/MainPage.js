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
    state = {
        user: '',
        link: ''
    }
    renderPage = (pageName) => {
        if(pageName === "form page"){
            history.push('/questionsForm/'+this.state.user);
        }
        if(pageName === "share page"){
            history.push('/dashboard/'+this.state.user);
        }
    }

    getUser = (data) => {
        // console.log(user);
        let root = this;
        this.setState({
            user: data.user
        }, function() {
            root.renderPage(data.render);
        });
    }

    getForm = (data) => {
        let root = this;
        this.setState({
            link: 'demo'
        }, function() {
            root.renderPage(data.render);
        })
    }

    render() {
        return (
            <div>
                <div id="phoneContent">
                    <Navbar />
                    <Router history={history}>
                        {/* exact path="/props-through-component" component={() => <PropsPage title={`Props through component`} />} /> */}
                        <Route exact path='/' component={() => <Login getUser={this.getUser} />} />
                        <Route exact path='/questionsForm/:id' component={() => <QuestionsForm user={this.state.user} getForm={this.getForm} />} />
                        <Route path='/answerForm' exact component={AnswerForm} />
                        <Route path='/dashboard/:id' exact component={Dashboard} />
                        <Route path='/yourScore' exact component={YourScore} />
                    </Router>
                </div>
                <div id="restContent">Oppsee, only for mobile devices!!!</div>
            </div>
        );
    }
}

export default MainPage;