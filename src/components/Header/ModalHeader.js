import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tabs,Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { putUpdateUser } from '../../services/apiService';
import Profile from './ContentHeader/Profile';


function ModalHearder({show,setShow}) {

  const handleClose = () => {
    setShow(false);

  };
  const handleSubmit=()=>{
   
  }
  
  const [key, setKey] = useState('profile');

  const [username,setUsername]= useState("");
  const [role,setRole]= useState("");
  const [email,setEmail]= useState("");
  const [previewImage,setPreviewImage]= useState("");
  const [image,setImage]= useState("");
  const handleChangeUsername=(e)=>{
    
    
  }
  const user = useSelector((state) => state.user.account);
 useEffect(()=>{
  if(!_.isEmpty(user)){
    setUsername(user.username)
    setRole(user.role)
    setEmail(user.email)
    setPreviewImage(`data:image/jpeg;base64,${user.image}`)
  
  }

 },[])
 const handleUploadImage = (event) => {
  if (event.target && event.target.files && event.target.files[0]) {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // setImage(event.target.files[0]);
  }
};


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="profile" title="Profife">
      <Profile handleUploadImage={handleUploadImage} previewImage={previewImage} role={role} setRole={setRole} setEmail={setEmail} email={email} username={username} setUsername={setUsername}/>
      </Tab>
      <Tab eventKey="password" title="Password">
        Password
      </Tab>
      <Tab eventKey="history" title="History" >
      History
      </Tab>
    </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalHearder