import { Box, Typography } from "@mui/material";
import { api } from "../api";
import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

interface Arrangement {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
}

const Home = () => {
  const [arrangements, setArrangements] = useState<Arrangement[]>([]);
  const navigate = useNavigate();
  const fethcTours = async () => {
    const response = await api.get("/arrangements/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setArrangements(response.data as Arrangement[]);
  };

  useEffect(() => {
    fethcTours();
  }, []);

  if (arrangements.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box mt={3} display="flex" flexDirection="column" alignItems="center">
      {arrangements.map((tour, idx) => (
        <Box
          key={tour.id}
          borderRadius={4}
          bgcolor="primary.main"
          color="primary.contrastText"
          p={2}
          mb={2}
          display={"flex"}
          alignItems="center"
          width={"50%"}
          onClick={() => navigate(`/arr/${tour.id}`)}
        >
          <Box flex={1}>
            <Typography variant="h6">{tour.name}</Typography>
            <Typography variant="body1">{tour.description}</Typography>
            <Typography variant="body1">Price: ${tour.price}</Typography>
            <Typography variant="body1">Type: {tour.type}</Typography>
          </Box>
          <img
            src={tour.image}
            alt={tour.name}
            style={{ marginLeft: "16px", width: "200px" }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default Home;
