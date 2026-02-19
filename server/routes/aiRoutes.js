import express from "express";
import groq from "../utils/aiClient.js";

const router = express.Router();

router.post("/suggest-complaint", async (req, res) => {
  try {
    const { category, location } = req.body;

    const prompt = `
Write a simple and clear university complaint.

Category: ${category}
Location: ${location || "Not specified"}

Keep it short.
Use simple English.
Do not use difficult words.
Sound like a student reporting an issue.

Respond ONLY in JSON:
{
  "summary": "",
  "description": ""
}
`;

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const text = completion.choices[0].message.content;

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const cleanJson = text.slice(jsonStart, jsonEnd);

    const parsed = JSON.parse(cleanJson);

    res.json({ success: true, suggestion: parsed });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "AI failed",
    });
  }
});

export default router;
