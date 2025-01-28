import { defineMarkdocConfig, component } from '@astrojs/markdoc/config';
import starlightMarkdoc from '@astrojs/starlight-markdoc';

// https://docs.astro.build/en/guides/integrations-guide/markdoc/
export default defineMarkdocConfig({
  extends: [starlightMarkdoc()],
  tags: {
		instagram: {
			render: component('./src/components/Instagram.astro'),
			attributes: {
				url: {
					type: String,
					required: true,
				},
			},
		},
    oglinkcard: {
      render: component('./src/components/OGLinkCard.astro'),
      attributes: {
        url: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: false,
        },
        description: {
          type: String,
          required: false,
        },
        image: {
          type: String,
          required: false,
        },
        fixed: {
          type: Boolean,
          required: false,
        },
        url_amazon: {
          type: String,
          required: false,
        },
        url_yahoo: {
          type: String,
          required: false,
        },
        code_rakuten: {
          type: String,
          required: false,
        },
        keyword_rakuten: {
          type: String,
          required: false,
        },
      },
    },
		x: {
			render: component('./src/components/X.astro'),
			attributes: {
				url: {
					type: String,
					required: true,
				},
			},
		},
		youtube: {
			render: component('./src/components/Youtube.astro'),
			attributes: {
				url: {
					type: String,
					required: true,
				},
			},
		},
  },
});
