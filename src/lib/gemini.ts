// Using gemini-flash-lite-latest as it is less prone to "High Demand" 503 errors on the free tier
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent';

export async function callGemini(prompt: string, apiKey?: string): Promise<string> {
  const key = apiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || 'AIzaSyCrxG2_dA0WbazxyuslrVIYUpYCIrG2jOk';
  if (!key) throw new Error('Please enter your Gemini API key in the environment variables.');

  const res = await fetch(`${GEMINI_API_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512,   // reduced to stay within free-tier token budget
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } }).error?.message || '';

    // Friendly quota message
    if (res.status === 429 || msg.toLowerCase().includes('quota')) {
      throw new Error(
        '⏳ Free-tier rate limit reached. Please wait 60 seconds and try again. ' +
        '(Gemini free tier allows 15 requests/minute.)'
      );
    }

    // Friendly 503 high demand message
    if (res.status === 503 || msg.toLowerCase().includes('high demand') || msg.toLowerCase().includes('overloaded')) {
      throw new Error(
        'The free Google Gemini model is currently experiencing extremely high global demand and is temporarily full. Please try again in a few minutes!'
      );
    }

    throw new Error(msg || `API error: ${res.status}`);
  }

  const data = await res.json() as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
    'No response generated.'
  );
}

export const PROMPTS = {
  summarize: (notes: string) =>
    `Summarize the following lecture notes using clear bullet points. Focus on key concepts only. Keep it under 200 words.\n\nNotes:\n${notes}`,

  flashcards: (notes: string) =>
    `Create 5 flashcards from these lecture notes. Format:\nQ: [Question]\nA: [Answer]\n\nBe concise.\n\nNotes:\n${notes}`,

  examQuestions: (notes: string) =>
    `Generate 4 exam-style questions from these lecture notes. Mix short answer and multiple choice. Number each. Add brief answer hints in brackets.\n\nNotes:\n${notes}`,
};
