const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateDraft = async (news) => {

    const prompt = `
Rewrite this news article.

Title:
${news.title}

Description:
${news.description}

Content:
${news.content}

Requirements:

1. SEO Title
2. Summary
3. 700-900 word article

Rules:

- Professional news tone
- Add useful background context
- Do not invent facts
- Do not speculate
- Do not use markdown
- Do not use #, ## or ### headings
- Do not use bullet points
- Use plain text paragraphs only
- Return JSON only

Example:

{
  "title": "",
  "summary": "",
  "content": ""
}
`;

    let response;

    for (let i = 0; i < 3; i++) {

        try {

            response =
                await ai.models.generateContent({

                    model: "gemini-3.1-flash-lite",

                    contents: prompt,

                });

            break;

        }

        catch (error) {

            if (error.status === 503) {

                console.log(
                    `Gemini busy. Retrying ${i + 1}/3...`
                );

                await new Promise(
                    resolve =>
                        setTimeout(resolve, 10000)
                );

            }

            else {

                throw error;

            }

        }

    }

    if (!response) {

        throw new Error(
            "Failed after 3 retries"
        );

    }

    const result =
        JSON.parse(response.text);

    news.aiTitle =
        result.title;

    news.aiSummary =
        result.summary;

    news.aiContent =
        result.content;

    news.status =
        "draft";

    news.processed =
        true;

    news.aiGenerated =
        true;

    news.draftSource =
        "system";

    news.draftGeneratedAt =
        new Date();

    await news.save();

    return news;
};

module.exports =
    generateDraft;