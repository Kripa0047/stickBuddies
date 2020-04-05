import React, { Component } from 'react';
import styles from './YourScore.module.css';

class YourScore extends Component {
    state = {
        score: 5,
        user: "Kripa"
    }
    render() {
        return (
            <div>
                <div>
                    <div className={styles.resultQuiz}>Excellent, you have scored 0 in the quiz about Kripa</div>
                    {/* <div className="resultQuiz"></div> */}

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
                    <div className={styles.inviteLink} >Create Your Quiz</div>
                    <div className={styles.scoreResultOf}>Scoreboard of {this.state.user}</div>
                </div>
                <table className={styles.scoreTable}>
                    <thead className={styles.tableHead}>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>Jill</td>
                            <td>50</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        );
    }
}

export default YourScore;