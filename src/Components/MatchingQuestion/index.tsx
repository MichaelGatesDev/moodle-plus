import "./style.scss";
import React from "react";

import { AssessmentQuestionMatching } from "../../models/Assessment";

interface Props {
  id: string;
  question: AssessmentQuestionMatching;
}

export const MatchingQuestion = (props: Props) => {

  const {
    id,
    question
  } = props;

  return (
    <div className="question matching">
      <table>
        <tbody>
          {props.question.questions.map((key, index) => (
            <tr key={`${id}-answer-${index}`}>
              <td>{key}</td>
              <td>
                <select>
                  {question.choices.map((value, index) => (<option value={value} key={`${id}-choice-${index}`}>{value}</option>))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
