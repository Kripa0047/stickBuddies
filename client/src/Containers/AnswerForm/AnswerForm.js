import React, { Component } from 'react';
import styles from './AnswerForm.module.css';
import Answer from '../../Components/Answer/Answer';
import axios from 'axios';

class AnswerForm extends Component {
    state = {
        questionNumber: 0,
        questions: [],
        options: [],
        answers: [],
        score: 0,
        username: null,
        givenAns: []
    }

    optionSelectHandler = (id, index) => {
        // console.log(id, index);
        let score = this.state.score;
        let answers = [...this.state.answers];
        let questionNumber = this.state.questionNumber;
        let givenAns = [...this.state.givenAns];
        givenAns.push(answers[id].answer);
        document.getElementById("op" + id + index).checked = true;
        if (index === answers[id].index) {
            document.getElementById("ta" + id + index).setAttribute("style", "background-color: #6bff77");
            score++;
        }
        else {
            document.getElementById("ta" + id + index).setAttribute("style", "background-color: #ff4e47");
            document.getElementById("ta" + id + answers[id].index).setAttribute("style", "background-color: #6bff77");
        }

        let timer = setInterval(() => {
            document.getElementById("op" + id + index).checked = false;
            document.getElementById("ta" + id + index).removeAttribute("style");
            document.getElementById("ta" + id + answers[id].index).removeAttribute("style");
            if (questionNumber < 9) {
                questionNumber++;
                this.setState({
                    questionNumber,
                    givenAns
                });
            }
            clearInterval(timer);
        }, 500);

        if (questionNumber === 9) {
            // API call will be made
            let root = this;
            console.log("SUBMITED", givenAns);
            axios.post('/invite/form/'+this.props.data.user._id+"/"+this.props.data.master._id,{answers: givenAns})
                .then(response => {
                    console.log(response.data);
                    if (response.data.getredirect) {
                        root.getRequest(response.data.getredirect);
                    }
                    else if (response.data.render) {
                        root.props.getAns(response.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(response => {
                console.log(response.data);
                if (response.data.getredirect) {
                    root.getRequest(response.data.getredirect);
                }
                else if (response.data.render) {
                    root.props.getAns(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        let username = null;
        let questions = [];
        let answers = [];
        let options = [];
        try {
            username = this.props.data.user.user;
            this.props.data.master.qa.forEach(element => {
                questions.push(element.ques);
                options.push(element.options);
                answers.push(element.ans);
            });
        }
        catch (error) {
            let root = this;
            console.log(error);
            let id = window.location.href.split("/");
            let val1;
            let val2;
            for (let i = 0; i < id.length; i++) {
                console.log(id[i]);
                if (id[i] === 'answerform') {
                    val1 = id[i + 1];
                    val2 = id[i + 2];
                    break;
                }
            }
            if (val1[val1.length - 1] === "#") {
                val1 = val1.substring(0, val1.length - 1);
            }
            if (val2[val2.length - 1] === "#") {
                val2 = val2.substring(0, val2.length - 1);
            }
            console.log(val1);
            axios.get('/invite/form/' + val1 + "/" + val2)
                .then(res => {
                    console.log(res.data);
                    if (res.data.getredirect) {
                        root.getRequest(res.data.getredirect);
                    }
                    else if (res.data.render) {
                        root.props.getAns(res.data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }

        console.log("myq : ", questions, options, answers);

        this.setState({
            username,
            questions,
            options,
            answers
        });
    }

    render() {
        console.log("ans: ", this.props);
        let questionToRender = null;
        if (this.state.questions.length !== 0) {
            questionToRender = (
                <Answer
                    index={this.state.questionNumber}
                    question={this.state.questions[this.state.questionNumber]}
                    options={this.state.options[this.state.questionNumber]}
                    onSelect={this.optionSelectHandler}
                />
            );
        }
        return (
            <div>
                <div className={styles.progress}><div style={{ width: this.state.questionNumber * 10 + "%" }} className={styles.progressBar}></div></div>
                {questionToRender}
            </div>
        );
    }
}

export default AnswerForm;