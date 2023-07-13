import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import LoadingBox from "../component/LoadingBox";
import MessageBox from "../component/MessageBox";
import Entry from "../component/Entry";
import { getEntry } from "../slice/newsSlice";
import { getBookmark } from "../slice/bookmarkSlice";

import { toast } from "react-toastify";
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
    // if (!loadingAdd || !loadingRemove) {
    //   if (successAdd) {
    //     toastId.current = toast.success("Added!", {
    //       autoClose: 1000,
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   } else if (successRemove) {
    //     toastId.current = toast.success("Removed!", {
    //       autoClose: 1000,
    //       position: toast.POSITION.TOP_CENTER,
    //     });
    //   } else if (error)
    //     toastId.current = toast.error(error, {
    //       autoClose: 1000,
    //     });
    // }
  }, [loadingAdd, loadingRemove]);

  return loading ? (
    <LoadingBox />
  ) : (
    <div>
      {newsEntry ? (
        <Entry
          entry={newsEntry}
          type={newsEntry.content.includes("chars]") ? "home" : "feedly"}
          bookmarked={
            bookmark && bookmark.find((b) => Number(b) === newsEntry.id)
              ? true
              : false
          }
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
