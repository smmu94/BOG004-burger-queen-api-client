// import "./Timekeeper.css";
import { useState } from "react";
import DisplayTime from "./DisplayTime";

const Timekeeper = () => {
  const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [status, setStatus] = useState(0);

  const start = () => {
    run();
    setStatus(1);
    setInterv(setInterval(run, 10));
  };

  let updateMs = time.ms,
    updateS = time.s,
    updateM = time.m,
    updateH = time.h;

  const run = () => {
    if (updateM === 60) {
      updateH++;
      updateM = 0;
    }
    if (updateS === 60) {
      updateM++;
      updateS = 0;
    }
    if (updateMs === 100) {
      updateS++;
      updateMs = 0;
    }
    updateMs++;
    return setTime({ ms: updateMs, s: updateS, m: updateM, h: updateH });
  };

  // const stop = () => {
  //   clearInterval(interv);
  //   setStatus(2);
  // };

  const stop = () => {
    clearInterval(interv);
    setStatus(0);
    // setTime({ ms:0, s:0, m:0, h:0 });
  };

  // const resume = () => start();

  return (
    <div className="clock-holder">
      <div className="stopwatch">
        <DisplayTime time={time} />
      </div>
      <div className="start">
        {status === 0 ? <button onClick={start}>Start</button> : ""}
        {status === 1 ? (
          <div>
            <button onClick={stop}>Stop</button>
            {/* <button onClick={reset}>Reset</button> */}
          </div>
        ) : (
          ""
        )}
        {/* {status === 2 ? (
          <div>
            <button onClick={resume}>Resume</button>
            <button onClick={reset}>Reset</button>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </div>
  );
};

export default Timekeeper;
