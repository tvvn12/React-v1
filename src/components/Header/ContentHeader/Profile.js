import _ from 'lodash';
import React from 'react'

import Form from 'react-bootstrap/Form';
import { FcPlus } from 'react-icons/fc';
const Profile = (props) => {
    
     
    const handleChangeUsernameEvent=(e)=>{
      props.setUsername(e.target.value)
    }
    
 
    
    return (
        <Form>
            <Form.Group className="mb-3" >
                <Form.Label>User Name</Form.Label>
                <Form.Control type='text' value={ props.username}  onChange={handleChangeUsernameEvent}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Role</Form.Label>
                <Form.Control type="text" disabled  value={props.role}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={props.email}  disabled/>
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
                <img style={ {width: "200px"}} src={props.previewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>  
        </Form>
    )
}

export default Profile