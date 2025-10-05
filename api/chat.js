/**
 * Chat API endpoint - redirects to OpenAI API handler
 * This maintains backward compatibility with existing code
 */
import openaiHandler from './openai.js';

export default async function handler(req, res) {
  // Redirect to OpenAI handler for actual AI responses
  return openaiHandler(req, res);
}
