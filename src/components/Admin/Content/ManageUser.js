import ModalMangeUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useState } from "react";
import TableUser from "./TableUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowCreateUser] = useState(false);
  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="user-content">
        <div className="btn-add-new">
          <button
            onClick={() => setShowCreateUser(true)}
            className="btn btn-primary"
          >
            <FcPlus /> Add new user
          </button>
        </div>
        <div className="table-user-container">
          <TableUser />
        </div>
        <ModalMangeUser
          show={showModalCreateUser}
          setShow={setShowCreateUser}
        />
      </div>
    </div>
  );
};
export default ManageUser;
