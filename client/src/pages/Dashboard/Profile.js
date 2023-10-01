import React, { useState, useRef } from "react";

import uploadImage from "../../assets/uploadImage.png";

function ImageUpload() {
  const [profileImage, setProfileImage] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const hiddenFileInput = useRef(null);

  const handleUploadButtonClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData1 = new FormData(e.currentTarget);
    setFname(formData1.get("fname"));
    setLname(formData1.get("lname"));
    console.log(fname);
    console.log(lname);

    try {
      let imgUrl;
      if (
        profileImage &&
        (profileImage.type === "image/png" ||
          profileImage.type === "image/jpeg" ||
          profileImage.type === "image/jpg")
      ) {
        const formData = new FormData();
        formData.append("file", profileImage);
        formData.append("cloud_name", "dryweqcbf");
        formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);

        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dryweqcbf/image/upload",
          {
            method: "post",
            body: formData,
          }
        );

        const data = await res.json();
        imgUrl = data.url.toString();
        setImagePreview(null);
      }
      alert(imgUrl);
      e.currentTarget.reset();
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setProfileImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
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
                      {imagePreview ? (
                        imagePreview.name
                      ) : (
                        <div>
                          <img
                            src={uploadImage}
                            alt='upload image'
                            className='img-display-before'
                          />
                          <p>Choose an image</p>
                        </div>
                      )}
                    </label>
                    <div onClick={handleClick} style={{ cursor: "pointer" }}>
                      {imagePreview && (
                        <img src={imagePreview && imagePreview} />
                      )}

                      <input
                        id='image-upload-input'
                        type='file'
                        accept='image/png, image/jpeg, image/jpg'
                        onChange={handleChange}
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
                  <input type='text' id='fname' name='fname' tabIndex='1' />
                </div>
              </fieldset>
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='lname'>Last Name</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='lname' name='lname' tabIndex='2' />
                </div>
              </fieldset>

              {/* <!-- Location --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='location'>Location</label>
                </div>
                <div className='grid-65'>
                  <input
                    type='text'
                    id='location'
                    name='location'
                    tabIndex='4'
                  />
                </div>
              </fieldset>
              {/* <!-- Country --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='country'>Country</label>
                </div>
                <div className='grid-65'>
                  <input type='text' id='country' name='country' tabIndex='5' />
                </div>
              </fieldset>
              {/* <!-- Email --> */}
              <fieldset>
                <div className='grid-35'>
                  <label htmlFor='email'>Email Address</label>
                </div>
                <div className='grid-65'>
                  <input type='email' id='email' name='email' tabIndex='6' />
                </div>
              </fieldset>

              <fieldset>
                <input type='button' className='Btn cancel' value='Cancel' />
                <p>
                  {isLoading ? (
                    "Uploading..."
                  ) : (
                    <button type='submit' className='Btn image-upload-button'>
                      Save Changes
                    </button>
                  )}
                </p>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageUpload;
