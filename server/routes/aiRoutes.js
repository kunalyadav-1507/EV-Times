const express = require("express");
const { GoogleGenAI } = require("@google/genai");
const router = express.Router();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateDraft =
  require("../services/generateDraft");


const ExternalNews =
  require("../models/ExternalNews");

router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({
        message: "Topic is required",
      });
    }

    const prompt = `
Generate a news article in JSON format.

Requirements:

1. SEO optimized title
2. Summary (2-3 sentences)
3. News article (600-900 words)
4. Suggested category

Rules:
- Professional news tone
- Do not invent facts
- No speculation
- Clear paragraphs
- Return valid JSON only

Topic:
${topic}

Example:

{
  "title": "",
  "summary": "",
  "content": "",
  "category": ""
}
`;

    let response;

    for (let i = 0; i < 3; i++) {
      try {
        response = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: prompt,
        });

        break;
      } catch (err) {

        if (i === 2) throw err;

        await new Promise(resolve =>
          setTimeout(resolve, 3000)
        );
      }
    }

    res.json({
      result: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "AI generation failed",
    });
  }
});

router.post(
  "/generate-draft/:id",
  async (req, res) => {

    try {

      const news =
        await ExternalNews.findById(
          req.params.id
        );

      if (!news) {

        return res.status(404).json({
          message:
            "News not found"
        });

      }

      await generateDraft(news);

res.status(200).json({
  success: true,
  news
});

    }

    catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          error.message

      });

    }

  }
);

module.exports = router;