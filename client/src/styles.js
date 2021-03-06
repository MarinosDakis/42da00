import { makeStyles } from '@material-ui/core/styles';

const mainColor = "#3A8DFF";

export default makeStyles((theme) => ({
    root: {
        justifyContent: "center",
        width: "100%",
        height: "100vh",
    },
    button: {
        "&.MuiButton-text": {
            color: mainColor,
            width: 160,
            height: 56,
            borderRadius: 5,
            boxShadow: "0px 2px 12px rgba(74, 106, 149, 0.2)",
        },
        "&.MuiButton-contained": {
            color: "white",
            backgroundColor: mainColor,
            width: 160,
            height: 56,
        },
    },
    forgot: {
        "&.MuiButton-text": {
            color: mainColor,
        },
    },
    bgImage: {
        backgroundImage: "linear-gradient(180deg, rgb(58 141 255 / 85%), rgb(134 185 255 / 100%)), url(assets/bg-img.png)",
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
        display: "flex",
        justifyContent: "end",
        margin: "-30px 30px 0px 0",
    },
    headerText: {
        marginTop: "3vh",
        color: "#B0B0B0",
        fontSize: 14,
        textAlign: "center",
    },

    details: {
        margin: "10vh 0 20vh 0",
        '& .MuiGrid-root': {
            display: "flex",
            justifyContent: "center",
            margin: "20px 0 20px 0",
        },
        '& .MuiInputBase-input': {
            width: 400,
        },
        '& .MuiFormControl-root': {
            width: 380,
        },
    },
    justify: {
        justifyContent: "center",
        display: "flex",
    },
    createHeader: {
        marginRight: 90,
    },
    loginHeader: {
        marginRight: 150,
    },
    [theme.breakpoints.down("sm")]: {
        bgImage: {
            display: "none",
        },
    }
}));