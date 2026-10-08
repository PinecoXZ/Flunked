export type QuizCategory =
  | "dsa"
  | "projects"
  | "internships"
  | "cgpa"
  | "aptitude"
  | "core_subjects"
  | "git"
  | "mock_interviews"
  | "communication"
  | "tech_stack";

export interface QuizOption {
  label: string;
  text: string;
  score: 0 | 3 | 7 | 10;
  snarkComment?: string;
}

export interface QuizQuestion {
  id: number;
  category: QuizCategory;
  categoryLabel: string;
  emoji: string;
  question: string;
  subtext: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
}

export interface QuizTierInfo {
  tier: "tier_god" | "tier_safe" | "tier_panic" | "tier_cooked";
  badge: string;
  range: string;
  color: string;
  textColor: string;
  bgGlow: string;
  verdict: string;
  description: string;
  realityCheck: string;
  salaryExpectation: string;
}

export interface TriageItem {
  category: QuizCategory;
  categoryLabel: string;
  score: number;
  priority: "High" | "Critical" | "Emergency";
  headline: string;
  prescription: string;
  resourceTip: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: "dsa",
    categoryLabel: "DSA & Problem Solving",
    emoji: "🧩",
    question: "How is your LeetCode / DSA prep looking right now?",
    subtext: "Be honest. The compiler knows if you just copy-pasted two-sum.",
    options: [
      {
        label: "A",
        text: "I know what an array is. Sometimes I write a for-loop and pray.",
        score: 0,
        snarkComment: "Bro, even Python's garbage collector works harder than this.",
      },
      {
        label: "B",
        text: "Solved ~40-60 Easy/Mediums. Trees and Graphs give me minor palpitations.",
        score: 3,
        snarkComment: "Fine for 4.5 LPA mass recruiters, but don't look at Oracle's test.",
      },
      {
        label: "C",
        text: "150-250 problems solved. Striver sheet 70% done. Can invert a binary tree without crying.",
        score: 7,
        snarkComment: "Respectable engineering cadet. You can clear Round 1 at 12 LPA firms.",
      },
      {
        label: "D",
        text: "350+ LeetCode, Knight/Guardian on LC, DP on Trees is my morning yoga routine.",
        score: 10,
        snarkComment: "Okay topper, stop flexing. Leave some Day-1 CTC for the rest of campus.",
      },
    ],
  },
  {
    id: 2,
    category: "projects",
    categoryLabel: "Projects & Dev Portfolio",
    emoji: "💻",
    question: "What's the status of the projects pinned on your resume?",
    subtext: "If it's the Todo app from that 2021 tutorial, we need an intervention.",
    options: [
      {
        label: "A",
        text: "Weather App and Netflix clone with hardcoded dummy JSON and no backend.",
        score: 0,
        snarkComment: "Interviewers have seen 4,000 Netflix clones this week alone.",
      },
      {
        label: "B",
        text: "1 full-stack MERN project running on localhost, never bought a domain or deployed it.",
        score: 3,
        snarkComment: "'It works on my machine' is not an architectural choice.",
      },
      {
        label: "C",
        text: "2 deployed production apps on Vercel/Render with PostgreSQL/Redis, auth, and real users.",
        score: 7,
        snarkComment:
          "Legit developer energy. You actually understand CORS errors and rate limiting.",
      },
      {
        label: "D",
        text: "High-throughput microservices, open-source maintainer with stars, or distributed systems lab.",
        score: 10,
        snarkComment: "You're probably questioning why you even attend college at this point.",
      },
    ],
  },
  {
    id: 3,
    category: "internships",
    categoryLabel: "Internships & Experience",
    emoji: "💼",
    question: "What real-world work experience is on your resume?",
    subtext: "Campus ambassador for an edtech company does not count as SWE experience.",
    options: [
      {
        label: "A",
        text: "Zero internships. Just 1 certificate from a 2-hour free Coursera course.",
        score: 0,
        snarkComment: "Coursera certificates are decorative wallpaper to recruiters.",
      },
      {
        label: "B",
        text: "Unpaid 1-month internship at uncle's cousin's firm where I made Canva posters.",
        score: 3,
        snarkComment: "Unpaid labor and zero git commits. We've all been there.",
      },
      {
        label: "C",
        text: "1 solid paid internship at an early-stage startup or mid-size tech company.",
        score: 7,
        snarkComment:
          "Massive differentiator. You know how sprints, PR reviews, and standups work.",
      },
      {
        label: "D",
        text: "Tier-1 / Product internship (FAANG / unicorn / GS / high-growth YC startup).",
        score: 10,
        snarkComment: "Why are you taking this quiz? Go sign your PPO already.",
      },
    ],
  },
  {
    id: 4,
    category: "cgpa",
    categoryLabel: "CGPA & Academic Standing",
    emoji: "📈",
    question: "What's your current overall CGPA standing?",
    subtext:
      "We know skills matter, but college placement cell's automated Excel filter doesn't care.",
    options: [
      {
        label: "A",
        text: "Below 6.5 (or active backlogs lurking in the shadows like Voldemort).",
        score: 0,
        snarkComment: "The placement cell filter will drop you faster than bad WiFi.",
      },
      {
        label: "B",
        text: "6.5 - 7.4. Barely safe for mass recruiters, barred from 70% of product companies.",
        score: 3,
        snarkComment: "You survive the TCS cutoff, but Microsoft isn't opening that resume file.",
      },
      {
        label: "C",
        text: "7.5 - 8.49. Clears 90% of company eligibility cutoffs without sweating.",
        score: 7,
        snarkComment:
          "Sweet spot. High enough for eligibility, low enough to still have a social life.",
      },
      {
        label: "D",
        text: "8.5+ with clean sheet. Dean's list, immune to any university eligibility guillotine.",
        score: 10,
        snarkComment: "Academic bulletproof vest. The placement cell loves you.",
      },
    ],
  },
  {
    id: 5,
    category: "aptitude",
    categoryLabel: "Aptitude & Speed Tests",
    emoji: "⏱️",
    question: "Round 1 Online Assessment (OA): Aptitude, Quants & Reasoning. How fast are you?",
    subtext: "A train leaves Delhi at 60kmph... can you solve it in 45 seconds?",
    options: [
      {
        label: "A",
        text: "I count on my fingers and run out of time on question 12 of 50.",
        score: 0,
        snarkComment:
          "Speed round eliminated. That train reached Kolkata before you calculated speed.",
      },
      {
        label: "B",
        text: "Can solve standard IndiaBix questions if nobody puts a 60-second countdown timer.",
        score: 3,
        snarkComment: "Timed tests trigger your panic mode. Work on short tricks.",
      },
      {
        label: "C",
        text: "Consistent 75%+ accuracy on timed mock aptitude and logical reasoning sections.",
        score: 7,
        snarkComment: "You glide past the automated screening filter with minutes to spare.",
      },
      {
        label: "D",
        text: "CAT / Quant wizard. Permutations and syllogisms take me 15 seconds max.",
        score: 10,
        snarkComment: "Absolute speed demon. Quantitative sections are basically free points.",
      },
    ],
  },
  {
    id: 6,
    category: "core_subjects",
    categoryLabel: "CS Fundamentals (OS/DBMS/CN/OOP)",
    emoji: "🏛️",
    question: "Interviewer asks: 'Explain deadlock conditions and 3NF normalization.' You:",
    subtext: "Tech leads always ask these when they suspect your resume was generated by ChatGPT.",
    options: [
      {
        label: "A",
        text: "Blank stare. Mentally calculating how to fake a network disconnection.",
        score: 0,
        snarkComment: "'Sir sorry mic issue' works once, not in a live whiteboard round.",
      },
      {
        label: "B",
        text: "Know the textbook definitions by heart, but zero clue how PostgreSQL uses indexing.",
        score: 3,
        snarkComment:
          "Rote memorization can't survive 'Why would you choose B-Tree over Hash index?'.",
      },
      {
        label: "C",
        text: "Can explain paging, virtual memory, ACID properties, TCP 3-way handshake with diagrams.",
        score: 7,
        snarkComment: "Solid core foundation. Technical round 1 will be smooth sailing.",
      },
      {
        label: "D",
        text: "Built a custom toy OS kernel, wrote custom socket server, and tuned DB WAL buffers.",
        score: 10,
        snarkComment: "You're not being interviewed, you're giving the interviewer a masterclass.",
      },
    ],
  },
  {
    id: 7,
    category: "git",
    categoryLabel: "Git, Linux & Engineering Tooling",
    emoji: "🛠️",
    question: "How do you manage version control and development environments?",
    subtext: "final_v2_really_final_zip_submitted.zip is a cry for help.",
    options: [
      {
        label: "A",
        text: "Google Drive folder named 'Project_Final_v3_NEW'. What is a branch?",
        score: 0,
        snarkComment: "One wrong Ctrl+Z and your entire semester work evaporates into the ether.",
      },
      {
        label: "B",
        text: "I do `git add .`, `git commit -m 'update'`, `git push --force` and pray to gods.",
        score: 3,
        snarkComment: "Force pushing directly to main branch is certified hostel terrorism.",
      },
      {
        label: "C",
        text: "Comfortable with feature branches, interactive rebasing, merge conflicts, and Docker.",
        score: 7,
        snarkComment:
          "Clean commit history, understands CI pipelines. Senior engineers appreciate you.",
      },
      {
        label: "D",
        text: "Bash scripting, Linux daemon debugging, Docker multi-stage builds, and automated GitHub Actions.",
        score: 10,
        snarkComment: "DevOps whisperer. You will be fixing the entire company's broken pipeline.",
      },
    ],
  },
  {
    id: 8,
    category: "mock_interviews",
    categoryLabel: "Mock Interviews & Live Coding",
    emoji: "🎙️",
    question: "How do you perform when someone watches you code live on Google Meet?",
    subtext: "The infamous 'typing with sweaty palms while 2 senior devs stare at your cursor'.",
    options: [
      {
        label: "A",
        text: "Total cognitive paralysis. Forget basic syntax for iterating through a map.",
        score: 0,
        snarkComment: "Performance anxiety is real. You need at least 5 brutal mock runs.",
      },
      {
        label: "B",
        text: "Can write the code in silence, but can't articulate my thought process out loud.",
        score: 3,
        snarkComment:
          "Silence kills interviews. Recruiters want to hear your reasoning, not keyboard clicks.",
      },
      {
        label: "C",
        text: "Comfortable thinking out loud, clarifying constraints, and handling interviewer hints.",
        score: 7,
        snarkComment: "Collaborative engineer vibe. Exactly what hiring managers look for.",
      },
      {
        label: "D",
        text: "15+ Pramp/Interviewing.io mocks completed. Calm, proactive, and drives the conversation.",
        score: 10,
        snarkComment:
          "Ice in your veins. You treat technical interviews like a pleasant Sunday chat.",
      },
    ],
  },
  {
    id: 9,
    category: "communication",
    categoryLabel: "HR, Behavioral & Soft Skills",
    emoji: "🗣️",
    question: "Interviewer asks: 'Tell me about a time you had a conflict in your team.' You:",
    subtext: "Remember: 'My team was lazy and I did everything alone' is an instant HR rejection.",
    options: [
      {
        label: "A",
        text: "Start ranting about how useless my college project group members were.",
        score: 0,
        snarkComment: "Instant red flag. HR just stamped 'Do Not Hire' in bold crimson ink.",
      },
      {
        label: "B",
        text: "Mumble a generic story about agreeing to disagree and working hard.",
        score: 3,
        snarkComment: "Boring and forgettable. HR is mentally daydreaming about lunch.",
      },
      {
        label: "C",
        text: "Structured STAR method: Situation, Task, Action, and quantifiable positive Result.",
        score: 7,
        snarkComment:
          "Textbook execution. Demonstrates maturity, emotional intelligence, and leadership.",
      },
      {
        label: "D",
        text: "Charismatic storytelling, demonstrates deep empathy, cross-functional mediation, and humor.",
        score: 10,
        snarkComment:
          "You could talk your way into a VP position if the interview went 10 minutes longer.",
      },
    ],
  },
  {
    id: 10,
    category: "tech_stack",
    categoryLabel: "Modern Tech Stack & Depth",
    emoji: "⚡",
    question: "What does your primary development toolkit look like in 2024-2026?",
    subtext: "Having 25 programming languages listed on a 1-page resume is a giant meme.",
    options: [
      {
        label: "A",
        text: "C, C++, Java, Python, HTML, CSS, PHP, Assembly listed with zero deep mastery in any.",
        score: 0,
        snarkComment: 'Jack of all trades, master of printf("Hello World").',
      },
      {
        label: "B",
        text: "Basic React + Express tutorials, but never handled state management or caching.",
        score: 3,
        snarkComment:
          "Surface level. The moment they ask about React re-render optimization, you fold.",
      },
      {
        label: "C",
        text: "Deep mastery of 1 stack (e.g. Next.js/TypeScript/Go/Postgres) with auth, caching, and ORM.",
        score: 7,
        snarkComment:
          "Production-ready skillset. You can deliver real features on day 1 without handholding.",
      },
      {
        label: "D",
        text: "Full depth: TypeScript/Go/Rust, async queues (Kafka/RabbitMQ), Redis caching, profiling, Docker.",
        score: 10,
        snarkComment:
          "Full-stack powerhouse. Startup founders will fight in parking lots to hire you.",
      },
    ],
  },
  {
    id: 11,
    category: "core_subjects",
    categoryLabel: "CS Fundamentals (OS/DBMS/CN/OOP)",
    emoji: "🗄️",
    question:
      "A production SQL query takes 14 seconds to return. The interviewer asks how you would diagnose and fix it. You:",
    subtext: "Running SELECT * without an index is why AWS bills cause heart palpitations.",
    options: [
      {
        label: "A",
        text: "Restart the server and pray the database cache magically absorbs the problem.",
        score: 0,
        snarkComment: "Rebooting the server is not an indexing strategy.",
      },
      {
        label: "B",
        text: "I know what an index is, but I have no idea what B-Tree vs Hash index does.",
        score: 3,
        snarkComment: "'Just add an index on every column' will obliterate your write throughput.",
      },
      {
        label: "C",
        text: "Run EXPLAIN ANALYZE, inspect query plan, add composite index, and eliminate full-table scans.",
        score: 7,
        snarkComment: "DBA approved. Your queries won't set the production server rack on fire.",
      },
      {
        label: "D",
        text: "Deep execution plan audit, partition hot tables, optimize WAL buffers, and implement Redis read-through caching.",
        score: 10,
        snarkComment: "Senior database architect tier. PostgreSQL documentation kneels before you.",
      },
    ],
  },
  {
    id: 12,
    category: "communication",
    categoryLabel: "HR, Behavioral & Soft Skills",
    emoji: "📄",
    question: "How did you craft and format your placement resume?",
    subtext:
      "Multi-column Canva graphic templates with 'Python: 90%' skill bars are an automated ATS nightmare.",
    options: [
      {
        label: "A",
        text: "3-page multi-color Canva template with a photo, skill star ratings, and hobby: 'sleeping'.",
        score: 0,
        snarkComment: "The ATS parser threw your resume directly into the digital recycling bin.",
      },
      {
        label: "B",
        text: "Single-column MS Word document with paragraphs of generic responsibilities and zero metrics.",
        score: 3,
        snarkComment: "'Responsible for backend development' tells recruiters absolutely nothing.",
      },
      {
        label: "C",
        text: "Clean 1-page LaTeX template using Google XYZ metric format (Accomplished X by doing Y measured by Z).",
        score: 7,
        snarkComment: "ATS-friendly perfection. Clean typography and measurable impact.",
      },
      {
        label: "D",
        text: "Deedy/Jake LaTeX template, hyperlinked GitHub PRs, live demo URLs, and quantified production metrics.",
        score: 10,
        snarkComment: "Recruiters screenshot your resume to use as a gold standard example.",
      },
    ],
  },
  {
    id: 13,
    category: "tech_stack",
    categoryLabel: "Modern Tech Stack & Depth",
    emoji: "🏗️",
    question:
      "Interviewer asks: 'Design a URL shortener like TinyURL that handles 100M clicks a day.' You:",
    subtext:
      "The moment you say 'I will store all 100M URLs in a single MongoDB collection', the interviewer sighs.",
    options: [
      {
        label: "A",
        text: "Suggest storing everything in an Excel spreadsheet or a local JSON file on the server.",
        score: 0,
        snarkComment: "Even Microsoft Excel crashed just reading this proposal.",
      },
      {
        label: "B",
        text: "Basic SQL table with auto-increment IDs, but have no answer for hash collisions or traffic spikes.",
        score: 3,
        snarkComment:
          "You survived the first 90 seconds, then choked on 10,000 requests per second.",
      },
      {
        label: "C",
        text: "Base62 encoding, distributed ID generation (Snowflake), Redis caching for hot links, and read replicas.",
        score: 7,
        snarkComment: "Legit high-level system design. Ready for 16+ LPA SDE-1 rounds.",
      },
      {
        label: "D",
        text: "End-to-end architecture: Consistent hashing, CDN edge caching, token bucket rate limiting, Kafka event streaming.",
        score: 10,
        snarkComment:
          "Bro is designing Netflix while interviewing for an entry-level fresher role.",
      },
    ],
  },
  {
    id: 14,
    category: "core_subjects",
    categoryLabel: "CS Fundamentals (OS/DBMS/CN/OOP)",
    emoji: "🧱",
    question:
      "Can you explain OOP concepts without using the standard 'Dog extends Animal' example?",
    subtext:
      "If you explain polymorphism by saying 'Dog barks and Cat meows', the tech lead is mentally checking out.",
    options: [
      {
        label: "A",
        text: "'OOP is... uh... Object Oriented Programming sir. Objects have programs.'",
        score: 0,
        snarkComment: "Breathtakingly profound. Absolutely zero marks awarded.",
      },
      {
        label: "B",
        text: "Recite Dog/Animal and Car/Vehicle definitions from your Class 12 textbook word-for-word.",
        score: 3,
        snarkComment:
          "Passed the college Viva exam, but won't survive a real code refactoring round.",
      },
      {
        label: "C",
        text: "Explain encapsulation, dependency injection, and runtime polymorphism using real payment gateway adapters.",
        score: 7,
        snarkComment: "Clean code enthusiast. You actually write maintainable software.",
      },
      {
        label: "D",
        text: "Mastery of SOLID principles, composition over inheritance, and design patterns (Factory, Strategy, Observer).",
        score: 10,
        snarkComment: "Martin Fowler would shed a single tear of joy hearing this explanation.",
      },
    ],
  },
  {
    id: 15,
    category: "core_subjects",
    categoryLabel: "CS Fundamentals (OS/DBMS/CN/OOP)",
    emoji: "🧵",
    question:
      "Two users click 'Book Ticket' for the last Tatkal train seat at the exact same millisecond. What happens?",
    subtext:
      "Race conditions: the reason why concert booking sites crash and college registration portals duplicate fees.",
    options: [
      {
        label: "A",
        text: "'Whoever has faster 5G internet gets the ticket, obviously.'",
        score: 0,
        snarkComment: "Computer Science professors across the nation just sighed in unison.",
      },
      {
        label: "B",
        text: "I know race conditions exist, but my solution is putting `sleep(1000)` in the code.",
        score: 3,
        snarkComment: "Adding arbitrary sleep timeouts is duct-tape engineering at its finest.",
      },
      {
        label: "C",
        text: "Explain ACID transactions, row-level pessimistic locking (`SELECT FOR UPDATE`), or optimistic versioning.",
        score: 7,
        snarkComment: "Production-grade mindset. Double-booking prevented cleanly.",
      },
      {
        label: "D",
        text: "Distributed locks via Redis Redlock, idempotent APIs, and transactional outbox queues with message deduplication.",
        score: 10,
        snarkComment:
          "FinTech infrastructure engineers are currently looking for your contact details.",
      },
    ],
  },
  {
    id: 16,
    category: "git",
    categoryLabel: "Git, Linux & Engineering Tooling",
    emoji: "🧪",
    question:
      "What is your automated testing and quality verification strategy before pushing code?",
    subtext:
      "'Testing in production' is only cool until you wipe out the client database on Friday at 6 PM.",
    options: [
      {
        label: "A",
        text: "I click around the UI twice. If it doesn't crash on my screen, it ships to main branch.",
        score: 0,
        snarkComment: "Manual testing cowboy. Your end users are your unpaid QA department.",
      },
      {
        label: "B",
        text: "Console.log('here 1'), console.log('here 2') all over the codebase, commented out before pushing.",
        score: 3,
        snarkComment: "The sacred console.log ritual. An engineering student tradition since 1995.",
      },
      {
        label: "C",
        text: "Automated unit tests for business logic, mock API tests with Jest/Pytest, and pre-commit lint hooks.",
        score: 7,
        snarkComment:
          "Professional engineering standards. You save companies from weekend emergencies.",
      },
      {
        label: "D",
        text: "TDD practitioner, 80%+ test coverage, integration suites with Testcontainers, and automated CI/CD gating.",
        score: 10,
        snarkComment: "Your pull requests are so clean they belong in an architectural museum.",
      },
    ],
  },
  {
    id: 17,
    category: "dsa",
    categoryLabel: "DSA & Problem Solving",
    emoji: "🧠",
    question:
      "The interviewer gives you a Dynamic Programming problem (e.g., Coin Change or Edit Distance). You:",
    subtext:
      "The universal test to separate candidates who memorized solutions from candidates who grasp state transitions.",
    options: [
      {
        label: "A",
        text: "Start writing 4 nested for-loops, get Time Limit Exceeded (TLE), and quietly question life choices.",
        score: 0,
        snarkComment:
          "O(2^N) exponential complexity detected. The universe will end before it returns.",
      },
      {
        label: "B",
        text: "Can write basic recursive Fibonacci, but drawing a 2D DP state table makes your brain melt.",
        score: 3,
        snarkComment: "Recursion without memoization is just a Stack Overflow waiting to happen.",
      },
      {
        label: "C",
        text: "Identify optimal substructure, write top-down recursion with memoization, then optimize to bottom-up DP table.",
        score: 7,
        snarkComment:
          "Striver would be proud. DP state transitions and edge cases are crystal clear.",
      },
      {
        label: "D",
        text: "Space-optimized bottom-up DP, bitmask DP, digit DP, and can mathematically prove recurrence bounds.",
        score: 10,
        snarkComment:
          "Competitive programmer detected. Hard DP is basically a casual warmup for you.",
      },
    ],
  },
  {
    id: 18,
    category: "cgpa",
    categoryLabel: "CGPA & Academic Standing",
    emoji: "🎯",
    question: "How are you strategizing your campus placement company applications?",
    subtext:
      "Applying blindly to 85 companies on the placement portal without reading JDs leads straight to burnout.",
    options: [
      {
        label: "A",
        text: "Click 'Apply' on all 120 companies blindly, have no idea what any of them do or what role they offer.",
        score: 0,
        snarkComment:
          "You don't even know if you applied for Cloud Engineering or Sales Operations.",
      },
      {
        label: "B",
        text: "Aiming exclusively for Google and Microsoft on Day 1 with zero backup offers in place.",
        score: 3,
        snarkComment:
          "High risk, zero safety net. If Day 1 misses, Day 2 existential dread hits hard.",
      },
      {
        label: "C",
        text: "Tiered strategy: Secure 1 solid Day-1 backup (7-10 LPA), then aggressively contest Dream & Super-Dream roles (18+ LPA).",
        score: 7,
        snarkComment: "Pragmatic, high-survival strategy. You balance ambition with insurance.",
      },
      {
        label: "D",
        text: "Targeted off-campus referrals, tailored resumes per engineering domain, 3 active referral chains at top startups.",
        score: 10,
        snarkComment:
          "Playing 4D chess while others are waiting in placement cell registration queues.",
      },
    ],
  },
  {
    id: 19,
    category: "mock_interviews",
    categoryLabel: "Mock Interviews & Live Coding",
    emoji: "👀",
    question:
      "During an online coding round (OA) with webcam proctoring and full screen recording, how do you hold up?",
    subtext:
      "'Tab switch detected (1/3)' notification is the scariest notification an engineering student can see.",
    options: [
      {
        label: "A",
        text: "Accidentally switch tabs to search syntax, trigger 3 warnings, and get auto-disqualified with 0 marks.",
        score: 0,
        snarkComment: "Disqualified before you even typed `int main()`.",
      },
      {
        label: "B",
        text: "Get so paranoid about webcam eye-tracking that you stare unblinkingly at the screen center for 90 minutes.",
        score: 3,
        snarkComment: "The proctoring AI flagged you for suspicious robotic behavior.",
      },
      {
        label: "C",
        text: "Calm under timed conditions. Read all 3 questions first, solve easiest to hardest, budget time efficiently.",
        score: 7,
        snarkComment: "Veteran OA strategy. You maximize passing test cases without panicking.",
      },
      {
        label: "D",
        text: "Clear all hidden edge cases (integer overflow, large inputs, corner constraints) with 20 minutes left on clock.",
        score: 10,
        snarkComment:
          "100/100 on testcases. You probably helped your roommate with subtle hand signals too.",
      },
    ],
  },
  {
    id: 20,
    category: "communication",
    categoryLabel: "HR, Behavioral & Soft Skills",
    emoji: "🎭",
    question:
      "The Director asks: 'Why should we hire you instead of the 400 other engineering students outside?' You:",
    subtext:
      "The question where arrogant candidates sound obnoxious and insecure candidates sound helpless.",
    options: [
      {
        label: "A",
        text: "'Because I am very hardworking and need money to clear my college canteen balance sir.'",
        score: 0,
        snarkComment: "Honest, but HR is not a charitable emergency relief foundation.",
      },
      {
        label: "B",
        text: "'I am a quick learner and passionate about technology.' (Same line spoken by the last 47 candidates).",
        score: 3,
        snarkComment:
          "Cliché overload. The interviewer just took a sip of green tea to avoid yawning.",
      },
      {
        label: "C",
        text: "Connect your unique project track record, fast prototyping ability, and demonstrated culture fit with company roadmap.",
        score: 7,
        snarkComment:
          "High emotional intelligence. You articulate clear value without sounding arrogant.",
      },
      {
        label: "D",
        text: "Reference specific engineering challenges the company solved recently, citing their tech blog and where you add value.",
        score: 10,
        snarkComment:
          "Instant hire. You did more homework on the company than their own junior employees.",
      },
    ],
  },
  {
    id: 21,
    category: "tech_stack",
    categoryLabel: "Modern Tech Stack & Depth",
    emoji: "🔒",
    question: "How do you handle user authentication and sensitive data in your web applications?",
    subtext:
      "Storing plain-text passwords in MySQL because 'it's just a college project' is how data breaches happen.",
    options: [
      {
        label: "A",
        text: "Passwords stored as plain text in the database. What is hashing?",
        score: 0,
        snarkComment: "Mark Zuckerberg in 2004 energy. Massive security vulnerability.",
      },
      {
        label: "B",
        text: "MD5 hash or saving raw JWT tokens in plain localStorage with no CSRF protection or refresh rotation.",
        score: 3,
        snarkComment:
          "Vulnerable to basic XSS attacks. A Hacker News front page leak waiting to happen.",
      },
      {
        label: "C",
        text: "Argon2/bcrypt password hashing, HttpOnly secure cookies, short-lived JWTs, and strict CORS whitelist.",
        score: 7,
        snarkComment: "Security best practices implemented. OWASP Top 10 verified.",
      },
      {
        label: "D",
        text: "OAuth2/OIDC, RBAC authorization, automated rate limiting, input sanitization, and secrets management in Vault.",
        score: 10,
        snarkComment: "The security audit team won't have a single complaint. Enterprise-ready.",
      },
    ],
  },
  {
    id: 22,
    category: "aptitude",
    categoryLabel: "Aptitude & Speed Tests",
    emoji: "📊",
    question:
      "A 5-set Venn Diagram or circular seating arrangement puzzle appears in Round 1 OA. Your reaction:",
    subtext:
      "Logical reasoning puzzles are designed specifically to consume 20 minutes of your time and induce dizziness.",
    options: [
      {
        label: "A",
        text: "Draw 14 circles, get confused about who sits opposite Ramesh, and randomly pick option C.",
        score: 0,
        snarkComment: "Ramesh is sitting in depression, and so are you.",
      },
      {
        label: "B",
        text: "Can crack it, but it takes 18 minutes out of your 30-minute sectional time limit.",
        score: 3,
        snarkComment:
          "Solved the puzzle, but missed 6 other easy arithmetic questions in the process.",
      },
      {
        label: "C",
        text: "Use structured deduction grid, eliminate impossible cases in 2-3 minutes, answer all 5 sub-questions accurately.",
        score: 7,
        snarkComment: "Logical ninja. 5 quick marks collected with minimal clock burned.",
      },
      {
        label: "D",
        text: "Instantly spot the constraint anchor, solve in 90 seconds, and move on to quants like a math Olympian.",
        score: 10,
        snarkComment: "Your brain operates at 144Hz refresh rate. Pure speed.",
      },
    ],
  },
  {
    id: 23,
    category: "internships",
    categoryLabel: "Internships & Experience",
    emoji: "🌐",
    question:
      "Have you ever contributed code outside of mandatory university classroom assignments?",
    subtext:
      "Fixing a typo in a markdown file to get a free Hacktoberfest t-shirt does not count as kernel engineering.",
    options: [
      {
        label: "A",
        text: "Only write code when a professor threatens to deduct my internal lab marks.",
        score: 0,
        snarkComment: "Zero extracurricular passion. Pure academic compliance mode.",
      },
      {
        label: "B",
        text: "Submitted 4 typo fixes to README files during Hacktoberfest for the free t-shirt.",
        score: 3,
        snarkComment: "T-shirt collector. At least you know what a GitHub pull request looks like.",
      },
      {
        label: "C",
        text: "Reported reproducible bugs, wrote unit tests, and had 2-3 genuine PRs merged into recognized open-source libraries.",
        score: 7,
        snarkComment: "True open-source citizen. Shows initiative and real-world collaboration.",
      },
      {
        label: "D",
        text: "Maintainer of a popular library with 500+ GitHub stars, active Discord moderator, or Google Summer of Code (GSoC) alumni.",
        score: 10,
        snarkComment: "Legendary resume tier. You skip preliminary screenings automatically.",
      },
    ],
  },
  {
    id: 24,
    category: "tech_stack",
    categoryLabel: "Modern Tech Stack & Depth",
    emoji: "⚡",
    question:
      "Interviewer asks: 'How would you handle 50,000 users refreshing the live cricket score every second?' You:",
    subtext:
      "If you query the SQL database 50,000 times a second, your database will literally go up in flames.",
    options: [
      {
        label: "A",
        text: "'Increase the RAM of the server to 128 GB and hope for the best.'",
        score: 0,
        snarkComment: "The AWS billing alert will arrive before the cricket match finishes.",
      },
      {
        label: "B",
        text: "Put a basic in-memory dictionary in Node.js, unaware of multi-instance cache drift and memory leaks.",
        score: 3,
        snarkComment: "Works until your backend horizontally scales to 2 instances.",
      },
      {
        label: "C",
        text: "Implement Redis cache with TTL, cache-aside pattern, and push updates via WebSockets or Server-Sent Events.",
        score: 7,
        snarkComment: "Scalable real-time architecture. SDE-1 bar cleared effortlessly.",
      },
      {
        label: "D",
        text: "Edge caching with Cloudflare Workers, Redis Pub/Sub, connection pooling, and binary delta streaming over SSE.",
        score: 10,
        snarkComment: "Cricbuzz and Hotstar infrastructure engineers want your resume.",
      },
    ],
  },
  {
    id: 25,
    category: "communication",
    categoryLabel: "HR, Behavioral & Soft Skills",
    emoji: "❓",
    question:
      "At the end of a grueling 60-minute interview, the interviewer asks: 'Do you have any questions for me?' You:",
    subtext:
      "Saying 'No sir, all good' is the ultimate wasted opportunity to leave a lasting memorable impression.",
    options: [
      {
        label: "A",
        text: "'Sir, what is the exact package and do you provide free snacks in the office?'",
        score: 0,
        snarkComment: "Immediate vibe killer. Sounds like you're only here for the free samosas.",
      },
      {
        label: "B",
        text: "'No sir, you explained everything very well, thank you.' (Awkward silence ensues).",
        score: 3,
        snarkComment: "Polite, but completely forgettable. Left zero impression.",
      },
      {
        label: "C",
        text: "Ask about the team's upcoming engineering roadmap, production tech debt priorities, or engineering mentoring culture.",
        score: 7,
        snarkComment:
          "Curious and engaged. Shows you envision yourself working on their actual team.",
      },
      {
        label: "D",
        text: "Ask an insightful question about a specific architecture tradeoff the interviewer mentioned earlier in the round.",
        score: 10,
        snarkComment:
          "Active listening at the highest level. You turned an interview into a peer discussion.",
      },
    ],
  },
  {
    id: 26,
    category: "dsa",
    categoryLabel: "DSA & Problem Solving",
    emoji: "🌲",
    question:
      "Interviewer asks you to find the shortest path in a weighted grid with obstacles. You:",
    subtext:
      "The classic BFS vs Dijkstra vs A* crossroad that tests algorithmic intuition under pressure.",
    options: [
      {
        label: "A",
        text: "Try to use DFS, get stuck in an infinite cycle, and cause stack overflow.",
        score: 0,
        snarkComment: "Dijkstra is rolling in his grave right now.",
      },
      {
        label: "B",
        text: "Know that BFS works for unweighted graphs, but freeze when edge weights are introduced.",
        score: 3,
        snarkComment: "Good intuition, but priority queue implementation eluded you.",
      },
      {
        label: "C",
        text: "Immediately recognize Dijkstra with Min-Heap, explain state representation, and calculate O(E log V) complexity.",
        score: 7,
        snarkComment: "Algorithmic intuition on point. Round cleared with flying colors.",
      },
      {
        label: "D",
        text: "Implement Dijkstra cleanly in 12 minutes, identify edge cases (negative cycles, 0 weights), and discuss A* heuristic.",
        score: 10,
        snarkComment: "Competitive programmer efficiency. You made it look like a warmup problem.",
      },
    ],
  },
  {
    id: 27,
    category: "projects",
    categoryLabel: "Projects & Dev Portfolio",
    emoji: "🏆",
    question:
      "Have you ever shipped software under real deadlines (Hackathon, Client, or Production launch)?",
    subtext:
      "Building code without a deadline is easy. Shipping working software at 5 AM after 3 Red Bulls builds character.",
    options: [
      {
        label: "A",
        text: "Never participated in a hackathon, and my college mini-project was bought from a senior.",
        score: 0,
        snarkComment: "Paid senior ₹2000 for a Java Swing project. Peak college lore.",
      },
      {
        label: "B",
        text: "Attended 1 hackathon, spent 18 hours arguing about the idea, and submitted an incomplete UI mockup.",
        score: 3,
        snarkComment: "The canonical college hackathon experience: free pizza, zero working code.",
      },
      {
        label: "C",
        text: "Won or placed in 1-2 recognized 24-hour hackathons with a working deployed prototype and live demo.",
        score: 7,
        snarkComment:
          "Demonstrated builder grit. Can ship functional MVPs under extreme time pressure.",
      },
      {
        label: "D",
        text: "Built and shipped a live micro-SaaS with real paying users or organized/mentored national-level hackathons.",
        score: 10,
        snarkComment: "Founder energy. You don't wait for permission to build.",
      },
    ],
  },
  {
    id: 28,
    category: "mock_interviews",
    categoryLabel: "Mock Interviews & Live Coding",
    emoji: "🧭",
    question:
      "You get completely stuck on a problem during an interview, and the interviewer gives you a hint. You:",
    subtext:
      "Interviewers care 10x more about how you receive and iterate on hints than whether you knew the answer instantly.",
    options: [
      {
        label: "A",
        text: "Ignore the hint, double down on your broken approach, and argue with the interviewer.",
        score: 0,
        snarkComment: "Uncoachable and stubborn. Fastest route to an immediate rejection.",
      },
      {
        label: "B",
        text: "Acknowledge the hint, but get flustered and freeze because your original mental model got derailed.",
        score: 3,
        snarkComment: "Hint turned into panic. Take a deep breath and reset.",
      },
      {
        label: "C",
        text: "Actively listen to the hint, repeat it back to confirm understanding, and pivot your approach logically.",
        score: 7,
        snarkComment:
          "Coachability 10/10. Hiring managers love candidates who absorb guidance quickly.",
      },
      {
        label: "D",
        text: "Pick up the hint instantly, extrapolate to the optimal O(N) solution, and credit the interviewer for the insight.",
        score: 10,
        snarkComment:
          "Masterclass in interview synergy. You made the interviewer feel like a great mentor.",
      },
    ],
  },
];

