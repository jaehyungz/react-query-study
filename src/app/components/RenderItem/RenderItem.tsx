import React, { createElement } from "react";
import { getDateRange } from "../Calendar/Calendar";
import { tableType } from "@/app/utils/dummy";
import { createRoot, Root } from "react-dom/client";
import dayjs from "dayjs";
import router from "next/router";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  gridIdx: number;
  tableIdx: number;
  dateRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  rootRefs: React.MutableRefObject<(Root | null)[]>;
  table: tableType;
  date: string;
  searchDays: string[];
  isActiveContract: boolean;
  isIclude: boolean;
  isFirst: boolean;
  isCleanupday: boolean;
}

const RenderItem = React.memo(
  ({
    gridIdx,
    tableIdx,
    dateRefs,
    rootRefs,
    table,
    date,
    searchDays,
    isActiveContract,
    isIclude,
    isFirst,
    isCleanupday,
  }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    return (
      <div
        key={`${gridIdx}`}
        // id={`${date}-${tableIdx}`}
        id={`${gridIdx}`}
        ref={(el) => {
          if (el) {
            dateRefs.current[gridIdx] = el;
            rootRefs.current[gridIdx] = createRoot(el);
          }

          // if (gridIdx <= searchDays.length) {
          //   colRoots.current[gridIdx] = createRoot(el!);
          //   return;
          // }
        }}
        className={`date-item
${
  isActiveContract
    ? "active-contract"
    : isIclude
    ? isFirst
      ? "start"
      : "color"
    : isCleanupday
    ? "cleanup-day"
    : ""
}
`}
        onClick={(e) => {
          //초기화
          // removeHoverBox("all");
          // removeClass("active-contract");

          // 계약정보의 idx찾기
          const findIndex = table.contractDates.findIndex((contractDate) =>
            getDateRange(contractDate.startedAt, contractDate.endedAt).includes(
              date
            )
          );
          // 계약 정보가 있다면
          if (findIndex >= 0) {
            const res = getDateRange(
              table.contractDates[findIndex].startedAt,
              table.contractDates[findIndex].endedAt
            );

            const firstDayIdx = searchDays.findIndex(
              (day) => day === table.contractDates[findIndex].startedAt
            );

            const firstDateElement =
              dateRefs.current[tableIdx * searchDays.length + firstDayIdx];

            if (firstDateElement) {
              const root = createRoot(firstDateElement);
              const contents = createElement(
                "div",
                {
                  className: "active-box",
                  style: {
                    width: `${40 * res.length + 2 * res.length - 2}px`,
                  },
                },
                [
                  createElement(
                    "div",
                    {
                      className:
                        tableIdx <= 2 ? "overlay-bottom" : "overlay-top",
                    },
                    [
                      createElement("div", { className: "text-tooltip" }, [
                        createElement(
                          "strong",
                          null,
                          `${table.unitId} ${table.unitName}`
                        ),
                        createElement(
                          "p",
                          null,
                          `${dayjs(res[0]).format("YY.MM.DD")} ~ ${dayjs(
                            res[res.length - 1]
                          ).format("YY.MM.DD")}`
                        ),

                        createElement("strong", null, `${table.name}`),
                      ]),
                      createElement(
                        "button",
                        {
                          onClick: () => {
                            router.push(
                              `${pathname}/${table.unitId}-${table.contractDates[findIndex].startedAt}`
                            );
                          },
                        },
                        "상세"
                      ),
                    ]
                  ),
                ]
              );

              root.render(contents);
            }

            // const box = document.createElement("div");
            // const textContent = document.createElement("div");

            // const div = firstDateElement?.appendChild(box);

            // div?.classList.add("active-box");
            // box.style.width = `${
            //   40 * res.length + 2 * res.length - 2
            // }px`;

            // const content = box.appendChild(textContent);
            // if (tableIdx <= 2) {
            //   content.classList.add("overlay-bottom");
            // } else {
            //   content.classList.add("overlay-top");
            // }

            // content.innerHTML = `<div class="text-tooltip"><strong>${
            //   table.unitId
            // } ${table.unitName}</strong><p>${dayjs(res[0]).format(
            //   "YY.MM.DD"
            // )} ~ ${dayjs(res[res.length - 1]).format(
            //   "YY.MM.DD"
            // )}</p><strong>${
            //   table.name
            // }<strong></div><button id="detail-btn">상세</button>`;

            // content.addEventListener("click", () => {
            //   router.push(
            //     `${pathname}/${table.unitId}-${table.contractDates[findIndex].startedAt}`
            //   );
            // });

            const allIdxs = res.map((a) => {
              const re = searchDays.findIndex((b) => b === a);

              return tableIdx * searchDays.length + re;
            });

            allIdxs.map((currentIdx) =>
              dateRefs.current[currentIdx]?.classList.add("active-contract")
            );
          }
        }}
      ></div>
    );
  }
);

export default RenderItem;
