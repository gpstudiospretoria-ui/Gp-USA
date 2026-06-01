import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

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
