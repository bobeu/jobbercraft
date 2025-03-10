import React from "react";

const useTimerConfig = {
  step: 1,
  interval: 100,
};

type TimeState = {
  onTimeTick?(arg0: number): unknown;
  onTimeEnd?(): unknown;
  timer: number;
  startTime: number;
  ellapsedTime: number;
  status: 'RUNNING' | 'IDLE';
};

const initialTimerState: TimeState = {
  timer: 0,
  startTime: 0,
  ellapsedTime: 0,
  status: "IDLE",
  onTimeTick: function (arg0: number): unknown {
    throw new Error("Function not implemented.");
  },
  onTimeEnd: function (): unknown {
    throw new Error("Function not implemented.");
  }
};

export const useTimer = (props: TimeState) => {
  const [timer, setTimer] = React.useState(initialTimerState);

  const handleStopTimer = () => {
    setTimer(initialTimerState);
  };

  const start = React.useCallback(
    (initialTime: number) => {
      if (initialTime && timer.status === "IDLE") {
        const startTime = Date.now();
        setTimer({
          startTime,
          ellapsedTime: 0,
          timer: initialTime,
          status: "RUNNING",
        });
      }
    },
    [timer.status]
  );

  React.useEffect(() => {
    if (timer.status === "RUNNING")
      props?.onTimeTick?.(timer.timer - timer.ellapsedTime);

    if (timer.ellapsedTime >= timer.timer && timer.status === "RUNNING") {
      handleStopTimer();
      props?.onTimeEnd?.();
    }
    // eslint-disable-next-line
  }, [timer]);

  React.useEffect(() => {
    /**
     * @type {number | null}
     */
    let interval: number | null = null;

    if (timer.status === "RUNNING") {
      const { startTime, ...otherProps } = timer;
      interval = window.setInterval(() => {
        setTimer({
          ...otherProps,
          startTime,
          ellapsedTime: Date.now() - startTime,
        });
      }, useTimerConfig.interval);
    } else if (timer.status === "IDLE" && interval) {
      window.clearInterval(interval);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [timer]);

  return { start, stop: handleStopTimer };
};
