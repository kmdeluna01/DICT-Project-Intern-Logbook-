import { LogEntriesList } from "@/components/LogEntriesList";
import { Stats } from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Download, Shield, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
      id: 3,
      name: "Alice Johnson",
      role: "Guest",
      purpose: "Interview",
      time: "2:00 PM",
      date: "2024-02-20",
    },
];

const ADMIN_PASSWORD = "admin";

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { toast } = useToast();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if(!isAuthenticated) {
            setShowDialog(true);
        }
    }, [isAuthenticated]);

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            setShowDialog(false);
            toast({ 
                title: "Welcome!"});
        } else {
            toast({
                title: "Error!",
                description: "Incorrect Admin Password",
                variant: "destructive",
            });
            navigate("/");
        }
    };

    const handleExport = () => {
        const data = MOCK_ENTRIES.map(entry => ({
        ...entry,
        date: new Date(entry.date).toLocaleDateString(),
        }));
        const csvContent = "data:text/csv;charset=utf-8," + 
        "Name,Role,Purpose,Date,Time\n" +
        data.map(row => Object.values(row).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `logbook_entries_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent>
            <DialogTitle>Enter Admin Password</DialogTitle>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" className="w-full">Submit</Button>
            </form>
            </DialogContent>
        </Dialog>
        );
    };

    return (
        <div className="max-w-screen mx-auto bg-gray-50 space-y-6">
            <div className="flex flex-col md:flex-row items-center p-4 md:p-7 justify-center w-full text-center bg-[#17468F]">
                <div className="flex items-center justify-center w-full md:w-1/4 md:pr-0">
                    <img
                        src="/src/assets/DICT COMMERCIAL LOGO 2.png"
                        alt="DICT Logo"
                        className="w-48 sm:w-64 h-auto"
                    />
                </div>
                <div className="flex flex-col items-center justify-center w-full md:w-1/3 md: -ml-1">
                    <h1 className="text-1xl sm:text-1xl md:text-1xl font-bold font-archivo-black text-[#fff]">
                    REGION IV-A (CALABARZON)
                    </h1>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-archivo-black text-[#fff] -mt-1">
                    Quezon Provincial Office
                    </h3>
                </div>
            </div>
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="max-w-7xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                        </div>
                        <Link to="/">
                            <Button variant="outline" size="icon" className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white">
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        <Link to="/stats">
                            <Stats />
                        </Link>
                        <Link to="/interns">
                            <Card className="cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Interns Present</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">3</div>
                                    <p className="text-xs text-muted-foreground">Out of 5 total interns</p>
                                </CardContent>
                            </Card>
                        </Link>
                        <Link to="/guest-visits">
                            <Card className="cursor-pointer">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Guest Visits This Week</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">24</div>
                                    <p className="text-xs text-muted-foreground">+8 from last week</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Log Entries</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <LogEntriesList />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Admin;