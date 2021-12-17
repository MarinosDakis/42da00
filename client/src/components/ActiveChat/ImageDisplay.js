import React from "react";
import { Grid } from "@material-ui/core";

const ImageDisplay = (props) => {
    const { images, position } = props;

    return (
        <Grid>
            {images && images.map((item, index) => (
                <Grid item key={index}>
                    <img src={item} alt="pic" height={150} width={200} style={{ borderRadius: position === "right" ? "10px 10px 0 10px" : "0 10px 10px 10px" }}></img>
                </Grid>
            ))}
        </Grid>
    );
};

export default ImageDisplay;
