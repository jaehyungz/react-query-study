"use client";
import React, {
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
interface Props {
  startedAt: string;
  endedAt: string;
}

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

function Calendar(props: Props) {
  console.log("!");
  const {} = props;
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const [hoverKeyIndex, setHoverKeyIndex] = useState("");
  const [currentRowIdx, setCurrentRowIdx] = useState<number | undefined>(
    undefined
  );

  const getSearchDays = useCallback(() => {
    return {
      searchDays: getDateRange(props.startedAt, props.endedAt),
    };
  }, []);

  const { searchDays } = getSearchDays();

  // const [selectDays,]

  // const itemRef = useRef<any>();

  // const useRefs = () => {
  //   const refsByKey = useRef<Record<string, HTMLElement | null>>({});

  //   const setRef = (element: HTMLElement | null, key: string) => {
  //     refsByKey.current[key] = element;
  //   };

  //   return { refsByKey: refsByKey.current, setRef };
  // };

  // const { refsByKey, setRef } = useRefs();
  // const refs = Object.values(refsByKey).filter(Boolean);

  const [isReady, setIsReady] = useState(true);

  // 글로벌 유틸함수

  const debounce = <T extends (...args: any[]) => any>(
    fn: T,
    delay: number
  ) => {
    let timeout: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>): ReturnType<T> => {
      let result: any;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        result = fn(...args);
      }, delay);
      return result;
    };
  };

  const getFirstDays = () => {
    const res = getDateRange(props.startedAt, props.endedAt);

    const firstDays = res.filter((item) => dayjs(item).format("DD") === "01");

    return firstDays;
  };

  // 글로벌 유틸함수 -----------------------------

  const removeHoverBox = (target: "all" | "row" | "col") => {
    const hoverBoxes = {
      col: document.querySelector(".col-visible"),
      row: document.querySelector(".row-visible"),
    };

    const setClass = (box: Element | null) => {
      box?.setAttribute("class", "col-hover-box");
    };

    if (target === "row") setCurrentRowIdx(undefined);

    if (target === "all") {
      Object.values(hoverBoxes).forEach(setClass);
    } else {
      setClass(hoverBoxes[target]);
    }
  };

  const fullWidth = useMemo(() => {
    // console.log(a);
    const res = 40 * searchDays.length + 2 * (searchDays.length - 1);

    return res;
  }, [searchDays.length]);

  const currentWidth = useMemo(() => {}, []);

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

  const handleClickDate = (date: string) => () => {
    removeHoverBox("col");

    const hoverBox = document.getElementById(`${date}-0`)?.children.item(0);
    const dateTooltip = hoverBox?.children.item(0);

    hoverBox?.setAttribute("class", "col-hover-box col-visible");
    hoverBox?.setAttribute(
      "style",
      `height: ${40 * tableData.length + 8 * (tableData.length - 1)}px;`
    );

    if (date === props.startedAt)
      dateTooltip?.setAttribute(
        "style",
        `transform: translateX(0px); left:0px;`
      );

    if (date === props.endedAt)
      dateTooltip?.setAttribute(
        "style",
        `transform: translateX(0px); left:unset; right:0px;`
      );

    removeClass("active-contract");
    return false;
  };

  const handleClickUnit = (idx: number) => () => {
    //전에 클릭한 호실을 다시 클릭할때
    if (currentRowIdx === idx) return removeHoverBox("row");

    removeHoverBox("row");

    setCurrentRowIdx(idx);

    const dataLength = searchDays.length;

    const hoverBox = document
      .getElementById(`${props.startedAt}-${idx}`)
      ?.children.item(1);
    // asd(dataLength);

    hoverBox?.setAttribute("class", "row-hover-box row-visible");
    hoverBox?.setAttribute(
      "style",
      // `width:${40 * dataLength + 2 * (dataLength - 1)}px`
      `width:${fullWidth}px`
    );
  };

  // useMemo(() => {
  //   const select = document.getElementById(`${hoverKeyIndex}-${0}`)?.children;

  //   select?.item(0)?.setAttribute("class", "hover-box visible");

  //   // select && select.style
  //   // const mask = document.createElement("div");
  //   // const appendMask = select?.appendChild(mask);

  //   // appendMask?.classList.add("hover-box");

  //   // mask.style.height = `${40 * tableData.length + 8 * tableData.length - 2}px`;

  //   // console.log(hoverKeyIndex.length ? "없음" : hoverKeyIndex);
  // }, [hoverKeyIndex]);

  // const handleOnMouseOver = (isIclude: boolean, date: string) => {
  //   console.log("over");
  // console.log(hoverKeyIndex, "over");
  // if (hoverKeyIndex.length) return;
  // setHoverKeyIndex(date);

  // const select = document.getElementById(`${date}-${0}`);

  // const mask = document.createElement("div");
  // const appendMask = select?.appendChild(mask);

  // appendMask?.classList.add("hover-box");

  // mask.style.height = `${40 * tableData.length + 8 * tableData.length - 2}px`;
  // };
  // const handleOnMouseOut = (date: string) => {
  //   console.log("out");
  // console.log(hoverKeyIndex, "out");

  // setHoverKeyIndex('')
  // const element = document.querySelector(".hover-box");
  // element?.remove();
  // element.forEach((el) => el.remove());
  // setHoverKeyIndex("");
  // element.forEach((val) => val.remove());
  // };

  // const debouncedOnMouseOver = debounce<typeof handleOnMouseOver>(
  //   handleOnMouseOver,
  //   0
  // );
  // const debouncedOnMouseOut = debounce<typeof handleOnMouseOut>(
  //   handleOnMouseOut,
  //   0
  // );

  return (
    <>
      {/* <button onClick={handleScroll}>스크롤 이동</button> */}

      <div className="calendar-container">
        <div className="unit">
          <div />
          {tableData.map((item, idx) => {
            return (
              <div key={item.id} onClick={handleClickUnit(idx)}>
                <strong>{item.unitName}</strong>
              </div>
            );
          })}
        </div>
        <div className="date" ref={scrollDivRef}>
          <div className="date-row">
            {/* {getDateRange(props.startedAt, props.endedAt).map((item, idx) => { */}
            {searchDays.map((item, idx) => {
              const firstDays = getFirstDays();

              let isFirst = idx === 0 ? true : firstDays.includes(item);
              return (
                <div
                  key={item}
                  className={`date-item date-view ${isFirst ? "first" : ""}`}
                  onClick={handleClickDate(item)}
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
            return (
              <div className="date-row" key={table.id}>
                {searchDays.map((date, rowIdx) => {
                  let temp: string[] = [];
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
                    temp = [...temp, ...res];
                  });

                  // 계약일에 포함되어있는지
                  let isIclude = temp.includes(date);
                  // 계약일중 첫날인지
                  let isFirst = firstDate.includes(date);
                  // 지금 클릭한 날짜가 계약일에 포함되어있는지
                  let isActiveContract = currentDate.includes(date);
                  // 계약만료후 이틀의 공실인지
                  let isCleanupday = cleanupdays.includes(date);

                  return (
                    <div
                      key={`${date}-${tableIdx}`}
                      id={`${date}-${tableIdx}`}
                      className={`date-item
                        ${
                          isReady
                            ? isActiveContract
                              ? "active-contract"
                              : isIclude
                              ? isFirst
                                ? "start"
                                : "color"
                              : isCleanupday
                              ? "cleanup-day"
                              : ""
                            : ""
                        }
                    `}
                      onClick={(e) => {
                        removeHoverBox("all");
                        removeClass("active-contract");
                        const findIndex = table.contractDates.findIndex(
                          (contractDate) =>
                            getDateRange(
                              contractDate.startedAt,
                              contractDate.endedAt
                            ).includes(date)
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
                                const textContent =
                                  document.createElement("div");

                                const div = element?.appendChild(box);
                                div?.classList.add("active-box");

                                box.style.width = `${
                                  40 * res.length + 2 * res.length - 2
                                }px`;

                                const content = box.appendChild(textContent);

                                if (tableIdx <= 2) {
                                  content.classList.add("overlay-bottom");
                                } else {
                                  content.classList.add("overlay-top");
                                }
                                content.addEventListener("click", () => {
                                  router.push(
                                    `${pathname}/${table.unitId}-${table.contractDates[findIndex].startedAt}`
                                  );
                                });

                                content.innerHTML = `<div><strong>${
                                  table.unitId
                                } ${table.unitName}</strong><p>${dayjs(
                                  res[0]
                                ).format("YY.MM.DD")} ~ ${dayjs(
                                  res[res.length - 1]
                                ).format("YY.MM.DD")}</p><strong>${
                                  table.name
                                }<strong></div><button id="detail-btn">상세</button>`;
                              }

                              const element = document.getElementById(
                                `${item}-${tableIdx}`
                              );
                              element?.classList.add("active-contract");
                            });
                          }
                        }
                      }}
                    >
                      <div
                        className="col-hover-box"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeHoverBox("col");
                        }}
                      >
                        <div className="date-tooltip">
                          {dayjs(date).format("YY.MM.DD")}
                        </div>
                      </div>
                      {rowIdx === 0 ? (
                        <div
                          className="row-hover-box"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeHoverBox("row");
                          }}
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <p>rowKey:{currentRowIdx}</p>
    </>
  );
}

export default memo(Calendar);
