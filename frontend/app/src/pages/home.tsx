import { CalendarComponent } from "../components/calendarComponent";
import BookRegistModals from "../components/bookRegistModals";
// import axios from "axios";
import { useEffect, useState } from "react";

interface DashBookData {
  dashboard: [
    {
      book_title: string;
      progress_rate: number;
      remaining_days: number;
    },
  ];
  reading_dates: Date[];
  award_dates: Date[];
}

export default function Home() {
  const [data, setData] = useState<DashBookData>();

  useEffect(() => {
    fetch("http://localhost:8000/api/dashboard", {
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
  }, []);

  // const fetchData = async () => {
  //   const sessionId = sessionStorage.getItem("yomitai_session");
  //   if (!sessionId) {
  //     console.error("No session ID found: ", sessionId);
  //     return;
  //   }
  //   try {
  //     console.log("request send");
  //     const response = await axios.get("http://localhost:8000/api/dashboard", {
  //       headers: {
  //         Authorization: `Bearer ${sessionId}`,
  //       },
  //     });
  //     setData(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    if (data) {
      console.log("get data:", data);
    }
  }, [data]);

  return (
    <>
      {/* Sectionをコンポーネント化 */}
      <section className="h-screen w-screen bg-yellow-50 text-xl">
        <div className=" mx-auto flex flex-col py-8 md:flex-row">
          {/* 左側の要素：カレンダ */}
          <div className="flex-grow text-center md:w-1/2 md:text-left">
            <CalendarComponent />
          </div>
          {/* 右側の要素：書籍カード */}
          <div className="w-1/2 md:w-1/2 lg:max-w-lg">
            <div className="flex flex-col items-center p-4">
              {/* カード要素：ここを自動で増やしたい */}
              {data &&
                data.dashboard.map((book, index) => (
                  <BookCard key={index} book={book} />
                ))}
              <BookRegistModals />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const BookCard = ({ book }) => (
  <div className="relative mx-auto mb-4 w-96 transform rounded-xl bg-green-100 text-gray-600 shadow-md transition-transform hover:scale-105">
    <div className="w-full p-4">
      <div className="flex">
        <div className="mr-2">
          <img src={book.image} alt={book.book_title} className="h-20" />
        </div>
        <div className="flex flex-grow flex-col">
          <div className="mx-2 text-sm font-light">{book.book_title}</div>
          <div>
            <div className="mx-2 mt-2 w-auto bg-blue-50">
              <div
                className="bg-green-600 p-1 text-center text-xs leading-none text-gray-600"
                style={{ width: `${book.progress_rate}%` }}
              >
                {book.progress_rate}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
