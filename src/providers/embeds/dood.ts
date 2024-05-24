import { makeEmbed } from '@/providers/base';

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
        },
      ],
    };
  },
});
