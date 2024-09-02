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
  dateKey: number;
  //   dateRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  searchDays: string[];
  table: tableType;
  date: string;
  isIclude: boolean;
  isFirst: boolean;
  isActiveContract: boolean;
  isCleanupday: boolean;
  isEmpty: boolean;
  onClick: (dates: string[], tableIdx: number, isEmpty?: boolean) => void;
  handleResetActive: () => void;
  handleResetCol: () => void;
}

function RoomItem({
  gridIdx,
  tableIdx,
  rowIdx,
  dateKey,
  //   dateRefs,
  searchDays,
  table,
  date,
  isIclude,
  isFirst,
  isActiveContract,
  isCleanupday,
  isEmpty,
  onClick,
  handleResetActive,
  handleResetCol,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const renderTooltip = () => {
    const isLeft = rowIdx === 0;
    const isRight = rowIdx === searchDays.length - 1;
    return (
      <div
        className={`col-hover-box ${dateKey === rowIdx ? "col-visible" : ""}`}
      >
        <div
          className={`date-tooltip ${
            isLeft ? "left-tool-tip" : isRight ? "right-tool-tip" : ""
          }`}
        >
          {dayjs(date).format("MM.DD")}
        </div>
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
        <button>상세</button>
      </div>
    );
  };

  const renderEmptyOverlay = () => {
    const isLeft = rowIdx === 0;
    const isRight = rowIdx === searchDays.length - 1;

    if (isLeft) {
      return <div className="empty-overlay"></div>;
    }
    if (isRight) {
      return <div></div>;
    }

    return (
      <div
        className={`empty-overlay ${
          isLeft ? "left-tool-tip" : ""
          //   isLeft ? "left-tool-tip" : isRight ? "right-tool-tip" : ""
        }`}
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

    if (dateKey === rowIdx) {
      className += " focus";
    }

    return className;
  };
  return (
    <div
      key={`${gridIdx}`}
      id={`${gridIdx}`}
      //   ref={(el) => {
      //     dateRefs.current[gridIdx] = el;
      //   }}
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
      {gridIdx <= searchDays.length - 1 ? renderTooltip() : ""}
      {isFirst ? renderOverlay() : ""}
    </div>
  );
}

export default React.memo(RoomItem, (prev, next) => {
  // prev.
  return true;
});
