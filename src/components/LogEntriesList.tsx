import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// This would come from your backend
const MOCK_ENTRIES = [
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Intern",
    purpose: "First day orientation",
    time: "10:30 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "Kien De Luna",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
  {
    id: 1,
    name: "John Doe",
    role: "Guest",
    purpose: "Meeting with HR",
    time: "9:00 AM",
    date: "2024-02-20",
  },
];

const maskName = (name) => {
  if (!name) return name;

  const nameArray = name.split("");
  const maskedName = nameArray.map((char, index) => {
    if (char !== " " && Math.random() < 0.5) {
      return "*";
    }
    return char;
  });

  return maskedName.join("");
};

export const LogEntriesList = () => {
  return (
    <div className="rounded-md border overflow-x-auto max-w-full max-h-[400px] overflow-y-auto">
      <Table>
        <TableHeader className="sticky">
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Purpose</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {MOCK_ENTRIES.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">{maskName(entry.name)}</TableCell>
              <TableCell>{entry.role}</TableCell>
              <TableCell>{entry.purpose}</TableCell>
              <TableCell>{entry.date}</TableCell>
              <TableCell>{entry.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};