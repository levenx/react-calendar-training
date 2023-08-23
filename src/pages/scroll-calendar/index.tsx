import "./index.css";
import { getDaysOfMonth } from "./utils";
import { useCallback, useEffect, useMemo, useState, useRef } from "react";
import dayjs, { Dayjs } from "dayjs";
import { debounce } from "lodash-es";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");

function ScrollCalendar() {
  const getDays = useCallback((month: Dayjs) => {
    return getDaysOfMonth(month.year(), month.month() + 1);
  }, []);
  const [schedules, setSchedules] = useState(() => {
    return [dayjs().subtract(1, "month"), dayjs(), dayjs().add(1, "month")].map(
      month => ({
        month,
        days: getDays(month),
      }),
    );
  });

  const weekTitles = useMemo(() => {
    return [...Array(7)].map((_, weekInx) => {
      return dayjs().day(weekInx);
    });
  }, []);

  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let prevScrollHeight = 0;
    const scrollEvent = debounce(async e => {
      let scrollHeight = e.target.scrollHeight;
      let scrollTop = e.target.scrollTop;
      let offsetHeight = e.target.offsetHeight;

      if (scrollTop < 100) {
        console.log("列表置顶");
        setSchedules(schedules => {
          const lastSchedule = schedules[0];
          const prevMonth = lastSchedule.month.subtract(1, "month");
          const prevSchedule = {
            month: prevMonth,
            days: getDays(prevMonth),
          };
          return [prevSchedule, ...schedules];
        });
        const targetScrollTop =
          scrollTop + (scrollHeight - prevScrollHeight) + 50;
        calendarRef.current?.scrollTo({ top: targetScrollTop });

        console.log("prevScrollHeight:", prevScrollHeight);
        prevScrollHeight = scrollHeight;
      }

      if (offsetHeight + scrollTop >= scrollHeight - 10) {
        console.log("列表触底,触发接口请求数据");
        setSchedules(schedules => {
          const lastSchedule = schedules[schedules.length - 1];
          const nextMonth = lastSchedule.month.add(1, "month");
          const nextSchedule = {
            month: nextMonth,
            days: getDays(nextMonth),
          };
          return [...schedules, nextSchedule];
        });
      }
    }, 100);

    calendarRef.current?.addEventListener("scroll", scrollEvent);

    return () => {
      if (calendarRef.current) {
      }
    };
  }, []);

  return (
    <div className="App">
      <div
        className="calendar"
        style={{
          height: "100vh",
          overflowY: "scroll",
        }}
        ref={calendarRef}>
        <div className="calendar-title">
          {weekTitles.map(title => {
            return <div className="calendar-week">{title.format("dd")}</div>;
          })}
        </div>
        {schedules.map(schedule => {
          return (
            <div>
              <div className="calendar-month">
                <div>{schedule.month.format("MMM YYYY")}</div>
              </div>

              <div className="calendar-content">
                {schedule.days.map(day => {
                  return (
                    <div className="calendar-day">
                      {day ? day.format("DD") : ""}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScrollCalendar;
