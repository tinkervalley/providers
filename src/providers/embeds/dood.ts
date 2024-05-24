import { flags } from '@/entrypoint/utils/targets';
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

    // Fetch the doodData from the given URL
    const doodData = await ctx.proxiedFetcher<string>(url, {
      method: 'GET',
    });

    // Match the iframe src to extract the id
    const iframeMatch = doodData.match(/<iframe[^>]+src="\/e\/([^"]+)"[^>]*><\/iframe>/);
    if (!iframeMatch) {
      throw new Error('Unable to find iframe src in the page');
    }

    const id = iframeMatch[1];

    const downloadURL = `https://dood.wafflehacker.io/scrape/${id}`;

    return {
      stream: [
        {
          id: 'primary',
          type: 'file',
          flags: [flags.CORS_ALLOWED],
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
