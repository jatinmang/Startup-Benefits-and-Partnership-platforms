
import { Deal } from './types';

export const MOCK_DEALS: Deal[] = [
  {
    id: 'd1',
    partnerName: 'CloudScale',
    logo: 'https://picsum.photos/seed/cloud/200',
    title: 'CloudScale Infrastructure Credits',
    shortDescription: 'Get $5,000 in free cloud credits for your first year.',
    fullDescription: 'CloudScale provides the most robust cloud computing environment for startups. Our platform offers high-performance VPS, managed databases, and global CDN. This deal is designed specifically for early-stage teams looking to scale without the initial infra burden.',
    benefit: '$5,000 Credits',
    category: 'Cloud',
    accessLevel: 'locked',
    conditions: [
      'Must be a registered company',
      'Under $1M in funding',
      'New CloudScale customers only'
    ]
  },
  {
    id: 'd2',
    partnerName: 'MailPulse',
    logo: 'https://picsum.photos/seed/mail/200',
    title: 'Lifetime Marketing Automation',
    shortDescription: 'Free marketing tools for up to 5,000 subscribers.',
    fullDescription: 'MailPulse is an all-in-one marketing platform. Manage newsletters, transactional emails, and user segmentation with ease. Startups can enjoy our growth plan for free, forever, until they reach 5k subscribers.',
    benefit: 'Free Growth Plan',
    category: 'Marketing',
    accessLevel: 'public',
    conditions: [
      'None'
    ]
  },
  {
    id: 'd3',
    partnerName: 'Analytica',
    logo: 'https://picsum.photos/seed/chart/200',
    title: 'Real-time Product Analytics',
    shortDescription: '6 months free of the Pro plan with unlimited events.',
    fullDescription: 'Understand your users like never before. Analytica offers deep-dive event tracking, funnel analysis, and retention reporting. This exclusive perk gives you the full power of our enterprise suite for 6 months.',
    benefit: '6 Months Free Pro',
    category: 'DevTools',
    accessLevel: 'locked',
    conditions: [
      'Venture-backed startups only',
      'Product must be live'
    ]
  },
  {
    id: 'd4',
    partnerName: 'SecurePay',
    logo: 'https://picsum.photos/seed/pay/200',
    title: 'Zero-fee Transaction Processing',
    shortDescription: 'Waived fees on your first $20k in volume.',
    fullDescription: 'Launch your product with zero transaction fees. SecurePay is the favorite payment processor for indie hackers and global startups. We take care of the security and compliance while you focus on sales.',
    benefit: '$20k Fee-free',
    category: 'Finance',
    accessLevel: 'public',
    conditions: [
      'Standard KYC required'
    ]
  },
  {
    id: 'd5',
    partnerName: 'DevFlow',
    logo: 'https://picsum.photos/seed/dev/200',
    title: 'Accelerated CI/CD Pipeline',
    shortDescription: '10 free concurrent runners for your builds.',
    fullDescription: 'Stop waiting for your builds. DevFlow provides lightning-fast CI/CD infrastructure that grows with your team. Perfect for heavy monorepos and microservices.',
    benefit: '10 Free Runners',
    category: 'DevTools',
    accessLevel: 'locked',
    conditions: [
      'Must have more than 3 developers'
    ]
  },
  {
    id: 'd6',
    partnerName: 'PixelCraft',
    logo: 'https://picsum.photos/seed/pixel/200',
    title: 'Design Resource Bundle',
    shortDescription: 'Full access to premium icon packs and UI kits.',
    fullDescription: 'Elevate your UI with professional assets. PixelCraft offers the worlds largest library of Figma-ready components and illustrative assets.',
    benefit: '1 Year Free Access',
    category: 'Design',
    accessLevel: 'public',
    conditions: [
      'Individual developer account'
    ]
  }
];
