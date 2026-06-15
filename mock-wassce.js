window.MOCK_WASSCE = {
  'Mathematics': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 5 questions from Section B. All working must be shown clearly.',
    sectionA: Array.from({length: 40}, (_, i) => ({
      q: `Mathematics Objective Question ${i + 1}: Solve the equation... (Sample WASSCE Math Question)`,
      o: ["Option A", "Option B", "Option C", "Option D"],
      a: i % 4
    })).map((q, i) => {
      // Provide a few real examples, then fallback to patterns
      const real = [
        {q: "Solve for x: 3^(x+1) = 81", o: ["2", "3", "4", "5"], a: 1},
        {q: "Find the derivative of 3x^2 - 5x + 2.", o: ["6x - 5", "3x - 5", "6x + 5", "x - 5"], a: 0},
        {q: "Evaluate the limit as x approaches 2 of (x^2 - 4)/(x - 2).", o: ["0", "2", "4", "Undefined"], a: 2},
        {q: "Find the 5th term of an A.P. whose first term is 2 and common difference is 3.", o: ["11", "14", "17", "20"], a: 1},
        {q: "If sin θ = 3/5 and θ is acute, find cos θ.", o: ["4/5", "5/3", "3/4", "5/4"], a: 0}
      ];
      return i < real.length ? real[i] : {q: `Solve for x in the quadratic equation x² - ${i%5 + 2}x + ${i%3 + 1} = 0.`, o: [`${i%2}`, `${i%3 + 1}`, `${i%4 + 2}`, `${i%5 + 3}`], a: i%4};
    }),
    sectionB: [
      "1. (a) In a class of 50 students, 30 study Biology, 25 study Chemistry and 10 study neither. Find how many study both. (b) Rationalize the denominator: 3 / (2 - √3).",
      "2. (a) Find the roots of the equation 2x² - 5x - 3 = 0. (b) The sum of the first 4 terms of a G.P. is 15 and the common ratio is 2. Find the first term.",
      "3. A ladder 10m long leans against a vertical wall. If the foot of the ladder is 6m away from the wall, calculate: (a) the height the ladder reaches on the wall; (b) the angle the ladder makes with the ground.",
      "4. (a) Differentiate y = (3x² + 2)(x - 1) with respect to x. (b) Evaluate the definite integral of (2x + 1) dx from x=0 to x=2.",
      "5. The probabilities that three students pass an exam are 1/2, 2/3 and 3/4. Calculate the probability that: (a) all three pass, (b) exactly two pass, (c) at least one passes."
    ]
  },
  'English Language': {
    time: '2 Hours 30 Minutes',
    instructions: 'Section A: Lexis and Structure (Objective). Section B: Continuous Writing. Section C: Comprehension.',
    sectionA: Array.from({length: 40}, (_, i) => ({
      q: `Identify the correct word or phrase to fill the gap in Question ${i+1}.`,
      o: ["is", "are", "was", "were"],
      a: i % 4
    })).map((q, i) => {
      const real = [
        {q: "By this time next year, I ____ my university degree.", o: ["will complete", "will have completed", "would complete", "have completed"], a: 1},
        {q: "The principal, together with the teachers, ____ present at the meeting.", o: ["was", "were", "are", "have been"], a: 0},
        {q: "He is the boy ____ I told you about.", o: ["who", "whom", "whose", "which"], a: 1},
        {q: "Hardly had we arrived ____ it started raining.", o: ["than", "when", "then", "before"], a: 1},
        {q: "Choose the word opposite in meaning to 'Fictitious'.", o: ["Real", "False", "Imaginative", "Fake"], a: 0}
      ];
      return i < real.length ? real[i] : {q: `Choose the word nearest in meaning to the underlined word in Sentence ${i+1}.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. Write an article for publication in a national newspaper on the menace of cultism in schools and suggest ways of eradicating it.",
      "2. Write a letter to the Minister of Education highlighting the poor state of facilities in your school and appealing for assistance.",
      "3. Write a story that ends with the statement: 'Had I known, I would have listened to my mother's advice.'",
      "4. Write an essay arguing for or against the motion: 'Technology has done more harm than good to the youths of today.'",
      "5. Comprehension: Read the passage and answer: (a) What is the main theme? (b) State two figures of speech used. (c) Provide synonyms for 'drastic', 'prevalent', and 'obscure'."
    ]
  },
  'Biology': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 3 questions from Section B.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "The organelle responsible for cellular respiration is the:", o: ["Nucleus", "Ribosome", "Mitochondrion", "Golgi body"], a: 2},
        {q: "Which of the following blood vessels carries deoxygenated blood?", o: ["Aorta", "Pulmonary vein", "Pulmonary artery", "Renal artery"], a: 2},
        {q: "The end product of protein digestion is:", o: ["Glucose", "Fatty acids", "Amino acids", "Glycerol"], a: 2},
        {q: "The process by which a plant loses water in the form of vapor is called:", o: ["Guttation", "Transpiration", "Evaporation", "Osmosis"], a: 1},
        {q: "Which of the following is not a structural adaptation for flight in birds?", o: ["Hollow bones", "Feathers", "Keel-shaped sternum", "Heavy jaws with teeth"], a: 3}
      ];
      return i < real.length ? real[i] : {q: `Biological objective question ${i+1} on genetics, ecology, or physiology.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Draw a well-labeled diagram (10cm - 12cm long) of a typical animal cell. (b) State the function of three organelles you have labeled.",
      "2. (a) Explain the mechanism of inhalation and exhalation in humans. (b) State three differences between aerobic and anaerobic respiration.",
      "3. (a) Define Osmosis and Diffusion. (b) Describe an experiment to demonstrate osmosis using a living tissue.",
      "4. (a) What is a food chain? Give an example of a four-link food chain. (b) Explain the carbon cycle.",
      "5. (a) State Mendel's First Law of Inheritance. (b) In a cross between a homozygous tall plant (TT) and a homozygous dwarf plant (tt), illustrate the F1 and F2 generations using a Punnett square."
    ]
  },
  'Chemistry': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 4 questions from Section B.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "The oxidation state of Manganese in KMnO4 is:", o: ["+3", "+5", "+7", "+2"], a: 2},
        {q: "Which of the following is an allotrope of carbon?", o: ["Sulphur", "Diamond", "Ozone", "Phosphorus"], a: 1},
        {q: "The gas evolved when a dilute acid reacts with a metal is:", o: ["Oxygen", "Hydrogen", "Carbon dioxide", "Nitrogen"], a: 1},
        {q: "Isotopes are atoms of the same element having the same atomic number but different:", o: ["Number of protons", "Number of electrons", "Mass numbers", "Chemical properties"], a: 2},
        {q: "Which of the following metals is extracted by electrolysis?", o: ["Iron", "Copper", "Aluminum", "Zinc"], a: 2}
      ];
      return i < real.length ? real[i] : {q: `Chemistry objective question ${i+1} on organic, physical, or inorganic chemistry.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Define first ionization energy. (b) Explain the trend of ionization energy across a period and down a group. (c) Write the electron configuration for Calcium (Atomic number 20).",
      "2. (a) State Le Chatelier's Principle. (b) In the Haber process for ammonia synthesis, explain the effect of increasing temperature and pressure on the yield of ammonia.",
      "3. (a) What is hard water? (b) Differentiate between temporary and permanent hardness of water, stating how each can be removed. (c) Give two disadvantages of hard water.",
      "4. (a) Define an acid according to the Bronsted-Lowry theory. (b) Calculate the pH of a 0.01M solution of HCl. (c) Describe the preparation of a standard solution.",
      "5. (a) Name the functional group in alkanols. (b) Describe the laboratory preparation of ethene from ethanol. (c) State one chemical test to distinguish between an alkane and an alkene."
    ]
  },
  'Physics': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 5 questions from Section B. Take g = 10m/s².',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "The dimension of force is:", o: ["MLT^-1", "MLT^-2", "ML^2T^-2", "ML^-1T^-2"], a: 1},
        {q: "A body of mass 2kg is moving with a velocity of 5m/s. Calculate its kinetic energy.", o: ["10J", "25J", "50J", "100J"], a: 1},
        {q: "The principle of operation of a transformer is based on:", o: ["Thermionic emission", "Photoelectric effect", "Electromagnetic induction", "Thermal conduction"], a: 2},
        {q: "Which of the following is a vector quantity?", o: ["Speed", "Distance", "Mass", "Velocity"], a: 3},
        {q: "Light travels fastest in which medium?", o: ["Water", "Glass", "Diamond", "Vacuum"], a: 3}
      ];
      return i < real.length ? real[i] : {q: `Physics objective question ${i+1} covering mechanics, waves, electricity or modern physics.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Define (i) velocity (ii) acceleration. (b) A car starts from rest and accelerates uniformly at 2m/s² for 10s. Calculate the distance covered.",
      "2. (a) State the laws of refraction of light. (b) Define total internal reflection and critical angle. (c) A glass prism has a refractive index of 1.5. Calculate its critical angle.",
      "3. (a) State Ohm's law. (b) Three resistors of 2Ω, 3Ω and 6Ω are connected in parallel. Calculate the equivalent resistance. (c) Explain what is meant by the electromotive force of a cell.",
      "4. (a) What is specific heat capacity? (b) A metal block of mass 0.5kg at 100°C is placed in 0.2kg of water at 20°C. If the final temperature is 30°C, calculate the specific heat capacity of the metal. (Specific heat capacity of water = 4200 J/kg°C).",
      "5. (a) Define half-life of a radioactive substance. (b) A radioactive element has a half-life of 5 days. What fraction of the original sample will remain after 15 days? (c) State two peaceful uses of radioactivity."
    ]
  },
  'Information & Communication Technology': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 4 questions from Section B.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "Which of the following translates high-level language into machine code line by line?", o: ["Compiler", "Assembler", "Interpreter", "Linker"], a: 2},
        {q: "In a database, a collection of related fields is called a:", o: ["File", "Record", "Table", "Query"], a: 1},
        {q: "Which network topology connects all nodes to a central central hub/switch?", o: ["Ring", "Bus", "Star", "Mesh"], a: 2},
        {q: "A protocol used for secure web browsing is:", o: ["HTTP", "FTP", "HTTPS", "SMTP"], a: 2},
        {q: "Convert the binary number 1011 to denary (decimal).", o: ["9", "10", "11", "12"], a: 2}
      ];
      return i < real.length ? real[i] : {q: `ICT objective question ${i+1} on networking, hardware, software or programming.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Differentiate between system software and application software. (b) Give two examples of operating systems. (c) State three functions of an operating system.",
      "2. (a) What is a computer network? (b) Explain LAN and WAN. (c) List three advantages and two disadvantages of networking computers.",
      "3. (a) Define a database management system (DBMS). (b) Explain the terms: Primary Key, Foreign Key. (c) Differentiate between a spreadsheet and a database.",
      "4. (a) What is an algorithm? (b) Draw a flowchart to calculate the area of a rectangle. (c) Write a simple pseudocode for the same problem.",
      "5. (a) Define Cybercrime. (b) Explain the terms: Phishing, Hacking, Malware. (c) State three ways to protect a computer system from viruses."
    ]
  },
  'Economics': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 4 questions from Section B.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "Which concept explains why people must make choices?", o: ["Utility", "Scarcity", "Demand", "Supply"], a: 1},
        {q: "If the demand curve shifts to the right, it indicates:", o: ["A decrease in demand", "An increase in demand", "A decrease in supply", "An increase in supply"], a: 1},
        {q: "The reward for entrepreneurship as a factor of production is:", o: ["Rent", "Wages", "Interest", "Profit"], a: 3},
        {q: "Inflation refers to:", o: ["A fall in prices", "A sustained increase in the general price level", "High unemployment", "Low currency value"], a: 1},
        {q: "A perfectly competitive market is characterized by:", o: ["A single seller", "Many buyers and sellers", "Differentiated products", "Barriers to entry"], a: 1}
      ];
      return i < real.length ? real[i] : {q: `Economics objective question ${i+1} covering micro/macro economics concepts.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Define Opportunity Cost. (b) With the aid of a diagram, explain the Production Possibility Curve (PPC). (c) State two factors that can cause the PPC to shift outward.",
      "2. (a) State the Law of Demand. (b) Differentiate between a change in demand and a change in quantity demanded. (c) Outline three factors that determine the price elasticity of demand.",
      "3. (a) Define Inflation. (b) Explain demand-pull and cost-push inflation. (c) Discuss three measures a government can take to control inflation.",
      "4. (a) What is a commercial bank? (b) Explain four functions of a central bank. (c) State two instruments of monetary policy.",
      "5. (a) Define Economic Growth and Economic Development. (b) Discuss three characteristics of a developing economy. (c) Explain the role of agriculture in the economic development of West Africa."
    ]
  },
  'Commerce': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. Answer 5 questions from Section B.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "Commerce is defined as the study of:", o: ["Production of goods", "Extraction of raw materials", "Trade and aids to trade", "Manufacturing of products"], a: 2},
        {q: "Which of the following is not an aid to trade?", o: ["Transport", "Banking", "Farming", "Insurance"], a: 2},
        {q: "A document sent by a seller to a buyer showing the amount owed is an:", o: ["Invoice", "Receipt", "Order", "Quotation"], a: 0},
        {q: "The principle of insurance that states the insured must have a financial stake in the property is:", o: ["Utmost good faith", "Insurable interest", "Indemnity", "Contribution"], a: 1},
        {q: "The central bank serves as the:", o: ["Banker to the public", "Lender of last resort", "Commercial lender", "Retail bank"], a: 1}
      ];
      return i < real.length ? real[i] : {q: `Commerce objective question ${i+1} covering trade, business, finance, etc.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. (a) Define Commerce. (b) Draw a diagram showing the branches of production. (c) Explain the importance of Transport and Insurance in commerce.",
      "2. (a) What is a Sole Proprietorship? (b) State three advantages and three disadvantages of a sole proprietorship. (c) Differentiate between a private and a public limited liability company.",
      "3. (a) Explain the term 'Retailer'. (b) Discuss four functions a retailer performs for the consumer and the wholesaler. (c) State three reasons why small-scale retailers survive alongside large supermarkets.",
      "4. (a) Define International Trade. (b) State three advantages and three disadvantages of international trade. (c) Explain the terms: Balance of Trade and Balance of Payments.",
      "5. (a) What is an Invoice? (b) Explain the use of the following business documents: (i) Quotation, (ii) Delivery Note, (iii) Credit Note, (iv) Receipt."
    ]
  },
  'Literature': {
    time: '2 Hours 30 Minutes',
    instructions: 'Answer all questions in Section A. In Section B, answer one question from African Poetry and one from Non-African Poetry. In Section C, answer one question on Shakespearean Drama.',
    sectionA: Array.from({length: 40}, (_, i) => {
      const real = [
        {q: "The central idea or message of a literary work is its:", o: ["Plot", "Setting", "Theme", "Tone"], a: 2},
        {q: "A poem of 14 lines is called a:", o: ["Ballad", "Sonnet", "Lyric", "Ode"], a: 1},
        {q: "When an author gives human characteristics to a non-human entity, it is called:", o: ["Simile", "Metaphor", "Personification", "Hyperbole"], a: 2},
        {q: "The time and place of a story is its:", o: ["Plot", "Setting", "Conflict", "Climax"], a: 1},
        {q: "A character that changes significantly throughout a story is a:", o: ["Flat character", "Static character", "Dynamic character", "Stock character"], a: 2}
      ];
      return i < real.length ? real[i] : {q: `Literature objective question ${i+1} on literary devices, poetry, or drama terms.`, o: ["Option A", "Option B", "Option C", "Option D"], a: i%4};
    }),
    sectionB: [
      "1. African Prose: Discuss the theme of cultural conflict in Chinua Achebe's 'Things Fall Apart'.",
      "2. Non-African Prose: Analyze the character development of the protagonist in George Orwell's '1984'.",
      "3. African Poetry: Examine the use of imagery in J.P. Clark's 'Night Rain'.",
      "4. Non-African Poetry: Discuss the theme of death and immortality in John Donne's 'Death Be Not Proud'.",
      "5. Shakespearean Drama: Evaluate the role of the supernatural (witches and ghosts) in Shakespeare's 'Macbeth'."
    ]
  }
};
