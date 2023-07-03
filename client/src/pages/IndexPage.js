import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../redux/loansSlice";
import { setPage } from "../redux/pageSlice";
import ClientTable from "../components/ClientTable";
import { Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import LoadingSpinner from "../components/LoadingSpinner";

const IndexPage = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const savedLoans = JSON.parse(localStorage.getItem("loans"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const settings = useSelector((state) => state.settings.settings)

  useEffect(() => {
    dispatch(setPage('index'))
  }, [dispatch])

  useEffect(() => {
    const getData = async () => {
      try {
        if (!savedLoans) {
          const loanResponse = await axios.get("/loans");
          dispatch(setLoans(loanResponse.data));
        } else {
          dispatch(setLoans(savedLoans));
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
        setIsLoading(false);
      }
    };

    try {
      getData();
    } catch (error) {
      console.error("Error in useEffect:", error);
      setError("Error in useEffect");
      setIsLoading(false);
    }
  }, [dispatch, savedLoans]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
      <div>
        {settings && (
          <div className="grid grid-cols-8">
            <div className="text-sm p-4 col-span-1 min-h-screen flex flex-col sidebar">
              <SideBar />
            </div>
            <div className="col-span-7">
              <ClientTable />
            </div>
          </div>
        )}
        {!settings && (<ClientTable/>)}
      </div>
  );
};

export default IndexPage;
