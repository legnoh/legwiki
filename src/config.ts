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
};

export const KNOWN_LANGUAGES = {
	// English: 'en',
	Japanese: 'ja',
} as const;
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES);

export const GITHUB_EDIT_URL = `https://github.com/legnoh/legwiki/tree/main/src/pages`;

// export const COMMUNITY_INVITE_URL = `https://astro.build/chat`;

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
	indexName: 'XXXXXXXXXX',
	appId: 'XXXXXXXXXX',
	apiKey: 'XXXXXXXXXX',
};

export type Sidebar = Record<
	typeof KNOWN_LANGUAGE_CODES[number],
	Record<string, { text: string; link: string }[]>
>;
export const SIDEBAR: Sidebar = {
	ja: {
		'Home': [
			{ text: 'Top', link: 'ja/top' },
		],
	},
};
