import { useState,  useEffect } from "react";

const useInterSection = (callback, dependency, observerOptions) => {
  const [ref, setRef] = useState(null);

  const onInterSecting = (callback) => (entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      callback();
    }
  };

  useEffect(() => {
    const options = observerOptions || {
      root: null,
      rootMargin: "20px",
      threshold: 1,
    };

    let observer;
    if (ref && dependency.length) {
      observer = new IntersectionObserver(onInterSecting(callback), options);
      observer.observe(ref);
    }
    return () => observer?.disconnect();
  }, [ref, dependency]);

  return { setRef };
};

export default useInterSection;
