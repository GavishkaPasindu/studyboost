// Using gemini-2.0-flash: confirmed available on v1beta free tier
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function callGemini(prompt: string, apiKey: string): Promise<string> {
  if (!apiKey) throw new Error('Please enter your Gemini API key.');

  const res = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
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
