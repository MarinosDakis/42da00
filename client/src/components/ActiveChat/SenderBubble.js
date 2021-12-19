import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import ChatBubbleInfo from "./ChatBubbleInfo";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  reverse: {
    flexDirection: "column-reverse",
    display: "flex",
    alignItems: "flex-end"
  },
}));

const SenderBubble = (props) => {
  const classes = useStyles();
  const { time, text, images } = props;

  return (
    <Box className={`${images && images.length > 2 ? classes.reverse : classes.root} `}>
      <ChatBubbleInfo text={text} time={time} images={images} />
    </Box>
  );
};

export default SenderBubble;
