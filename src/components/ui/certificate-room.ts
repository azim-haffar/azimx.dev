import * as THREE from "three";
import { certificates, type Certificate } from "@/data/certificates";
import { faceExhibit, galleryPlacements, moveInRoom, type RoomPose } from "./gallery-layout";

export type RoomAction="forward"|"back"|"left"|"right"|"turnLeft"|"turnRight";
export type CertificateRoom={focus:(index:number)=>void;reset:()=>void;look:(x:number,y:number)=>void;control:(action:RoomAction,pressed:boolean)=>void;nudge:(action:RoomAction)=>void;pause:(value:boolean)=>void;pick:(x:number,y:number)=>string|null;dispose:()=>void};

function canvasTexture(width:number,height:number,paint:(context:CanvasRenderingContext2D)=>void){
  const canvas=document.createElement("canvas");canvas.width=width;canvas.height=height;
  const context=canvas.getContext("2d");if(!context)throw new Error("Canvas drawing is unavailable");paint(context);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
function wrap(context:CanvasRenderingContext2D,text:string,x:number,y:number,width:number,lineHeight:number,maxLines=4){
  const words=text.split(" ");const lines:string[]=[];let line="";
  for(const word of words){const next=line?`${line} ${word}`:word;if(context.measureText(next).width>width && line){lines.push(line);line=word}else line=next;}if(line)lines.push(line);
  lines.slice(0,maxLines).forEach((entry,index)=>context.fillText(index===maxLines-1&&lines.length>maxLines?entry+"…":entry,x,y+index*lineHeight));
}
function credentialTexture(certificate:Certificate){return canvasTexture(1200,840,context=>{
  context.fillStyle="#fafbf7";context.fillRect(0,0,1200,840);context.strokeStyle="#a9b8ac";context.lineWidth=3;context.strokeRect(28,28,1144,784);
  context.fillStyle="#08765a";context.fillRect(65,70,70,5);context.font="22px monospace";context.fillText(certificate.category.toUpperCase(),65,120);
  context.fillStyle="#53685c";context.font="27px sans-serif";wrap(context,certificate.issuer,65,185,1070,36,2);
  context.fillStyle="#18392b";context.font="bold 56px sans-serif";wrap(context,certificate.title,65,290,1060,67,4);
  context.fillStyle="#08765a";context.font="bold 70px sans-serif";context.fillText(certificate.level,65,625);
  context.fillStyle="#354f41";context.font="26px sans-serif";context.fillText(certificate.issued,65,705);
  context.strokeStyle="#cbd6cb";context.beginPath();context.moveTo(65,735);context.lineTo(1135,735);context.stroke();
  context.fillStyle="#53685c";context.font="20px monospace";context.fillText("AZIM HAFFAR / CREDENTIAL SUMMARY · NOT ORIGINAL",65,780);
})}

export function createCertificateRoom(host:HTMLElement,onContextLost:()=>void):CertificateRoom{
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.7));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.2;
  renderer.domElement.setAttribute("aria-hidden","true");host.appendChild(renderer.domElement);
  const scene=new THREE.Scene();scene.background=new THREE.Color("#d5dcd5");scene.fog=new THREE.Fog("#d5dcd5",35,70);
  const camera=new THREE.PerspectiveCamera(65,1,.1,90);camera.rotation.order="YXZ";
  let pose:RoomPose={x:0,z:12,yaw:0,pitch:.04};let paused=false,visible=true,dirty=true,disposed=false;
  const keys=new Set<RoomAction>();const targets:THREE.Object3D[]=[];const resources=new Set<THREE.Texture>();
  function box(width:number,height:number,depth:number,color:THREE.ColorRepresentation,x:number,y:number,z:number){const mesh=new THREE.Mesh(new THREE.BoxGeometry(width,height,depth),new THREE.MeshStandardMaterial({color,roughness:.85}));mesh.position.set(x,y,z);scene.add(mesh);return mesh;}
  scene.add(new THREE.HemisphereLight("#fff8e9","#8d7560",2.5));const sunlight=new THREE.DirectionalLight("#fff5dc",2.2);sunlight.position.set(3,12,10);scene.add(sunlight);
  const wood=canvasTexture(512,512,context=>{context.fillStyle="#ac8056";context.fillRect(0,0,512,512);for(let row=0;row<8;row++){context.fillStyle=row%2?"#b58b62":"#a57950";context.fillRect(0,row*64,512,63);context.strokeStyle="#775032";context.lineWidth=1;const split=(row%3)*150+65;context.beginPath();context.moveTo(split,row*64);context.lineTo(split,row*64+64);context.stroke();for(let grain=0;grain<8;grain++){context.strokeStyle="rgba(85,45,20,.11)";context.beginPath();context.moveTo(0,row*64+grain*7+3);context.bezierCurveTo(160,row*64+grain*7,350,row*64+grain*7+8,512,row*64+grain*7+3);context.stroke()}}});
  wood.wrapS=wood.wrapT=THREE.RepeatWrapping;wood.repeat.set(7,10);wood.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());resources.add(wood);
  const floor=new THREE.Mesh(new THREE.PlaneGeometry(26,34),new THREE.MeshStandardMaterial({map:wood,roughness:.75}));floor.rotation.x=-Math.PI/2;scene.add(floor);
  box(26.4,8,.25,"#e5e7dc",0,4,-17);box(.25,8,34,"#d9e0d8",-13,4,0);box(.25,8,34,"#d9e0d8",13,4,0);box(26.4,8,.25,"#d3dfd7",0,4,17);box(26,.15,34,"#edece2",0,8,0);
  for(const x of [-12.82,12.82])box(.08,.2,34,"#3d5047",x,.1,0);box(26,.2,.08,"#3d5047",0,.1,-16.82);
  for(const z of [-11,0,11]){const light=box(8,.05,.55,"#faf7dd",0,7.88,z);(light.material as THREE.MeshStandardMaterial).emissive.set("#fff5dc");(light.material as THREE.MeshStandardMaterial).emissiveIntensity=1;const glow=new THREE.PointLight("#f9f5dc",22,22,2);glow.position.set(0,6.5,z);scene.add(glow)}
  const heading=canvasTexture(2048,256,context=>{context.fillStyle="#e5e7dc";context.fillRect(0,0,2048,256);context.fillStyle="#193d2e";context.font="bold 85px sans-serif";context.textAlign="center";context.fillText("AZIM HAFFAR",1024,110);context.fillStyle="#557c68";context.font="30px monospace";context.fillText("LEARNING GALLERY / SELECT A FRAME TO EXPLORE",1024,190)});resources.add(heading);const title=new THREE.Mesh(new THREE.PlaneGeometry(16,2),new THREE.MeshBasicMaterial({map:heading}));title.position.set(0,6.65,-16.83);scene.add(title);
  certificates.forEach((certificate,index)=>{
    const place=galleryPlacements[index];const group=new THREE.Group();group.position.set(place.x,3.25,place.z);group.rotation.y=place.yaw;
    const ratio=certificate.previewWidth/certificate.previewHeight;
    const imageHeight=ratio<1?4:Math.min(3.15,4.5/ratio),imageWidth=imageHeight*ratio;
    const outer=new THREE.Mesh(new THREE.BoxGeometry(imageWidth+.5,imageHeight+.5,.16),new THREE.MeshStandardMaterial({color:"#304335",roughness:.6}));group.add(outer);
    const mat=new THREE.Mesh(new THREE.BoxGeometry(imageWidth+.25,imageHeight+.25,.04),new THREE.MeshStandardMaterial({color:"#fffcf0"}));mat.position.z=.1;group.add(mat);
    const fallback=credentialTexture(certificate);resources.add(fallback);
    const pictureMaterial=new THREE.MeshBasicMaterial({map:fallback});
    const picture=new THREE.Mesh(new THREE.PlaneGeometry(imageWidth,imageHeight),pictureMaterial);picture.position.z=.125;group.add(picture);
    const loaded=new THREE.TextureLoader().load(certificate.previewSrc,texture=>{
      if(disposed){texture.dispose();return;}
      texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
      pictureMaterial.map=texture;pictureMaterial.needsUpdate=true;resources.delete(fallback);fallback.dispose();dirty=true;
    },undefined,()=>{if(!disposed)dirty=true;});resources.add(loaded);
    const plaqueTexture=canvasTexture(1024,180,context=>{context.fillStyle="#f8f9f2";context.fillRect(0,0,1024,180);context.fillStyle="#08765a";context.fillRect(0,0,9,180);context.font="23px monospace";context.fillText(`${String(index+1).padStart(2,"0")} / ${certificate.category}`,35,42);context.font="30px sans-serif";context.fillStyle="#253c2d";wrap(context,certificate.title,35,92,950,36,2)});resources.add(plaqueTexture);
    const plaque=new THREE.Mesh(new THREE.PlaneGeometry(4,.7),new THREE.MeshBasicMaterial({map:plaqueTexture}));plaque.position.set(0,-(imageHeight/2+.85),.1);group.add(plaque);
    group.traverse(object=>{if(object instanceof THREE.Mesh){object.userData.certificateId=certificate.id;targets.push(object)}});scene.add(group);
  });
  // Original ceiling sculpture; no downloaded character or reference assets.
  const sculpture=new THREE.Group();sculpture.position.set(0,5.3,1);
  const orb=new THREE.Mesh(new THREE.IcosahedronGeometry(.65,0),new THREE.MeshStandardMaterial({color:"#34c99c",metalness:.35,roughness:.35}));sculpture.add(orb);
  for(const angle of [0,Math.PI/2]){const ring=new THREE.Mesh(new THREE.TorusGeometry(1.05,.025,8,60),new THREE.MeshStandardMaterial({color:"#527eb7",metalness:.3,roughness:.5}));ring.rotation.y=angle;ring.rotation.x=.4;sculpture.add(ring)}scene.add(sculpture);
  const raycaster=new THREE.Raycaster();
  function updateCamera(){camera.position.set(pose.x,2.35,pose.z);camera.rotation.set(pose.pitch,pose.yaw,0);camera.updateMatrixWorld();}
  function resize(){if(disposed)return;const width=Math.max(host.clientWidth,1),height=Math.max(host.clientHeight,1);renderer.setSize(width,height,false);camera.aspect=width/height;camera.updateProjectionMatrix();dirty=true;}
  const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(host);resize();
  const visibilityObserver=new IntersectionObserver(entries=>{visible=entries[0]?.isIntersecting??true;dirty=true;});visibilityObserver.observe(host);
  const lost=(event:Event)=>{event.preventDefault();paused=true;keys.clear();onContextLost()};renderer.domElement.addEventListener("webglcontextlost",lost);
  let previous=0,animation=0;
  function tick(time:number){if(disposed)return;animation=requestAnimationFrame(tick);const seconds=Math.min((time-previous)/1000,.05);previous=time;if(paused||!visible||document.hidden)return;
    if(keys.size){const forward=Number(keys.has("forward"))-Number(keys.has("back")),sideways=Number(keys.has("right"))-Number(keys.has("left"));pose=moveInRoom(pose,forward,sideways,seconds);pose.yaw+=(Number(keys.has("turnLeft"))-Number(keys.has("turnRight")))*seconds*1.5;dirty=true}
    if(dirty){updateCamera();renderer.render(scene,camera);dirty=false}
  }
  animation=requestAnimationFrame(tick);
  return {
    focus(index){pose=faceExhibit(index);keys.clear();dirty=true},reset(){pose={x:0,z:12,yaw:0,pitch:.04};keys.clear();dirty=true},
    look(x,y){pose.yaw+=x;pose.pitch=THREE.MathUtils.clamp(pose.pitch+y,-.7,.7);dirty=true},
    control(action,pressed){if(pressed&&!paused)keys.add(action);else keys.delete(action)},
    nudge(action){if(paused)return;pose=moveInRoom(pose,action==="forward"?1:action==="back"?-1:0,action==="right"?1:action==="left"?-1:0,.05);if(action==="turnLeft")pose.yaw+=.18;if(action==="turnRight")pose.yaw-=.18;dirty=true},
    pause(value){paused=value;keys.clear();dirty=true},
    pick(x,y){updateCamera();scene.updateMatrixWorld(true);raycaster.setFromCamera(new THREE.Vector2(x,y),camera);const hit=raycaster.intersectObjects(targets,false)[0];return hit?.object.userData.certificateId??null},
    dispose(){disposed=true;cancelAnimationFrame(animation);resizeObserver.disconnect();visibilityObserver.disconnect();renderer.domElement.removeEventListener("webglcontextlost",lost);scene.traverse(object=>{if(object instanceof THREE.Mesh){object.geometry.dispose();const materials=Array.isArray(object.material)?object.material:[object.material];materials.forEach(material=>material.dispose())}});resources.forEach(texture=>texture.dispose());renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove()}
  };
}
