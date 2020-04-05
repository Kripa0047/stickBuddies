import React, { Component } from 'react';
import styles from './Dashboard.module.css';
// importing icons
import whatsAppIcon from '../../asserts/icons/whatsapp-brands.svg';
import instagramIcon from '../../asserts/icons/instagram-brands.svg';

class Dashboard extends Component {
    state = {
        link: "dummy/link",
        copyStatus: false
    }

    textCopyHandler = () => {
        let link = this.state.link;
        const el = document.createElement('textarea');
        el.value = link;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        this.setState({
            copyStatus: true
        })
    }

    render() {
        return (
            <div>
                <div className={styles.headerName}>Kripa</div>
                <div className={styles.quizStatus}>Your Quiz is Ready!</div>
                <div>Now share your quiz-link with your friends!</div>
                <div>They will try to guess your answers & get a score out of 10.</div>
                <div className={styles.link}>{this.state.link}</div>
                <div className={styles.copied} style={this.state.copyStatus ? { color: "#b81500" } : null}>Link Copied!!!</div>
                <div onClick={this.textCopyHandler} className={styles.copyLink}>Copy Link</div>

                <div>
                    <div onClick={() => window.open("https://www.facebook.com", '_blank')} className={styles.col} style={{ backgroundColor: "#00b54b" }}><img className={styles.icon} src={whatsAppIcon} alt="icon" height="30" /> Share</div>
                    <div onClick={() => window.open("https://www.snapchat.com", '_blank')} className={styles.col} style={{ backgroundColor: "#00b54b" }}><img className={styles.icon} src={whatsAppIcon} alt="icon" height="30" /> Get Status</div>
                </div>

                <div>
                    <div onClick={() => window.open("https://www.messenger.com", '_blank')} className={styles.col} style={{ backgroundImage: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}><img className={styles.icon} src={instagramIcon} alt="icon" height="30" /> Share</div>
                    <div onClick={() => window.open("https://www.twitter.com", '_blank')} className={styles.col} style={{ backgroundImage: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}><img className={styles.icon} src={instagramIcon} alt="icon" height="30" /> Set to Bio</div>
                </div>

                <div className={styles.scoreResultOf}>Scoreboard of Kripa</div>

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

                <div className={styles.noQuiz}>No one has given this quiz yet.</div>
                <div className={styles.createNew}>Delete and Create New Quiz</div>

            </div>
        );
    }
}

export default Dashboard;
