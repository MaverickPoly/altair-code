export interface ProjectDataType {
  image: string;
  title: string;
  description: string;
  github_url: string;
}

export const projects: ProjectDataType[] = [
  {
    image: "/about/AltairAssistant.jpg",
    title: "Altair Assistant",
    description:
      "Local AI Voice Assistant that can do numerous repetitive tasks for you.",
    github_url: "https://github.com/MaverickPoly/altair-assistant",
  },
  {
    image: "/about/AltairType.png",
    title: "Altair Type",
    description:
      "Typing Speed Test Platform (MonkeyType clone), with different typing modes and leaderboards.",
    github_url: "https://github.com/MaverickPoly/Altair-Type",
  },
  {
    image: "/about/GamifyCoding.png",
    title: "Gamify Coding",
    description: "Learning programming and completing projects in it gamified!",
    github_url: "https://github.com/MaverickPoly/gamify-coding",
  },
  {
    image: "/about/ASMRSeries.jpg",
    title: "ASMR Series",
    description:
      "Reference to all 500+ projects implemented by me in different technologies.",
    github_url: "https://github.com/MaverickPoly/asmr-series",
  },
  {
    image: "/logo.png",
    title: "Altair Edu",
    description:
      "Learning platform & coding news & quizzes made with Appwrite.",
    github_url: "https://github.com/MaverickPoly/AltairEduWeb",
  },
];
