import "./style.scss";
import React, { useState } from "react";
import { parseMoodleAssessmentFromHTML } from "../../utilities/web-utils";
import { Assessment, AssessmentQuestionType, AssessmentQuestionMatching, AssessmentQuestionMultichoice } from "../../models/Assessment";
import { MultipleChoiceQuestion } from "../../Components/MultipleChoiceQuestion";
import { MoodleAssessment } from "../../Components/Assessment";

export const PracticeSection = () => {

  const [files, setFiles] = useState<File[]>([]);

  const [assessments, setAssessments] = useState<Assessment[]>([]);

  const processFiles = async () => {
    const results: Assessment[] = [];
    for (const file of files) {
      try {
        const assessment = await parseMoodleAssessmentFromHTML(file);
        results.push(assessment);
      } catch (error) {
        console.error(error);
        return;
      }
    }
    setAssessments(results);
  };

  return (
    <section id="practice-section">

      <h2>Practice</h2>

      <input
        type="file"
        name="files"
        multiple
        accept=".html"
        onChange={(event) => {
          const { files } = event.target;
          if (files === null) { setFiles([]); return };
          const res: File[] = [];
          for (let i = 0; i < files.length; i++) {
            res.push(files[i]);
          }
          setFiles(res);
        }}
      />


      {files != null && files.map((file) => (
        <p key={file.name}>{file.name}</p>
      ))}

      <button onClick={processFiles}>Submit</button>


      <hr />


      <div className="assessments">
        {assessments.map((ass, index) => {
          return (
            <MoodleAssessment
              id={`assessment-${index}`}
              assessment={ass}
              key={`assessment-${index}`}
            />
          )
        })}
      </div>

    </section>
  );
};
