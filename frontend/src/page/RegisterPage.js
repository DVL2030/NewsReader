import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import { register } from "../slice/userSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const userState = useSelector((state) => state.user);
  const { userInfo, registerSuccess, loading, error } = userState;

  const registerHandler = (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setPasswordValid(false);
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
    if (registerSuccess) {
      setTimeout(() => {
        navigate("/");
      }, 1500);
    }
  }, [navigate, userInfo, registerSuccess]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
          {registerSuccess && (
            <MessageBox variants="success">
              {registerSuccess.message}
            </MessageBox>
          )}
          <Container className=" py-5">
            <Row className="text-center">
              <Col xs="12">
                <div className="sign-in img-logo mx-auto">
                  <Link to="/">
                    <div className="link-logo">
                      <span className="logo-line-1">News</span>
                      <span className="logo-line-2">Reader</span>
                    </div>
                  </Link>
                </div>
              </Col>
              <Col xs="12" className="mb-4">
                <div className="register mx-auto ">
                  <form className="sign-in" onSubmit={registerHandler}>
                    <div>
                      <label htmlFor="name" className="text-start">
                        <big>Name </big>
                      </label>
                      <input
                        type="name"
                        id="name"
                        placeholder="Name"
                        title="Name must consist of 3~50 alphabet characters."
                        pattern="[A-Za-z\s]{3,50}"
                        required
                        onChange={(e) => setName(e.target.value)}
                      ></input>
                      <small className="text-start text-secondary">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
                        Name must consist of 3~50 alphabet characters.
                      </small>
                    </div>
                    <div>
                      <label htmlFor="email" className="text-start">
                        <big>Email </big>
                      </label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <label htmlFor="password" className="text-start">
                        <big>Password </big>
                      </label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                      <small className="text-start text-secondary">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
                        Passwords must consist of at least 6 characters.
                      </small>
                    </div>
                    <div>
                      <label htmlFor="repassword" className="text-start">
                        <big>Repeat Password </big>
                      </label>
                      <input
                        type="repassword"
                        id="repassword"
                        title="Passwords must consist of at least 6 characters."
                        pattern=".{6,}"
                        placeholder="Repeat password"
                        required
                        onChange={(e) => setRePassword(e.target.value)}
                      ></input>
                      {!passwordValid && (
                        <small className="text-danger">
                          <i
                            className="fa-solid fa-circle-exclamation"
                            aria-hidden="true"
                          ></i>
                          Passwords must consist of at least 6 characters.
                        </small>
                      )}
                    </div>
                    <div>
                      <Button className="register" type="submit">
                        Register
                      </Button>
                    </div>
                  </form>
                  <div className="text-center p-3">
                    <div>
                      <small className="text-secondary">
                        Already have an account?
                      </small>
                      <Link className="d-inline-block ms-2" to="/signin">
                        Sign in
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
