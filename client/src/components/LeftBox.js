import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from '../styles';

export default function LeftBox() {

    const classes = useStyles();

    return (
            <Grid item xs={12} md={4} lg={4} className={classes.bgImage}>
                <Grid container className={classes.bubble} spacing={1}>
                    <Grid item xs={12}>
                        <img className={classes.bubbleGap} src={`assets/bubble.svg`} alt="speech bubble svg" sx={{ marginBottom: 30 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5">Converse with anyone</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" gutterBottom>with any language</Typography>
                    </Grid>
                </Grid>
            </Grid>
    )
}
