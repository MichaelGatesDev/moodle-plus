import { parse, HTMLElement } from "node-html-parser";

import { Assessment, AssessmentQuestionMatching, AssessmentQuestionType, AssessmentQuestionMultichoice } from "../models/Assessment";

export const parseMoodleAssessmentFromHTML = async (file: File): Promise<Assessment> => {

    const content = await fetch(window.URL.createObjectURL(file)).then(response => response.text());
    const root = parse(content) as HTMLElement;

    if (root === undefined) throw new Error("Failed to parse content");

    let title = "";
    const titleElements = root.querySelectorAll("ul.breadcrumb li span a span");
    if (titleElements.length > 0) {
        const titleElement = titleElements.pop();
        if (titleElement !== undefined) {
            title = titleElement?.text;
        }
    }

    let questions = [];

    const matchNodes = root.querySelectorAll(".que.match");
    for (const qnode of matchNodes) {
        let keys: string[] = [];
        let values: string[] = [];

        const block = qnode.querySelector('.ablock');
        const rows = block.querySelectorAll('tr');
        for (const row of rows) {
            const question = row.querySelector('td.text').text;
            keys.push(question);
            let choiceNodes = row.querySelectorAll('td.control select option');
            choiceNodes = choiceNodes.splice(1, choiceNodes.length);
            values = choiceNodes.map((choice) => choice.text);
        }

        //TODO implement correct answer
        questions.push({
            type: AssessmentQuestionType.Matching,
            questions: keys,
            choices: values,
            answers: [],
        } as AssessmentQuestionMatching);
    }


    const multichoiceNodes = root.querySelectorAll(".que.multichoice");
    for (const qnode of multichoiceNodes) {
        const correct = qnode.querySelector('.state').text;
        const qtext = qnode.querySelector(".qtext").text;
        const answerNode = qnode.querySelector('.answer');
        const choiceNodes = answerNode.querySelectorAll('div');
        const correctChoiceNodes = answerNode.querySelectorAll('div.correct');

        questions.push({
            type: AssessmentQuestionType.Multichoice,
            question: qtext,
            choices: choiceNodes.map((node) => node.querySelector('label').text.replace(/[[A-Za-z]{1}\./gi, "").trim()),
            answers: correctChoiceNodes.map((node) => node.querySelector('label').text.replace(/[[A-Za-z]{1}\./gi, "").trim()),
        } as AssessmentQuestionMultichoice);
    }


    return {
        title,
        questions,
    } as Assessment;
};


