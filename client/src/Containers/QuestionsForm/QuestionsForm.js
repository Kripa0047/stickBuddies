import React, { Component } from 'react';
import styles from './QuestionsForm.module.css';
// importing pages
import Questions from '../../Components/Questions/Questions';
import axios from 'axios';

class QuestionsForm extends Component {
    state = {
        user: "",
        questions: [],
        options: [],
        suggestions: [],
        answers: []
    }

    componentDidMount() {
        let user = this.props.user;
        // set the state.
        let questions = [
            { ques: `Which is ${user} favourite smartphone brand?`, id: 0 },
            { ques: `Who is ${user}'s favourite superhero?`, id: 1 },
            { ques: `How many kids does ${user} want ?`, id: 2 },
            { ques: `What is ${user}'s dream car?`, id: 3 },
            { ques: `What is ${user}'s favourite show?`, id: 4 },
            { ques: `What is most important for ${user} ?`, id: 5 },
            { ques: `What does ${user} use the most ?`, id: 6 },
            { ques: `What type of person is ${user} ?`, id: 7 },
            { ques: `If ${user} meets a genie, what would be ${user}'s wish ?`, id: 8 },
            { ques: `Add your Own Question!!!`, id: 9 }
        ];

        let options = [
            { id: 0, options: [{ option: 'Apple' }, { option: 'Nokia' }, { option: 'Oneplus' }, { option: 'Samsung' }] },
            { id: 1, options: [{ option: 'Batman' }, { option: 'Thor' }, { option: 'Spider-Man' }, { option: 'Iron Man' }, { option: 'Aquaman' }] },
            { id: 2, options: [{ option: 'None' }, { option: 'One' }, { option: 'Two' }, { option: 'Three' }, { option: 'I want to adopt kids' }] },
            { id: 3, options: [{ option: 'Audi' }, { option: 'Jaguar' }, { option: 'BMW' }, { option: 'Lamborghini' }] },
            { id: 4, options: [{ option: 'Prison Break' }, { option: 'Breaking Bad' }, { option: 'Game of Thrones' }, { option: 'Friends' }] },
            { id: 5, options: [{ option: 'Money' }, { option: 'Love' }, { option: 'Friends & Family' }, { option: 'Career' }] },
            { id: 6, options: [{ option: 'Whatsapp' }, { option: 'Facebook' }, { option: 'Instagram' }, { option: 'Reddit' }] },
            { id: 7, options: [{ option: 'Funny' }, { option: 'Cool' }, { option: 'Calm' }, { option: 'Impatient' }] },
            { id: 8, options: [{ option: 'Loads of Money' }, { option: 'Perfect life partner' }, { option: 'Perfect job' }, { option: 'A huge house' }] },
            { id: 9, options: [{ option: 'Add an option' }] }
        ];

        let suggestions = [
            { ques: `Which is ${user} favourite smartphone brand?`, id: 0 },
            { ques: `Who is ${user}'s favourite superhero?`, id: 1 },
            { ques: `How many kids does ${user} want ?`, id: 2 },
            { ques: `What is ${user}'s dream car?`, id: 3 },
            { ques: `What is ${user}'s favourite show?`, id: 4 },
            { ques: `What is most important for ${user} ?`, id: 5 },
            { ques: `What does ${user} use the most ?`, id: 6 },
            { ques: `What type of person is ${user} ?`, id: 7 },
            { ques: `If ${user} meets a genie, what would be ${user}'s wish ?`, id: 8 },
            { ques: `Add your Own Question!!!`, id: 9 }
        ];

        let answers = [
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
            { index: null, answer: null },
        ]

        this.setState({
            user,
            questions,
            options,
            suggestions,
            answers
        })
    }

    questionOnChangeHandler = (newVal, id) => {
        let questions = [...this.state.questions];
        questions[id].ques = newVal;
        this.setState({
            questions
        });
    }

    optionOnChangeHandler = (newVal, id, index) => {
        let options = [...this.state.options];
        options[id].options[index].option = newVal;
        let answers = [...this.state.answers];
        if (answers.id !== null) {
            if (index === answers[id].index) {
                answers[id].answer = newVal;
            }
        }
        this.setState({
            options,
            answers
        });
    }

    deleteOptionHandler = (id, index) => {
        let options = [...this.state.options];
        options[id].options.splice(index, 1);
        let answers = [...this.state.answers];
        if (answers.id !== null) {
            if (index === answers[id].index) {
                answers[id].answer = null;
                answers[id].index = null;
            }
        }
        this.setState({
            options,
            answers
        });
    }

    suggestionSelectHandler = (suggestionNo, questionIndex, boxID, cssClass) => {
        document.getElementById(boxID).classList.toggle(cssClass);
        let newQuestion = this.state.suggestions[suggestionNo].ques;
        let questions = [...this.state.questions];
        questions[questionIndex].ques = newQuestion;
        this.setState({
            questions
        });
    }

    onAnswerHandler = (id, index) => {
        let answer = {
            index: index,
            answer: this.state.options[id].options[index].option
        };
        let answers = [...this.state.answers];
        answers[id] = answer;
        this.setState({
            answers
        });
    }

    addOptionHandler = (id) => {
        let options = [...this.state.options];
        options[id].options.push({ option: 'Add an option' });
        this.setState({
            options
        });
    }

    getRequest = (url) => {
        let root = this;
        axios.get(url)
            .then(response => {
                if (response.data.getredirect) {
                    root = this.getRequest(response.data.getredirect);
                }
                else if(response.data.render === "share page"){
                    this.props.getForm(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    submitHandler = () => {
        let submit = true;
        let questions = [...this.state.questions];
        let options = [...this.state.options];
        let answers = [...this.state.answers];

        for (let i = 0; i < 10; i++) {
            if (answers[i].answer === null) {
                alert("Please select an answer for Question " + (i + 1));
                submit = false;
                break;
            }
        }

        if (submit) {
            let arr = [];

            for (let i = 0; i < 10; i++) {
                let val = {
                    ques: questions[i].ques,
                    answer: answers[i],
                    options: options[i].options
                }
                arr.push(val);
            }
            let data = {
                qa: arr
            }
            let root = this;
            axios.post('/user/form/' + this.state.user, data)
                .then(res => {
                    if (res.data.getredirect) {
                        root = this.getRequest(res.data.getredirect);
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
                {
                    this.state.questions.map((question, index) => {
                        return (
                            <Questions
                                key={index}
                                question={question}
                                suggestions={this.state.suggestions}
                                questionOnChange={this.questionOnChangeHandler}
                                options={this.state.options[index]}
                                onOptionChange={this.optionOnChangeHandler}
                                onDelete={this.deleteOptionHandler}
                                onSelect={this.suggestionSelectHandler}
                                onAnswer={this.onAnswerHandler}
                                addOption={this.addOptionHandler}
                            />
                        )
                    })
                }

                <div className={styles.submitButton} onClick={this.submitHandler}><span>Submit</span></div>
            </div>
        );
    }
}

export default QuestionsForm;