import React, { Component } from 'react';
import styles from './Invite.module.css';
import axios from 'axios';

class Invite extends Component {
    state = {
        user: "",
        name: "",
        username: null,
        invites: []
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(function (response) {
                console.log("my data res ", response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect)
                }
                else if (response.data.render) {
                    root.props.inviteDataF(response.data);
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
            axios.post('/invite/new/' + this.props.data.master._id, data)
                .then(res => {
                    console.log("my res: ", res.data);
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                    else if (res.data.render) {
                        root.props.inviteDataF(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    componentDidMount() {
        console.log("inite props ", this.props.data);
        let username = null;
        let root = this;
        let invites = [];
        try {
            username = this.props.data.master.username;
            invites = [...this.props.data.invites];
        }
        catch (error) {

            if (root.props.data.render === "invite form") {
                console.log("nothind");
            }

            else {

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
                axios.get('/invite/' + val)
                    .then(res => {
                        console.log("invire : res :", res.data);
                        if (res.data.render) {
                            root.props.inviteDataF(res.data);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }

        this.setState({
            username,
            invites
        });

    }

    render() {
        return (
            this.state.username
                ?
                <div className={styles.container}>
                    <div className={styles.header}>StickBuddies - Best Buddy Challenge</div>
                    <div className={styles.details}>
                        <div className={styles.subHeader}>Instructions</div>
                        <div className={styles.list}>
                            <ul>
                                <li>Enter your Name</li>
                                <li>Answer the questions about your friend. (Dont't cheat :p)</li>
                                <li>Check your score at scoreboard.</li>
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

                        <div>Scoreboard of {this.state.username}</div>
                        <table className={styles.scoreTable}>
                            <thead className={styles.tableHead}>
                                <tr>
                                    <th>Name</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    this.state.invites.length !== 0
                                        ?
                                        this.props.data.invites.map((item) => {
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
                            this.state.invites.length === 0
                                ?
                                <div className={styles.noQuiz}>No one has given this quiz yet.</div>
                                :
                                null
                        }
                    </div>
                </div>
                :
                <div>boom</div>
        );
    }
}

export default Invite;