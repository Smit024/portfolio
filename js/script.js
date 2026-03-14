/* =========================
PROJECT DATA — all 6 projects with real resume details
========================= */

const PROJECT_DATA = {
  archalert: {
    label: "Urban AI · HackSLU 2026 Winner",
    title: "ArchAlert",
    stack: "Next.js · FastAPI · React · TypeScript · Python · Leaflet",
    accent: "#6366f1",
    bullets: [
      "Developed a full-stack geospatial intelligence platform that transforms live and historical urban activity data into interactive heatmaps and risk-tile visualizations for real-time situational awareness.",
      "Engineered a scalable FastAPI backend with REST APIs to process structured incident datasets and power dynamic geospatial analytics through an interactive React and Next.js dashboard.",
      "Implemented spatial clustering, geospatial heatmap rendering, and LLM-assisted narrative summaries that convert fragmented data streams into interpretable safety insights for urban environments.",
      "Deployed via Docker, Hugging Face Spaces, and Vercel with CI-based workflows — delivering a production-ready prototype recognized as Best in Sustainable Urban Innovation at HackSLU 2026.",
      "Designed the system architecture to support real-time streaming updates, enabling emergency responders and city planners to act on live risk intelligence rather than static historical data."
    ]
  },
  explainableai: {
    label: "Computer Vision · Research",
    title: "Explainable Edge AI with MobileViT",
    stack: "PyTorch · MobileViT · Grad-CAM · ONNX · CIFAR-10",
    accent: "#0ea5e9",
    bullets: [
      "Trained and benchmarked MobileNetV2, MobileNetV3, and MobileViT-S transformer models on CIFAR-10, achieving up to 90% validation accuracy after targeted fine-tuning.",
      "Introduced an Interpretability Stabilization Score (ISS) using SSIM to quantify explanation consistency under noise, blur, and brightness perturbations — improving reliability analysis by 40%.",
      "Integrated Grad-CAM to generate class-discriminative heatmaps, enabling visual explanation of 93–95% of model predictions across diverse test samples.",
      "Exported optimized models to ONNX format for edge deployment, significantly reducing inference latency while preserving interpretability capabilities on resource-constrained hardware.",
      "Designed the evaluation pipeline to stress-test explanation robustness, providing a reproducible framework for assessing trustworthiness of AI systems in safety-critical applications."
    ]
  },
  assistaive: {
    label: "NLP · Recommendation",
    title: "AssistAIve",
    stack: "Python · spaCy · TF-IDF · Cosine Similarity · Streamlit",
    accent: "#10b981",
    bullets: [
      "Built an NLP-powered tool recommendation engine that matches user intent and task descriptions to the most relevant AI tools using TF-IDF vectorization and cosine similarity scoring.",
      "Engineered a natural language preprocessing pipeline with spaCy for entity extraction, intent classification, and domain tagging across a curated catalog of 100+ AI tools.",
      "Designed an interactive Streamlit interface that allows users to describe their problem in plain language and receive ranked, context-aware AI tool recommendations with explanations.",
      "Implemented a feedback loop mechanism that refines similarity weights based on user selections, progressively improving recommendation accuracy over repeated interactions.",
      "Structured the tool catalog as a dynamic knowledge base, enabling easy extension with new tools and categories without retraining the core similarity model."
    ]
  },
  smartglasses: {
    label: "Wearable AI · Research",
    title: "Smart Glasses Research",
    stack: "Python · OpenCV · TensorFlow Lite · Raspberry Pi · BLE",
    accent: "#f59e0b",
    bullets: [
      "Researching lightweight on-device AI models for smart glasses that bridge the gap between humans and technology — making the connection seamless, natural, and non-intrusive.",
      "Designing real-time computer vision pipelines optimized for wearable form factors, enabling context-aware visual assistance such as object recognition and environment description without cloud dependency.",
      "Exploring multimodal interaction paradigms — combining gaze tracking, voice commands, and gesture detection — to create an effortless interface that adapts to the user rather than requiring the user to adapt to the technology.",
      "Prototyping edge inference pipelines using TensorFlow Lite on low-power hardware, targeting sub-50ms latency to ensure responses feel immediate and natural during daily use.",
      "Investigating privacy-preserving on-device processing architectures so all sensory data remains local, building user trust while maintaining the full functionality of an always-on AI companion."
    ]
  },
  intellectmap: {
    label: "Recommendation · Data Viz",
    title: "IntellectMap",
    stack: "Python · Streamlit · Plotly · Scikit-learn · TF-IDF",
    accent: "#ec4899",
    bullets: [
      "Developed an AI-powered campus discovery platform that visualizes people, clubs, and events through an interactive global and campus map using Plotly-based geospatial visualization.",
      "Implemented a machine learning recommendation engine using TF-IDF vectorization and cosine similarity to match users with relevant peers, communities, and events based on shared interests.",
      "Engineered a full-stack Streamlit application featuring dynamic filtering, node clustering by domain, and real-time exploration of academic communities across departments.",
      "Integrated personalized networking message generation using LLM prompting, enabling users to send contextually relevant connection requests to recommended peers with a single click.",
      "Designed the data layer to ingest and normalize diverse campus data sources — student profiles, club directories, and event feeds — into a unified graph structure powering all discovery features."
    ]
  },
  emailassistant: {
    label: "Productivity · NLP",
    title: "AI Email Assistant",
    stack: "Python · FastAPI · React · OpenAI API · TypeScript",
    accent: "#8b5cf6",
    bullets: [
      "Built a context-aware email generation assistant that analyzes prior conversation threads and user intent to draft professional, tone-appropriate replies in seconds.",
      "Designed a FastAPI backend that processes email context through an LLM pipeline, extracting key topics, sentiment, and required actions to generate highly relevant draft responses.",
      "Developed a React frontend with a clean compose interface where users can adjust tone (formal, casual, concise) and review AI-generated drafts before sending — keeping humans in control.",
      "Implemented thread summarization capabilities that condense long email chains into structured briefings, helping users catch up on complex conversations without reading every message.",
      "Engineered prompt templates with few-shot examples calibrated for common professional scenarios — follow-ups, meeting requests, status updates — ensuring consistent and reliable output quality."
    ]
  }
};

