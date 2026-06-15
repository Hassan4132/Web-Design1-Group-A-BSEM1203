// Minimal site JS: form validation and back-button behavior
// Small study notes database used by the Subject pages
const NOTES = {
    biology: [
        'Cell Biology: Cells are the basic unit of life. Remember the difference between prokaryotic and eukaryotic cells; study organelles and microscopy preparation.',
        'Ecology: Focus on ecosystems, food chains/webs, energy flow and human impacts such as deforestation and pollution.',
        'Genetics: Understand Mendelian inheritance, DNA structure, replication and basic genetic crosses (Punnett squares).',
        'Human Physiology: Learn major systems (circulatory, respiratory, digestive) and their functions; practice labeling diagrams.',
        'Plant Biology: Study photosynthesis, transpiration, and plant structure (roots, stems, leaves, flowers).'
    ],
    chemistry: [
        'Atoms & Molecules: Know atomic structure, electrons, protons and neutrons; learn how elements form compounds.',
        'Chemical Reactions: Balance equations, identify reaction types (combustion, synthesis, decomposition).',
        'Stoichiometry: Practice mole calculations, molar mass and converting between moles and grams.',
        'Acids & Bases: Learn pH scale, strong vs weak acids, neutralization reactions and titration basics.',
        'Organic Basics: Memorize simple functional groups (alcohols, alkanes, alkenes) and basic naming rules.'
    ],
    mathematics: [
        'Number Theory & Arithmetic: Practice operations, fractions, percentages and order of operations.',
        'Algebra: Manipulate equations, factorisation, indices and solving linear/quadratic equations.',
        'Geometry: Learn angle rules, properties of shapes, Pythagoras and circle theorems.',
        'Trigonometry: Memorize sine/cosine/tangent ratios and practice solving right-angled triangle problems.',
        'Calculus (Further): Understand limits, derivatives and basic integration techniques.'
    ],
    physics: [
        'Mechanics: Study forces, Newton\'s laws, motion equations and free-body diagrams.',
        'Energy & Work: Learn types of energy, conservation of energy and power calculations.',
        'Waves: Understand wave properties, frequency, wavelength and basic sound/light behaviour.',
        'Electricity: Practice Ohm\'s law, circuits, voltage, current and resistance calculations.',
        'Thermodynamics: Basics of heat transfer, temperature scales and simple calorimetry.'
    ],
    english: [
        'Comprehension: Read actively, annotate passages, identify main idea and author tone.',
        'Grammar: Practice subject-verb agreement, tenses and sentence structure.',
        'Writing: Plan essays, use clear introductions/conclusions and support points with examples.',
        'Literature: Learn key themes, characters and quotes from set texts.',
        'Vocabulary: Study context clues and common academic words used in exams.'
    ],
    geography: [
        'Physical Geography: Understand weather, climate, landforms and river processes.',
        'Human Geography: Study population, urbanisation, migration and resource use.',
        'Map Skills: Practice reading scales, grid references and interpreting maps.',
        'Environmental Issues: Focus on sustainable management, deforestation and climate change.',
        'Fieldwork: Learn how to collect and present geographic data (sampling methods).'
    ],
    economics: [
        'Basic Concepts: Understand scarcity, choice, opportunity cost and supply/demand.',
        'Markets: Study factors that shift supply and demand and price formation.',
        'Macroeconomics: Learn about GDP, inflation, unemployment and fiscal/monetary policy basics.',
        'Microeconomics: Study consumer behaviour, elasticity and production costs.',
        'Data Interpretation: Practice reading graphs and extracting economic conclusions.'
    ],
    ict: [
        'Computer Basics: Know hardware vs software, input/output devices and basic troubleshooting.',
        'Word Processing: Practice document formatting, styles and templates.',
        'Spreadsheets: Learn formulas, cell references and simple data analysis with charts.',
        'Databases: Understand tables, records and basic queries (SELECT statements).',
        'Internet Safety: Practice secure passwords, recognising phishing and safe browsing habits.'
    ]
};

