import React, { Component } from 'react';
import styles from './Invite.module.css';
import axios from 'axios';

class Invite extends Component {
    state = {
        user: "",
        name: "",
        userName: null
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(function (response) {
                // console.log(response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect)
                }
                else if (response.data.render) {
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
            axios.post('/invite/new'+this.props.data.master._id, data)
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

    componentWillMount() {
        let username = null;
        try {
            username = this.props.data.master.username;
        }
        catch(error) {
            let root = this;
            let id = window.location.href.split("/");
            let val = '';
            for (let i = 0; i < id.length; i++) {
                if (id[i] === 'invite') {
                    val = id[i + 1];
                    break;
                }
            }
            if (val[val.length - 1] === "#") {
                val = val.substring(0, val.length - 1);
            }
            console.log("invite ", val);
            axios.get('/user/share/' + val)
                .then(res => {
                    console.log(res.data);
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                    else if (res.data.render) {
                        root.props.inviteData(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        this.setState({
            username
        });

    }

    render() {
        return (
            this.state.userName
                ?
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

                    <table className={styles.scoreTable}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.props.user.invites.lenght !== 0
                                    ?
                                    this.props.user.invites.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.friendname}</td>
                                                <td>{item.score.type}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    null
                            }

                        </tbody>
                    </table>

                    {
                        this.props.user.invites.lenght === 0
                            ?
                            <div className={styles.noQuiz}>No one has given this quiz yet.</div>
                            :
                            null
                    }
                </div>
                :
                null
        );
    }
}

export default Invite;