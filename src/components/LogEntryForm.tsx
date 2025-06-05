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
import React from "react";

export const LogEntryForm = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [intern, setIntern] = useState("");
  const [internPassword, setInternPassword] = useState("");
  const password = "admin";
  const [purpose, setPurpose] = useState("");
  const { toast } = useToast();
  const [checkedInIntern, setCheckedInIntern] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!role || (role === "guest" && (!name || !purpose)) || (role === "intern" && !intern)) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (role === "intern" && internPassword !== password) {
      toast({
        title: "Error!",
        description: "Password Incorrect",
        variant: "destructive",
      });
      return;
    }

    if (role === "intern") {
      if (checkedInIntern === intern) {
        setCheckedInIntern("");
        toast({
          title: "Checked Out!",
          description: `${intern} has checked out.`,
        });
      } else {
        setCheckedInIntern(intern);
        toast({
          title: "Checked In!",
          description: `${intern} has checked in.`,
        });
      }
    } else {
      toast({
        title: "Success!",
        description: `${name} has signed in for ${purpose}.`,
      });
    }

    setName("");
    setRole("");
    setPurpose("");
    setIntern("");
    setInternPassword("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div className="space-y-2">
        <Label htmlFor="role">Role</Label>
        <Select value={role} onValueChange={setRole}>
          <SelectTrigger>
            <SelectValue placeholder="Select your role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="guest">Guest</SelectItem>
            <SelectItem value="intern">Intern</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {role === "intern" && (
        <div className="space-y-2">
          <Label htmlFor="intern">Intern</Label>
          <Select value={intern} onValueChange={setIntern}>
            <SelectTrigger>
              <SelectValue placeholder="Select Intern Name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Juan De La Cruz">Juan De La Cruz</SelectItem>
              <SelectItem value="Maria Clara">Maria Clara</SelectItem>
            </SelectContent>
          </Select>

          <Label htmlFor="internPassword" className="mt-4 block">Password</Label>
          <Input
            id="internPassword"
            type="password"
            placeholder="Enter Intern Password"
            value={internPassword}
            onChange={(e) => setInternPassword(e.target.value)}
          />
        </div>
      )}

      {role === "guest" && (
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label htmlFor="purpose" className="mt-4 block">Purpose of Visit</Label>
          <Input
            id="purpose"
            placeholder="Enter purpose of visit"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
          />
        </div>
      )}

      <Button
        type="submit"
        className={`w-full ${
          role === "intern"
            ? checkedInIntern === intern
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
      >
        {role === "intern"
          ? checkedInIntern === intern
            ? "Check Out"
            : "Check In"
          : "Sign In"}
      </Button>
    </form>
  );
};