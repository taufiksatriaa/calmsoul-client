import { Typography, Grid, Paper } from "@mui/material";
import { useContext } from "react";
import { SocketContext } from "../Context";

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  return (
    <>
      <div>VideoPlayer</div>
      <Grid container>
        {stream && (
          <Paper>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {name || "Name"}
              </Typography>
              <video playsInline muted ref={myVideo} autoPlay />
            </Grid>
          </Paper>
        )}
        {callAccepted && !callEnded && (
          <Paper>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" gutterBottom>
                {call.name || "Name"}
              </Typography>
              <video playsInline ref={userVideo} autoPlay />
            </Grid>
          </Paper>
        )}
      </Grid>
    </>
  );
};
export default VideoPlayer;
