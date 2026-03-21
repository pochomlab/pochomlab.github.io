import { getPermalink, getAsset } from './utils/permalinks';

export const headerDataJa = {
  links: [
    {
      text: '絵書',
      links: [
        {
          text: '0. 序：絵書の鼓動',
          href: '/egaki-sho@@@top',
        },
        {
          text: '1. 絵書とは',
          href: '/egaki-sho@@@concept',
        },
        {
          text: '2. 深淵：世界と構造',
          href: '/egaki-sho@@@abyss'
        },
        {
          text: '3. 軌跡：記録と伴走',
          href: '/egaki-sho@@@record',
        },
        {
          text: '4. 旅路：本編',
          href: '/egaki-sho@@@chapters',
        },
        {
          text: '5. 結：招待とCTA',
          href: '/egaki-sho@@@invitation',
        },
      ],
    },
    {
      text: 'ZINE',
      links: [
        {
          text: '絵書作ろうよ！ZINE',
          href: '/zine/egaki-sho-create',
        },     
      ],
    },
    {
      text: '307の庭',
      href: '/garden-307',
    },
    {
      text: 'イベント',
      href: '/events',
    },
    {
      text: 'Log',
      href: '/log',
    },
    {
      text: 'はじめに',
      links: [
        {
          text: 'このサイトについて',
          href: '/about@@@about-site',
        },
        {
          text: '自己紹介',
          href: '/about@@@profile',
        },        
        {
          text: 'お問い合わせ',
          href: '/about@@@contact',
        }, 
      ],
    },    
  ],
  //actions: [{ text: 'Download', href: 'https://github.com/arthelokyo/astrowind', target: '_blank' }],
};

export const footerData = {
  links: [
    {
      title: '活動基盤',
      links: [
        { text: 'GitHub', href: 'https://github.com/pochomlab' },
        { text: 'J-PlatPat', href: 'https://www.j-platpat.inpit.go.jp/' },
        { text: '文化庁', href: 'https://www.bunka.go.jp/' },
      ],
    },
    {
      title: '頒布',
      links: [
        { text: 'Booth', href: 'https://pochomlab.booth.pm/' },
        { text: 'Kindle (KDP)', href: 'https://www.amazon.co.jp/' },
      ],
    },
    {
      title: '作品',
      links: [
        { text: '作品一覧', href: '/ja/library' },        
        { text: '絵書', href: '/ja/egaki-sho' },
        { text: '絵書創ろうよ！ZINE', href: '/ja/zine/egaki-sho-create' },
      ],
    },
    {
      title: 'Lab',
      links: [
        { text: 'このサイトについて', href: '/ja/about#about-site' },
        { text: 'お問い合わせ', href: '/ja/about#contact' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '利用規約', href: getPermalink('/terms_ja') },
    { text: 'プライバシーポリシー', href: getPermalink('/privacy_ja') },
  ],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/pochomlab' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/ja/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} PochomLab · たましいの灯。
  `,
};
