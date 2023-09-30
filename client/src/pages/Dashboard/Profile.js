import React, { useState, useRef } from "react";
import axios from "axios";
// import "./style.css";
import uploadImage from "../../assets/uploadImage.png";
function ImageUpload() {
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState("");
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFiles(file);
    const imgname = event.target.files[0].name;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = Math.max(img.width, img.height);
        canvas.width = maxSize;
        canvas.height = maxSize;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        );
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: "image/png",
              lastModified: Date.now(),
            });

            console.log(file);
            setImage(file);
          },
          "image/jpeg",
          0.8
        );
      };
    };
  };

  const handleUploadButtonClick = () => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "ynthoewh");

    axios
      .post("https://api.cloudinary.com/v1_1/dryweqcbf/image/upload", formData)
      .then((res) => console.log(res));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <div className='wrapper'>
        <div className='pro'>
          <div className='content'>
            <h1>Edit Profile</h1>
            <form onSubmit={handleUploadButtonClick}>
              {/* <!-- Photo --> */}
              <fieldset>
                <div className='image-upload-container'>
                  <div className='box-decoration'>
                    <label
                      htmlFor='image-upload-input'
                      className='image-upload-label'
                    >
                      {image ? image.name : "Choose an image"}
                    </label>
                    <div onClick={handleClick} style={{ cursor: "pointer" }}>
                      {image ? (
                        <img
                          src={URL.createObjectURL(image)}
                          alt='upload image'
                          className='img-display-after'
                        />
                      ) : (
                        <img
                          src={uploadImage}
                          alt='upload image'
                          className='img-display-before'
                        />
                      )}

                      <input
                        id='image-upload-input'
                        type='file'
                        onChange={handleImageChange}
                        ref={hiddenFileInput}
                        style={{ display: "none" }}
                      />
                    </div>

                    {/* <button
                      className='image-upload-button'
                      onClick={handleUploadButtonClick}
                    >
                      Upload
                    </button> */}
                  </div>
                </div>
              </fieldset>
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='fname'>First Name</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='fname' tabIndex='1' />
                </div>
              </fieldset>
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='lname'>Last Name</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='lname' tabIndex='2' />
                </div>
              </fieldset>

              {/* <!-- Location --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='location'>Location</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='location' tabIndex='4' />
                </div>
              </fieldset>
              {/* <!-- Country --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='country'>Country</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='country' tabIndex='5' />
                </div>
              </fieldset>
              {/* <!-- Email --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='email'>Email Address</label>
                </div>
                <div className='grid-65'>
                  <input type='email' id='email' tabIndex='6' />
                </div>
              </fieldset>

              <fieldset>
                <input type='button' className='Btn cancel' value='Cancel' />
                <input
                  type='submit'
                  className='Btn image-upload-button'
                  value='Save Changes'
                />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
