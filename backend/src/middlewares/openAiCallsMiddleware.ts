
// Importing necessary modules
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export default async function callOpenAI(req: Request, res: Response, next: NextFunction) {
  try {
    // Define the data for the API call
    const prompt = 'Improve grammar and rewrite to a clearer and more conscise, measurable todo item: "{text}"';
    const maxTokens = 60;

    // Make the API call
    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt,
      max_tokens: maxTokens,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    // Attach the response data to the request object
    req.openAIData = response.data.choices[0].text;

    // Call the next middleware function
    next();
  } catch (err) {
    // If something goes wrong, pass the error to the error-handling middleware
    next(err);
  }
}



