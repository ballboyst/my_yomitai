import { ScheduleCalendar } from "./calendar";
import { useState, useEffect } from "react";
// カレンダーにマークする手順
// 読書日をpropsとしてhome.tsxから受け取る
// export const ReadDate = (props) =>{
//   const {dates} = props;
// };
// 受け取った日付のリストを使い繰り返し処理（map関数）
// 繰り返し処理の中身は以下
// 日付を'-'で分割して順に変数年、月、日に格納する

export const CalendarComponent = () => {
  // データとエラーメッセージの状態を管理する
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // APIリクエストを行う関数
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/dashboard',{
          credentials: 'include',
        }); // APIエンドポイント
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json(); // レスポンスをJSONとして解析
        setData(result); // データを状態に格納
      } catch (error) {
        setError(error.message); // エラーメッセージを設定
      } finally {
        setLoading(false); // ローディングを終了
      }
    };

    fetchData(); // データを取得
  }, []); // 空の依存配列を指定してマウント時のみ実行

  // ローディング状態やエラーを表示
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const readingDates = data?.reading_dates.map((dateString, index) => {
    // 日付文字列を分割して年、月、日を取得
    const [year, month, day] = dateString.split('-');


// export const CalendarComponent = () => {

//   const readDates = [
//     "2024-05-10",
//     "2024-05-11",
//     "2024-05-12",
//     "2024-05-13",
//     "2024-05-14",
//     "2024-05-15",
//     "2024-05-18",
//     "2024-05-19",
//     "2024-07-26"
//   ];

// const date = new Date();
// const schedules = readDates.map((date, index) => {
//   const [year, month, day] = date.split('-');
  return {
    name: "Schedule" + (index + 1), // 連番を格納
    year: Number(year),
    month: Number(month),
    day: Number(day),
    color: "#ff0049"
  };
});

// console.log(schedules);

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
        schedules={readingDates}
        className="h-[95vh] w-[90%] sm:h-[540px] sm:w-[680px]"
        startOnMonday
      />
    </div>
  );
};