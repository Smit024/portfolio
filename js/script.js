/* =====================================================
   SMIT PATEL PORTFOLIO — script.js
   Handles:
   - Desktop canvas + scene system
   - Mobile canvas + scroll-driven character
   - Resume modal (center screen with download)
   - Achievement modal (click to expand)
   - Contact form → mailto
   - Scene progress dots + label
   - Keyboard accessibility
===================================================== */

/* =========================
PROJECT DATA
========================= */

const PROJECT_DATA = {
  archalert: {
    label: "Urban AI · HackSLU 2026 Winner",
    title: "ArchAlert",
    stack: "Next.js · FastAPI · React · TypeScript · Python · Leaflet",
    accent: "#6366f1",
    bg: "linear-gradient(135deg,rgba(99,102,241,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Developed a full-stack geospatial intelligence platform transforming live and historical urban activity data into interactive heatmaps and risk-tile visualizations for real-time situational awareness.",
      "Engineered a scalable FastAPI backend with REST APIs to process structured incident datasets and power dynamic geospatial analytics through an interactive React and Next.js dashboard.",
      "Implemented spatial clustering, geospatial heatmap rendering, and LLM-assisted narrative summaries converting fragmented data streams into interpretable safety insights for urban environments.",
      "Deployed via Docker, Hugging Face Spaces, and Vercel with CI-based workflows — delivering a production-ready prototype recognized as Best in Sustainable Urban Innovation at HackSLU 2026.",
      "Designed the system architecture to support real-time streaming updates, enabling emergency responders and city planners to act on live risk intelligence rather than static historical data."
    ]
  },
  explainableai: {
    label: "Computer Vision · Research",
    title: "Explainable Edge AI with MobileViT",
    stack: "PyTorch · MobileViT · Grad-CAM · ONNX · CIFAR-10",
    accent: "#0ea5e9",
    bg: "linear-gradient(135deg,rgba(14,165,233,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Trained and benchmarked MobileNetV2, MobileNetV3, and MobileViT-S transformer models on CIFAR-10, achieving up to 90% validation accuracy after targeted fine-tuning.",
      "Introduced an Interpretability Stabilization Score (ISS) using SSIM to quantify explanation consistency under noise, blur, and brightness perturbations — improving reliability analysis by 40%.",
      "Integrated Grad-CAM to generate class-discriminative heatmaps, enabling visual explanation of 93–95% of model predictions across diverse test samples.",
      "Exported optimized models to ONNX format for edge deployment, significantly reducing inference latency while preserving interpretability on resource-constrained hardware.",
      "Designed the evaluation pipeline to stress-test explanation robustness, providing a reproducible framework for assessing trustworthiness of AI in safety-critical applications."
    ]
  },
  assistaive: {
    label: "NLP · Recommendation",
    title: "AssistAIve",
    stack: "Python · spaCy · TF-IDF · Cosine Similarity · Streamlit",
    accent: "#10b981",
    bg: "linear-gradient(135deg,rgba(16,185,129,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Built an NLP-powered tool recommendation engine that matches user intent and task descriptions to the most relevant AI tools using TF-IDF vectorization and cosine similarity scoring.",
      "Engineered a natural language preprocessing pipeline with spaCy for entity extraction, intent classification, and domain tagging across a curated catalog of 100+ AI tools.",
      "Designed an interactive Streamlit interface where users describe their problem in plain language and receive ranked, context-aware AI tool recommendations with explanations.",
      "Implemented a feedback loop that refines similarity weights based on user selections, progressively improving recommendation accuracy over repeated interactions.",
      "Structured the tool catalog as a dynamic knowledge base, enabling easy extension with new tools and categories without retraining the core similarity model."
    ]
  },
  smartglasses: {
    label: "Wearable AI · Research",
    title: "Smart Glasses Research",
    stack: "Python · OpenCV · TensorFlow Lite · Raspberry Pi · BLE",
    accent: "#f59e0b",
    bg: "linear-gradient(135deg,rgba(245,158,11,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Researching lightweight on-device AI models for smart glasses focused on making the human-technology connection seamless, natural, and non-intrusive — removing friction from everyday digital interactions.",
      "Designing real-time CV pipelines optimized for wearable form factors, enabling context-aware visual assistance such as object recognition and environment description without cloud dependency.",
      "Exploring multimodal interaction paradigms combining gaze tracking, voice commands, and gesture detection to create an effortless interface that adapts to users rather than requiring them to adapt.",
      "Prototyping edge inference pipelines with TensorFlow Lite on low-power hardware, targeting sub-50ms latency so AI responses feel immediate and natural throughout the day.",
      "Investigating privacy-preserving on-device processing architectures so all sensory data stays local — building user trust while delivering the full functionality of an always-on AI companion."
    ]
  },
  intellectmap: {
    label: "Recommendation · Data Viz",
    title: "IntellectMap",
    stack: "Python · Streamlit · Plotly · Scikit-learn · TF-IDF",
    accent: "#ec4899",
    bg: "linear-gradient(135deg,rgba(236,72,153,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Developed an AI-powered campus discovery platform that visualizes people, clubs, and events through an interactive global and campus map using Plotly-based geospatial visualization.",
      "Implemented a machine learning recommendation engine using TF-IDF vectorization and cosine similarity to match users with relevant peers, communities, and events based on shared interests.",
      "Engineered a full-stack Streamlit application with dynamic filtering, node clustering by domain, and real-time exploration of academic communities across departments.",
      "Integrated personalized networking message generation using LLM prompting, enabling users to send contextually relevant connection requests to recommended peers with a single click.",
      "Designed the data layer to ingest and normalize diverse campus data sources — student profiles, club directories, and event feeds — into a unified graph structure powering all discovery features."
    ]
  },
  emailassistant: {
    label: "Productivity · NLP",
    title: "AI Email Assistant",
    stack: "Python · FastAPI · React · OpenAI API · TypeScript",
    accent: "#8b5cf6",
    bg: "linear-gradient(135deg,rgba(139,92,246,0.12) 0%,rgba(255,255,255,0.86) 100%)",
    bullets: [
      "Built a context-aware email generation assistant that analyzes prior conversation threads and user intent to draft professional, tone-appropriate replies in seconds.",
      "Designed a FastAPI backend that processes email context through an LLM pipeline, extracting key topics, sentiment, and required actions to generate highly relevant draft responses.",
      "Developed a React frontend with a clean compose interface where users can adjust tone (formal, casual, concise) and review AI-generated drafts before sending — keeping humans in control.",
      "Implemented thread summarization that condenses long email chains into structured briefings, helping users catch up on complex conversations without reading every message.",
      "Engineered prompt templates with few-shot examples calibrated for common professional scenarios — follow-ups, meeting requests, status updates — ensuring consistent output quality."
    ]
  }
};

