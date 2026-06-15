// quizzes data and renderer for quiz.html

const QUIZ_DATA = {
  "Mathematics": [
    {
      title: 'Algebra Basics',
      questions: [
        { question: 'Solve: 2x + 3 = 11', options: ['3', '4', '5', '6'], correctIndex: 1 },
        { question: 'What is 7 * 8?', options: ['54', '56', '58', '60'], correctIndex: 1 },
        { question: 'If f(x)=x^2, f(3)=?', options: ['6', '9', '3', '12'], correctIndex: 1 },
        { question: 'Simplify: 4(2x +1)', options: ['8x +1','8x +4','6x +4','8x -4'], correctIndex: 1 },
        { question: 'What is the square root of 81?', options: ['7','8','9','10'], correctIndex: 2 }
      ]
    },
      { title: 'Stoichiometry', questions: [
        { question: 'Mole concept measures?', options: ['amount of substance','mass','volume','density'], correctIndex: 0 },
        { question: 'Avogadro number approx?', options: ['6.02x10^23','3.14','9.81','1.6x10^-19'], correctIndex: 0 },
        { question: 'Reactants change into?', options: ['products','elements','mixtures','solutions'], correctIndex: 0 },
        { question: 'Balanced equation conserves?', options: ['mass','color','volume','temperature'], correctIndex: 0 },
        { question: 'Limiting reagent determines?', options: ['max product','min reactant','temperature','pressure'], correctIndex: 0 }
      ] },
    {
      title: 'Geometry Basics',
      questions: [
        { question: 'Sum of angles in a triangle?', options: ['180°','90°','360°','270°'], correctIndex: 0 },
        { question: 'A right angle equals?', options: ['90°','60°','45°','180°'], correctIndex: 0 },
        { question: 'Area of rectangle (l=5,w=3)?', options: ['8','15','10','12'], correctIndex: 1 },
        { question: 'Perimeter of square (side=4)?', options: ['12','16','8','20'], correctIndex: 1 },
        { question: 'Circumference of circle uses symbol?', options: ['π','e','φ','λ'], correctIndex: 0 }
      ]
    },
    {
      title: 'Number Operations',
      questions: [
        { question: 'LCM of 4 and 6?', options: ['12','24','6','10'], correctIndex: 0 },
        { question: 'GCD of 8 and 12?', options: ['2','4','6','8'], correctIndex: 1 },
        { question: 'What is 15% of 200?', options: ['20','25','30','35'], correctIndex: 2 },
        { question: 'Convert 0.75 to fraction', options: ['3/4','1/2','2/3','3/5'], correctIndex: 0 },
        { question: 'What is 9^2?', options: ['81','18','27','72'], correctIndex: 0 }
      ]
    },
    {
      title: 'Basic Trigonometry',
      questions: [
        { question: 'sin(90°) = ?', options: ['0','1','0.5','-1'], correctIndex: 1 },
        { question: 'cos(0°) = ?', options: ['0','1','-1','0.5'], correctIndex: 1 },
        { question: 'tan(45°) = ?', options: ['1','0','-1','0.5'], correctIndex: 0 },
        { question: 'sin(30°) = ?', options: ['0.5','1','0','-0.5'], correctIndex: 0 },
        { question: 'cos(60°) = ?', options: ['0.5','1','0','-0.5'], correctIndex: 0 }
      ]
    },
    {
      title: 'Word Problems',
      questions: [
        { question: 'If 3 pens cost $6, 1 pen costs?', options: ['$1','$2','$3','$4'], correctIndex: 1 },
        { question: 'John has 10 apples, gives 4, left?', options: ['4','6','7','8'], correctIndex: 1 },
        { question: 'Average of 2,4,6,8?', options: ['5','6','4','7'], correctIndex: 0 },
        { question: 'What is 20 divided by 4?', options: ['4','5','6','8'], correctIndex: 1 },
        { question: 'If x+2=5 then x=?', options: ['2','3','4','1'], correctIndex: 1 }
      ]
    }
  ],

  "English Language": [
    { title: 'Grammar 1', questions: [
      { question: 'Choose correct: She ___ to school.', options: ['go','goes','gone','going'], correctIndex: 1 },
      { question: 'Antonym of "hot"?', options: ['cold','warm','cool','heat'], correctIndex: 0 },
      { question: 'Plural of "child"?', options: ['childs','children','childes','child'], correctIndex: 1 },
      { question: 'Pick adjective: "A ___ car"', options: ['red','run','quickly','drive'], correctIndex: 0 },
      { question: 'Verb in "They play football"?', options: ['They','play','football','None'], correctIndex: 1 }
    ]},
    { title: 'Comprehension', questions: [
      { question: 'Choose summary: reading passage main idea?', options: ['main point','typo','author name','date'], correctIndex: 0 },
      { question: 'What is inference?', options: ['conclusion','quote','title','author'], correctIndex: 0 },
      { question: 'Synonym of "happy"?', options: ['sad','glad','angry','tired'], correctIndex: 1 },
      { question: 'Opposite of "early"?', options: ['late','soon','quick','fast'], correctIndex: 0 },
      { question: 'Pronoun for "Mary"?', options: ['he','she','it','they'], correctIndex: 1 }
    ]},
    { title: 'Vocabulary', questions: [
      { question: 'Meaning of "brief"?', options: ['short','long','wide','deep'], correctIndex: 0 },
      { question: 'Meaning of "ancient"?', options: ['old','new','young','modern'], correctIndex: 0 },
      { question: 'Synonym of "begin"?', options: ['start','end','stop','finish'], correctIndex: 0 },
      { question: 'Opposite of "full"?', options: ['empty','open','close','shut'], correctIndex: 0 },
      { question: 'Word for not true?', options: ['false','real','accurate','right'], correctIndex: 0 }
    ]},
    { title: 'Writing', questions: [
      { question: 'Choose correct: "Its" vs "It\'s" for contraction?', options: ['It\'s','Its','Both','None'], correctIndex: 0 },
      { question: 'Pick correct punctuation to end a sentence', options: ['.','?','!','All'], correctIndex: 3 },
      { question: 'Plural form of "mouse"?', options: ['mouses','mice','mouse','meese'], correctIndex: 1 },
      { question: 'Choose correct: "Their" usage', options: ['possession','verb','adverb','conjunction'], correctIndex: 0 },
      { question: 'Synonym of "quick"?', options: ['fast','slow','late','weak'], correctIndex: 0 }
    ]},
    { title: 'Synonyms', questions: [
      { question: 'Synonym of "large"?', options: ['big','tiny','small','short'], correctIndex: 0 },
      { question: 'Synonym of "angry"?', options: ['furious','happy','calm','kind'], correctIndex: 0 },
      { question: 'Synonym of "fast"?', options: ['quick','slow','steady','lazy'], correctIndex: 0 },
      { question: 'Synonym of "smart"?', options: ['clever','dull','stupid','slow'], correctIndex: 0 },
      { question: 'Synonym of "brave"?', options: ['courageous','scared','shy','weak'], correctIndex: 0 }
    ]}
  ],

  "Biology": [
    { title: 'Cells', questions: [
      { question: 'Basic unit of life?', options: ['organ','cell','tissue','molecule'], correctIndex: 1 },
      { question: 'Plants make food by?', options: ['photosynthesis','respiration','transpiration','digestion'], correctIndex: 0 },
      { question: 'DNA carries?', options: ['genetic info','energy','oxygen','water'], correctIndex: 0 },
      { question: 'Where are mitochondria?', options: ['cytoplasm','nucleus','cell wall','membrane'], correctIndex: 0 },
      { question: 'Blood is a type of?', options: ['tissue','organ','cell','system'], correctIndex: 0 }
    ]},
    { title: 'Human Body', questions: [
      { question: 'Heart pumps?', options: ['blood','air','water','food'], correctIndex: 0 },
      { question: 'Lungs for?', options: ['breathing','digestion','movement','hearing'], correctIndex: 0 },
      { question: 'Teeth help in?', options: ['chewing','seeing','hearing','breathing'], correctIndex: 0 },
      { question: 'Largest organ?', options: ['skin','heart','liver','brain'], correctIndex: 0 },
      { question: 'Red blood cells carry?', options: ['oxygen','food','waste','hormones'], correctIndex: 0 }
    ]},
    { title: 'Ecology', questions: [
      { question: 'Producers are?', options: ['plants','animals','fungi','bacteria'], correctIndex: 0 },
      { question: 'Consumers eat?', options: ['producers','water','sun','soil'], correctIndex: 0 },
      { question: 'Habitat is?', options: ['home','food','mate','sleep'], correctIndex: 0 },
      { question: 'Food chain starts with?', options: ['sun','top predator','decomposer','herbivore'], correctIndex: 0 },
      { question: 'Decomposers break down?', options: ['dead matter','live animals','rocks','water'], correctIndex: 0 }
    ]},
    { title: 'Plant Biology', questions: [
      { question: 'Chlorophyll found in?', options: ['chloroplasts','nucleus','cell wall','vacuole'], correctIndex: 0 },
      { question: 'Roots mainly for?', options: ['absorption','photosynthesis','pollination','reproduction'], correctIndex: 0 },
      { question: 'Flower function?', options: ['reproduction','support','photosynthesis','storage'], correctIndex: 0 },
      { question: 'Seeds develop from?', options: ['ovule','root','stem','leaf'], correctIndex: 0 },
      { question: 'Transpiration mainly loses?', options: ['water','sugar','minerals','oxygen'], correctIndex: 0 }
    ]}
  ],

  "Chemistry": [
    { title: 'Atoms & Molecules', questions: [
      { question: 'Atom is?', options: ['smallest unit','large particle','mixture','compound'], correctIndex: 0 },
      { question: 'H2O is?', options: ['water','salt','acid','base'], correctIndex: 0 },
      { question: 'pH < 7 means?', options: ['acidic','alkaline','neutral','salt'], correctIndex: 0 },
      { question: 'NaCl common name?', options: ['salt','sugar','acid','water'], correctIndex: 0 },
      { question: 'Element with symbol O?', options: ['Oxygen','Gold','Iron','Sodium'], correctIndex: 0 }
    ]},
    { title: 'Reactions', questions: [
      { question: 'Combustion needs?', options: ['oxygen','water','salt','light'], correctIndex: 0 },
      { question: 'Rust is due to?', options: ['oxidation','reduction','mixing','heating'], correctIndex: 0 },
      { question: 'Endothermic absorbs?', options: ['energy','matter','light','sound'], correctIndex: 0 },
      { question: 'pH of neutral water?', options: ['7','1','14','0'], correctIndex: 0 },
      { question: 'Acid taste is?', options: ['sour','sweet','bitter','salty'], correctIndex: 0 }
    ]}
  ],

  "Physics": [
    { title: 'Mechanics', questions: [
      { question: 'Force unit?', options: ['Newton','Joule','Watt','Pascal'], correctIndex: 0 },
      { question: 'Speed = distance / ?', options: ['time','mass','force','energy'], correctIndex: 0 },
      { question: 'Gravity pulls objects?', options: ['down','up','sideways','none'], correctIndex: 0 },
      { question: 'Energy unit?', options: ['Joule','Newton','Meter','Second'], correctIndex: 0 },
      { question: 'Mass unit?', options: ['kg','m','s','N'], correctIndex: 0 }
    ]},
    { title: 'Waves', questions: [
      { question: 'Sound needs?', options: ['medium','vacuum','light','space'], correctIndex: 0 },
      { question: 'Light speed approx?', options: ['3x10^8 m/s','3x10^6 m/s','3x10^4 m/s','300 m/s'], correctIndex: 0 },
      { question: 'Frequency unit?', options: ['Hz','m','s','N'], correctIndex: 0 },
      { question: 'Amplitude relates to?', options: ['loudness/brightness','speed','mass','force'], correctIndex: 0 },
      { question: 'Reflection occurs when?', options: ['wave bounces','absorbed','transmitted','created'], correctIndex: 0 }
    ]}
    ,
    { title: 'Electricity', questions: [
      { question: 'Unit of electric current?', options: ['Ampere','Volt','Ohm','Watt'], correctIndex: 0 },
      { question: 'Ohm is unit of?', options: ['resistance','current','charge','power'], correctIndex: 0 },
      { question: 'Voltage measures?', options: ['potential difference','current','resistance','power'], correctIndex: 0 },
      { question: 'Series circuit has same?', options: ['current','voltage','resistance','power'], correctIndex: 0 },
      { question: 'Parallel circuit has same?', options: ['voltage','current','resistance','power'], correctIndex: 0 }
    ] }
  ],

  "Information & Communication Technology": [
    { title: 'Computing Basics', questions: [
      { question: 'CPU stands for?', options: ['Central Processing Unit','Computer Personal Unit','Central Program Unit','Control Processing Unit'], correctIndex: 0 },
      { question: 'RAM is volatile?', options: ['Yes','No','Sometimes','Never'], correctIndex: 0 },
      { question: 'HTML is for?', options: ['structure','styling','programming','database'], correctIndex: 0 },
      { question: 'A file extension for web pages?', options: ['.html','.exe','.mp3','.docx'], correctIndex: 0 },
      { question: 'Browser example?', options: ['Chrome','Word','Excel','PowerPoint'], correctIndex: 0 }
    ]}
    ,
    { title: 'Internet & Networking', questions: [
      { question: 'IP address identifies?', options: ['device on network','person','browser','file'], correctIndex: 0 },
      { question: 'HTTP is protocol for?', options: ['web pages','email','file transfer','printing'], correctIndex: 0 },
      { question: 'WiFi is a type of?', options: ['wireless network','cable','software','hardware'], correctIndex: 0 },
      { question: 'LAN stands for?', options: ['Local Area Network','Large Area Network','Long Area Network','Local Access Node'], correctIndex: 0 },
      { question: 'DNS translates domain to?', options: ['IP address','email','username','password'], correctIndex: 0 }
    ] },
    { title: 'Software & Tools', questions: [
      { question: 'Word processor used for?', options: ['documents','games','programming','emails'], correctIndex: 0 },
      { question: 'Spreadsheet common for?', options: ['numbers and tables','photos','music','video'], correctIndex: 0 },
      { question: 'IDE is for?', options: ['programming','design','publishing','testing'], correctIndex: 0 },
      { question: 'Antivirus protects against?', options: ['malware','heat','water','dust'], correctIndex: 0 },
      { question: 'Cloud storage example?', options: ['Google Drive','Calculator','Notepad','Paint'], correctIndex: 0 }
    ] }
  ]
};

