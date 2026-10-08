(() => {
  'use strict';
  const data = window.SITE_CONTENT;
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safe = value => /^(https?:\/\/|mailto:|assets\/|[a-zA-Z0-9_-]+\.pdf$)/.test(value || '') ? esc(value) : '#';
  const photoById = id => data.photos.find(p => p.id === id);
  const link = (url, label, cls = 'text-link') => `<a class="${cls}" href="${safe(url)}">${esc(label)}</a>`;
  const page = document.body.dataset.page || 'home';
  const nav = [['home','index.html','Home'],['about','about.html','About'],['research','research.html','Research'],['cv','cv.html','Publications & CV'],['teaching','teaching.html','Teaching and Outreach'],['gallery','gallery.html','Gallery']];

  // Enlargements are deliberately restricted to Gallery.
  function imageCard(id, options = {}) {
    const p = photoById(id); if (!p) return '';
    const interactive = options.interactive === true;
    const high = options.hero === true;
    const picture = `<img src="${safe(high && p.category !== 'Research images' ? p.full : p.thumbnail)}" alt="${esc(p.alt)}" style="object-position:${esc(options.position || p.position || 'center')}" ${high ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
    const body = interactive
      ? `<button type="button" class="photo-open" data-image-open="${esc(id)}" aria-label="Enlarge ${esc(p.title)}">${picture}<span class="expand-icon" aria-hidden="true">＋</span></button>`
      : `<div class="photo-static">${picture}</div>`;
    const label = options.caption === false ? '' : `<figcaption>${esc(options.captionText || p.title)}</figcaption>`;
    const credit = p.placeholder ? `<p class="image-credit">Reference image · ${esc(p.credit)}${p.source ? ` · <a href="${safe(p.source)}" target="_blank" rel="noopener noreferrer">Source</a>` : ''}</p>` : '';
    return `<figure class="photo ${p.contain ? 'photo-contain' : ''} ${p.category==='Research images' ? 'scientific-figure' : ''} ${options.className || ''}" data-category="${esc(p.category)}" style="--image-background:${esc(p.background || 'var(--pale)')}">${body}${label}${credit}</figure>`;
  }
  const heading = (title, intro = '', eyebrow = '') => `<header class="page-intro">${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ''}<h1>${esc(title)}</h1>${intro ? `<p class="page-lead">${esc(intro)}</p>` : ''}</header>`;
  function imageLink(id,url,label) {
    return `<a class="image-link" href="${esc(url)}" aria-label="${esc(label)}">${imageCard(id,{caption:false})}</a>`;
  }
  const approachGroups = () => [...data.methodGroups,{id:'modelling',title:'Modelling and quantitative analysis',intro:'Connect measurements to timescales and evolving physical conditions.',items:data.modellingTools}];
  const aliases = item => (item.aliases||[]).map(id=>`<span class="anchor-alias" id="${esc(id)}" aria-hidden="true"></span>`).join('');
  function categoryCard(category, compact = false) {
    const href='research.html#'+category.id;
    const entries=category.id==='methods'?approachGroups():category.projectIds.map(id=>data.projects.find(p=>p.id===id));
    return `<article class="category-card">${imageLink(category.image,href,'Go to '+category.title)}<div class="category-card-copy"><h3><a href="${esc(href)}">${esc(category.title)}</a></h3>${compact?`<p>${esc(category.question)}</p>`:`<ul>${entries.map(item=>`<li><a href="research.html#${esc(item.id)}">${esc(item.title)}</a></li>`).join('')}</ul>`}</div></article>`;
  }
  function recordList(entries) {
    return `<div class="record-list">${entries.map(e=>`<article class="record"><p class="record-date">${esc(e.date)}</p><div><h3>${esc(e.title)}</h3>${e.institution ? `<p class="record-institution">${esc(e.institution)}</p>` : ''}<p>${esc(e.text)}</p></div></article>`).join('')}</div>`;
  }
  const header = `<header class="site-header wrap"><a class="wordmark" href="index.html">${esc(data.name)}<span>Earth and Planetary Sciences</span></a><button class="menu-toggle" type="button" aria-controls="main-nav" aria-expanded="false">Menu</button><nav id="main-nav" aria-label="Main navigation">${nav.map(([key,url,label])=>`<a href="${url}" ${page === key || (page === 'project' && key === 'research') ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav></header><div class="site-banner wrap" aria-label="Mt. Hood banner">${imageCard(data.heroImage,{hero:true,caption:false,position:"center 20%"})}</div>`;
  const footer = `<footer class="site-footer wrap"><div><p class="footer-name">${esc(data.name)}</p><p>University of California, Davis</p>${link('mailto:'+data.email,data.email)}</div><div class="footer-links">${link(data.groupUrl,'Research group')}${link(data.linkedInUrl,'LinkedIn')}<a class="text-link" href="cv.html">Publications &amp; CV</a></div></footer>`;
  function featuredResearch() {
    const f=data.featuredProject,href='research.html#'+f.id;
    return `<section class="featured-research section"><p class="eyebrow">Current research · Quartz growth</p><h2><a href="${esc(href)}">${esc(f.title)}</a></h2><p class="feature-summary">${esc(f.summary)}</p>${imageLink(f.image,href,'Read about quartz growth and titanium uptake')}<a class="text-link" href="${esc(href)}">Read about the project <span aria-hidden="true">↗</span></a></section>`;
  }
  const home = () => `<div class="wrap"><section class="home-intro">${imageCard(data.portraitId,{hero:true,caption:false,className:'home-portrait'})}<div class="home-copy"><p class="eyebrow">${esc(data.professionalIdentity)}</p><h1>${esc(data.name)}</h1><p class="role">${esc(data.role)}</p><p class="affiliation">${esc(data.affiliation)}</p><p>${esc(data.introduction)}</p><p>${esc(data.biography)}</p><div class="home-links">${link('mailto:'+data.email,data.email)}<a class="text-link" href="about.html">About my work <span aria-hidden="true">↗</span></a><a class="text-link" href="cv.html">Publications &amp; CV <span aria-hidden="true">↗</span></a></div></div></section>${featuredResearch()}<section class="section home-themes"><div class="section-heading"><div><p class="eyebrow">Research programme</p><h2>Research themes</h2></div><a class="text-link" href="research.html">Explore the research <span aria-hidden="true">↗</span></a></div><div class="category-grid theme-grid">${data.researchCategories.filter(c=>c.id!=='methods').map(c=>categoryCard(c,true)).join('')}</div><a class="text-link approaches-link" href="research.html#methods">Experiments, microanalysis and modelling <span aria-hidden="true">↗</span></a></section><section class="activity-feature section">${imageLink('poster-session','teaching.html','Go to Teaching and Outreach')}<div><p class="eyebrow">Presentations and education</p><h2>Teaching and Outreach</h2><p>Connecting geological observations to the processes that shape minerals, landscapes, and planets.</p><a class="text-link" href="teaching.html">Presentations, teaching and outreach <span aria-hidden="true">↗</span></a></div></section></div>`;
  const about = () => `<div class="wrap about-page">${heading('About',data.aboutLead)}<div class="about-prose">${data.aboutParagraphs.map(p=>`<p>${esc(p)}</p>`).join('')}<div class="about-links"><a class="text-link" href="research.html">Research <span aria-hidden="true">↗</span></a><a class="text-link" href="cv.html">Publications &amp; CV <span aria-hidden="true">↗</span></a><a class="text-link" href="teaching.html">Teaching and Outreach <span aria-hidden="true">↗</span></a></div></div></div>`;
  function sectionHeading(title) {
    return `<div class="category-heading"><h2>${esc(title)}</h2><a class="back-to-projects" href="research.html#research-projects">Research overview ↑</a></div>`;
  }
  function projectRow(p) {
    const primary=p.displayImage||p.image;
    return `<article class="research-project" id="${esc(p.id)}">${aliases(p)}<div class="project-copy"><h3>${esc(p.title)}</h3><p class="project-question">${esc(p.question)}</p><p>${esc(p.displaySummary||p.short)}</p>${p.url?link(p.url,'Read publication'):''}</div>${primary?imageCard(primary,{className:'project-main-image',captionText:p.displayCaption}):''}</article>`;
  }
  function categorySection(category) {
    return `<section class="research-area research-category" id="${esc(category.id)}">${aliases(category)}${sectionHeading(category.title)}<p class="theme-question">${esc(category.question)}</p><div class="category-projects">${category.projectIds.map(id=>projectRow(data.projects.find(p=>p.id===id))).join('')}</div></section>`;
  }
  function methods() {
    return `<section class="research-area methods-section" id="methods">${sectionHeading('Approaches')}<div class="method-groups">${approachGroups().map(g=>`<section class="method-group" id="${esc(g.id)}">${aliases(g)}<h3>${esc(g.title)}</h3><p class="method-purpose">${esc(g.intro)}</p><ul class="tool-list">${g.items.map(m=>`<li id="${esc(m.id)}">${esc(m.name)}</li>`).join('')}</ul></section>`).join('')}</div><div class="methods-photo-strip methods-instrument-photos">${data.methodPhotos.map(id=>imageCard(id)).join('')}</div></section>`;
  }
  const research = () => {
    return `<div class="wrap">${heading('Research',data.researchIntroduction)}<section class="category-index" id="research-projects" aria-label="Research themes and approaches"><div class="category-grid">${data.researchCategories.map(c=>categoryCard(c)).join('')}</div></section>${data.researchCategories.filter(c=>c.id!=='methods').map(categorySection).join('')}${methods()}</div>`;
  };
  const gallery = () => {
    const photos=data.photos.filter(p=>p.gallery!==false && !p.placeholder);
    return `<div class="wrap">${heading('Gallery',data.galleryIntroduction)}<div class="gallery-controls"><div class="gallery-filters" role="group" aria-label="Filter photographs">${['All images',...new Set(photos.map(p=>p.category))].map((c,i)=>`<button type="button" data-filter="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('')}</div><p>Hover to preview. Click or tap to enlarge.</p></div><p class="sr-only" id="gallery-status" role="status"></p><div class="gallery-grid">${photos.map(p=>imageCard(p.id,{interactive:true,className:p.wide?'gallery-wide':''})).join('')}</div></div>`;
  };
  const authorList = authors => esc(authors).replace(/Needham, (?:É|E)\./g, match=>`<strong>${match}</strong>`);
  function publication(p, manuscript = false) {
    return `<article class="publication${manuscript?' manuscript':''}" id="publication-${esc(p.id)}"><p class="record-date">${esc(manuscript?p.status:p.year)}</p><div><h3>${p.url?`<a href="${safe(p.url)}">${esc(p.title)}</a>`:esc(p.title)}</h3><p class="publication-authors">${authorList(p.authors)}</p>${p.journal?`<p class="journal">${esc(p.journal)}</p>`:''}${p.significance?`<p class="publication-significance">${esc(p.significance)}</p>`:''}<div class="publication-links">${p.doi?link('https://doi.org/'+p.doi,'DOI: '+p.doi):p.url?link(p.url,'Read publication'):''}${p.projectId?`<a class="text-link" href="research.html#${esc(p.projectId)}">Related research <span aria-hidden="true">↗</span></a>`:''}</div></div></article>`;
  }
  const cv = () => `<div class="wrap">${heading('Publications & CV')}<div class="cv-download"><div><p class="eyebrow">Curriculum vitae</p><h2>Full academic CV</h2><p>${esc(data.cvVersion)} version</p></div>${link(data.cv,'Download CV (PDF)','button-primary')}</div><section class="content-section"><h2>Published</h2><div class="publication-list">${data.publications.map(p=>publication(p)).join('')}</div></section>${data.manuscripts?.length?`<section class="content-section"><h2>In preparation</h2><div class="publication-list">${data.manuscripts.map(p=>publication(p,true)).join('')}</div></section>`:''}<section class="content-section"><h2>Education</h2>${recordList(data.education)}</section></div>`;
  function activity(e) {
    return `<article class="activity-record ${e.photos.length?'with-photos':''}" data-activity-category="${esc(e.category)}" id="${esc(e.anchor || 'activity-'+e.id)}"><div class="activity-date">${e.date?`<p>${esc(e.date)}</p>`:''}</div><div class="activity-copy"><p class="activity-kind">${esc(e.type)}</p><h3>${esc(e.title)}</h3>${e.subtitle?`<p class="activity-subtitle">${esc(e.subtitle)}</p>`:''}${e.event||e.location?`<p class="activity-event">${esc([e.event,e.location].filter(Boolean).join(' · '))}</p>`:''}${e.authors?`<p class="activity-authors">${esc(e.authors)}</p>`:''}${e.text?`<p>${esc(e.text)}</p>`:''}${e.aside?`<p class="activity-aside">${esc(e.aside)}</p>`:''}${e.status?`<p class="activity-status">${esc(e.status)}</p>`:''}</div>${e.photos.length?`<div class="activity-photos">${e.photos.map(id=>imageCard(id)).join('')}</div>`:''}</article>`;
  }
  const selectedActivities=()=>data.activities.filter(e=>e.selected===true&&(!e.status||e.includeScheduled===true));
  function tourGuiding() {
    const t=data.tourGuiding;
    return activity({id:'grand-canyon-guiding',anchor:'grand-canyon-guiding',category:'Informal lecturing',type:'Informal lecturing',title:t.title,event:t.company,text:t.text,aside:t.aside,photos:t.photos});
  }
  const teaching = () => `<div class="wrap">${heading('Presentations, Teaching and Outreach',data.activityIntroduction)}<div class="activity-photo-strip">${imageCard('poster-session')}${imageCard('science-talk')}</div><div class="activity-toolbar"><div class="activity-filters" role="group" aria-label="Filter activities">${['All','Talks','Posters','Teaching','Informal lecturing','Outreach & service','Collaborations'].map((c,i)=>`<button type="button" data-activity-filter="${esc(c)}" aria-pressed="${i===0}">${esc(c)}</button>`).join('')}</div><p id="activity-status" role="status">${selectedActivities().length+1} entries</p></div><div class="activity-list">${selectedActivities().map(activity).join('')}${tourGuiding()}</div></div>`;
  // Legacy individual-project URLs now open a section on the unified Research page.
  const project = research;
  const views = {home,about,research,cv,teaching,gallery,project};
  // RENDER_START
  $('#site-header').innerHTML = header;
  $('#main').innerHTML = (views[page] || home)();
  $('#site-footer').innerHTML = footer;
  if(page === 'project') {
    const requested = new URLSearchParams(location.search).get('id');
    const legacyAliases={volcanoes:'volcanology',crystals:'experimental-petrology',moon:'lunar-breccias'};
    const id=legacyAliases[requested] || requested;
    const known=[...data.projects,...data.researchCategories,...approachGroups()].flatMap(item=>[item.id,...(item.aliases||[]),...(item.items||[]).map(m=>m.id)]);
    location.replace('research.html'+(known.includes(id)?'#'+id:''));
  } else {
    const revealHash=()=>{
      const target=document.getElementById(location.hash.slice(1));
      if(target)requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
    };
    window.addEventListener('hashchange',revealHash);
    document.addEventListener('click',event=>{
      const href=event.target.closest('a')?.getAttribute('href')||'';
      if(page==='research'&&href.startsWith('research.html#')&&'#'+href.split('#')[1]===location.hash)revealHash();
    });
    if(location.hash)revealHash();
  }
  // RENDER_END
  $('.menu-toggle').addEventListener('click', e=>{
    const button=e.currentTarget,open=button.getAttribute('aria-expanded')!=='true';
    button.setAttribute('aria-expanded',String(open));
    $('#main-nav').classList.toggle('is-open',open);
  });
  document.addEventListener('keydown', e=>{
    if(e.key==='Escape' && $('.menu-toggle').getAttribute('aria-expanded')==='true') {
      $('.menu-toggle').setAttribute('aria-expanded','false');$('#main-nav').classList.remove('is-open');$('.menu-toggle').focus();
    }
  });
  $$('[data-activity-filter]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-activity-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    let count=0;
    $$('[data-activity-category]').forEach(record=>{
      record.hidden=button.dataset.activityFilter!=='All' && record.dataset.activityCategory!==button.dataset.activityFilter;
      if(!record.hidden)count++;
    });
    $('#activity-status').textContent=`${count} ${count===1?'entry':'entries'}`;
  }));

  // Filtering also controls which photographs the viewer cycles through.
  $$('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    let count=0;
    $$('.gallery-grid .photo').forEach(card=>{card.hidden=button.dataset.filter!=='All images' && card.dataset.category!==button.dataset.filter; if(!card.hidden)count++;});
    $('#gallery-status').textContent=`${count} ${count===1?'image':'images'} shown`;
    hidePreview();
  }));

  // A native dialog provides focus trapping and Escape-to-close behaviour.
  document.body.insertAdjacentHTML('beforeend', `<div class="hover-preview" id="hover-preview" hidden><button type="button" aria-label="Open full image"><img alt=""><span></span></button></div><dialog class="image-viewer" id="image-viewer" aria-labelledby="viewer-title" aria-describedby="viewer-caption"><div class="viewer-shell"><header class="viewer-toolbar"><span id="viewer-counter"></span><div class="zoom-controls"><button type="button" id="zoom-out" aria-label="Zoom out">−</button><span id="zoom-level" aria-live="polite">100%</span><button type="button" id="zoom-in" aria-label="Zoom in">＋</button><button type="button" id="zoom-fit">Fit image</button></div><button type="button" id="viewer-close" autofocus aria-label="Close image viewer">Close <span aria-hidden="true">×</span></button></header><div class="viewer-stage" id="viewer-stage"><img id="viewer-image" alt="" draggable="false"></div><footer class="viewer-caption"><div><p class="eyebrow" id="viewer-category"></p><h2 id="viewer-title"></h2><p id="viewer-caption"></p><p class="viewer-credit"><span id="viewer-credit"></span> <a id="viewer-source" target="_blank" rel="noopener noreferrer">Image source ↗</a></p></div><div class="viewer-arrows"><button type="button" id="viewer-prev" aria-label="Previous image">←</button><button type="button" id="viewer-next" aria-label="Next image">→</button></div></footer></div></dialog>`);
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
    $('#viewer-credit').textContent=p.credit; $('#viewer-source').hidden=!p.source; $('#viewer-source').href=p.source || '#';
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
