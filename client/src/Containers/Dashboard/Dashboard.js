import React, { Component } from 'react';
import styles from './Dashboard.module.css';
// importing icons
import whatsAppIcon from '../../asserts/icons/whatsapp-brands.svg';
import twitterIcon from '../../asserts/icons/twitter-brands.svg';
import messengerIcon from '../../asserts/icons/facebook-messenger-brands.svg';
import eyeIcon from '../../asserts/icons/eye-regular.svg';
import deleteIcon from '../../asserts/icons/trash-alt-solid.svg';
import axios from 'axios';
import Answers from '../../Components/Answer/Answer';

class Dashboard extends Component {
    state = {
        link: '',
        copyStatus: false,
        selectAns: [],
        correctAns: []
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

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(response => {
                // console.log(response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect);
                }
                else if (response.data.render) {
                    this.props.getForm(response.data);
                }
            })
            .catch(error => {
                // console.log(error);
            });
    }

    postRequest = (url) => {
        let root = this;
        axios.post(url)
            .then(response => {
                // console.log(response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect);
                }
            })
            .catch(error => {
                // console.log(error);
            });
    }

    componentDidMount() {
        let link = null;
        let root = this;
        // console.log(this.props);
        try {
            link = this.props.user.user.sharelink;
        }
        catch (error) {
            // console.log(error);
            let id = window.location.href.split("/");
            let val = '';
            for (let i = 0; i < id.length; i++) {
                // console.log(id[i]);
                if (id[i] === 'dashboard') {
                    val = id[i + 1];
                    break;
                }
            }
            if (val[val.length - 1] === "#") {
                val = val.substring(0, val.length - 1);
            }
            // console.log(val);
            axios.get('/user/share/' + val)
                .then(res => {
                    // console.log(res.data);
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                    else if (res.data.render) {
                        root.props.getForm(res.data);
                    }
                })
                .catch(error => {
                    // console.log(error);
                });
        }

        this.setState({
            link
        });
    }

    onFormDelete = () => {
        let root = this;
        axios.post('/user/delete/' + this.props.user.user._id)
            .then(res => {
                if (res.data.getredirect) {
                    root.getRequest(res.data.getredirect);
                }
            })
            .catch(error => {
                // console.log(error);
            });
    }

    showResult  = (index) =>{
        // console.log(index);
        let selectAns = [...this.props.user.invites[index].ans];
        let correctAns = [...this.props.user.invites[index].correctans];
        // console.log(selectAns, correctAns);
        this.setState({
            selectAns,
            correctAns
        },function(){
            document.getElementById("popup").style.display = "block";
        });
    }

    render() {
        // console.log(this.props);
        return (
            this.state.link
                ?
                <div>
                    <div className={styles.headerName}>{this.props.user.user.username}</div>
                    <div className={styles.quizStatus}>Your Quiz is Ready!</div>
                    <div>Now share your quiz-link with your friends!</div>
                    <div>They will try to guess your answers & get a score out of 10.</div>
                    <div className={styles.link}>{this.state.link}</div>
                    <div className={styles.copied} style={this.state.copyStatus ? { color: "#b81500" } : null}>Link Copied!!!</div>
                    <div onClick={this.textCopyHandler} className={styles.copyLink}>Copy Link</div>

                    <div>
                        <div onClick={() => window.open("fb-messenger://share?link="+this.props.user.user.sharelink, '_blank')} className={styles.col} style={{ backgroundColor: "#0084FF" }}><img className={styles.icon} src={messengerIcon} alt="icon" height="30" /> Share Messenger</div>
                        <div onClick={() => window.open("whatsapp://send?text=%F0%9F%99%8B%E2%80%8D%E2%99%80 *Best Buddy Challenge 2020* %F0%9F%99%8B%E2%80%8D%E2%99%82%0A How much do you know about me? %E2%98%BA%F0%9F%A4%97%0A%F0%9F%A4%A9%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%A4%A9%0A"+this.props.user.user.sharelink)} className={styles.col} style={{ backgroundColor: "#00b54b" }}><img className={styles.icon} src={whatsAppIcon} alt="icon" height="30" /> Get Status</div>
                    </div>

                    <div>
                        <div onClick={() => window.open("https://twitter.com/share?text=%F0%9F%99%8B%E2%80%8D%E2%99%80+%2ABest+Buddy+Challenge+2020%2A+%F0%9F%99%8B%E2%80%8D%E2%99%82%0A+How+much+do+you+know+about+me%3F+%E2%98%BA%F0%9F%A4%97%0A%F0%9F%A4%A9%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%91%87%F0%9F%A4%A9&url="+this.props.user.user.sharelink+"%3Futm_source%3Dshare%26utm_medium%3Dtwitter%26utm_campaign%3Dtwitter-shares")} className={styles.col} style={{ backgroundColor: "#00acee" }}><img className={styles.icon} src={twitterIcon} alt="icon" height="30" /> twitter</div>
                    </div>

                    <div className={styles.scoreResultOf}>Scoreboard of {this.props.user.user.username}</div>

                    <table className={styles.scoreTable}>
                        <thead className={styles.tableHead}>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                                <th>View</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.props.user.invites.length !== 0
                                    ?
                                    this.props.user.invites.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.friendname}</td>
                                                <td>{item.score}</td>
                                                <td onClick={()=>this.showResult(index)}><img src={eyeIcon} alt="icon" height="15"/></td>
                                                <td onClick={() => this.postRequest('/user/delete/invite/'+item._id+"/"+this.props.user.user._id)}><img src={deleteIcon} alt="icon" height="15"/></td>
                                            </tr>
                                        )
                                    })
                                    :
                                    null
                            }

                        </tbody>
                    </table>

                    {
                        this.props.user.invites.length === 0
                            ?
                            <div className={styles.noQuiz}>No one has given this quiz yet.</div>
                            :
                            null
                    }
                    <div className={styles.createNew} onClick={this.onFormDelete}>Delete and Create New Quiz</div>
                    
                    {/* popup */}
                    <div className={styles.popupConatiner} id="popup">
                    <div onClick={()=>document.getElementById("popup").style.display = "none"} className={styles.exitPopup}>Cancel</div>
                        {
                            this.props.user.user.qa.map((question, index)=>{
                                return(
                                    <Answers
                                        key={index}
                                        index={index}
                                        question={question.ques}
                                        options={question.options}
                                        selectedAns={this.state.selectAns[index]}
                                        correctAns={this.state.correctAns[index]}
                                    />
                                )
                            })
                        }
                        <div onClick={()=>document.getElementById("popup").style.display = "none"} className={styles.exitPopup}>Exit</div>
                    </div>

                </div>
                :
                null
        );
    }
}

export default Dashboard;
