"use client";
import { useState, useEffect } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [startDay, setStartDay] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDate, setShowDate] = useState("");
  const [viewMode, setViewMode] = useState("month");

  useEffect(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];

    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    setDaysInMonth(days);
    setStartDay(new Date(year, month, 1).getDay());
  }, [currentDate]);

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevYear = () => {
    setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() - 1)));
  };

  const nextYear = () => {
    setCurrentDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)));
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    
    setShowDate(date.toLocaleDateString("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }));
  };

  
  const getMonths = () => {
    return Array.from({ length: 12 }, (_, index) => {
      const monthDate = new Date(currentDate.getFullYear(), index, 1);//yearly-view
      return monthDate;
    });
  };

  const monthsInYear = getMonths();

  return (
    <div>
      <div className="w-[500px] h-auto mx-4 border border-gray-300 rounded-md py-4 bg-slate-200">
        <div className="p-4">
          <input
            type="text"
            id="date-input"
            placeholder="Select a date"
            value={showDate} 
            readOnly
            className="w-full p-2 border border-gray-400 rounded"
          />
        </div>
           
        <div className="flex space-x-4 p-4">
          <button
            onClick={() => setViewMode("month")}
            className={`cursor-pointer px-4 py-2 rounded ${
              viewMode === "month" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Monthly View
          </button>
          <button
            onClick={() => setViewMode("year")}
            className={`cursor-pointer px-4 py-2 rounded ${
              viewMode === "year" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Yearly View
          </button>
          <button
            onClick={() => setViewMode("day")}
            className={`cursor-pointer px-4 py-2 rounded ${
              viewMode === "day" ? "bg-blue-500" : "bg-gray-400"
            }`}
          >
            Day View
          </button>
        </div>

        <header className="flex justify-between items-center bg-teal-700 text-white text-2xl p-5">
          <button
            onClick={prevYear}
            className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
          >
            &lt;&lt;
          </button>
          <button
            onClick={prevMonth}
            className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
          >
            &lt;
          </button>
          <span>
            {viewMode === "year" ? currentDate.getFullYear() : currentDate.toLocaleDateString("default", { month: "long", year: "numeric" })}
          </span>
          <button
            className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
            onClick={nextMonth}
          >
            &gt;
          </button>
          <button
            onClick={nextYear}
            className="cursor-pointer bg-blue-500 text-white px-2 py-1 rounded"
          >
            &gt;&gt;
          </button>
        </header>

        <main>
          {/* Month View */}
          {viewMode === "month" ? (
            <>
              <div className="grid grid-cols-7 gap-2 px-4 py-2 text-center text-lg font-semibold">
                {dayNames.map((day) => (
                  <div key={day}>{day}</div>
                ))}
              </div>

              <div className="grid grid-cols-7 text-center text-xl px-4 py-2">
                {/* Blank days before the start of the month */}
                {Array.from({ length: startDay }).map((_, index) => (
                  <div key={index} className="invisible"></div> 
                ))}

                {/* Calendar days */}
                {daysInMonth.map((day) => (
                  <div
                    key={day}
                    className={`p-2 cursor-pointer rounded-lg ${
                      day.getDate() === new Date().getDate() &&
                      day.getMonth() === new Date().getMonth()
                        ? "bg-blue-200"
                        : ""
                    } ${
                      selectedDate &&
                      day.toDateString() === selectedDate.toDateString()
                        ? "bg-teal-700 text-white"
                        : ""
                    }`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day.getDate()}
                  </div>
                ))}
              </div>
            </>
          ) : viewMode === "week" ? (
            // Weekly View
            <div className="grid grid-cols-7 text-center text-xl px-4 py-2">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className={`p-2 cursor-pointer rounded-lg ${
                    selectedDate && day.toDateString() === selectedDate.toDateString()
                      ? "bg-teal-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDateClick(day)}
                >
                  {day.toLocaleDateString("default", { weekday: "long", day: "numeric" })}
                </div>
              ))}
            </div>
          ) : viewMode === "year" ? (
            // Yearly View
            <div className="grid grid-cols-3 gap-4 p-4">
              {monthsInYear.map((month, index) => (
                <div
                  key={month}
                  className={`border rounded-lg p-4 text-center cursor-pointer ${
                    selectedDate && month.getMonth() === selectedDate.getMonth()
                      ? "bg-teal-500 text-white"
                      : ""
                  }`}
                  onClick={() => handleDateClick(month)}
                >
                  {month.toLocaleDateString("default", { month: "long" })}
                </div>
              ))}
            </div>
          ) : (
            // Day View
            <div className="p-4 text-center">
              {selectedDate ? (
                <div>
                  <h2 className="text-2xl font-bold">
                    {selectedDate.toLocaleDateString("default", { weekday: "long" })}, {selectedDate.toLocaleDateString()}
                  </h2>
                  <p className="mt-2">Details for {selectedDate.toLocaleDateString()}</p>
                </div>
              ) : (
                <p>Please select a date from the calendar.</p>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
