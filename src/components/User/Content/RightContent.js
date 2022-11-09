import { useRef } from "react";
import CountDown from "./CountDown";

const RightContent = ({ dataQuiz, handleFinishQuiz, setIndex }) => {
  const onTimeUp = () => {
    handleFinishQuiz();
  };
  const refDiv = useRef([]);
  const getClassQuestion = (index, question) => {
    // console.log(question);
    //check answer
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((item) => item.isSelected === true);
      if (isAnswer) {
        return "question selected";
      }
    }
    return "question";
  };
  const handleClickQuestion = (index, question) => {
    setIndex(index);

    if (refDiv.current) {
      console.log(refDiv.current);
      refDiv.current.forEach((item) => {
        if (item && item.className === "question clicked") {
          item.className = `question `;
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswer = question.answers.find((item) => item.isSelected === true);
      if (isAnswer) {
        return;
      }
    }
    refDiv.current[index].className = "question clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CountDown onTimeUp={onTimeUp} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                key={`question-${index}`}
                className={getClassQuestion(index, item)}
                onClick={() => handleClickQuestion(index, item)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};
export default RightContent;
