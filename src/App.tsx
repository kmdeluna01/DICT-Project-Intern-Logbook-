import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Appointment from "./pages/Appointment";
import NotFound from "./pages/NotFound";
import Home from "./pages/home";
import InterLog from "./pages/InternLog";
import WalkIn from "./pages/Walkin";
const queryClient = new QueryClient();
import axios from "axios";

//axios.defaults.baseURL = "http://192.168.18.42:4041/dict/auth";

const App = () => 
  (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/appointment" element={<Appointment/>}/>
          <Route path="/stats" element={<NotFound />} />
          <Route path="/interns" element={<NotFound />} />
          <Route path="/guests" element={<NotFound />} />
          <Route path="/intern-log" element={<InterLog/>}/>
          <Route path="/appointment" element={<Appointment/>}/>
          <Route path="/walkin" element={<WalkIn />} />
          <Route path="/guests" element={<NotFound/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;