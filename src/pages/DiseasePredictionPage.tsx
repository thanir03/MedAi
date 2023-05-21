import {
  Autocomplete,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { symptomList } from "../helper/symptomsList";
import styles from "./DisesePredictionPage.module.css";
import axios, { AxiosResponse } from "axios";
import { DiseaseResponseType } from "../helper/type";

const MAX_SYMPTOMS_VALUE = 6;
const START_INDEX = 0;

const DiseasePredictionPage = () => {
  const [diseaseResponse, setDiseaseResponse] =
    useState<DiseaseResponseType | null>(null);
  const [symptoms, setSymptoms] = useState<Array<string>>([symptomList[0]]);
  const [gender, setGender] = useState("Male");

  const handleAddSymptoms = (event: React.MouseEvent) => {
    event.preventDefault();
    const newSymptoms = [...symptoms, symptomList[0]];
    setSymptoms(newSymptoms);
  };
  const handleDeleteSymptoms = (symptomIndex: number) => {
    const newSymptoms = symptoms.filter((_, index) => index != symptomIndex);
    setSymptoms(newSymptoms);
  };
  const handleChangeSymptom = (index: number, value: string | null) => {
    if (value) {
      const newSymtoms = [...symptoms];
      newSymtoms[index] = value;
      setSymptoms(newSymtoms);
    }
  };
  const handleChangeGender = (value: string) => {
    setGender(value);
  };
  const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (gender.trim() === "" || symptoms.length === 0) return;
    const uniqueSymptom = [...new Set(symptoms)];
    const submittedData = {
      gender,
      uniqueSymptom,
    };
    try {
      const response: AxiosResponse<DiseaseResponseType> = await axios({
        url: "http://localhost:3000/disease",
        method: "GET",
        data: submittedData,
      });
      setDiseaseResponse(response.data);
    } catch (error) {
      console.log(error);
      setDiseaseResponse(null);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmitForm} className={styles["center"]}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ textAlign: "left" }}>Age : </h3>
          <TextField type="number" placeholder="Age" sx={{ margin: "10px" }} />
        </div>
        <div className={styles["gender-container"]}>
          <FormControl
            sx={{ marginLeft: "10px", marginBottom: "20px", width: "400px" }}
          >
            <InputLabel id="gender-select">Gender</InputLabel>
            <Select
              value={gender}
              id="gender-select"
              label="Age"
              onChange={(event) => handleChangeGender(event.target.value)}
            >
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
            </Select>
          </FormControl>
        </div>
        {symptoms.map((item, index) => (
          <div
            className={styles["symptoms-container"]}
            key={`${item} ${index}`}
          >
            <Autocomplete
              id={`combo-box-demo-${index}`}
              options={symptomList}
              value={item}
              onChange={(_, value) => handleChangeSymptom(index, value)}
              sx={{ padding: "10px", width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Symptoms" />
              )}
            />
            {index !== START_INDEX && (
              <button
                className={styles["delete-btn"]}
                onClick={() => handleDeleteSymptoms(index)}
              >
                <DeleteIcon />
              </button>
            )}
          </div>
        ))}
        {symptoms.length !== MAX_SYMPTOMS_VALUE && (
          <button className={styles["add-btn"]} onClick={handleAddSymptoms}>
            Add Symptoms
          </button>
        )}
        <button type="submit" className={styles["submit-btn"]}>
          Submit Symptoms
        </button>
      </form>
      {diseaseResponse && (
        <div className={styles["response-container"]}>
          <p>
            You are suspected to have {diseaseResponse.disease.toLowerCase()}
          </p>
          <div className={styles["response-drug-container"]}>
            <p>Recommended Drug List</p>
            {diseaseResponse.drug.map((item, index) => (
              <p className={styles["drug-item"]} key={index}>{`${
                index + 1
              })  ${item}`}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiseasePredictionPage;