/* =========================
SCENE CONFIG
========================= */

const SCENE_FRAMES  = [4, 70, 160, 245, 330];
const SCENE_LABELS  = ["About", "Experience", "Projects", "Achievements", "Contact"];
let currentScene = 0;
let isAnimating  = false;
let targetFrame  = 0;
let currentFramePosition = 0;
let introFinished = false;

/* =========================
UTILITY
========================= */

const isMobile = () => window.innerWidth < 768;
const CONTACT_EMAIL = "psmit9258@gmail.com";

/* =========================
SCENE MANAGEMENT
========================= */

function showScene(index){
  document.querySelectorAll(".scene-content").forEach(s=>{
    s.style.opacity = "0"; s.style.pointerEvents = "none";
  });
  const target = document.getElementById("scene"+(index+1));
  if(target){ target.style.opacity = "1"; target.style.pointerEvents = "auto"; }
  updateDots(index);
  updateSceneLabel(index);
}

function hideAllScenes(){
  document.querySelectorAll(".scene-content").forEach(s=>{
    s.style.opacity = "0"; s.style.pointerEvents = "none";
  });
}

function changeScene(index){
  if(isAnimating || isMobile()) return;
  isAnimating = true;
  hideAllScenes();
  currentScene = index;
  targetFrame  = SCENE_FRAMES[index];
  setTimeout(()=>{ showScene(index); isAnimating = false; }, 1000);
}

