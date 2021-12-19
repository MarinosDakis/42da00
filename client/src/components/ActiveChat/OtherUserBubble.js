import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";
import ChatBubbleInfo from "./ChatBubbleInfo";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex"
  },
  avatar: {
    height: 30,
    width: 30,
    marginRight: 11,
    marginTop: 6
  },
  reverse: {
    flexDirection: "column-reverse",
    display: "flex",
  },
}));

const OtherUserBubble = (props) => {
  const classes = useStyles();
  const { text, time, otherUser, images } = props;

  return (
    <Box className={`${images && images.length > 2 ? classes.reverse : classes.root} `}>
      <Avatar alt={otherUser.username} src={otherUser.photoUrl} className={classes.avatar}></Avatar>
      <Box>
        <ChatBubbleInfo text={text} time={time} otherUser={otherUser} images={images} />
      </Box>
    </Box>
  );
};

export default OtherUserBubble;
