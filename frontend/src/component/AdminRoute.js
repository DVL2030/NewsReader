import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SorryBox from "./SorryBox";

export default function AdminRoute(props) {
  const userState = useSelector((state) => state.user);
  const { userInfo } = userState;

  if (userInfo && userInfo.isAdmin) return props.children;

  return (
    <SorryBox
      header={"Invalid Approach"}
      message="You do not have any access to this page"
    ></SorryBox>
  );
}
