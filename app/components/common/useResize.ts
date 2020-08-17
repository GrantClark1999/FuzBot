import React, { useState, useEffect } from 'react';

export default function useResize(myRef: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState(93);

  useEffect(() => {
    const handleResize = () => {
      setSize(myRef?.current?.offsetWidth ?? 93);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return size;
}
