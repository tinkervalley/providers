import { makeEmbed } from '@/providers/base';

const baseUrl = 'https://d000d.com';

export const doodScraper = makeEmbed({
  id: 'dood',
  name: 'dood',
  rank: 173,
  async scrape(ctx) {
    let url = ctx.url;
    if (ctx.url.includes('primewire')) {
      const request = await ctx.proxiedFetcher.full(ctx.url);
      url = request.finalUrl;
    }

    const id = url.split('/d/')[1] || url.split('/e/')[1];

    const doodData = await ctx.proxiedFetcher<string>(`/e/${id}`, {
      method: 'GET',
      baseUrl,
    });

    const thumbnailTrack = doodData.match(/thumbnails:\s\{\s*vtt:\s'([^']*)'/);
    const downloadURL = `https://dood.wafflehacker.io/scrape/${id}`;

    return {
      stream: [
        {
          id: 'primary',
          type: 'file',
          flags: [],
          captions: [],
          qualities: {
            unknown: {
              type: 'mp4',
              url: downloadURL,
            },
          },
          headers: {
            Referer: baseUrl,
          },
          ...(thumbnailTrack
            ? {
                thumbnailTrack: {
                  type: 'vtt',
                  url: `https:${thumbnailTrack[1]}`,
                },
              }
            : {}),
        },
      ],
    };
  },
});
