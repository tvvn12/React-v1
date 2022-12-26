import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Tabs,Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { doLogion, } from '../../redux/action/userAction';
import { postUpdateProfile } from '../../services/apiService';
import Password from './ContentHeader/Password';
import Profile from './ContentHeader/Profile';


function ModalHearder({show,setShow}) {
  const [key, setKey] = useState('profile');

  const [username,setUsername]= useState("");
  const [role,setRole]= useState("");
  const [email,setEmail]= useState("");
  const [image,setImage]= useState("");
  const [previewImage,setPreviewImage]= useState("");
  const [imageUpload,setImageUpload]= useState("")
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    if(!_.isEmpty(user)){
      setUsername(user.username)
      setRole(user.role)
      setEmail(user.email)
      setPreviewImage(`data:image/jpeg;base64,${user.image}`)
    }

  };

  const handleSubmit= async()=>{
    let data = await postUpdateProfile(username, imageUpload)
    if(data && data.EC === 0 ){
     
      
      dispatch(doLogion({...user,username: data.DT.username, image: image})) 
     
      toast.success(data.EM);
      

      handleClose();
    }

    
  }
  
 
  const user = useSelector((state) => state.user.account);
 useEffect(()=>{
  let base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

  if(!_.isEmpty(user)){
    // console.log(base64regex.test(user.image));
    setUsername(user.username)
    setRole(user.role)
    setEmail(user.email)

    if (user.image) {

      if(base64regex.test(previewImage)){
        setPreviewImage(`data:image/jpeg;base64,${user.image}`)
      }
      setPreviewImage(`data:image/jpeg;base64,${user.image}`);
    }
  }
 },[user])
 const handleUploadImage = async (event) => {
  if (event.target && event.target.files && event.target.files[0]) {


    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    // setImage(event.target.files[0]);
    const base64 = await convertBase64(event.target.files[0])
    let part = base64.split(',');
    setImage(part[1]);
    console.log(part[1]);
    // console.log(base64.split(','));
    setImageUpload(event.target.files[0]);

    }

};





const convertBase64 =(file)=>{
  return new Promise((rs,rj)=>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=(()=>{
      rs(fileReader.result)
    })
    fileReader.onerror=((err)=>{
      rj(err)
    })
  })
}

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
      <Profile  handleUploadImage={handleUploadImage} previewImage={previewImage}  role={role} setRole={setRole}  email={email} username={username} setUsername={setUsername}/>
      </Tab>
      <Tab eventKey="password" title="Password">
        <Password/>
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






