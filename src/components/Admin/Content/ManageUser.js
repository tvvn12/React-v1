import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import TableUser from "./TableUser";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LITMIT_USER = 3;
  const [showModalCreateUser, setShowCreateUser] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [listUser, setListUser] = useState([]);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [dataView, setDataView] = useState({});
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [dataDelete, setDataDelete] = useState({});
  const [pageCount, setPageCount] = useState(0);

  const handleClickBtnUpdate = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdate(user);
  };
  const handleClickBtnView = (user) => {
    setDataView(user);
    setShowModalViewUser(true);
  };
  const resetViewData = () => {
    setDataView({});
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  //getuser
  const fecthListUsers = async () => {
    let res = await getAllUsers();

    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  const fecthListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LITMIT_USER);

    if (res.EC === 0) {
      setListUser(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };
  useEffect(() => {
    // fecthListUsers();
    fecthListUsersWithPaginate(1);
  }, []);
  const handleClickBtnDelete = (user) => {
    setShowModalDeleteUser(true);
    setDataDelete(user);
  };
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
          {/* <TableUser
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
          /> */}
          <TableUserPaginate
            fecthListUsersWithPaginate={fecthListUsersWithPaginate}
            listUser={listUser}
            handleClickBtnUpdate={handleClickBtnUpdate}
            handleClickBtnView={handleClickBtnView}
            handleClickBtnDelete={handleClickBtnDelete}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowCreateUser}
          fecthListUsers={fecthListUsers}
          fecthListUsersWithPaginate={fecthListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          setShow={setShowModalUpdateUser}
          show={showModalUpdateUser}
          dataUpdate={dataUpdate}
          fecthListUsers={fecthListUsers}
          resetUpdateData={resetUpdateData}
          fecthListUsersWithPaginate={fecthListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          dataView={dataView}
          resetViewData={resetViewData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          dataDelete={dataDelete}
          fecthListUsers={fecthListUsers}
          fecthListUsersWithPaginate={fecthListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
export default ManageUser;
