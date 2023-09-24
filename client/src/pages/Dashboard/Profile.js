const Profile = () => {
  return (
    <main class='has-dflex-center'>
      <section>
        <div class='lx-container-70'>
          <div class='lx-row'>
            <h1 class='title'>Edit your profile</h1>
          </div>
          <div class='lx-row align-stretch'>
            <div class='lx-column column-user-pic'>
              <div class='profile-pic bs-md'>
                <h1 class='pic-label'>Profile picture</h1>
                <div class='pic bs-md'>
                  <img
                    src='https://bit.ly/3jRbrbp'
                    alt=''
                    width='4024'
                    height='6048'
                    loading='lazy'
                  />
                  <a id='change-avatar' class='lx-btn'>
                    <i class='fas fa-camera-retro'></i>&nbsp;&nbsp;Change your
                    profile picture.
                  </a>
                </div>
                <div class='pic-info'>
                  <p>
                    <i class='fas fa-exclamation-triangle'></i>&nbsp;&nbsp;This
                    photo will appear on the platform, in your contributions or
                    where it is mentioned.
                  </p>
                </div>
              </div>
            </div>
            <div class='lx-column'>
              <form action='get'>
                <div class='fieldset'>
                  <label for='user-name'>Name</label>
                  <div class='input-wrapper'>
                    <span class='icon'>
                      <i class='fas fa-user'></i>
                    </span>
                    <input
                      type='text'
                      id='user-name'
                      value='Lorem Ipsum'
                      autocomplete='username'
                      required
                    />
                  </div>
                  <div id='user-name-helper' class='helper'>
                    <p>
                      Your name can appear on the platform, in your
                      contributions or where it is mentioned.
                    </p>
                  </div>
                </div>
                <div class='fieldset'>
                  <label for='user-id'>Registration</label>
                  <div class='input-wrapper'>
                    <span class='icon'>
                      <i class='fas fa-address-card'></i>
                    </span>
                    <input type='number' id='user-id' value='424242' required />
                  </div>
                  <div id='user-id-helper' class='helper'></div>
                </div>
                <div class='fieldset'>
                  <label for='email'>E-mail</label>
                  <div class='input-wrapper'>
                    <span class='icon'>
                      <i class='fas fa-envelope'></i>
                    </span>
                    <input
                      type='email'
                      id='email'
                      value='lorem@ipsum.com'
                      autocomplete='username'
                    />
                  </div>
                  <div id='email-helper' class='helper'></div>
                </div>
                <div class='fieldset'>
                  <label for='pass'>Password</label>
                  <div class='input-wrapper'>
                    <span class='icon'>
                      <i class='fas fa-key'></i>
                    </span>
                    <input
                      type='password'
                      id='pass'
                      value='pass123*'
                      autocomplete='current-password'
                    />
                  </div>
                  <div id='pass-helper' class='helper'></div>
                </div>
                <div class='actions'>
                  <a id='cancel' class='lx-btn'>
                    <i class='fas fa-ban'></i>&nbsp;&nbsp;Cancel
                  </a>
                  <a id='clear' class='lx-btn'>
                    <i class='fas fa-broom'></i>&nbsp;&nbsp;Clean
                  </a>
                  <a id='save' class='lx-btn'>
                    <i class='fas fa-save'></i>&nbsp;&nbsp;Save
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
export default Profile;
