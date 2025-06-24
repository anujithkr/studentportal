import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import authimage from '../assets/people-signing-up-or-login-to-online-account-with-user-interface-secure-login-and-password-modern-flat-illustration-vector.jpg'
import { LoginUser, registerAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import { isAuthTokenContext } from '../Context/ContextShare'

function Auth({ registerPage }) {

  const isRegisterPage = registerPage ? true : false;
  const {isAuthToken , SetIsAuthToken}=useContext(isAuthTokenContext)

  const navigate = useNavigate()

  // creat a state to hold all input value
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleRegister = async () => {
    console.log("User entered data", userData);
    const { name, email, password } = userData
    if (!name || !email || !password) {
      toast.warning("please fill the form completely")
    }
    else {
      // cell API to register the user
      const result = await registerAPI(userData)
      if (result.status === 201) {
        toast.success(`${userData.name}User Register successfully`)
        setUserData({
          name: "",
          email: "",
          password: ""
        })

        // navigate to login page
       navigate('/')
      }
      else if (result.status === 409) {
        toast.warning(`${userData.name} Already exist , please login`)
        setUserData({
          name: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error("something happened")
      }
    }

  }

  const handleLogin = async ()=>{
    console.log("Inside handleLogin function");
    const {email , password}= userData
    console.log(email , password);
    if(!email || !password){
      toast.warning("please fill the form completely")
    }else{
      const result = await LoginUser(userData)

      console.log("Responce from login");
      console.log(result.data);
      
      
      if (result.status === 200){
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.user_data))
        sessionStorage.setItem("token" ,result.data.jwt_token)
        SetIsAuthToken(true)
        toast.success("login successfully")
        navigate("/")

      }else if (result.status === 406) {
          toast.error("Email or password Missmatch")

      }else{
        toast.error("Something happened")

      }

    }
  }
  useEffect(()=>{
    setUserData({
       name:"",
       email:"",
       password :""
    })
  },[registerPage])

  return (
    <>

      <div className="container-fluid m-5">
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h5> <i class="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</h5>
        </Link>
      </div>

      <div className="container-fluid">
        <Row>
          <Col md={5} className='mb-5 ms-5 mt-5 d-flex justify-content-center align-items-center'>
            <img src={authimage} alt="" width={'70%'} />
          </Col>

          <Col md={6} className='mt-5 d-flex justify-content-center align-items-center flex-column'>
            <h4 className='text-center'><i className="fa-solid fa-layer-group " style={{ marginRight: '10px' }}></i>PROJECT PORTAL</h4>

            {
              isRegisterPage ?
                <h5 className='text-center mt-2'>SIGN UP TO YOUR ACCOUNT</h5> :
                <h5 className='text-center mt-2'>SIGN IN TO YOUR ACCOUNT</h5>
            }


            <div className="border border-2 border-warning p-4 rounded-3 mb-5 d-flex justify-content-center flex-column align-items-center" style={{ width: '64%' }}>


              {
                isRegisterPage &&
                <input type="text" value={userData.name} className='form-control my-3 ' placeholder='Enter Your Name'
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
              }

              <input type="email" value={userData.email} className='form-control my-3' placeholder='Enter Your Email'
                onChange={(e) => setUserData({ ...userData, email: e.target.value })} />

              <input type="password" value={userData.password} className='form-control my-3' placeholder='Enter Your Password'
                onChange={(e) => setUserData({ ...userData, password: e.target.value })} />

              <div className="d-flex justify-content-center">

                {
                  isRegisterPage ?
                    <button onClick={handleRegister} className='btn btn-warning '>
                      REGISTER
                    </button> :
                    <button onClick={handleLogin} className='btn btn-warning '>
                      LOGiN
                    </button>
                }

              </div>
              {
                isRegisterPage ?
                  
                    <Link  style={{textDecoration:'none'}} to={"/login"}>
                      <p>ALREADY A USER? <span style={{ color: '#24889e' }}>LOGIN</span></p>
                    </Link>
               
                  :
                 
                    <Link style={{textDecoration:'none'}} to={"/register"}>
                      <p>NOT REGISTERED YET? <span style={{ color: '#24889e', textDecoration:'n'}}>REGISTER</span></p>
                    </Link>
               

              }


            </div>
          </Col>

        </Row>

      </div>

      <ToastContainer />

    </>
  )
}

export default Auth