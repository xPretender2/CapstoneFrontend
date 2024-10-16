import React, { useEffect, useState } from "react";
import "./MyAccount.css";
import getUserDetailsFromToken from "../utils/tokenDecode";
import { useNavigate } from "react-router-dom";

interface UserDetails {
  username: string;
  email: string;
  accountType: string;
}

const MyAccount: React.FC = () => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const details = getUserDetailsFromToken(token);
      if (details) {
        setUserDetails({
          username: details.username,
          email: details.email,
          accountType: details.accountType,
        });
      } else {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="cards-container">
        <div className="card">
          <h1>{userDetails.username}</h1>
          <p className="userDetails">
            Account Type: {userDetails.accountType === "student" ? "Student" : "Teacher"}
            <br />
            Email Address: {userDetails.email}
          </p>
          <button className="card-button" onClick={() => navigate("/change-password")}>Change Password</button>
        </div>

        <div className="card">
          <h1>Gabay sa Pagtuturo</h1>
          <p className="description">Explore Teacher-specific resources and tools.</p>
          <button className="card-button" onClick={() => navigate("/teacher-corner")}>
            Pumunta sa Gabay sa Pagtuturo
          </button>
        </div>
        {userDetails.accountType === "admin" && (
        <div className="card">
          <h1>Admin</h1>
          <p className="description">Pahina para sa admin</p>
          <button className="card-button" onClick={() => navigate("/admin")}>
            Pumunta sa pahina ng Admin
          </button>
        </div>
        )}
      </div>
    </>
  );
};

export default MyAccount;
