import _ from 'lodash';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FcPlus } from 'react-icons/fc';
import { useSelector } from 'react-redux';
import { putUpdateUser } from '../../../services/apiService';
const Profile = (props) => {
("");
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    
    // useEffect(() => {
    //     if (!_.isEmpty(props.user)) {
    //       //update state
    
    //       setEmail(props.user.email);
    //       setUsername(props.user.username);
    
    //       setRole(props.user.role);
    //       if (props.user.image) {
    //         setPreviewImage(`data:image/jpeg;base64,${props.user.image}`);
    //       }
    //       setImage("");
    //     }
    //   }, [props.user]);

    if(props.previewImage){

    }
     
    const handleChangeUsernameEvent=(e)=>{
        props.setUsername(e.target.value)
    }
    
    const handleChangeEmailEvent=(e)=>{
        props.setEmail(e.target.value)
    }
    
    return (
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>User Name</Form.Label>
                <Form.Control type='text' value={props.username}  onChange={handleChangeUsernameEvent}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" disabled  value={props.role}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={props.email}  onChange={handleChangeEmailEvent} />
            </Form.Group>

            <Form.Group className="mb-3"  hidden
                onChange={(e)=>props.handleUploadImage(e)}
                controlId='labelUpload' >
                <Form.Label>Imgage</Form.Label>
                <Form.Control type="file"/>
            </Form.Group>
            
            <label className="form-label label-upload" htmlFor="labelUpload">
                <FcPlus />
                Upload file Image
              </label>
            <div className="col-md-12 img-preview">
              {props.previewImage ? (
                <img src={props.previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>  
        </Form>
    )
}

export default Profile