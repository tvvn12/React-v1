import _ from "lodash";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putQuiz } from "../../../../services/apiService";

const ModalUpdateQuiz = (props) => {
  const { show, setShow, dataUpdate, resetUpdateData, fetchQuiz } = props;

  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("USER");
  const [image, setImage] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const handleClose = async () => {
    setShow(false);
    setDescription("");
    setName("");
    setType("");
    setImage("");
    setPreviewImage("");
    resetUpdateData();
    await props.fetchQuiz();
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setDescription(dataUpdate.description);
      setName(dataUpdate.name);
      setType(dataUpdate.difficulty);
      // setImage(dataUpdate.image)
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreviewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitUpdateQuiz = async () => {
    let res = await putQuiz(dataUpdate.id, description, name, type, image);

    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      await props;
    }

    if (res && res.EC !== 0) {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <Modal
        className="modal-add-user"
        backdrop="static"
        size="xl"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input
                onChange={(event) => setName(event.target.value)}
                type="email"
                className="form-control"
                value={name}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input
                onChange={(event) => setDescription(event.target.value)}
                type="text"
                className="form-control"
                value={description}
              />
            </div>

            {/* <div className="col-md-6">
              <label className="form-label">Type</label>
              <input
                onChange={(event) => setUserName(event.target.value)}
                type="text"
                className="form-control"
                value={username}
              />
            </div> */}
            <div className="col-md-4">
              <label className="form-label">Type</label>
              <select
                className="form-select"
                onChange={(event) => setType(event.target.value)}
                value={type}
              >
                <option value="EASY">EASY</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HARD">HARD</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload file Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateQuiz;
