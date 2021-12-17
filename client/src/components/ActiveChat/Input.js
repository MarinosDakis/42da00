import React, { useState } from "react";
import { FormControl, FilledInput, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FileUploadIcon from '@mui/icons-material/FileUpload';
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
  imgList: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#ededed",
    borderRadius: 15,
  }
}));

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

  const onFileChange = async (e) => {

    const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`;
    const selectedFiles = [...e.target.files];

    selectedFiles.map(async (item) => {

      const formData = new FormData();
      formData.append("file", item);
      formData.append("upload_preset", `${process.env.REACT_APP_UPLOAD_PRESET}`);

      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
        transformRequest: (data, headers) => {
          delete headers["x-access-token"];
          return data;
        },
      };

      await axios.post(url, formData, config)

        .then((response) => {
          setUploadedFiles(oldArray => [...oldArray, response.data.secure_url]);
          return response;
        })

        .catch((error) => console.log(error));

    });

  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
      <Typography className={classes.imgList}>{uploadedFiles.length > 0 ? `${uploadedFiles.length} ${uploadedFiles.length === 1 ? "Image" : "Images"} Attached` : ""}</Typography>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
          endAdornment={
              <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" multiple type="file" onChange={onFileChange} style={{ display: "none" }} />
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <FileUploadIcon />
                </IconButton>
              </label>
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
