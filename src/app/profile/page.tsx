"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout succesful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <button
        onClick={logout}
        className=" w-24 h-10 bg-blue-600 rounded-lg text-white"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className=" w-24 h-10 bg-green-800 rounded-lg text-white"
      >
        GetUserDetails
      </button>
    </div>
  );
}
