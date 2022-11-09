import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation, Trans } from "react-i18next";
const ModalResult = (props) => {
  const { t } = useTranslation();

  const { show, setShow, dataModalResult } = props;

  const handleClose = () => setShow(false);
  console.log("check data", dataModalResult);
  return (
    <>
      <Modal backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("ModalResult.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {t("ModalResult.total")} <b>{dataModalResult.countTotal}</b>
          </div>
          <div>
            {t("ModalResult.answer")}
            <b> {dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t("ModalResult.button_1")}
          </Button>
          <Button variant="primary" onClick={handleClose}>
            {t("ModalResult.button_2")}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
