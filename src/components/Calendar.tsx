import todoStorage from "@/todos/list.json";
import { Badge, Box, Button, Chip, Stack, Typography } from "@mui/material";
import {
  DateCalendar,
  DayCalendarSkeleton,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { memo, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const tagIcon: any = {
  undefined: "▷",
  "": "▷",
  rest: "☕",
  study: "📖",
  alert: "📢",
  1: "🥇",
  2: "🥈",
  3: "🥉",
  edit: "🔧",
  idea: "💡",
  know: "❗",
  how: "❓",
  check: "✅",
  cancel: "❎",
  prj: "🔮",
};

const now = new Date();

function ServerDay(
  props: PickersDayProps<Dayjs> & {
    highlightedDays?: {
      [k: string]: {
        [k: string]: { [k: string]: string | boolean | number }[];
      };
    };
    flatLists?: { [k: string]: string | boolean | number }[];
  }
) {
  const {
    flatLists = [],
    highlightedDays = {},
    day,
    outsideCurrentMonth,
    ...other
  } = props;

  const year = props.day.year();
  const month = props.day.month();
  const date = props.day.date();

  const repeatDays = flatLists.filter((item: any) => item.repeat);

  const pickTodo = highlightedDays[year]?.[month]?.[date];
  const isSelected = !props.outsideCurrentMonth && Boolean(pickTodo);
  const isRepeat = repeatDays.find((item) => {
    const baseTime = new Date(item.time as string);
    if (item.repeat && !props.outsideCurrentMonth) {
      if (
        item.repeatDay &&
        (item.repeatDay as number) > -1 &&
        item.repeatDay === props.day.day()
      ) {
        return item;
      } else if (
        item.repeatDayOfYear &&
        baseTime.getMonth() === month &&
        baseTime.getDate() === date
      ) {
        return item;
      } else if (item.repeatDayOfMonth && baseTime.getDate() === date) {
        return item;
      }
    }
    return false;
  });

  return (
    <Badge
      key={props.day.toString()}
      overlap='circular'
      badgeContent={isRepeat || isSelected ? "🌟" : undefined}>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

const flatLists = Object.values(todoStorage)
  .flatMap((mon) =>
    Object.values(mon)
      .flatMap((day) => Object.values(day))
      .flat(1)
  )
  .flat(2);
const repeatDays = flatLists.filter((item: any) => item.repeat);

function Calendar() {
  const [date, setDate] = useState<string | dayjs.Dayjs | null>(null);
  const [todo, setTodo] = useState([]);
  const [highlightedDays, setHighlightedDays] = useState({});
  const [calInfo, setCalInfo] = useState({
    y: "0",
    m: "0",
    d: "0",
  });
  const [counter, setCounter] = useState({
    done: 0,
    cancel: 0,
    total: 0,
  });

  // let doneCount = 0;
  // let cancelCount = 0;
  // let totalCount = 0;

  const handleDate = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    setDate(() => dayjs(`${year}-${month}-${date}`));
  };

  useEffect(() => {
    handleDate(new Date());

    setHighlightedDays(todoStorage);

    setCounter({
      done: flatLists.filter((d: any) => d.tag === "check").length,
      cancel: flatLists.filter((d: any) => d.tag === "cancel").length,
      total: flatLists.length,
    });

    setCalInfo(() => ({
      y: String(new Date().getFullYear()),
      m: String(new Date().getMonth()),
      d: String(new Date().getDate()),
    }));

    return () => {
      setCounter(() => ({ done: 0, cancel: 0, total: 0 }));
      setDate(() => null);
      setCalInfo(() => ({
        y: "0",
        m: "0",
        d: "0",
      }));
    };
  }, []);

  const handleToday = () => {
    setDate(
      dayjs(`${now.getFullYear()}=${now.getMonth() + 1}-${now.getDate()}`)
    );
    setCalInfo(() => ({
      y: String(new Date().getFullYear()),
      m: String(new Date().getMonth()),
      d: String(new Date().getDate()),
    }));
  };

  return (
    <Stack direction={{ sm: "column", md: "row" }}>
      {date && (
        <>
          <Box>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={date as dayjs.Dayjs}
                onChange={(newValue) => {
                  // console.log(newValue);
                  newValue && setDate((date) => newValue);
                  setCalInfo(() => ({
                    y: String(newValue?.year() || new Date().getFullYear()),
                    m: String(newValue?.month() || new Date().getMonth()),
                    d: String(newValue?.date() || new Date().getDate()),
                  }));
                }}
                renderLoading={() => <DayCalendarSkeleton />}
                slots={{
                  day: ServerDay,
                }}
                slotProps={{
                  day: {
                    highlightedDays,
                    flatLists,
                  } as any,
                }}
              />
            </LocalizationProvider>
          </Box>
          <Stack gap={1} sx={{ flex: 1 }}>
            <Stack
              direction='row'
              gap={1}
              sx={{
                fontWeight: 700,
                fontSize: (theme) => theme.typography.pxToRem(24),
              }}>
              <Chip color='primary' label={`✅${counter.done}`} size='small' />
              <Chip
                color='primary'
                label={`❌${counter.cancel}`}
                size='small'
              />
              <Chip
                color='primary'
                label={`❓${counter.total - counter.done - counter.cancel}`}
                size='small'
              />
              <Chip color='primary' label={`📜${counter.total}`} size='small' />
            </Stack>
            <Typography
              fontWeight={700}
              fontSize={(theme) => theme.typography.pxToRem(24)}>
              {(date as Dayjs)?.format("YYYY. MM. DD / ddd")}
            </Typography>
            <Stack sx={{ flex: 1 }}>
              <Typography
                component='div'
                fontWeight={200}
                fontSize={(theme) => theme.typography.pxToRem(14)}>
                {(todoStorage as any)[calInfo.y]?.[calInfo.m]?.[calInfo.d]?.map(
                  (item: any, q: number) => (
                    <Typography key={q} component='div'>
                      [{tagIcon[item.tag]}] {item.todo}
                    </Typography>
                  )
                ) || (
                  <Typography component='div'>
                    등록된 일정이 없습니다 😉
                  </Typography>
                )}
              </Typography>
            </Stack>
            <Box>
              <Button variant='outlined' color='success' onClick={handleToday}>
                Today
              </Button>
            </Box>
          </Stack>
        </>
      )}
    </Stack>
  );
}

export default memo(Calendar);
