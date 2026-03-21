import { getPermalink, getAsset } from './utils/permalinks';

export const headerDataEn = {
  links: [
    {
      text: 'Egaki-sho',
      links: [
        {
          text: '0. Prologue — The Pulse of Egaki-sho',
          href: '/egaki-sho@@@top',
        },
        {
          text: '1. What is Egaki-sho?',
          href: '/egaki-sho@@@concept',
        },
        {
          text: '2. Abyss — World & Structure',
          href: '/egaki-sho@@@abyss'
        },
        {
          text: '3. Traces — Records & Companionship',
          href: '/egaki-sho@@@record',
        },
        {
          text: '4. Journey — The Main Story',
          href: '/egaki-sho@@@chapters',
        },
        {
          text: '5. Epilogue — Invitation',
          href: '/egaki-sho@@@invitation',
        },
      ],
    },
    {
      text: 'ZINE',
      links: [
        {
          text: 'Egaki-sho: Let’s Create! ZINE',
          href: '/zine/egaki-sho-create',
        }      
      ],
    },
    {
      text: 'Garden 307',
      href: '/garden-307',
    },
    {
      text: 'Events',
      href: '/events',
    },    
    {
      text: 'Log',
      href: '/log',
    },
    {
      text: 'Introduction',
      links: [
        {
          text: 'About This Site',
          href: '/about@@@about-site',
        },
        {
          text: 'Profile',
          href: '/about@@@profile',
        },        
        {
          text: 'Contact',
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
      title: 'Foundation of Activities',
      links: [
        { text: 'GitHub', href: 'https://github.com/pochomlab' },
        { text: 'J-PlatPat', href: 'https://www.j-platpat.inpit.go.jp/' },
        { text: 'Agency for Cultural Affairs (Japan)', href: 'https://www.bunka.go.jp/' },
      ],
    },
    {
      title: 'Distribution',
      links: [
        { text: 'Booth', href: 'https://pochomlab.booth.pm/' },
        { text: 'Kindle (KDP)', href: 'https://www.amazon.co.jp/' },
      ],
    },
    {
      title: 'Works',
      links: [
        { text: 'Library', href: '/en/library' },             
        { text: 'Egaki-sho', href: '/en/egaki-sho' },
        { text: 'Egaki-sho: Let’s Create! ZINE', href: '/en/zine/egaki-sho-create' },
      ],
    },
    {
      title: 'Lab',
      links: [
        { text: 'About This Site', href: '/en/about#about-site' },
        { text: 'Contact', href: '/en/about#contact' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms of Use', href: getPermalink('/terms_en') },
    { text: 'Privacy Policy', href: getPermalink('/privacy_en') },
  ],
  socialLinks: [
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/pochomlab' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
  ],
  footNote: `
    © ${new Date().getFullYear()} PochomLab · Lights of the Soul
  `,
};
