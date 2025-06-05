import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Value = Date | [Date, Date];

// Custom CSS to override the default calendar styles
const calendarStyles = `
  .react-calendar {
    width: 100%;
    border: none;
    font-family: inherit;
    line-height: 1.5;
  }
  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 1rem;
  }
  .react-calendar__navigation button {
    min-width: 44px;
    background: none;
    font-size: 16px;
    color: #333;
  }
  .react-calendar__month-view__weekdays {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 0.8em;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5rem;
    text-align: center;
  }
  .react-calendar__tile {
    padding: 0.75rem 0.5rem;
    text-align: center;
    line-height: 16px;
  }
  .react-calendar__tile--active {
    background: #17468F;
    color: white;
    border-radius: 4px;
  }
  .react-calendar__tile--active:hover {
    background: #1a3968;
  }
  .react-calendar__tile:disabled {
    background-color: #f5f5f5;
    color: #ccc;
  }
  .react-calendar__month-view__days__day--weekend:not(.react-calendar__tile--active) {
    color: #d10000;
  }
`;

const CombinedForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        email: "",
        fullName: "",
        sex: "",
        age: "",
        contactNumber: "",
        address: "",
        sector: "",
        otherSector: "",
        organization: "",
        selectedDate: new Date(),
        selectedCategory: null,
        otherService: "",
        selectedTimeSlot: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting form data:", formData);
        onSubmit(formData);
    };

    const timeSlots = [
        "8:00AM", "9:00AM", "10:00AM", "11:00AM",
        "1:00PM", "2:00PM", "3:00PM", "4:00PM"
    ];

    const isWeekend = ({ date }) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-6xl mx-auto">
            <style>{calendarStyles}</style>
            <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card className="shadow-md border border-gray-200">
                    <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-xl font-bold text-[#17468F]">Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-4">
                        <div className="space-y-4">
                            <div>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    type="text"
                                    name="fullName"
                                    placeholder="Full Name"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>

                            <div className="flex gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Male"
                                        checked={formData.sex === "Male"}
                                        onChange={handleChange}
                                        className="text-[#17468F] focus:ring-[#17468F]"
                                        required
                                    />
                                    <span className="ml-2 text-gray-700">Male</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="sex"
                                        value="Female"
                                        checked={formData.sex === "Female"}
                                        onChange={handleChange}
                                        className="text-[#17468F] focus:ring-[#17468F]"
                                        required
                                    />
                                    <span className="ml-2 text-gray-700">Female</span>
                                </label>
                            </div>
                            
                            <div>
                                <Input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    type="text"
                                    name="contactNumber"
                                    placeholder="Contact Number"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>
                            
                            <div>
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="Complete Address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>
                            
                            <div>
                                <select
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    required
                                    className="w-full h-12 px-3 py-2 text-base border rounded border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F] focus:outline-none"
                                >
                                    <option value="" disabled>Select Sector</option>
                                    <option value="PWD">PWD</option>
                                    <option value="Student">Student</option>
                                    <option value="Workforce">Workforce (Employee)</option>
                                    <option value="IPs">IPs</option>
                                    <option value="NGAs">NGAs</option>
                                    <option value="SUC">SUC</option>
                                    <option value="Other">Others: Please Specify</option>
                                </select>
                            </div>
                            
                            {formData.sector === "Other" && (
                                <div>
                                    <Input
                                        type="text"
                                        name="otherSector"
                                        placeholder="Please specify"
                                        value={formData.otherSector}
                                        onChange={handleChange}
                                        required
                                        className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                    />
                                </div>
                            )}
                            
                            <div>
                                <Input
                                    type="text"
                                    name="organization"
                                    placeholder="Organization/School/Agency/LGU/Company and etc. (Please Specify)"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    required
                                    className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                {/* Appointment Details Card */}
                <Card className="shadow-md border border-gray-200">
                    <CardHeader className="pb-3 border-b">
                        <CardTitle className="text-xl font-bold text-[#17468F]">Appointment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6 space-y-5">
                        <div className="space-y-5">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Select Time Slot</Label>
                                <Select onValueChange={(value) => handleSelectChange("selectedTimeSlot", value)} required>
                                    <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                        <SelectValue placeholder="Select Time Slot" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {timeSlots.map((slot) => (
                                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Select Date</Label>
                                <div className="border rounded-md overflow-hidden bg-white shadow-sm">
                                    <Calendar 
                                        onChange={(value) => handleSelectChange("selectedDate", value)} 
                                        value={formData.selectedDate}
                                        className="!font-sans"
                                        tileDisabled={isWeekend}
                                        minDate={new Date()}
                                        next2Label={null}
                                        prev2Label={null}
                                        view="month"
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-2">Note: Weekends are not available for appointments</p>
                            </div>
                            
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">Select Services</Label>
                                <Select onValueChange={(value) => handleSelectChange("selectedCategory", value)} required>
                                    <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ICT Services">ICT Services</SelectItem>
                                        <SelectItem value="Public Government Service">Public Government Service</SelectItem>
                                        <SelectItem value="Inquiry with DICT">Inquiry with DICT</SelectItem>
                                        <SelectItem value="Courtesy Visit">Courtesy Visit</SelectItem>
                                        <SelectItem value="Partnership/Engagement Meeting">Partnership/Engagement Meeting</SelectItem>
                                        <SelectItem value="Others">Others: Please Specify</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            
                            {formData.selectedCategory === "ICT Services" && (
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">ICT Services</Label>
                                    <Select onValueChange={(value) => handleSelectChange("ictService", value)} required>
                                        <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                            <SelectValue placeholder="Select ICT Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="NBI">NBI</SelectItem>
                                            <SelectItem value="PSA">PSA</SelectItem>
                                            <SelectItem value="BPA">BPA</SelectItem>
                                            <SelectItem value="PRC">PRC</SelectItem>
                                            <SelectItem value="CSC">CSC</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            
                            {formData.selectedCategory === "Public Government Service" && (
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Public Government Service</Label>
                                    <Select onValueChange={(value) => handleSelectChange("publicService", value)} required>
                                        <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                            <SelectValue placeholder="Select Service" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Free Printing">Free Printing</SelectItem>
                                            <SelectItem value="Free Internet">Free Internet</SelectItem>
                                            <SelectItem value="Free Training with Certificate">Free Training with Certificate</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                            
                            {formData.selectedCategory === "Others" && (
                                <div>
                                    <Label className="block text-sm font-medium text-gray-700 mb-1">Please specify</Label>
                                    <Input
                                        type="text"
                                        placeholder="Specify other service"
                                        value={formData.otherService}
                                        onChange={(e) => handleSelectChange("otherService", e.target.value)}
                                        required
                                        className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                                    />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="flex justify-center">
                <Button 
                    type="submit" 
                    className="w-64 bg-[#17468F] hover:bg-[#1a3968] text-white py-3 text-base font-medium transition-colors duration-200 rounded-md h-12 shadow-md"
                >
                    Submit Appointment
                </Button>
            </div>
        </form>
    );
};

export default CombinedForm;
