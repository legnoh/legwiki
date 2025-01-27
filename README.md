:compass: legwiki 
====

[![Publish Workflow Status](https://github.com/legnoh/legwiki/actions/workflows/publish.yml/badge.svg)](https://github.com/legnoh/legwiki/actions/workflows/publish.yml)

:cherry_blossom: [**legwiki.lkj.io**](https://legwiki.lkj.io) ([legwiki.netlify.app](https://legwiki.netlify.app))

## build

```sh
git lfs clone https://github.com/legnoh/legwiki.git && cd legwiki
cp .env.sample .env
code .env
npm run build
```

### Commands Cheatsheet

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |


## licenses

This site logo uses [font-awesome](https://fontawesome.com/icons/compass?style=solid&s=solid).

- [Free License | Font Awesome](https://fontawesome.com/license/free)
- [Creative Commons — Attribution 4.0 International — CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## using

- [withastro/starlight](https://github.com/withastro/starlight)
- [HiDeoo/starlight-blog](https://github.com/HiDeoo/starlight-blog)
