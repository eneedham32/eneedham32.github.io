(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safe = value => /^(https?:\/\/|mailto:|assets\/|[a-zA-Z0-9_-]+\.pdf$)/.test(value || '') ? esc(value) : '#';
  const photoById = id => data.photos.find(p => p.id === id);
  const arrow = '<span aria-hidden="true">↗</span>';
  const expand = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>';
  const link = (url, label, cls = 'text-link') => `<a class="${cls}" href="${safe(url)}">${esc(label)} ${arrow}</a>`;
  const page = document.body.dataset.page || 'home';
  const nav = [['home','index.html','Home'],['research','research.html','Research'],['publications','publications.html','Publications & CV'],['gallery','gallery.html','Gallery'],['about','about.html','About & Contact']];
  function imageCard(id, options = {}) {
    const p = photoById(id); if (!p) return '';
    return `<figure class="photo ${options.className || ''}" data-category="${esc(p.category)}"><button type="button" class="photo-open" data-image-open="${esc(id)}" aria-label="Enlarge ${esc(p.title)}"><img src="${safe(options.hero ? p.full : p.thumbnail)}" alt="${esc(p.alt)}" ${options.hero ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"><span class="photo-tag">${p.placeholder ? 'Sample image' : esc(p.category)}</span><span class="expand-icon">${expand}</span></button>${options.caption === false ? '' : `<figcaption><span>${esc(p.title)}</span><span class="photo-kind">${esc(p.category)}</span></figcaption>`}</figure>`;
  }
  function projectCard(p) {
    return `<article class="project-card">${imageCard(p.image,{caption:false})}<div class="project-meta"><span>${p.number} / RESEARCH</span><span>${esc(p.methods[0])}</span></div><h3><a href="project.html?id=${p.id}">${esc(p.title)} <span aria-hidden="true">↗</span></a></h3><p>${esc(p.question)}</p></article>`;
  }
  function heading(kicker, title, intro) {
    return `<header class="page-intro"><p class="eyebrow">${esc(kicker)}</p><h1>${title}</h1><p class="page-lead">${esc(intro)}</p></header>`;
  }
  const header = `<div class="draft-bar"><span>DESIGN PREVIEW <span aria-hidden="true">/</span> 01</span><span>Sample imagery · Draft content</span></div><header class="site-header wrap"><a class="wordmark" href="index.html">${esc(data.name)}<span>EARTH & PLANETARY SCIENCE</span></a><button class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false">Menu <span aria-hidden="true">＋</span></button><nav id="main-nav" aria-label="Main navigation">${nav.map(([key,url,label])=>`<a href="${url}" ${page === key || (page === 'project' && key === 'research') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav></header>`;
  const footer = `<footer class="site-footer wrap"><div><a href="index.html" class="footer-name">${esc(data.name)}</a><p>University of California, Davis</p></div><div class="footer-links">${link(data.groupUrl,'Research group')}${link(data.linkedInUrl,'LinkedIn')}<a href="about.html">Get in touch ${arrow}</a></div><p class="footer-note">Design preview. Reference photographs are placeholders; credits accompany each image.</p></footer>`;
  const home = () => `<section class="home-intro wrap"><div><p class="eyebrow">${esc(data.role)}</p><h1>${esc(data.headline)}<br>${esc(data.headlineSecondLine)} <em>${esc(data.headlineEmphasis)}</em></h1></div><div class="home-intro-side"><p>${esc(data.introduction)}</p><a class="text-link" href="research.html">Explore the research ${arrow}</a></div></section><section class="hero-image wrap" aria-label="Featured landscape">${imageCard('sierra',{hero:true,caption:false})}<div class="hero-caption"><span>From landscapes to the smallest mineral records.</span><span>Reference image · Sierra Nevada / G. Thomas</span></div></section><section class="section wrap"><div class="section-title"><div><p class="eyebrow">A few connected questions</p><h2>Earth. Crystals. <em>The Moon.</em></h2></div><p>Experiments and observations across scales, connected by a curiosity about how geological histories are preserved.</p></div><div class="project-grid">${data.projects.map(projectCard).join('')}</div></section><section class="approach-band"><div class="wrap approach-grid"><p class="eyebrow">How I work</p><div><h2>Look closely.<br><em>Ask what came before.</em></h2><p>${esc(data.biography)}</p><a href="about.html" class="text-link">A little more about me ${arrow}</a></div><div class="method-list"><span><i>01</i> Observe in the field</span><span><i>02</i> Explore in the laboratory</span><span><i>03</i> Test with models</span></div></div></section><section class="section wrap image-story"><div>${imageCard('crystals',{caption:false})}</div><div><p class="eyebrow">Through another lens</p><h2>Small details.<br><em>Long histories.</em></h2><p>Textures and chemical patterns offer another way to see a rock. Explore a growing collection of images from the landscape to the mineral scale.</p><a class="text-link" href="gallery.html">Browse the gallery ${arrow}</a><p class="subtle">Hover over an image to preview it. Click or tap to look closer.</p></div></section>`;
  const research = () => `<div class="wrap">${heading('Research','Many scales.<br><em>Connected histories.</em>','Volcanology, experimental petrology, and geochemistry: three ways into the stories that rocks and minerals preserve.')}<div class="research-list">${data.projects.map(p=>`<article class="research-row">${imageCard(p.image,{caption:false})}<div><p class="eyebrow">${p.number} / ${esc(p.title)}</p><h2>${esc(p.question)}</h2><p>${esc(p.summary)}</p><div class="tags">${p.methods.map(m=>`<span>${esc(m)}</span>`).join('')}</div><a class="text-link" href="project.html?id=${p.id}">Explore this research ${arrow}</a></div></article>`).join('')}</div><aside class="quiet-note"><span class="small-label">NEXT LAYER</span><p>Individual studies, collaborators, figures, and related papers will be added as the project pages develop.</p></aside></div>`;
  const gallery = () => `<div class="wrap">${heading('Gallery','A closer look<br>at <em>the natural world.</em>','A place for field photographs, laboratory observations, and the textures that make you stop and look again.')}<div class="gallery-intro"><p>These credited reference images demonstrate the gallery. Your photographs will replace them.</p><span>Hover to preview · Click to explore</span></div><div class="gallery-filters" role="group" aria-label="Filter photographs">${['All images',...new Set(data.photos.map(p=>p.category))].map((c,i)=>`<button type="button" data-filter="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('')}</div><p class="sr-only" id="gallery-status" role="status"></p><div class="gallery-grid">${data.photos.map((p,i)=>imageCard(p.id,{className:i===0 || i===4 ? 'gallery-wide':''})).join('')}</div></div>`;
  const publications = () => `<div class="wrap">${heading('Publications & CV','The work,<br><em>in more detail.</em>','A place to find papers, conference posters, presentations, and a full academic CV.')}<div class="publications-layout"><section aria-labelledby="pub-heading"><div class="line-heading"><h2 id="pub-heading">Selected publications</h2><span>RESEARCH OUTPUTS</span></div>${data.publications.length ? data.publications.map(p=>`<article class="publication"><p class="eyebrow">${esc(p.year)}</p><h3>${esc(p.title)}</h3><p>${esc(p.authors)}</p><p>${esc(p.journal)}</p>${link(p.url,'Read paper')}</article>`).join('') : `<div class="empty-editorial"><span class="large-mark" aria-hidden="true">01—</span><h3>Your papers will go here.</h3><p>This space is ready for publication titles, authors, journal details, and links. The first version will be populated from your CV or publication list.</p><span class="status-label">Content to come</span></div>`}<div class="line-heading poster-heading"><h2>Posters & presentations</h2></div><div class="poster-card"><div class="poster-placeholder" aria-hidden="true"><span>ÉN / RESEARCH</span><div></div><div></div><div></div></div><div><p class="eyebrow">Featured conference poster</p><h3>A place to continue the conversation.</h3><p>Add the poster PDF and a short explanation so visitors arriving from your QR code can explore further.</p>${data.poster ? link(data.poster,'View poster') : '<span class="status-label">Poster PDF to come</span>'}</div></div></section><aside class="cv-card"><p class="eyebrow">Curriculum vitae</p><h2>The full<br><em>picture.</em></h2><p>Research, education, teaching, and experience in one document.</p>${data.cv ? link(data.cv,'Download CV','button-primary') : '<span class="status-label">CV to come</span>'}<div class="cv-rule"></div><p class="small-copy">Looking for a particular project?</p><a class="text-link" href="research.html">Explore research ${arrow}</a></aside></div></div>`;
  const about = () => `<div class="wrap">${heading('About & Contact','A curiosity<br>about <em>what came before.</em>','Connecting observations in rocks and minerals to the processes that made them.')}<section class="about-grid"><div>${data.portrait ? `<img class="portrait" src="${safe(data.portrait)}" alt="Portrait of ${esc(data.name)}">` : `<div class="portrait-placeholder"><div class="portrait-frame"><span aria-hidden="true">ÉN</span></div><p>Your photograph here</p><span>A portrait or a favourite field photo</span></div>`}</div><div class="about-copy"><p class="eyebrow">${esc(data.role)}</p><h2>Hello, I'm <em>Éamonn.</em></h2><p class="large-copy">${esc(data.introduction)}</p><p>${esc(data.biography)}</p><p>My interests span volcanic processes, crystal growth and diffusion, and lunar geochemistry.</p>${link(data.groupUrl,'Experimental Geochemistry at UC Davis')}<div class="about-note"><span class="small-label">MAKE THIS YOURS</span><p>There is room here for the route into your research, the places that shaped it, and a little of life beyond the laboratory.</p></div></div></section><section class="contact-panel" id="contact"><div><p class="eyebrow">Get in touch</p><h2>Let's talk <em>science.</em></h2><p>For conversations about research, collaboration, and scientific questions.</p></div><div class="contact-links">${data.email ? link('mailto:'+data.email,data.email) : '<span class="subtle">Your preferred contact email can be added here.</span>'}${link(data.groupUrl,'Research group')}${link(data.linkedInUrl,'LinkedIn')}</div></section></div>`;
  const project = () => {
    const id = new URLSearchParams(location.search).get('id');
    const p = data.projects.find(p=>p.id===id);
    if(!p) return `<div class="wrap">${heading('Research','Choose a <em>research theme.</em>','Explore the questions connecting volcanic processes, crystals, and the early Moon.')}<a class="button-primary" href="research.html">View research ${arrow}</a></div>`;
    document.title = `${p.title} — ${data.name} · Design preview`;
    return `<div class="wrap"><a class="back-link" href="research.html">← All research</a>${heading(p.number+' / '+p.title,esc(p.question),p.summary)}<div class="project-hero">${imageCard(p.image,{hero:true})}</div><section class="project-body"><p class="eyebrow">The approach</p><div><h2>Following the <em>evidence.</em></h2><p class="large-copy">${esc(p.approach)}</p><div class="tags">${p.methods.map(m=>`<span>${esc(m)}</span>`).join('')}</div><div class="quiet-note"><span class="small-label">PROJECT DETAILS TO COME</span><p>This section will hold your specific studies, collaborators, results, and related papers. The current text sketches the research theme.</p></div></div></section><section class="section"><div class="section-title"><div><p class="eyebrow">In pictures</p><h2>Look <em>closer.</em></h2></div><p>Reference images for now. Your field photographs, microscopy, and figures will go here.</p></div><div class="project-grid">${p.gallery.map(id=>imageCard(id)).join('')}</div></section></div>`;
  };
  const views = {home,research,gallery,publications,about,project};
  $('#site-header').innerHTML = header;
  $('#main').innerHTML = (views[page] || home)();
  $('#site-footer').innerHTML = footer;

  // Mobile navigation remains a normal set of page links.
  $('.menu-toggle').addEventListener('click', e=>{
    const button = e.currentTarget;
    const open = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(open));
    $('#main-nav').classList.toggle('is-open', open);
  });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && $('.menu-toggle').getAttribute('aria-expanded')==='true') {
      $('.menu-toggle').setAttribute('aria-expanded','false'); $('#main-nav').classList.remove('is-open'); $('.menu-toggle').focus();
    }
  });

  // Filtering also controls which photographs the viewer cycles through.
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    let count=0;
    $$('.gallery-grid .photo').forEach(card=>{card.hidden=button.dataset.filter!=='All images' && card.dataset.category!==button.dataset.filter; if(!card.hidden)count++;});
    $('#gallery-status').textContent=`${count} ${count===1?'image':'images'} shown`;
    hidePreview();
  }));

  // A native dialog provides focus trapping and Escape-to-close behaviour.
  document.body.insertAdjacentHTML('beforeend', `<div class="hover-preview" id="hover-preview" hidden><button type="button" aria-label="Open full image"><img alt=""><span></span></button></div><dialog class="image-viewer" id="image-viewer" aria-labelledby="viewer-title" aria-describedby="viewer-caption"><div class="viewer-shell"><header class="viewer-toolbar"><span id="viewer-counter"></span><div class="zoom-controls"><button type="button" id="zoom-out" aria-label="Zoom out">−</button><span id="zoom-level" aria-live="polite">100%</span><button type="button" id="zoom-in" aria-label="Zoom in">＋</button><button type="button" id="zoom-fit">Fit image</button></div><button type="button" id="viewer-close" autofocus aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></header><div class="viewer-stage" id="viewer-stage"><img id="viewer-image" alt="" draggable="false"></div><footer class="viewer-caption"><div><p class="eyebrow" id="viewer-category"></p><h2 id="viewer-title"></h2><p id="viewer-caption"></p><p class="viewer-credit"><span id="viewer-credit"></span> · <a id="viewer-source" target="_blank" rel="noopener noreferrer">Image source ↗</a></p></div><div class="viewer-arrows"><button type="button" id="viewer-prev" aria-label="Previous image">←</button><button type="button" id="viewer-next" aria-label="Next image">→</button></div></footer></div></dialog>`);
  const viewer = $('#image-viewer');
  const stage = $('#viewer-stage');
  const large = $('#viewer-image');
  const preview = $('#hover-preview');
  let collection=[], active=0, zoom=1, opener=null, previewTimer, hideTimer, previewTarget=null, suppressFocus=false;
  let baseWidth=0,baseHeight=0;
  function fitImage(reset=true) {
    if(!large.naturalWidth) return;
    if(reset)zoom=1;
    const ratio=Math.min((stage.clientWidth-32)/large.naturalWidth,(stage.clientHeight-24)/large.naturalHeight,1);
    baseWidth=large.naturalWidth*ratio; baseHeight=large.naturalHeight*ratio; applyZoom();
  }
  function applyZoom() {
    large.style.width=`${baseWidth*zoom}px`; large.style.height=`${baseHeight*zoom}px`;
    $('#zoom-level').textContent=`${Math.round(zoom*100)}%`;
    $('#zoom-out').disabled=zoom<=1; $('#zoom-in').disabled=zoom>=4;
    stage.classList.toggle('zoomed',zoom>1);
  }
  function showPhoto() {
    const p=photoById(collection[active]); if(!p)return;
    large.style.opacity='0'; large.alt=p.alt; large.onload=()=>{fitImage();large.style.opacity='1';stage.scrollTo(0,0);}; large.src=p.full;
    $('#viewer-title').textContent=p.title; $('#viewer-caption').textContent=p.caption;
    $('#viewer-category').textContent=(p.placeholder?'Sample image · ':'')+p.category;
    $('#viewer-credit').textContent=p.credit; $('#viewer-source').href=p.source;
    $('#viewer-counter').textContent=`${active+1} / ${collection.length}`;
    $('#viewer-prev').disabled=$('#viewer-next').disabled=collection.length<2;
    if(large.complete && large.naturalWidth) {fitImage();large.style.opacity='1';}
  }
  function openPhoto(id, element) {
    opener=element; hidePreview();
    collection=[...new Set($$('[data-image-open]').filter(b=>!b.closest('[hidden]')).map(b=>b.dataset.imageOpen))];
    active=Math.max(0,collection.indexOf(id));
    if(!viewer.open) viewer.showModal();
    document.body.classList.add('viewer-open'); showPhoto();
  }
  function hidePreview() {clearTimeout(previewTimer);clearTimeout(hideTimer);preview.hidden=true;}
  function showPreview(button) {
    if(viewer.open || window.innerWidth<760) return;
    const p=photoById(button.dataset.imageOpen); if(!p)return;
    previewTarget=button;
    $('img',preview).src=p.full; $('img',preview).alt=p.alt;
    $('span',preview).textContent=p.title+' · Click to open';
    const rect=button.getBoundingClientRect();
    preview.style.width=`${Math.min(innerWidth-32,Math.max(620,rect.width*1.3))}px`;
    preview.hidden=false;
    const w=preview.offsetWidth,h=preview.offsetHeight,margin=16;
    let left=rect.right+14;
    if(left+w>innerWidth-margin)left=rect.left-w-14;
    if(left<margin)left=(innerWidth-w)/2;
    let top=rect.top+(rect.height-h)/2;
    top=Math.max(margin,Math.min(top,innerHeight-h-margin));
    preview.style.left=`${left}px`;preview.style.top=`${top}px`;
  }
  const canHover=matchMedia('(hover: hover) and (pointer: fine)');
  $$('[data-image-open]').forEach(button=>{
    button.addEventListener('click',()=>openPhoto(button.dataset.imageOpen,button));
    button.addEventListener('pointerenter',e=>{if(canHover.matches && e.pointerType!=='touch'){clearTimeout(hideTimer);previewTimer=setTimeout(()=>showPreview(button),350);}});
    button.addEventListener('pointerleave',()=>{clearTimeout(previewTimer);hideTimer=setTimeout(hidePreview,160);});
    button.addEventListener('focus',()=>{if(suppressFocus){suppressFocus=false;return;}previewTimer=setTimeout(()=>showPreview(button),350);});
    button.addEventListener('blur',hidePreview);
  });
  preview.addEventListener('pointerenter',()=>clearTimeout(hideTimer));
  preview.addEventListener('pointerleave',hidePreview);
  $('button',preview).addEventListener('click',()=>{if(previewTarget)openPhoto(previewTarget.dataset.imageOpen,previewTarget);});
  $('#viewer-close').addEventListener('click',()=>viewer.close());
  viewer.addEventListener('close',()=>{document.body.classList.remove('viewer-open');hidePreview();suppressFocus=true;opener?.focus({preventScroll:true});setTimeout(()=>{suppressFocus=false;},0);});
  function advance(amount) {active=(active+amount+collection.length)%collection.length;showPhoto();}
  $('#viewer-prev').addEventListener('click',()=>advance(-1)); $('#viewer-next').addEventListener('click',()=>advance(1));
  $('#zoom-in').addEventListener('click',()=>{zoom=Math.min(4,zoom+0.5);applyZoom();});
  $('#zoom-out').addEventListener('click',()=>{zoom=Math.max(1,zoom-0.5);applyZoom();});
  $('#zoom-fit').addEventListener('click',()=>{fitImage();stage.scrollTo(0,0);});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape')hidePreview();
    if(viewer.open && e.key==='ArrowRight'){e.preventDefault();advance(1);}
    if(viewer.open && e.key==='ArrowLeft'){e.preventDefault();advance(-1);}
  });
  let drag=null;
  stage.addEventListener('pointerdown',e=>{if(zoom>1 && e.pointerType==='mouse'){drag={x:e.clientX,y:e.clientY,sx:stage.scrollLeft,sy:stage.scrollTop};stage.setPointerCapture(e.pointerId);stage.classList.add('dragging');e.preventDefault();}});
  stage.addEventListener('pointermove',e=>{if(drag){stage.scrollLeft=drag.sx-(e.clientX-drag.x);stage.scrollTop=drag.sy-(e.clientY-drag.y);}});
  stage.addEventListener('pointerup',()=>{drag=null;stage.classList.remove('dragging');});
  stage.addEventListener('pointercancel',()=>{drag=null;stage.classList.remove('dragging');});
  window.addEventListener('resize',()=>{hidePreview();if(viewer.open)fitImage();});
  window.addEventListener('scroll',hidePreview,{passive:true});
})();
