import { LearningTopic } from '../types';

export const CAREER_ROADMAPS: LearningTopic[] = [
  // WEB DEVELOPER TRACK
  {
    id: 'web-html-foundations',
    title: 'HTML5 Semantic Structure & Accessibility',
    category: 'Core Web Standards',
    careerRole: 'Web Developer',
    durationMinutes: 45,
    level: 'Beginner',
    summary:
      'Master modern semantic HTML elements (<header>, <main>, <article>, <nav>, <aside>, <footer>) to structure web applications with optimal SEO and WCAG-compliant screen reader accessibility.',
    keyConcepts: [
      'Semantic tags vs generic divs/spans',
      'ARIA roles, aria-labels, and landmarks',
      'Form validation attributes (required, pattern, type="email")',
      'Responsive metadata and viewport tags',
    ],
    codeSnippet: {
      language: 'html',
      caption: 'Accessible form and semantic landmark structure',
      code: `<header role="banner" class="site-header">
  <nav aria-label="Main Navigation">
    <a href="/dashboard">Dashboard</a>
  </nav>
</header>
<main id="main-content">
  <article>
    <h2>Career Assessment</h2>
    <form aria-describedby="form-hint">
      <label for="career-role">Select Target Role</label>
      <select id="career-role" name="role" required>
        <option value="web-dev">Web Developer</option>
      </select>
    </form>
  </article>
</main>`,
    },
    resources: [
      {
        title: 'MDN Web Docs: HTML Elements Reference',
        url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element',
        type: 'Documentation',
      },
      {
        title: 'W3C Web Accessibility Guidelines (WCAG 2.2)',
        url: 'https://www.w3.org/WAI/standards-guidelines/wcag/',
        type: 'Documentation',
      },
      {
        title: 'FreeCodeCamp: Responsive Web Design Certification',
        url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/',
        type: 'Interactive Practice',
      },
    ],
    projectBrief: {
      title: 'Accessible Portfolio Layout',
      description: 'Build a multi-section semantic web page with full keyboard navigation and screen-reader accessibility landmarks.',
      deliverables: ['Proper semantic landmarks', 'A compliant accessible contact form', '100% Lighthouse accessibility score'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which HTML5 element should be used for the primary navigation links of a page?',
        options: ['<section>', '<nav>', '<aside>', '<menuitem>'],
        correctAnswerIndex: 1,
        explanation: 'The <nav> element represents a section of a page whose purpose is to provide navigation links.',
      },
      {
        id: 'q2',
        question: 'What is the primary benefit of using semantic tags instead of <div> tags?',
        options: [
          'It makes CSS run 5x faster',
          'It improves accessibility for screen readers and search engine indexation',
          'Browsers automatically compile them into WebAssembly',
          'It prevents JavaScript memory leaks',
        ],
        correctAnswerIndex: 1,
        explanation: 'Semantic elements give direct meaning to screen readers, assistive technology, and web scrapers/search engines.',
      },
      {
        id: 'q3',
        question: 'Which attribute connects a <label> element directly to its corresponding <input>?',
        options: ['name', 'for (or htmlFor in React)', 'target', 'connect'],
        correctAnswerIndex: 1,
        explanation: 'The `for` attribute in HTML (htmlFor in JSX) pairs the label with the input’s unique `id`.',
      },
    ],
  },
  {
    id: 'web-css-tailwind',
    title: 'CSS3 Layouts, Flexbox, Grid & Modern Styling',
    category: 'Styling & UI Systems',
    careerRole: 'Web Developer',
    durationMinutes: 60,
    level: 'Beginner',
    summary:
      'Understand the modern CSS box model, fluid flexbox mechanics, two-dimensional grid layouts, CSS custom properties, and utility-first styling with modern Tailwind CSS.',
    keyConcepts: [
      'Box-sizing: border-box and margin collapsing',
      'Flexbox axes, alignment, and auto margins',
      'CSS Grid template areas, repeat(), and minmax()',
      'Container queries and responsive media breakpoints',
    ],
    codeSnippet: {
      language: 'css',
      caption: 'Responsive 3-Column Auto-fit Grid with CSS & Tailwind equivalent',
      code: `/* Standard CSS Grid with auto-fit */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Equivalent Tailwind utility classes */
// <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">`,
    },
    resources: [
      {
        title: 'CSS-Tricks: A Complete Guide to Flexbox',
        url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
        type: 'Tutorial',
      },
      {
        title: 'Tailwind CSS Documentation',
        url: 'https://tailwindcss.com/docs',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Responsive Dashboard Card Grid',
      description: 'Build a mobile-first dashboard grid layout that reflows gracefully across mobile (375px), tablet (768px), and desktop (1440px).',
      deliverables: ['Fluid flexbox header', 'Multi-column grid cards', 'Zero horizontal scroll overflow'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which CSS property defines the primary axis direction in a flex container?',
        options: ['justify-content', 'flex-direction', 'align-items', 'flex-wrap'],
        correctAnswerIndex: 1,
        explanation: 'flex-direction sets how flex items are placed (row, column, row-reverse, column-reverse).',
      },
      {
        id: 'q2',
        question: 'What does `repeat(auto-fit, minmax(250px, 1fr))` accomplish in CSS Grid?',
        options: [
          'Fixes the grid to exactly 4 static columns',
          'Dynamically creates as many responsive columns of at least 250px as fit in the container',
          'Animates card elements smoothly on resize',
          'Centers all items with fixed margins',
        ],
        correctAnswerIndex: 1,
        explanation: 'Auto-fit creates responsive columns without media queries by filling available space.',
      },
    ],
  },
  {
    id: 'web-javascript-es6',
    title: 'Modern JavaScript (ES6+), Async/Await & DOM',
    category: 'Programming Languages',
    careerRole: 'Web Developer',
    durationMinutes: 75,
    level: 'Intermediate',
    summary:
      'Deep dive into modern ECMAScript features: arrow functions, destructuring, spread operators, closures, Promises, async/await, and event-driven architecture.',
    keyConcepts: [
      'Event loop, Call Stack, and Microtask Queue',
      'Immutable operations with map(), filter(), and reduce()',
      'Error handling with try/catch/finally in async functions',
      'Web Storage APIs: localStorage vs sessionStorage',
    ],
    codeSnippet: {
      language: 'javascript',
      caption: 'Async data fetch with defensive error handling and localStorage caching',
      code: `async function fetchLearningModules(careerRole) {
  const cacheKey = \`modules_\${careerRole}\`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);

  try {
    const res = await fetch(\`/api/curriculum?role=\${encodeURIComponent(careerRole)}\`);
    if (!res.ok) throw new Error(\`HTTP error! status: \${res.status}\`);
    const data = await res.json();
    localStorage.setItem(cacheKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.error('Failed to load curriculum:', err);
    return fallbackModules;
  }
}`,
    },
    resources: [
      {
        title: 'JavaScript.info: The Modern JavaScript Tutorial',
        url: 'https://javascript.info/',
        type: 'Tutorial',
      },
      {
        title: 'MDN Web Docs: Asynchronous JavaScript',
        url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Interactive Study Task Tracker',
      description: 'Implement an in-memory and localStorage-backed task management engine with async simulation and array filters.',
      deliverables: ['Add/Toggle/Remove task items', 'localStorage synchronization', 'Computed stats (completed vs pending)'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which method creates a new array populated with the results of calling a function on every element?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswerIndex: 1,
        explanation: 'Array.prototype.map() transforms elements and returns a brand-new array without mutating the original.',
      },
      {
        id: 'q2',
        question: 'What is returned by an `async` function in JavaScript?',
        options: ['A synchronous callback', 'A Promise', 'An Observable', 'A Generator'],
        correctAnswerIndex: 1,
        explanation: 'Async functions always return a Promise, resolving to the returned value or rejecting if an error is thrown.',
      },
    ],
  },
  {
    id: 'web-react-state',
    title: 'React 19 Architecture, Hooks & Component State',
    category: 'Frameworks & Libraries',
    careerRole: 'Web Developer',
    durationMinutes: 90,
    level: 'Intermediate',
    summary:
      'Build scalable single-page applications using functional components, useState, useEffect, useMemo, custom hooks, and unidirectional data flow.',
    keyConcepts: [
      'Declarative UI and virtual DOM reconciliation',
      'Lifting state up and context providers',
      'Dependency arrays and cleanup functions in useEffect',
      'Clean separation between dumb presentation and smart container hooks',
    ],
    codeSnippet: {
      language: 'typescript',
      caption: 'Custom React Hook for localStorage state synchronization',
      code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [key, value]);

  return [value, setValue] as const;
}`,
    },
    resources: [
      {
        title: 'React.dev: Official Documentation & Interactive Quick Start',
        url: 'https://react.dev/learn',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Interactive Career Readiness Dashboard',
      description: 'Create interactive modular React components with synchronized state, modals, and filters.',
      deliverables: ['Custom hook for persistence', 'Filtering components', 'Tabular statistics display'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'When does the cleanup function returned from `useEffect` execute?',
        options: [
          'Only when the browser window closes',
          'Before the component unmounts and before re-running the effect on dependency change',
          'Immediately upon initial component render',
          'Only after an explicit error is thrown',
        ],
        correctAnswerIndex: 1,
        explanation: 'React runs the effect cleanup before re-executing the effect with fresh state and when the component unmounts.',
      },
    ],
  },

  // JAVA DEVELOPER TRACK
  {
    id: 'java-core-oop',
    title: 'Java Core & Object-Oriented Principles',
    category: 'Programming Languages',
    careerRole: 'Java Developer',
    durationMinutes: 60,
    level: 'Beginner',
    summary:
      'Master the four pillars of Object-Oriented Programming (Encapsulation, Inheritance, Polymorphism, Abstraction) with Java 17+ strong typing, classes, and interfaces.',
    keyConcepts: [
      'JVM, JRE, and Bytecode execution pipeline',
      'Access modifiers: private, default, protected, public',
      'Abstract classes vs interfaces (default and static methods)',
      'Memory management: Stack vs Heap and Garbage Collection',
    ],
    codeSnippet: {
      language: 'java',
      caption: 'Interface implementation and polymorphic dispatch in Java',
      code: `public interface LearningResource {
    String getTitle();
    int getEstimatedMinutes();
    void markCompleted();
}

public class VideoTutorial implements LearningResource {
    private final String title;
    private final int minutes;
    private boolean completed = false;

    public VideoTutorial(String title, int minutes) {
        this.title = title;
        this.minutes = minutes;
    }

    @Override
    public String getTitle() { return this.title; }

    @Override
    public int getEstimatedMinutes() { return this.minutes; }

    @Override
    public void markCompleted() { this.completed = true; }
}`,
    },
    resources: [
      {
        title: 'Oracle Java Documentation: Trails Covering the Basics',
        url: 'https://docs.oracle.com/javase/tutorial/',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Student Grade & Attendance Management System',
      description: 'Write an object-oriented Java console application modeling student transcripts, courses, and honors GPA calculations.',
      deliverables: ['Clean OOP domain models', 'Interface segregation', 'Comprehensive test cases'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which Java keyword prevents a class from being subclassed (inherited)?',
        options: ['static', 'final', 'immutable', 'sealed'],
        correctAnswerIndex: 1,
        explanation: 'Declaring a class `final` prevents other classes from extending it in Java.',
      },
      {
        id: 'q2',
        question: 'Where are Java object instances allocated in memory?',
        options: ['Stack', 'Heap', 'CPU Cache L1', 'PermGen'],
        correctAnswerIndex: 1,
        explanation: 'In Java, all objects and array instances are allocated on the Heap; reference pointers reside on the Stack.',
      },
    ],
  },
  {
    id: 'java-spring-boot-apis',
    title: 'Spring Boot RESTful APIs & Data Persistence',
    category: 'Frameworks & Libraries',
    careerRole: 'Java Developer',
    durationMinutes: 90,
    level: 'Intermediate',
    summary:
      'Build enterprise RESTful backends using Spring Boot, Spring Data JPA/Hibernate, Dependency Injection, Bean validation, and PostgreSQL.',
    keyConcepts: [
      'Inversion of Control (IoC) and @Autowired / Constructor injection',
      'Spring MVC Annotations: @RestController, @GetMapping, @PostMapping',
      'ORM mapping with @Entity, @Table, and Spring Data JpaRepository',
      'Global exception handling with @ControllerAdvice',
    ],
    codeSnippet: {
      language: 'java',
      caption: 'Spring Boot REST Controller with DTO and service layer',
      code: `@RestController
@RequestMapping("/api/v1/students")
public class StudentController {
    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<ProgressReportDto> getStudentProgress(@PathVariable UUID id) {
        ProgressReportDto report = studentService.calculateReadiness(id);
        return ResponseEntity.ok(report);
    }
}`,
    },
    resources: [
      {
        title: 'Spring Guides: Building a RESTful Web Service',
        url: 'https://spring.io/guides/gs/rest-service/',
        type: 'Tutorial',
      },
    ],
    projectBrief: {
      title: 'Course Catalog & Enrollment REST API',
      description: 'Build a full CRUD microservice managing student profiles, course registrations, and prerequisites.',
      deliverables: ['DTO validation', 'PostgreSQL repository integration', 'OpenAPI / Swagger spec'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which Spring annotation is used on a class to mark it as a REST controller producing JSON responses?',
        options: ['@Component', '@Service', '@RestController', '@ControllerEndpoint'],
        correctAnswerIndex: 2,
        explanation: '@RestController combines @Controller and @ResponseBody, automatically serializing return values to JSON.',
      },
    ],
  },

  // PYTHON DEVELOPER TRACK
  {
    id: 'python-core-data',
    title: 'Python Core, Data Structures & Idiomatic Coding',
    category: 'Programming Languages',
    careerRole: 'Python Developer',
    durationMinutes: 60,
    level: 'Beginner',
    summary:
      'Master Pythonic programming conventions (PEP 8), list/dict comprehensions, generator functions, context managers, and type annotations.',
    keyConcepts: [
      'Lists, Tuples, Dictionaries, and Sets time complexity',
      'List comprehensions and generator expressions with yield',
      'Context managers with the `with` statement',
      'Type hints and static checking with mypy',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'Generator function and dictionary comprehension in Python',
      code: `from typing import List, Dict

def parse_skills(resume_text: str, skill_keywords: List[str]) -> Dict[str, bool]:
    normalized_text = resume_text.lower()
    return {
        skill: skill.lower() in normalized_text
        for skill in skill_keywords
    }

# Generator for stream processing large resume batches
def stream_resumes(file_paths):
    for path in file_paths:
        with open(path, "r", encoding="utf-8") as f:
            yield f.read()`,
    },
    resources: [
      {
        title: 'Python Official Documentation (3.12)',
        url: 'https://docs.python.org/3/',
        type: 'Documentation',
      },
      {
        title: 'Real Python: Python 3 Basics Tutorial',
        url: 'https://realpython.com/',
        type: 'Tutorial',
      },
    ],
    projectBrief: {
      title: 'Automated Resume Keyword Extractor CLI',
      description: 'Write a Python command-line utility that scans multiple text or docx resumes, computes skill frequencies, and exports a JSON report.',
      deliverables: ['Custom regex matcher', 'Dictionary comprehension stats', 'Unit tests using pytest'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the average time complexity for searching a key in a Python dictionary?',
        options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'],
        correctAnswerIndex: 1,
        explanation: 'Python dictionaries are implemented as hash tables, providing O(1) average lookup time.',
      },
    ],
  },
  {
    id: 'python-fastapi-backend',
    title: 'FastAPI & Async Web Microservices',
    category: 'Frameworks & Libraries',
    careerRole: 'Python Developer',
    durationMinutes: 75,
    level: 'Intermediate',
    summary:
      'Develop lightning-fast RESTful APIs using Python’s modern FastAPI framework, Pydantic data models, and async database drivers.',
    keyConcepts: [
      'ASGI vs WSGI and Uvicorn server runtime',
      'Pydantic request body validation and automatic docs (/docs)',
      'Async/await concurrency for non-blocking I/O',
      'Dependency injection with FastAPI Depends()',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'FastAPI endpoint with Pydantic model validation',
      code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List

app = FastAPI(title="Career Skill Analyzer API")

class ResumePayload(BaseModel):
    candidate_name: str
    target_role: str
    skills_claimed: List[str] = Field(default_factory=list)

@app.post("/analyze-gap")
async def analyze_gap(payload: ResumePayload):
    if not payload.skills_claimed:
        raise HTTPException(status_code=400, detail="No skills submitted")
    # Gap analysis calculation logic
    return {"status": "success", "candidate": payload.candidate_name}`,
    },
    resources: [
      {
        title: 'FastAPI Official Documentation',
        url: 'https://fastapi.tiangolo.com/',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Skill Assessment REST API',
      description: 'Build a production-ready asynchronous microservice using FastAPI and Pydantic with automated test suites.',
      deliverables: ['Pydantic validation schemas', 'Async route handlers', 'Automated OpenAPI specification'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which library powers data validation and type parsing under the hood in FastAPI?',
        options: ['Flask', 'Pydantic', 'SQLAlchemy', 'Marshmallow'],
        correctAnswerIndex: 1,
        explanation: 'FastAPI is built on top of Starlette and Pydantic for lightning-fast schema validation.',
      },
    ],
  },

  // DATA ANALYST TRACK
  {
    id: 'data-sql-analytics',
    title: 'Advanced SQL: Aggregations, Window Functions & Joins',
    category: 'Databases & Storage',
    careerRole: 'Data Analyst',
    durationMinutes: 60,
    level: 'Beginner',
    summary:
      'Master ANSI SQL querying: multi-table JOINs, GROUP BY aggregations, Common Table Expressions (CTEs), and analytical Window Functions (ROW_NUMBER, RANK, LAG/LEAD).',
    keyConcepts: [
      'INNER, LEFT, RIGHT, and FULL OUTER joins',
      'Aggregate filtering with HAVING vs WHERE',
      'CTEs (WITH clause) for readable subquery pipelines',
      'OVER (PARTITION BY ... ORDER BY ...) window operations',
    ],
    codeSnippet: {
      language: 'sql',
      caption: 'SQL Window function calculating running study hours per student',
      code: `WITH DailyTotals AS (
  SELECT
    student_id,
    DATE(session_start) AS study_date,
    SUM(duration_minutes) AS daily_minutes
  FROM focus_sessions
  WHERE completed = TRUE
  GROUP BY student_id, DATE(session_start)
)
SELECT
  student_id,
  study_date,
  daily_minutes,
  SUM(daily_minutes) OVER (
    PARTITION BY student_id
    ORDER BY study_date
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS cumulative_study_minutes
FROM DailyTotals;`,
    },
    resources: [
      {
        title: 'PostgreSQL Official Documentation: Queries & Window Functions',
        url: 'https://www.postgresql.org/docs/current/tutorial-window.html',
        type: 'Documentation',
      },
      {
        title: 'Mode Analytics: The SQL Tutorial for Data Analysis',
        url: 'https://mode.com/sql-tutorial/',
        type: 'Tutorial',
      },
    ],
    projectBrief: {
      title: 'Student Cohort Retention SQL Analysis',
      description: 'Write complex SQL queries analyzing user engagement, weekly retention, and skill completion rates across multiple tables.',
      deliverables: ['Cohort analysis CTEs', 'Window ranking functions', 'Executive KPI summary table'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which SQL clause is used to filter groups created by a `GROUP BY` statement?',
        options: ['WHERE', 'HAVING', 'FILTER', 'ORDER BY'],
        correctAnswerIndex: 1,
        explanation: 'HAVING filters aggregated groups, whereas WHERE filters individual rows before aggregation occurs.',
      },
    ],
  },
  {
    id: 'data-pandas-numpy',
    title: 'Pandas & NumPy for Exploratory Data Analysis (EDA)',
    category: 'Frameworks & Libraries',
    careerRole: 'Data Analyst',
    durationMinutes: 75,
    level: 'Intermediate',
    summary:
      'Manipulate tabular datasets with Pandas Series and DataFrames, clean missing values, merge data sources, and compute summary statistics.',
    keyConcepts: [
      'Vectorized operations and broadcasting in NumPy',
      'DataFrame indexing: .loc vs .iloc',
      'Handling NaN values: dropna(), fillna(), and interpolation',
      'Groupby operations and pivot tables',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'Pandas exploratory analysis pipeline on learning metrics',
      code: `import pandas as pd
import numpy as np

# Load study session data
df = pd.read_csv("study_logs.csv")

# Clean and transform
df["study_date"] = pd.to_datetime(df["timestamp"])
df["hours"] = df["duration_minutes"] / 60.0

# Pivot table: Weekly study hours by Career Target Role
summary = df.pivot_table(
    index="target_career",
    columns=df["study_date"].dt.day_name(),
    values="hours",
    aggfunc=np.sum,
    fill_value=0
)
print(summary.round(2))`,
    },
    resources: [
      {
        title: 'Pandas Official Documentation: 10 Minutes to Pandas',
        url: 'https://pandas.pydata.org/docs/user_guide/10min.html',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Global Tech Job Market Trends Report',
      description: 'Perform end-to-end data cleansing and visualization on 10,000+ job listings to uncover emerging skill demands.',
      deliverables: ['Jupyter Notebook with EDA', 'Missing value cleansing', 'Visual bar and scatter charts'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'In Pandas, which accessor is label-based for selecting data by row and column names?',
        options: ['.iloc', '.loc', '.ix', '.select'],
        correctAnswerIndex: 1,
        explanation: '`.loc` is primarily label-based, while `.iloc` is integer position-based.',
      },
    ],
  },

  // AI ENGINEER TRACK
  {
    id: 'ai-ml-foundations',
    title: 'Machine Learning Fundamentals & Scikit-Learn',
    category: 'Frameworks & Libraries',
    careerRole: 'AI Engineer',
    durationMinutes: 90,
    level: 'Intermediate',
    summary:
      'Understand supervised vs unsupervised learning, bias-variance tradeoff, cross-validation, feature engineering, and classification models.',
    keyConcepts: [
      'Training, Validation, and Test dataset splits',
      'Classification metrics: Precision, Recall, F1-Score, and ROC-AUC',
      'Feature scaling: StandardScaler vs MinMaxScaler',
      'Scikit-learn Pipeline architecture to prevent data leakage',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'Scikit-learn ML Pipeline for Career Readines Prediction',
      code: `from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report

# Setup training pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
pipeline.fit(X_train, y_train)

preds = pipeline.predict(X_test)
print(classification_report(y_test, preds))`,
    },
    resources: [
      {
        title: 'Scikit-Learn Official User Guide',
        url: 'https://scikit-learn.org/stable/user_guide.html',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Career Match Predictive Classifier',
      description: 'Train a machine learning classifier to predict candidate hireability and recommend optimal role specializations.',
      deliverables: ['Trained model pipeline', 'Cross-validation score > 85%', 'Model confusion matrix visual'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What occurs when a model performs exceptionally well on training data but poorly on unseen test data?',
        options: ['Underfitting', 'Overfitting', 'Data normalization', 'Feature regularization'],
        correctAnswerIndex: 1,
        explanation: 'Overfitting happens when a model learns noise and specifics of training data rather than general patterns.',
      },
    ],
  },
  {
    id: 'ai-llm-rag',
    title: 'LLMs, Vector Embeddings & RAG Architecture',
    category: 'Core Concepts & Methods',
    careerRole: 'AI Engineer',
    durationMinutes: 90,
    level: 'Advanced',
    summary:
      'Learn modern generative AI engineering: prompt orchestration, dense vector embeddings, vector similarity search, and Retrieval-Augmented Generation (RAG).',
    keyConcepts: [
      'Transformers and self-attention mechanism basics',
      'Tokenization and context window management',
      'Cosine similarity on vector embeddings',
      'RAG pipeline: Document chunking, indexing, retrieval, and prompt injection',
    ],
    codeSnippet: {
      language: 'python',
      caption: 'Vector similarity search for matching resume text against job competencies',
      code: `import numpy as np

def cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    dot_product = np.dot(vec_a, vec_b)
    norm_a = np.linalg.norm(vec_a)
    norm_b = np.linalg.norm(vec_b)
    if norm_a == 0 or norm_b == 0:
        return 0.0
    return float(dot_product / (norm_a * norm_b))

# Compare resume embedding with role requirements embedding
# similarity_score = cosine_similarity(resume_vec, target_role_vec)`,
    },
    resources: [
      {
        title: 'Hugging Face: Deep Learning with Transformers',
        url: 'https://huggingface.co/learn',
        type: 'Tutorial',
      },
    ],
    projectBrief: {
      title: 'Smart Resume-to-Job Matching RAG Engine',
      description: 'Implement a semantic retrieval pipeline that ingests course syllabi and recommends personalized study actions.',
      deliverables: ['Vector embedding generation', 'Top-K semantic retriever', 'Context-augmented response generation'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'What is the primary role of a Vector Database in a RAG system?',
        options: [
          'Storing relational SQL tables with foreign keys',
          'Fast nearest-neighbor similarity search on high-dimensional embeddings',
          'Compressing HTML stylesheets',
          'Executing server-side JavaScript',
        ],
        correctAnswerIndex: 1,
        explanation: 'Vector databases store embeddings and compute approximate nearest neighbor (ANN) similarity to find contextually relevant text snippets.',
      },
    ],
  },
  // UNIVERSAL TOOLS & METHODS TRACKS (Git, SQL)
  {
    id: 'universal-git-workflow',
    title: 'Git Version Control & Collaborative GitHub Workflows',
    category: 'Developer Tools & Cloud',
    careerRole: 'Web Developer',
    durationMinutes: 45,
    level: 'Beginner',
    summary:
      'Master essential software engineering collaboration: commits, branching strategies (Git Flow), merge conflict resolution, pull requests, and rebasing.',
    keyConcepts: [
      'Working Directory, Staging Area, and Commit History',
      'Branching, checking out, and merging',
      'Understanding and resolving merge conflicts cleanly',
      'Squashing commits and interactive rebasing (git rebase -i)',
    ],
    codeSnippet: {
      language: 'bash',
      caption: 'Standard feature branch workflow in terminal',
      code: `# Create and switch to a feature branch
git checkout -b feature/resume-gap-analyzer

# Stage modified files and create semantic commit
git add src/views/ResumeAnalysisView.tsx
git commit -m "feat(resume): add confidence score indicators to extracted skills"

# Keep feature branch up-to-date with main
git fetch origin
git rebase origin/main

# Push to remote repository
git push origin feature/resume-gap-analyzer`,
    },
    resources: [
      {
        title: 'Git SCM: Pro Git Book (Free Online)',
        url: 'https://git-scm.com/book/en/v2',
        type: 'Documentation',
      },
    ],
    projectBrief: {
      title: 'Open Source Contribution Simulation',
      description: 'Fork a repository, branch, fix a documented bug, write a semantic commit message, and prepare a PR review.',
      deliverables: ['Clean linear git commit log', 'Resolved conflict demonstration', 'Detailed Pull Request description'],
    },
    quiz: [
      {
        id: 'q1',
        question: 'Which Git command moves changes from the working directory to the staging area?',
        options: ['git commit', 'git push', 'git add', 'git stage-all'],
        correctAnswerIndex: 2,
        explanation: '`git add <files>` stages changes ready for the next commit.',
      },
    ],
  },
];
