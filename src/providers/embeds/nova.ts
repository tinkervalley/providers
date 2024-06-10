import { EmbedOutput, makeEmbed } from '@/providers/base';
import { baseUrl } from '@/providers/sources/whvx';
import { NotFoundError } from '@/utils/errors';

export const novaScraper = makeEmbed({
  id: 'nova',
  name: 'Nova',
  rank: 270,
  disabled: false,
  async scrape(ctx) {
    const search = await ctx.proxiedFetcher.full(`${baseUrl}/search?query=${encodeURIComponent(ctx.url)}`);

    if (search.statusCode === 429) {
      throw new Error('Rate limited');
    } else if (search.statusCode !== 200) {
      throw new NotFoundError('Failed to search');
    }

    ctx.progress(50);

    const result = await ctx.proxiedFetcher(`${baseUrl}/source?resourceId=${encodeURIComponent(search.body.url)}`);

    ctx.progress(100);

    return result as EmbedOutput;
  },
});
