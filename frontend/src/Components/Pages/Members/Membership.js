import React from "react";
import { makeStyles } from '@mui/styles';
import MembershipCard from "./MembershipCard";
import useWindowPosition from "../../hook/useWindowPosition";
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',

    }
}));
export default function Membership() {
    const classes = useStyles();
    const checked = useWindowPosition('header');
    return (
        <div className={classes.root} id='members'>
            <MembershipCard checked={checked} />
        </div>
    )
}
