import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Col, Container, Row } from "react-bootstrap";
import LoadingBox from "../../component/LoadingBox";
import MessageBox from "../../component/MessageBox";
import AdminSideBar from "../../component/AdminSidebar";
import AdminTable from "../../component/AdminTable";
import { getAdminNewsOverview } from "../../slice/adminSlice";

export default function AdminManageNewsPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { news, loading, error } = adminState;

  useEffect(() => {
    dispatch(getAdminNewsOverview());
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {news && (
          <>
            <Row className="my-3 p-5">
              <h3 className="mb-3 text-dark">Top news from Users</h3>
              <Col>
                <AdminTable data={news.top_bookmarks} />
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" text-dark>
                Top Subscription from Users
              </h3>
              <Col>
                <AdminTable data={news.top_subs} />
              </Col>
            </Row>
            <Row className="my-3 p-5">
              <h3 className="mb-3" text-dark>
                All News
              </h3>
              <Col>
                <AdminTable data={news.all_news} />
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