function showMessage(container, message, type = 'success'){
    const existing = container.querySelector('.form-message');
    if(existing) existing.remove();
    const msg = document.createElement('div');
    msg.className = 'form-message';
    msg.style.padding = '10px 14px';
    msg.style.borderRadius = '8px';
    msg.style.marginBottom = '12px';
    msg.style.fontWeight = '600';
    if(type === 'success'){
        msg.style.background = 'rgba(11,61,145,0.08)';
        msg.style.color = '#062a5a';
    } else {
        msg.style.background = 'rgba(220,38,38,0.06)';
        msg.style.color = '#991b1b';
    }
    msg.textContent = message;
    container.insertBefore(msg, container.firstChild);
}

// Initialize a subject page: render topics and quizzes provided via config.
function initSubjectPage(config){
    try{
        const title = config.title || '';
        const subjectId = config.id || title;
        // set heading if present
        const titleEl = document.getElementById('subject-title');
        if(titleEl && title) titleEl.textContent = title;

        // Topics and progress
        const topics = config.topics || [];
        const topicsContainer = document.getElementById('topic-list');
        const progressInner = document.getElementById('progress-bar-inner');
        const progressPercent = document.getElementById('progress-percent');
        if(topicsContainer){
            topicsContainer.innerHTML = '';
            const saved = new Array(topics.length).fill(false);
            topics.forEach((t, i)=>{
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.justifyContent = 'space-between';
                row.style.padding = '8px 0';
                const left = document.createElement('div');
                left.style.display = 'flex';
                left.style.alignItems = 'center';
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.id = `${subjectId}-topic-${i}`;
                cb.style.marginRight = '10px';
                cb.addEventListener('change', updateProgress);
                const label = document.createElement('label');
                label.htmlFor = cb.id;
                label.textContent = t;
                left.appendChild(cb);
                left.appendChild(label);
                    // add Study More button to the right of each topic
                    const right = document.createElement('div');
                    const studyBtn = document.createElement('button');
                    studyBtn.className = 'btn btn-outline';
                    studyBtn.textContent = 'Study More';
                    studyBtn.style.fontSize = '0.85rem';
                    studyBtn.style.padding = '6px 10px';
                    studyBtn.style.marginLeft = '12px';
                    studyBtn.addEventListener('click', function(){
                        showStudyNote(subjectId, i, t);
                    });
                    right.appendChild(studyBtn);
                    row.appendChild(left);
                    row.appendChild(right);
                topicsContainer.appendChild(row);
            });
            function updateProgress(){
                const boxes = topicsContainer.querySelectorAll('input[type="checkbox"]');
                const total = boxes.length;
                let done = 0;
                boxes.forEach(b=>{ if(b.checked) done++; });
                const percent = total ? Math.round((done/total)*100) : 0;
                if(progressInner) progressInner.style.width = percent + '%';
                if(progressPercent) progressPercent.textContent = percent + '%';
            }
            updateProgress();
        }

        // Quizzes: use provided config.quiz or fallback to global QUIZ_DATA
        let quizzes = Array.isArray(config.quiz) ? config.quiz.slice() : [];
        if((!quizzes || quizzes.length === 0) && window.QUIZ_DATA && QUIZ_DATA[title]){
            quizzes = QUIZ_DATA[title].slice(0,3).map(q=>({question: q.questions[0].question, options: q.questions[0].options, correctIndex: q.questions[0].correctIndex}));
            // If QUIZ_DATA entries are full quizzes (arrays), use them directly
            if(QUIZ_DATA[title].length && QUIZ_DATA[title][0].questions) {
                // convert QUIZ_DATA subject quizzes to the page format: quizzes array of questions
                quizzes = QUIZ_DATA[title].slice(0,3).map(qset => ({ title: qset.title || 'Quiz', questions: qset.questions }));
            }
        }

        const quizForm = document.getElementById('quiz-form');
        const quizResult = document.getElementById('quiz-result');
        const quizListContainer = document.getElementById('quiz-list');

        // create simple quiz selector if multiple quizzes
        if(quizListContainer){
            quizListContainer.innerHTML = '';
            if(quizzes && quizzes.length){
                quizzes.forEach((q, idx)=>{
                    const btn = document.createElement('button');
                    btn.className = 'btn';
                    btn.style.display = 'block';
                    btn.style.width = '100%';
                    btn.style.marginBottom = '8px';
                    const label = q.title || `Quiz ${idx+1}`;
                    btn.textContent = label;
                    btn.addEventListener('click', ()=> renderQuiz(idx));
                    quizListContainer.appendChild(btn);
                });
            } else {
                quizListContainer.innerHTML = '<p style="color:#062a5a">No quizzes available.</p>';
            }
        }

        function renderQuiz(index){
            const qdata = quizzes[index];
            if(!qdata){ if(quizForm) quizForm.innerHTML = '<p>No quiz.</p>'; return; }
            const questions = qdata.questions || (Array.isArray(quizzes) && quizzes);
            if(!questions) return;
            if(quizForm) quizForm.innerHTML = '';
            questions.forEach((qq, qi)=>{
                const qWrap = document.createElement('div');
                qWrap.style.marginBottom = '12px';
                const qTitle = document.createElement('p');
                qTitle.style.fontWeight = '600';
                qTitle.textContent = (qi+1) + '. ' + qq.question;
                qWrap.appendChild(qTitle);
                (qq.options || []).forEach((opt, oi)=>{
                    const optWrap = document.createElement('div');
                    optWrap.style.margin = '6px 0';
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'q'+qi;
                    input.id = 'q'+qi+'_o'+oi;
                    input.value = oi;
                    const lab = document.createElement('label');
                    lab.htmlFor = input.id;
                    lab.style.marginLeft = '8px';
                    lab.textContent = opt;
                    optWrap.appendChild(input);
                    optWrap.appendChild(lab);
                    qWrap.appendChild(optWrap);
                });
                quizForm.appendChild(qWrap);
            });
            const submit = document.createElement('button');
            submit.type = 'button';
            submit.className = 'btn';
            submit.textContent = 'Submit Quiz';
            submit.addEventListener('click', function(){
                let score = 0; let total = 0;
                questions.forEach((qq, qi)=>{
                    total++;
                    const sel = quizForm.querySelector('input[name="q'+qi+'"]:checked');
                    if(sel && parseInt(sel.value,10) === (qq.correctIndex||0)) score++;
                });
                if(quizResult){ quizResult.textContent = `You scored ${score} / ${total}`; }
            });
            quizForm.appendChild(submit);
        }

        // auto-render first quiz if present
        if(quizzes && quizzes.length){ renderQuiz(0); }

        // Add "Explain Subject" button under the overview card (if present)
        try{
            const imgEl = document.getElementById('subject-image');
            if(imgEl){
                const overviewCard = imgEl.closest('.card');
                if(overviewCard){
                    // avoid duplicate
                    if(!overviewCard.querySelector('.explain-btn')){
                        const explainBtn = document.createElement('button');
                        explainBtn.className = 'btn btn-outline explain-btn';
                        explainBtn.style.margin = '12px 20px';
                        explainBtn.textContent = 'Study More';
                        explainBtn.addEventListener('click', function(){
                            showSubjectExplanation({ title: title, topics: topics, description: config.description || '' });
                        });
                        overviewCard.appendChild(explainBtn);
                    }
                }
            }
        } catch(e){ console.error('explain button error', e); }

    } catch(err){ console.error('initSubjectPage error', err); }
}

