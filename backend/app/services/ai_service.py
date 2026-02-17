import numpy as np
from google import genai  # Use the working library
# Assuming your config is in the parent directory
from ..config import GEMINI_API_KEY 

# Initialize the Client ONCE outside the function
client = genai.Client(api_key=GEMINI_API_KEY)

def analyze_curve(depth, values):
    if len(values) == 0:
        return {
            "summary": {},
            "interpretation": "No valid data points available."
        }

    summary = {
        "mean": float(np.mean(values)),
        "std": float(np.std(values)),
        "min": float(np.min(values)),
        "max": float(np.max(values)),
        "count": int(len(values))
    }

    # Professional Geologic Prompt
    prompt = f"""
    Context: Analysis of Well Log Curve Statistics.
    Data Summary: Mean {summary['mean']:.2f}, Std Dev {summary['std']:.2f}, Range {summary['min']:.2f}-{summary['max']:.2f}.
    
    Task: As an expert petroleum geologist, provide:
    1. Likely Lithology.
    2. Reservoir Quality.
    3. Hydrocarbon Potential.
    4. Confidence Level.
    """

    try:
        # Use the exact model and method that worked in your test
        response = client.models.generate_content(
            model="gemini-2.5-flash", 
            contents=prompt
        )
        interpretation = response.text

    except Exception as e:
        # If it hits a 429, we'll know for sure here
        interpretation = f"AI interpretation failed. Error: {str(e)}"

    return {
        "summary": summary,
        "interpretation": interpretation
    }