/* =========================
SCENE SYSTEM
========================= */

const sceneFrames = [4, 70, 160, 245, 330];
let currentScene = 0;
let isAnimating = false;
let targetFrame = 0;
let currentFramePosition = 0;
let introFinished = false;

function typeName(){
  const name = "Smit Patel";
  const el = document.getElementById("introName");
  let i = 0;
  const t = setInterval(()=>{
    el.textContent += name[i++];
    if(i === name.length){ clearInterval(t); setTimeout(moveNameToCorner, 1000); }
  }, 120);
}

function moveNameToCorner(){
  document.getElementById("introName").classList.add("moveTop");
  setTimeout(showCharacter, 1000);
}

function showCharacter(){
  introFinished = true;
  document.querySelector(".canvas-container").classList.add("show");
  targetFrame = 4;
  currentFramePosition = 0;
  setTimeout(()=>{ showScene(0); }, 700);
}

function showScene(index){
  document.querySelectorAll(".scene-content").forEach(s=>{
    s.style.opacity = "0";
    s.style.pointerEvents = "none";
  });
  const target = document.getElementById("scene"+(index+1));
  if(target){
    target.style.opacity = "1";
    target.style.pointerEvents = "auto";
  }
}

function hideAllScenes(){
  document.querySelectorAll(".scene-content").forEach(s=>{
    s.style.opacity = "0";
    s.style.pointerEvents = "none";
  });
}

function changeScene(index){
  if(isAnimating) return;
  isAnimating = true;
  hideAllScenes();
  currentScene = index;
  targetFrame = sceneFrames[index];
  setTimeout(()=>{ showScene(index); isAnimating = false; }, 1000);
}

/* =========================
CANVAS
========================= */

const canvas = document.getElementById("characterCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){
  const dpr = window.devicePixelRatio || 1;
  canvas.width  = window.innerWidth  * dpr;
  canvas.height = window.innerHeight * dpr;
  canvas.style.width  = window.innerWidth  + "px";
  canvas.style.height = window.innerHeight + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

/* =========================
FRAME SYSTEM
========================= */

const FRAME_COUNT = 355;
const frameSrc = i => `frames_png/f${String(i+1).padStart(3,"0")}.png`;

const images = Array.from({length: FRAME_COUNT}, (_, i)=>{
  const img = new Image();
  img.src = frameSrc(i);
  return img;
});

function renderFrame(index){
  if(!introFinished && index > 0) return;
  const img = images[index];
  if(!img || !img.complete || !img.naturalWidth) return;

  const cw = canvas.clientWidth;
  const ch = canvas.clientHeight;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = cw / ch;

  let dw, dh;
  if(ir > cr){ dw = cw; dh = dw / ir; }
  else       { dh = ch; dw = dh * ir; }

  /* Horizontal xShift — character position per scene */
  let xShift = 0;
  if     (index <= 70)  { const p=(index-4)/(70-4);   xShift = 250 - p*500; }
  else if(index <= 160) { const p=(index-70)/(160-70); xShift = -250 + p*250; }
  else if(index <= 245) { const p=(index-160)/(245-160); xShift = p*250; }
  else if(index <= 330) { const p=(index-245)/(330-245); xShift = 250 - p*500; }
  else                  { xShift = -250; }

  const x = (cw - dw) / 2 + xShift;
  const y = (ch - dh) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, x, y, dw, dh);
}

function animate(){
  currentFramePosition += (targetFrame - currentFramePosition) * 0.15;
  renderFrame(Math.floor(currentFramePosition));
  requestAnimationFrame(animate);
}

/* =========================
EXPERIENCE MODAL
========================= */

const expModal       = document.getElementById("expModal");
const expModalInner  = document.getElementById("expModalInner");
const expModalClose  = document.getElementById("expModalClose");
const expModalLabel  = document.getElementById("expModalLabel");
const expModalTitle  = document.getElementById("expModalTitle");
const expModalMeta   = document.getElementById("expModalMeta");
const expModalBullets= document.getElementById("expModalBullets");

