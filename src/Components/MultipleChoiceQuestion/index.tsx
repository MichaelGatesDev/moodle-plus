import "./style.scss";
import React from "react";

import { AssessmentQuestionMultichoice } from "../../models/Assessment";

interface Props {
  id: string;
  question: AssessmentQuestionMultichoice;
}

export const MultipleChoiceQuestion = (props: Props) => {

  const {
    id,
    question
  } = props;

  const reset = () => {

  };

  return (
    <div className="question multichoice" id={id}>
      <p className="title">{question.question}<span className="reset">&nbsp;<button type="reset" onClick={reset}>Reset</button></span></p>
      <ul>
        {question.choices.map((key, index) => (
          <li key={`${id}-answer-${index}`}>
            <input type="radio" name={`${id}-answer`} id={`${id}-answer-${index}`} />
            <label htmlFor={`${id}-answer-${index}`}>{key}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};
