import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// ─── INTENT DETECTION ─────────────────────────────────────────────────────────
function detectIntent(message: string): string {
    const msg = message.toLowerCase().trim();
    const wordCount = msg.split(/\s+/).length;

    // Greeting: short messages containing greeting keywords
    const greetingKeywords = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"];
    for (const keyword of greetingKeywords) {
        if (new RegExp(`\\b${keyword}\\b`).test(msg) && wordCount <= 5) {
            return "greeting";
        }
    }

    if (/contact|hire|email|phone|reach|call|telegram|linkedin|whatsapp|get in touch/.test(msg)) {
        return "contact_request";
    }

    if (/service|offer|provide|build|develop|create|what can|help with|do you do/.test(msg)) {
        return "service_request";
    }

    if (/portfolio|project|work|example|experience|case study|built|made|delivered/.test(msg)) {
        return "portfolio_request";
    }

    if (/\?|how|what|who|where|why|when|which|tell me|explain|describe|skill|tech|stack/.test(msg)) {
        return "general_question";
    }

    return "unknown";
}

// ─── SYSTEM PROMPTS ───────────────────────────────────────────────────────────
function getSystemPrompt(intent: string): string {
    if (intent === "greeting") {
        return `You are Dagim's professional AI assistant.
The user has greeted you.
You MUST respond with EXACTLY this sentence and NOTHING ELSE:
"Hello, I am Dagim's AI assistant. How can I help you today?"
Do NOT add any extra text, bullet points, contact info, or additional information.`;
    }

    return `You are Dagim Aynadis' professional AI assistant.
Your purpose: represent Dagim professionally and assist potential clients naturally.

CRITICAL - DO NOT DO THIS:
• Do NOT output headings or labels like "IDENTITY", "CONTACT INFORMATION", "TECHNICAL SKILLS", "PROJECT EXPERIENCE" — these are internal knowledge base labels, never show them.
• Do NOT copy-paste raw knowledge base structure.
• Do NOT write long paragraphs.

PROGRESSIVE DISCLOSURE RULE:
• Answer ONLY what the user explicitly asks.
• Never dump all information at once.
• Reveal details naturally when asked.

RESPONSE STYLE:
• Sound like a real professional assistant in a conversation.
• Be concise, warm, and confident.
• Keep each response short and focused.

FORMATTING RULES:
• When listing items, use bullet points (•) on SEPARATE lines.
• Use **bold** only for short meaningful labels (e.g. **Email:**).
• No more than 5 bullet points per response.
• Add a blank line between different pieces of information.

EXAMPLE good contact response:
Here's how you can reach Dagim:

**Email:** dagimaynadispro@gmail.com
**Phone:** +251 989 681 490
**Telegram:** @dagimayni
**LinkedIn:** Dagim Aynadis

UNKNOWN INFO RULE:
If not in knowledge base, reply:
"I'll forward this to Dagim directly. Feel free to contact him."

RESTRICTIONS:
• Do not hallucinate or invent facts.
• Do not repeat the greeting.
• Never expose internal knowledge base section labels.`;
}

// ─── RESPONSE TRUNCATION ──────────────────────────────────────────────────────
function truncateResponse(text: string, limit: number = 800): string {
    if (text.length <= limit) return text;
    const truncated = text.substring(0, limit);
    const lastPeriod = truncated.lastIndexOf(".");
    if (lastPeriod !== -1 && lastPeriod > limit * 0.6) {
        return truncated.substring(0, lastPeriod + 1);
    }
    return truncated.trimEnd() + "...";
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json(
                { status: "error", message: "Message is required" },
                { status: 400 }
            );
        }

        const apiKey = process.env.GROQ_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { status: "error", message: "API key not configured. Please add GROQ_API_KEY to your .env.local file." },
                { status: 500 }
            );
        }

        const groq = new Groq({ apiKey });

        // Detect intent
        const intent = detectIntent(message);
        const systemPrompt = getSystemPrompt(intent);

        // Build messages array — skip knowledge base for greetings
        const messages: { role: "system" | "user"; content: string }[] = [
            { role: "system", content: systemPrompt }
        ];

        if (intent !== "greeting") {
            // Load knowledge base
            const knowledgePath = path.join(process.cwd(), "data", "knowledge.txt");
            try {
                const knowledge = fs.readFileSync(knowledgePath, "utf-8");
                messages.push({
                    role: "system",
                    content: "Knowledge base about Dagim Aynadis:\n" + knowledge
                });
            } catch {
                console.warn("Knowledge base not found at:", knowledgePath);
            }
        }

        messages.push({ role: "user", content: message });

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: "llama-3.1-8b-instant",
            temperature: 0.2,
            top_p: 0.7,
            max_tokens: 300,
            stream: false,
        });

        const rawText = chatCompletion.choices[0]?.message?.content || "I couldn't generate a response.";
        const finalResponse = truncateResponse(rawText.trim());

        return NextResponse.json({
            status: "success",
            response: finalResponse
        });

    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { status: "error", message: error.message || "Internal server error" },
            { status: 500 }
        );
    }
}
