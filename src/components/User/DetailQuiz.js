import _ from "lodash";
import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { getDataQuizId, postSubmitQuiz } from "../../services/apiService";
import Question from "./Question";
import "./DetailQuiz.scss";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";
import { useTranslation, Trans } from "react-i18next";
const DetailQuiz = (props) => {
  const { t } = useTranslation();
  const [dataQuiz, setDataQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [dataModalResult, setDataModalResult] = useState({});
  const location = useLocation();
  const params = useParams();
  const quizId = params.id;
  useEffect(() => {
    fetchQuestion();
  }, [quizId]);

  const fetchQuestion = async () => {
    const res = await getDataQuizId(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (id), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }
            item.answers.isSelected = false;
            answers.push(item.answers);
          });
          answers = _.orderBy(answers, ["id"], ["asc"]);
          return { questionId: key, answers, questionDescription, image };
        })
        .value();

      setDataQuiz(data);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) {
      setIndex(index + 1);
    }
  };
  const handleCheckBox = (answerId, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);
    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );

    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });

      question.answers = b;
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };
  const handleFinishQuiz = async () => {
    // {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];
        //todo: userAnswerId
        question.answers.forEach((a) => {
          if (a.isSelected) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      //submit API
      let res = await postSubmitQuiz(payload);
      console.log("check res", res);
      if (res && res.EC == 0) {
        setIsShowModalResult(true);
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
      } else {
        alert("something wrongs...");
      }
    }
    // console.log(payload);
  };
  return (
    <>
      <Breadcrumb className="quiz-de ps-5 pt-5">
        <Breadcrumb.Item>
          <NavLink to={"/"}>Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to={"/users"}>User</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Doing Quiz</Breadcrumb.Item>
      </Breadcrumb>
      <div className="detail-quiz-container">
        <div className="left-content">
          <div className="title">
            {t("DetailQuiz.title")} {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className="quiz-body">
            <img />
          </div>
          <div className="quiz-content">
            <Question
              handleCheckBox={handleCheckBox}
              index={index}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
            />
          </div>
          <div className="footer d-flex justify-content-center gap-3">
            <button className="btn btn-secondary" onClick={() => handlePrev()}>
              {t("DetailQuiz.button_1")}
            </button>
            <button className="btn btn-primary" onClick={() => handleNext()}>
              {t("DetailQuiz.button_2")}
            </button>
            <button
              className="btn btn-warning"
              onClick={() => handleFinishQuiz()}
            >
              {t("DetailQuiz.button_3")}
            </button>
          </div>
        </div>
        <div className="right-content">
          <RightContent
            setIndex={setIndex}
            handleFinishQuiz={handleFinishQuiz}
            dataQuiz={dataQuiz}
          />
        </div>
        <ModalResult
          show={isShowModalResult}
          setShow={setIsShowModalResult}
          dataModalResult={dataModalResult}
        />
      </div>
    </>
  );
};
export default DetailQuiz;