function qs(selector){ return document.querySelector(selector); }

function getParam(name){
  const params = new URLSearchParams(location.search);
  return params.get(name);
}

function renderQuizList(subject){
  const list = qs('#quiz-list');
  list.innerHTML = '';
  const quizzes = QUIZ_DATA[subject] || [];
  if(quizzes.length === 0){
    list.innerHTML = '<p style="color:#64748b">No quizzes found for this subject.</p>';
    return;
  }
  quizzes.forEach((q, idx)=>{
    const btn = document.createElement('button');
    btn.className = 'btn';
    btn.style.display = 'block';
    btn.style.width = '100%';
    btn.style.marginBottom = '10px';
    btn.textContent = (idx+1) + '. ' + q.title;
    btn.addEventListener('click', ()=> renderQuiz(subject, idx));
    list.appendChild(btn);
  });
}

function renderQuiz(subject, quizIndex){
  const view = qs('#quiz-view');
  const quizzes = QUIZ_DATA[subject] || [];
  const quiz = quizzes[quizIndex];
  if(!quiz){ view.innerHTML = '<p>No quiz.</p>'; return; }
  const wrapper = document.createElement('div');
  const title = document.createElement('h3');
  title.textContent = quiz.title;
  wrapper.appendChild(title);

  const form = document.createElement('form');
  quiz.questions.forEach((qq, qi)=>{
    const qDiv = document.createElement('div');
    qDiv.style.marginBottom = '14px';
    const qP = document.createElement('p');
    qP.style.fontWeight = '600';
    qP.textContent = (qi+1) + '. ' + qq.question;
    qDiv.appendChild(qP);
    qq.options.forEach((opt, oi)=>{
      const optWrap = document.createElement('div');
      optWrap.style.margin = '6px 0';
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'q' + qi;
      input.id = 'q' + qi + '_o' + oi;
      input.value = oi;
      const lab = document.createElement('label');
      lab.htmlFor = input.id;
      lab.style.marginLeft = '8px';
      lab.textContent = opt;
      optWrap.appendChild(input);
      optWrap.appendChild(lab);
      qDiv.appendChild(optWrap);
    });
    form.appendChild(qDiv);
  });

  const submit = document.createElement('button');
  submit.type = 'button';
  submit.className = 'btn';
  submit.textContent = 'Submit Quiz';
  submit.addEventListener('click', function(){
    let score = 0;
    quiz.questions.forEach((qq, qi)=>{
      const sel = form.querySelector('input[name="q'+qi+'"]:checked');
      if(sel && parseInt(sel.value,10) === qq.correctIndex) score++;
    });
    const result = document.createElement('p');
    result.style.marginTop = '12px';
    result.style.fontWeight = '700';
    result.textContent = `You scored ${score} / ${quiz.questions.length}`;
    // remove previous result if any
    const prev = view.querySelector('.quiz-result');
    if(prev) prev.remove();
    result.className = 'quiz-result';
    view.appendChild(result);
  });

  wrapper.appendChild(form);
  wrapper.appendChild(submit);
  view.innerHTML = '';
  view.appendChild(wrapper);
}

// initialize when on quiz.html
document.addEventListener('DOMContentLoaded', function(){
  const subjectParam = getParam('subject') || 'Mathematics';
  const titleEl = qs('#quiz-subject-title');
  if(titleEl) titleEl.textContent = subjectParam + ' Quizzes';
  renderQuizList(subjectParam);
  // auto-render first quiz
  const quizzes = QUIZ_DATA[subjectParam] || [];
  if(quizzes.length) renderQuiz(subjectParam, 0);
});
