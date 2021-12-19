import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    rightOutline: {
        borderRadius: "10px 10px 0 10px",
        marginLeft: 10,
    },
    leftOutline: {
        borderRadius: "0 10px 10px 10px",
        marginLeft: 10,
    },
    grid: {
        display: "flex",
    },
}));

const ImageDisplay = (props) => {
    const classes = useStyles();
    const { images, position } = props;

    if (images === null) return null;

    return (
        <Grid className={classes.grid}>
            {images && images.map((item, index) => (
                <Grid item key={index} xs={6}>
                    <img src={item}
                        alt="chat_image"
                        height={images.length === 1 ? 150 : 100}
                        width={images.length === 1 ? 200 : 150}
                        className={position === "right" ? classes.rightOutline : classes.leftOutline}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageDisplay;
