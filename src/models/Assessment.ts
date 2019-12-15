export interface Assessment {
    title: string;

    questions: AssessmentQuestion[];
}

export enum AssessmentQuestionType {
    Matching,
    Multichoice
}

export interface AssessmentQuestion {
    type: AssessmentQuestionType;
}

export interface AssessmentQuestionMatching extends AssessmentQuestion {
    questions: string[];
    choices: string[];

    answers: AssessmentQuestionMatchingAnswer[];
}

export interface AssessmentQuestionMatchingAnswer {
    key: string;
    value: string;
}

export interface AssessmentQuestionMultichoice extends AssessmentQuestion {
    question: string;
    choices: string[];
    answers: string[];
}