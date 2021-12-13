import { makeStyles } from '@material-ui/core/styles';

const mainColor = "#2596be";

export default makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        width: "100%",
        height: "100vh",
    },
    button: {
        "&.MuiButton-text": {
            color: mainColor,
        },
        "&.MuiButton-contained": {
            color: "white",
            backgroundColor: mainColor,
            width: 120,
        },
    },
    bgImage: {
        backgroundImage: `linear-gradient(0deg, rgb(40 40 40 / 30%), rgb(84 184 255 / 90%)), url(assets/bg-img.png)`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    view: {
        height: "100vh",
    },
    bubble: {
        marginTop: "30vh",
        display: "flex",
        justifyContent: "center",
        color: "#FFF",
        textAlign: "center",
    },
    bubbleGap: {
        marginBottom: 30,
    },
    header: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        color: "#bbbbbb",
        margin: "3vh",
    },
    details: {
        margin: "10vh 0 20vh 0",
        '& .MuiGrid-root': {
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 20px 0",
        },
        '& .MuiInputBase-input': {
            width: "400px",
        },
        '& .MuiFormControl-root': {
            width: "400px",
        },
    },
    justify: {
        justifyContent: "center",
        display: "flex",
    },
    createHeader: {
        marginRight: 100,
    },
    loginHeader: {
        marginRight: 160,
    },
    [theme.breakpoints.down("sm")]: {
        bubble: {
            margin: "10vh 0 10vh 0",
        },
    }
}));