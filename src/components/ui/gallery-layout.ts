export type RoomPose={x:number;z:number;yaw:number;pitch:number};
export const roomBounds={minX:-11.8,maxX:11.8,minZ:-15.8,maxZ:15.8};
export const galleryPlacements=[...[-8.4,-2.8,2.8,8.4].map(x=>({x,z:-16.7,yaw:0})),...[-9,0,9].map(z=>({x:-12.7,z,yaw:Math.PI/2})),...[-9,0,9].map(z=>({x:12.7,z,yaw:-Math.PI/2}))];
export function moveInRoom(pose:RoomPose,forward:number,sideways:number,seconds:number):RoomPose{
const scale=4*Math.min(Math.max(seconds,0),.05)/Math.max(1,Math.hypot(forward,sideways));return {...pose,x:Math.min(roomBounds.maxX,Math.max(roomBounds.minX,pose.x+(-Math.sin(pose.yaw)*forward+Math.cos(pose.yaw)*sideways)*scale)),z:Math.min(roomBounds.maxZ,Math.max(roomBounds.minZ,pose.z+(-Math.cos(pose.yaw)*forward-Math.sin(pose.yaw)*sideways)*scale))};}
export function faceExhibit(index:number):RoomPose{const spot=galleryPlacements[index%galleryPlacements.length];return {x:spot.x+Math.sin(spot.yaw)*6,z:spot.z+Math.cos(spot.yaw)*6,yaw:spot.yaw,pitch:0};}
