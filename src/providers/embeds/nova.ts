import { EmbedOutput, makeEmbed } from '@/providers/base';
import { baseUrl } from '@/providers/sources/whvx';

export const novaScraper = makeEmbed({
  id: 'nova',
  name: 'Nova',
  rank: 270,
  disabled: false,
  async scrape(ctx) {
    const search = await ctx.fetcher(`${baseUrl}/search?query=${encodeURIComponent(ctx.url)}`);
    ctx.progress(50);
    const result = await ctx.fetcher(`${baseUrl}/source?resourceId=${encodeURIComponent(search.url)}`);
    ctx.progress(100);
    return result as EmbedOutput;
  },
});
