from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from sqlalchemy import func, extract
from datetime import datetime, timedelta
from ..database import get_db
from app.calculation import (
    calculate_pages_read_daily,
    calculate_pages_read_monthly,
    calculate_genre_distribution_daily,
    calculate_genre_distribution_monthly,
    calculate_total_pages_read_period
)
from ..session_store import sessions
from ..models import Daily_log, My_book, User

router = APIRouter()

@router.get("/")

def get_reading_statistics(request: Request, period: str, db: Session = Depends(get_db)):
    session_id = request.cookies.get("session_id")
    if session_id not in sessions:
        raise HTTPException(status_code=401, detail="未承認またはセッションが無効")

    user_id = sessions[session_id]
    start_date = 0
    japanese_time = datetime.now() + timedelta(hours=9)
    today = japanese_time.date()
    print(f"今日は{today}")


    # 期間の開始基準日を設定
    if period == "weekly":
        start_date = today - timedelta(days = 7)
        print(f"基準日は{start_date}")
    elif period == "monthly":
        start_date = today - timedelta(days = 30)
        print(f"基準日は{start_date}")
    elif period == "yearly":
        start_date = today - timedelta(days = 365)
        print(f"基準日は{start_date}")
    else:
        raise HTTPException(status_code=401,detail="リクエストが無効")


    # モデルを操作し読書日と読書ページのリストを作成する
    if period == "yearly":
        # このコードでは年月がstr型になってしまうため、date型で集計し、最後に年月へフォーマット変換するよう書き換える。
        result = db.query(
            extract('year',Daily_log.date).label('year'),
            extract('month',Daily_log.date).label('month'),
            func.sum(Daily_log.page_read).label('total_pages')).join(
                My_book,
                Daily_log.my_book_id == My_book.id).filter(
                My_book.user_id == user_id,
                Daily_log.date >= start_date,
                Daily_log.date <= today).group_by(
                extract('year',Daily_log.date),
                extract('month',Daily_log.date)
                ).all()
        log_data = [{'date': f"{year}-{month:02}", 'pages': page_read} for year, month, page_read in result]
       # リスト内の読書日と対象期間を比較し、読書日がなければ読書日と０ページを追加する
        # search = start_date
        # while search <= today:
        #     if search not in [entry['date'] for entry in log_data]:
        #         push_date={'date':search, 'pages':0}
        #         log_data.append(push_date)
        #     else:
        #         pass
        #     search += timedelta(days = 1)

        # 日付と読書ページを連続データとなるよう整列
        # graph_element = sorted(log_data, key=lambda x: datetime.strptime(x['date','%Y-%m']))
        return(log_data)

    else:
        result = db.query(
            Daily_log.date, func.sum(Daily_log.page_read).label('total_pages')).join(
                My_book,
                Daily_log.my_book_id == My_book.id).filter(
                My_book.user_id == user_id,
                Daily_log.date >= start_date,
                Daily_log.date <= today
                ).group_by(Daily_log.date)
        log_data=[{'date':date, 'pages':pages} for date, pages in result]
        # リスト内の読書日と対象期間を比較し、読書日がなければ読書日と０ページを追加する
        search = start_date
        while search <= today:
            if search not in [entry['date'] for entry in log_data]:
                push_date={'date':search, 'pages':0}
                log_data.append(push_date)
            else:
                pass
            search += timedelta(days = 1)

        # 日付と読書ページを連続データとなるよう整列
        graph_element = sorted(log_data, key=lambda x: x['date'])
        return(graph_element)




    # end_date = datetime.today().date()  # 今日の日付

    # # 週、月、年は引数にweekly、monthly、yearlyを入れたら切り替わるように設定
    # if period == 'weekly':
    #     start_date = end_date - timedelta(days=7)
    #     pages_summary = calculate_pages_read_daily(db, user_id, start_date, end_date)
    #     genre_summary = calculate_genre_distribution_daily(db, user_id, start_date, end_date)
    #     total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    # elif period == 'monthly':
    #     start_date = end_date - timedelta(days=30)
    #     pages_summary = calculate_pages_read_daily(db, user_id, start_date, end_date)
    #     genre_summary = calculate_genre_distribution_daily(db, user_id, start_date, end_date)
    #     total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    # elif period == 'yearly':
    #     start_date = end_date - timedelta(days=365)
    #     pages_summary = calculate_pages_read_monthly(db, user_id, start_date, end_date)
    #     genre_summary = calculate_genre_distribution_monthly(db, user_id, start_date, end_date)
    #     total_pages = calculate_total_pages_read_period(db, user_id, start_date, end_date)
    # else:
    #     raise ValueError("Invalid period specified")

    # return {
    #     "pages_summary": pages_summary,
    #     "genre_summary": genre_summary,
    #     "total_pages_read": total_pages,
    #     }

