import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, default: "Untitled Resume" },
    isDemo: { type: Boolean, default: false },
    public: { type: Boolean, default: false },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3b82f6" },
    font_family: { type: String, default: "Arial, sans-serif" },
    professional_summary: { type: String, default: "" },
    skills: [
      {
        category: { type: String, default: "" },
        items: [{ type: String }],
      },
    ],
    personal_info: {
      image: { type: String, default: "" },
      full_name: { type: String, default: "" },
      profession: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
      custom_links: [
        {
          label: { type: String, default: "" },
          url: { type: String, default: "" },
        },
      ],
    },
    experience: [
      {
        company: { type: String },
        position: { type: String },
        start_date: { type: String },
        end_date: { type: String },
        description: { type: String },
        is_current: { type: Boolean },
      },
    ],
    project: [
      {
        name: { type: String },
        type: { type: String },
        date: { type: String },
        description: { type: String },
        link: { type: String },
        linkLabel: { type: String },
      },
    ],
    education: [
      {
        institution: { type: String },
        degree: { type: String },
        field: { type: String },
        graduation_date: { type: String },
        gpa: { type: String },
      },
    ],
    certification: [
      {
        certificate_name: { type: String },
        description: { type: String },
        issuer: { type: String },
        issue_date: { type: String },
        credential_url: { type: String },
        linkLabel: { type: String },
      },
    ],
    achievements: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: String },
        link: { type: String },
        linkLabel: { type: String },
      },
    ],
  },
  { timestamps: true, minimize: false }
);

ResumeSchema.index(
  { userId: 1, isDemo: 1 },
  { unique: true, partialFilterExpression: { isDemo: true } }
);

const Resume = mongoose.model("Resume", ResumeSchema);

export default Resume;
