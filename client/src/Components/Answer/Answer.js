import React from 'react';
import styles from './Answer.module.css';

const answer = (props) => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>Question {props.index + 1}</div>
            <textarea className={styles.questionField} readOnly={true} value={props.question} />

            <form className={styles.optionsContainer}>

                {
                    props.options.map((option, index) => {
                        return (
                            <div key={index} className={styles.option} onClick={() => props.onSelect(props.index, index)}>
                                <span className={styles.radioBox}><input type="radio" id={"op" + props.index + index} /></span>
                                <div className={styles.textField}>
                                    <textarea id={"ta" + props.index + index} type="text" placeholder="Option!!" readOnly={true} value={option.option}
                                        style={props.selectedAns ? props.correctAns === option.option ? { backgroundColor: "green" } : null : null}
                                        className={props.selectedAns ? props.selectedAns === option.option ? styles.bgRed : null : null}
                                    />
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