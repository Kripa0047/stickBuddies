import React, { Component } from 'react';
import styles from './Login.module.css';
import axios from 'axios';

class Login extends Component {
    state = {
        user: "",
        name: ""
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(function (response) {
                // console.log(response.data);
                if(response.data.getredirect){
                    root.getRequest(response.data.getredirect)
                }
                else if(response.data.render){
                    root.props.getUser(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    submitHandler = () => {
        let user = this.state.user;
        let name = this.state.name;

        if (user !== "" && name !== "") {
            // this.props.getUser(user);
            // API calls will be made here
            let data = {
                name: name,
                email: user
            }
            let root = this;
            axios.post('/user/new', data)
                .then(res => {
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.header}>StickBuddies - Best Buddy Challenge</div>
                <div className={styles.details}>
                    <div className={styles.subHeader}>Instructions</div>
                    <div className={styles.list}>
                        <ul>
                            <li>Enter your Name</li>
                            <li>Enter your Email</li>
                            <li>Answer any 10 Questions about yourself.</li>
                            <li>Your quiz-link will be ready.</li>
                            <li>Share your quiz-link with your friends.</li>
                            <li>Your friends will try to guess the right answers.</li>
                            <li>Check the score of your friends at your quiz-link!</li>
                        </ul>
                    </div>
                    <div className={styles.inputConatiner}>
                        <label>Email</label>
                        <div className={styles.inputBox}>
                            <input onChange={(e) => { this.setState({ user: e.target.value }) }}
                                className={styles.inputField} type="Email" placeholder="friends@forever.com" />
                        </div>
                    </div>
                    <div className={styles.inputConatiner}>
                        <label>Name</label>
                        <div className={styles.inputBox}>
                            <input onChange={(e) => { this.setState({ name: e.target.value }) }}
                                className={styles.inputField} type="text" placeholder="Alex" />
                        </div>
                    </div>
                    <div className={styles.button}>
                        <span onClick={this.submitHandler}>Submit</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;