export const DEFAULT_QUIZ_QUESTION_COUNT = 10;

/**
 * Returns a randomized subset of quiz questions using Fisher-Yates shuffle.
 */
export function getRandomQuizQuestions(
  count: number = DEFAULT_QUIZ_QUESTION_COUNT,
  pool: QuizQuestion[] = QUIZ_QUESTIONS
): QuizQuestion[] {
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, Math.min(count, pool.length));
}

const QUIZ_TIERS: Record<string, QuizTierInfo> = {
  tier_god: {
    tier: "tier_god",
    badge: "Day 1 Offer Locked In [Elite]",
    range: "80 – 100",
    color: "#22c55e",
    textColor: "text-emerald-400",
    bgGlow: "rgba(34, 197, 94, 0.15)",
    verdict: "Day 1 Offer Locked In. You are practically an employed person in college clothes.",
    description:
      "You have checked every box: competitive DSA, deployed projects with actual architectures, solid CS core, and confident delivery. Stop stressing about campus placements and start negotiating your signing bonuses.",
    realityCheck:
      "Your biggest risk right now is ego and getting complacent in early rounds. Keep sharpening mock interviews and don't trip over easy HR behavioral traps.",
    salaryExpectation: "18 LPA – 45+ LPA Product Tier / FAANG / High-Growth FinTech",
  },
  tier_safe: {
    tier: "tier_safe",
    badge: "Mass Recruiter Safe, Product Risky",
    range: "60 – 79",
    color: "#f5c518",
    textColor: "text-flunked-yellow",
    bgGlow: "rgba(245, 197, 24, 0.15)",
    verdict:
      "Mass Recruiter Safe, Product Risky. You will get placed, but target tier depends on next 30 days.",
    description:
      "You are in the respectable 70th percentile of Indian engineering students. You will cruise past service-based recruiters (TCS Prime, Infosys DSE, Cognizant, Wipro Turbo), but product firms with 3 rounds of hard DSA and system design will test your limits.",
    realityCheck:
      "You need targeted triage on your weakest links immediately. Upgrading 1 toy project to production and grinding 50 medium LeetCodes can swing you from 7 LPA to 16 LPA.",
    salaryExpectation: "7 LPA – 15 LPA Mid-Tier Product & Premium Service Offers",
  },
  tier_panic: {
    tier: "tier_panic",
    badge: "Campus Panic Mode [High Alert]",
    range: "40 – 59",
    color: "#f97316",
    textColor: "text-orange-400",
    bgGlow: "rgba(249, 115, 22, 0.15)",
    verdict:
      "Campus Panic Mode. The placement season train has left the station and you are running on the platform.",
    description:
      "You have some fragmented knowledge, but huge red flags on your profile: either your DSA is lagging behind, your resume lacks verifiable projects, or your core CS theory is shaking under basic questioning.",
    realityCheck:
      "Don't start 10 different courses. Pick 1 language, 1 DSA sheet (Striver A2Z), and clone 1 real-world architecture with clean GitHub commits over the next 3 weeks.",
    salaryExpectation: "4 LPA – 7 LPA Mass Recruiter / Standard IT Services",
  },
  tier_cooked: {
    tier: "tier_cooked",
    badge: "Bro is completely cooked [Critical]",
    range: "< 40",
    color: "#ef4444",
    textColor: "text-flunked-danger",
    bgGlow: "rgba(239, 68, 68, 0.2)",
    verdict: "Bro is completely cooked. Defibrillator required immediately.",
    description:
      "You have slept through 3 years of engineering, and reality is about to hit like a Monday morning 8am attendance call from the HOD. Zero projects, zero LeetCode, and you write your resume in MS Word.",
    realityCheck:
      "Accept the situation. Put down the video games, turn off Instagram reels, and enter monk mode. Focus purely on: (1) Clearing mass recruiter aptitude tests, (2) Basic OOPs & SQL queries, (3) 1 single working deployed project.",
    salaryExpectation: "3.2 LPA – 4.5 LPA (or pool campus walk-ins)",
  },
};

