import os
import asyncio
from pathlib import Path
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from google import genai
from google.genai import types

# Load .env from project root
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(dotenv_path=BASE_DIR / ".env")

api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError(f"GEMINI_API_KEY not found in {BASE_DIR / '.env'}.")

client = genai.Client(api_key=api_key)

app = FastAPI(title="Python 2 to 3 Migration API")

# Allow Next.js requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_PROMPT = """
You are an expert Python migration tool. 
Your sole responsibility is to convert legacy Python 2 code into clean, idiomatic, and valid Python 3 code.
Requirements:
1. Handle differences like print statements, integer division, xrange/range, dict methods (.iteritems(), .keys()), exception handling syntax, unicode/str changes, and renamed modules (e.g., ConfigParser -> configparser, urllib2 -> urllib.request).
2. Output ONLY the translated Python 3 code. Do not wrap in conversational text.
3. Do not include markdown formatting or backticks (e.g. no ```python or ```) unless explicitly asked; output strictly raw code.
"""

class ConversionRequest(BaseModel):
    code: str = Field(..., description="Legacy Python 2 source code")

class ConversionResponse(BaseModel):
    converted_code: str

@app.post("/convert", response_model=ConversionResponse)
async def convert_python2_to_python3(request: ConversionRequest):
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Input code cannot be empty.")

    max_retries = 3
    delay = 2

    for attempt in range(max_retries):
        try:
            response = await client.aio.models.generate_content(
                model="gemini-3.6-flash",
                contents=request.code,
                config=types.GenerateContentConfig(
                    system_instruction=SYSTEM_PROMPT,
                    temperature=0.1,
                )
            )

            result_text = response.text.strip()
            if result_text.startswith("```python"):
                result_text = result_text[9:]
            elif result_text.startswith("```"):
                result_text = result_text[3:]
            if result_text.endswith("```"):
                result_text = result_text[:-3]

            return ConversionResponse(converted_code=result_text.strip())

        except Exception as e:
            if ("503" in str(e) or "UNAVAILABLE" in str(e)) and attempt < max_retries - 1:
                await asyncio.sleep(delay)
                delay *= 2
                continue
            raise HTTPException(status_code=500, detail=f"Gemini API error: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "ok"}