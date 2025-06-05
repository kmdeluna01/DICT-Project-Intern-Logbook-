"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { ArrowLeft, UserPlus } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  fullName: z.string().min(2, { message: "Name must be at least 2 characters" }),
  sex: z.enum(["male", "female", "other"]),
  age: z.number().min(1, { message: "Age must be at least 1" }).max(120, { message: "Age must be less than 120" }),
  contactNumber: z.string().min(10, { message: "Contact number must be at least 10 digits" }),
  address: z.string().min(5, { message: "Address must be at least 5 characters" }),
  sector: z.enum(["PWD", "student", "Workforce (Employee)", "IPs", "NGAs", "SUC", "Government"]),
  purposeOfVisit: z.enum([
    "inquiry with DICT",
    "Internship",
    "Courtesy Visit",
    "Partnership/Engagement Meeting",
    "other",
  ]),
  logStatus: z.enum(["in", "out"]),
})

const WalkIn = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      sex: "male",
      age: 18,
      contactNumber: "",
      address: "",
      sector: "Government",
      purposeOfVisit: "Courtesy Visit",
      logStatus: "in",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    setSubmittedData(values)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    navigate("/")
  }

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
              Walk-In Registration
            </h2>
          </div>
        </div>

        {/* Welcome message and back button */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <p className="text-gray-600 mb-4 md:mb-0">
            Welcome! Please fill out the form for walk-in registration.
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information Card */}
                <Card className="shadow-md border border-gray-200">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-xl font-bold text-[#17468F]">
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Email</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]" 
                              placeholder="Email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Full Name</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]" 
                              placeholder="Full Name" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="sex"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Sex</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                <SelectValue placeholder="Select sex" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Age</FormLabel>
                          <FormControl>
                            <Input
                              className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]"
                              type="number"
                              placeholder="Age"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactNumber"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Contact Number</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]" 
                              placeholder="Contact Number" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Address</FormLabel>
                          <FormControl>
                            <Input 
                              className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]" 
                              placeholder="Complete Address" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Visit Details Card */}
                <Card className="shadow-md border border-gray-200">
                  <CardHeader className="pb-3 border-b">
                    <CardTitle className="text-xl font-bold text-[#17468F]">
                      Visit Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <FormField
                      control={form.control}
                      name="sector"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Sector</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                <SelectValue placeholder="Select sector" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PWD">PWD</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="Workforce (Employee)">Workforce (Employee)</SelectItem>
                              <SelectItem value="IPs">IPs</SelectItem>
                              <SelectItem value="NGAs">NGAs</SelectItem>
                              <SelectItem value="SUC">SUC</SelectItem>
                              <SelectItem value="Government">Government</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="purposeOfVisit"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Purpose of Visit</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                <SelectValue placeholder="Select purpose" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="inquiry with DICT">Inquiry with DICT</SelectItem>
                              <SelectItem value="Internship">Internship</SelectItem>
                              <SelectItem value="Courtesy Visit">Courtesy Visit</SelectItem>
                              <SelectItem value="Partnership/Engagement Meeting">
                                Partnership/Engagement Meeting
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="logStatus"
                      render={({ field }) => (
                        <FormItem className="mb-4">
                          <FormLabel className="text-sm font-medium text-gray-700">Log Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="h-12 text-base border-gray-300 focus:border-[#17468F] focus:ring-2 focus:ring-[#17468F]">
                                <SelectValue placeholder="Select log status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="in">IN</SelectItem>
                              <SelectItem value="out">OUT</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  className="w-64 bg-[#17468F] hover:bg-[#1a3968] text-white py-3 text-base font-medium transition-colors duration-200 rounded-md h-12 shadow-md"
                >
                  Submit Registration
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && submittedData && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-3xl p-8 rounded-xl bg-white/95 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="text-center mb-4">
                <DialogTitle className="text-xl font-bold text-gray-900">Registration Confirmed</DialogTitle>
                <DialogDescription className="text-sm text-gray-600 mt-1">
                  Your walk-in registration has been successfully recorded
                </DialogDescription>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Personal Information</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <p className="text-gray-600 font-medium">Email:</p>
                    <p className="text-gray-900">{submittedData.email}</p>
                    <p className="text-gray-600 font-medium">Full Name:</p>
                    <p className="text-gray-900">{submittedData.fullName}</p>
                    <p className="text-gray-600 font-medium">Sex:</p>
                    <p className="text-gray-900">{submittedData.sex}</p>
                    <p className="text-gray-600 font-medium">Age:</p>
                    <p className="text-gray-900">{submittedData.age}</p>
                    <p className="text-gray-600 font-medium">Contact:</p>
                    <p className="text-gray-900">{submittedData.contactNumber}</p>
                    <p className="text-gray-600 font-medium">Address:</p>
                    <p className="text-gray-900">{submittedData.address}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm">Visit Details</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <p className="text-gray-600 font-medium">Sector:</p>
                    <p className="text-gray-900">{submittedData.sector}</p>
                    <p className="text-gray-600 font-medium">Purpose:</p>
                    <p className="text-gray-900">{submittedData.purposeOfVisit}</p>
                    <p className="text-gray-600 font-medium">Log Status:</p>
                    <p className="text-gray-900">{submittedData.logStatus === 'in' ? 'IN' : 'OUT'}</p>
                    <p className="text-gray-600 font-medium">Date:</p>
                    <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
                    <p className="text-gray-600 font-medium">Time:</p>
                    <p className="text-gray-900">{new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleCloseModal}
                className="bg-[#17468F] hover:bg-[#1a3968] text-white px-6 py-2 rounded-md font-medium transition-colors duration-200"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default WalkIn

