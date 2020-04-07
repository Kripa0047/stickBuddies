import React, { Component } from 'react';
import styles from './YourScore.module.css';
import axios from 'axios';

class YourScore extends Component {
    state = {
        score: 5,
        mastername: "",
        friendtype: ''
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(response => {
                // console.log(response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect);
                }
                else if (response.data.render) {
                    root.props.getScore(response.data);
                }
            })
            .catch(error => {
                // console.log(error);
            });
    }

    componentDidMount() {
        // console.log("Mup: ", this.props.data);
        let mastername = null;
        let score = null;
        let friendtype = '';
        try {
            mastername = this.props.data.master.username;
            score = this.props.data.invite.score;
            friendtype = this.props.data.invite.friendtype;
        }
        catch (error) {
            let root = this;
            // console.log(error);
            let id = window.location.href.split("/");
            let val1;
            let val2;
            let val3;
            for (let i = 0; i < id.length; i++) {
                // console.log(id[i]);
                if (id[i] === 'yourScore') {
                    val1 = id[i + 1];
                    val2 = id[i + 2];
                    val3 = id[i + 3];
                    break;
                }
            }
            if (val1[val1.length - 1] === "#") {
                val1 = val1.substring(0, val1.length - 1);
            }
            if (val2[val2.length - 1] === "#") {
                val2 = val2.substring(0, val2.length - 1);
            }
            if (val3[val3.length - 1] === "#") {
                val3 = val3.substring(0, val3.length - 1);
            }
            // console.log(val1);
            axios.get('/invite/results/' + val1 + "/" + val2 + "/" + val3)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                    else if (res.data.render) {
                        root.props.getScore(res.data);
                    }
                })
                .catch(error => {
                    // console.log(error);
                });
        }

        this.setState({
            mastername,
            score,
            friendtype
        });
    }

    render() {
        return (
            <div>
                <div>
                    <div className={styles.friendHeader}>You are {this.state.mastername}'s</div>
                    <div className={styles.friendtype}>{this.state.friendtype}</div>
                    <div className={styles.resultQuiz}>Excellent, you have scored {this.state.score} in the quiz about {this.state.mastername}</div>

                    <div className={styles.meterContainer}>
                        <div className={styles.dial}>
                            <ul className={styles.meter}>
                                <li className={styles.low}></li>
                                <li className={styles.medium}></li>
                                <li className={styles.high}></li>
                            </ul>
                            <div className={styles.dialInfo}>
                                <div className={styles.inner} style={{ transform: "rotate(" + (this.state.score * 17.3) + "deg)" }}>
                                    <div className={styles.arrow}></div>
                                </div>
                                <div className={styles.per}>{this.state.score * 10}%</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.inviteText}>Now, it's your turn. Create your own quiz and send it to your friends</div>
                    <div className={styles.inviteLink} onClick={() => { this.getRequest('/user/form/' + this.props.data.user._id) }}>Create Your Quiz</div>
                    <div className={styles.scoreResultOf}>Scoreboard of {this.state.mastername}</div>
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
                            this.props.data.invites
                                ?
                                this.props.data.invites.map((friend, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{friend.friendname}</td>
                                            <td>{friend.score}/10</td>
                                        </tr>
                                    )
                                })
                                :
                                null
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}

export default YourScore;