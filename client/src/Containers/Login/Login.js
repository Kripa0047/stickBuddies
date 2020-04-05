import React, { Component } from 'react';
import styles from './Login.module.css';
import history from '../History/History';

class Login extends Component {
    state = {
        user: "",
        name: ""
    }

    submitHandler = () => {
        let user = this.state.user;
        let name = this.state.name;
        
        if(user !== "" || name !== ""){
            // API calls will be made here
            history.push("/questionsForm");
            console.log("User Details : ", user, " ", name);
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
                                className={styles.inputField} type="email" placeholder="friends@forever.com" />
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