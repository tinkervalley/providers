import { flags } from '@/entrypoint/utils/targets';
import { makeEmbed } from '@/providers/base';

const linkRegex = /file:"(https:\/\/[^"]+)"/s;

export const vidMolyScraper = makeEmbed({
  id: 'vidmoly',
  name: 'Vidmoly',
  rank: 194,
  async scrape(ctx) {
    // Example url: https://vidmoly.me/w/w1lfebo8xiyz
    const streamRes = await ctx.proxiedFetcher<string>(ctx.url);
    const link = streamRes.match(linkRegex);
    if (!link) throw new Error('Failed to extract link');

    const encodedLink = encodeURIComponent(link[1]);
    const referer = 'https://vidmoly.me/w/1';
    const encodedReferer = encodeURIComponent(referer);
    const proxiedURL = `https://m3u8.justchill.workers.dev/?url=${encodedLink}&referer=${encodedReferer}`;

    return {
      stream: [
        {
          type: 'hls',
          id: 'primary',
          playlist: proxiedURL,
          flags: [flags.CORS_ALLOWED],
          captions: [],
        },
      ],
    };
  },
});
