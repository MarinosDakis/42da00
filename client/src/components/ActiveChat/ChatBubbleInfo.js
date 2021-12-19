import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
import ImageDisplay from "./ImageDisplay";

const useStyles = makeStyles(() => ({
    date: {
        fontSize: 11,
        color: "#BECCE2",
        fontWeight: "bold",
        marginBottom: 5
    },
    otherBubble: {
        backgroundImage: "linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)",
        borderRadius: "0 10px 10px 10px"
    },
    senderBubble: {
        background: "#F4F6FA",
        borderRadius: "10px 10px 0 10px"
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#FFFFFF",
        letterSpacing: -0.2,
        padding: 8
    },
    senderColor: {
        color: "#91A3C0",
    },
    otherColor: {
        color: "#FFF",
    },
}));

export default function ChatBubbleInfo(props) {
    const classes = useStyles();
    const { text, time, otherUser, images } = props;

    return (
        <>
            <Typography className={classes.date}>{otherUser && otherUser.username + " "}{time}</Typography>
            <ImageDisplay images={images} position="right" />
            {text && <Box className={otherUser ? classes.otherBubble : classes.senderBubble}>
                <Typography className={otherUser ? classes.text + " " + classes.otherColor : classes.text + " " + classes.senderColor}>{text}</Typography>
            </Box>}
        </>
    )
}
