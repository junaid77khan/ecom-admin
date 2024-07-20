

import { useEffect, useState } from "react";
import CardTable from "../components/Cards/CardTable";
import { useNavigate } from "react-router-dom";


export default function Tables() {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState(false);

    useEffect(() => {
      const checkUserStatus = async () => {
          try {
              let expiry = JSON.parse(localStorage.getItem("accessToken"));
              if (expiry && new Date().getTime() < expiry) {
                  setUserStatus(true);
              } else {
                  setUserStatus(false);
                  navigate("/")
              }
          } catch (error) {
              console.error('Error checking user status:', error);
              setUserStatus(false);
              navigate("/")
          }
      };

      checkUserStatus();
  }, []);
  return (
    <div className="relative md:ml-64 ">
      <div className="px-4 md:px-10 mx-auto w-full">
      <div className="flex flex-wrap mt-4 ">
        <div className="w-full mb-12 px-4">
          <CardTable />
        </div>
      </div>
    </div>
    </div>
  );
}
