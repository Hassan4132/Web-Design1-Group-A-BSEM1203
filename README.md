# WASSCE Vault

## Project Description
**WASSCE Vault** is a comprehensive, web-based educational platform designed specifically to help students in Sierra Leone prepare effectively for their national examinations. The platform provides structured study notes, subject resources, interactive quizzes, progress tracking, and highly realistic past examination papers for the National Primary School Examination (NPSE), Basic Education Certificate Examination (BECE), and the West African Senior School Certificate Examination (WASSCE).

## Project Objectives
- To democratize access to high-quality educational materials for Sierra Leonean students.
- To provide a realistic testing environment that mimics the structure of actual national examinations.
- To help students identify their academic strengths and weaknesses through interactive quizzes and progress tracking.
- To centralize past papers and revision notes into one easily accessible, offline-capable vault.

## Features
- **Responsive Design:** Optimized for desktops, tablets, and mobile devices.
- **Dedicated Portals:** Separate hubs for NPSE, BECE, and WASSCE resources.
- **Subject Learning Pages:** Detailed overviews, progress bars, and topic checklists for each subject.
- **Interactive Quizzes:** Built-in assessments with immediate scoring feedback.
- **Realistic Past Papers:** Comprehensive, dynamic mock examinations complete with multiple-choice and structured theory sections.
- **Progress Tracking:** Visual indicators of study progress.
- **User Authentication:** Login and Registration systems for tracking individual learning paths.
- **Core Pages:** Homepage, About Page, Services Page, Subjects Page, Resources Page, and Contact Page.
- **Downloadable Resources:** Access to syllabi and offline study materials.

## Technologies Used
- **HTML5:** Semantic markup and structure.
- **CSS3:** Custom styling, responsive layouts, and modern UI design.
- **JavaScript (ES6):** Dynamic content rendering, quiz logic, interactive UI components, and mock examination generation.

## Folder Structure
```text
WEB_DESIGNPROJECT/
├── css/
│   └── style.css           # Main stylesheet
├── images/                 # Image assets and banners
├── js/
│   ├── script.js           # Core interactive logic and search
│   ├── quizzes.js          # Subject quiz logic
│   ├── past-papers.js      # Mock examination rendering engine
│   ├── mock-npse.js        # NPSE realistic examination data
│   ├── mock-bece.js        # BECE realistic examination data
│   └── mock-wassce.js      # WASSCE realistic examination data
├── pdfs/                   # Downloadable past paper PDFs
├── index.html              # Homepage
├── about.html              # About Page
├── services.html           # Services Page
├── subjects.html           # Subjects Page
├── resources.html          # Resources Page
├── past-papers.html        # Mock Examinations Hub
├── npse.html               # NPSE Portal
├── bece.html               # BECE Portal
├── wassce.html             # WASSCE Portal
├── login.html              # Login System
├── register.html           # Registration System
├── contact.html            # Contact Page
└── README.md               # Project Documentation
```

## Installation Instructions
1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/wassce-vault.git
   ```
2. Navigate to the project directory:
   ```bash
   cd wassce-vault
   ```
3. No build tools or package managers (like npm) are required. The project consists of purely static HTML, CSS, and vanilla JavaScript.

## How to Run the Project
1. Open the project folder.
2. Double-click on `index.html` to open it in your default web browser.
3. For the best experience, especially if utilizing local storage features or JavaScript modules, run the project using a local development server:
   - **Using VS Code:** Install the "Live Server" extension, right-click `index.html`, and select "Open with Live Server".
   - **Using Python:** Run `python -m http.server` in the project directory and navigate to `http://localhost:8000` in your browser.

## Screenshots
*(Insert screenshots of your Homepage, Subject Pages, and Past Papers generation here)*
- `![Homepage](link-to-image)`
- `![Subject Dashboard](link-to-image)`
- `![Realistic Mock Examination](link-to-image)`

## Future Improvements
- **Backend Integration:** Connect the registration and login forms to a secure database (e.g., Firebase or Node.js/MongoDB) to permanently save user progress.
- **Expanded Examination Banks:** Add more years of past papers and increase the pool of randomized objective questions.
- **Discussion Forums:** Create a space for students to ask questions and discuss complex topics with peers and teachers.
- **PWA Support:** Convert the platform into a Progressive Web App for full offline functionality.

## Author Information
**Hassan Kamara**  
*Aspiring Web Developer & Educational Technologist*  
*(Add your contact information or portfolio link here)*

## University Assignment Information
This project was developed as part of a University Web Design assignment, showcasing the application of fundamental web technologies (HTML, CSS, JS) to solve real-world educational challenges in Sierra Leone.

## SDG Alignment
**SDG 4 – Quality Education:**  
WASSCE Vault aligns directly with the United Nations Sustainable Development Goal 4 by ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all students across Sierra Leone, regardless of their geographical location or economic background.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
