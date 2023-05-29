import todoStorage from "@/todos/list.json";
import { Box, Button, Stack, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { memo, useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

const tagIcon = {
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

function Calendar() {
  const [date, setDate] = useState<string | dayjs.Dayjs | null>(null);
  const [todo, setTodo] = useState([]);

  let doneCount = 0;
  let cancelCount = 0;
  let totalCount = 0;

  const handleDate = (newDate: Date) => {
    const year = newDate.getFullYear();
    const month = newDate.getMonth() + 1;
    const date = newDate.getDate();
    setTodo((todoStorage as any)?.[year]?.[month]?.[date]);
    setDate(dayjs(`${year}-${month}-${date}`));
  };

  useEffect(() => {
    handleDate(new Date());
  }, []);

  // Object.values(todoStorage).forEach((year) =>
  //   Object.values(year).forEach((month) =>
  //     Object.values(month).forEach((date: any) => {
  //       date.forEach((date: any) => {
  //         if (date.tag === "check") {
  //           doneCount += 1;
  //         } else {
  //           if (date.tag === "cancel" || date.tag === "rest") {
  //             cancelCount += 1;
  //           }
  //         }
  //       });
  //       totalCount += date.length;
  //     })
  //   )
  // );

  const handleToday = () => {
    setDate(
      dayjs(`${now.getFullYear()}=${now.getMonth() + 1}-${now.getDate()}`)
    );
  };

  return (
    <Stack direction={{ sm: "column", md: "row" }}>
      <Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={date}
            onChange={(newValue) => newValue && setDate(newValue)}
          />
        </LocalizationProvider>
      </Box>
      <Stack gap={1} sx={{ flex: 1 }}>
        <Typography
          fontWeight={700}
          fontSize={(theme) => theme.typography.pxToRem(24)}>
          {(date as Dayjs)?.format("YYYY. MM. DD / ddd")}
        </Typography>
        <Stack sx={{ flex: 1 }}>
          <Typography
            fontWeight={200}
            fontSize={(theme) => theme.typography.pxToRem(14)}>
            데이터 이관 중...
          </Typography>
        </Stack>
        <Box>
          <Button variant='outlined' color='success' onClick={handleToday}>
            Today
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}

export default memo(Calendar);
