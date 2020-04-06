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
import Logo from '../../asserts/logo/mainLogo.png';
import Invite from '../Invite/Invite';
// history
import history from '../History/History';

class MainPage extends Component {
    state = {
        user: '',
        link: '',
        inviteData: '',
        id: ''
    }

    renderPage = (pageName) => {
        // console.log("PAge : ", pageName);
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
            history.push('/answerform/'+ this.state.inviteData.user._id +"/"+this.state.inviteData.master._id);
        }
        if(pageName === "invite page"){
            history.push('/inviteform/'+this.state.inviteData.master._id);
        }
        if(pageName === "result page"){
            history.push('/yourScore/'+this.state.inviteData.user._id +"/"+this.state.inviteData.master._id+"/"+this.state.inviteData.invite._id);
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
            user: data,
            id: data.user._id
        }, function() {
            root.renderPage(data.render);
        })
        // console.log(data);
    }

    inviteData = (data) => {
        // console.log("mainPage", data);
        let root = this;
        this.setState({
            inviteData: data,
            id: data.master._id
        }, function() {
            root.renderPage(data.render);
        })
    }

    ansData = (data) => {
        // console.log("inv dat: ", this.state.inviteData);
        let root = this;
        this.setState({
            inviteData: data
        }, function() {
            root.renderPage(data.render);
        })
    }

    scoreData = (data) => {
        let root = this;
        this.setState({
            inviteData: data,
            user: data.user,
            id: data.user._id
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
                        <Route exact path='/answerform/:id/:fid' component={() => <AnswerForm data={this.state.inviteData} getAns={this.ansData} />} />
                        <Route exact path='/dashboard/:id' component={() => <Dashboard user={this.state.user} getForm={this.getForm} />} />
                        <Route exact path='/yourScore/:id/:fid/:iid' component={() => < YourScore data={this.state.inviteData} getScore={this.scoreData} />} />
                        <Route exact path='/inviteform/:fid'  component={() => <Invite inviteDataF={this.inviteData} data={this.state.inviteData} />} />
                    </Router>
                </div>
                <div id="restContent">
                    <img src={Logo} alt="logo" style={{width:"40%"}} />
                    <div>Only for mobile devices!!!</div>
                </div>
            </div>
        );
    }
}

export default MainPage;