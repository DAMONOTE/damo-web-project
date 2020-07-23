import React from 'react';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Signin from './Signin'
import Signup from './Signup'
import { FormLabel } from '@material-ui/core';

const useStyles = makeStyles({
    signBox: {
        flexGrow: 1,
        maxWidth: 1000,
        justify: "center",
        margin: "auto",
        marginTop: 200
    },
    titleLabel: {
        display: 'flex',
        justifyContent: 'center',
        margin: "auto",
        fontSize: "50px"
    },
    borderPaper:{
        maxWidth: 500,
        justify: "center",
        margin: "auto",
        border:"1px solid",
        borderRadius:"3px",
        marginTop:"25px"
    }
});

export default function LoginBoxTest() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.signBox}>
            <FormLabel className={classes.titleLabel}>Welcome to DAMONote</FormLabel>
            <Paper square className={classes.borderPaper}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary"
                    aria-label="icon label tabs example"
                    centered
                >
                    <Tab label="SIGNIN" />
                    <Tab label="SIGNUP" />
                </Tabs>
                {value == 1 ? <Signup></Signup> : <Signin></Signin>}
            </Paper>
        </Box>
    );
}