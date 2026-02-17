from google import genai
from ..config import GEMINI_API_KEY

client = genai.Client(api_key=GEMINI_API_KEY)


def ask_chatbot(summary, question):

    context = f"""
    You are a petroleum geologist analyzing well log data.

    Curve Statistics:
    Mean: {summary['mean']:.2f}
    Std Dev: {summary['std']:.2f}
    Min: {summary['min']:.2f}
    Max: {summary['max']:.2f}
    Data Points: {summary['count']}

    User Question:
    {question}

    Provide a professional, geological interpretation.
    """

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=context
        )
        return response.text
    except Exception as e:
        return f"Chatbot error: {str(e)}"
