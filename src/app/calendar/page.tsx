import React from "react";

import "./style.css";
import Calendar from "../components/Calendar";
import Test from "../components/Test";

interface Props {}

function CalendarPage(props: Props) {
  const {} = props;

  return (
    <div className="calendar">
      <Calendar startedAt={"2024-08-28"} endedAt={"2024-12-31"} />
      {/* <Test /> */}
    </div>
  );
}

export default CalendarPage;
