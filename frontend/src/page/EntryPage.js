import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Entry from "../component/Entry";
import { getEntry } from "../slice/newsSlice";
import { getBookmark } from "../slice/bookmarkSlice";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EntryPage() {
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;

  const toastId = React.useRef(null);

  const newsState = useSelector((state) => state.news);
  const { newsEntry, loading, error } = newsState;

  const bookmarkState = useSelector((state) => state.bookmark);
  const {
    bookmark,
    loadingAdd,
    loadingRemove,
    successAdd,
    successRemove,
    loading: bookmarkLoading,
  } = bookmarkState;

  useEffect(() => {
    dispatch(getBookmark());
    dispatch(getEntry(id));
  }, [successAdd, successRemove]);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {successAdd ? (
        <MessageBox variants="success">
          Successfully added to your bookmark!
        </MessageBox>
      ) : successRemove ? (
        <MessageBox variants="success">
          Successfully removed from your bookmark!
        </MessageBox>
      ) : (
        <></>
      )}

      {newsEntry ? (
        <Entry
          entry={newsEntry}
          bookmarked={
            bookmark && bookmark.find((b) => Number(b) === newsEntry.id)
              ? true
              : false
          }
          feedly={String(newsEntry.id).includes(":")}
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
