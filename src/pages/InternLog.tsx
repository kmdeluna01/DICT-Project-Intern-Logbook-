import { useNavigate, Link, useLocation } from "react-router-dom";
import { InternLogEntryForm } from "@/components/InternLogEntryForm";
import { InternLogEntriesList } from "@/components/InternLogEntries";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";

const InternLog = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/user/intern/log-list");
        setEntries(response.data);
      } catch (error) {
        console.error("Failed to fetch intern logs:", error);
      }
    };

    fetchLogs();
  }, []);

  const handleExport = () => {
    const today = new Date();
    const todayDateString = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    const data = entries
      .filter((entry) => {
        const entryDate = new Date(entry.createdAt).toISOString().split("T")[0];
        return entryDate === todayDateString;
      })
      .map((entry) => {
        const user = entry.user_id;
    const data = entries.map((entry) => {
      const user = entry.user_id; // Assuming the user details are nested under user_i

        let formattedDate = "";
        try {
          formattedDate = new Date(entry.createdAt).toLocaleDateString();
        } catch (error) {
          console.error("Error parsing date:", entry.createdAt, error);
          formattedDate = "Invalid Date";
        }

        return {
          ...entry,
          date: formattedDate,
          time_in: new Date(entry.time_in).toLocaleTimeString(),
          time_out: entry.time_out
            ? new Date(entry.time_out).toLocaleTimeString()
            : "No Time Out",
          createdAt: new Date(entry.createdAt).toISOString(),
          updatedAt: new Date(entry.updatedAt).toISOString(),
        };
      });

    console.log("data to excel (today only):", data);
      return {
        ...entry,
        date: formattedDate, // Use the formatted date
        time_in: new Date(entry.time_in).toLocaleTimeString(), // Format time
        time_out: entry.time_out
          ? new Date(entry.time_out).toLocaleTimeString()
          : "No Time Out", // Format time
        createdAt: new Date(entry.createdAt).toISOString(), // Keep original format for csv export, no error
        updatedAt: new Date(entry.updatedAt).toISOString(), // Keep original format for csv export, no error
      };
    });

    console.log("data to excel: ", data);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Name,Email,Phone Number,Date,Time In,Time Out,Hours\n" +
      data
        .map((row) => {
          const values = [
            row.user_id ? row.user_id.name : "No data provided",
            row.user_id ? row.user_id.email : "No data provided",
            row.user_id ? row.user_id.phone_number : "No data provided",
            row.createdAt ? row.date : "No data provided",
            row.time_in ? row.time_in : "No data provided",
            row.time_out ? row.time_out : "No data provided",
            row.total_time ? row.total_time : "No data provided",
          ];

          return values
            .map((value) =>
              typeof value === "string"
                ? `"${value.replace(/"/g, '""')}"`
                : value
            )
            .join(",");
        })
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `DICT_Intern_log_${todayDateString}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // change value depends sa network
  const qrValue = "http://192.168.18.42:8080/";

  return (
    <div className="w-screen h-screen py-10 space-y-8 px-5 sm:py-8 sm:space-y-6 sm:px-4 md:py-12 md:space-y-10 md:px-6 lg:py-16 lg:space-y-12 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full text-center md:text-left space-y-4 md:space-y-0">
        <Link to="/">
          <img
            src="/src/assets/DICT COMMERCIAL LOGO 1.png"
            alt="DICT Logo"
            className="w-48 sm:w-64 h-auto"
          />
        </Link>
        <div className="flex flex-col items-center md:items-center md:ml-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo-black text-[#17468F]">
            Quezon Provincial Office
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#17468F] mt-2">
            Intern Virtual Log Book
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid gap-8 md:grid-cols-[1fr,400px] sm:grid-cols-1">
        <div className="space-y-4 order-2 md:order-1">
          <div className="flex justify-center items-center text-5xl font-bold text-[#17468F] mb-2 font-archivo-black">
            {currentTime.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            })}
          </div>
          <InternLogEntriesList />
          {/* Export Logs Button 

          {/*}
          <Button
            onClick={handleExport}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full sm:w-auto"
          >
            Export Logs
          </Button>
          */}
        </div>

        <div className="flex flex-col  gap-5 order-1 md:order-2 justify-center">
          <InternLogEntryForm />
          <div className="flex flex-col w-full items-center justify-center bg-white border border-gray-200 rounded-xl shadow-md p-3 max-w-xs mx-auto">
            <h2 className="text-lg font-semibold uppercase text-gray-800 mb-2">
              Scan to Log In
            </h2>
            <QRCodeSVG value={qrValue} size={130} className="mb-4" />
            <p className="text-sm text-gray-500 text-center">
              Use your device to scan this code and continue logging in. 
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternLog;
