import { Grid, Paper, Tooltip, Typography } from '@mui/material';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import PropTypes from 'prop-types';

export const ShinyCards = ({ respData }) => {
  return(
    <Grid container justifyContent="center">
      <Grid item xs={6} sm={4} md={4} lg={4} xl={3} p={2} textAlign="center">
        <Paper elevation={8} sx={{ height: 'max-content'}}>
          <Typography variant="button">Shiny Odds</Typography>
          <Typography variant="body1">1 in {respData?.shinyOdds ? respData?.shinyOdds : '??'}</Typography>
          <Typography variant="body1">{respData?.rawShinyOdds ? respData?.rawShinyOdds : '0%'}</Typography>
        </Paper>
      </Grid>
      {
        respData?.maxShinyOdds &&
        <Grid item xs={6} sm={4} md={4} lg={4} xl={3} p={2} textAlign="center">
          <Paper elevation={8}>
            <Typography variant="button">Max Shiny Odds&nbsp;</Typography>
            <Tooltip disableFocusListener title="The game will randomly add an additional 4 rolls" placement="right" arrow>
              <HelpOutlineOutlinedIcon fontSize="small" />
            </Tooltip>
            <Typography variant="body1">1 in {respData?.maxShinyOdds ? respData?.maxShinyOdds : '??'}</Typography>
            <Typography variant="body1">{respData?.rawMaxShinyOdds ? respData?.rawMaxShinyOdds : '0%'}</Typography>
          </Paper>
        </Grid>
      }
    </Grid>
  );
}

ShinyCards.displayName = 'ShinyCards';
ShinyCards.propTypes = {
  respData: PropTypes.shape({
    shinyOdds: PropTypes.number,
    maxShinyOdds: PropTypes.number,
    rawShinyOdds: PropTypes.string,
    rawMaxShinyOdds: PropTypes.string
  }),
};