/* =========================
PROGRESS DOTS + LABEL
========================= */

function updateDots(index){
  document.querySelectorAll(".dot").forEach((d,i)=>{
    d.classList.toggle("active", i === index);
  });
}

function updateSceneLabel(index){
  const el = document.getElementById("sceneLabelText");
  if(el) el.textContent = SCENE_LABELS[index] || "";
}

// Dot click navigation
document.querySelectorAll(".dot").forEach(dot=>{
  dot.addEventListener("click", ()=>{
    const idx = parseInt(dot.dataset.scene, 10);
    if(!isNaN(idx)) changeScene(idx);
  });
});

/* =========================
INTRO SEQUENCE
========================= */

function typeName(){
  const name = "Smit Patel";
  const el = document.getElementById("introName");
  if(!el) return;
  let i = 0;
  const t = setInterval(()=>{
    el.textContent += name[i++];
    if(i === name.length){ clearInterval(t); setTimeout(moveNameToCorner, 1000); }
  }, 120);
}

function moveNameToCorner(){
  const el = document.getElementById("introName");
  if(el) el.classList.add("moveTop");
  setTimeout(showCharacter, 1000);
}

function showCharacter(){
  introFinished = true;
  document.querySelector(".canvas-container").classList.add("show");
  document.body.classList.add("nav-visible");
  targetFrame = 4; currentFramePosition = 0;
  setTimeout(()=>{ showScene(0); }, 700);
}

/* =========================
CANVAS SETUP — Desktop
========================= */

const canvas = document.getElementById("characterCanvas");
const ctx    = canvas ? canvas.getContext("2d") : null;

function resizeCanvas(){
  if(!canvas || !ctx) return;
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = window.innerWidth  * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width  = window.innerWidth  + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
if(canvas){ resizeCanvas(); window.addEventListener("resize", resizeCanvas); }

/* =========================
CANVAS SETUP — Mobile
========================= */

const mobCanvas = document.getElementById("mobCharacterCanvas");
const mobCtx    = mobCanvas ? mobCanvas.getContext("2d") : null;
let mobFramePos = 0;
let mobTargetFrame = 80; // default: show character facing forward

function resizeMobCanvas(){
  if(!mobCanvas || !mobCtx) return;
  const wrap = document.getElementById("mobCanvasWrap");
  if(!wrap) return;
  const dpr = window.devicePixelRatio || 1;
  const w = wrap.clientWidth;
  const h = wrap.clientHeight;
  mobCanvas.width  = w * dpr;
  mobCanvas.height = h * dpr;
  mobCanvas.style.width  = w + "px";
  mobCanvas.style.height = h + "px";
  mobCtx.setTransform(dpr,0,0,dpr,0,0);
}
if(mobCanvas){ resizeMobCanvas(); window.addEventListener("resize", resizeMobCanvas); }

function renderMobFrame(index){
  if(!mobCanvas || !mobCtx) return;
  const img = images[index];
  if(!img || !img.complete || !img.naturalWidth) return;
  const cw = mobCanvas.clientWidth, ch = mobCanvas.clientHeight;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;
  let dw, dh;
  if(ir > cr){ dw = cw * 0.8; dh = dw / ir; }
  else       { dh = ch * 0.9; dw = dh * ir; }
  mobCtx.clearRect(0,0,mobCanvas.width,mobCanvas.height);
  mobCtx.drawImage(img,(cw-dw)/2,(ch-dh)/2,dw,dh);
}

function animateMob(){
  if(!isMobile()) { requestAnimationFrame(animateMob); return; }
  mobFramePos += (mobTargetFrame - mobFramePos) * 0.1;
  renderMobFrame(Math.floor(mobFramePos));
  requestAnimationFrame(animateMob);
}

// Scroll-driven mobile character frame: map scroll position to frames
function updateMobScroll(){
  if(!isMobile()) return;
  const scrollY = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(scrollY / docH, 1);
  // Map scroll to frame range 1–354
  mobTargetFrame = Math.floor(progress * 340) + 4;

  // Fade canvas when content sections are in view
  const wrap = document.getElementById("mobCanvasWrap");
  if(wrap){
    // Fade character slightly after scrolling past hero
    const heroH = document.getElementById("mobHero")?.offsetHeight || window.innerHeight;
    if(scrollY > heroH * 0.6){
      wrap.classList.add("faded");
    } else {
      wrap.classList.remove("faded");
    }
  }
}

/* =========================
FRAME SYSTEM — shared images
========================= */

const FRAME_COUNT = 355;
const images = Array.from({length:FRAME_COUNT},(_,i)=>{
  const img = new Image();
  img.src = `frames_png/f${String(i+1).padStart(3,"0")}.png`;
  return img;
});

function renderFrame(index){
  if(!introFinished && index > 0) return;
  if(!canvas || !ctx) return;
  const img = images[index];
  if(!img || !img.complete || !img.naturalWidth) return;
  const cw = canvas.clientWidth, ch = canvas.clientHeight;
  const ir = img.naturalWidth / img.naturalHeight, cr = cw / ch;
  let dw, dh;
  if(ir > cr){ dw = cw; dh = dw / ir; }
  else       { dh = ch; dw = dh * ir; }
  let xShift = 0;
  if     (index <= 70)  { const p=(index-4)/(70-4);      xShift=250-p*500; }
  else if(index <= 160) { const p=(index-70)/(160-70);   xShift=-250+p*250; }
  else if(index <= 245) { const p=(index-160)/(245-160); xShift=p*250; }
  else if(index <= 330) { const p=(index-245)/(330-245); xShift=250-p*500; }
  else                  { xShift=-250; }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,(cw-dw)/2+xShift,(ch-dh)/2,dw,dh);
}

