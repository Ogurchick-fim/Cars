import { useEffect, useState } from "react";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:2525/api/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message);
        setUserData(data.user);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>{message}</p>
      {userData && (
        <div className="mt-4">
          <p>User ID: {userData.userId}</p>
          <p>Email: {userData.email}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;