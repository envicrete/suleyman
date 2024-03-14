import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';

import redis from '#/lib/matter-gpt/redis';

interface RequestBody {
  imageUrl: string;
  theme: string;
  room: string;
}

interface StartResponse {
  urls: {
    get: string;
  };
}

interface FinalResponse {
  status: 'succeeded' | 'failed';
  output: string | null;
}

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(5, '1440 m'),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  // Rate Limiter Code
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get('x-real-ip');

    const result = await ratelimit.limit(ipIdentifier ?? '');

    if (!result.success) {
      return new Response(
        'Too many uploads in 1 day. Please try again in a 24 hours.',
        {
          status: 429,
          headers: new Headers({
            'X-RateLimit-Limit': result.limit.toString(),
            'X-RateLimit-Remaining': result.remaining.toString(),
          }),
        },
      );
    }
  }

  const { imageUrl, theme, room } = (await request.json()) as RequestBody;

  // POST request to Replicate to start the image restoration generation process
  const startResponse = await fetch(
    'https://api.replicate.com/v1/predictions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
      },
      body: JSON.stringify({
        version:
          '854e8727697a057c525cdb45ab037f64ecca770a1769cc52287c2e56472a247b',
        input: {
          image: imageUrl,
          prompt: `Interior showcase reflecting Pinterest and Architectural Digest's highest standards: detailed and realistic, emphasizing premium materials in a ${theme.toLowerCase()} ${room.toLowerCase()} setting. Features include wooden/stone/engineered flooring, vertical wooden/stone wall paneling, and precision-crafted mouldings and trims, alongside ultra-realistic plants. The design ensures material consistency and texture, maintaining high standards without overwhelming. Aim for cinematic quality, integrating materials seamlessly to enhance the ${room.toLowerCase()}'s aesthetic in a sophisticated manner.`,
          a_prompt:
            'Interior excellence: detailed, realistic, award-winning. Includes vertical wooden/stone wall paneling, engineered/wooden/stone flooring, decorative mouldings, and lifelike plants. Cinematic quality, complementing materials as per theme.',
          n_prompt:
            'Interior flaws: avoid longbody, low-res, anatomical errors (e.g., incorrect hands), poorly executed surfaces, and adding non-existent windows/doors. Unrealistic plants, awkward cropping, and lowest quality are to be avoided. Do not add windows where there are none. Do not add doors where there are none.',
        },
      }),
    },
  );

  const jsonStartResponse = (await startResponse.json()) as StartResponse;

  const endpointUrl = jsonStartResponse.urls.get;

  // GET request to get the status of the image restoration process & return the result when it's ready
  let restoredImage: string | null = null;
  while (!restoredImage) {
    // Loop in 1s intervals until the alt text is ready
    console.log('polling for result...');
    const finalResponse = await fetch(endpointUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + process.env.REPLICATE_API_KEY,
      },
    });
    const jsonFinalResponse = (await finalResponse.json()) as FinalResponse;

    if (jsonFinalResponse.status === 'succeeded') {
      restoredImage = jsonFinalResponse.output;
    } else if (jsonFinalResponse.status === 'failed') {
      break;
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  return NextResponse.json(
    restoredImage ? restoredImage : 'Failed to restore image',
  );
}
