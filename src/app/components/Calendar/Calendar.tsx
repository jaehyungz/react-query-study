// "use client";
import React, {
  createElement,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./style.css";
import dayjs from "dayjs";
import { tableData, tableType } from "@/app/utils/dummy";
import { usePathname, useRouter } from "next/navigation";
import { createRoot, Root } from "react-dom/client";
import RoomItem from "../RoomItem";
interface Props {
  startedAt: string;
  endedAt: string;
}

export const getDateRange = (startDate: string, endDate: string) => {
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

function Calendar(props: Props) {
  const {} = props;

  const scrollDivRef = useRef<HTMLDivElement | null>(null);

  const dateRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeDates, setActiveDates] = useState<{
    dates: string[];
    key: number;
  }>({
    dates: [],
    key: -1,
  });

  const [currentEmptyRoom, setCurrentEmptyRoom] = useState({
    date: "",
    key: -1,
  });

  const getSearchDays = useCallback(() => {
    return {
      searchDays: getDateRange(props.startedAt, props.endedAt),
    };
  }, [props.startedAt, props.endedAt]);

  const { searchDays } = getSearchDays();

  const fullWidth = useMemo(() => {
    const res = 40 * searchDays.length + 4 * (searchDays.length - 1);

    return res;
  }, [searchDays.length]);

  // useEffect(() => {
  //   dateRefs.current = dateRefs.current.slice(
  //     0,
  //     tableData.length * searchDays.length
  //   );
  // }, [tableData, searchDays]);

  const [isReady, setIsReady] = useState(true);

  useEffect(() => {
    const full = scrollDivRef.current?.scrollWidth;
    // scrollDivRef.current?.scrollTo({
    //   behavior: "smooth",
    //   left: 40 * 14,
    // });
  }, []);

  const [dateKey, setDateKey] = useState(-1);

  const getFirstDays = () => {
    const res = getDateRange(props.startedAt, props.endedAt);

    const firstDays = res.filter((item) => dayjs(item).format("DD") === "01");

    return firstDays;
  };

  // 글로벌 유틸함수 -----------------------------

  const removeHoverBox = () => {
    setDateKey(-1);
  };

  const resetActiveBox = () => {
    setCurrentEmptyRoom({
      date: "",
      key: -1,
    });
    setActiveDates({ dates: [], key: -1 });

    const activeContract = document.querySelectorAll(".active-contract");
    activeContract.forEach((item) => {
      item.classList.toggle("active-contract");
    });
  };

  const handleClickDate = (date: string, idx: number) => () => {
    resetActiveBox();

    setDateKey(idx);

    console.log(date);
    console.log(idx);
  };

  // const handleClickUnit = (idx: number) => () => {
  //   //전에 클릭한 호실을 다시 클릭할때

  //   const el = document.querySelector(`.idx-${idx}`);
  //   const visible = document.querySelector(".row-visible");

  //   if (visible) {
  //     console.log("이미있는애들만");
  //     visible.remove();

  //     // visible.forEach((a) => {
  //     //   console.log();
  //     //   a.remove();
  //     // });
  //   }

  //   if (el) {
  //     console.log("토글");
  //   }

  //   const findIdx = idx * searchDays.length;
  //   // const hoverBox = dateRefs.current[findIdx];

  //   // if (hoverBox) {
  //   //   const root = createRoot(hoverBox);

  //   //   const contents = createElement("div", {
  //   //     className: `row-hover-box row-visible idx-${idx}`,
  //   //     style: {
  //   //       width: `${fullWidth}px`,
  //   //     },
  //   //   });

  //   //   root.render(contents);
  //   // }
  // };

  const handleScroll = () => {};

  const handleClick = (
    dates: string[],
    tableIdx: number,
    isEmpty?: boolean
  ) => {
    if (isEmpty) {
      setCurrentEmptyRoom({
        date: dates[0],
        key: tableIdx,
      });
      return;
    }
    if (activeDates.key === tableIdx && activeDates.dates[0] === dates[0])
      return;
    setActiveDates({
      dates,
      key: tableIdx,
    });
  };
  return (
    <>
      <button onClick={handleScroll}>스크롤 이동</button>

      <div className="calendar-container">
        <div className="unit">
          <div />
          {tableData.map((item, idx) => {
            return (
              <div key={item.id}>
                <strong>{item.unitName}</strong>
              </div>
            );
          })}
        </div>
        <div className="date" ref={scrollDivRef}>
          <div className="date-row">
            {searchDays.map((item, idx) => {
              const firstDays = getFirstDays();

              let isFirst = idx === 0 ? true : firstDays.includes(item);
              return (
                <div
                  key={item}
                  className={`date-item date-view ${isFirst ? "first" : ""}`}
                  onClick={handleClickDate(item, idx)}
                >
                  {isFirst ? (
                    <strong>{dayjs(item).format("M")}월</strong>
                  ) : (
                    <></>
                  )}

                  <span>{dayjs(item).format("DD")}</span>
                </div>
              );
            })}
          </div>
          {tableData.map((table, tableIdx) => {
            let contractDates: string[] = [];
            let firstDate: string[] = [];
            let cleanupdays: string[] = [];
            let currentDate: string[] = [];

            table.contractDates.map((contractDate) => {
              const res = getDateRange(
                contractDate.startedAt,
                contractDate.endedAt
              );

              const lastday = res[res.length - 1];
              const result = getDateRange(
                dayjs(lastday).add(1, "day").format("YYYY-MM-DD"),
                dayjs(lastday).add(2, "day").format("YYYY-MM-DD")
              );

              firstDate = [...firstDate, res[0]];
              cleanupdays = [...cleanupdays, ...result];
              contractDates = [...contractDates, ...res];
            });

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
                    <RoomItem
                      key={gridIdx}
                      gridIdx={gridIdx}
                      rowIdx={rowIdx}
                      tableIdx={tableIdx}
                      searchDays={searchDays}
                      dateKey={dateKey}
                      table={table}
                      date={date}
                      isIclude={isIclude}
                      isFirst={isFirst}
                      isActiveContract={isActiveContract}
                      isCleanupday={isCleanupday}
                      isEmpty={
                        tableIdx === currentEmptyRoom.key &&
                        currentEmptyRoom.date === date
                      }
                      handleResetCol={removeHoverBox}
                      onClick={handleClick}
                      handleResetActive={resetActiveBox}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default memo(Calendar);
