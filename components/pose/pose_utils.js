
import * as mpPose from '@mediapipe/pose';
import * as posedetection from '@tensorflow-models/pose-detection';
import { drawPose } from './draw_utils';

import React from 'react';
import {
    useRecoilState,
} from 'recoil';




export function usePoseTracker({ videoRef, posesState }) {
    const poseDetector = React.useRef(null);
    const [_, setPoses] = useRecoilState(posesState);

    React.useEffect(() => {
        var rafId;
        const runFrame = async () => {
            if (videoRef.current && poseDetector.current) {
                const poses = await poseDetector.current.estimatePoses(
                    videoRef.current,
                    { maxPoses: 1, flipHorizontal: false });
                setPoses(poses);
            }
            rafId = requestAnimationFrame(runFrame);
        }
        const start = async () => {
            console.log("initializing mediapose", mpPose.VERSION)
            poseDetector.current = await posedetection.createDetector(posedetection.SupportedModels.BlazePose, {
                runtime: 'mediapipe',
                modelType: 'heavy',
                solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/pose@${mpPose.VERSION}`
            });
            console.log({ detector: poseDetector.current })
            setTimeout(async () => {
                console.log("now running pose estimation");
                await runFrame();
            }, 5000)

        }
        start();

        return () => {
            // cleanup
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            if (poseDetector.current) {
                poseDetector.current.dispose();
            }
        }
    }, [])


}


// function RenderPosesSimple() {
//     const poses = useRecoilValue(posesState);
//     return <>
//         {poses && poses.length > 0 ? `${poses[0].keypoints[0].x}` : "nothing to show"}
//     </>
// }

// function RenderPose({ videoRef }) {
//     const canvasRef = React.useRef(null);
//     const poses = useRecoilValue(posesState);
//     React.useEffect(() => {
//         // var rafId;
//         const draw = async () => {
//             if (canvasRef.current && poses && poses.length > 0) {

//                 drawPose(
//                     poses[0],
//                     canvasRef.current.getContext('2d'),
//                     posedetection.SupportedModels.BlazePose,
//                     0)
//             }

//         }
//         draw();
//         // return () => {
//         //   if (rafId) {
//         //     cancelAnimationFrame(rafId);
//         //   }
//         // }

//     }, [poses])

//     return <div style={{ border: "1px solid red" }}>
//         <div>Hello</div>
//         <canvas width={600} height={400} ref={canvasRef}></canvas>
//     </div>
// }

// function MyApp() {
//     const videoRef = React.useRef(null);

//     usePoseTracker({ videoRef, posesState })

//     return <>
//         <video width={600} height={400} ref={videoRef} autoPlay>
//             <source src="/home-workout.mp4" type="video/mp4" />
//         </video>
//         <button onClick={() => {
//             if (isVideoPlaying(videoRef.current)) {
//                 videoRef.current.pause();
//             } else {
//                 videoRef.current.play()
//             }
//         }}>Play/Pause</button>
//         <RenderPosesSimple />
//         <RenderPose videoRef={videoRef} />
//     </>
// }

// export default () => {
//     return (<RecoilRoot>
//         <MyApp />
//     </RecoilRoot>)
// }
