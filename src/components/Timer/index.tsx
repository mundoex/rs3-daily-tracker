import { useTimer } from 'react-timer-hook';
import { TimerComponent } from './styled';

interface TimerProps{
    className?:string;
    expiryTimestamp:Date;
    onExpire?:()=>void;
}

export function Timer(props:TimerProps) {
  const { expiryTimestamp, onExpire } = props;
  const {
    seconds,
    minutes,
    hours,
    days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({ expiryTimestamp, onExpire });

  return <TimerComponent>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
    </TimerComponent>;
}
