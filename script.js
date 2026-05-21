/* ============================================================
   WorkforceAI — script.js
   ============================================================ */
Chart.defaults.color='#6b7c8d';
Chart.defaults.borderColor='rgba(255,255,255,0.06)';
Chart.defaults.font.family="'DM Sans', sans-serif";
Chart.defaults.font.size=12;

const C={a:'#00e5ff',a2:'#ff6b35',a3:'#a259ff',a4:'#00e096',a5:'#ffc800',m:'rgba(255,255,255,0.06)'};
const TT={backgroundColor:'#141f2b',borderColor:'rgba(0,229,255,0.22)',borderWidth:1,titleColor:'#e8edf2',bodyColor:'#6b7c8d',padding:12,cornerRadius:8,titleFont:{family:"'DM Sans'",weight:'600',size:13},bodyFont:{family:"'DM Sans'",size:12}};

const D={
  jobs:{l:['2020','2021','2022','2023','2024','2025','2026'],v:[7378,7480,7464,7344,7319,7449,7333]},
  skills:{l:['2020','2021','2022','2023','2024','2025','2026'],py:[47.5,49.7,47.6,52.2,48.8,51.1,48.4],cl:[52.0,53.9,47.1,51.4,50.7,51.1,51.9],ml:[48.8,51.0,49.7,53.5,51.0,52.3,49.2]},
  salCo:{l:['🇨🇭 Switzerland','🇩🇰 Denmark','🇳🇴 Norway','🇺🇸 USA','🇫🇮 Finland','🇬🇧 UK','🇸🇬 Singapore','🇳🇱 Netherlands','🇦🇺 Australia','🇨🇦 Canada'],v:[170639,165652,159490,146833,88726,128720,128004,126751,118239,114253]},
  salEx:{l:['Entry (EN)','Mid (MI)','Senior (SE)','Executive (EX)'],v:[63133,87955,122188,187724]},
  autInd:{l:['Agriculture','Healthcare','Government','Energy','Manufacturing','Education','Retail','Tech','Finance'],v:[61.8,61.0,61.2,60.4,60.5,59.5,59.8,52.2,51.3]},
  autTr:{l:['2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],r:[69.5,70.9,70.8,70.4,65.5,66.8,68.0,65.9,56.1,56.8,55.9,53.9,44.0,42.9,40.5,40.8],i:[15.8,15.5,14.2,15.8,20.6,19.7,18.4,20.0,32.1,30.0,31.9,33.3,45.9,48.0,48.6,48.9]},
  inv:{l:['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'],v:[2546,2329,2480,2210,2368,2125,2046,2210,1969,2249,2072,2265]},
  ready:{l:['China','Switzerland','Germany','USA','Sweden','Canada','Japan','S. Korea','Brazil','UK','India','France'],inv:[162.99,110.50,147.01,131.84,106.58,149.16,118.85,100.81,131.92,107.58,116.84,102.53],r:[87.32,86.08,85.51,85.20,84.27,84.28,82.91,82.10,81.09,81.42,80.30,78.44]},
  eduTr:{l:['2015','2016','2017','2018','2019','2020','2021','2022','2023','2024','2025','2026'],s:[5.0,10.4,15.4,19.3,25.5,30.0,35.3,40.0,44.8,49.9,55.3,60.8],t:[4.0,9.2,14.0,19.5,23.7,29.3,34.3,38.6,44.1,49.1,53.5,59.0],sc:[3.4,8.6,13.5,18.4,23.6,28.5,33.5,38.5,43.5,48.7,53.4,59.3]},
  urRu:{l:['Africa','Asia','Europe','North America','Oceania','South America'],u:[33.6,33.6,33.4,33.8,33.6,33.2],r:[21.5,21.6,21.5,21.8,21.7,21.3]},
  genGap:{l:['China','Pakistan','USA','Canada','India','Germany','UK','Australia','Brazil','Nigeria'],v:[5.76,5.73,5.66,5.68,5.51,5.29,5.18,5.17,5.10,5.05]},
  roles:{l:['LLM Engineer','ML Engineer','AI Agent Dev','Generative AI Eng','Senior ML Eng','RAG Engineer','MLOps Engineer','Data Scientist','NLP Engineer','Senior Data Sci','Multimodal AI Eng','Deep Learning Eng'],d:[98,97,96,95,96,94,93,92,91,90,90,89]},
  llm:{l:['AI Solutions Arch','Senior ML Eng','LLM Engineer','AI Agent Dev','Multimodal AI Eng','RAG Engineer','NLP Engineer','Computer Vision Eng','Generative AI Eng','Deep Learning Eng'],v:[251577,247953,240960,225649,221791,218226,210855,209174,206761,203810]},
  gender:{l:['Non-binary','Male','Prefer not to say','Female'],v:[450201,418902,398204,381787]},
  work:{l:['Hybrid','Remote','Onsite'],v:[487362,380551,379644]},
  indDist:{l:['Retail','Media','Automotive','Consulting','Technology','Real Estate','Telecom','Government','Healthcare','Transport','Finance','Gaming','Energy','Manufacturing','Education'],v:[1063,1045,1020,1020,1011,1007,997,998,997,997,984,967,976,962,956]},
  indSal:{l:['E-commerce','Finance','Healthcare','Consulting','Technology','Education'],v:[506328,462595,456804,431423,363839,252888]},
};

function lg(ctx,hex,a=0.25){const g=ctx.createLinearGradient(0,0,0,320);g.addColorStop(0,hex+Math.round(a*255).toString(16).padStart(2,'0'));g.addColorStop(1,hex+'04');return g;}

// ── PARTICLES ──────────────────────────────────────────────────
(function(){
  const cv=document.getElementById('particleCanvas');if(!cv)return;
  const ctx=cv.getContext('2d');let W,H,pts=[];
  function resize(){W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<85;i++)pts.push({x:Math.random()*1000,y:Math.random()*700,r:Math.random()*1.4+0.3,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.25,a:Math.random()*0.35+0.08});
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle=`rgba(0,229,255,${p.a})`;ctx.fill();});
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<95){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(0,229,255,${0.07*(1-d/95)})`;ctx.lineWidth=0.5;ctx.stroke();}}
    requestAnimationFrame(draw);
  }
  draw();
})();

// ── COUNTERS ───────────────────────────────────────────────────
function runCounters(){document.querySelectorAll('.counter-num').forEach(el=>{const t=+el.dataset.target,s=el.dataset.suffix||'',dur=1800,start=performance.now();function step(now){const p=Math.min((now-start)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(e*t)+s;if(p<1)requestAnimationFrame(step);}requestAnimationFrame(step);});}
const hObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){runCounters();hObs.disconnect();}});},{threshold:0.5});
const heroEl=document.getElementById('hero');if(heroEl)hObs.observe(heroEl);

// ── SCROLL PROGRESS + NAV ──────────────────────────────────────
const bar=document.getElementById('scrollProgress'),nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{const t=document.body.scrollHeight-window.innerHeight;bar.style.width=(window.scrollY/t*100)+'%';nav.style.background=window.scrollY>80?'rgba(7,13,18,0.97)':'rgba(7,13,18,0.92)';},{passive:true});

// ── SCROLL REVEAL ──────────────────────────────────────────────
const rObs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('visible');});},{threshold:0.08});
document.querySelectorAll('.reveal,.chart-container,.insight-card,.concl-item,.tl-item,.metric-card,.visual-card,.dataset-card').forEach(el=>{el.classList.add('reveal');rObs.observe(el);});

// ── ACTIVE NAV ─────────────────────────────────────────────────
const nls=document.querySelectorAll('.nav-links a');
document.querySelectorAll('section[id]').forEach(sec=>{new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting){const id=x.target.getAttribute('id');nls.forEach(l=>{l.classList.toggle('active',l.getAttribute('href')==='#'+id);});}});},{threshold:0.3}).observe(sec);});

// ── NEWSLETTER ─────────────────────────────────────────────────
(function(){
  const f=document.getElementById('newsletterForm'),m=document.getElementById('newsletterMsg');
  if(!f)return;
  f.addEventListener('submit',e=>{e.preventDefault();const em=document.getElementById('newsletterEmail');if(!em.value||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value)){em.style.borderColor='#ff3250';return;}em.style.borderColor='';const b=f.querySelector('.newsletter-btn');b.textContent='Subscribing…';b.disabled=true;setTimeout(()=>{em.value='';b.textContent='Subscribe →';b.disabled=false;m.textContent='✅ You\'re in! Welcome to the WorkforceAI briefing.';setTimeout(()=>m.textContent='',5000);},900);});
})();

// ── CHARTS ─────────────────────────────────────────────────────

// 1. Jobs by year
(function(){const el=document.getElementById('chartJobGrowth');if(!el)return;const g=lg(el.getContext('2d'),'#00e5ff');new Chart(el,{type:'line',data:{labels:D.jobs.l,datasets:[{label:'AI Job Openings',data:D.jobs.v,borderColor:C.a,backgroundColor:g,borderWidth:2.5,pointBackgroundColor:C.a,pointRadius:5,pointHoverRadius:8,fill:true,tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` ${Number(c.raw).toLocaleString()} openings`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>v.toLocaleString()},suggestedMin:7000,suggestedMax:7600}}}});})();

// 2. Industry distribution
(function(){const el=document.getElementById('chartIndustryDist');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.indDist.l,datasets:[{label:'Job Count',data:D.indDist.v,backgroundColor:'rgba(0,229,255,0.5)',borderRadius:5,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` ${Number(c.raw).toLocaleString()} jobs`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d',font:{size:9},maxRotation:38}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d'},suggestedMin:900}}}});})();

// 3. Salary by country
(function(){const el=document.getElementById('chartSalaryCountry');if(!el)return;const colors=D.salCo.v.map((_,i)=>`hsla(${185-i*10},88%,${62-i*2}%,0.82)`);new Chart(el,{type:'bar',data:{labels:D.salCo.l,datasets:[{label:'Avg Salary (USD)',data:D.salCo.v,backgroundColor:colors,borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${(v/1000).toFixed(0)}k`}},y:{grid:{display:false},ticks:{color:'#e8edf2',font:{size:11}}}}}});})();

