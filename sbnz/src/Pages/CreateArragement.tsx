import { Button, Grid, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

interface TourDTO {
  tourName: string;
  tourDescription: string;
  price: number;
  totalPrice: number;
  participantsCount: number;
  category: TourCategory;
}

enum TourCategory {
  HISTORICAL,
  CULTURAL,
  ADVENTURE,
  NATURE,
  OTHER,
}

enum ArrangementType {
  FAMILY,
  GROUP,
  INDIVIDUAL,
}

const CreateArrangement: React.FC = () => {
  const navigate = useNavigate();
  const [tours, setTours] = useState<TourDTO[]>([]);
  const [arrangementName, setArrangementName] = useState("");
  const [arrangementDescription, setArrangementDescription] = useState("");
  const [arrangementPrice, setArrangementPrice] = useState(0);
  const [arrangementImage, setArrangementImage] = useState("");
  const [arrangementType, setArrangementType] = useState("");
  const [tourName, setTourName] = useState("");
  const [tourDescription, setTourDescription] = useState("");
  const [tourPrice, setTourPrice] = useState(0);
  const [tourTotalPrice, setTourTotalPrice] = useState(0);
  const [tourParticipantsCount, setTourParticipantsCount] = useState(0);
  const [tourCategory, setTourCategory] = useState<TourCategory>(
    TourCategory.OTHER
  );

  const handleAddTour = () => {
    const newTour: TourDTO = {
      tourName,
      tourDescription,
      price: tourPrice,
      totalPrice: tourTotalPrice,
      participantsCount: tourParticipantsCount,
      category: tourCategory,
    };

    setTours([...tours, newTour]);
    setTourName("");
    setTourDescription("");
    setTourPrice(0);
    setTourTotalPrice(0);
    setTourParticipantsCount(0);
    setTourCategory(TourCategory.OTHER);
  };

  const handleCreateArrangement = async () => {
    await api.post("/arrangements/add", {
      name: arrangementName,
      description: arrangementDescription,
      price: arrangementPrice,
      image: arrangementImage,
      type: arrangementType,
      tours,
    });
    // Redirect to the home page
    navigate("/");
  };

  return (
    <div>
      {/* Your arrangement creation form */}
      <Grid
        container
        direction={"column"}
        spacing={2}
        mt={4}
        width={"40%"}
        ml={2}
      >
        <TextField
          sx={{ mb: 1 }}
          label="Arrangement Name"
          value={arrangementName}
          onChange={(e) => setArrangementName(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Arrangement Description"
          value={arrangementDescription}
          onChange={(e) => setArrangementDescription(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Arrangement Price"
          type="number"
          value={arrangementPrice}
          onChange={(e) => setArrangementPrice(Number(e.target.value))}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Arrangement Image"
          value={arrangementImage}
          onChange={(e) => setArrangementImage(e.target.value)}
        />

        <TextField
          sx={{ mb: 1 }}
          label="Arrangement Type"
          value={arrangementType}
          onChange={(e) => setArrangementType(e.target.value)}
        />
      </Grid>
      <hr />
      <Grid
        container
        direction={"column"}
        spacing={2}
        mt={4}
        width={"40%"}
        ml={2}
      >
        <Typography variant="h5">Tours</Typography>
        {tours.map((tour, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            <TextField label="Tour Name" disabled value={tour.tourName} />
            <TextField
              label="Tour Description"
              disabled
              value={tour.tourDescription}
            />
            <TextField
              label="Tour Price"
              type="number"
              disabled
              value={tour.price}
            />
            <TextField
              label="Tour Total Price"
              type="number"
              disabled
              value={tour.totalPrice}
            />
            <TextField
              label="Tour Participants Count"
              type="number"
              disabled
              value={tour.participantsCount}
            />
            <TextField label="Tour Category" disabled value={tour.category} />
          </div>
        ))}
      </Grid>
      <hr />
      {/* Your tour creation form */}
      <Grid
        container
        direction={"column"}
        spacing={2}
        mt={4}
        width={"40%"}
        ml={2}
      >
        <TextField
          sx={{ mb: 1 }}
          label="Tour Name"
          value={tourName}
          onChange={(e) => setTourName(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Tour Description"
          value={tourDescription}
          onChange={(e) => setTourDescription(e.target.value)}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Tour Price"
          type="number"
          value={tourPrice}
          onChange={(e) => setTourPrice(Number(e.target.value))}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Tour Total Price"
          type="number"
          value={tourTotalPrice}
          onChange={(e) => setTourTotalPrice(Number(e.target.value))}
        />
        <TextField
          sx={{ mb: 1 }}
          label="Tour Participants Count"
          type="number"
          value={tourParticipantsCount}
          onChange={(e) => setTourParticipantsCount(Number(e.target.value))}
        />
        <Select
          sx={{ mb: 1 }}
          native
          value={tourCategory}
          onChange={(e) => setTourCategory(Number(e.target.value))}
        >
          <option value={TourCategory.HISTORICAL}>Historical</option>
          <option value={TourCategory.CULTURAL}>Cultural</option>
          <option value={TourCategory.ADVENTURE}>Adventure</option>
          <option value={TourCategory.NATURE}>Nature</option>
          <option value={TourCategory.OTHER}>Other</option>
        </Select>
        <Button variant="contained" onClick={handleAddTour} sx={{ mb: 1 }}>
          Add Tour
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateArrangement}
          sx={{ mb: 1 }}
        >
          Create Arrangement
        </Button>
      </Grid>
    </div>
  );
};

export default CreateArrangement;
