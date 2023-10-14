declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';

	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	// This needs to be in sync with ImageMetadata
	export type ImageFunction = () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>,
				import('astro/zod').ZodLiteral<'avif'>,
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<[BaseSchemaWithoutEffects, ...BaseSchemaWithoutEffects[]]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<BaseSchemaWithoutEffects, BaseSchemaWithoutEffects>;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	export type SchemaContext = { image: ImageFunction };

	type DataCollectionConfig<S extends BaseSchema> = {
		type: 'data';
		schema?: S | ((context: SchemaContext) => S);
	};

	type ContentCollectionConfig<S extends BaseSchema> = {
		type?: 'content';
		schema?: S | ((context: SchemaContext) => S);
	};

	type CollectionConfig<S> = ContentCollectionConfig<S> | DataCollectionConfig<S>;

	export function defineCollection<S extends BaseSchema>(
		input: CollectionConfig<S>
	): CollectionConfig<S>;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[]
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[]
	): Promise<CollectionEntry<C>[]>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
			  }
			: {
					collection: C;
					id: keyof DataEntryMap[C];
			  }
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"docs": {
"about.mdx": {
	id: "about.mdx";
  slug: "about";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-15.mdx": {
	id: "blog/2010-15.mdx";
  slug: "blog/2010-15";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-18.mdx": {
	id: "blog/2010-18.mdx";
  slug: "blog/2010-18";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-25.mdx": {
	id: "blog/2010-25.mdx";
  slug: "blog/2010-25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-28.mdx": {
	id: "blog/2010-28.mdx";
  slug: "blog/2010-28";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-32.mdx": {
	id: "blog/2010-32.mdx";
  slug: "blog/2010-32";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-46.mdx": {
	id: "blog/2010-46.mdx";
  slug: "blog/2010-46";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-48.mdx": {
	id: "blog/2010-48.mdx";
  slug: "blog/2010-48";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2010-53.mdx": {
	id: "blog/2010-53.mdx";
  slug: "blog/2010-53";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-08.mdx": {
	id: "blog/2011-08.mdx";
  slug: "blog/2011-08";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-09.mdx": {
	id: "blog/2011-09.mdx";
  slug: "blog/2011-09";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-11.mdx": {
	id: "blog/2011-11.mdx";
  slug: "blog/2011-11";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-13.mdx": {
	id: "blog/2011-13.mdx";
  slug: "blog/2011-13";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-23.mdx": {
	id: "blog/2011-23.mdx";
  slug: "blog/2011-23";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-32.mdx": {
	id: "blog/2011-32.mdx";
  slug: "blog/2011-32";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-34.mdx": {
	id: "blog/2011-34.mdx";
  slug: "blog/2011-34";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-36.mdx": {
	id: "blog/2011-36.mdx";
  slug: "blog/2011-36";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-37.mdx": {
	id: "blog/2011-37.mdx";
  slug: "blog/2011-37";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-38.mdx": {
	id: "blog/2011-38.mdx";
  slug: "blog/2011-38";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-40.mdx": {
	id: "blog/2011-40.mdx";
  slug: "blog/2011-40";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-41.mdx": {
	id: "blog/2011-41.mdx";
  slug: "blog/2011-41";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-43.mdx": {
	id: "blog/2011-43.mdx";
  slug: "blog/2011-43";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-44.mdx": {
	id: "blog/2011-44.mdx";
  slug: "blog/2011-44";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-46.mdx": {
	id: "blog/2011-46.mdx";
  slug: "blog/2011-46";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2011-51.mdx": {
	id: "blog/2011-51.mdx";
  slug: "blog/2011-51";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-09.mdx": {
	id: "blog/2012-09.mdx";
  slug: "blog/2012-09";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-23.mdx": {
	id: "blog/2012-23.mdx";
  slug: "blog/2012-23";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-24.mdx": {
	id: "blog/2012-24.mdx";
  slug: "blog/2012-24";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-25.mdx": {
	id: "blog/2012-25.mdx";
  slug: "blog/2012-25";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-27.mdx": {
	id: "blog/2012-27.mdx";
  slug: "blog/2012-27";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-29.mdx": {
	id: "blog/2012-29.mdx";
  slug: "blog/2012-29";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-31.mdx": {
	id: "blog/2012-31.mdx";
  slug: "blog/2012-31";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-33.mdx": {
	id: "blog/2012-33.mdx";
  slug: "blog/2012-33";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-34.mdx": {
	id: "blog/2012-34.mdx";
  slug: "blog/2012-34";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-41.mdx": {
	id: "blog/2012-41.mdx";
  slug: "blog/2012-41";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-48.mdx": {
	id: "blog/2012-48.mdx";
  slug: "blog/2012-48";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-49.mdx": {
	id: "blog/2012-49.mdx";
  slug: "blog/2012-49";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-50.mdx": {
	id: "blog/2012-50.mdx";
  slug: "blog/2012-50";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2012-53.mdx": {
	id: "blog/2012-53.mdx";
  slug: "blog/2012-53";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2013-01.mdx": {
	id: "blog/2013-01.mdx";
  slug: "blog/2013-01";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2013-02.mdx": {
	id: "blog/2013-02.mdx";
  slug: "blog/2013-02";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2013-03.mdx": {
	id: "blog/2013-03.mdx";
  slug: "blog/2013-03";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2013-04.mdx": {
	id: "blog/2013-04.mdx";
  slug: "blog/2013-04";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2013-14.mdx": {
	id: "blog/2013-14.mdx";
  slug: "blog/2013-14";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2014-53.mdx": {
	id: "blog/2014-53.mdx";
  slug: "blog/2014-53";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-34.mdx": {
	id: "blog/2016-34.mdx";
  slug: "blog/2016-34";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-35.mdx": {
	id: "blog/2016-35.mdx";
  slug: "blog/2016-35";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-36.mdx": {
	id: "blog/2016-36.mdx";
  slug: "blog/2016-36";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-37.mdx": {
	id: "blog/2016-37.mdx";
  slug: "blog/2016-37";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-40.mdx": {
	id: "blog/2016-40.mdx";
  slug: "blog/2016-40";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-41.mdx": {
	id: "blog/2016-41.mdx";
  slug: "blog/2016-41";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-44.mdx": {
	id: "blog/2016-44.mdx";
  slug: "blog/2016-44";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-45.mdx": {
	id: "blog/2016-45.mdx";
  slug: "blog/2016-45";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-46.mdx": {
	id: "blog/2016-46.mdx";
  slug: "blog/2016-46";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-48.mdx": {
	id: "blog/2016-48.mdx";
  slug: "blog/2016-48";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-49.mdx": {
	id: "blog/2016-49.mdx";
  slug: "blog/2016-49";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2016-51.mdx": {
	id: "blog/2016-51.mdx";
  slug: "blog/2016-51";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-01.mdx": {
	id: "blog/2017-01.mdx";
  slug: "blog/2017-01";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-06.mdx": {
	id: "blog/2017-06.mdx";
  slug: "blog/2017-06";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-16.mdx": {
	id: "blog/2017-16.mdx";
  slug: "blog/2017-16";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-17.mdx": {
	id: "blog/2017-17.mdx";
  slug: "blog/2017-17";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-19.mdx": {
	id: "blog/2017-19.mdx";
  slug: "blog/2017-19";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-21.mdx": {
	id: "blog/2017-21.mdx";
  slug: "blog/2017-21";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-44.mdx": {
	id: "blog/2017-44.mdx";
  slug: "blog/2017-44";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-45.mdx": {
	id: "blog/2017-45.mdx";
  slug: "blog/2017-45";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-46.mdx": {
	id: "blog/2017-46.mdx";
  slug: "blog/2017-46";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-48.mdx": {
	id: "blog/2017-48.mdx";
  slug: "blog/2017-48";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-49.mdx": {
	id: "blog/2017-49.mdx";
  slug: "blog/2017-49";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2017-50.mdx": {
	id: "blog/2017-50.mdx";
  slug: "blog/2017-50";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-01.mdx": {
	id: "blog/2018-01.mdx";
  slug: "blog/2018-01";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-21.mdx": {
	id: "blog/2018-21.mdx";
  slug: "blog/2018-21";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-23.mdx": {
	id: "blog/2018-23.mdx";
  slug: "blog/2018-23";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-24.mdx": {
	id: "blog/2018-24.mdx";
  slug: "blog/2018-24";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-26.mdx": {
	id: "blog/2018-26.mdx";
  slug: "blog/2018-26";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-27.mdx": {
	id: "blog/2018-27.mdx";
  slug: "blog/2018-27";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-28.mdx": {
	id: "blog/2018-28.mdx";
  slug: "blog/2018-28";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-29.mdx": {
	id: "blog/2018-29.mdx";
  slug: "blog/2018-29";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-30.mdx": {
	id: "blog/2018-30.mdx";
  slug: "blog/2018-30";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-31.mdx": {
	id: "blog/2018-31.mdx";
  slug: "blog/2018-31";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-33.mdx": {
	id: "blog/2018-33.mdx";
  slug: "blog/2018-33";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-35.mdx": {
	id: "blog/2018-35.mdx";
  slug: "blog/2018-35";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-42.mdx": {
	id: "blog/2018-42.mdx";
  slug: "blog/2018-42";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-43.mdx": {
	id: "blog/2018-43.mdx";
  slug: "blog/2018-43";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-46.mdx": {
	id: "blog/2018-46.mdx";
  slug: "blog/2018-46";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-51.mdx": {
	id: "blog/2018-51.mdx";
  slug: "blog/2018-51";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2018-53.mdx": {
	id: "blog/2018-53.mdx";
  slug: "blog/2018-53";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-01.mdx": {
	id: "blog/2019-01.mdx";
  slug: "blog/2019-01";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-11.mdx": {
	id: "blog/2019-11.mdx";
  slug: "blog/2019-11";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-13.mdx": {
	id: "blog/2019-13.mdx";
  slug: "blog/2019-13";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-29.mdx": {
	id: "blog/2019-29.mdx";
  slug: "blog/2019-29";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-34.mdx": {
	id: "blog/2019-34.mdx";
  slug: "blog/2019-34";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2019-36.mdx": {
	id: "blog/2019-36.mdx";
  slug: "blog/2019-36";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2020-20.mdx": {
	id: "blog/2020-20.mdx";
  slug: "blog/2020-20";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2020-21.mdx": {
	id: "blog/2020-21.mdx";
  slug: "blog/2020-21";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2020-24.mdx": {
	id: "blog/2020-24.mdx";
  slug: "blog/2020-24";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"blog/2022-01.mdx": {
	id: "blog/2022-01.mdx";
  slug: "blog/2022-01";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"environments/desk.md": {
	id: "environments/desk.md";
  slug: "environments/desk";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
"index.mdx": {
	id: "index.mdx";
  slug: "index";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".mdx"] };
"whoami.md": {
	id: "whoami.md";
  slug: "whoami";
  body: string;
  collection: "docs";
  data: InferEntrySchema<"docs">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	type ContentConfig = typeof import("../src/content/config");
}
