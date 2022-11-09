import axios from "axios";
import axiosCustom from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosCustom.post(`api/v1/participant`, data);
};

const putUpdateUser = (id, username, role, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);
  return axiosCustom.put(`api/v1/participant`, data);
};

const getAllUsers = () => {
  return axiosCustom.get("api/v1/participant/all");
};

const deleteUsers = (userId) => {
  return axiosCustom.delete(`api/v1/participant`, { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axiosCustom.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
const postLogin = (userEmail, userPassword) => {
  return axiosCustom.post(`api/v1/login`, {
    email: userEmail,
    password: userPassword,
    
  });
};
const postRegister = (email, password, username) => {
  return axiosCustom.post(`/api/v1/register`, {
    email,
    password,
    username,
  });
};
const getQuizByUser = () => {
  return axiosCustom.get("/api/v1/quiz-by-participant");
};
const getDataQuizId = (quizId) => {
  return axiosCustom.get(`/api/v1/questions-by-quiz?quizId=${quizId}`);
};
const postSubmitQuiz = (data) => {
  return axiosCustom.post(`/api/v1/quiz-submit`, { ...data });
};
const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return axiosCustom.post(`/api/v1/quiz`, data);
};

const getAllQuizForAdmin = () => {
  return axiosCustom.get(`/api/v1/quiz/all`);
};

const putQuiz = (id, description, name, type, image) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", type);
  data.append("quizImage", image);
  return axiosCustom.put(`/api/v1/quiz`, data);
};
const deleteQuiz = (quizId) => {
  // console.log(data);
  return axiosCustom.delete(`/api/v1/quiz/${quizId}`);
};
const postCreateNewQuestionForQuiz = (quizId, description, image) => {
  const data = new FormData();
  data.append("quiz_id", quizId);
  data.append("description", description);
  data.append("questionImage", image);

  return axiosCustom.post(`/api/v1/question`, data);
};
const postCreateNewAnswerForQuestion = (
  description,
  correct_answer,
  question_id
) => {
  return axiosCustom.post(`/api/v1/answer`, {
    description,
    correct_answer,
    question_id,
  });
};

const postAssignQuiz = (quizId, userId) => {
  return axiosCustom.post(`/api/v1/quiz-assign-to-user`, {
    quizId,
    userId,
  });
};
const getQuizWithQA = (quizId) => {
  return axiosCustom.get(`/api/v1/quiz-with-qa/${quizId}`);
};
const postUpsertQA = (data) => {
  console.log(data);
  return axiosCustom.post(`/api/v1/quiz-upsert-qa`, { ...data });
};
const logout = (email, refresh_token) => {
  return axiosCustom.post(`/api/v1/logout`, { email, refresh_token });
};
const getOverView = () => {
  return axiosCustom.get(`/api/v1/overview`);
};
export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUsers,
  getUserWithPaginate,
  postLogin,
  postRegister,
  getQuizByUser,
  getDataQuizId,
  postSubmitQuiz,
  postCreateNewQuiz,
  getAllQuizForAdmin,
  putQuiz,
  deleteQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  postAssignQuiz,
  getQuizWithQA,
  postUpsertQA,
  logout,
  getOverView,
};
