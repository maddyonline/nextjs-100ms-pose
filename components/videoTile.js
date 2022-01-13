import React from "react";
import {
  useHMSActions,
  useHMSStore,
  selectCameraStreamByPeerID
} from "@100mslive/hms-video-react";




import { usePoseTracker } from "../components/pose/pose_utils"

import { posesState } from "./globals"


const VideoTile = ({ peer, isLocal }) => {
  const hmsActions = useHMSActions();
  const videoRef = React.useRef(null);
  const videoTrack = useHMSStore(selectCameraStreamByPeerID(peer.id));
  if (!isLocal)
    usePoseTracker({ videoRef, posesState })

  React.useEffect(() => {
    (async () => {
      console.log(videoRef.current);
      console.log(videoTrack);
      if (videoRef.current && videoTrack) {
        if (videoTrack.enabled) {
          await hmsActions.attachVideo(videoTrack.id, videoRef.current);
        } else {
          await hmsActions.detachVideo(videoTrack.id, videoRef.current);
        }
      }
    })();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoTrack]);

  return (
    <div className="flex m-1">
      <div className="relative">
        {/* <div style={{ backgroundColor: "white", color: 'red' }}>{"poses: "} {JSON.stringify(poses)}</div> */}
        {/* <button style={{ backgroundColor: "white", color: 'red' }} onClick={() => setPoses([{ id: 3 }])}>click</button> */}
        <video
          ref={videoRef}
          autoPlay={true}
          playsInline
          muted={true}
          className={`object-cover h-64 w-64 rounded-lg shadow-lg ${isLocal ? "mirror" : ""
            }`}
        ></video>
        <div className="top-0 w-full absolute flex justify-center">
          <div className="px-2 py-1 text-sm bg-gray-600 text-white mt-2 ml-2 rounded-lg">{`${peer.name}`}</div>
        </div>
      </div>
    </div>
  );
};

export default VideoTile;
