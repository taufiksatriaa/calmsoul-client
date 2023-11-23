/* eslint-disable react/prop-types */
import global from "global";
import * as process from "process";

import { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
// const randombytes = require("randombytes");
import Peer from "simple-peer";
global.process = process;

const SocketContext = createContext();

const socket = io("https://h29jm9rs-3000.asse.devtunnels.ms/");

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState({}); //add {}
  const [name, setName] = useState("");
  const [call, setCall] = useState({});
  const [me, setMe] = useState("");

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  // console.log(myVideo.current);
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        // console.log(stream);
        // console.log(myVideo.current);
        myVideo.current.srcObject = currentStream; //apus srcObject
      })
      .catch((err) => console.log(err));

    socket.on("me", (id) => setMe(id));

    socket.on("callUser", ({ from, name: callerName, signal }) => {
      console.log("masuk callUSer");
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });
  }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });
    console.log(peer, "<<<<<");

    peer.on("signal", (data) => {
      console.log("msuk signal");
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };
  console.log(call, "<<<<<");
  return (
    <>
      <SocketContext.Provider
        value={{
          call,
          callAccepted,
          myVideo,
          userVideo,
          stream,
          name,
          setName,
          callEnded,
          me,
          callUser,
          leaveCall,
          answerCall,
        }}
      >
        {children}
      </SocketContext.Provider>
    </>
  );
};
export { SocketContext };
export default ContextProvider;
