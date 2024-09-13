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
import { tableData as data, tableType } from "@/app/utils/dummy";
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

  const [searchDate, setSearchDate] = useState(props);

  const dateRefs = useRef<(HTMLDivElement | null)[]>([]);
  const initialData: tableType[] = [
    {
      id: 0,
      unitId: "",
      unitName: "",
      name: "",
      contractDates: [],
    },
  ];

  const [activeDates, setActiveDates] = useState<{
    dates: string[];
    key: number;
  }>({
    dates: [],
    key: -1,
  });
  const [tableData, setTableData] = useState<tableType[]>(initialData);

  const [currentEmptyRoom, setCurrentEmptyRoom] = useState({
    date: "",
    key: -1,
  });

  const [currentDate, setCurrentDate] = useState({
    date: "",
    key: -1,
  });

  const getSearchDays = useCallback(() => {
    return getDateRange(searchDate.startedAt, searchDate.endedAt);
  }, [searchDate.startedAt, searchDate.endedAt]);

  // const { searchDays } = getSearchDays();
  const searchDays = useMemo(() => getSearchDays(), [getSearchDays]);

  useEffect(() => {
    setTimeout(() => {
      setTableData(data);
    }, 500);
  }, []);

  useEffect(() => {
    //2번렌더의 이유는 객체키값만큼 순회

    setSearchDate(props);
  }, [props]);

  useEffect(() => {
    if (currentDate.key >= -1) removeHoverBox();
  }, [searchDate]);

  // useEffect(() => {
  //   console.log("searchDate바뀜");
  //   // removeHoverBox();
  // }, [searchDate]);

  // useEffect(() => {
  //   dateRefs.current = dateRefs.current.slice(
  //     0,
  //     tableData.length * searchDays.length
  //   );
  // }, [tableData, searchDays]);

  useEffect(() => {
    const full = scrollDivRef.current?.scrollWidth;
    // scrollDivRef.current?.scrollTo({
    //   behavior: "smooth",
    //   left: 40 * 14,
    // });
  }, []);

  // 달의 첫날 가져오기
  const getFirstDays = () => {
    const res = getDateRange(searchDate.startedAt, searchDate.endedAt);
    //TODO:일자기준이 아니라 달의 기준으로 첫날구하기
    const firstDays = res.filter((item) => dayjs(item).format("DD") === "01");

    return firstDays;
  };

  // 날짜 오버레이 지우기
  const removeHoverBox = () => {
    setCurrentDate({
      date: "",
      key: -1,
    });
  };

  //방 클릭시 active값 지우기
  const resetActiveBox = () => {
    setCurrentEmptyRoom({
      date: "",
      key: -1,
    });
    setActiveDates({ dates: [], key: -1 });
  };

  // 날짜 클릭시 콜백
  const handleClickDate = (date: string, idx: number) => () => {
    resetActiveBox();
    setCurrentDate({
      date,
      key: idx,
    });
  };

  // 방클릭시 콜백
  const handleClick = (
    dates: string[],
    tableIdx: number,
    isEmpty?: boolean
  ) => {
    if (isEmpty) {
      if (
        currentEmptyRoom.key === tableIdx &&
        currentEmptyRoom.date === dates[0]
      )
        return;

      console.log("여기까지 오잖아");
      setCurrentEmptyRoom({
        date: dates[0],
        key: tableIdx,
      });
      return;
    }
    // toggle 기능을 위한 로직
    if (activeDates.key === tableIdx && activeDates.dates[0] === dates[0])
      return;
    setActiveDates({
      dates,
      key: tableIdx,
    });
  };

  // row 마다 예약일,예약첫일,청소일 배열 리턴
  function getContractInfo(table: tableType) {
    let contractDates: string[] = [];
    let firstDates: string[] = [];
    let cleanupDays: string[] = [];
    let fakeFirstDates: string[] = [];

    table.contractDates.forEach((contractDate, contractIdx) => {
      const res = getDateRange(contractDate.startedAt, contractDate.endedAt);

      const lastday = res[res.length - 1];
      const result = getDateRange(
        dayjs(lastday).add(1, "day").format("YYYY-MM-DD"),
        dayjs(lastday).add(2, "day").format("YYYY-MM-DD")
      );

      fakeFirstDates = [
        ...fakeFirstDates,
        searchDays.includes(res[0]) ? res[0] : searchDays[0],
      ];
      firstDates = [...firstDates, res[0]];
      cleanupDays = [...cleanupDays, ...result];
      contractDates = [...contractDates, ...res];
    });
    return { contractDates, firstDates, cleanupDays, fakeFirstDates };
  }

  return (
    <>
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
                  className={`date-view ${isFirst ? "first" : ""}`}
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
            const { contractDates, firstDates, cleanupDays, fakeFirstDates } =
              getContractInfo(table);

            return (
              <div className="date-row" key={table.id}>
                {searchDays.map((date, rowIdx) => {
                  // 전체의 idx값
                  let gridIdx = tableIdx * searchDays.length + rowIdx;
                  // 계약일에 포함되어있는지
                  let isIclude = contractDates.includes(date);
                  // 계약일중 첫날인지
                  let isFirst = firstDates.includes(date);
                  // 지금 클릭한 날짜가 계약일에 포함되어있는지
                  let isActiveContract =
                    activeDates.key === tableIdx &&
                    activeDates.dates.includes(date);
                  // 계약만료후 이틀의 공실인지
                  let isCleanupday = cleanupDays.includes(date);

                  let isFakeFirst = fakeFirstDates.includes(date);

                  return (
                    <RoomItem
                      key={gridIdx}
                      gridIdx={gridIdx}
                      rowIdx={rowIdx}
                      tableIdx={tableIdx}
                      searchDays={searchDays}
                      currentDate={currentDate}
                      table={table}
                      date={date}
                      isIclude={isIclude}
                      isFirst={isFirst}
                      isFakeFirst={isFakeFirst}
                      isActiveContract={isActiveContract}
                      isCleanupday={isCleanupday}
                      isEmpty={
                        tableIdx === currentEmptyRoom.key &&
                        currentEmptyRoom.date === date
                      }
                      onClick={handleClick}
                      handleResetCol={removeHoverBox}
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

export default Calendar;