// 4. Salary by experience
(function(){const el=document.getElementById('chartSalaryExperience');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.salEx.l,datasets:[{label:'Avg Salary',data:D.salEx.v,backgroundColor:[C.a3,C.a,'rgba(0,229,255,0.7)',C.a2],borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${(v/1000).toFixed(0)}k`}}}}});})();

// 5. LLM salaries
(function(){const el=document.getElementById('chartLLMSalaries');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.llm.l,datasets:[{label:'Avg Salary (USD)',data:D.llm.v,backgroundColor:D.llm.v.map((_,i)=>i===0?C.a2:i===1?C.a5:'rgba(0,229,255,0.55)'),borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${(v/1000).toFixed(0)}k`},min:120000},y:{grid:{display:false},ticks:{color:'#e8edf2',font:{size:11}}}}}});})();

// 6. Gender salary
(function(){const el=document.getElementById('chartGender');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.gender.l,datasets:[{label:'Avg Salary (USD)',data:D.gender.v,backgroundColor:[C.a3,C.a,'rgba(0,229,255,0.5)',C.a2],borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${(v/1000).toFixed(0)}k`},min:350000}}}});})();

// 7. Industry salary
(function(){const el=document.getElementById('chartIndustrySalary');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.indSal.l,datasets:[{label:'Avg Salary (USD)',data:D.indSal.v,backgroundColor:[C.a2,C.a5,C.a4,C.a,C.a3,'rgba(0,229,255,0.35)'],borderRadius:8,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d',font:{size:10}}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${(v/1000).toFixed(0)}k`},min:200000}}}});})();

