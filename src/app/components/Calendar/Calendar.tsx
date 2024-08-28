"use client";
import React, { useMemo, useState } from "react";

import "./style.css";
import dayjs from "dayjs";
import { tableData } from "@/app/utils/dummy";
import { format } from "path";
interface Props {
  startedAt: string;
  endedAt: string;
}

function Calendar(props: Props) {
  const {} = props;

  const getDateRange = (startDate: string, endDate: string) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    let dateArray = [];

    let currentDate = start;
    while (currentDate.isBefore(end) || currentDate.isSame(end)) {
      dateArray.push(currentDate.format("YYYY-MM-DD"));
      currentDate = currentDate.add(1, "day");
    }

    return dateArray;
  };

  const removeClass = (className: string) => {
    const activeContract = document.querySelectorAll(".active-contract");
    const activeBox = document.querySelectorAll(".active-box");

    activeContract.forEach((item) => {
      item.classList.remove(className);
    });
    activeBox.forEach((item) => {
      item.remove();
    });
  };

  return (
    <div className="calendar-container">
      <div className="unit">
        {tableData.map((item) => {
          return (
            <div key={item.unitId}>
              <span>{item.unitId}</span>
              <strong>{item.unitName}</strong>
            </div>
          );
        })}
      </div>
      <div className="date">
        {tableData.map((table, tableIdx) => {
          return (
            <div className="date-container" key={tableIdx}>
              {getDateRange(props.startedAt, props.endedAt).map((date, idx) => {
                let temp: string[] = [];
                let firstDate: string[] = [];
                let currentDate: string[] = [];

                table.contractDates.map((contractDate) => {
                  const res = getDateRange(
                    contractDate.startedAt,
                    contractDate.endedAt
                  );

                  firstDate = [...firstDate, res[0]];
                  temp = [...temp, ...res];
                });

                let isIclude = temp.includes(date);
                let isFirst = firstDate.includes(date);
                let isActiveContract = currentDate.includes(date);

                return (
                  <div
                    key={date}
                    id={`${date}-${tableIdx}`}
                    className={`date-item
                        ${
                          isActiveContract
                            ? "active-contract"
                            : isIclude
                            ? isFirst
                              ? "start"
                              : "color"
                            : ""
                        }
                    `}
                    onClick={() => {
                      removeClass("active-contract");
                      const findIndex = table.contractDates.findIndex((a) =>
                        getDateRange(a.startedAt, a.endedAt).includes(date)
                      );

                      if (findIndex >= 0) {
                        const res = getDateRange(
                          table.contractDates[findIndex].startedAt,
                          table.contractDates[findIndex].endedAt
                        );
                        if (res.includes(date)) {
                          res.map((item, idx) => {
                            if (idx === 0) {
                              const element = document.getElementById(
                                `${item}-${tableIdx}`
                              );
                              const box = document.createElement("div");
                              const textContent = document.createElement("div");

                              const div = element?.appendChild(box);
                              div?.classList.add("active-box");

                              box.style.width = `${
                                40 * res.length + 2 * res.length - 2
                              }px`;

                              const title = box.appendChild(textContent);

                              if (tableIdx <= 2) {
                                title.classList.add("overlay-bottom");
                              } else {
                                title.classList.add("overlay-top");
                              }

                              title.innerHTML = `<div><strong>${table.unitId} ${
                                table.unitName
                              }</strong><p>${dayjs(res[0]).format(
                                "YY.MM.DD"
                              )} ~ ${dayjs(res[res.length - 1]).format(
                                "YY.MM.DD"
                              )}</p><strong>${
                                table.name
                              }<strong></div><button>상세</button>`;
                            }

                            const element = document.getElementById(
                              `${item}-${tableIdx}`
                            );
                            element!.classList.add("active-contract");
                          });
                        }
                      }
                    }}
                    // onMouseOver={() =>
                    //   console.log(table.unitName, date, isIclude, temp)
                    // }
                  >
                    {dayjs(date).format("MM.DD")}
                    {/* {isIclude ? "true" : "false"} */}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
