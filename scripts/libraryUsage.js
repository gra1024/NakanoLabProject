var ele=document.createElement("div");

var imgDeskFlame=document.createElement('img');
imgDeskFlame.classList.add("imgPcUsage","imgPcUsageDeskFlame");
ele.appendChild(imgDeskFlame);

for(let i=0; i<16; i++){
  let imgPc=document.createElement('img');
  let str="pcMonitor"+i.toString();
  imgPc.classList.add("imgPcUsage","imgPcUsagePcMonitor",str);
  ele.appendChild(imgPc);
}

document.getElementById("pcUsage").appendChild(ele);