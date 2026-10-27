import { SkillItem } from '../types';

export const SKILL_DICTIONARY: SkillItem[] = [
  // Programming Languages
  {
    id: 'java',
    name: 'Java',
    category: 'Programming Languages',
    aliases: ['java', 'core java', 'java 8', 'java 11', 'java 17', 'java 21', 'j2se'],
    description: 'Object-oriented, class-based general-purpose programming language commonly used for enterprise backends.',
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming Languages',
    aliases: ['python', 'python 3', 'python3', 'py'],
    description: 'High-level, interpreted programming language known for readability, data analysis, web dev, and AI.',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Programming Languages',
    aliases: ['javascript', 'js', 'es6', 'es2020', 'ecmascript'],
    description: 'Standard programming language for dynamic web development in browsers and Node.js environments.',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming Languages',
    aliases: ['typescript', 'ts'],
    description: 'Strongly typed superset of JavaScript that compiles to plain JavaScript.',
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Programming Languages',
    aliases: ['html', 'html5', 'semantic html'],
    description: 'Standard markup language for documents designed to be displayed in a web browser.',
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Programming Languages',
    aliases: ['css', 'css3', 'modern css', 'flexbox', 'css grid'],
    description: 'Style sheet language used for describing presentation of a document written in markup.',
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Programming Languages',
    aliases: ['sql', 'structured query language', 'ansi sql', 't-sql', 'pl/sql'],
    description: 'Domain-specific language used in programming and designed for managing data in relational databases.',
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'Programming Languages',
    aliases: ['c++', 'cpp'],
    description: 'General-purpose programming language with low-level memory manipulation features.',
  },

  // Frameworks & Libraries
  {
    id: 'react',
    name: 'React',
    category: 'Frameworks & Libraries',
    aliases: ['react', 'react.js', 'reactjs', 'react 18', 'react 19'],
    description: 'Popular JavaScript library for building component-based user interfaces.',
  },
  {
    id: 'spring-boot',
    name: 'Spring Boot',
    category: 'Frameworks & Libraries',
    aliases: ['spring boot', 'spring', 'spring framework', 'springboot', 'spring mvc'],
    description: 'Enterprise Java framework used to create stand-alone, production-grade Spring-based applications.',
  },
  {
    id: 'django',
    name: 'Django',
    category: 'Frameworks & Libraries',
    aliases: ['django', 'django rest framework', 'drf'],
    description: 'High-level Python web framework that encourages rapid development and clean pragmatic design.',
  },
  {
    id: 'flask',
    name: 'Flask',
    category: 'Frameworks & Libraries',
    aliases: ['flask', 'flask-restful'],
    description: 'Micro web framework written in Python designed to make getting started quick and easy.',
  },
  {
    id: 'fastapi',
    name: 'FastAPI',
    category: 'Frameworks & Libraries',
    aliases: ['fastapi', 'fast api'],
    description: 'Modern, fast web framework for building APIs with Python 3.8+ based on standard type hints.',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Frameworks & Libraries',
    aliases: ['node', 'node.js', 'nodejs'],
    description: 'Asynchronous event-driven JavaScript runtime built on Chrome V8 engine.',
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'Frameworks & Libraries',
    aliases: ['express', 'express.js', 'expressjs'],
    description: 'Fast, unopinionated, minimalist web framework for Node.js.',
  },
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Frameworks & Libraries',
    aliases: ['pandas', 'pd'],
    description: 'Python library providing fast, flexible data structures for data analysis and manipulation.',
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Frameworks & Libraries',
    aliases: ['numpy', 'np'],
    description: 'Fundamental package for scientific computing with Python, offering powerful N-dimensional arrays.',
  },
  {
    id: 'scikit-learn',
    name: 'Scikit-Learn',
    category: 'Frameworks & Libraries',
    aliases: ['scikit-learn', 'sklearn', 'scikit learn'],
    description: 'Simple and efficient tools for predictive data analysis and machine learning in Python.',
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'Frameworks & Libraries',
    aliases: ['pytorch', 'torch'],
    description: 'Optimized tensor library for deep learning using GPUs and CPUs.',
  },
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'Frameworks & Libraries',
    aliases: ['tensorflow', 'tf', 'keras'],
    description: 'End-to-end open source platform for machine learning and artificial intelligence.',
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS',
    category: 'Frameworks & Libraries',
    aliases: ['tailwind', 'tailwindcss', 'tailwind css'],
    description: 'Utility-first CSS framework packed with classes that can be composed to build any design.',
  },

  // Databases & Storage
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Databases & Storage',
    aliases: ['postgresql', 'postgres', 'psql'],
    description: 'Powerful, open-source object-relational database system with over 35 years of active development.',
  },
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases & Storage',
    aliases: ['mysql'],
    description: 'World’s most popular open-source relational database management system.',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'Databases & Storage',
    aliases: ['mongodb', 'mongo', 'nosql'],
    description: 'Document-oriented database designed for ease of development and scaling.',
  },
  {
    id: 'redis',
    name: 'Redis',
    category: 'Databases & Storage',
    aliases: ['redis', 'redis cache', 'in-memory db'],
    description: 'In-memory data structure store used as a database, cache, and message broker.',
  },

  // Developer Tools & Cloud
  {
    id: 'git',
    name: 'Git',
    category: 'Developer Tools & Cloud',
    aliases: ['git', 'version control', 'github', 'gitlab'],
    description: 'Distributed version control system for tracking changes in source code during software development.',
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Developer Tools & Cloud',
    aliases: ['docker', 'containerization', 'containers'],
    description: 'Set of platform-as-a-service products that use OS-level virtualization to deliver software in packages.',
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Developer Tools & Cloud',
    aliases: ['aws', 'amazon web services', 'ec2', 's3', 'lambda'],
    description: 'Comprehensive cloud computing platform provided by Amazon.',
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'Developer Tools & Cloud',
    aliases: ['linux', 'bash', 'shell scripting', 'unix'],
    description: 'Family of open-source Unix-like operating systems based on the Linux kernel.',
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'Developer Tools & Cloud',
    aliases: ['ci/cd', 'ci cd', 'continuous integration', 'github actions', 'jenkins'],
    description: 'Method to frequently deliver apps by introducing automation into development stages.',
  },

  // Core Concepts & Methods
  {
    id: 'oop',
    name: 'Object-Oriented Programming (OOP)',
    category: 'Core Concepts & Methods',
    aliases: ['oop', 'object-oriented', 'polymorphism', 'inheritance', 'encapsulation'],
    description: 'Programming paradigm based on the concept of objects containing data and code.',
  },
  {
    id: 'rest-apis',
    name: 'RESTful APIs',
    category: 'Core Concepts & Methods',
    aliases: ['rest api', 'rest apis', 'restful', 'json api', 'endpoints'],
    description: 'Architectural style for an application program interface using HTTP requests to access data.',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    category: 'Core Concepts & Methods',
    aliases: ['dsa', 'data structures', 'algorithms', 'time complexity', 'big o'],
    description: 'Techniques for organizing, processing, retrieving, and manipulating computational data efficiently.',
  },
  {
    id: 'agile',
    name: 'Agile & Scrum',
    category: 'Core Concepts & Methods',
    aliases: ['agile', 'scrum', 'kanban', 'sprints'],
    description: 'Iterative project management and software development approach focusing on continuous delivery.',
  },
  {
    id: 'unit-testing',
    name: 'Unit Testing',
    category: 'Core Concepts & Methods',
    aliases: ['unit testing', 'junit', 'pytest', 'jest', 'tdd', 'test driven'],
    description: 'Software testing method where individual units or components of code are tested in isolation.',
  },
  {
    id: 'system-design',
    name: 'System Design',
    category: 'Core Concepts & Methods',
    aliases: ['system design', 'scalability', 'microservices', 'load balancing'],
    description: 'Process of defining architecture, components, modules, interfaces, and data for a system to satisfy requirements.',
  },
];

