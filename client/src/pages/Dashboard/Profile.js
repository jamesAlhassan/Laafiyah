import proPic from "../../assets/proPic.png";
const Profile = () => {
  return (
    <div>
      <div class='wrapper'>
        <div class='pro'>
          <div class='content'>
            <h1>Edit Profile</h1>
            <form action=''>
              {/* <!-- Photo --> */}
              <fieldset>
                <div class='grid-35'>
                  <label for='avatar'>Your Photo</label>
                </div>
                <div class='grid-65'>
                  <span class='photo' title='Upload your Avatar!'></span>
                  <input type='file' class='btn' />
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
                <input type='submit' class='Btn' value='Save Changes' />
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
