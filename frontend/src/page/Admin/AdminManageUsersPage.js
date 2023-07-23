import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import LoadingBox from "../../component/LoadingBox";
import MessageBox from "../../component/MessageBox";
import AdminSideBar from "../../component/AdminSidebar";
import AdminTable from "../../component/AdminTable";
import { getAdminUserOverview } from "../../slice/adminSlice";

export default function AdminManageUsersPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { user, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminUserOverview());
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {user && (
          <>
            <Row className="my-3 p-5">
              <h3 className="mb-3 text-dark">All Users</h3>
              <Col>
                <AdminTable data={user.all_users} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
