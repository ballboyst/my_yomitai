import { ScheduleCalendar } from "./calendar";

// カレンダーにマークする手順
// 読書日をpropsとしてhome.tsxから受け取る
// export const ReadDate = (props) =>{
//   const {dates} = props;
// };
// 受け取った日付のリストを使い繰り返し処理（map関数）
// 繰り返し処理の中身は以下
// 日付を'-'で分割して順に変数年、月、日に格納する


export const CalendarComponent = () => {

  const readDates = [
    "2024-05-10",
    "2024-05-11",
    "2024-05-12",
    "2024-05-13",
    "2024-05-14",
    "2024-05-15",
    "2024-05-18",
    "2024-05-19",
    "2024-07-26"
  ];

const date = new Date();
const schedules = readDates.map((date, index) => {
  const [year, month, day] = date.split('-');
  return {
    name: "Schedule" + (index + 1), // 連番を格納
    year: Number(year),
    month: Number(month),
    day: Number(day),
    color: "#ff0049"
  };
});

console.log(schedules);

  // const date = new Date();
  // const schedules = [
  //   {
  //     name: "Schedule1",
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: 22,
  //     color: "#ff0049",
  //   },
  //   {
  //     name: "Schedule2",
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: 25,
  //     color: "#0ce7ff",
  //   },
  //   {
  //     name: "Schedule3",
  //     year: date.getFullYear(),
  //     month: date.getMonth() + 1,
  //     day: 25,
  //     color: "#68df00",
  //   },
  // ];
  return (
    <div className="flex items-center justify-center p-0 sm:p-5">
      <ScheduleCalendar
        schedules={schedules}
        className="h-[95vh] w-[90%] sm:h-[380px] sm:w-[380px]"
        startOnMonday
      />
    </div>
  );
};
