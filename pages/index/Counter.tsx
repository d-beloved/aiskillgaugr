import React, { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button type="button" className={"btn"} onClick={() => setCount((count) => count + 1)}>
      Counter {count}
    </button>
  );
}