function animate(){
  currentFramePosition += (targetFrame - currentFramePosition)*0.15;
  renderFrame(Math.floor(currentFramePosition));
  requestAnimationFrame(animate);
}

/* =========================
MODAL SYSTEM
========================= */

const dynStyle = document.createElement("style");
document.head.appendChild(dynStyle);

function setBulletColor(bulletsEl, accent){
  const uid = "b"+(Date.now()%99999);
  bulletsEl.setAttribute("data-bid", uid);
  dynStyle.textContent = `[data-bid="${uid}"] li::before{ background:${accent} !important; }`;
}

function openModal(overlayId, config){
  const overlay = document.getElementById(overlayId);
  if(!overlay) return;
  const glass = overlay.querySelector(".modal-glass");

  // Apply accent colors
  if(config.accent){
    glass.style.borderTopColor = config.accent;
    overlay.querySelectorAll(".modal-accent").forEach(el=> el.style.color = config.accent);
  }
  // Apply background tint
  if(config.bg) glass.style.background = config.bg;

  // Populate fields
  Object.entries(config).forEach(([key, val])=>{
    if(key === "accent" || key === "bg") return;
    const el = overlay.querySelector(`[data-field="${key}"]`);
    if(!el) return;
    if(key === "bullets"){
      el.innerHTML = val.map(b=>`<li>${b}</li>`).join("");
      setBulletColor(el, config.accent || "#6366f1");
    } else {
      el.innerHTML = val;
    }
  });

  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden","false");
  document.body.style.overflow = "hidden";
  overlay.querySelector(".modal-close").focus();
}

function closeModal(overlayId){
  const overlay = document.getElementById(overlayId);
  if(!overlay) return;
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden","true");
  document.body.style.overflow = "";
}

// Close buttons (works for all modals including resume + achievement)
document.querySelectorAll(".modal-close").forEach(btn=>{
  btn.addEventListener("click",()=> closeModal(btn.closest(".modal-overlay").id));
});

// Click outside
document.querySelectorAll(".modal-overlay").forEach(overlay=>{
  overlay.addEventListener("click", e=>{ if(e.target===overlay) closeModal(overlay.id); });
});

// Escape key
document.addEventListener("keydown", e=>{
  if(e.key==="Escape"){
    closeModal("expModal");
    closeModal("projModal");
    closeModal("achModal");
    closeModal("resumeModal");
  }
});

