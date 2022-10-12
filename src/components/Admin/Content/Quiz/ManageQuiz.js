import "./ManageQuiz.scss";
import Select from "react-select";
import { useEffect, useRef, useState } from "react";
import {
  getAllQuizForAdmin,
  postCreateNewQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import Accordion from "react-bootstrap/Accordion";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const ManageQuiz = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const inputRef = useRef(null);
  const [listQuiz, setListQuiz] = useState([]);

  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataDelete, setDataDelete] = useState({});

  useEffect(() => {
    fetchQuiz();
  }, []);
  const fetchQuiz = async () => {
    let res = await getAllQuizForAdmin();
    if (res && res.EC == 0) {
      setListQuiz(res.DT);
    }
  };
  const handleEditQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
  };
  const handleDeleteQuiz = (quizDel) => {
    setShowModalDeleteQuiz(true);
    setDataDelete(quizDel);
  };
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const handleChangeFile = (event) => {
    console.log(event.target.files[0]);
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };
  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC == 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setImage(null);
      inputRef.current.value = null;
    } else {
      toast.error(res.EM);
    }
  };
  const resetUpdateData = () => {
    setDataUpdate({});
  };
  const resetDeleteData = () => {
    setDataDelete({});
  };

  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">
                  Add new Quiz:
                </legend>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your quiz name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label>Name</label>
                </div>
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label>Description</label>
                </div>
                <div className="my-3">
                  <Select
                    value={type}
                    defaultValue={type}
                    onChange={setType}
                    placeholder={"Quiz type..."}
                    options={options}
                  />
                </div>
                <div className="more-actions form-group">
                  <label>Upload Image</label>
                  <input
                    ref={inputRef}
                    onChange={(event) => handleChangeFile(event)}
                    className="form-control mt-2"
                    type="file"
                  />
                </div>
                <div className="mt-3">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleSubmitQuiz()}
                  >
                    Save
                  </button>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="list-detail">
        <TableQuiz
          listQuiz={listQuiz}
          handleDeleteQuiz={handleDeleteQuiz}
          handleEditQuiz={handleEditQuiz}
        />
      </div>
      <ModalUpdateQuiz
        show={showModalUpdateQuiz}
        setShow={setShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        resetUpdateData={resetUpdateData}
        fetchQuiz={fetchQuiz}
      />
      <ModalDeleteQuiz
        show={showModalDeleteQuiz}
        setShow={setShowModalDeleteQuiz}
        dataDelete={dataDelete}
        resetDeleteData={resetDeleteData}
        fetchQuiz={fetchQuiz}
      />
    </div>
  );
};
export default ManageQuiz;
