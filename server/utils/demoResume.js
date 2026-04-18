import Resume from "../models/Resume.js";

// This seed is intentionally realistic enough to teach new users how the builder works.
// It also doubles as a good example of the resume schema for development/testing.
export const demoResumeTemplate = {
  title: "Demo Resume",
  isDemo: true,
  template: "minimalATSTemplate",
  accent_color: "#6b7280",
  font_family: '"Times New Roman", Times, serif',
  professional_summary:
    "Results-driven Frontend Developer with experience building scalable web applications using React, JavaScript, and Node.js. Skilled in performance optimization, REST API integration, and modern UI development. Passionate about delivering clean, efficient, and user-focused solutions.",
  personal_info: {
    full_name: "Joe Doe",
    profession: "Frontend Developer | MERN Stack Developer",
    email: "joe.doe.dev@gmail.com",
    phone: "+1 987 654 3210",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/joedoe-dev",
    github: "github.com/joedoe",
    website: "joedoe.dev",
    custom_links: [],
    image: "",
  },
  skills: [
    {
      category: "Frontend",
      items: [
        "React",
        "JavaScript",
        "TypeScript",
        "HTML",
        "CSS",
        "Tailwind CSS",
      ],
    },
    {
      category: "Backend",
      items: ["Node.js", "Express.js", "REST APIs"],
    },
    {
      category: "Databases",
      items: ["MongoDB", "MySQL"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Postman", "Vercel"],
    },
    {
      category: "Fundamentals",
      items: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming",
      ],
    },
  ],
  experience: [
    {
      company: "TechNova Inc.",
      position: "Frontend Developer Intern",
      start_date: "2024-11",
      end_date: "2025-05",
      is_current: false,
      description:
        "Developed responsive UI components using React and Tailwind CSS\nImproved application performance by 30% through code splitting and lazy loading\nIntegrated REST APIs for dynamic data rendering\nCollaborated with backend team to enhance API efficiency\nParticipated in Agile development cycles and code reviews",
    },
  ],
  project: [
    {
      name: "ResumeAI Builder",
      date: "2024-05",
      link: "https://resumeai-demo.vercel.app",
      description:
        "Built an AI-powered resume builder using React, Node.js, and MongoDB\nImplemented dynamic form handling and real-time preview functionality\nIntegrated Gemini API to generate resume content automatically\nDesigned reusable UI components using Tailwind CSS\nDeployed and optimized application on Vercel",
    },
    {
      name: "E-commerce Platform",
      date: "2025-03",
      link: "https://shopdemo.vercel.app",
      description:
        "Developed a scalable e-commerce platform using the MERN stack\nImplemented authentication and authorization using JWT\nBuilt REST APIs for product, cart, and order management\nOptimized database queries improving performance by 25%",
    },
  ],
  education: [
    {
      institution: "University of California",
      degree: "Bachelor of Science",
      field: "Computer Science",
      graduation_date: "2024-11",
      gpa: "3.8",
    },
  ],
  certification: [
    {
      certificate_name: "Full Stack Web Development",
      issuer: "Coursera",
      issue_date: "2024-01",
      credential_url: "CourseraCertifictae0130123.com",
      description:
        "Gained practical experience in full-stack development including REST APIs, authentication, and database design using MERN stack.",
    },
  ],
  achievements: [
    {
      title: "Solved 500+ problems on LeetCode",
      date: "2024-02",
      link: "https://leetcode.com/joedoe",
      description:
        "Solved over 500 data structures and algorithms problems focusing on arrays, graphs, and dynamic programming.",
    },
    {
      title: "Ranked in top 5% in coding contests",
      date: "2023-09",
      link: "https://codechef.com/users/joedoe",
      description:
        "Ranked in the top 5% among global participants in competitive programming contests.",
    },
    {
      title: "Built 5+ Full-Stack Projects",
      date: "2024-06",
      description:
        "Developed and deployed multiple full-stack applications using MERN stack with authentication and REST APIs.",
    },
  ],
};

export const ensureDemoResumeForUser = async (userId) => {
  const existingDemoResume = await Resume.findOne({ userId, isDemo: true });

  if (existingDemoResume) {
    return existingDemoResume;
  }

  try {
    return await Resume.create({
      userId,
      ...demoResumeTemplate,
    });
  } catch (error) {
    // If two requests race at the same time, the unique index may reject one of them.
    // In that case, just fetch the already-created demo resume instead of failing signup.
    if (error?.code === 11000) {
      return Resume.findOne({ userId, isDemo: true });
    }

    throw error;
  }
};