// 8. Work mode doughnut
(function(){const el=document.getElementById('chartWorkMode');if(!el)return;new Chart(el,{type:'doughnut',data:{labels:D.work.l,datasets:[{data:D.work.v,backgroundColor:[C.a,C.a3,C.a2],borderWidth:0,hoverOffset:10}]},options:{responsive:true,maintainAspectRatio:false,cutout:'65%',plugins:{legend:{display:true,position:'right',labels:{color:'#6b7c8d',padding:20,boxWidth:12,font:{size:11}}},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}/yr avg`}}}}});})();

// 9. Skills trend
(function(){const el=document.getElementById('chartSkillsTrend');if(!el)return;new Chart(el,{type:'line',data:{labels:D.skills.l,datasets:[{label:'Python',data:D.skills.py,borderColor:C.a,borderWidth:2.5,pointRadius:4,tension:0.4,backgroundColor:'transparent'},{label:'Cloud',data:D.skills.cl,borderColor:C.a2,borderWidth:2.5,pointRadius:4,tension:0.4,backgroundColor:'transparent'},{label:'Machine Learning',data:D.skills.ml,borderColor:C.a4,borderWidth:2.5,pointRadius:4,tension:0.4,backgroundColor:'transparent'}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:true,position:'bottom',labels:{color:'#6b7c8d',padding:20,boxWidth:14,font:{size:11}}},tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: ${c.raw.toFixed(1)}%`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`${v}%`},min:40,max:60}}}});})();

