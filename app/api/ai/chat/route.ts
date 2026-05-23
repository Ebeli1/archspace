import { NextRequest } from 'next/server';

// This will be enabled when you add your Anthropic API key
// For now, we'll use mock responses

export async function POST(req: NextRequest) {
  try {
    const { messages, feature, imageBase64 } = await req.json();

    // Mock response - replace with real Claude API when key is added
    let mockResponse = '';
    
    if (feature === 'studio') {
      mockResponse = `## ArchSpace Design Brief

**Project:** Based on your description  
**Style:** Contemporary Nigerian  
**Estimated Budget Range:** ₦20M - ₦30M

### Room Breakdown
| Room | Key Features |
|------|--------------|
| Living Area | Open plan, natural light prioritized |
| Bedrooms | Well-ventilated, built-in storage |

### Next Steps
Share this brief with an architect or browse our marketplace.`;
    } else if (feature === 'remodel') {
      mockResponse = `## Remodel Recommendations

Based on your uploaded plan, here are suggested improvements:

1. **Improve natural lighting** — Consider adding larger windows on the south wall.

2. **Optimize kitchen layout** — Move the sink to the exterior wall for better ventilation.

### Estimated Cost
₦30,000 - ₦50,000 for revised drawings`;
    } else {
      mockResponse = `I've analyzed our catalogue and found designs matching your needs. Check the Browse page for personalized recommendations!`;
    }

    // Simulate streaming response
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for (const char of mockResponse) {
          controller.enqueue(encoder.encode(char));
          await new Promise(resolve => setTimeout(resolve, 10));
        }
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (err) {
    console.error('AI chat error:', err);
    return new Response(JSON.stringify({ error: 'AI service unavailable' }), { status: 500 });
  }
}