import React from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  trailerBtn: {
    float: "right",
    // paddingTop: "55%",
    border: "none",
    bottom: "1rem",
    objectFit: "cover",
    opacity: "0.4",
    width: "100%",
    height: "100%",
    "&:hover": {
      opacity: 0.6
    }
  },
  trailerBtnWrapper: {
    width: "300px",
    height: "200px",
    backgroundColor: "black",
    float: "right",
    position: "relative"
  },
  trailerIcon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white"
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: "black",
    border: "2px solid #000"
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3)
  }
});

const Trailer = ({ posterPath, videos }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.trailerBtnWrapper}>
      <PlayArrowIcon fontSize="large" className={classes.trailerIcon} />
      <input
        type="image"
        src={`https://image.tmdb.org/t/p/original/${posterPath}`}
        alt="Watch trailer"
        className={classes.trailerBtn}
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <iframe
            width="620"
            height="415"
            src={`https://www.youtube.com/embed/${videos?.results[0]?.key}?autoplay=1&mute=1`}
            className={classes.trailer}
          ></iframe>
        </Fade>
      </Modal>
    </div>
  );
};

export default Trailer;
