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

const getAllUsers = () => {
  return axiosCustom.get(`api/v1/participant/all`);
};
export { postCreateNewUser, getAllUsers };
