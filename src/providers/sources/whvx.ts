import { flags } from '@/entrypoint/utils/targets';
import { SourcererEmbed, SourcererOutput, makeSourcerer } from '@/providers/base';
import { MovieScrapeContext, ShowScrapeContext } from '@/utils/context';
import { NotFoundError } from '@/utils/errors';

async function comboScraper(ctx: ShowScrapeContext | MovieScrapeContext): Promise<SourcererOutput> {
  const query = {
    title: ctx.media.title,
    releaseYear: ctx.media.releaseYear,
    type: ctx.media.type,
    season: '',
    episode: '',
  };

  if (ctx.media.type === 'show') {
    query.season = ctx.media.season.number.toString();
    query.episode = ctx.media.episode.number.toString();
  }

  const result = await ctx.fetcher(
    `https://cta.wafflehacker.io/search?query=${encodeURIComponent(JSON.stringify(query))}`,
  );

  if (result.embeds.length === 0) throw new NotFoundError('No watchable item found');

  return {
    embeds: result.embeds as SourcererEmbed[],
  };
}

export const whvxScraper = makeSourcerer({
  id: 'whvx',
  name: 'WHVX',
  rank: 160,
  flags: [flags.CORS_ALLOWED],
  disabled: false,
  scrapeMovie: comboScraper,
  scrapeShow: comboScraper,
});
