"use client";
import React, { useCallback, useEffect, useState } from "react";
import { tableData, tableType } from "../utils/dummy";
import { getDateRange } from "../components/Calendar/Calendar";
import dayjs from "dayjs";
import RoomItem from "../components/RoomItem";
import "./style.css";

interface Props {}

type ItemProps = {
  gridIdx: number;
  isIclude: boolean;
  isFirst: boolean;
  isCleanupday: boolean;
};
function Item({ gridIdx, isCleanupday, isFirst, isIclude }: ItemProps) {
  const handleItemClick = () => {};
  return (
    <div className="item" onClick={handleItemClick}>
      {gridIdx}
      <p>{isIclude ? "계약일" : ""}</p>
      <p>{isFirst ? "첫날" : ""}</p>
      <p>{isCleanupday ? "청소일" : ""}</p>
    </div>
  );
}

function Page(props: Props) {
  const {} = props;
  const startedAt = "2024-08-28";
  const endedAt = "2024-12-31";

  const getSearchDays = useCallback(() => {
    return {
      searchDays: getDateRange(startedAt, endedAt),
    };
  }, [startedAt, endedAt]);

  const { searchDays } = getSearchDays();

  const [activeDates, setActiveDates] = useState<{
    dates: string[];
    key: number;
  }>({
    dates: [],
    key: -1,
  });
  //   const [totalIdx, setTotalIdx] = useState(0);
  let totalIdx: number = 0;

  function getContractInfo(table: tableType) {
    console.log("table Map");
    // setTotalIdx((prev) => prev + 1);
    totalIdx = totalIdx + 1;
    let contractDates: string[] = [];
    let firstDate: string[] = [];
    let cleanupdays: string[] = [];

    table.contractDates.forEach((contractDate, contractIdx) => {
      //   console.log("tableMap", contractIdx);

      console.log("table Map");
      const res = getDateRange(contractDate.startedAt, contractDate.endedAt);

      const lastday = res[res.length - 1];
      const result = getDateRange(
        dayjs(lastday).add(1, "day").format("YYYY-MM-DD"),
        dayjs(lastday).add(2, "day").format("YYYY-MM-DD")
      );

      firstDate = [...firstDate, res[0]];
      cleanupdays = [...cleanupdays, ...result];
      contractDates = [...contractDates, ...res];
    });
    return { contractDates, firstDate, cleanupdays };
  }

  return (
    <div className="note-container">
      <div className="dates">
        {searchDays.map((item) => (
          <span key={item}>{dayjs(item).format("MM.DD")}</span>
        ))}
      </div>
      {tableData.map((table, tableIdx) => {
        const { contractDates, firstDate, cleanupdays } =
          getContractInfo(table);

        return (
          <div className="date-row" key={table.id}>
            {searchDays.map((date, rowIdx) => {
              // 전체의 idx값
              let gridIdx = tableIdx * searchDays.length + rowIdx;
              // 계약일에 포함되어있는지
              let isIclude = contractDates.includes(date);
              // 계약일중 첫날인지
              let isFirst = firstDate.includes(date);
              // 지금 클릭한 날짜가 계약일에 포함되어있는지
              let isActiveContract =
                activeDates.key === tableIdx &&
                activeDates.dates.includes(date);
              // 계약만료후 이틀의 공실인지
              let isCleanupday = cleanupdays.includes(date);

              return (
                <Item
                  key={gridIdx}
                  gridIdx={gridIdx}
                  isCleanupday={isCleanupday}
                  isFirst={isFirst}
                  isIclude={isIclude}
                />
              );
            })}
          </div>
        );
      })}

      <div>총 함수 실행 {totalIdx}</div>
    </div>
  );
}

export default Page;
