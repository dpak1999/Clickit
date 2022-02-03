/** @format */

import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import CoverVideo from '../assets/cover.mp4';
import Logo from '../assets/logo-white.png';
import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const handleSuccess = (response) => {
    localStorage.setItem('clickit-user', JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;

    const doc = {
      _id: googleId,
      _type: 'user',
      username: name,
      image: imageUrl,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };

  const handleFailure = () => {};

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          typeof="video/mp4"
          controls={false}
          muted
          src={CoverVideo}
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={Logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex p-3 items-center rounded-lg cursor-pointer justify-center outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
