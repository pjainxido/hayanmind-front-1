import React, { useState, useEffect } from 'react';
import styles from './InfiniteScrollList.module.css'
import CommentBox from './CommentBox';

const InfiniteScrollList= () => {
  const LIMIT = 10;
  const [loadRef, setLoadRef] = useState(null);
  const [page, setPage] = useState(1);
  const [commentList, setCommentList] = useState([]);

  const loadComment = () => {
    setPage((prev) => prev + 1);
  };
  const callAPI = async (page) => {
    console.log(page);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=${LIMIT}`);
      const data = await response.json();
      setCommentList([...commentList, ...data]);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    callAPI(page);
  }, [page]);

  const onInterSecting = (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadComment();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 0,
    };
    console.log(loadRef);

    let observer;
    if (loadRef) {
      observer = new IntersectionObserver(onInterSecting, options);
      console.log(observer);
      observer.observe(loadRef);
    }
    return () => observer?.disconnect();
  }, [loadRef]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        {commentList.map((item, idx) => {
          return <CommentBox data={item} key={idx} />;
        })}
      </div>
      <button onClick={() => loadComment()}>text</button>

      <div ref={setLoadRef}>loading</div>
    </div>
  );
};

export default InfiniteScrollList;
