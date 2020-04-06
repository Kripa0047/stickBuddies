import React, { Component } from 'react';
import styles from './AnswerForm.module.css';
import Answer from '../../Components/Answer/Answer';

class AnswerForm extends Component {
    state = {
        questionNumber: 0,
        questions: [],
        options: [],
        answers: [],
        score: 0
    }

    componentDidMount() {
        // API Calls Will be made

        // set the state.
        let questions = [
            { ques: `Which is Kripa's favourite smartphone brand?`, id: 0 },
            { ques: `Who is Kripa's favourite superhero?`, id: 1 },
            { ques: `How many kids does Kripa want ?`, id: 2 },
            { ques: `What is Kripa's dream car?`, id: 3 },
            { ques: `What is Kripa's favourite show?`, id: 4 },
            { ques: `What is most important for Kripa ?`, id: 5 },
            { ques: `What does Kripa use the most ?`, id: 6 },
            { ques: `What type of person is Kripa ?`, id: 7 },
            { ques: `If Kripa meets a genie, what would be Kripa's wish ?`, id: 8 },
            { ques: `New question?`, id: 9 }
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
            { id: 9, options: [{ option: 'One' }] }
        ];

        let answers = [
            { index: 0, answer: 'Apple' },
            { index: 2, answer: 'Spider-Man' },
            { index: 1, answer: 'One' },
            { index: 0, answer: 'Audi' },
            { index: 0, answer: 'Prison Break' },
            { index: 0, answer: 'Money' },
            { index: 3, answer: 'Reddit' },
            { index: 2, answer: 'Calm' },
            { index: 0, answer: 'Loads of Money' },
            { index: 0, answer: 'One' },
        ]

        this.setState({
            questions,
            options,
            answers
        })
    }

    optionSelectHandler = (id, index) => {
        // console.log(id, index);
        let score = this.state.score;
        let answers = [...this.state.answers];
        let questionNumber = this.state.questionNumber;
        document.getElementById("op"+id+index).checked = true;
        if(index === answers[id].index){
            document.getElementById("ta"+id+index).setAttribute("style", "background-color: #6bff77");
            score++;
        }
        else{
            document.getElementById("ta"+id+index).setAttribute("style", "background-color: #ff4e47");
            document.getElementById("ta"+id+answers[id].index).setAttribute("style", "background-color: #6bff77");
        }

        let timer = setInterval(() => {
            document.getElementById("op"+id+index).checked = false;
            document.getElementById("ta"+id+index).removeAttribute("style");
            document.getElementById("ta"+id+answers[id].index).removeAttribute("style");
            if (questionNumber < 9) {
                questionNumber++;
                this.setState({
                    questionNumber
                });
            }
            clearInterval(timer);
        }, 500);

        if(questionNumber === 9) {
            // API call will be made
            console.log("SUBMITED");
        }
    }

    render() {
        console.log("ans: ", this.props);
        let questionToRender = null;
        if (this.state.questions.length !== 0) {
            questionToRender = (
                <Answer
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