/* =========================
RESUME MODAL — opens center screen with PDF + download
========================= */

const resumeBtn = document.getElementById("resumeNavBtn");
if(resumeBtn){
  resumeBtn.addEventListener("click", ()=>{
    // Lazy-load iframe src to avoid loading PDF on page load
    const iframe = document.getElementById("resumeIframe");
    if(iframe && !iframe.src.includes("Resume.pdf")){
      iframe.src = "Resume.pdf";
    }
    const overlay = document.getElementById("resumeModal");
    if(overlay){
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden","false");
      document.body.style.overflow = "hidden";
    }
  });
}

/* =========================
EXPERIENCE CARDS — EVENT DELEGATION
Works for both desktop (.exp-frame) and mobile (.mob-exp-card)
========================= */

function handleExpClick(el){
  openModal("expModal",{
    accent:  el.dataset.accent  || "#6366f1",
    bg:      el.dataset.bg      || "rgba(255,255,255,.84)",
    label:   el.dataset.label   || "",
    title:   el.dataset.title   || "",
    meta:    el.dataset.meta    || "",
    bullets: (el.dataset.bullets||"").split("|").filter(Boolean)
  });
}

// Desktop scene2
const s2 = document.getElementById("scene2");
if(s2){
  s2.addEventListener("click",  e=>{ const f=e.target.closest(".exp-frame");    if(f) handleExpClick(f); });
  s2.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ const f=e.target.closest(".exp-frame"); if(f) handleExpClick(f); } });
}

// Mobile experience cards
const mobCards = document.querySelector(".mob-section .mob-cards");
if(mobCards){
  mobCards.addEventListener("click",  e=>{ const f=e.target.closest(".mob-exp-card"); if(f) handleExpClick(f); });
  mobCards.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ const f=e.target.closest(".mob-exp-card"); if(f) handleExpClick(f); } });
}

/* =========================
ACHIEVEMENT CARDS — EVENT DELEGATION (NEW: clickable with modal)
Works for desktop (.ach-frame) and mobile (.mob-ach-card)
========================= */

function handleAchClick(el){
  openModal("achModal",{
    accent:  el.dataset.accent  || "#6366f1",
    bg:      el.dataset.bg      || "rgba(255,255,255,.84)",
    label:   el.dataset.label   || "",
    title:   el.dataset.title   || "",
    bullets: (el.dataset.bullets||"").split("|").filter(Boolean)
  });
}

// Desktop scene4
const s4 = document.getElementById("scene4");
if(s4){
  s4.addEventListener("click",  e=>{ const f=e.target.closest(".ach-frame"); if(f) handleAchClick(f); });
  s4.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" "){ const f=e.target.closest(".ach-frame"); if(f) handleAchClick(f); } });
}

// Mobile achievement cards
document.querySelectorAll(".mob-cards").forEach(container=>{
  container.addEventListener("click", e=>{
    const ach = e.target.closest(".mob-ach-card");
    if(ach) handleAchClick(ach);
  });
  container.addEventListener("keydown", e=>{
    if(e.key==="Enter"||e.key===" "){
      const ach = e.target.closest(".mob-ach-card");
      if(ach) handleAchClick(ach);
    }
  });
});

/* =========================
PROJECT BUTTONS — EVENT DELEGATION
========================= */

function handleProjectClick(key){
  const d = PROJECT_DATA[key];
  if(!d) return;
  openModal("projModal",{
    accent:  d.accent,
    bg:      d.bg,
    label:   d.label,
    title:   d.title,
    stack:   d.stack,
    bullets: d.bullets
  });
}

// Desktop scene3
const s3 = document.getElementById("scene3");
if(s3){
  s3.addEventListener("click", e=>{
    const btn = e.target.closest(".view-project-btn");
    if(btn){ e.stopPropagation(); handleProjectClick(btn.dataset.project); }
  });
}

// Mobile project grid
const mobProjGrid = document.querySelector(".mob-proj-grid");
if(mobProjGrid){
  mobProjGrid.addEventListener("click", e=>{
    const btn = e.target.closest(".view-project-btn");
    if(btn){ e.stopPropagation(); handleProjectClick(btn.dataset.project); }
  });
}

