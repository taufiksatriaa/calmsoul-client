import { Typography, AppBar } from "@mui/material";
import VideoPlayer from "../components/VideoPlayer";
import Options from "../components/Options";
import Notifications from "../components/Notifications";
// import ContextProvider, { SocketContext } from "../Context";

const Live = () => {
  return (
    <>
      <div>
        <AppBar position="static" color="inherit">
          <Typography variant="h5" align="center">
            Video Chat
          </Typography>
        </AppBar>
        <VideoPlayer />
        <Options>
          <Notifications />
        </Options>
        {/* <ContextProvider /> */}
      </div>
    </>
  );
};
export default Live;
