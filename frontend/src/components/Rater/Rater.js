import React from "react";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import Grid from "@material-ui/core/Grid";

const Rater = ({ voteAverage, direction }) => {
  const ratingEdges = [0, 2, 4, 6, 8];

  return (
    <Grid container style={{ flexWrap: "nowrap" }} direction={direction}>
      {ratingEdges.map((val, index) => (
        <Grid item>
          {voteAverage >= val ? (
            <StarIcon color="primary" fontSize="small" />
          ) : (
            <StarBorderIcon color="primary" fontSize="small" />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default Rater;
