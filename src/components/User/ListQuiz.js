import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getQuizByUser } from "../../services/apiService";
import "./ListQuiz.scss";
import { useTranslation, Trans } from "react-i18next";
const ListQuiz = (props) => {
  const { t } = useTranslation();

  const [arrQuiz, setArrQuiz] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getQuizData();
  }, []);
  const getQuizData = async () => {
    const res = await getQuizByUser();
    if (res && res.EC == 0) {
      setArrQuiz(res.DT);
    }
  };
  return (
    <div className="list-quiz-container container">
      {arrQuiz &&
        arrQuiz.length > 0 &&
        arrQuiz.map((quiz, index) => {
          return (
            <div
              key={`${index}-quiz`}
              className="card"
              style={{ width: "15rem" }}
            >
              <img
                className="card-img-top"
                src={`data:image/jpeg;base64, ${quiz.image}`}
                alt="Card image cap"
              />
              <div className="card-title">
                {t("Listquiz.quiz")} {index + 1}
              </div>
              <div className="card-body">
                <p className="card-text">{quiz.description}</p>
                <button
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, {
                      state: { quizTitle: quiz.description },
                    })
                  }
                  href="#"
                  className="btn btn-primary"
                >
                  {t("Listquiz.button")}
                </button>
              </div>
            </div>
          );
        })}
      {arrQuiz && arrQuiz.length === 0 && <div>{t("Listquiz.title")}</div>}
    </div>
  );
};
export default ListQuiz;
