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
import { format, getWeek, orderByRepeat, removeDuplicates } from "@/util/tool";
import StackBadge from "./StackBadge";

const tagIcon: any = {
  undefined: "▷",
  "": "▷",
  rest: "☕",
  study: "📖",
  book: "📕",
  post: "📑",
  alert: "📢",
  1: "🥇",
  2: "🥈",
  3: "🥉",
  fix: "🔧",
  edit: "🔧",
  idea: "💡",
  "!": "❗",
  important: "❗",
  know: "❗",
  how: "❓",
  "?": "❓",
  what: "❓",
  check: "✅",
  cancel: "❎",
  prj: "🔮",
  project: "🔮",
  home: "🏠",
  money: "💸",
};

const now = new Date();

let weeks = 0;

function ServerDay(
  props: PickersDayProps<Dayjs> & {
    highlightedDays?: {
      [k: string]: {
        [k: string]: {
          [k: string]: { [k: string]: string | boolean | number }[];
        };
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
  const isRepeat = repeatDays.find((item: any) => {
    const baseTime = new Date(item.time as string);

    if (item.repeat && !props.outsideCurrentMonth) {
      if (!props.outsideCurrentMonth && props.day.day() === 0) {
        weeks += 1;
      }
      if (
        (item.repeatDayOfWeek as unknown as number[]).includes(
          getWeek(year, month + 1, date)
        ) &&
        item.repeatDay?.some(
          (day: any) => day === props.day.day()
        ) /* === props.day.day() */
      ) {
        return item;
      } else if (
        item.repeatDay &&
        (item.repeatDay as number) > -1 &&
        !Boolean((item.repeatDayOfWeek as unknown as number[])?.length) &&
        item.repeatDay?.some(
          (day: any) => day === props.day.day()
        ) /* === props.day.day() */
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

  const relevantTodos = [];

  !props.outsideCurrentMonth &&
    Boolean(pickTodo) &&
    pickTodo &&
    relevantTodos.push(...pickTodo);
  isRepeat && relevantTodos.push(isRepeat);

  const tags = removeDuplicates(
    orderByRepeat(relevantTodos).map(
      (todo: { tag: string }) => tagIcon[todo.tag as string]
    ) as string[]
  );

  return (
    <Badge
      key={props.day.toString()}
      overlap='circular'
      badgeContent={
        isRepeat || isSelected ? <StackBadge list={tags} /> : undefined
      }
      sx={{
        ".MuiBadge-badge": {
          pointerEvents: "none",
        },
      }}>
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
        sx={{
          "&.Mui-selected": {
            backgroundColor: (theme) => theme.palette.primary.main + "56",
            "&:hover, &:focus, &:active": {
              backgroundColor: (theme) => theme.palette.primary.main + "a6",
            },
          },
        }}
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
  const [todos, setTodos] = useState([]);
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

  const handleDate = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();

    setDate(() => dayjs(`${year}-${month}-${date}`));
  };

  const getFilteredTodos = () => {
    const commonTodos = (todoStorage as any)[calInfo.y]?.[calInfo.m]?.[
      calInfo.d
    ]?.filter((item: any) => !item.repeat);

    const repeatTodos = repeatDays.filter((item: any) => {
      const baseTime = new Date(item.time as string);
      const clickTime = new Date(
        Number(calInfo.y),
        Number(calInfo.m),
        Number(calInfo.d)
      );
      if (item.repeat) {
        if (
          item.repeatDay?.some(
            (day: any) => day === clickTime.getDay()
          ) /*  === clickTime.getDay() */ &&
          (item.repeatDayOfWeek as unknown as number[]).includes(
            getWeek(Number(calInfo.y), Number(calInfo.m) + 1, Number(calInfo.d))
          )
        ) {
          return true;
        } else if (
          item.repeatDay?.some(
            (day: any) => day === clickTime.getDay()
          ) /*  === clickTime.getDay() */ &&
          !Boolean((item.repeatDayOfWeek as unknown as number[]).length)
        ) {
          return true;
        } else if (
          item.repeatDayOfMonth &&
          String(baseTime.getDate()) === calInfo.d
        ) {
          return true;
        } else if (
          item.repeatDayOfYear &&
          String(baseTime.getMonth()) === calInfo.m &&
          String(baseTime.getDate()) === calInfo.d
        ) {
          return true;
        }
      }
      if ((item.due || 1) > 1) {
      }
      return false;
    });
    const isEmptyCommon = (commonTodos?.length || 0) === 0;
    const isEmptyRepeat = (repeatTodos?.length || 0) === 0;

    if (isEmptyCommon) {
      return repeatTodos;
    } else {
      return commonTodos.concat(...repeatTodos);
    }
  };

  useEffect(() => {
    setTodos(getFilteredTodos());
  }, [calInfo]);

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
    <Stack
      direction={{ sm: "column", md: "row" }}
      gap={3}
      justifyContent='center'
      alignItems='center'>
      {date && (
        <>
          <Box
            sx={{
              "& .MuiDayCalendar-header": {
                "& > .MuiTypography-root": {
                  color: (theme) => theme.palette.text.primary,
                  fontWeight: 700,
                },
                "& > .MuiTypography-root:last-child": {
                  color: "red",
                },
                "& > .MuiTypography-root:first-of-type": {
                  color: "blue",
                },
              },
            }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar
                value={date as dayjs.Dayjs}
                onYearChange={() => {
                  weeks = 0;
                }}
                onMonthChange={() => {
                  weeks = 0;
                }}
                onChange={(newValue) => {
                  weeks = 0;
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
          <Stack
            gap={1}
            sx={{
              width: 300,
            }}>
            <Stack
              direction='row'
              gap={1}
              sx={{
                fontWeight: 700,
                fontSize: (theme) => theme.typography.pxToRem(24),
              }}>
              <Chip
                color={"primary"}
                label={`✅${counter.done}`}
                size='small'
              />
              <Chip
                color={"primary"}
                label={`❌${counter.cancel}`}
                size='small'
              />
              <Chip
                color={"primary"}
                label={`❓${counter.total - counter.done - counter.cancel}`}
                size='small'
              />
              <Chip
                color={"primary"}
                label={`📜${counter.total}`}
                size='small'
              />
            </Stack>
            <Typography
              fontWeight={700}
              fontSize={(theme) => theme.typography.pxToRem(18)}>
              {(date as Dayjs)?.format("YYYY. MM. DD dddd")}
            </Typography>
            <Stack
              gap={1}
              fontWeight={200}
              fontSize={(theme) => theme.typography.pxToRem(14)}
              sx={{
                flex: 1,
                minHeight: 140,
                height: 140,
                maxHeight: 140,
                my: 1,
                py: 2,
                borderTop: "1px solid #565656",
                borderBottom: "1px solid #565656",
                overflowY: "auto",
              }}>
              {
                /* ((todoStorage as any)[calInfo.y]?.[calInfo.m]?.[
                    calInfo.d
                  ]?.every((item: any) => !item.repeat) && */
                todos.length > 0 ? (
                  orderByRepeat(todos).map((item: any, q: number) => (
                    <Typography
                      key={q}
                      component='div'
                      fontSize={(theme) => theme.typography.pxToRem(14)}
                      sx={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}>
                      {tagIcon[item.tag]} {item.todo}
                      {item.repeat ? `(♻️ 반복일정) ` : ""}
                      <br />
                      <Box
                        component='span'
                        sx={{
                          fontSize: (theme) => theme.typography.pxToRem(6),
                          backgroundColor: (theme) =>
                            theme.palette.text.primary,
                          color: (theme) => theme.palette.background.paper,
                          px: 0.8,
                          py: 0.3,
                          borderRadius: 10,
                        }}>
                        {format(new Date(item.time), "YY-MM-dd AP HH:mm", true)}
                      </Box>
                    </Typography>
                  ))
                ) : (
                  <Typography
                    component='div'
                    fontSize={(theme) => theme.typography.pxToRem(14)}>
                    등록된 일정이 없습니다 😉
                  </Typography>
                )
              }
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
