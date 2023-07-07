import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Entry from "../component/Entry";

export default function EntryPage() {
  const param = useParams();
  const { id, topic } = param;

  const newsState = useSelector((state) => state.news);
  const { newsHome, loading, error } = newsState;

  const [data, setData] = useState(null);

  useEffect(() => {
    const entry = newsHome[topic].find((x) => x.source.id == id);
    console.log(entry);
    setData(entry);
  }, []);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {error && <MessageBox variants="danger">{error}</MessageBox>}
      {data ? (
        <Entry entry={data}></Entry>
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
