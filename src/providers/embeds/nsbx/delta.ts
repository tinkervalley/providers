import { EmbedOutput, makeEmbed } from '@/providers/base';

export const deltaScraper = makeEmbed({
  id: 'delta',
  name: 'Delta',
  rank: 200,
  disabled: false,
  async scrape(ctx) {
    const url = `http://nsbx.wafflehacker.io/provider.php?resourceId=${encodeURIComponent(ctx.url)}&provider=delta`;
    const result = await ctx.fetcher(url);

    return result as EmbedOutput;
  },
});
