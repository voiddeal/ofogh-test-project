import { useRef } from "react"
import { useReactToPrint } from "react-to-print"
import { FaFilePdf } from "react-icons/fa6"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import TileBG from "../components/TileBG"

const VIEW_DATA = {
  dailyViews: [
    { name: "شنبه", value: Math.floor(Math.random() * 1000) },
    { name: "یکشنبه", value: Math.floor(Math.random() * 1000) },
    { name: "دوشنبه", value: Math.floor(Math.random() * 1000) },
    { name: "سه‌شنبه", value: Math.floor(Math.random() * 1000) },
    { name: "چهارشنبه", value: Math.floor(Math.random() * 1000) },
    { name: "پنج‌شنبه", value: Math.floor(Math.random() * 1000) },
    { name: "جمعه", value: Math.floor(Math.random() * 1000) },
  ],
  countryViews: [
    { name: "آمریکا", value: Math.floor(Math.random() * 5000) },
    { name: "بریتانیا", value: Math.floor(Math.random() * 5000) },
    { name: "آلمان", value: Math.floor(Math.random() * 5000) },
    { name: "فرانسه", value: Math.floor(Math.random() * 5000) },
    { name: "هند", value: Math.floor(Math.random() * 5000) },
    { name: "ژاپن", value: Math.floor(Math.random() * 5000) },
    { name: "برزیل", value: Math.floor(Math.random() * 5000) },
  ],
}

const COLORS = [
  "#FF6384",
  "#36A2EB",
  "#FFCE56",
  "#4BC0C0",
  "#9966FF",
  "#FF9F40",
  "#C0C0C0",
]

export default function ChartDashboard() {
  const contentRef = useRef(null)
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: "نمودارها",
  })

  return (
    <div className="w-full md:w-10/12 flex flex-col items-center mx-auto">
      <TileBG opacity={0.3} />
      <h2 className="text-3xl text-teal-700 font-bold mt-4 mb-8">
        :: <span className="">نمودارها</span> ::
      </h2>

      {/* Chart Container */}
      <div
        ref={contentRef}
        className="size-full flex flex-col lg:flex-row justify-center items-center gap-8 px-4"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "auto",
        }}
      >
        {/* Line Chart */}
        <div className="w-full lg:w-1/2 bg-gray-100 shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-center">
            تعداد بازدید روزانه
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={VIEW_DATA.dailyViews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/2 bg-gray-100 shadow-md p-4">
          <h2 className="text-lg font-bold mb-4 text-center">
            تعداد بازدید بر اساس کشور
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={VIEW_DATA.countryViews}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {VIEW_DATA.countryViews.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Print Button */}
      <button
        onClick={reactToPrintFn}
        className="flex items-center gap-x-2 mt-10 mb-5 p-4 bg-emerald-300 hover:bg-emerald-400 cursor-pointer rounded-lg"
      >
        <FaFilePdf />
        <span>چاپ PDF</span>
      </button>
    </div>
  )
}
