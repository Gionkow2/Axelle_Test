import puppeteer from "puppeteer-core";
const CHROME="C:/Program Files/Google/Chrome/Application/chrome.exe";
const BASE=process.argv[2]||"http://localhost:3000";
const b=await puppeteer.launch({executablePath:CHROME,headless:"new",args:["--hide-scrollbars"]});
for(const w of [1440,768,390]){
  const p=await b.newPage();
  const msgs=[];
  p.on("console",m=>{ if(m.type()==="error"||m.type()==="warning") msgs.push(`[${m.type()}] ${m.text()}`);});
  p.on("pageerror",e=>msgs.push(`[pageerror] ${e.message}`));
  p.on("requestfailed",r=>msgs.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`));
  await p.setViewport({width:w,height:900});
  await p.goto(BASE,{waitUntil:"networkidle0",timeout:60000});
  await p.evaluate(()=>document.fonts.ready);
  // scroll through to trigger lazy img + river
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,40));}scrollTo(0,0);});
  await new Promise(r=>setTimeout(r,400));
  const info=await p.evaluate(()=>{
    const de=document.documentElement;
    const overflow=de.scrollWidth-de.clientWidth;
    const h1=[...document.querySelectorAll('h1')].map(h=>h.textContent.trim());
    const heads=[...document.querySelectorAll('h1,h2,h3,h4')].map(h=>h.tagName+': '+h.textContent.trim().slice(0,40));
    const landmarks=[...document.querySelectorAll('header,nav,main,footer')].map(e=>e.tagName.toLowerCase());
    const imgsNoAlt=[...document.querySelectorAll('img')].filter(i=>!i.hasAttribute('alt')).length;
    const brokenImgs=[...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.currentSrc||i.src);
    return {overflow,h1,heads,landmarks,imgsNoAlt,brokenImgs};
  });
  console.log(`\n===== ${w}px =====`);
  console.log("horizontal overflow px:", info.overflow);
  console.log("h1 count:", info.h1.length, JSON.stringify(info.h1));
  console.log("landmarks:", info.landmarks.join(","));
  console.log("imgs missing alt attr:", info.imgsNoAlt);
  console.log("broken imgs:", info.brokenImgs.length, info.brokenImgs.slice(0,5));
  console.log("console errors/warnings:", msgs.length);
  msgs.slice(0,15).forEach(m=>console.log("  "+m));
  if(w===1440){ console.log("headings:"); info.heads.forEach(h=>console.log("  "+h)); }
  await p.close();
}
await b.close();
