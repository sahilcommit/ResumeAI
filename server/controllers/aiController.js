import ai from "../configs/ai.js";
import Resume from "../models/Resume.js";

export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const enhancedContent = await ai.generateText({
      // We keep prompting on the server so frontend stays simple
      // and prompt logic lives in one controlled place.
      systemInstruction:
        "You are an expert in resume writing. Your task is to enhance the professional summary of a resume. The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. Only return the final text.",
      userContent,
    });

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const enhancedContent = await ai.generateText({
      systemInstruction:
        "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Only return the final text.",
      userContent,
    });

    return res.status(200).json({ enhancedContent });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};

export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;

    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt =
      "You are an expert AI agent to extract data from resumes into clean JSON for a resume builder application.";

    const userPrompt = `Extract data from this resume: ${resumeText}

Provide valid JSON only with this shape:
{
  "professional_summary": "",
  "skills": [
    {
      "category": "",
      "items": [""]
    }
  ],
  "personal_info": {
    "image": "",
    "full_name": "",
    "profession": "",
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": "",
    "website": "",
    "custom_links": [
      {
        "label": "",
        "url": ""
      }
    ]
  },
  "experience": [
    {
      "company": "",
      "position": "",
      "start_date": "",
      "end_date": "",
      "description": "",
      "is_current": false
    }
  ],
  "project": [
    {
      "name": "",
      "type": "",
      "date": "",
      "description": "",
      "link": "",
      "linkLabel": ""
    }
  ],
  "education": [
    {
      "institution": "",
      "degree": "",
      "field": "",
      "graduation_date": "",
      "gpa": ""
    }
  ],
  "certification": [
    {
      "certificate_name": "",
      "description": "",
      "issuer": "",
      "issue_date": "",
      "credential_url": "",
      "linkLabel": ""
    }
  ],
  "achievements": [
    {
      "title": "",
      "description": "",
      "date": "",
      "link": "",
      "linkLabel": ""
    }
  ]
}`;

    const parsedData = await ai.generateJson({
      systemInstruction: systemPrompt,
      userContent: userPrompt,
    });

    // AI gives us structured resume content, but we still store it as a normal editable resume.
    const newResume = await Resume.create({
      userId: req.userId,
      title,
      ...parsedData,
    });

    return res.status(200).json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(error.statusCode || 400).json({ message: error.message });
  }
};
