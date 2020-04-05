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
        if(pageName === "login"){
            history.push('/');
        }
        if(pageName === "form page"){
            history.push('/questionsform/'+this.state.user.user._id);
        }
        if(pageName === "share page"){
            history.push('/dashboard/'+this.state.user.user._id);
        }
    }

    getUser = (data) => {
        // console.log(data);
        let root = this;
        this.setState({
            user: data
        }, function() {
            root.renderPage(data.render);
        });
    }

    getForm = (data) => {
        // console.log(data);
        let root = this;
        this.setState({
            user: data
        }, function() {
            root.renderPage(data.render);
        })
        // console.log(data);
    }

    render() {
        return (
            <div>
                <div id="phoneContent">
                    <Navbar />
                    <Router history={history}>
                        {/* exact path="/props-through-component" component={() => <PropsPage title={`Props through component`} />} /> */}
                        <Route exact path='/' component={() => <Login getUser={this.getUser} />} />
                        <Route exact path='/questionsform/:id' component={() => <QuestionsForm user={this.state.user} getForm={this.getForm} />} />
                        <Route path='/answerform' exact component={AnswerForm} />
                        <Route exact path='/dashboard/:id' component={() => <Dashboard user={this.state.user} />} />
                        <Route path='/yourScore' exact component={YourScore} />
                    </Router>
                </div>
                <div id="restContent">Oppsee, only for mobile devices!!!</div>
            </div>
        );
    }
}

export default MainPage;