// 10. Roles demand
(function(){const el=document.getElementById('chartRolesDemand');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.roles.l,datasets:[{label:'Demand Score',data:D.roles.d,backgroundColor:D.roles.d.map(v=>v>=96?'rgba(0,229,255,0.9)':v>=92?'rgba(0,229,255,0.6)':'rgba(162,89,255,0.65)'),borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` Demand Score: ${c.raw}/100`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d'},min:85,max:100},y:{grid:{display:false},ticks:{color:'#e8edf2',font:{size:11}}}}}});})();

// 11. Automation by industry
(function(){const el=document.getElementById('chartAutomationIndustry');if(!el)return;const rc=v=>v>=65?'rgba(255,50,80,0.75)':v>=58?'rgba(255,107,53,0.75)':v>=52?'rgba(255,200,0,0.75)':'rgba(0,200,100,0.75)';new Chart(el,{type:'bar',data:{labels:D.autInd.l,datasets:[{label:'Automation Risk %',data:D.autInd.v,backgroundColor:D.autInd.v.map(rc),borderRadius:5,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,indexAxis:'y',plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` Risk: ${c.raw.toFixed(1)}%`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`${v}%`},min:45,max:65},y:{grid:{display:false},ticks:{color:'#e8edf2',font:{size:11}}}}}});})();

// 12. Automation trend
(function(){const el=document.getElementById('chartReskilling');if(!el)return;const cx=el.getContext('2d');new Chart(el,{type:'line',data:{labels:D.autTr.l,datasets:[{label:'Automation Risk %',data:D.autTr.r,borderColor:'#ff3250',backgroundColor:lg(cx,'#ff3250',0.18),borderWidth:2.5,pointRadius:3,fill:true,tension:0.4},{label:'AI Intensity %',data:D.autTr.i,borderColor:C.a,backgroundColor:lg(cx,'#00e5ff',0.18),borderWidth:2.5,pointRadius:3,fill:true,tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:true,position:'bottom',labels:{color:'#6b7c8d',padding:20,boxWidth:14,font:{size:11}}},tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: ${c.raw.toFixed(1)}%`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d',maxTicksLimit:8}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`${v}%`},min:0,max:80}}}});})();

// 13. Investment trend
(function(){const el=document.getElementById('chartInvestment');if(!el)return;const g=lg(el.getContext('2d'),'#ff6b35',0.25);new Chart(el,{type:'line',data:{labels:D.inv.l,datasets:[{label:'AI Investment (USD M)',data:D.inv.v,borderColor:C.a2,backgroundColor:g,borderWidth:2.5,pointBackgroundColor:C.a2,pointRadius:5,pointHoverRadius:8,fill:true,tension:0.4}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` $${Number(c.raw).toLocaleString()}M`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`$${v}M`},suggestedMin:1800}}}});})();

// 14. Readiness scatter
(function(){const el=document.getElementById('chartReadiness');if(!el)return;const pts=D.ready.l.map((label,i)=>({x:D.ready.inv[i],y:D.ready.r[i],label}));new Chart(el,{type:'scatter',data:{datasets:[{label:'Countries',data:pts,backgroundColor:C.a+'bb',pointRadius:9,pointHoverRadius:12}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` ${c.raw.label}  ·  $${c.raw.x.toFixed(0)}M  ·  Readiness: ${c.raw.y.toFixed(1)}`}}},scales:{x:{grid:{color:C.m},title:{display:true,text:'Avg AI Investment (USD M)',color:'#6b7c8d'},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},title:{display:true,text:'AI Readiness Score',color:'#6b7c8d'},ticks:{color:'#6b7c8d'},min:75,max:90}}}});})();

// 15. Education trend
(function(){const el=document.getElementById('chartEducationTrend');if(!el)return;const cx=el.getContext('2d');new Chart(el,{type:'line',data:{labels:D.eduTr.l,datasets:[{label:'Student Usage %',data:D.eduTr.s,borderColor:C.a3,backgroundColor:lg(cx,'#a259ff',0.18),borderWidth:2.5,pointRadius:3,fill:true,tension:0.4},{label:'Teacher Usage %',data:D.eduTr.t,borderColor:C.a4,backgroundColor:lg(cx,'#00e096',0.15),borderWidth:2.5,pointRadius:3,fill:true,tension:0.4},{label:'Schools Adopted %',data:D.eduTr.sc,borderColor:C.a5,backgroundColor:lg(cx,'#ffc800',0.12),borderWidth:2,pointRadius:3,fill:true,tension:0.4,borderDash:[4,3]}]},options:{responsive:true,maintainAspectRatio:false,interaction:{mode:'index',intersect:false},plugins:{legend:{display:true,position:'bottom',labels:{color:'#6b7c8d',padding:20,boxWidth:14,font:{size:11}}},tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: ${c.raw.toFixed(1)}%`}}},scales:{x:{grid:{color:C.m},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`${v}%`},min:0,max:70}}}});})();

