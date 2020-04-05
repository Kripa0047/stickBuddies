import React from 'react';
import styles from './Answer.module.css';

const answer = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Question {props.question.id+1}</div>
            <textarea className={styles.questionField} readOnly={true} value={props.question.ques}/>

            <form className={styles.optionsContainer}>

                {
                    props.options.options.map((option, index) => {
                        return (
                            <div key={index} className={styles.option} onClick={()=>props.onSelect(props.question.id, index)}>
                                <span className={styles.radioBox}><input type="radio" id={"op"+props.question.id+index} /></span>
                                <div className={styles.textField}>
                                    <textarea id={"ta"+props.question.id+index} type="text" placeholder="Option!!" readOnly={true} value={option.option} />
                                </div>
                            </div>
                        )
                    })
                }

            </form>
        </div>
    );
}

export default answer;