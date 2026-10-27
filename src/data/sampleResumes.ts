export interface SampleResume {
  id: string;
  name: string;
  roleTarget: string;
  description: string;
  content: string;
}

export const SAMPLE_RESUMES: SampleResume[] = [
  {
    id: 'cs-grad-web',
    name: 'Srilekha - CS Graduate',
    roleTarget: 'Web Developer',
    description: 'Computer Science graduate with React, JavaScript, HTML/CSS, Git, and REST API foundation.',
    content: `SRILEKHA
Email: srilekhanalini@gmail.com | Phone: (555) 019-2834 | GitHub: github.com/srilekha-dev
Location: San Francisco, CA

SUMMARY
Enthusiastic Computer Science graduate passionate about building responsive, accessible web applications. Proficient in JavaScript, HTML5, CSS3, React, and Git. Seeking a Web Developer role to contribute clean code and modern component-driven architectures.

EDUCATION
Bachelor of Science in Computer Science
State University | Graduated May 2026 | GPA: 3.8/4.0
Relevant Coursework: Data Structures & Algorithms, Web Applications, Database Systems, Object-Oriented Programming (OOP), Software Engineering.

TECHNICAL SKILLS
• Programming Languages: JavaScript (ES6+), HTML5, CSS3, SQL, Python
• Frameworks & Libraries: React, Tailwind CSS, Express.js, Node.js
• Tools & Platforms: Git, GitHub, VS Code, Postman, Linux
• Core Competencies: RESTful APIs, Responsive Design, Unit Testing, Agile & Scrum

PROJECTS
Interactive Study Tracker | React, Tailwind CSS, LocalStorage
- Developed a full-featured single-page application with responsive layouts, timer mechanics, and localStorage data persistence.
- Implemented keyboard accessibility landmarks and WCAG 2.1 compliance.
- Version-controlled on GitHub with continuous integration pipelines.

Student Course Catalog API | Node.js, Express.js, PostgreSQL, SQL
- Engineered a RESTful API supporting CRUD operations for course registration.
- Structured SQL relational schemas with normalized foreign keys and indexing.
- Authored automated unit test suites achieving 88% code coverage.`,
  },
  {
    id: 'java-backend-engineer',
    name: 'Jordan Chen - Backend Junior',
    roleTarget: 'Java Developer',
    description: 'Junior developer with strong Java Core, Spring Boot, SQL, and Object-Oriented Programming.',
    content: `JORDAN CHEN
Email: jordan.chen@example.com | LinkedIn: linkedin.com/in/jordanchen-java
Location: Chicago, IL

PROFESSIONAL SUMMARY
Backend Software Developer with practical experience building enterprise services in Java, Spring Boot, and PostgreSQL. Solid grasp of Object-Oriented Programming (OOP) principles, relational schema design, RESTful APIs, and Git version control.

TECHNICAL PROFICIENCIES
• Core Languages: Java (11/17/21), SQL, Python
• Frameworks: Spring Boot, Spring MVC, Spring Data JPA, Hibernate
• Databases: PostgreSQL, MySQL, Redis
• Tools & Methodologies: Git, GitHub, Docker, Linux, Agile, JUnit, Unit Testing, REST APIs

EXPERIENCE
Junior Software Developer Intern | Apex Cloud Solutions | June 2025 - August 2025
- Developed and maintained microservices using Java and Spring Boot.
- Designed database migrations in PostgreSQL and optimized complex SQL queries with indexing.
- Collaborated in a 2-week Agile sprint cadence utilizing Git and JIRA.
- Integrated JUnit test cases ensuring high test reliability for payment webhook callbacks.

FEATURED PROJECTS
Enterprise Asset Tracker | Java, Spring Boot, PostgreSQL, Docker
- Built scalable REST endpoints handling 20,000+ asset inventory records.
- Utilized Hibernate JPA for object-relational mapping and connection pooling.
- Containerized application services using Docker for consistent local development.`,
  },
  {
    id: 'data-analyst-candidate',
    name: 'Sarah Patel - Data Specialist',
    roleTarget: 'Data Analyst',
    description: 'Data analytics enthusiast with strong Python, Pandas, NumPy, SQL, and statistical analysis.',
    content: `SARAH PATEL
Email: sarah.patel@example.com | Portfolio: sarahpatel-analytics.io
Location: Austin, TX

OBJECTIVE
Analytical and detail-oriented professional aiming to leverage Python, Pandas, NumPy, and SQL to extract actionable business intelligence, clean complex datasets, and create executive-ready reports as a Data Analyst.

CORE COMPETENCIES & SKILLS
• Analytics & Code: Python, SQL, Pandas, NumPy, Excel, Data Structures & Algorithms
• Databases: PostgreSQL, MySQL
• Tools: Git, GitHub, Jupyter Notebooks, Tableau, Linux
• Methodologies: Exploratory Data Analysis (EDA), Statistical Modeling, Agile

SELECTED ANALYTICS PROJECTS
E-Commerce Churn Prediction & Retention Analysis | Python, Pandas, NumPy, SQL
- Extracted and sanitized 50,000+ transactional records from PostgreSQL database.
- Executed exploratory data analysis identifying 3 key customer churn factors.
- Automated weekly data aggregation pipelines reducing manual spreadsheet prep by 8 hours.

Global Tech Salary Benchmark Dashboard | SQL, Pandas, Jupyter
- Wrote advanced SQL window functions (RANK, PARTITION BY) to analyze regional compensation variations.
- Documented findings with clear data visualization charts and statistical distribution metrics.`,
  },
];
