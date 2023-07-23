import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signin } from "../slice/userSlice";

import { Col, Container, Row, Button } from "react-bootstrap";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const { userInfo, loading, error } = userState;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const redirectSearch = new URLSearchParams(search).get("redirect");
  const redirectUrl = redirectSearch ? redirectSearch : "/";

  const signinHandler = (e) => {
    e.preventDefault();
    dispatch(signin({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirectUrl);
    }
  }, [navigate, userInfo]);

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : (
        <>
          {error && <MessageBox variants="danger">{error}</MessageBox>}
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
                <div className="sign-in mx-auto ">
                  <form className="sign-in" onSubmit={signinHandler}>
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
                        placeholder="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      ></input>
                    </div>
                    <div>
                      <Button className="sign-in" type="submit">
                        Sign in
                      </Button>
                    </div>
                  </form>

                  <div className="text-center p-3">
                    <div className="mb-2"></div>
                    <div>
                      <small className="text-secondary">
                        Don’t have an account?
                      </small>
                      <Link
                        className="d-inline-block ms-2"
                        to={`/register?redirect=${redirectUrl}`}
                      >
                        Sign up
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