function openExpModal(frame){
  const label   = frame.dataset.label   || "Experience";
  const title   = frame.dataset.title   || "";
  const meta    = frame.dataset.meta    || "";
  const bullets = (frame.dataset.bullets || "").split("|").filter(Boolean);

  expModalLabel.textContent   = label;
  expModalTitle.textContent   = title;
  expModalMeta.innerHTML      = meta;
  expModalBullets.innerHTML   = bullets.map(b=>`<li>${b}</li>`).join("");

  expModal.classList.add("active");
  expModal.setAttribute("aria-hidden","false");
  expModalClose.focus();
}

function closeExpModal(){
  expModal.classList.remove("active");
  expModal.setAttribute("aria-hidden","true");
}

expModalClose.addEventListener("click", closeExpModal);
expModal.addEventListener("click", e=>{ if(e.target === expModal) closeExpModal(); });

document.querySelectorAll(".exp-frame").forEach(frame=>{
  frame.addEventListener("click", ()=> openExpModal(frame));
  frame.addEventListener("keydown", e=>{ if(e.key==="Enter"||e.key===" ") openExpModal(frame); });
});

/* =========================
PROJECT MODAL
========================= */

const projModal       = document.getElementById("projModal");
const projModalInner  = document.getElementById("projModalInner");
const projModalClose  = document.getElementById("projModalClose");
const projModalLabel  = document.getElementById("projModalLabel");
const projModalTitle  = document.getElementById("projModalTitle");
const projModalStack  = document.getElementById("projModalStack");
const projModalBullets= document.getElementById("projModalBullets");

function openProjModal(key){
  const d = PROJECT_DATA[key];
  if(!d) return;

  projModalLabel.textContent   = d.label;
  projModalTitle.textContent   = d.title;
  projModalStack.textContent   = d.stack;
  projModalBullets.innerHTML   = d.bullets.map(b=>`<li>${b}</li>`).join("");

  /* Apply per-project accent color as CSS variable */
  projModalInner.style.setProperty("--proj-accent", d.accent);
  projModalInner.style.borderTopColor = d.accent;
  projModalLabel.style.color  = d.accent;
  projModalStack.style.color  = d.accent;
  projModalBullets.querySelectorAll("li::before");
  /* bullet dots via inline style on each li */
  projModalBullets.querySelectorAll("li").forEach(li=>{
    li.style.setProperty("--dot-color", d.accent);
  });

  projModal.classList.add("active");
  projModal.setAttribute("aria-hidden","false");
  projModalClose.focus();
}

function closeProjModal(){
  projModal.classList.remove("active");
  projModal.setAttribute("aria-hidden","true");
}

projModalClose.addEventListener("click", closeProjModal);
projModal.addEventListener("click", e=>{ if(e.target === projModal) closeProjModal(); });

document.querySelectorAll(".view-project-btn").forEach(btn=>{
  btn.addEventListener("click", e=>{
    e.stopPropagation();
    openProjModal(btn.dataset.project);
  });
});

/* Dynamic bullet dot color via JS since ::before pseudo can't receive inline style */
const bulletStyle = document.createElement("style");
document.head.appendChild(bulletStyle);

function updateBulletStyle(accent){
  bulletStyle.textContent = `#projModalBullets li::before { background: ${accent} !important; }`;
}

/* Patch openProjModal to also update bullet style */
const _origOpen = openProjModal;
window.openProjModal = function(key){
  _origOpen(key);
  const d = PROJECT_DATA[key];
  if(d) updateBulletStyle(d.accent);
};

/* Re-bind buttons to use patched version */
document.querySelectorAll(".view-project-btn").forEach(btn=>{
  btn.onclick = e=>{ e.stopPropagation(); window.openProjModal(btn.dataset.project); };
});

/* =========================
ESCAPE KEY closes any open modal
========================= */

document.addEventListener("keydown", e=>{
  if(e.key === "Escape"){ closeExpModal(); closeProjModal(); }
});

/* =========================
SCROLL NAVIGATION
========================= */

window.addEventListener("wheel", e=>{
  if(isAnimating || Math.abs(e.deltaY) < 30) return;
  if(e.deltaY > 0 && currentScene < sceneFrames.length-1) changeScene(currentScene+1);
  if(e.deltaY < 0 && currentScene > 0) changeScene(currentScene-1);
});

/* =========================
TOUCH NAVIGATION
========================= */

let touchStartY = 0;
window.addEventListener("touchstart", e=>{ touchStartY = e.touches[0].clientY; }, {passive:true});
window.addEventListener("touchend", e=>{
  if(isAnimating) return;
  const delta = touchStartY - e.changedTouches[0].clientY;
  if(Math.abs(delta) < 40) return;
  if(delta > 0 && currentScene < sceneFrames.length-1) changeScene(currentScene+1);
  if(delta < 0 && currentScene > 0) changeScene(currentScene-1);
}, {passive:true});

/* =========================
INIT
========================= */

window.addEventListener("load", ()=>{
  document.getElementById("loader").style.display = "none";
  renderFrame(0);
  typeName();
  animate();
});