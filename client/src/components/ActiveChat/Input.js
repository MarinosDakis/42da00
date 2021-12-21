import React, { useState } from "react";
import { FormControl, FilledInput, Grid } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import { makeStyles } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import ImageIcon from '@mui/icons-material/Image';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from "@mui/material";
import axios from "axios";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20
  },
  info: {
    display: "flex",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: "#ededed",
  }
}));

const displayTheme = createTheme({
  typography: {
    subtitle1: {
      fontSize: 16,
      fontWeight: 700,
    },
  },
});

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
    const reqBody = {
      text: event.target.text.value,
      recipientId: otherUser.id,
      conversationId,
      sender: conversationId ? null : user,
      attachments: uploadedFiles,
    };
    await postMessage(reqBody);
    setUploadedFiles([]);
    setText("");
  };

  const clearImages = () => { setUploadedFiles([]); }

  const onFileChange = async (e) => {

    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    const selectedFiles = [...e.target.files];

    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
      transformRequest: (data, headers) => {
        delete headers["x-access-token"];
        return data;
      },
    }

    Promise.all(

      selectedFiles.map(async (item) => {

        const formData = new FormData();
        formData.append("file", item);
        formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);

        try {
          const response = await axios.post(url, formData, config);
          setUploadedFiles(oldArray => [...oldArray, response.data.secure_url]);
        } catch (error) { console.error(error); }

      })

    );

  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <ThemeProvider theme={displayTheme}>
          <Typography variant="subtitle1" className={classes.info}>{uploadedFiles.length > 0 ? `${uploadedFiles.length} ${uploadedFiles.length === 1 ? "Image" : "Images"} Attached` : ""}</Typography>
        </ThemeProvider>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
            <Grid container justifyContent="flex-end">
              <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" multiple type="file" onChange={onFileChange} style={{ display: "none" }} />
                <IconButton color="primary" aria-label="upload pictures" component="span">
                  <ImageIcon />
                </IconButton>
              </label>
              <label htmlFor="icon-button-delete">
                <IconButton color="primary" aria-label="delete pictures" component="span" onClick={clearImages}>
                  <ClearIcon />
                </IconButton>
              </label>
            </Grid>
          }
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