// Show a modal with subject explanation and topics; includes a Back button (history.back())
function showSubjectExplanation(opts){
    try{
        const title = opts.title || 'Subject';
        const topics = opts.topics || [];
        const description = opts.description || '';

        // overlay
        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.setAttribute('role','dialog');
        overlay.setAttribute('aria-label', title + ' explanation');

        const modal = document.createElement('div');
        modal.className = 'modal-card';
        const h = document.createElement('h2');
        h.textContent = title + ' — Overview';
        h.style.marginTop = '0';
        modal.appendChild(h);

        if(description){
            const p = document.createElement('p');
            p.textContent = description;
            p.style.marginBottom = '12px';
            modal.appendChild(p);
        } else if(topics.length){
            const gen = document.createElement('p');
            gen.textContent = 'This subject covers the following topics: ' + topics.join(', ') + '.';
            gen.style.marginBottom = '12px';
            modal.appendChild(gen);
        }

        // Determine a key to look up NOTES for this subject. Prefer explicit id, then title words.
        const subjectKeyCandidates = [];
        if(opts.subjectId) subjectKeyCandidates.push(String(opts.subjectId).toLowerCase());
        if(title) subjectKeyCandidates.push(String(title).toLowerCase());
        // also add individual title words (e.g. 'financial accounting' -> 'accounting')
        title.toString().toLowerCase().split(/[^a-z0-9]+/).forEach(w=>{ if(w) subjectKeyCandidates.push(w); });
        let notesKey = null;
        for(const c of subjectKeyCandidates){ if(window.NOTES && NOTES[c]){ notesKey = c; break; } }

        if(topics.length){
            const ul = document.createElement('ul');
            topics.forEach((t, idx)=>{
                const li = document.createElement('li');
                li.style.marginBottom = '8px';
                const strong = document.createElement('strong');
                strong.textContent = t;
                li.appendChild(strong);

                // explanation: prefer NOTES[notesKey][idx] when available
                let expl = '';
                if(notesKey && window.NOTES && Array.isArray(NOTES[notesKey]) && NOTES[notesKey][idx]){
                    expl = NOTES[notesKey][idx];
                } else if(notesKey && window.NOTES && typeof NOTES[notesKey] === 'string'){
                    expl = NOTES[notesKey];
                } else {
                    // concise generic explanation
                    expl = `${t}: Review the core concepts, important definitions and practise related past questions.`;
                }

                const p = document.createElement('p');
                p.textContent = expl;
                p.style.margin = '6px 0 10px';
                p.style.lineHeight = '1.35';
                li.appendChild(p);
                ul.appendChild(li);
            });
            modal.appendChild(ul);
        }

        const btnRow = document.createElement('div');
        btnRow.style.display = 'flex';
        btnRow.style.gap = '10px';
        btnRow.style.marginTop = '16px';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-outline';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', ()=> overlay.remove());

        const backBtn = document.createElement('button');
        backBtn.className = 'btn';
        backBtn.textContent = 'Back to previous page';
        backBtn.addEventListener('click', ()=>{
            if(window.history.length > 1) return window.history.back();
            window.location.href = 'index.html';
        });

        btnRow.appendChild(closeBtn);
        btnRow.appendChild(backBtn);
        modal.appendChild(btnRow);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // focus trap: focus close button
        closeBtn.focus();
    } catch(err){ console.error('showSubjectExplanation error', err); }
}

