import "./style.scss";
import React from "react";

import { Assessment, AssessmentQuestionType, AssessmentQuestionMatching, AssessmentQuestionMultichoice } from "../../models/Assessment";
import { MultipleChoiceQuestion } from "../MultipleChoiceQuestion";
import { MatchingQuestion } from "../MatchingQuestion";

interface Props {
  id: string;
  assessment: Assessment;
}

export const MoodleAssessment = (props: Props) => {

  const {
    id,
    assessment,
  } = props;

  return (
    <div className="assessment">
      <p className="title">{assessment.title}</p>
      {assessment.questions.map((question, index) => {
        switch (question.type) {
          case AssessmentQuestionType.Matching: {
            const matchingQuestion = question as AssessmentQuestionMatching;
            return <MatchingQuestion question={matchingQuestion} id={`${id}-question-${index}`} key={`${id}-question-${index}`} />
          }
          case AssessmentQuestionType.Multichoice: {
            const multichoiceQuestion = question as AssessmentQuestionMultichoice;
            return <MultipleChoiceQuestion question={multichoiceQuestion} id={`${id}-question-${index}`} key={`${id}-question-${index}`} />
          }
        }
      })}
    </div>
  );
};
