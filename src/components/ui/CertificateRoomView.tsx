"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Expand, RotateCcw, LogOut, MousePointer2 } from "lucide-react";
import { certificates } from "@/data/certificates";
import type { CertificateRoom, RoomAction } from "./certificate-room";

const actions:Record<string,RoomAction>={w:"forward",ArrowUp:"forward",s:"back",ArrowDown:"back",a:"left",ArrowLeft:"left",d:"right",ArrowRight:"right",q:"turnLeft",e:"turnRight"};
export function CertificateRoomView({onInspect,paused,onList}:{onInspect:(id:string,opener:HTMLElement)=>void;paused:boolean;onList:()=>void}){
  const [entered,setEntered]=useState(false),[ready,setReady]=useState(false),[error,setError]=useState<string|null>(null),[tour,setTour]=useState(-1),[notice,setNotice]=useState("");
  const host=useRef<HTMLDivElement>(null),shell=useRef<HTMLDivElement>(null),enterButton=useRef<HTMLButtonElement>(null),controller=useRef<CertificateRoom|null>(null);
  const inspectCallback=useRef(onInspect),drag=useRef<{x:number;y:number;distance:number}|null>(null);
  useEffect(()=>{inspectCallback.current=onInspect},[onInspect]);
  useEffect(()=>{
    if(!entered)return;let cancelled=false;
    import("./certificate-room").then(({createCertificateRoom})=>{
      if(cancelled||!host.current)return;
      try{controller.current=createCertificateRoom(host.current,()=>setError("The 3D view was interrupted. You can re-enter or use the list."));setReady(true);host.current.focus()}
      catch{setError("3D graphics are unavailable on this device. The full certificate list is still available.")}
    }).catch(()=>setError("The 3D gallery could not load. Please retry or use the list."));
    const release=()=>{Object.values(actions).forEach(action=>controller.current?.control(action,false));drag.current=null};
    const blur=()=>release();window.addEventListener("blur",blur);
    function keyup(event:KeyboardEvent){const action=actions[event.key.length===1?event.key.toLowerCase():event.key];if(action)controller.current?.control(action,false)}
    window.addEventListener("keyup",keyup);
    return()=>{cancelled=true;release();controller.current?.dispose();controller.current=null;window.removeEventListener("blur",blur);window.removeEventListener("keyup",keyup)};
  },[entered]);
  useEffect(()=>{controller.current?.pause(paused)},[paused,ready]);
  function showCredential(id:string){const opener=host.current;if(!opener)return;if(document.fullscreenElement)void document.exitFullscreen().then(()=>inspectCallback.current(id,opener)).catch(()=>inspectCallback.current(id,opener));else inspectCallback.current(id,opener)}
  function inspectAt(x:number,y:number){if(!controller.current||!host.current)return;const id=controller.current.pick(x,y);if(id)showCredential(id);else setNotice("Select a framed certificate, or use Next frame to approach one.")}
  function leave(){setEntered(false);setReady(false);setTour(-1);setNotice("");requestAnimationFrame(()=>enterButton.current?.focus())}
  function visit(direction:number){const next=tour<0?(direction>0?0:certificates.length-1):(tour+direction+certificates.length)%certificates.length;setTour(next);controller.current?.focus(next);setNotice(`Facing ${certificates[next].title}. Press Enter in the 3D view to inspect.`)}
  function controlButton(action:RoomAction,label:string,icon:React.ReactNode){return <button type="button" aria-label={label} disabled={!ready||!!error} onPointerDown={event=>{event.currentTarget.setPointerCapture(event.pointerId);controller.current?.control(action,true)}} onPointerUp={()=>controller.current?.control(action,false)} onPointerCancel={()=>controller.current?.control(action,false)} onLostPointerCapture={()=>controller.current?.control(action,false)} onClick={()=>controller.current?.nudge(action)}>{icon}</button>}
  return <div ref={shell} className="walkthrough-room">
    <div className="room-viewport" ref={host} tabIndex={entered?0:-1} role="group" aria-label="3D certificate gallery. W A S D or arrow keys move, Q and E turn, drag to look, Enter inspects the center frame, Escape exits. Tab leaves the view." onKeyDown={event=>{if(paused||!ready)return;const action=actions[event.key.length===1?event.key.toLowerCase():event.key];if(action){event.preventDefault();controller.current?.control(action,true)}if(event.key==="Enter"){event.preventDefault();inspectAt(0,0)}if(event.key==="Escape"){event.preventDefault();leave()}}}
      onBlur={()=>Object.values(actions).forEach(action=>controller.current?.control(action,false))}
      onPointerDown={event=>{if(!ready||paused)return;host.current?.focus();event.currentTarget.setPointerCapture(event.pointerId);drag.current={x:event.clientX,y:event.clientY,distance:0}}}
      onPointerMove={event=>{const previous=drag.current;if(!previous||!ready||paused)return;const dx=event.clientX-previous.x,dy=event.clientY-previous.y;previous.distance+=Math.abs(dx)+Math.abs(dy);previous.x=event.clientX;previous.y=event.clientY;controller.current?.look(-dx*.004,-dy*.003)}}
      onPointerUp={event=>{const previous=drag.current;drag.current=null;if(!previous||previous.distance>8||paused)return;const rect=event.currentTarget.getBoundingClientRect();inspectAt((event.clientX-rect.left)/rect.width*2-1,-(event.clientY-rect.top)/rect.height*2+1)}} onPointerCancel={()=>{drag.current=null}} />
    {!entered && <div className="room-entry"><div className="room-entry-diagram" aria-hidden="true"><i/><i/><i/></div><p className="eyebrow">A walk through the learning</p><h2>Step inside.</h2><p>A 3D room with framed credentials, a wood floor, and space to explore. Move with WASD or arrows. Drag to look. Select a frame to inspect.</p><button ref={enterButton} type="button" onClick={()=>{setError(null);setReady(false);setEntered(true)}}>Enter the 3D gallery<ArrowRight size={17} aria-hidden="true" /></button><span>3D starts only when you enter. List view is always available.</span></div>}
    {entered&&!ready&&!error && <div className="room-loading" role="status">Preparing the room…</div>}
    {error && <div className="room-loading" role="alert"><p>{error}</p><button type="button" onClick={onList}>Use certificate list</button><button type="button" onClick={leave}>Leave room</button></div>}
    {entered&&ready&&!error && <><span className="room-crosshair" aria-hidden="true">+</span><div className="room-hud"><span>AZIM / LEARNING GALLERY</span><div><button type="button" onClick={()=>{controller.current?.reset();setTour(-1);setNotice("Returned to the room entrance.")}} aria-label="Return to room entrance"><RotateCcw size={17} /></button><button type="button" aria-label="Open gallery fullscreen" onClick={()=>{if(document.fullscreenElement===shell.current)void document.exitFullscreen();else void shell.current?.requestFullscreen().catch(()=>setNotice("Fullscreen is unavailable. You can continue in this view."))}}><Expand size={17} /></button><button type="button" onClick={leave} aria-label="Leave 3D gallery"><LogOut size={17} /></button></div></div><div className="room-touch-controls"><div className="room-dpad">{controlButton("forward","Move forward (hold)",<ArrowUp size={18}/>)}<div>{controlButton("left","Move left (hold)",<ArrowLeft size={18}/>)}{controlButton("back","Move back (hold)",<ArrowDown size={18}/>)}{controlButton("right","Move right (hold)",<ArrowRight size={18}/>)}</div></div><div className="room-turn-controls">{controlButton("turnLeft","Look left (hold)","↶")}{controlButton("turnRight","Look right (hold)","↷")}</div></div></>}
    <div className="room-tour-controls"><div><MousePointer2 size={14} aria-hidden="true" /><span>Drag to look · WASD / arrows to move · Enter to inspect</span></div><div><button type="button" disabled={!ready||!!error} onClick={()=>visit(-1)} aria-label="Approach previous certificate"><ArrowLeft size={16}/></button><span>{tour<0?"Explore freely":`${tour+1} / ${certificates.length}`}</span><button type="button" disabled={!ready||!!error} onClick={()=>visit(1)} aria-label="Approach next certificate"><ArrowRight size={16}/></button><button type="button" disabled={!ready||!!error} onClick={()=>{if(tour<0)visit(1);else if(host.current)showCredential(certificates[tour].id)}}>Inspect frame</button></div></div>
    <p className="room-announcement" role="status">{notice||"Use Next frame for a guided visit, or explore the room freely."}</p>
  </div>;
}
