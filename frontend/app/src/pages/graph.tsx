import RadioButton from "../components/togleButton";
import { BarChart, PieChart } from "@mui/x-charts";
import { useEffect, useState } from "react";


export default function Graph() {
const [data, setData] = useState([]);
const [periodState, setPeriodState] = useState("monthly");
console.log(periodState);
  useEffect(() => {
    fetch(`http://localhost:8000/api/graph?period=${periodState}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Data received:", data); // デバッグ用ログ
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [periodState]);

  useEffect(() => {
    if (data) {
      console.log("get data:", data);
    }
  }, [data]);
  
  // ここから自作関数

  // const [dateList,setDateList] = useState([]);
  // const [readPage,setReadPage] = useState([]);
  
  console.log(data);
  let date_list = Array.isArray(data) ? data.map((item) => item.date):[];
  console.log(date_list);
  let read_page = Array.isArray(data) ? data.map((item) => item.pages):[];
  console.log(read_page);

  // setDateList(date_list);
  // setReadPage(read_page);

  return (
    <>
      {/* <Header /> */}
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className="text-gray-600">
          <div className="flex items-center">
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              Total Page Count : 100（仮表示）
              {/* これまでの合計は100ページです。 */}
            </div>
            <div
              className="relative mx-4 my-4 h-full w-1/2 rounded-xl
                    p-4 text-center"
            >
              <RadioButton periodState={periodState} setPeriodState={setPeriodState}/>
            </div>
          </div>
          <div className="flex">
            <div
              className="relative mx-4 my-4 flex h-full w-full rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              <BarChart
                xAxis={[
                  {
                    id: "barCategories",
                    data: date_list,
                    // data: ["5/10","5/11","5/12","5/13","5/14","5/15","5/16","5/17","5/18"],
                    scaleType: "band",
                  },
                ]}
                series={[
                  {
                    data: read_page
                    // data: [20, 50, 30, 40, 10, 30, 60,0,100],
                  },
                ]}
                width={1300}
                height={400}
              />
            </div>

            {/* <div
              className="relative mx-4 my-4 flex h-full w-1/2 rounded-xl
                   bg-green-100 p-4 text-center shadow-md"
            >
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 30, label: "フロントエンド" },
                      { id: 1, value: 15, label: "バックエンド" },
                      { id: 2, value: 20, label: "インフラ" },
                    ],
                    innerRadius: 40,
                    outerRadius: 100,
                    paddingAngle: 3,
                    cornerRadius: 0,
                    startAngle: 0,
                    endAngle: 360,
                    cx: 150,
                    cy: 150,
                  },
                ]}
                width={450}
                height={300}
              />
            </div> */}
          </div>
        </div>
      </section>
    </>
  );
}
