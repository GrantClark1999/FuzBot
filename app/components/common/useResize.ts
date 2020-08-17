import React, { useState, useEffect } from 'react';

export default function useResize(myRef: React.RefObject<HTMLDivElement>) {
  const [size, setSize] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setSize(myRef?.current?.offsetWidth ?? 0);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [myRef]);

  return size;
}