const CATEGORY_TRIAGE_GUIDE: Record<
  QuizCategory,
  { headline: string; prescription: string; resourceTip: string }
> = {
  dsa: {
    headline: "DSA is in critical condition",
    prescription:
      "Stop watching YouTube DSA playlists without writing code. Open NeetCode 150 or Striver's A2Z Sheet. Grind 2 mediums every single day for 30 days without looking at editorial solutions for the first 25 minutes.",
    resourceTip:
      "Focus on: Sliding Window, Two Pointers, Trees (DFS/BFS), and Basic Dynamic Programming.",
  },
  projects: {
    headline: "Resume has toy tutorial projects",
    prescription:
      "Scrap the weather app and Netflix clone. Pick one domain (e.g. UPI payment split webhook, real-time collaboration canvas, or high-concurrency URL shortener). Deploy with Docker on Render/Vercel with PostgreSQL.",
    resourceTip:
      "Must include: User Auth (JWT/OAuth), Database indexing, Rate limiting, and clean README.",
  },
  internships: {
    headline: "Zero proven work experience",
    prescription:
      "If you don't have an internship, open source is your lifeline. Make 3 meaningful pull requests to popular active repositories (docs, bugfixes, feature tests). Alternatively, freelance build 1 real tool for a local business.",
    resourceTip:
      "Contribute to Good First Issues on GitHub or build an open-source tool like Flunked.",
  },
  cgpa: {
    headline: "CGPA eligibility cutoff risk",
    prescription:
      "If your CGPA is borderline (<7.5), you cannot afford to fail automated resume screening. Highlight verified open-source, competitive programming rank, and hackathon wins in the top 3 inches of your resume.",
    resourceTip:
      "Maximize every internal score this semester to prevent slipping below company thresholds.",
  },
  aptitude: {
    headline: "Getting eliminated in Round 1 OA",
    prescription:
      "Many 20 LPA candidates get filtered out before coding rounds because they failed 8th-grade math speed tests. Spend 30 minutes daily solving timed IndiaBix or PrepInsta sets with a countdown timer.",
    resourceTip:
      "Master shortcuts for: Time & Work, Speed & Distance, Probability, and Syllogisms.",
  },
  core_subjects: {
    headline: "CS theory knowledge is hollow",
    prescription:
      "Technical interviewers love grill-testing OS, DBMS, and Networking fundamentals. Read top 50 interview questions on ACID properties, indexing (B-Tree vs Hash), Process vs Thread, and TCP handshake.",
    resourceTip: "Review: Gate Smashers or Knowledge Gate short revision series for OS and DBMS.",
  },
  git: {
    headline: "Engineering hygiene & tooling is amateur",
    prescription:
      "Never zip files again. Learn Git CLI: branching, rebasing, stash, resolving merge conflicts, and commit conventions. Set up a professional GitHub profile with clean commit activity and verified emails.",
    resourceTip: "Practice interactive git tutorial at 'learngitbranching.js.org'.",
  },
  mock_interviews: {
    headline: "Choking under live observation",
    prescription:
      "Coding alone on your desk is 10x easier than coding while an interviewer stares at your screen. Pair up with a batchmate and conduct 3 mock technical interviews where you explain your thought process out loud.",
    resourceTip:
      "Use Pramp.com for free peer-to-peer technical mocks with live shared code editors.",
  },
  communication: {
    headline: "Weak HR & behavioral storytelling",
    prescription:
      "Technical skills get you to the final round; communication gets you the offer letter. Write out 5 stories from your college journey using the STAR format (Situation, Task, Action, Result). Practice speaking in front of a mirror.",
    resourceTip: "Prepare: 'Tell me about yourself', 'Biggest failure', and 'Why our company?'.",
  },
  tech_stack: {
    headline: "Superficial tech stack breadth",
    prescription:
      "Recruiters prefer a candidate who knows TypeScript and PostgreSQL deeply over someone who listed 12 languages on their resume without knowing how memory allocation works in any of them.",
    resourceTip:
      "Go deep on 1 modern ecosystem. Understand performance, caching, and database query costs.",
  },
};

