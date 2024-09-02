import { tableData } from "@/app/utils/dummy";
import React, { useState } from "react";

interface Props {
  startedAt: string;
  endedAt: string;
  active: boolean;
}

const ListComponents = ({ startedAt, endedAt, active }: Props) => {
  return (
    <li style={{ backgroundColor: active ? "red" : "transparent" }}>
      -----{startedAt}~{endedAt}
    </li>
  );
};

const MemoListComponents = React.memo(ListComponents);

function RenderComponent(props: Props) {
  const {} = props;
  const [state, setState] = useState(-1);

  return (
    <div>
      <h1>idx:{state}</h1>

      {tableData.map((item, idx) => {
        return (
          <div onClick={() => setState(idx)} key={idx}>
            {item.unitId}
            <ul>
              {item.contractDates.map((item, idx) => {
                return (
                  <>
                    <MemoListComponents
                      key={idx}
                      startedAt={item.startedAt}
                      endedAt={item.endedAt}
                      active={state === idx}
                    />
                    {/* <ListComponents
                      key={idx}
                      startedAt={item.startedAt}
                      endedAt={item.endedAt}
                    /> */}
                  </>
                );
              })}
            </ul>
          </div>
        );
      })}
      <br />
    </div>
  );
}

export default RenderComponent;
