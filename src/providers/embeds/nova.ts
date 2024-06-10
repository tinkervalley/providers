import { EmbedOutput, makeEmbed } from '@/providers/base';

export const novaScraper = makeEmbed({
  id: 'nova',
  name: 'Nova',
  rank: 270,
  disabled: false,
  async scrape(ctx) {
    const url = `https://cta.wafflehacker.io/provider?resourceId=${encodeURIComponent(ctx.url)}`;
    const result = await ctx.fetcher(url);

    return result as EmbedOutput;
  },
});
