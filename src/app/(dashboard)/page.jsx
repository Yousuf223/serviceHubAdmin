"use client";



import Education from "./education";
import Cookies from "js-cookie";
import Health from "./health";
import { useEffect, useState } from "react";

export default function Page() {

  const [role, setRole] = useState('')
  useEffect(() => {
    const adminProfile = Cookies.get("adminProfile");
    console.log("adminProfileadminProfile", adminProfile);
    setRole(adminProfile)
  }, [])



  return role == "Healthcare" ? <Health /> : <Education />;
}
