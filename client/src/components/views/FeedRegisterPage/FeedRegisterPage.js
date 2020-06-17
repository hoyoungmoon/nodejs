import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { registerFeed } from '../../../_actions/feed_action'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

function FeedRegisterPage(props) {
    const dispatch = useDispatch();

    const [Content, setContent] = useState("")
    const [ImageFile, setImageFile] = useState("")

    const onInputHandler = (event) => {
        switch (event.target.name) {
            case "content":
                setContent(event.currentTarget.value)
                break;

            case "imageFile":
                console.log("type:",document.getElementById("imageFile").files[0].type)
                setImageFile(event.currentTarget.value)
                break;
        }
    }
    


    const onSubmitHandler = (event) => {
        let selectedFile;
        event.preventDefault();
        console.log("props.userId:", props.userId)

        if(document.getElementById("imageFile").files.length >= 1){
            selectedFile = document.getElementById("imageFile").files[0];
            const extensionUrl = "http://localhost:80/api/common/getExtension?type="+selectedFile.type
            console.log("extensionUrl : ", extensionUrl);    
            axios.get(extensionUrl)
              .then(s3Res => {      
                  var data = s3Res.data
                  console.log("s3Res.data : ", data);
                  const getUploadUrl = "http://localhost:80/api/common/fileUploadUrl?mimetype="+selectedFile.type+"&extension="+data.extension
                  axios.get(getUploadUrl)
                    .then(s3Res => {     
                        console.log("signatureUrl:",s3Res.data) 
                        let signatureUrl = s3Res.data.url
                        axios.put(signatureUrl, selectedFile, {                    
                        }) 
                                   
                        .then(res => {
                            console.log("put reuslt" ,res);
                            let path = res.config.url.split('?')[0];
                            let body = {
                                PATH:path,
                                USER_IDX: props.userId,
                                CONTENT: Content
                            }

                            dispatch(registerFeed(body)).then(response => {
                                console.log(response)
                                if (response.payload.registerFeed) {
                                    props.history.push('/')
                                } else {
                                    alert('feed register error')
                                }
                            })
                        });  
                    });                        
              });
            } 

        
    }


    const renderPreviews = () => {
        console.log("renderPreviews start!")
        console.log("asdf", ImageFile)
        const previewContainer = document.getElementById("preview-container");
        for (let i = 0; i < ImageFile.length; i++) {
          const preview = document.createElement("img");
          preview.id = `preview_${i}`;
          previewContainer.appendChild(preview);
          const reader = new FileReader();
          reader.onload = function(evt) {
            preview.src = reader.result;
          };
          reader.readAsDataURL(ImageFile[i]);
        }
      };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}>
                <div style={{ "backgroundColor": "#efefef", "width": "150px", "height": "150px" }} id="preview-container"/>
            
                <input type="file" name="imageFile" onChange={onInputHandler} id="imageFile"/>
                <label>Content</label>
                <input type="text" value={Content} name="content" onChange={onInputHandler} />
                <br />

                <br /> <br />
                <button>REGISTER</button>
            </form>

        </div>
    )
}

export default withRouter(FeedRegisterPage)