// Show a study note modal for a specific subject topic
function showStudyNote(subjectId, topicIndex, topicTitle){
    try{
        const key = (subjectId || '').toString().toLowerCase();
        let note = '';
        if(window.NOTES && NOTES[key] && NOTES[key][topicIndex]){
            note = NOTES[key][topicIndex];
        } else if(window.NOTES && NOTES[key] && typeof NOTES[key] === 'string'){
            note = NOTES[key];
        } else {
            note = `Study note for ${topicTitle}: review class notes, practice past questions and summarise key points in your own words.`;
        }

        const overlay = document.createElement('div');
        overlay.className = 'modal-overlay';
        overlay.setAttribute('role','dialog');
        overlay.setAttribute('aria-label', topicTitle + ' note');

        const modal = document.createElement('div');
        modal.className = 'modal-card';
        const h = document.createElement('h2');
        h.textContent = topicTitle;
        h.style.marginTop = '0';
        modal.appendChild(h);

        const p = document.createElement('p');
        p.textContent = note;
        p.style.margin = '8px 0 12px';
        modal.appendChild(p);

        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn-outline';
        closeBtn.textContent = 'Close';
        closeBtn.addEventListener('click', ()=> overlay.remove());
        modal.appendChild(closeBtn);

        overlay.appendChild(modal);
        document.body.appendChild(overlay);
        closeBtn.focus();
    } catch(err){ console.error('showStudyNote error', err); }
}

// Initialize and auto-hide the splash overlay. Adds Skip behaviour.
function initSplash(){
    try{
        const splash = document.getElementById('splash');
        if(!splash) return;
        const skip = document.getElementById('skip-splash');
        const INDEX_SPLASH_KEY = 'wv_index_splash_shown';
        // If we're on the homepage (index.html), only auto-redirect to register once.
        const isIndex = location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === '';
        if(isIndex && !sessionStorage.getItem(INDEX_SPLASH_KEY)){
            const hideAndRedirect = () => {
                try{ sessionStorage.setItem(INDEX_SPLASH_KEY, '1'); } catch(e){}
                try{ window.location.href = 'register.html'; } catch(e){
                    splash.classList.add('splash-hidden');
                    splash.setAttribute('aria-hidden','true');
                    splash.addEventListener('transitionend', ()=> { try{ splash.remove(); }catch(e){} }, {once:true});
                }
            };
            if(skip) skip.addEventListener('click', hideAndRedirect);
            setTimeout(hideAndRedirect, 1500);
        } else {
            // Already showed initial redirect or not on index: simply hide splash without redirect.
            const hide = () => {
                splash.classList.add('splash-hidden');
                splash.setAttribute('aria-hidden','true');
                splash.addEventListener('transitionend', ()=> { try{ splash.remove(); }catch(e){} }, {once:true});
            };
            if(skip) skip.addEventListener('click', hide);
            // hide quickly
            setTimeout(hide, 200);
        }
    }catch(err){ console.error('initSplash error', err); }
}

