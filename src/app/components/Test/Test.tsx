"use client";
import dayjs from "dayjs";
import React from "react";
import Timeline from "react-calendar-timeline";

import "react-calendar-timeline/lib/Timeline.css";

interface Props {}

function Test(props: Props) {
  const groups = [
    { id: 1, title: "group 1" },
    { id: 2, title: "group 2" },
  ];

  const items = [
    {
      id: 1,
      group: 1,
      title: "item 1",
      start_time: dayjs(),
      end_time: dayjs().add(1, "hour"),
    },
    {
      id: 2,
      group: 2,
      title: "item 2",
      start_time: dayjs().add(-0.5, "hour"),
      end_time: dayjs().add(0.5, "hour"),
    },
    {
      id: 3,
      group: 1,
      title: "item 3",
      start_time: dayjs().add(2, "hour"),
      end_time: dayjs().add(3, "hour"),
    },
  ];

  const {} = props;

  return (
    <div>
      <Timeline
        groups={groups}
        items={items}
        defaultTimeStart={new Date(dayjs().format("YYYY.MM.DD"))}
        defaultTimeEnd={new Date(dayjs().add(12, "hour").format("YYYY.MM.DD"))}
      />
    </div>
  );
}

export default Test;
