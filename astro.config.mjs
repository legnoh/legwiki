import { defineConfig } from 'astro/config';
import starlight from "@astrojs/starlight";
import starlightBlog from 'starlight-blog';

export default defineConfig({
  site: 'https://legwiki.lkj.io',
  integrations: [
    starlightBlog({
      title: "leglog",
      authors: {
        hideoo: {
          name: 'legnoh',
          title: 'Internet seniors\' association',
          picture: '/img/avatar/legnoh.jpeg', // Images in the `public` directory are supported.
          url: 'https://twitter.com/legnoh',
        },
      },
      postCount: 1,
      recentPostCount: 1000,
    }),
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
					attrs: { property: 'og:image', content: site + 'legwiki-og-image.png' },
				},
				{
					tag: 'meta',
					attrs: { property: 'twitter:image', content: site + 'legwiki-og-image.png' },
				},
			],
      components: {
        MarkdownContent: './src/components/Overrides/MarkdownTemplate.astro',
        Sidebar: 'starlight-blog/overrides/Sidebar.astro',
        ThemeSelect: 'starlight-blog/overrides/ThemeSelect.astro',
      },
      customCss: [
				'@fontsource/noto-sans-jp/400.css',
        '@fontsource/noto-sans-jp/600.css',
        './src/styles/custom.css',
			],
      editLink: {
				baseUrl: 'https://github.com/legnoh/legwiki/tree/main/',
			},
      defaultLocale: 'ja',
      sidebar: [
        { label: 'About', link: '/about' },
        { label: 'Whoami', link: '/whoami' },
      ],
      social: {
        'x.com': 'https://twitter.com/legnoh',
        instagram: 'https://www.instagram.com/legnoh/',
        youtube: 'https://www.youtube.com/@legnoh',
        github: 'https://github.com/legnoh',
        rss: 'https://legwiki.lkj.io/atom.xml',
      },
    }),
  ],
});
