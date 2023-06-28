import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoans } from "../redux/loansSlice";
import ClientTable from "../components/ClientTable";
import { Navigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const IndexPage = () => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const savedLoans = JSON.parse(localStorage.getItem("loans"));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Box sx={{ display: 'flex', justifyContent: "center", marginTop: "8rem" }}>
        <CircularProgress color="inherit"  />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <ClientTable />
    </div>
  );
};

export default IndexPage;
