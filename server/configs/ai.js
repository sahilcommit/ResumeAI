const GEMINI_BASE_URL = "https://generativelanguage.googleapis.com/v1beta";

const DEFAULT_FALLBACK_MODELS = [
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash",
];

const normalizeModelName = (model) =>
  model.startsWith("models/") ? model : `models/${model}`;

const getModelNames = () => {
  const primaryModel = process.env.GEMINI_MODEL;

  if (!primaryModel) {
    throw new Error("GEMINI_MODEL environment variable not set");
  }

  const allModels = [primaryModel, ...DEFAULT_FALLBACK_MODELS];
  const uniqueModels = [...new Set(allModels.filter(Boolean))];

  return uniqueModels.map(normalizeModelName);
};

const getApiKey = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable not set");
  }

  return apiKey;
};

const extractTextFromResponse = (responseData) => {
  const text = responseData?.candidates?.[0]?.content?.parts
    ?.map((part) => part?.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Gemini returned an empty response");
  }

  return text;
};

const createAiError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const isQuotaError = (message = "") => {
  const normalizedMessage = message.toLowerCase();

  return (
    normalizedMessage.includes("quota exceeded") ||
    normalizedMessage.includes("rate limit") ||
    normalizedMessage.includes("billing details") ||
    normalizedMessage.includes("resource_exhausted")
  );
};

const generateContent = async ({
  systemInstruction,
  userContent,
  responseMimeType,
}) => {
  const modelNames = getModelNames();
  let lastError;
  let lastQuotaError;
  const attemptedModels = [];

  for (const modelName of modelNames) {
    try {
      // We try the primary Gemini model first, then fall back to the lighter backup models.
      // This makes the app more resilient to rate limits/model availability issues.
      attemptedModels.push(modelName);
      const response = await fetch(
        `${GEMINI_BASE_URL}/${modelName}:generateContent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-goog-api-key": getApiKey(),
          },
          body: JSON.stringify({
            ...(systemInstruction
              ? {
                  system_instruction: {
                    parts: [{ text: systemInstruction }],
                  },
                }
              : {}),
            contents: [
              {
                role: "user",
                parts: [{ text: userContent }],
              },
            ],
            ...(responseMimeType
              ? {
                  generationConfig: {
                    responseMimeType,
                  },
                }
              : {}),
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        const errorMessage =
          responseData?.error?.message || "Gemini API request failed";
        const modelError = createAiError(`${modelName}: ${errorMessage}`, response.status);

        if (isQuotaError(errorMessage)) {
          lastQuotaError = modelError;
        }

        throw modelError;
      }

      return extractTextFromResponse(responseData);
    } catch (error) {
      lastError = error;
    }
  }

  if (lastQuotaError) {
    throw createAiError(
      "AI features are temporarily unavailable because the Gemini API quota has been reached. Please try again shortly or update the Gemini billing/quota settings for this project.",
      429
    );
  }

  throw (
    lastError ||
    createAiError(
      `All Gemini model requests failed. Attempted: ${attemptedModels.join(", ")}`
    )
  );
};

const ai = {
  generateText: ({ systemInstruction, userContent }) =>
    generateContent({ systemInstruction, userContent }),
  generateJson: async ({ systemInstruction, userContent }) => {
    const text = await generateContent({
      systemInstruction,
      userContent,
      responseMimeType: "application/json",
    });

    return JSON.parse(text);
  },
};

export default ai;
