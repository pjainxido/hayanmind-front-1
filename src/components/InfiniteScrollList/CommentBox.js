import React from "react";
import styles from "./InfiniteScrollList.module.css";

const CommentBox = ({ data }) => {
  return (
    <div className={styles.item}>
      <div>
        <h4>Comment Id</h4>
        {data.id}
      </div>
      <div>
        <h4>Email</h4>
        {data.email}
      </div>
      <div>
        <h4>Comment</h4>
        <p>{data.body}</p>
      </div>
    </div>
  );
};

export default CommentBox;
