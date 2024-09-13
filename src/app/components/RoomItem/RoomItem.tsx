import React, { useEffect, useState } from "react";
import { getDateRange } from "../Calendar/Calendar";
import { tableType } from "@/app/utils/dummy";
import dayjs from "dayjs";
import { usePathname, useRouter } from "next/navigation";
import { createRoot } from "react-dom/client";

interface Props {
  gridIdx: number;
  tableIdx: number;
  rowIdx: number;
  currentDate: { date: string; key: number };
  //   dateRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  searchDays: string[];
  table: tableType;
  date: string;
  isIclude: boolean;
  isFirst: boolean;
  isActiveContract: boolean;
  isCleanupday: boolean;
  isFakeFirst: boolean;
  isEmpty: boolean;
  onClick: (dates: string[], tableIdx: number, isEmpty?: boolean) => void;
  handleResetActive: () => void;
  handleResetCol: () => void;
}

function RoomItem({
  gridIdx,
  tableIdx,
  rowIdx,
  currentDate,
  //   dateRefs,
  searchDays,
  table,
  date,
  isIclude,
  isFirst,
  isFakeFirst,
  isActiveContract,
  isCleanupday,
  isEmpty,
  onClick,
  handleResetActive,
  handleResetCol,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const renderDateTooltip = () => {
    const isLeft = rowIdx === 0;
    const isRight = rowIdx === searchDays.length - 1;

    if (isLeft) {
      return (
        <div
          className={`col-hover-box ${
            currentDate.key === rowIdx ? "col-visible" : ""
          }`}
        >
          <div className={"date-tooltip left-tool-tip"}>
            {dayjs(date).format("YY.MM.DD")}
          </div>
        </div>
      );
    }
    if (isRight) {
      return (
        <div
          className={`col-hover-box ${
            currentDate.key === rowIdx ? "col-visible" : ""
          }`}
        >
          <div className={"date-tooltip right-tool-tip"}>
            {dayjs(date).format("YY.MM.DD")}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`col-hover-box ${
          currentDate.key === rowIdx ? "col-visible" : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();

          handleResetCol();
        }}
      >
        <div className={"date-tooltip"}>{dayjs(date).format("YY.MM.DD")}</div>
      </div>
    );
  };

  const renderOverlay = () => {
    let className = tableIdx <= 2 ? "overlay-bottom" : "overlay-top";

    const findIndex = table.contractDates.findIndex((contractDate) =>
      getDateRange(contractDate.startedAt, contractDate.endedAt).includes(date)
    );

    if (findIndex < 0) {
      return;
    }

    const res = getDateRange(
      table.contractDates[findIndex].startedAt,
      table.contractDates[findIndex].endedAt
    );

    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          router.push(`${pathname}/${table.id}`);
        }}
        className={`${className} ${isActiveContract ? "overlay-visible" : ""}`}
      >
        <div className="text-tooltip">
          <strong>
            {table.unitId} {table.unitName}
          </strong>
          <p>
            {dayjs(res[0]).format("YY.MM.DD")} ~
            {dayjs(res[res.length - 1]).format("YY.MM.DD")}
          </p>

          <strong>{table.name}</strong>
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.33334 15.8331C8.13863 15.8335 7.94993 15.7657 7.8 15.6415C7.62958 15.5002 7.52238 15.2969 7.50206 15.0764C7.48173 14.856 7.54996 14.6365 7.69167 14.4665L11.425 9.99979L7.825 5.52479C7.6852 5.35263 7.61978 5.13184 7.64324 4.91131C7.6667 4.69077 7.7771 4.48869 7.95 4.34979C8.12431 4.19643 8.35469 4.12273 8.58565 4.14646C8.81661 4.17019 9.02719 4.28919 9.16667 4.47479L13.1917 9.47479C13.4444 9.78229 13.4444 10.2256 13.1917 10.5331L9.025 15.5331C8.85545 15.7377 8.59853 15.8491 8.33334 15.8331Z"
            fill="white"
          />
        </svg>
      </div>
    );
  };

  const renderEmptyOverlay = () => {
    const isLeft = rowIdx === 0;
    const isRight = rowIdx === searchDays.length - 1;

    const isTop = tableIdx === 0;

    if (isLeft) {
      return (
        <div
          className={`empty-overlay left-tool-tip ${
            isTop ? "bottom-tool-tip" : ""
          }`}
        >
          {table.unitName}
        </div>
      );
    }
    if (isRight) {
      return (
        <div
          className={`empty-overlay right-tool-tip ${
            isTop ? "bottom-tool-tip" : ""
          }`}
        >
          {table.unitName}
        </div>
      );
    }

    return (
      <div
        className={`empty-overlay ${isTop ? "bottom-tool-tip" : ""}`}
        onClick={(e) => {
          e.stopPropagation();

          handleResetActive();
          console.log("!!");
        }}
      >
        {table.unitName}
      </div>
    );
  };

  const getClassName = () => {
    let className = "date-item";

    if (isIclude) {
      if (isFirst) {
        className += isActiveContract ? " start active-contract" : " start";
      } else {
        className += isActiveContract ? " color active-contract" : " color";
      }
    } else if (isCleanupday) {
      className += isEmpty ? " cleanup-day empty-room" : " cleanup-day";
    } else if (isEmpty) {
      className += " empty-room";
    }

    // if (currentDate.key === rowIdx) {
    if (currentDate.date === date) {
      className += " focus";
    }

    return className;
  };
  return (
    <div
      key={`${gridIdx}`}
      id={`${gridIdx}`}
      className={getClassName()}
      onClick={(e) => {
        handleResetActive();
        handleResetCol();

        // 계약정보의 idx찾기
        const findIndex = table.contractDates.findIndex((contractDate) =>
          getDateRange(contractDate.startedAt, contractDate.endedAt).includes(
            date
          )
        );

        //계약정보가 있다면
        if (findIndex >= 0) {
          const res = getDateRange(
            table.contractDates[findIndex].startedAt,
            table.contractDates[findIndex].endedAt
          );

          onClick(res, tableIdx);
        } else {
          onClick([date], tableIdx, true);
        }
      }}
    >
      {isEmpty ? renderEmptyOverlay() : ""}
      {gridIdx <= searchDays.length - 1 ? renderDateTooltip() : ""}
      {isFakeFirst ? renderOverlay() : ""}
    </div>
  );
}

export default React.memo(RoomItem, (prev, next) => {
  // prev.
  // return true;
  return false;
  // return next.currentDate.key === -1 ? true : false;
});
