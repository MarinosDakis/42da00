import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { IconButton } from "@mui/material";
//import {Image} from 'cloudinary-react';
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
  }
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  //const [uploadedFiles, setUploadedFiles] = useState([]);
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
      attachments: "test",
    };
    await postMessage(reqBody);
    setText("");
  };

  const onFileChange = async (e) => {

    const url = `https://api.cloudinary.com/v1_1/marinosdakis/upload`;
    const selectedFiles = [e.target.files];

    selectedFiles.map(async (image, index) => {

      const formData = new FormData();
      formData.append("file", image[index]);
      formData.append("upload-preset", "pg7tb2kh");

      const Axios = axios.create({
        transformRequest: (data, headers) => {
          delete headers["x-access-token"];
          return data;
        }
    });

    const config = {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    };

      let res = await Axios.post(url, formData, config)

        .then((response) => {
          console.log("yess");
          console.log(response);
          return response;
        })

        .catch((error) => console.log(error));

      return res;

    });

  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
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
