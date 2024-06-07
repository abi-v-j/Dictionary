import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState, useRef } from "react";
import "./HomePage.css";
import SendIcon from "@mui/icons-material/Send";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import axios from "axios";

const HomePage = () => {
  const [value, setValue] = useState("");
  const [check, setCheck] = useState(false);
  const [data, setData] = useState(null);
  const audioRef = useRef(null);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${value}`)
      .then((response) => {
        console.log(response.data[0]);
        setData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching the data", error);
      });
    setValue("");
    setCheck(true);
  };

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const firstPhoneticWithAudio = data?.phonetics.find(
    (phonetic) => phonetic.audio
  );

  return (
    <div className="Homepage">
      <div className="MainContainer">
        <Typography variant="h4" gutterBottom>
          Enter a Word Here...
        </Typography>
        <div className="textbox">
          <FormControl
            sx={{ mt: 4 }}
            variant="outlined"
            fullWidth
            component={"form"}
            onSubmit={handleSubmit}
          >
            <OutlinedInput
              onChange={handleChange}
              className="inputBox"
              id="outlined-adornment-password"
              autoComplete="off"
              type="text"
              value={value}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                },
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="submit the word"
                    edge="end"
                    type="submit"
                    sx={{ color: "white" }}
                  >
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {check && data && (
            <Card sx={{ p: 5, mt: 3, backgroundColor: "#f5f5f5" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h5">{data.word}</Typography>
                <Box>
                  {firstPhoneticWithAudio && (
                    <div>
                      <audio
                        ref={audioRef}
                        src={firstPhoneticWithAudio.audio}
                      ></audio>
                      <IconButton onClick={handlePlayAudio}>
                        <VolumeUpIcon />
                      </IconButton>
                    </div>
                  )}
                </Box>
              </Box>

              {data.meanings.map((mean, index) => (
                <Box key={index} mt={2}>
                  <Typography variant="h6">{mean.partOfSpeech}</Typography>
                  {mean.definitions.map((text, key) => (
                    <Typography variant="body2" key={key}>
                      - {text.definition}
                    </Typography>
                  ))}
                </Box>
              ))}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
