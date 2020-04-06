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
// import NotFoundPage from '../../Components/NotFound/NotFound';
import Invite from '../Invite/Invite';
// history
import history from '../History/History';

class MainPage extends Component {
    state = {
        user: '',
        link: '',
        inviteData: ''
    }

    renderPage = (pageName) => {
        console.log("PAge : ", pageName);
        if(pageName === "login"){
            history.push('/');
        }
        if(pageName === "form page"){
            history.push('/questionsform/'+this.state.id);
        }
        if(pageName === "share page"){
            history.push('/dashboard/'+this.state.id);
        }
        if(pageName === "invite form"){
            history.push('/answerform/'+this.state.inviteData.master._id);
        }
        if(pageName === "invite page"){
            history.push('/invite/'+this.state.inviteData.master._id);
        }
        
    }

    getUser = (data) => {
        // console.log(data);
        let root = this;
        this.setState({
            user: data,
            id: data.user._id
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

    inviteData = (data) => {
        console.log("mainPage", data);
        let root = this;
        this.setState({
            inviteData: data
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
                        <Route exact path='/questionsform/:id' component={() => <QuestionsForm user={this.state.user} getForm={this.getForm} />} />
                        <Route exact path='/answerform/:id' component={() => <AnswerForm data={this.state.inviteData} />} />
                        <Route exact path='/dashboard/:id' component={() => <Dashboard user={this.state.user} getForm={this.getForm} />} />
                        <Route path='/yourScore' exact component={YourScore} />
                        <Route exact path='/invite/:fid'  component={() => <Invite inviteDataF={this.inviteData} data={this.state.inviteData} />} />
                    </Router>
                </div>
                <div id="restContent">Oppsee, only for mobile devices!!!</div>
            </div>
        );
    }
}

export default MainPage;