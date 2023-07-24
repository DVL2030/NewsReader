import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardOverview } from "../../slice/adminSlice";
import StatCard from "../../component/StatCard";
import { Col, Container, Row } from "react-bootstrap";
import LoadingBox from "../../component/LoadingBox";
import MessageBox from "../../component/MessageBox";
import AdminSideBar from "../../component/AdminSidebar";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function AdminDashBoardPage() {
  const dispatch = useDispatch();

  const adminState = useSelector((state) => state.admin);
  const { dashboard, loading, error } = adminState;

  const chart_options = {
    responsive: true,
    chart: {
      title: "Total Visits",
    },
  };

  useEffect(() => {
    dispatch(getDashboardOverview());
  }, []);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : (
    <div className="d-flex">
      <AdminSideBar></AdminSideBar>
      <Container fluid>
        {error && <MessageBox varints="danger">{error}</MessageBox>}

        {dashboard && (
          <>
            <Row>
              <Col xs={12} sm={6} lg={3}>
                <StatCard
                  icon="news.png"
                  bg="teal"
                  stat={dashboard.total_news}
                  label="Total News"
                ></StatCard>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <StatCard
                  icon="rss.png"
                  bg="orange"
                  stat={dashboard.total_feeds}
                  label="Total Feeds"
                ></StatCard>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <StatCard
                  icon="bookmark.jfif"
                  bg="blue"
                  stat={dashboard.total_bmarks}
                  label="Total Bookmarks"
                ></StatCard>
              </Col>
              <Col xs={12} sm={6} lg={3}>
                <StatCard
                  icon="users.png"
                  bg="green"
                  stat={dashboard.total_users}
                  label="Total Users"
                ></StatCard>
              </Col>
            </Row>
            <Row className="my-5 p-5">
              <Col>
                <div className="w-100 h-20">
                  <Line
                    datasetIdKey="id"
                    data={{
                      labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                      datasets: [
                        {
                          label: "Website Visits",
                          data: [182, 103, 200, 145, 155, 204],
                          fill: false,
                          borderColor: "#0B2948",
                          tension: 0.1,
                        },
                      ],
                    }}
                    options={chart_options}
                  />
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}
