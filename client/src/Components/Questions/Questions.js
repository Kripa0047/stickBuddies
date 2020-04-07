import React from 'react';
import styles from './Questions.module.css';

const questions = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Question {props.question.id + 1}</div>
            <textarea onChange={(e) => props.questionOnChange(e.target.value, props.question.id)}
                className={styles.questionField} placeholder="Ask a Question!!!" value={props.question.ques}></textarea>
            <div className={styles.suggestionBox}>
                <div className={styles.clickBox} onClick={() => document.getElementById("sugst" + props.question.id).classList.toggle(styles.displayYes)}>
                    Load more suggestions <span className={styles.downArrow}></span>
                </div>
                <div className={styles.suggestions} id={"sugst" + props.question.id}>
                    {
                        props.suggestions.map((suggestion, index) => {
                            return (
                                <div key={index} onClick={() => { props.onSelect(index, props.question.id, "sugst" + props.question.id, styles.displayYes) }}>{suggestion.ques}</div>
                            )
                        })
                    }
                </div>
            </div>

            <form className={styles.optionsContainer}>

                {
                    props.options.options.map((option, index) => {
                        return (
                            <div key={index} className={styles.option}>
                                <span className={styles.radioBox}><input onClick={() => props.onAnswer(props.options.id, index)} type="radio" name="option" /></span>
                                <div className={styles.textField}>
                                    <textarea id={"ta"+ props.question.id + index} onChange={(e) => props.onOptionChange(e.target.value, props.options.id, index)} type="text" placeholder="Option!!" value={option.option} />
                                </div>
                                <div className={styles.cancel} onClick={() => props.onDelete(props.options.id, index)}>x</div>
                            </div>
                        )
                    })
                }

            </form>

            <div className={styles.addOption} onClick={() => props.addOption(props.question.id)}>Add an option</div>
        </div>
    );
}

export default questions;