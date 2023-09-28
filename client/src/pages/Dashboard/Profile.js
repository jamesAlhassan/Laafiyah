import React, { useState, useRef } from "react";
// import "./style.css";
import uploadImage from "../../assets/uploadImage.png";
function ImageUpload() {
  const [image, setImage] = useState(null);
  const hiddenFileInput = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
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

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers();
    const token = "adhgsdaksdhk938742937423";
    myHeaders.append("Authorization", `Bearer ${token}`);

    var formdata = new FormData();
    formdata.append("file", file);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://trickuweb.com/upload/profile_pic", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result));
        const profileurl = JSON.parse(result);
        setImage(profileurl.img_url);
      })
      .catch((error) => console.log("error", error));
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <div class='wrapper'>
        <div class='pro'>
          <div class='content'>
            <h1>Edit Profile</h1>
            <form onSubmit={handleUploadButtonClick}>
              {/* <!-- Photo --> */}
              <fieldset>
                {/* <div class='grid-35'>
                  <label for='avatar'>Your Photo</label>
                </div>
                <div class='grid-65'>
                  <span class='photo' title='Upload your Avatar!'></span>
                  <input
                    type='file'
                    class='btn'
                    name='file'
                    onChange={handleFile}
                  />
                </div> */}

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
                <div class='grid-35'>
                  <label for='fname'>First Name</label>
                </div>
                <div class='grid-65'>
                  <input type='text' id='fname' tabindex='1' />
                </div>
              </fieldset>
              <fieldset>
                <div class='grid-35'>
                  <label for='lname'>Last Name</label>
                </div>
                <div class='grid-65'>
                  <input type='text' id='lname' tabindex='2' />
                </div>
              </fieldset>

              {/* <!-- Location --> */}
              <fieldset>
                <div class='grid-35'>
                  <label for='location'>Location</label>
                </div>
                <div class='grid-65'>
                  <input type='text' id='location' tabindex='4' />
                </div>
              </fieldset>
              {/* <!-- Country --> */}
              <fieldset>
                <div class='grid-35'>
                  <label for='country'>Country</label>
                </div>
                <div class='grid-65'>
                  <input type='text' id='country' tabindex='5' />
                </div>
              </fieldset>
              {/* <!-- Email --> */}
              <fieldset>
                <div class='grid-35'>
                  <label for='email'>Email Address</label>
                </div>
                <div class='grid-65'>
                  <input type='email' id='email' tabindex='6' />
                </div>
              </fieldset>

              <fieldset>
                <input type='button' class='Btn cancel' value='Cancel' />
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