/* =========================
PROJECT PANEL Z-INDEX FIX (desktop)
========================= */

document.querySelectorAll(".project-panel").forEach(panel=>{
  panel.addEventListener("mouseenter",()=> panel.classList.add("hovered"));
  panel.addEventListener("mouseleave",()=> panel.classList.remove("hovered"));
});

/* =========================
FORM HANDLING — mailto integration
========================= */

function handleFormSubmit(form){
  form.addEventListener("submit", e=>{
    e.preventDefault();

    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if(!name || !email || !message) return;

    // Build mailto link
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;

    // Visual feedback
    const btn = form.querySelector(".connect-btn");
    const orig = btn.textContent;
    btn.textContent = "Opening Mail...";
    btn.style.background = "#10b981";
    setTimeout(()=>{
      btn.textContent = orig;
      btn.style.background = "";
      form.reset();
    }, 2500);
  });
}

["connectFormDesktop","connectFormMobile"].forEach(id=>{
  const f = document.getElementById(id);
  if(f) handleFormSubmit(f);
});

/* =========================
SCROLL NAVIGATION (desktop only)
========================= */

window.addEventListener("wheel", e=>{
  if(isMobile() || isAnimating || Math.abs(e.deltaY)<30) return;
  if(e.deltaY>0 && currentScene < SCENE_FRAMES.length-1) changeScene(currentScene+1);
  if(e.deltaY<0 && currentScene > 0) changeScene(currentScene-1);
},{passive:true});

/* =========================
TOUCH SWIPE (desktop/tablet only — mobile uses normal scroll)
========================= */

let touchStartY = 0, touchStartX = 0;
window.addEventListener("touchstart", e=>{
  touchStartY = e.touches[0].clientY;
  touchStartX = e.touches[0].clientX;
},{passive:true});

window.addEventListener("touchend", e=>{
  if(isMobile() || isAnimating) return;
  const dy = touchStartY - e.changedTouches[0].clientY;
  const dx = Math.abs(touchStartX - e.changedTouches[0].clientX);
  if(Math.abs(dy) < 40 || dx > Math.abs(dy)) return;
  if(dy>0 && currentScene < SCENE_FRAMES.length-1) changeScene(currentScene+1);
  if(dy<0 && currentScene > 0) changeScene(currentScene-1);
},{passive:true});

/* =========================
KEYBOARD NAVIGATION
========================= */

document.addEventListener("keydown", e=>{
  if(isMobile()) return;
  if(e.key === "ArrowDown" || e.key === "ArrowRight"){
    if(currentScene < SCENE_FRAMES.length-1) changeScene(currentScene+1);
  }
  if(e.key === "ArrowUp" || e.key === "ArrowLeft"){
    if(currentScene > 0) changeScene(currentScene-1);
  }
});

/* =========================
MOBILE SCROLL LISTENER
========================= */

if(isMobile()){
  window.addEventListener("scroll", updateMobScroll, {passive:true});
}

/* =========================
INIT
========================= */

window.addEventListener("load", ()=>{
  const loader = document.getElementById("loader");
  if(loader) loader.style.display = "none";

  if(isMobile()){
    // Mobile: show nav, start mobile canvas animation
    document.body.classList.add("nav-visible");
    resizeMobCanvas();
    animateMob();
    updateMobScroll();
  } else {
    // Desktop: run full intro animation
    renderFrame(0);
    typeName();
    animate();
  }
});

// Handle resize crossing breakpoint
let lastMobile = isMobile();
window.addEventListener("resize", ()=>{
  const nowMobile = isMobile();
  if(nowMobile !== lastMobile){
    lastMobile = nowMobile;
    if(nowMobile){
      document.body.classList.add("nav-visible");
      resizeMobCanvas();
      // Start mobile animation if not already running
      animateMob();
      window.addEventListener("scroll", updateMobScroll, {passive:true});
    } else if(!introFinished){
      renderFrame(0);
      if(!document.getElementById("introName").textContent){
        typeName(); animate();
      }
    }
  }
});