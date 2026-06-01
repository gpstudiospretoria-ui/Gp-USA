import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import nodemailer from "nodemailer";

// Ensure process.env is populated early
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3000;

// Parse typical JSON and URL bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy initialize the Google GenAI client to preserve system stability if key is missing on start
let _aiClient: GoogleGenAI | null = null;
function getGenAIClient(): GoogleGenAI {
  if (!_aiClient) {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) {
      throw new Error("Neither GEMINI_API_KEY nor GOOGLE_API_KEY environment variable is configured in Secrets.");
    }
    _aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return _aiClient;
}

// Mail notifier function to backup each draft to gpstudiospretoria@gmail.com
async function sendDraftEmail(serviceId: string, fields: any, draftData: any) {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  console.log(`[Email Integration] Preparing to email backup draft for service "${serviceId}" to gpstudiospretoria@gmail.com...`);

  // Build the email body contents
  let fieldsHtml = "";
  if (fields && typeof fields === "object") {
    fieldsHtml = Object.entries(fields)
      .map(([key, val]) => `
        <tr style="border-bottom: 1px solid #f0f0f0;">
          <td style="padding: 10px; font-weight: bold; text-transform: uppercase; font-size: 11px; width: 140px; color: #555555; font-family: sans-serif;">${key}</td>
          <td style="padding: 10px; font-size: 13px; color: #111111; font-family: sans-serif;">${val}</td>
        </tr>
      `)
      .join("");
  }

  let structureHtml = "";
  if (draftData.structure && Array.isArray(draftData.structure)) {
    structureHtml = draftData.structure
      .map((sec: any) => {
        let bpList = "";
        if (sec.bulletPoints && Array.isArray(sec.bulletPoints) && sec.bulletPoints.length > 0) {
          bpList = `<ul style="margin: 8px 0 0 0; padding-left: 20px; color: #4b5563;">` +
            sec.bulletPoints.map((bp: string) => `<li style="margin-bottom: 4px; font-size: 13px; font-family: sans-serif;">${bp}</li>`).join("") +
            `</ul>`;
        }
        return `
          <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 20px; background-color: #f8fafc;">
            <h4 style="margin: 0 0 8px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.1em; color: #0a0c14; font-family: sans-serif;">${sec.sectionName}</h4>
            <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.6; font-family: sans-serif;">${sec.content}</p>
            ${bpList}
          </div>
        `;
      })
      .join("");
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 20px; color: #1e293b; line-height: 1.5; background-color: #f1f5f9;">
      <div style="background-color: #0a0c14; padding: 30px; text-align: center; border-radius: 16px 16px 0 0; border-bottom: 4px solid #10b981;">
        <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 0.15em; font-family: sans-serif;">GP STUDIO PRETORIA</h2>
        <span style="color: #94a3b8; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; display: block; margin-top: 5px; font-family: sans-serif;">High-Impact Sandbox Blueprint Draft</span>
      </div>
      
      <div style="background-color: #ffffff; padding: 30px; border-radius: 0 0 16px 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
        <p style="font-size: 14px; color: #475569; margin-top: 0; font-family: sans-serif;">An interactive draft has been generated in the sandbox workspace. See the parameters and result below:</p>
        
        <h3 style="color: #0f172a; font-size: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 30px; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">Submitted Parameters</h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          ${fieldsHtml}
        </table>
        
        <h3 style="color: #0f172a; font-size: 15px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 30px; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">Generated Draft Result</h3>
        <div style="font-size: 16px; font-weight: bold; color: #0f172a; margin-bottom: 15px; font-family: sans-serif;">${draftData.title || "Untitled Draft"}</div>
        
        ${structureHtml}
        
        <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 15px; margin-top: 30px; border-radius: 4px;">
          <h4 style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #15803d; font-family: sans-serif;">GP Studio Pretoria Strategic Advice</h4>
          <p style="margin: 0; font-size: 12px; color: #166534; font-family: monospace; white-space: pre-wrap;">${draftData.strategicNotes}</p>
        </div>
      </div>
      
      <div style="text-align: center; margin-top: 20px; font-size: 11px; color: #64748b; text-transform: uppercase; letter-spacing: 0.05em; font-family: sans-serif;">
        &copy; 2026 GP STUDIO PRETORIA. ALWAYS ENGAGED.
      </div>
    </div>
  `;

  if (!host || !user || !pass) {
    console.warn("[Email Integration] Skipping draft sending - SMTP_HOST, SMTP_USER, or SMTP_PASS environment variables are missing.");
    console.log("[Email Integration] Logged simulated email: Sending draft with title:", draftData.title);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465, // true for port 465, false for 587
      auth: {
        user,
        pass,
      },
      tls: {
       rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: `"GP Studio Sandbox" <${user}>`,
      to: "gpstudiospretoria@gmail.com",
      subject: `[Sandbox Draft Alert] New ${serviceId.toUpperCase()}: ${draftData.title || "User Outline"}`,
      html: emailHtml,
    });

    console.log("[Email Integration] Draft notification successfully transmitted to gpstudiospretoria@gmail.com!");
  } catch (err) {
    console.error("[Email Integration] Error while sending draft notification email:", err);
  }
}

// REST API Route for instant drafting
app.post("/api/generate-draft", async (req, res) => {
  const { serviceId, fields } = req.body;

  if (!serviceId || !fields) {
    return res.status(400).json({ error: "Missing serviceId or fields payload." });
  }

  try {
    const ai = getGenAIClient();
    
    // Construct target custom-tailored system context and prompts for each Pretoria doc service
    let promptObjective = "";
    let systemInstruction = "";

    if (serviceId === "resume") {
      const f = fields as { fullName: string; targetRole: string; experienceYears: string; keySkills: string; primaryAchievements: string };
      systemInstruction = "You are a professional Executive CV designer and ATS expert in Pretoria, South Africa. Create stunning, ATS-optimised resumes.";
      promptObjective = `Create a top-tier Professional CV outline and drafting framework for:
- Full Name: ${f.fullName}
- Target Role: ${f.targetRole}
- Years of Experience: ${f.experienceYears}
- Key Skills: ${f.keySkills}
- Primary Achievements: ${f.primaryAchievements}

Format the response exactly matching the required JSON schema, covering professional executive summary, targeted core competencies section, professional experience segment, and measurable performance accomplishments. Limit phrasing to highly active power-verbs suitable for target roles.`;
    } else if (serviceId === "social") {
      const f = fields as { businessName: string; niche: string; primaryProduct: string; targetAudience: string; brandTone: string };
      systemInstruction = "You are a conversion-focussed Social Media Copywriter and Growth strategist in Pretoria. Create high-energy, copy-writing packs.";
      promptObjective = `Build a high-impact social media batch pack (5 comprehensive target posts) for:
- Business: ${f.businessName}
- Market Niche: ${f.niche}
- Core Product/Service: ${f.primaryProduct}
- Target Audience: ${f.targetAudience}
- Brand Voice/Tone: ${f.brandTone}

Formulate posts focusing on conversions, pain points, core offering benefits, and a clear Call To Action. For each post, map its section to include the Caption, targeted Hashtags, and a visual Graphic Recommendation.`;
    } else if (serviceId === "business") {
      const f = fields as { companyName: string; conceptDetails: string; revenueModel: string; fundingTarget: string; keyCompetitors: string };
      systemInstruction = "You are a venture capital advisor and business plan consultant based in Gauteng, South Africa. Design punchy 1-Page Business Outlines.";
      promptObjective = `Draft an investor-grade 1-Page Business Plan overview for:
- Venture Name: ${f.companyName}
- Core Business Model/Value Proposition: ${f.conceptDetails}
- Revenue and Monetization Model: ${f.revenueModel}
- Funding Target ZAR/USD: ${f.fundingTarget}
- Key Competitors & Moat: ${f.keyCompetitors}

Ensure the output maps precisely with sections like Problem Statement, Market Opportunity, Unique Moat, Primary Monetisation Route, and Capital Allocation Plan. Try to align ZAR equivalents where relevant to Gauteng conditions.`;
    } else if (serviceId === "essay") {
      const f = fields as { topic: string; academicLevel: string; keyArguments: string; thesisClaim: string; formattingStyle: string };
      systemInstruction = "You are an elite academic editor and doctoral thesis advisor from South Africa. Model structured argumentative essay outlines.";
      promptObjective = `Develop an academically structured essay framework for:
- Proposed Topic: ${f.topic}
- Target Level: ${f.academicLevel}
- Core Arguments: ${f.keyArguments}
- Central Thesis/Claim: ${f.thesisClaim}
- Required Referencing Style (e.g. Harvard, APA, Chicago): ${f.formattingStyle}

Detail sections for Introduction (with thesis placement), Body Argument 1, Body Argument 2, Counter-Argument handling, and Conclusion. Give precise guidance on style execution parameters, structuring paragraphs, and citation targets.`;
    } else {
      return res.status(400).json({ error: "Invalid service identifier." });
    }

    // Call the model with structured schema output matching types
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptObjective,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Title of the drafted document pack" },
            structure: {
              type: Type.ARRAY,
              description: "Array of logical sections containing the drafted content material",
              items: {
                type: Type.OBJECT,
                properties: {
                  sectionName: { type: Type.STRING, description: "Heading or section name" },
                  content: { type: Type.STRING, description: "Main narrative or instructions for this segment" },
                  bulletPoints: {
                    type: Type.ARRAY,
                    description: "Detailed specific bullet points or items for the section",
                    items: { type: Type.STRING }
                  }
                },
                required: ["sectionName", "content"]
              }
            },
            strategicNotes: { 
              type: Type.STRING, 
              description: "High-value professional advice tailored to South African or global delivery targets to maximize conversion / impact" 
            }
          },
          required: ["title", "structure", "strategicNotes"]
        }
      }
    });

    if (!response.text) {
      return res.status(500).json({ error: "Empty draft returned from standard AI generator." });
    }

    const draftData = JSON.parse(response.text);

    // Asynchronously email the compiled draft to gpstudiospretoria@gmail.com
    sendDraftEmail(serviceId, fields, draftData).catch((err) => {
      console.error("[Email Notification Trigger Exception]:", err);
    });

    return res.json(draftData);

  } catch (error: any) {
    console.error("Gemini server-side calling error:", error);
    return res.status(500).json({ 
      error: error.message || "An exception occurred while constructing document architecture." 
    });
  }
});

// Configure Vite middleware or serve built frontend
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Configuring development environment via Vite middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production files from static dist path...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GP Studio Pretoria active at http://localhost:${PORT}`);
  });
}

bootstrap();
