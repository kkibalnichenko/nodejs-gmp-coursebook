// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const url = process.env.APP_URL || 'https://your-docusaurus-test-site.com';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Node.js',
  tagline: 'node.js',
  url,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'gitbud.epam.com/Igor_Skobelev/', // Usually your GitHub org/user name.
  projectName: 'node.js-global-mentoring-program', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://gitbud.epam.com/Igor_Skobelev/node.js-global-mentoring-program',
          exclude: ['**/node_modules/**'],
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://gitbud.epam.com/Igor_Skobelev/node.js-global-mentoring-program',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-pwa',
      {
        id: 'doc-1',
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/docusaurus.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: '/img/docusaurus.svg',
            color: 'rgb(37, 194, 160)',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileImage',
            content: '/img/docusaurus.png',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#000',
          },
        ],
        offlineModeActivationStrategies: ["always"],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Node.js',
        logo: {
          alt: 'Node.js Logo',
          src: 'img/logo.svg',
          href: 'docs/Intro/introduction',
        },
        items: [
          {
            type: 'doc',
            docId: 'Intro/introduction',
            position: 'left',
            label: 'Tutorial',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Tutorial',
                to: 'docs/Intro/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Node.js Documentation',
                href: 'https://nodejs.org/en/docs/',
              },
              {
                label: 'Download Node.js',
                href: 'https://nodejs.org/en/download/',
              },
              {
                label: 'Node.js on GitHub',
                href: 'https://github.com/nodejs/node',
              },
              {
                label: 'Offical Guides',
                href: 'https://nodejs.org/en/docs/guides/',
              },
              {
                label: 'Community Guides',
                href: 'https://nodejs.dev/en/learn/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Node.js Global mentoring program (GMP). Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