// Create and show a splash overlay on the current page, then redirect to `redirectTo`.
function createAndShowSplash(redirectTo = 'index.html', duration = 1500){
    try{
        // avoid duplicate
        if(document.getElementById('splash')) return setTimeout(()=>{ window.location.href = redirectTo; }, 300);
        const overlay = document.createElement('div');
        overlay.id = 'splash';
        overlay.className = 'splash-overlay';
        overlay.setAttribute('aria-hidden','false');

        const card = document.createElement('div');
        card.className = 'splash-card';
        const h1 = document.createElement('h1'); h1.className = 'splash-logo'; h1.textContent = 'WAEC Vault';
        const p = document.createElement('p'); p.className = 'splash-sub'; p.textContent = 'Your Gateway to BECE & WASSCE Success';
        const spinner = document.createElement('div'); spinner.className = 'splash-spinner';
        const skip = document.createElement('button'); skip.id = 'skip-splash'; skip.className = 'btn btn-outline'; skip.textContent = 'Skip';

        card.appendChild(h1); card.appendChild(p); card.appendChild(spinner); card.appendChild(skip);
        overlay.appendChild(card);
        document.body.appendChild(overlay);

        const doRedirect = () => { try{ window.location.href = redirectTo; } catch(e){ overlay.classList.add('splash-hidden'); } };
        skip.addEventListener('click', doRedirect);
        setTimeout(doRedirect, duration);
    }catch(err){ console.error('createAndShowSplash error', err); }
}

