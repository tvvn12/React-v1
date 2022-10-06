import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const TableUser = (props) => {
  const [listUser, setListUser] = useState([]);
  const fecthListUsers = async () => {
    let res = await getAllUsers();

    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };
  useEffect(() => {
    fecthListUsers();
  }, []);
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((user, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <td>{index + 1}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUser && listUser.length === 0 && (
            <tr>
              <td colSpan={4}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
export default TableUser;
