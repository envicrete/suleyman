import type { roomType, themeType } from '#/lib/matter-gpt/dropdown-types';

import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';

import redis from '#/lib/matter-gpt/redis';
import { themeMappings } from '#/lib/matter-gpt/theme-mappings';

interface RequestBody {
  imageUrl: string;
  theme: themeType;
  room: roomType;
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

const ratelimit = redis
  ? new Ratelimit({
      redis: redis,
      limiter: Ratelimit.fixedWindow(20, '1440 m'),
      analytics: true,
    })
  : undefined;

export async function POST(request: Request) {
  if (ratelimit) {
    const headersList = headers();
    const ipIdentifier = headersList.get('x-real-ip');

    const result = await ratelimit.limit(ipIdentifier ?? '');

    if (!result.success) {
      return new Response(
        'Too many uploads in 1 day. Please try again in 24 hours.',
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

  const { flooringType, panelingType, plantType } = themeMappings[theme];

  const createPrompt = (
    theme: string,
    room: string,
    flooring: typeof flooringType,
    paneling: typeof panelingType,
    plants: string[],
  ) =>
    `Design an Architectural Digest magazine worthy ${room.toLowerCase()} in the ${theme.toLowerCase()} style, incorporating the following elements:\n\n` +
    `1. FLOORING: Choose ${flooring
      .filter((f) => f.type.toLowerCase().includes('wood'))
      .map((f) => `${f.type.toLowerCase()} (${f.variant.toLowerCase()})`)
      .join(' or ')}, emphasizing a natural and warm appearance.\n\n` +
    `2. PANELING: Opt for ${paneling
      .filter((p) => p.type.toLowerCase().includes('wood'))
      .map((p) => `${p.type.toLowerCase()} (${p.variant.toLowerCase()})`)
      .join(' or ')}, APPLIED TO A SINGLE WALL for depth and texture.\n\n` +
    `3. POTTED INDOOR PLANTS: INCLUDE TWO up to 6 foot tall, to enhance the space's natural ambiance. Plant options are ${plants.join(' and ')}.\n\n` +
    `Ensure the design is cohesive, aesthetically pleasing, and aligns with the ${theme.toLowerCase()} theme.`;

  const prompt = createPrompt(
    theme,
    room,
    flooringType,
    panelingType,
    plantType,
  );

  const a_prompt =
    `Ensure the ${room.toLowerCase()} is:\n\n` +
    `- Visually stunning, with large potted plants embodying an Architectural Digest-worthy balance and sophistication\n` +
    `- High-definition, reflecting an exemplary ${theme.toLowerCase()} aesthetic that blends functionality with aesthetic appeal\n` +
    `- Aspirational yet attainable, showcasing meticulous attention to detail and a harmonious color palette\n` +
    `- Inviting comfort and refinement, with lighting that enhances the space's best features\n` +
    `- Include at least two large potted indoor plants to add visual appeal.\n` +
    `- Large potted indoor plants positioned to add natural appeal without feeling contrived`;

  const n_prompt =
    `Avoid exceeding design specifications:\n\n` +
    `- Excessive use of any single material\n` +
    `- Excessive use of wall paneling beyond a single primary wall\n` +
    `- Excessive size of plants beyond 6 foot height limit\n` +
    `- Avoid adding structural elements such as doors and windows that are not there\n` +
    `Avoid common interior design pitfalls such as:\n\n` +
    `- Excessive use of any single material\n` +
    `- Unrealistic placement of objects and inconsistent textures\n` +
    `- Proportionate and well-integrated elements, avoiding low-resolution or pixelated areas\n` +
    `- Ensure the image cropping enhances the design's overall balance\n\n` +
    `Maintain a high standard of realism, with:\n\n` +
    `- Consistent lighting and shadow\n` +
    `- Avoid adding elements that contradict the room's existing structure`;

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
          prompt: prompt,
          a_prompt: a_prompt,
          n_prompt: n_prompt,
        },
      }),
    },
  );

  const jsonStartResponse = (await startResponse.json()) as StartResponse;

  const endpointUrl = jsonStartResponse.urls.get;

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