// Initialize a subject page: render topics and quizzes provided via config.
function initSubjectPage(config){
    try{
        const title = config.title || '';
        const subjectId = config.id || title;
        // set heading if present
        const titleEl = document.getElementById('subject-title');
        if(titleEl && title) titleEl.textContent = title;

        // Topics and progress
        const topics = config.topics || [];
        const topicsContainer = document.getElementById('topic-list');
        const progressInner = document.getElementById('progress-bar-inner');
        const progressPercent = document.getElementById('progress-percent');
        if(topicsContainer){
            topicsContainer.innerHTML = '';
            const saved = new Array(topics.length).fill(false);
            topics.forEach((t, i)=>{
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.alignItems = 'center';
                row.style.justifyContent = 'space-between';
                row.style.padding = '8px 0';
                const left = document.createElement('div');
                left.style.display = 'flex';
                left.style.alignItems = 'center';
                const cb = document.createElement('input');
                cb.type = 'checkbox';
                cb.id = `${subjectId}-topic-${i}`;
                cb.style.marginRight = '10px';
                cb.addEventListener('change', updateProgress);
                const label = document.createElement('label');
                label.htmlFor = cb.id;
                label.textContent = t;
                left.appendChild(cb);
                left.appendChild(label);
                row.appendChild(left);
                topicsContainer.appendChild(row);
            });
            function updateProgress(){
                const boxes = topicsContainer.querySelectorAll('input[type="checkbox"]');
                const total = boxes.length;
                let done = 0;
                boxes.forEach(b=>{ if(b.checked) done++; });
                const percent = total ? Math.round((done/total)*100) : 0;
                if(progressInner) progressInner.style.width = percent + '%';
                if(progressPercent) progressPercent.textContent = percent + '%';
            }
            updateProgress();
        }

        // Quizzes: use provided config.quiz or fallback to global QUIZ_DATA
        let quizzes = Array.isArray(config.quiz) ? config.quiz.slice() : [];
        if((!quizzes || quizzes.length === 0) && window.QUIZ_DATA && QUIZ_DATA[title]){
            quizzes = QUIZ_DATA[title].slice(0,3).map(q=>({question: q.questions[0].question, options: q.questions[0].options, correctIndex: q.questions[0].correctIndex}));
            // If QUIZ_DATA entries are full quizzes (arrays), use them directly
            if(QUIZ_DATA[title].length && QUIZ_DATA[title][0].questions) {
                // convert QUIZ_DATA subject quizzes to the page format: quizzes array of questions
                quizzes = QUIZ_DATA[title].slice(0,3).map(qset => ({ title: qset.title || 'Quiz', questions: qset.questions }));
            }
        }

        const quizForm = document.getElementById('quiz-form');
        const quizResult = document.getElementById('quiz-result');
        const quizListContainer = document.getElementById('quiz-list');

        // create simple quiz selector if multiple quizzes
        if(quizListContainer){
            quizListContainer.innerHTML = '';
            if(quizzes && quizzes.length){
                quizzes.forEach((q, idx)=>{
                    const btn = document.createElement('button');
                    btn.className = 'btn';
                    btn.style.display = 'block';
                    btn.style.width = '100%';
                    btn.style.marginBottom = '8px';
                    const label = q.title || `Quiz ${idx+1}`;
                    btn.textContent = label;
                    btn.addEventListener('click', ()=> renderQuiz(idx));
                    quizListContainer.appendChild(btn);
                });
            } else {
                quizListContainer.innerHTML = '<p style="color:#062a5a">No quizzes available.</p>';
            }
        }

        function renderQuiz(index){
            const qdata = quizzes[index];
            if(!qdata){ if(quizForm) quizForm.innerHTML = '<p>No quiz.</p>'; return; }
            const questions = qdata.questions || (Array.isArray(quizzes) && quizzes);
            if(!questions) return;
            if(quizForm) quizForm.innerHTML = '';
            questions.forEach((qq, qi)=>{
                const qWrap = document.createElement('div');
                qWrap.style.marginBottom = '12px';
                const qTitle = document.createElement('p');
                qTitle.style.fontWeight = '600';
                qTitle.textContent = (qi+1) + '. ' + qq.question;
                qWrap.appendChild(qTitle);
                (qq.options || []).forEach((opt, oi)=>{
                    const optWrap = document.createElement('div');
                    optWrap.style.margin = '6px 0';
                    const input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'q'+qi;
                    input.id = 'q'+qi+'_o'+oi;
                    input.value = oi;
                    const lab = document.createElement('label');
                    lab.htmlFor = input.id;
                    lab.style.marginLeft = '8px';
                    lab.textContent = opt;
                    optWrap.appendChild(input);
                    optWrap.appendChild(lab);
                    qWrap.appendChild(optWrap);
                });
                quizForm.appendChild(qWrap);
            });
            const submit = document.createElement('button');
            submit.type = 'button';
            submit.className = 'btn';
            submit.textContent = 'Submit Quiz';
            submit.addEventListener('click', function(){
                let score = 0; let total = 0;
                questions.forEach((qq, qi)=>{
                    total++;
                    const sel = quizForm.querySelector('input[name="q'+qi+'"]:checked');
                    if(sel && parseInt(sel.value,10) === (qq.correctIndex||0)) score++;
                });
                if(quizResult){ quizResult.textContent = `You scored ${score} / ${total}`; }
            });
            quizForm.appendChild(submit);
        }

        // auto-render first quiz if present
        if(quizzes && quizzes.length){ renderQuiz(0); }

    } catch(err){ console.error('initSubjectPage error', err); }
}

