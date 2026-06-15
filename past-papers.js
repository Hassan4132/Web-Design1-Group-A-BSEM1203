function qs(s){ return document.querySelector(s); }
function qsa(s){ return Array.from(document.querySelectorAll(s)); }

function slugify(name){
  return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function getParam(name){
  return new URLSearchParams(location.search).get(name);
}

// Subjects per exam level
const SUBJECTS_BECE = [
  'Mathematics','English Language','Science','Social Studies','RME','Home Economics','Basic Design','Agriculture'
];

const SUBJECTS_WASSCE = [
  'Mathematics','English Language','Biology','Chemistry','Physics','Information & Communication Technology','Economics','Accounting','Commerce','Geography','Government','Agriculture','Literature'
];

const SUBJECTS_NPSE = [
  'Mathematics','English Language','General Studies','Verbal Aptitude','Quantitative Aptitude'
];

// Default subjects (will be set based on ?level=)
let SUBJECTS = SUBJECTS_WASSCE.slice();

// Question banks are now loaded from external mock-*.js files

function renderSubjects(){
  const list = qs('#subject-list');
  list.innerHTML = '';
  SUBJECTS.forEach(s=>{
    const a = document.createElement('a');
    a.href = `?subject=${encodeURIComponent(s)}`;
    a.textContent = s;
    a.style.display = 'block';
    a.style.margin = '6px 0';
    a.dataset.subject = s;
    a.addEventListener('click', function(e){
      e.preventDefault();
      // set param and re-render years for this subject
      const subj = this.dataset.subject;
      history.replaceState({}, '', `?subject=${encodeURIComponent(subj)}`);
      renderYears(1990);
      // focus years column
      const yearsEl = qs('#year-list'); if(yearsEl) yearsEl.scrollIntoView({behavior:'smooth'});
      // update subject heading
      qs('#subject-heading').textContent = subj;
      // clear papers area
      qs('#papers-list').innerHTML = '<p>Select a year and confirm to view the paper.</p>';
    });
    list.appendChild(a);
  });
}

function renderYears(start=1990){
  const now = new Date();
  const end = now.getFullYear();
  const list = qs('#year-list');
  list.innerHTML = '';
  // create or reset confirm container
  let confirmWrap = qs('#year-confirm-wrap');
  if(!confirmWrap){ confirmWrap = document.createElement('div'); confirmWrap.id = 'year-confirm-wrap'; qs('#year-list').parentNode.appendChild(confirmWrap); }
  confirmWrap.innerHTML = '';
  for(let y=end; y>=start; y--){
    const a = document.createElement('a');
    a.href = `?subject=${encodeURIComponent(getParam('subject')||'Mathematics')}&year=${y}`;
    a.textContent = y;
    a.style.display = 'inline-block';
    a.style.margin = '4px 8px';
    a.dataset.year = y;
    a.addEventListener('click', function(e){
      e.preventDefault();
      // mark selected
      const prev = list.querySelectorAll('a'); prev.forEach(n=> n.style.border = '1px solid rgba(11,61,145,0.06)');
      this.style.border = '2px solid #062a5a';
      // store selection in history state
      const subj = getParam('subject') || 'Mathematics';
      history.replaceState({}, '', `?subject=${encodeURIComponent(subj)}&year=${this.dataset.year}`);
      // show confirm button
      showConfirmForSelection(subj, this.dataset.year);
    });
    list.appendChild(a);
  }
}


function showConfirmForSelection(subject, year){
  const wrap = qs('#year-confirm-wrap');
  wrap.innerHTML = '';
  const note = document.createElement('div');
  note.style.marginTop = '12px';
  note.textContent = `Selected: ${subject} — ${year}`;
  const confirm = document.createElement('button');
  confirm.className = 'btn';
  confirm.style.display = 'block';
  confirm.style.marginTop = '10px';
  confirm.textContent = 'View Past Paper';
  confirm.addEventListener('click', function(){
    // attempt to open PDF; if missing, render generated paper below
    const slug = slugify(subject);
    const pdfPath = `pdfs/${slug}-${year}.pdf`;
    // try to open pdf in new tab
    fetch(pdfPath, { method: 'HEAD' }).then(res=>{
      if(res.ok){ window.open(pdfPath, '_blank'); }
      else { renderGeneratedPaper(subject, year); }
    }).catch(()=>{ renderGeneratedPaper(subject, year); });
  });
  wrap.appendChild(note);
  wrap.appendChild(confirm);
}
function renderPapers(){
  const papers = qs('#papers-list');
  papers.innerHTML = '';
  const subject = getParam('subject');
  const year = getParam('year');
  if(!subject){ papers.innerHTML = '<p>Select a subject to see years and papers.</p>'; return; }
  qs('#subject-heading').textContent = subject;
  if(!year){ papers.innerHTML = '<p>Select a year to view the past paper.</p>'; return; }
  const slug = slugify(subject);
  const filename = `pdfs/${slug}-${year}.pdf`;
  const link = document.createElement('a');
  link.href = filename;
  link.textContent = `${subject} ${year} past paper`;
  link.target = '_blank';
  link.style.display = 'block';
  link.style.margin = '8px 0';
  papers.appendChild(link);
  const note = document.createElement('p');
  note.style.marginTop = '8px';
  note.textContent = 'If a PDF is missing, this is a placeholder link. Add files into the pdfs/ folder as "'+slug+'-'+year+'.pdf".';
  papers.appendChild(note);
}

function renderGeneratedPaper(subject, year){
  const container = qs('#papers-list');
  container.innerHTML = '';
  
  // Determine level to pull correct mock data
  let lvl = getParam('level');
  if(!lvl) {
    try { lvl = sessionStorage.getItem('wv_past_level'); } catch(e) { lvl = 'WASSCE'; }
  }
  lvl = (lvl || 'WASSCE').toUpperCase();

  let mockData = null;
  if(lvl === 'NPSE' && window.MOCK_NPSE) mockData = window.MOCK_NPSE[subject];
  else if(lvl === 'BECE' && window.MOCK_BECE) mockData = window.MOCK_BECE[subject];
  else if(window.MOCK_WASSCE) mockData = window.MOCK_WASSCE[subject];

  if(!mockData) {
    container.innerHTML = `<p>Realistic mock data for ${subject} is not yet available.</p>`;
    return;
  }

  // Header Section
  const paperHeader = document.createElement('div');
  paperHeader.style.borderBottom = '2px solid #ccc';
  paperHeader.style.paddingBottom = '15px';
  paperHeader.style.marginBottom = '25px';
  paperHeader.style.textAlign = 'center';

  const h = document.createElement('h2'); 
  h.textContent = `${lvl} ${year} Practice Examination`; 
  h.style.margin = '0 0 10px 0';
  h.style.color = '#0b3d91';

  const subH = document.createElement('h3');
  subH.textContent = `Subject: ${subject}`;
  subH.style.margin = '0 0 5px 0';

  const timeP = document.createElement('p');
  timeP.innerHTML = `<strong>Time Allowed:</strong> ${mockData.time}`;
  timeP.style.margin = '5px 0';

  const instP = document.createElement('p');
  instP.innerHTML = `<strong>Instructions:</strong> ${mockData.instructions}`;
  instP.style.margin = '5px 0';

  paperHeader.appendChild(h);
  paperHeader.appendChild(subH);
  paperHeader.appendChild(timeP);
  paperHeader.appendChild(instP);
  container.appendChild(paperHeader);

  // Section A - Objective (MCQs)
  if(mockData.sectionA && mockData.sectionA.length > 0) {
    const secA = document.createElement('div'); 
    secA.style.marginBottom = '30px';
    const saH = document.createElement('h3'); 
    saH.textContent = 'SECTION A: OBJECTIVE TEST'; 
    saH.style.color = '#2563eb';
    saH.style.borderBottom = '1px solid #e5e7eb';
    saH.style.paddingBottom = '8px';
    secA.appendChild(saH);
    
    const form = document.createElement('form');
    mockData.sectionA.forEach((qObj, idx) => {
      const qDiv = document.createElement('div'); 
      qDiv.style.marginBottom = '15px';
      qDiv.style.padding = '10px';
      qDiv.style.background = '#f9fafb';
      qDiv.style.borderRadius = '6px';
      
      const qP = document.createElement('p'); 
      qP.style.fontWeight = '600'; 
      qP.style.margin = '0 0 8px 0';
      qP.textContent = `${idx + 1}. ${qObj.q}`;
      qDiv.appendChild(qP);
      
      const labels = ['A', 'B', 'C', 'D'];
      qObj.o.forEach((optText, optIdx) => {
        const wrap = document.createElement('div'); 
        wrap.style.margin = '4px 0';
        
        const input = document.createElement('input'); 
        input.type = 'radio'; 
        input.name = 'q'+(idx+1); 
        input.id = 'q'+(idx+1)+'_o'+optIdx; 
        input.value = optIdx;
        
        const lab = document.createElement('label'); 
        lab.htmlFor = input.id; 
        lab.style.marginLeft = '8px'; 
        lab.style.cursor = 'pointer';
        lab.textContent = `${labels[optIdx]}. ${optText}`;
        
        wrap.appendChild(input); 
        wrap.appendChild(lab); 
        qDiv.appendChild(wrap);
      });
      form.appendChild(qDiv);
    });

    const submit = document.createElement('button'); 
    submit.type = 'button'; 
    submit.className = 'btn'; 
    submit.textContent = 'Submit Section A';
    submit.style.marginTop = '15px';
    submit.addEventListener('click', () => {
      // Score calculation
      let score = 0;
      mockData.sectionA.forEach((qObj, idx) => {
        const selected = form.querySelector(`input[name="q${idx+1}"]:checked`);
        if(selected && parseInt(selected.value) === qObj.a) {
          score++;
        }
      });
      let resultP = form.querySelector('.score-result');
      if(!resultP) {
        resultP = document.createElement('p');
        resultP.className = 'score-result';
        resultP.style.marginTop = '12px';
        resultP.style.fontWeight = '700';
        resultP.style.fontSize = '18px';
        resultP.style.color = '#15803d';
        form.appendChild(resultP);
      }
      resultP.textContent = `You scored ${score} out of ${mockData.sectionA.length} in Section A.`;
    });

    secA.appendChild(form); 
    secA.appendChild(submit); 
    container.appendChild(secA);
  }

  // Section B - Theory / Structured Questions
  if(mockData.sectionB && mockData.sectionB.length > 0) {
    const secB = document.createElement('div'); 
    const sbH = document.createElement('h3'); 
    sbH.textContent = 'SECTION B: THEORY / ESSAY'; 
    sbH.style.color = '#2563eb';
    sbH.style.borderBottom = '1px solid #e5e7eb';
    sbH.style.paddingBottom = '8px';
    secB.appendChild(sbH);
    
    mockData.sectionB.forEach((qtxt) => {
      const qDiv = document.createElement('div');
      qDiv.style.marginBottom = '25px';
      
      const p = document.createElement('p'); 
      p.style.fontWeight = '600';
      p.style.lineHeight = '1.6';
      p.textContent = qtxt; 
      qDiv.appendChild(p);

      // Add writing space
      const space = document.createElement('textarea');
      space.style.width = '100%';
      space.style.height = '120px';
      space.style.marginTop = '10px';
      space.style.padding = '10px';
      space.style.border = '1px solid #ccc';
      space.style.borderRadius = '6px';
      space.placeholder = 'Type your answer here or use a separate sheet of paper...';
      qDiv.appendChild(space);

      secB.appendChild(qDiv);
    });
    container.appendChild(secB);
  }

  // smooth scroll to papers
  container.scrollIntoView({behavior:'smooth'});
}

document.addEventListener('DOMContentLoaded', ()=>{
  // determine level parameter, fall back to sessionStorage if absent
  let lvl = getParam('level');
  if(!lvl){
    try{ lvl = sessionStorage.getItem('wv_past_level'); }catch(e){ lvl = null; }
  }
  if(lvl && lvl.toUpperCase() === 'BECE'){
    SUBJECTS = SUBJECTS_BECE.slice();
  } else if (lvl && lvl.toUpperCase() === 'NPSE') {
    SUBJECTS = SUBJECTS_NPSE.slice();
  } else {
    SUBJECTS = SUBJECTS_WASSCE.slice();
  }
  // Update page heading and intro to reflect chosen level
  try{
    let levelText = 'WASSCE';
    if(lvl && lvl.toUpperCase() === 'BECE') levelText = 'BECE';
    else if(lvl && lvl.toUpperCase() === 'NPSE') levelText = 'NPSE';

    const titleEl = qs('#past-title');
    if(titleEl) titleEl.textContent = `${levelText} Past Papers`;
    const introEl = qs('#intro');
    if(introEl) introEl.textContent = `Quickly find ${levelText} past examination papers by subject and year. Click a subject, then choose a year.`;
  }catch(e){ /* ignore */ }
  renderSubjects();
  // choose year range based on level
  let startYear = 1990;
  if(lvl && lvl.toUpperCase() === 'BECE') startYear = 2000;
  else if(lvl && lvl.toUpperCase() === 'NPSE') startYear = 2020;
  
  renderYears(startYear);
  renderPapers();
  // re-render years when subject changes via link
  const subjectParam = getParam('subject');
  if(subjectParam){
    qs('#subject-heading').textContent = subjectParam;
  }
});