// 16. Urban vs rural
(function(){const el=document.getElementById('chartUrbanRural');if(!el)return;new Chart(el,{type:'bar',data:{labels:D.urRu.l,datasets:[{label:'Urban Access %',data:D.urRu.u,backgroundColor:'rgba(0,229,255,0.65)',borderRadius:{topLeft:5,topRight:5},borderSkipped:false},{label:'Rural Access %',data:D.urRu.r,backgroundColor:'rgba(162,89,255,0.65)',borderRadius:{topLeft:5,topRight:5},borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,position:'bottom',labels:{color:'#6b7c8d',padding:20,boxWidth:14,font:{size:11}}},tooltip:{...TT,callbacks:{label:c=>` ${c.dataset.label}: ${c.raw.toFixed(1)}%`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d',font:{size:10}}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d',callback:v=>`${v}%`},min:0,max:45}}}});})();

// 17. Gender gap
(function(){const el=document.getElementById('chartGenderGap');if(!el)return;const gc=v=>v>=5.7?'rgba(255,50,80,0.75)':v>=5.5?'rgba(255,107,53,0.75)':'rgba(0,229,255,0.6)';new Chart(el,{type:'bar',data:{labels:D.genGap.l,datasets:[{label:'Gender Gap (pts)',data:D.genGap.v,backgroundColor:D.genGap.v.map(gc),borderRadius:6,borderSkipped:false}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false},tooltip:{...TT,callbacks:{label:c=>` Gap: ${c.raw.toFixed(2)} pts`}}},scales:{x:{grid:{display:false},ticks:{color:'#6b7c8d'}},y:{grid:{color:C.m},ticks:{color:'#6b7c8d'},min:4.8,max:5.9}}}});})();