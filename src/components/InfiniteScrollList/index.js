import React, { useState, useEffect } from "react";
import useInterSection from "../../hooks/useInterSection";
import { callAPI } from "../../utils";
import styles from "./InfiniteScrollList.module.css";
import CommentBox from "./CommentBox";

const InfiniteScrollList = () => {
  const LIMIT = 10;
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);
  const loadComment = () => {
    setPage((prev) => prev + 1);
  };
  const { setRef } = useInterSection(loadComment, commentList);

  const getComments = async (page) => {
    try {
      const query = {
        _page: page,
        _limit: LIMIT,
      };
      const data = await callAPI("https://jsonplaceholder.typicode.com/comments", query);
      setCommentList((prev) => [...prev, ...data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getComments(page);
  }, [page]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {commentList.map((item, idx) => {
          return <CommentBox data={item} key={idx} />;
        })}
      </div>
      <div ref={setRef}></div>
    </div>
  );
};

export default InfiniteScrollList;
