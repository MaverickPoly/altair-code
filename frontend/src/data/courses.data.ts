import type { CourseType, LanguageType } from "../types";

const courses: CourseType[] = [
  {
    id: 1,
    title: "Utlimate Introduction to Python",
    slug: "utlimate-indtroduction-to-python",
    image:
      "https://miro.medium.com/v2/resize:fit:448/1*7cjpvlhNkohayX7zf0rV2w.png",
    category: "beginner",
    description: "Full introduction course on Python for Beginners",
    lessons: [],
    created_at: "04-07-2025T.329",
    updated_at: "04-07-2025T.329",
  },
];

export const languages: LanguageType[] = [
  {
    id: 1,
    name: "Python",
    slug: "python",
    description: `**Python** is a high-level, interpreted programming language known for its simplicity, readability, and versatility.

### 🔧 Key Features:

* **Simple Syntax**: Easy to learn and resembles plain English.
* **Interpreted**: No need to compile; you can run code line by line.
* **Dynamically Typed**: No need to declare variable types.
* **Versatile**: Used in web development, data science, machine learning, automation, scripting, and more.
* **Extensive Libraries**: Rich ecosystem (e.g., NumPy, Pandas, Django, Flask, TensorFlow, etc.).

### 🔥 Popular Use Cases:

* **Web development** – (e.g., Django, Flask)
* **Data analysis & visualization** – (e.g., Pandas, Matplotlib)
* **Machine learning & AI** – (e.g., Scikit-learn, TensorFlow, PyTorch)
* **Automation & scripting** – (e.g., writing bots, file processors)
* **Game development** – (e.g., Pygame)

### 📌 Example Code:

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Maverick")
\`\`\`

### 🐍 Fun Fact:

Python was created by **Guido van Rossum** in the late 1980s and is named after **Monty Python**, not the snake 🐍.

Would you like a roadmap to learn Python effectively?
`,
    image:
      "https://images.icon-icons.com/2699/PNG/512/python_logo_icon_168886.png",
    courses: [courses[0]],
  },
  {
    id: 2,
    name: "JavaScript",
    slug: "javascript",
    description: "Javascript is the dominating language in frontend.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
    courses: [],
  },
  {
    id: 3,
    name: "C",
    slug: "c",
    description:
      "The C programming language is used primarily for developing operating systems.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png",
    courses: [],
  },
  {
    id: 4,
    name: "C++",
    slug: "cpp",
    description: "C++ is very powerful and fast programming language",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/1822px-ISO_C%2B%2B_Logo.svg.png",
    courses: [],
  },
  {
    id: 5,
    name: "Java",
    slug: "java",
    description:
      "Java is very powerful language used for web dev and android app development.",
    image:
      "https://brandslogos.com/wp-content/uploads/images/large/java-logo-1.png",
    courses: [],
  },
  {
    id: 6,
    name: "Go",
    slug: "go",
    description: "Go is the language developed by google.",
    image:
      "https://brandlogos.net/wp-content/uploads/2021/12/go_language-brandlogo.net_-512x512.png",
    courses: [],
  },
  {
    id: 7,
    name: "PHP",
    slug: "php",
    description: "PHP is the primary language that runs the web.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/PHP-logo.svg/1280px-PHP-logo.svg.png",
    courses: [],
  },
  {
    id: 8,
    name: "Rust",
    slug: "rust",
    description: "Rust is a modern replacement for C++.",
    image: "https://rustacean.net/assets/rustacean-flat-happy.png",
    courses: [],
  },
  {
    id: 9,
    name: "C#",
    slug: "cs",
    description: "C# is cool language developed by Microsoft.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Logo_C_sharp.svg/910px-Logo_C_sharp.svg.png",
    courses: [],
  },
  {
    id: 10,
    name: "Dart",
    slug: "dart",
    description:
      "Dart is another language developed by Google for mobile app development.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png",
    courses: [],
  },
  {
    id: 11,
    name: "Kotlin",
    slug: "kotlin",
    description: "Kotlin is a modern solution for Java, very easy to learn.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Kotlin_Icon.svg/1200px-Kotlin_Icon.svg.png",
    courses: [],
  },
  {
    id: 12,
    name: "Swift",
    slug: "swift",
    description: "Swift is used to developed software for Apple industry.",
    image:
      "https://cdn.freebiesupply.com/logos/large/2x/swift-15-logo-svg-vector.svg",
    courses: [],
  },
];
