import { defineConfig } from 'astro/config';
import starlight from "@astrojs/starlight";
import starlightBlog from 'starlight-blog';

const site = 'https://legwiki.lkj.io';

export default defineConfig({
  site: 'https://legwiki.lkj.io',
  integrations: [
    starlight({
      title: "legwiki",
      description: "compass for myself.",
      logo: {
        light: "./src/assets/legwiki-logo-light-side.svg",
        dark: "./src/assets/legwiki-logo-dark-side.svg",
        replacesTitle: true,
      },
      head: [
				{
					tag: 'meta',
					attrs: { property: 'og:image', content: 'legwiki-og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'twitter:image', content: 'legwiki-og-image.png' },
				},
			],
      components: {
        MarkdownContent: './src/components/Overrides/MarkdownTemplate.astro',
      },
      customCss: [
        './src/styles/custom.css',
			],
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 6
      },
      editLink: {
				baseUrl: 'https://github.com/legnoh/legwiki/tree/main/',
			},
      defaultLocale: 'ja',
      plugins: [
        starlightBlog({
          title: "leglog",
          authors: {
            legnoh: {
              name: 'legnoh',
              title: 'Internet seniors\' association',
              picture: '/img/avatar/legnoh.jpeg', // Images in the `public` directory are supported.
              url: 'https://twitter.com/legnoh',
            },
          },
          postCount: 1,
          recentPostCount: 1000,
        }),
      ],
      sidebar: [
        { label: 'About', link: '/about' },
        { label: 'Whoami', link: '/whoami' },
        { label: '環境', link: '/environments' },
        { 
          label: 'リスク対応', 
          items: [
            {label: 'リスク評価', link: '/risk/assessment' },
            {label: '防災対策', link: '/risk/disaster-prevention' }
          ]
        },
      ],
      social: {
        'x.com': 'https://x.com/legnoh',
        instagram: 'https://www.instagram.com/legnoh/',
        youtube: 'https://www.youtube.com/@legnoh',
        github: 'https://github.com/legnoh',
      },
    }),
  ],
});
