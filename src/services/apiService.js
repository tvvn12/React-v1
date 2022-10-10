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

export {
  postCreateNewUser,
  getAllUsers,
  putUpdateUser,
  deleteUsers,
  getUserWithPaginate,
  postLogin,
  postRegister,
};
