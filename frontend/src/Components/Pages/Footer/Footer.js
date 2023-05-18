import React from "react";
import { makeStyles } from "@mui/styles";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import AppsSharpIcon from '@mui/icons-material/AppsSharp';
import FacebookSharpIcon from '@mui/icons-material/FacebookSharp';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
const useStyles = makeStyles((theme) => ({
 
  iconButton: {
    color: "#fff",
  },
}));

function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container justifyContent="center" alignItems="center">
          <Grid item>
            <AppsSharpIcon
              className={classes.AppsSharpIcon}
              component="a"
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener"
            >
              <FacebookSharpIcon />
            </AppsSharpIcon>
          </Grid>
          <Grid item>
            <AppsSharpIcon
              className={classes.AppsSharpIcon}
              component="a"
              href="https://twitter.com/"
              target="_blank"
              rel="noopener"
            >
              <TwitterIcon />
            </AppsSharpIcon>
          </Grid>
          <Grid item>
            <AppsSharpIcon
              className={classes.AppsSharpIcon}
              component="a"
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener"
            >
              <InstagramIcon />
            </AppsSharpIcon>
          </Grid>
          <Grid item>
            <AppsSharpIcon
              className={classes.AppsSharpIcon}
              component="a"
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener"
            >
              <GitHubIcon />
            </AppsSharpIcon>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
