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

  const { id, topic } = param;

  const newsState = useSelector((state) => state.news);
  const { newsEntry, newsHome, loading, error } = newsState;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (topic) {
      const entry = newsHome[topic].find((x) => x.id == id);
      setData(entry);
    } else {
      dispatch(getEntry(id));
    }
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {data ? (
        <Entry entry={data} type="home"></Entry>
      ) : newsEntry ? (
        <Entry entry={newsEntry} type="feedly"></Entry>
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
