"use client";
import React, { Suspense, useEffect, useState } from "react";

import "./style.css";
import Calendar from "../components/Calendar";
import Test from "../components/Test";
import dayjs from "dayjs";

interface Props {}

function CalendarPage(props: Props) {
  const {} = props;

  const [state, setState] = useState({
    startedAt: "2024-08-28",
    endedAt: "2024-12-31",
  });
  const [loading, setLoading] = useState(true);

  const handleButton = (month: number, type: "add" | "subtract") => {
    setLoading(true);
    const res =
      type === "add"
        ? dayjs(state.startedAt).add(month, "month")
        : dayjs(state.startedAt).subtract(month, "month");
    type === "add"
      ? setState((prev) => ({
          ...prev,
          endedAt: dayjs(res).format("YYYY-MM-DD"),
        }))
      : setState((prev) => ({
          ...prev,
          startedAt: dayjs(res).format("YYYY-MM-DD"),
        }));
  };

  useEffect(() => {
    setLoading(false);
  }, [state.startedAt, state.endedAt]);

  return (
    <div className="calendar">
      <div className="buttons">
        {loading ? (
          <p>loading..</p>
        ) : (
          <>
            이전
            <button onClick={() => handleButton(1, "subtract")}>1개월</button>
            <button onClick={() => handleButton(3, "subtract")}>3개월</button>
            <button onClick={() => handleButton(6, "subtract")}>6개월</button>
            이후
            <button onClick={() => handleButton(1, "add")}>1개월</button>
            <button onClick={() => handleButton(3, "add")}>3개월</button>
            <button onClick={() => handleButton(6, "add")}>6개월</button>
          </>
        )}
      </div>

      <div className="result">
        시작일: {state.startedAt} 종료일 : {state.endedAt}
      </div>
      <Calendar startedAt={state.startedAt} endedAt={state.endedAt} />
      {/* <Test /> */}
    </div>
  );
}

export default CalendarPage;