export const CAREER_REQUIREMENTS: Record<
  string,
  {
    title: string;
    description: string;
    essentialSkills: string[];
    recommendedSkills: string[];
    bonusSkills: string[];
  }
> = {
  'Java Developer': {
    title: 'Java Developer',
    description: 'Build enterprise-grade server-side applications, robust backend architectures, and high-performance microservices.',
    essentialSkills: ['Java', 'Spring Boot', 'SQL', 'Git', 'Object-Oriented Programming (OOP)', 'RESTful APIs'],
    recommendedSkills: ['PostgreSQL', 'Unit Testing', 'Data Structures & Algorithms', 'Docker', 'Linux'],
    bonusSkills: ['AWS', 'CI/CD', 'Redis', 'System Design'],
  },
  'Python Developer': {
    title: 'Python Developer',
    description: 'Develop scalable web applications, automation scripts, asynchronous backend services, and clean APIs.',
    essentialSkills: ['Python', 'Django', 'SQL', 'Git', 'RESTful APIs', 'Object-Oriented Programming (OOP)'],
    recommendedSkills: ['FastAPI', 'Flask', 'PostgreSQL', 'Unit Testing', 'Data Structures & Algorithms'],
    bonusSkills: ['Docker', 'AWS', 'Redis', 'Linux'],
  },
  'Web Developer': {
    title: 'Web Developer',
    description: 'Design and engineer interactive, high-performance web applications using modern standards and responsive UI patterns.',
    essentialSkills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Git', 'RESTful APIs'],
    recommendedSkills: ['TypeScript', 'Tailwind CSS', 'Node.js', 'Express.js', 'SQL'],
    bonusSkills: ['Docker', 'PostgreSQL', 'CI/CD', 'Unit Testing'],
  },
  'Data Analyst': {
    title: 'Data Analyst',
    description: 'Transform raw datasets into actionable business intelligence, statistical dashboards, and predictive insights.',
    essentialSkills: ['SQL', 'Python', 'Pandas', 'NumPy', 'Git'],
    recommendedSkills: ['PostgreSQL', 'Data Structures & Algorithms', 'Agile & Scrum'],
    bonusSkills: ['Scikit-Learn', 'AWS', 'Docker'],
  },
  'AI Engineer': {
    title: 'AI Engineer',
    description: 'Construct modern machine learning models, neural networks, vector retrieval pipelines, and AI-enabled workflows.',
    essentialSkills: ['Python', 'NumPy', 'Pandas', 'Scikit-Learn', 'Git', 'Data Structures & Algorithms'],
    recommendedSkills: ['PyTorch', 'TensorFlow', 'RESTful APIs', 'SQL', 'Linux'],
    bonusSkills: ['Docker', 'AWS', 'System Design'],
  },
};
