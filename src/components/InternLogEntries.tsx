import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, LogOut } from "lucide-react";
import axios from "axios";
export const InternLogEntriesList = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Commented out API call and useEffect for static data
  /*
    useEffect(() => {
      const fetchLogs = async () => {
        try {
          const response = await axios.get('/user/intern/log-list');
          console.log("Recent Log: ", response.data)
          setEntries(response.data);
        } catch (error) {
          console.error("Failed to fetch intern logs:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchLogs();
    }, []);
  */

  // Static log entries for demonstration
  useEffect(() => {
    setEntries([
      {
        _id: "log1",
        user_id: { name: "Juan Dela Cruz" },
        time_in: new Date(2025, 5, 5, 8, 0).toISOString(),
        time_out: new Date(2025, 5, 5, 12, 0).toISOString(),
        total_time: "4h 0m",
        updatedAt: new Date(2025, 5, 5, 12, 0).toISOString(),
      },
      {
        _id: "log2",
        user_id: { name: "Maria Santos" },
        time_in: new Date(2025, 5, 5, 9, 0).toISOString(),
        time_out: null,
        total_time: null,
        updatedAt: new Date(2025, 5, 5, 9, 0).toISOString(),
      },
      {
        _id: "log3",
        user_id: { name: "Pedro Reyes" },
        time_in: new Date(2025, 5, 5, 10, 0).toISOString(),
        time_out: new Date(2025, 5, 5, 15, 0).toISOString(),
        total_time: "5h 0m",
        updatedAt: new Date(2025, 5, 5, 15, 0).toISOString(),
      },
    ]);
    setLoading(false);
  }, []);

  const maskName = (name) => {
    if (!name) return "";
    const nameParts = name.split(" ");
    return nameParts
      .map((part, index) => {
        if (index === nameParts.length - 1) {
          return part[0] + "*".repeat(part.length - 1);
        }
        return part;
      })
      .join(" ");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rounded-md border overflow-x-auto max-w-full max-h-[400px] overflow-y-auto">
      <Table className="w-full">
        <TableHeader className="sticky">
          <TableRow>
            <TableHead>Recent Logs</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell className="text-center">Loading...</TableCell>
            </TableRow>
          ) : entries.length === 0 ? (
            <TableRow>
              <TableCell className="text-center">No Recent Log</TableCell>
            </TableRow>
          ) : (
            entries
              .filter((entry) => {
                const entryDate = new Date(entry.updatedAt);
                entryDate.setHours(0, 0, 0, 0);
                return entryDate.getTime() === today.getTime();
              })
              .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
              .map((entry) => (
                <TableRow key={entry._id}>
                  <TableCell className="font-medium">
                    {maskName(entry.user_id.name)}
                  </TableCell>
                  {entry.time_out ? (
                    <TableCell>{new Date(entry.time_out).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</TableCell>
                  ) : (
                    <TableCell>{new Date(entry.time_in).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</TableCell>
                  )}
                  {entry.time_out ? (
                    <TableCell>{entry.total_time || "Ongoing"}</TableCell>
                  ) : (
                    <TableCell>Ongoing</TableCell>
                  )}
                  <TableCell>
                    {entry.time_out ? (
                      <LogOut size={20} color="red" />
                    ) : (
                      <CheckCircle size={20} color="green" />
                    )}
                  </TableCell>
                </TableRow>
              ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};