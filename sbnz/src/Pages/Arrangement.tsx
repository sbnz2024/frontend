import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api";

interface Arrangement {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  type: string;
  tours: Tour[];
}

interface Tour {
  tourName: string;
  tourDescription: string;
  price: number;
  totalPrice: number;
  participantsCount: number;
  category: string;
}

interface Rating {
  ratingValue: number;
  comment: string;
  arrangementId: number;
  user: number;
  ratingDate: string;
}

const ArrangementPage: React.FC = () => {
  const userRole = localStorage.getItem("role");
  const { arrId } = useParams<{ arrId: string }>();
  const [arrangement, setArrangement] = React.useState<Arrangement | null>(
    null
  );

  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [ratings1, setRatings] = useState<Rating[]>([]);

  const handleRate = async () => {
    await api.post(
      "/ratings/add",
      {
        ratingValue: rating,
        comment,
        arrangementId: arrangement?.id,
        userId: localStorage.getItem("userId"),
        ratingDate: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setComment("");
    setRating("");
    fetchRatings();
  };

  const fetchRatings = async () => {
    const response = await api.get(`/ratings/${arrId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setRatings(response.data as Rating[]);
  };

  const fetchArrangement = async () => {
    const response = await api.get(`/arrangements/${arrId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    setArrangement(response.data as Arrangement);
  };
  React.useEffect(() => {
    fetchArrangement();
    fetchRatings();
  }, []);

  if (!arrangement || !ratings1) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box>
      <Typography variant="h1">{arrangement.name}</Typography>
      <Typography>{arrangement.description}</Typography>
      <Typography>Price: {arrangement.price}</Typography>

      <Card>
        <img src={arrangement.image} alt={arrangement.name} />
        {arrangement.tours.map((tour, index) => (
          <CardContent>
            <Typography variant="h2">Tour Details</Typography>
            <Typography>{tour.tourDescription}</Typography>
            <Typography>Price: {tour.price}</Typography>
            <Typography>Total Price: {tour.totalPrice}</Typography>
            <Typography>
              Participants Count: {tour.participantsCount}
            </Typography>
            <Typography>Category: {tour.category}</Typography>
          </CardContent>
        ))}
      </Card>
      {userRole === "ROLE_USER" && (
        <Box>
          <Typography variant="h6">Rate</Typography>
          <TextField
            label="Rating"
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Comment"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleRate}>
            Rate
          </Button>
        </Box>
      )}
      {ratings1.map((rating, index) => (
        <Box
          key={index}
          sx={{
            backgroundColor: "#aaaaaa",
            margin: 1,
            padding: 1,
            borderRadius: 4,
          }}
        >
          <Typography>{rating.user}</Typography>
          <Typography>{rating.ratingValue}</Typography>
          <Typography>{rating.comment}</Typography>
          <Typography>{rating.ratingDate}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ArrangementPage;
