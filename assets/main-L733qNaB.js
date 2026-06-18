(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function l(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=l(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{v(),y(),L(),w(),k(),I()});function v(){const n=document.getElementById("main-header");if(!n)return;const s=()=>{window.scrollY>15?(n.classList.add("bg-white/90","backdrop-blur-md-custom","shadow-md","border-b","border-slate-100"),n.classList.remove("bg-transparent","border-transparent")):(n.classList.add("bg-transparent","border-transparent"),n.classList.remove("bg-white/90","backdrop-blur-md-custom","shadow-md","border-b","border-slate-100"))};s(),window.addEventListener("scroll",s,{passive:!0})}function y(){const n=document.getElementById("mobile-menu-btn"),s=document.getElementById("mobile-menu"),l=document.getElementById("mobile-menu-overlay");if(!n||!s||!l)return;const t=()=>{const o=n.getAttribute("aria-expanded")==="true";n.setAttribute("aria-expanded",!o),s.classList.toggle("translate-x-0"),s.classList.toggle("translate-x-full"),l.classList.toggle("hidden"),l.classList.toggle("opacity-100");const r=n.querySelector(".line-1"),a=n.querySelector(".line-2"),c=n.querySelector(".line-3");r&&a&&c&&(o?(r.style.transform="none",a.style.opacity="1",c.style.transform="none"):(r.style.transform="translateY(6px) rotate(45deg)",a.style.opacity="0",c.style.transform="translateY(-6px) rotate(-45deg)")),document.body.classList.toggle("overflow-hidden")};n.addEventListener("click",t),l.addEventListener("click",t),s.querySelectorAll("a").forEach(o=>{o.addEventListener("click",()=>{n.getAttribute("aria-expanded")==="true"&&t()})})}function L(){const n=window.location.pathname,s=n.substring(n.lastIndexOf("/")+1)||"index.html";document.querySelectorAll(".nav-link").forEach(t=>{const e=t.getAttribute("href");if(e===s||s==="index.html"&&e==="./"||s==="index.html"&&e==="/"){t.classList.add("text-sky-600","font-semibold"),t.classList.remove("text-slate-600");const o=t.querySelector(".nav-underline");o&&(o.classList.remove("scale-x-0"),o.classList.add("scale-x-100"))}else{t.classList.remove("text-sky-600","font-semibold"),t.classList.add("text-slate-600");const o=t.querySelector(".nav-underline");o&&(o.classList.remove("scale-x-100"),o.classList.add("scale-x-0"))}})}function w(){const n=document.querySelectorAll(".reveal");if(n.length===0)return;const s=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("revealed"),s.unobserve(e.target))})},{root:null,threshold:.1,rootMargin:"0px 0px -40px 0px"});l();function l(){n.forEach(t=>s.observe(t))}}function k(){document.querySelectorAll("form").forEach(s=>{s.addEventListener("submit",l=>{l.preventDefault();const t=new FormData(s),e=t.get("name")||t.get("parentName")||"Valued Patient",o=t.get("service")||"";let r=`Thank you, ${e}. We have received your consultation message and will respond within 2 hours.`;if(s.id==="booking-form"){const a=t.get("date")||"requested date",c=t.get("time")||"requested time";r=`Thank you, ${e}. Your appointment for standard ${o||"consultation"} on ${a} at ${c} has been requested successfully. One of our clinical coordinators will call you shortly to confirm!`}E("Success",r),s.reset()})})}function E(n,s){const l=document.getElementById("custom-alert-modal");l&&l.remove();const t=`
    <div id="custom-alert-modal" class="fixed inset-0 z-150 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 opacity-0">
      <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center transform scale-95 transition-transform duration-300 border border-slate-100">
        <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 mb-4 animate-bounce">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-xl font-display font-bold text-slate-900 mb-2">${n}</h3>
        <p class="text-slate-600 mb-6 text-sm leading-relaxed">${s}</p>
        <button id="close-modal-btn" class="w-full py-2.5 px-4 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-semibold transition-all shadow-md shadow-sky-200 cursor-pointer">
          Perfect, Thank you
        </button>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("custom-alert-modal"),o=e.querySelector("div"),r=document.getElementById("close-modal-btn");setTimeout(()=>{e.classList.add("opacity-100"),o.classList.remove("scale-95"),o.classList.add("scale-100")},10);const a=()=>{e.classList.remove("opacity-100"),o.classList.remove("scale-100"),o.classList.add("scale-95"),setTimeout(()=>{e.remove()},300)};r.addEventListener("click",a),e.addEventListener("click",c=>{c.target===e&&a()})}function I(){const n=document.querySelectorAll("[data-gallery-src]");if(n.length===0)return;const s=Array.from(n).map(i=>({src:i.getAttribute("data-gallery-src"),title:i.getAttribute("data-gallery-title")||"Clinic Feature",desc:i.getAttribute("data-gallery-description")||"In our pristine facilities."}));let l=0;document.getElementById("gallery-lightbox")||document.body.insertAdjacentHTML("beforeend",`
      <div id="gallery-lightbox" class="fixed inset-0 z-200 hidden bg-slate-950/95 backdrop-blur-md transition-opacity duration-300 opacity-0 select-none flex-col justify-between">
        <!-- Lightbox Header -->
        <div class="w-full flex items-center justify-between p-4 md:p-6 text-white bg-gradient-to-b from-slate-950/80 to-transparent">
          <div>
            <h4 id="lightbox-caption-title" class="font-display font-bold text-lg md:text-xl tracking-tight text-white leading-none"></h4>
            <span id="lightbox-counter" class="text-xs text-slate-400 font-mono mt-1 block"></span>
          </div>
          <button id="lightbox-close" class="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-white cursor-pointer" aria-label="Close Lightbox">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Lightbox Content Base -->
        <div class="relative flex-1 flex items-center justify-center p-4">
          <!-- Navigation Arrow Left -->
          <button id="lightbox-prev" class="absolute left-4 md:left-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10" aria-label="Previous Image">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <!-- Main Image Shell -->
          <div class="w-full max-w-4xl max-h-[70vh] flex flex-col items-center justify-center">
            <img id="lightbox-img" src="" alt="Clinic Presentation" class="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl scale-95 opacity-0 transition-all duration-300 border border-white/10" referrerPolicy="no-referrer">
          </div>

          <!-- Navigation Arrow Right -->
          <button id="lightbox-next" class="absolute right-4 md:right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all cursor-pointer z-10" aria-label="Next Image">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>

        <!-- Lightbox Footer -->
        <div class="w-full p-4 md:p-6 text-center text-slate-300 bg-gradient-to-t from-slate-950/80 to-transparent">
          <p id="lightbox-caption-desc" class="text-sm text-balance max-w-xl mx-auto"></p>
        </div>
      </div>
    `);const t=document.getElementById("gallery-lightbox"),e=document.getElementById("lightbox-img"),o=document.getElementById("lightbox-caption-title"),r=document.getElementById("lightbox-caption-desc"),a=document.getElementById("lightbox-counter"),c=document.getElementById("lightbox-close"),h=document.getElementById("lightbox-prev"),b=document.getElementById("lightbox-next"),u=i=>{l=i;const d=s[l];e.classList.add("scale-95","opacity-0"),setTimeout(()=>{e.src=d.src,o.textContent=d.title,r.textContent=d.desc,a.textContent=`${l+1} of ${s.length}`,e.onload=()=>{e.classList.remove("scale-95","opacity-0"),e.classList.add("scale-100","opacity-100")}},150)},x=i=>{t.classList.remove("hidden"),t.classList.add("flex"),setTimeout(()=>{t.classList.add("opacity-100")},10),u(i),document.body.classList.add("overflow-hidden")},m=()=>{t.classList.remove("opacity-100"),e.classList.add("scale-95","opacity-0"),setTimeout(()=>{t.classList.add("hidden"),t.classList.remove("flex")},300),document.body.classList.remove("overflow-hidden")},g=()=>{let i=l+1;i>=s.length&&(i=0),u(i)},f=()=>{let i=l-1;i<0&&(i=s.length-1),u(i)};n.forEach((i,d)=>{i.addEventListener("click",p=>{p.preventDefault(),x(d)})}),c.addEventListener("click",m),h.addEventListener("click",f),b.addEventListener("click",g),t.addEventListener("click",i=>{(i.target===t||i.target.id==="lightbox-img-shell"||i.target.tagName==="DIV"&&i.target.classList.contains("relative"))&&m()}),document.addEventListener("keydown",i=>{t.classList.contains("hidden")||(i.key==="Escape"&&m(),i.key==="ArrowRight"&&g(),i.key==="ArrowLeft"&&f())})}
