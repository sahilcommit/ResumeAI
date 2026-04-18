import fs from "fs";
import imageKit from "../configs/imageKit.js";
import Resume from "../models/Resume.js";

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;
    // New resumes start minimal on purpose.
    // The builder fills in the rest section by section.
    const newResume = await Resume.create({ userId: req.userId, title });

    return res
      .status(201)
      .json({ message: "Resume create successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const deleteResume = async (req, res) => {
  try {
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId: req.userId, _id: resumeId });

    return res.status(201).json({ message: "Resume deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ userId: req.userId, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // These fields are useful in Mongo, but not needed by the builder UI.
    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAt = undefined;

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const getPublicResumeById = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateResume = async (req, res) => {
  try {
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    let resumeDataCopy;

    if (typeof resumeData === "string") {
      // FormData sends nested JSON as a string, so parse it back when needed.
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      try {
        // ImageKit handles resize + optional background removal in one upload step.
        const response = await imageKit.files.upload({
          file: imageBufferData,
          fileName: "resume.png",
          folder: "user-resumes",
          transformation: {
            pre:
              "w-300,h-300,fo-face,z-0.45" +
              (removeBackground ? ",e-bgremove" : ""),
          },
        });

        resumeDataCopy.personal_info = {
          ...resumeDataCopy.personal_info,
          image: response.url,
        };
      } finally {
        // Temporary uploaded files should always be cleaned up, even if upload fails.
        fs.existsSync(image.path) && fs.unlinkSync(image.path);
      }
    }

    // All builder writes come through this single update path.
    const resume = await Resume.findOneAndUpdate(
      { userId: req.userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );

    return res.status(200).json({ message: "Saved successfully", resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
