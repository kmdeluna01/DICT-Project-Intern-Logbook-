import { useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import CombinedForm from "@/components/CombinedForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Modal = ({ onClose, children }: { onClose: () => void, children: ReactNode }) => {
    const navigate = useNavigate();

    const handleClose = () => {
        onClose();
        navigate('/');
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-3xl p-8 rounded-xl bg-white/95 backdrop-blur-sm">
                <div className="space-y-4">
                    {children}
                </div>
                <div className="mt-6 flex justify-end">
                    <Button 
                        onClick={handleClose}
                        className="bg-[#17468F] hover:bg-[#1a3968] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

const Appointment = () => {
    const [formData, setFormData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (data) => {
        console.log("Form submitted with data:", data);
        setFormData(data);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        console.log("Closing Modal");
        setIsModalOpen(false);
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header with logo and title */}
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                    <div className="flex items-center">
                        <img
                            src="/src/assets/DICT COMMERCIAL LOGO 1.png"
                            alt="DICT Logo"
                            className="h-20 w-auto"
                        />
                    </div>
                    <div className="text-center md:text-right">
                        <h1 className="text-3xl md:text-4xl font-bold text-[#17468F]">
                            Quezon Provincial Office
                        </h1>
                        <h2 className="text-xl md:text-2xl text-[#17468F]">
                            Schedule an Appointment
                        </h2>
                    </div>
                </div>

                {/* Welcome message and back button */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <p className="text-gray-600 mb-4 md:mb-0">
                        Welcome! Please fill out the form to schedule an appointment.
                    </p>
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        className="flex items-center gap-2 text-[#17468F] border-[#17468F] hover:bg-[#17468F] hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Home
                    </Button>
                </div>

                {/* Form Section */}
                <div className="mb-10">
                    <CombinedForm onSubmit={handleSubmit} />
                </div>
            </div>

            {/* Confirmation Modal */}
            {isModalOpen && formData && (
                <Modal onClose={handleCloseModal}>
                    <div className="text-center mb-4">
                        <h2 className="text-xl font-bold text-gray-900">Appointment Confirmed</h2>
                        <p className="text-sm text-gray-600 mt-1">Your appointment has been successfully scheduled</p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="bg-gray-50 p-4 rounded shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Personal Information</h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <p className="text-gray-600 font-medium">Email:</p>
                                <p className="text-gray-900">{formData.email}</p>
                                <p className="text-gray-600 font-medium">Full Name:</p>
                                <p className="text-gray-900">{formData.fullName}</p>
                                <p className="text-gray-600 font-medium">Sex:</p>
                                <p className="text-gray-900">{formData.sex}</p>
                                <p className="text-gray-600 font-medium">Age:</p>
                                <p className="text-gray-900">{formData.age}</p>
                                <p className="text-gray-600 font-medium">Contact:</p>
                                <p className="text-gray-900">{formData.contactNumber}</p>
                                <p className="text-gray-600 font-medium">Address:</p>
                                <p className="text-gray-900">{formData.address}</p>
                                <p className="text-gray-600 font-medium">Sector:</p>
                                <p className="text-gray-900">{formData.sector}</p>
                                {formData.sector === "Other" && (
                                    <>
                                        <p className="text-gray-600 font-medium">Other Sector:</p>
                                        <p className="text-gray-900">{formData.otherSector}</p>
                                    </>
                                )}
                                <p className="text-gray-600 font-medium">Organization:</p>
                                <p className="text-gray-900">{formData.organization}</p>
                            </div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded shadow-sm">
                            <h3 className="font-semibold text-gray-900 mb-2 text-sm">Appointment Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                                <p className="text-gray-600 font-medium">Date:</p>
                                <p className="text-gray-900">{formData.selectedDate.toLocaleDateString()}</p>
                                <p className="text-gray-600 font-medium">Time:</p>
                                <p className="text-gray-900">{formData.selectedTimeSlot}</p>
                                <p className="text-gray-600 font-medium">Category:</p>
                                <p className="text-gray-900">{formData.selectedCategory}</p>
                                {formData.selectedCategory === "Others" && (
                                    <>
                                        <p className="text-gray-600 font-medium">Other Service:</p>
                                        <p className="text-gray-900">{formData.otherService}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};

export default Appointment;