export function evaluateQuiz(
  answers: Record<number, number>,
  activeQuestions: QuizQuestion[] = QUIZ_QUESTIONS
): {
  totalScore: number;
  maxScore: number;
  percentage: number;
  tier: QuizTierInfo;
  weakestCategories: TriageItem[];
} {
  const maxScore = activeQuestions.length * 10;
  let totalScore = 0;

  const categoryStats: Record<QuizCategory, { earned: number; possible: number; label: string }> = {
    dsa: { earned: 0, possible: 0, label: "DSA & Problem Solving" },
    projects: { earned: 0, possible: 0, label: "Projects & Dev Portfolio" },
    internships: { earned: 0, possible: 0, label: "Internships & Experience" },
    cgpa: { earned: 0, possible: 0, label: "CGPA & Academic Standing" },
    aptitude: { earned: 0, possible: 0, label: "Aptitude & Speed Tests" },
    core_subjects: { earned: 0, possible: 0, label: "CS Fundamentals" },
    git: { earned: 0, possible: 0, label: "Git & Engineering Tooling" },
    mock_interviews: { earned: 0, possible: 0, label: "Mock Interviews & Live Coding" },
    communication: { earned: 0, possible: 0, label: "HR & Communication" },
    tech_stack: { earned: 0, possible: 0, label: "Tech Stack & Depth" },
  };

  activeQuestions.forEach((q) => {
    const selectedOptionIndex = answers[q.id];
    const score =
      selectedOptionIndex !== undefined && q.options[selectedOptionIndex]
        ? q.options[selectedOptionIndex].score
        : 0;

    totalScore += score;
    if (categoryStats[q.category]) {
      categoryStats[q.category].earned += score;
      categoryStats[q.category].possible += 10;
      categoryStats[q.category].label = q.categoryLabel;
    }
  });

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let tierKey: "tier_god" | "tier_safe" | "tier_panic" | "tier_cooked";
  if (percentage >= 80) {
    tierKey = "tier_god";
  } else if (percentage >= 60) {
    tierKey = "tier_safe";
  } else if (percentage >= 40) {
    tierKey = "tier_panic";
  } else {
    tierKey = "tier_cooked";
  }

  const tier = QUIZ_TIERS[tierKey];

  // Identify weakest categories based on percentage earned in the evaluated questions
  const evaluatedCategories = (Object.keys(categoryStats) as QuizCategory[]).filter(
    (cat) => categoryStats[cat].possible > 0
  );

  // Fallback to all categories if none evaluated
  const categoriesToSort =
    evaluatedCategories.length >= 3
      ? evaluatedCategories
      : (Object.keys(categoryStats) as QuizCategory[]);

  const sortedCategories = categoriesToSort.sort((a, b) => {
    const ratioA =
      categoryStats[a].possible > 0 ? categoryStats[a].earned / categoryStats[a].possible : 1;
    const ratioB =
      categoryStats[b].possible > 0 ? categoryStats[b].earned / categoryStats[b].possible : 1;
    return ratioA - ratioB;
  });

  const weakestCategories: TriageItem[] = sortedCategories.slice(0, 3).map((cat) => {
    const stats = categoryStats[cat];
    const normalizedScore =
      stats.possible > 0 ? Math.round((stats.earned / stats.possible) * 10) : 0;
    const guide = CATEGORY_TRIAGE_GUIDE[cat];
    let priority: "High" | "Critical" | "Emergency" = "High";
    if (normalizedScore <= 2) priority = "Emergency";
    else if (normalizedScore <= 5) priority = "Critical";

    return {
      category: cat,
      categoryLabel: stats.label,
      score: normalizedScore,
      priority,
      headline: guide.headline,
      prescription: guide.prescription,
      resourceTip: guide.resourceTip,
    };
  });

  return {
    totalScore,
    maxScore,
    percentage,
    tier,
    weakestCategories,
  };
}
