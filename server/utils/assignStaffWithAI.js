import groq from "./aiClient.js";

export const assignStaffWithAI = async (complaint, availableStaff) => {
  try {
    const prompt = `
You are an infrastructure complaint triage system for a university campus.
Your job is to assign the correct staff, priority, and category to a complaint.

=== PRIORITY RULES (follow strictly) ===

CRITICAL — Assign when there is IMMEDIATE danger to people or property:
- Fire, smoke, sparks, electrical shock risk
- Water flooding (large scale)
- Gas leak
- Structural collapse risk
- Any situation that can injure or kill someone RIGHT NOW

HIGH — Assign when a service is completely disrupted for many people:
- Entire floor or building affected
- Network outage, power outage, water supply disruption
- Multiple users/rooms impacted
- Critical service unavailable (e.g., internet down in entire block)

MEDIUM — Assign for functional issues affecting limited users:
- Single room affected
- Equipment not working (fan, light, projector, cooler)
- Needs repair but no immediate danger
- Normal maintenance requests

LOW — Assign for cosmetic, aesthetic, or non-functional issues:
- Paint peeling or wall stains
- Furniture scratches or dents
- Small or hairline wall cracks (non-structural)
- Notice board damage
- Minor cleanliness issues
- Anything that does NOT affect usability or safety
- Can be scheduled and fixed later without urgency

=== STRICT RULES ===
1. If the complaint mentions paint, scratch, stain, peel, cosmetic, notice board, or furniture damage → ALWAYS assign LOW.
2. If only one room or one person is affected and there is no danger → NEVER assign HIGH or CRITICAL.
3. If multiple rooms or the whole building is affected → consider HIGH.
4. If someone's life or safety is at immediate risk → CRITICAL.
5. Do NOT over-prioritize. A broken fan is MEDIUM, not HIGH. A wall scratch is LOW, not MEDIUM.
6. Match the complaint to the most accurate aiCategory from campus infrastructure context.

=== STAFF SELECTION RULES ===
- Match staff expertise to the complaint category.
- Prefer staff with fewer active complaints (lower activeCount).
- If no matching expertise, assign the staff with the lowest activeCount.

=== COMPLAINT ===
Category: ${complaint.category}
Summary: ${complaint.summary}
Description: ${complaint.description}

=== AVAILABLE STAFF ===
${availableStaff
  .map(
    (s) =>
      `Name: ${s.name} | Email: ${s.email} | Expertise: ${s.expertise} | Active Complaints: ${s.activeCount}`,
  )
  .join("\n")}

=== OUTPUT FORMAT ===
Return ONLY a valid JSON object. No explanation, no markdown, no extra text.
{
  "email": "staff@email.com",
  "priority": "Low | Medium | High | Critical",
  "aiCategory": "Corrected Category Name"
}
`.trim();

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a complaint triage assistant. You must respond with valid JSON only. No markdown, no explanation.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.1,
      max_tokens: 150,
    });

    const text = completion.choices[0].message.content.trim();

    console.log("RAW AI RESPONSE:", text);

    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;

    if (jsonStart === -1 || jsonEnd === 0) {
      console.warn("AI returned no valid JSON, using fallback.");
      return {
        email: availableStaff[0]?.email || "",
        priority: "Medium",
        aiCategory: complaint.category,
      };
    }

    const parsed = JSON.parse(text.slice(jsonStart, jsonEnd));

    const validPriorities = ["Low", "Medium", "High", "Critical"];

    const result = {
      email: parsed.email || availableStaff[0]?.email || "",
      priority: validPriorities.includes(parsed.priority)
        ? parsed.priority
        : "Medium",
      aiCategory: parsed.aiCategory || complaint.category,
    };

    console.log("AI RESULT:", result);

    return result;
  } catch (error) {
    console.error("AI Assignment Error:", error);
    return {
      email: availableStaff[0]?.email || "",
      priority: "Medium",
      aiCategory: complaint.category,
    };
  }
};
