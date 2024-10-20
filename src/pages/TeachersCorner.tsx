import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './TeachersCorner.css';
// Decoded Token Interface
interface DecodedToken {
  username: string;
  email: string;
  accountType: string;
  exp: number;
  iat: number;
}

// Utility function to decode JWT
const getUserDetailsFromToken = (token: string): DecodedToken | null => {
  try {
    const decodedToken = jwtDecode<DecodedToken>(token);
    return decodedToken;
  } catch (error) {
    console.error('Invalid token', error);
    return null;
  }
};

function TeachersCorner() {
  const [isTeacher, setIsTeacher] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const userDetails = getUserDetailsFromToken(token);
      if (userDetails && (userDetails.accountType === 'teacher' || userDetails.accountType === 'admin')) {
        setIsTeacher(true);
      }
    }
  }, []);

  if (!isTeacher) {
    return <h1>Access Denied. This page is for teachers only.</h1>;
  }

  return (
    <>
      <h1 className="title">Gabay sa Pagtuturo</h1>
      
      <div className="cards-container">
        <div className="card">
          <h2 className="title">Pagsusulit</h2>
          <img
            src="Matuto.webp"
            alt="Pagsusulit"
            style={{ width: "90%" }}
            className="card-image"
          />
          <p className="description">
            Gumawa o tignan ang mga quizes para sa iyong mga estudyante.
          </p>
          <button className="card-button"  onClick={() => navigate("/create-assessment")}>Gumawa ng Pagsusulit</button>
          <button className="card-button"  onClick={() => navigate("/assessment")}>Tignan ang mga Pagsusulit</button>
          <button className="card-button"  onClick={() => navigate("/checked-quizzes")}>Tignan ang mga sagot ng estudyante</button>
        </div>

        <div className="card">
          <h2 className="title">Storytelling Animations</h2>
          <img
            src="Storytelling.webp"
            alt="Storytelling"
            className="card-image"
            style={{ width: "90%" }}
          />
          <p className="description">
            Panuorin or I-download ang mga animation ng mga alamat.
          </p>
          <button className="card-button">Download</button>
        </div>

        <div className="card">
          <h2 className="title">Gumawa ng Class Code</h2>
          <img
            src="Code.webp"
            alt="Original Sources"
            className="card-image"
            style={{ width: "90%" }}
          />
          <p className="description">
            Gumawa ng class code para sa iyong mga estudyante.
          </p>
          <button className="card-button" onClick={() => navigate("/code")}>Pumasok</button>
        </div>
      </div>
    </>
  );
}

export default TeachersCorner;