document.addEventListener('DOMContentLoaded', function(){
    // initialize splash overlay if present
    initSplash();

    // Ensure register button immediately redirects to home when clicked
    try{
        const regBtn = document.getElementById('register-button');
        if(regBtn){
            regBtn.addEventListener('click', function(e){
                try{ e.preventDefault(); } catch(e){}
                // Prefer submitting the registration form so the existing validation runs
                const form = document.getElementById('registrationForm');
                if(form){
                    if(typeof form.requestSubmit === 'function'){
                        form.requestSubmit();
                    } else {
                        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                    }
                } else {
                    // fallback: show splash
                    const fullname = (document.getElementById('fullname') && document.getElementById('fullname').value.trim()) || 'Student';
                    try{ showMessage(document.body, `Welcome, ${fullname}! Showing splash...`, 'success'); } catch(e){}
                    createAndShowSplash('index.html', 1200);
                }
            });
        }
    }catch(err){ console.error('register button handler error', err); }
    // Back button
    const backBtn = document.querySelector('.back-button');
    if(backBtn){
        backBtn.addEventListener('click', function(){
            if(window.history.length > 1){
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        });
    }

    // Intercept homepage Past Papers stat-box to show BECE/WASSCE chooser
    try{
        const pastStat = document.querySelector('a.stat-box[href*="past-papers.html"]');
        if(pastStat){
            pastStat.addEventListener('click', function(e){
                // only intercept if on the homepage
                if(location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === ''){
                    e.preventDefault();
                    showPastPaperChoice();
                }
            });
        }
    }catch(err){ console.error('past stat handler', err); }


// Show modal to choose BECE or WASSCE past papers
function showPastPaperChoice(){
    try{
        const overlay = document.createElement('div'); overlay.className = 'modal-overlay'; overlay.setAttribute('role','dialog'); overlay.setAttribute('aria-label','Choose past paper level');
        const modal = document.createElement('div'); modal.className = 'modal-card';
        const h = document.createElement('h2'); h.textContent = 'Choose Past Paper Level'; modal.appendChild(h);
        const p = document.createElement('p'); p.textContent = 'Select which past papers you would like to browse.'; modal.appendChild(p);
        const row = document.createElement('div'); row.style.display='flex'; row.style.gap='12px'; row.style.marginTop='12px';
        const beceBtn = document.createElement('button'); beceBtn.className='btn'; beceBtn.textContent='BECE Past Papers'; beceBtn.addEventListener('click', ()=>{ selectPastLevel('BECE'); });
        const wassceBtn = document.createElement('button'); wassceBtn.className='btn'; wassceBtn.textContent='WASSCE Past Papers'; wassceBtn.addEventListener('click', ()=>{ selectPastLevel('WASSCE'); });
        const npseBtn = document.createElement('button'); npseBtn.className='btn'; npseBtn.textContent='NPSE Past Papers'; npseBtn.addEventListener('click', ()=>{ selectPastLevel('NPSE'); });
        row.appendChild(npseBtn); row.appendChild(beceBtn); row.appendChild(wassceBtn);
        const close = document.createElement('button'); close.className='btn btn-outline'; close.textContent='Cancel'; close.style.marginTop='12px'; close.addEventListener('click', ()=> overlay.remove());
        modal.appendChild(row); modal.appendChild(close);
        overlay.appendChild(modal); document.body.appendChild(overlay);
        beceBtn.focus();
    }catch(e){ console.error('showPastPaperChoice error', e); }
}

// Store selection, update homepage UI, then navigate to past-papers
function selectPastLevel(level){
    try{
        sessionStorage.setItem('wv_past_level', level);
        updateHomepagePastLevel(level);
        // small delay so user sees the change briefly, then navigate
        setTimeout(function(){ window.location.href = `past-papers.html?level=${encodeURIComponent(level)}`; }, 600);
    }catch(e){ console.error('selectPastLevel error', e); }
}

// Update hero text and the Past Papers stat-box to reflect chosen level
function updateHomepagePastLevel(level){
    try{
        const heroText = document.querySelector('.hero .hero-text p');
        if(heroText){
            heroText.textContent = `${level} past examination papers, notes and worked solutions. Select a subject or browse by year.`;
        }
        const pastStat = document.querySelector('a.stat-box[href*="past-papers.html"]');
        if(pastStat){
            const p = pastStat.querySelector('p');
            if(p) p.textContent = `${level} Past Papers`;
            // also change aria label or title
            pastStat.setAttribute('title', `${level} Past Papers`);
        }
    }catch(e){ console.error('updateHomepagePastLevel error', e); }
}

// On homepage load, apply previously chosen level (if any)
try{
    document.addEventListener('DOMContentLoaded', function(){
        if(location.pathname.endsWith('index.html') || location.pathname === '/' || location.pathname === ''){
            const lvl = sessionStorage.getItem('wv_past_level');
            if(lvl) updateHomepagePastLevel(lvl);
        }
    });
}catch(e){ }
    // Registration Form: client-side validation only
    const registrationForm = document.getElementById('registrationForm');
    if(registrationForm){
        registrationForm.addEventListener('submit', function(e){
            e.preventDefault();
            const fullname = document.getElementById('fullname').value.trim();
            const email = document.getElementById('email').value.trim();
            const passwordEl = document.getElementById('password');
            const confirmEl = document.getElementById('confirm-password');
            const password = passwordEl ? passwordEl.value : '';
            const confirm = confirmEl ? confirmEl.value : '';

            if(fullname === '' || email === '' || password === '' || confirm === ''){
                showMessage(registrationForm, 'Please fill all required fields.', 'error');
                return;
            }

            const emailRegex = /^\S+@\S+\.\S+$/;
            if(!emailRegex.test(email)){
                showMessage(registrationForm, 'Please enter a valid email address.', 'error');
                return;
            }

            if(password.length < 6){
                showMessage(registrationForm, 'Password must be at least 6 characters.', 'error');
                return;
            }

            if(password !== confirm){
                showMessage(registrationForm, 'Passwords do not match.', 'error');
                return;
            }

            // store name for welcome message (session-only)
            try{ sessionStorage.setItem('wv_name', fullname); } catch(e){}

            showMessage(registrationForm, `Welcome, ${fullname}! Redirecting to home...`, 'success');
            registrationForm.reset();
            // redirect to homepage shortly after register
            setTimeout(function(){ window.location.href = 'index.html'; }, 800);
        });
    }

    // Login Form: basic validation, no dashboard or storage
    const loginForm = document.querySelector('form:not(#registrationForm)');
    if(loginForm){
        const emailField = loginForm.querySelector('input[type="email"]');
        const passwordField = loginForm.querySelector('input[type="password"]');
        if(emailField && passwordField){
            loginForm.addEventListener('submit', function(e){
                e.preventDefault();
                const email = emailField.value.trim();
                const password = passwordField.value.trim();
                if(email === '' || password === ''){
                    showMessage(loginForm, 'Please enter email and password.', 'error');
                    return;
                }
                const emailRegex = /^\S+@\S+\.\S+$/;
                if(!emailRegex.test(email)){
                    showMessage(loginForm, 'Please enter a valid email address.', 'error');
                    return;
                }
                // determine display name: prefer session stored name, else derive from email
                let name = null;
                try{ name = sessionStorage.getItem('wv_name'); } catch(e){ name = null; }
                if(!name){
                    const local = email.split('@')[0] || 'Student';
                    const first = local.split(/[._\-\s]/)[0] || local;
                    name = first.charAt(0).toUpperCase() + first.slice(1);
                }
                showMessage(loginForm, `Welcome, ${name}! Redirecting to home...`, 'success');
                setTimeout(function(){ window.location.href = 'index.html'; }, 800);
            });
        }
    }

    // Global Search Functionality
    const searchBoxes = document.querySelectorAll('.search-box');
    searchBoxes.forEach(sb => {
        sb.addEventListener('keypress', function(e){
            if(e.key === 'Enter'){
                e.preventDefault();
                const q = this.value.trim().toLowerCase();
                if(!q) return;

                // Simple routing logic based on keywords
                if(q.includes('npse') && q.includes('math')) window.location.href = 'npse-mathematics.html';
                else if(q.includes('npse') && q.includes('english')) window.location.href = 'npse-english.html';
                else if(q.includes('npse') && q.includes('general')) window.location.href = 'npse-general-studies.html';
                else if(q.includes('npse') && q.includes('verbal')) window.location.href = 'npse-verbal-aptitude.html';
                else if(q.includes('npse') && q.includes('quantitative')) window.location.href = 'npse-quantitative-aptitude.html';
                else if(q.includes('npse')) window.location.href = 'npse.html';
                else if(q.includes('bece')) window.location.href = 'bece.html';
                else if(q.includes('wassce')) window.location.href = 'wassce.html';
                else if(q.includes('past paper')) window.location.href = 'past-papers.html';
                else if(q.includes('math')) window.location.href = 'mathematics.html';
                else if(q.includes('english')) window.location.href = 'english.html';
                else if(q.includes('biology') || q.includes('science')) window.location.href = 'biology.html';
                else if(q.includes('chemistry')) window.location.href = 'chemistry.html';
                else if(q.includes('physics')) window.location.href = 'physics.html';
                else if(q.includes('economics')) window.location.href = 'economics.html';
                else if(q.includes('ict') || q.includes('computer')) window.location.href = 'ict.html';
                else window.location.href = 'resources.html';
            }
        });
    });
});