import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock9 } from "lucide-react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const InternStats = () => {
  const [intern, setIntern] = useState("");

  useEffect(() => {
    const loadCheckedInIntern = async () => {
      try {
        const storedIntern = await AsyncStorage.getItem("checkedInIntern");
        if (storedIntern) {
          setIntern(storedIntern);
        }
      } catch (error) {
        console.error("Failed to load checked-in intern from storage", error);
      }
    };

    loadCheckedInIntern();
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{intern}'s Total Hours</CardTitle>
        <Clock9 className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="flex flex-row">
        <div className="text-2xl font-bold">24</div>
        <p className="text-2xl text-muted-foreground">/600</p>
      </CardContent>
    </Card>
  );
};