export const SITE = {
	title: 'legwiki',
	description: 'compass for myself',
	defaultLanguage: 'ja_JP',
};

export const OPEN_GRAPH = {
	image: {
		src: 'https://github.com/legnoh/legwiki/blob/main/public/legwiki-og-image.png?raw=true',
		alt:
			'legwiki hero image with compass logo,'
	},
	twitter: 'legnoh',
};

// This is the type of the frontmatter you put in the docs markdown files.
export type Frontmatter = {
	title: string;
	description: string;
	layout: string;
	image?: { src: string; alt: string };
	dir?: 'ltr' | 'rtl';
	ogLocale?: string;
	lang?: string;
	date?: string;
};

export const KNOWN_LANGUAGES = {
	// English: 'en',
	Japanese: 'ja',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/legnoh/legwiki/tree/main`;

export const COMMUNITY_INVITE_URL = `https://twitter.com/legnoh`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'legwiki',
	appId: 'VYHLYZJSKC',
	apiKey: 'c68e31d72883dd00777aa057fab0c4be',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	ja: {
		'': [
			{ text: 'Whoami', link: 'ja/whoami' },
			{ text: 'Blog', link: 'ja/blog' }
		],
	},
};
