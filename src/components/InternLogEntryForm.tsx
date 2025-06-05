import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const InternLogEntryForm = () => {
  const [interns, setInterns] = useState([]);
  const [selectedInternID, setSelectedIntern] = useState("");
  const [internPassword, setInternPassword] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInterns = async () => {
      try {
        const response = await axios.get("/user/interns");
        setInterns(response.data);
      } catch (error) {
        console.error("Failed to fetch interns:", error);
      }
    };
    
    fetchInterns();
  }, []);

  useEffect(() => {
    const checkInternStatus = async () => {
      if (selectedInternID) {
        try {
          const response = await axios.get(`/user/intern/check-status/${selectedInternID}`);
          console.log("Checked In status: ", response.data.checkedIn)
          setIsCheckedIn(response.data.checkedIn);
        } catch (error) {
          console.error("Failed to check intern status:", error);
        }
      }
    };

    checkInternStatus();
  }, [selectedInternID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate required fields
    if (!selectedInternID || !internPassword) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
  
    try {
      // Verify password first
      const passwordCheckResponse = await axios.post('/user/intern/check-password', {
        selectedInternID,
        internPassword,
      });
      
      if (passwordCheckResponse.status === 401) {
        toast({
          title: "Error",
          description: "Invalid password. Please try again.",
          variant: "destructive",
        });
        return;
      }
  
      // Handle check-in or check-out
      if (isCheckedIn) {
        await axios.post('/user/intern/time-out', { user_id: selectedInternID });
        toast({
          title: "Success",
          description: "Checked out successfully",
        });
      } else {
        await axios.post('/user/intern/time-in', { user_id: selectedInternID });
        toast({
          title: "Success",
          description: "Checked in successfully",
        });
      }
  
      // Update state and refresh the page
      setIsCheckedIn(!isCheckedIn);
      window.location.reload();
    } catch (error) {
      console.error("Failed to update intern status:", error);
      toast({
        title: "Error",
        description: "Failed to update check-in status",
        variant: "destructive",
      });
    } finally {
      // Clear the password field
      setInternPassword("");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-3">
        <p className="text-center md:text-left space-y-3">
          Welcome Intern!
        </p>
        <Select value={selectedInternID} onValueChange={setSelectedIntern}>
          <SelectTrigger>
            <SelectValue placeholder="Select Intern Name" />
          </SelectTrigger>
          <SelectContent>
          {interns
            .filter(intern => intern.role === "Intern")
            .map(intern => (
              <SelectItem key={intern._id} value={intern._id}>
                {intern.name}
              </SelectItem>
            ))
          }
          </SelectContent>
        </Select>

        {/*<Label htmlFor="internPassword" className="mt-4 block">Password</Label>*/}
        <Input
          id="internPassword"
          type="password"
          placeholder="Password"
          value={internPassword}
          onChange={(e) => setInternPassword(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        className={`w-full ${isCheckedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-900 hover:bg-blue-800"} text-white`}
      >
        {isCheckedIn ? "Sign Out" : "Sign In"}
      </Button>

      
    </form>
  );
};