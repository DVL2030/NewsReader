import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Entry from "../component/Entry";
import { getEntry } from "../slice/newsSlice";

export default function EntryPage() {
  const param = useParams();
  const dispatch = useDispatch();

  const { id } = param;

  const newsState = useSelector((state) => state.news);
  const { newsEntry, loading, error } = newsState;

  useEffect(() => {
    dispatch(getEntry(id));
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {newsEntry ? (
        <Entry
          entry={newsEntry}
          type={newsEntry.content.includes("chars]") ? "home" : "feedly"}
        ></Entry>
      ) : error ? (
        <MessageBox variants="danger">{error}</MessageBox>
      ) : (
        <div>
          <MessageBox variants="danger">
            Could not find such article... Please check the entry that you want
            to search again...
          </MessageBox>
        </div>
      )}
    </div>
  );
}
