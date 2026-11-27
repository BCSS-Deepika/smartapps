/**
 * Homepage content, copied word for word from the live index.html (main @ 7082f0d).
 * Changes from the live wording are marked CHANGED with the reason, and are listed
 * for approval at Gate 3.
 */
import type { Accent, Maturity } from '@/types/product';

export const heroStats = [
  { value: '3', label: 'platforms' },
  { value: '13', label: 'policing products' },
  { value: '4', label: 'intelligence workspaces' },
  { value: '10', label: 'countries of presence' },
];

export const heroPlatforms = [
  {
    slug: 'access-genie',
    logo: '/logos/access-genie.webp',
    alt: 'Access Genie',
    title: 'AI video intelligence',
    sub: 'Policing · retail · industry',
  },
  {
    slug: 'blura-saga',
    logo: '/logos/blura-saga.webp',
    alt: 'Blura SAGA',
    title: 'Digital intelligence',
    sub: 'Four workspaces',
  },
  {
    slug: 'edugenie',
    logo: '/logos/edugenie.webp',
    alt: 'EduGenie',
    title: 'Workforce management',
    sub: 'ERP · CRM · LMS',
  },
];

export const pillars: { title: string; text: string; accent: Accent }[] = [
  {
    title: 'See it',
    text: 'Cameras, calls, records and public conversation become signals the moment they occur, not entries someone reviews later.',
    accent: 'watch',
  },
  {
    title: 'Understand it',
    text: 'AI reads language, faces, documents, plates and behaviour — in the languages people actually use — and puts a name to what it found.',
    accent: 'invest',
  },
  {
    title: 'Decide on it',
    text: 'A finding reaches the one person accountable for it, with the evidence attached and a record of who decided what.',
    accent: 'draft',
  },
  {
    title: 'Prove it',
    text: 'Every search, match, draft and disclosure is logged, hashed and traceable, so the work holds up in court, in audit and in RTI.',
    accent: 'field',
  },
];

export const audiences: {
  title: string;
  text: string;
  href: string;
  accent: Accent;
  slug?: string;
}[] = [
  {
    title: 'Police & law enforcement',
    text: "GARUDA – Blue Cloud's Policing Operational Ecosystem",
    href: '',
    slug: 'garuda',
    accent: 'garuda',
  },
  {
    title: 'Government department',
    text: 'Transport, infrastructure, citizen services',
    href: '#access-genie-more',
    accent: 'watch',
  },
  {
    title: 'Enterprise & retail',
    text: 'Video intelligence and store operations',
    href: '',
    slug: 'access-genie-retail',
    accent: 'ag',
  },
  {
    title: 'Political, brand or media',
    text: 'Digital intelligence workspaces',
    href: '',
    slug: 'blura-saga',
    accent: 'saga',
  },
  { title: 'University or college', text: 'EduGenie', href: '', slug: 'edugenie', accent: 'edu' },
];

export const directory = [
  {
    slug: 'access-genie',
    kind: 'Platform 01 · Multi-industry',
    name: 'Access Genie',
    logo: '/logos/access-genie.webp',
    accent: 'ag' as Accent,
    text: 'AI video and operational intelligence. Turns the cameras, records and workflows an organisation already runs into alerts, evidence and decisions.',
    chips: [
      // CHANGED: was 'Policing & public safety · GARUDA'; GARUDA is its own vertical.
      'Traffic enforcement',
      'Enterprise & industry',
      'Retail & jewellery',
      'BluGo logistics',
      'Transport',
      'Healthcare',
    ],
    go: 'Open Access Genie',
  },
  {
    slug: 'blura-saga',
    kind: 'Platform 02 · Digital intelligence',
    name: 'Blura SAGA',
    logo: '/logos/blura-saga.webp',
    accent: 'saga' as Accent,
    text: 'Sentiment And Goodwill Analysis. One intelligence engine beneath four workspaces, reading public conversation across the surface, deep and dark web.',
    chips: ['Police & Government', 'Political', 'Brand', 'Celebrity'],
    go: 'Open Blura SAGA',
  },
  {
    // CHANGED: the live card still described the old Centre of Excellence and said "EduGenie COE".
    // Kind, text and chips now come from the EduGenie page rebuilt in PR 6.
    slug: 'edugenie',
    kind: 'Platform 03 · Workforce management',
    name: 'EduGenie',
    logo: '/logos/edugenie.webp',
    accent: 'edu' as Accent,
    text: 'Learning, operations and customers, on one platform. EduGenie brings a learning management system, an ERP and a CRM together, so an institution or a business can train its people, run its operations and manage its customers from one system instead of several.',
    chips: ['LMS', 'ERP', 'CRM', 'White-label'],
    go: 'Open EduGenie',
  },
];

export const agSteps = [
  {
    n: '01',
    title: 'Collect',
    text: 'Streams from IP and analog cameras, ANPR and radar, plus records, helplines and seized devices.',
  },
  {
    n: '02',
    title: 'Detect',
    text: 'Models run on zones, time windows and thresholds the organisation sets — at the edge or in the cluster.',
  },
  {
    n: '03',
    title: 'Alert',
    text: 'A detection becomes a prioritised alert with its evidence attached, routed to whoever owns it.',
  },
  {
    n: '04',
    title: 'Act',
    text: 'The alert lands in a workflow: a dispatch, a challan, a case, a memo, a floor-team instruction.',
  },
];

export const agPoints = [
  {
    title: 'Built on existing cameras',
    text: 'IP and analog CCTV, PTZ, city and station cameras keep recording as before. Access Genie reads the streams and adds a layer on top; the recorder and the wiring stay where they are.',
  },
  {
    title: 'Processing stays where you decide',
    text: 'Fully on-premise, private cloud or hybrid. For most government deployments, video, records and evidence are processed and stored on infrastructure the department owns.',
  },
  {
    title: 'Connected, not another silo',
    text: 'Reads from and writes to the systems already in use, so officers and staff do not key the same data in twice. Each connection is scoped, tested and approved before it goes live.',
  },
];

export const agVerticals = [
  {
    kind: 'Division · Enterprise & industry',
    title: 'Retail & jewellery',
    text: '16 operational KPIs across sales, risk and operations, with camera evidence against every one.',
    go: 'Open the chapter',
    slug: 'access-genie-retail',
    href: '',
  },
  {
    kind: 'Enterprise & industry · six more',
    title: 'Industries',
    text: 'Airports and transport, critical infrastructure, smart communities, healthcare and finance, education, and BluGo for logistics.',
    go: 'See the industries',
    href: '#access-genie-more',
  },
  {
    // CHANGED: was 'Division · Policing & public safety', listed first.
    kind: 'Separate vertical · Policing',
    title: 'GARUDA',
    text: "Blue Cloud's Policing Operational Ecosystem: thirteen connected products for intelligence, investigation, documentation, field and citizen services — behind one login.",
    go: 'Open GARUDA',
    slug: 'garuda',
    href: '',
    lead: true,
  },
];

export const industries = [
  {
    title: 'Airports & transport',
    text: 'Aviation and transit surveillance: perimeter monitoring, crowd density, unattended baggage, restricted-area access and vehicle movement across terminals and depots.',
  },
  {
    title: 'Critical infrastructure',
    text: 'Data centres and server rooms: unauthorised access detection around the clock, thermal monitoring for equipment safety, tailgating and piggybacking detection.',
  },
  {
    title: 'Smart communities',
    text: 'Gated communities and public spaces: visitor pre-screening and authentication, resident and vehicle access, perimeter surveillance and intrusion alerts.',
  },
  {
    title: 'Healthcare',
    text: 'Hospitals and clinics: unauthorised ward and intensive-care entry, overcrowding alerts, equipment theft or misuse, and staff shift adherence.',
  },
  {
    title: 'Finance & banking',
    text: 'Branch and cash-handling environments: queue and footfall analytics, restricted-zone access, after-hours monitoring and incident evidence.',
  },
  {
    title: 'Education',
    text: 'Campus safety and operations: entry and exit monitoring, restricted-area access, attendance support and incident response — and the link into EduGenie.',
  },
];

export const pages: {
  slug: string;
  kind: string;
  line: string;
  count: string;
  logo: string;
  accent: Accent;
  round?: boolean;
}[] = [
  {
    slug: 'garuda',
    kind: "Blue Cloud's Policing Operational Ecosystem",
    line: 'One front door. Thirteen products. Working as one.',
    count: '13 products',
    logo: '/logos/garuda.webp',
    accent: 'garuda',
    round: true,
  },
  {
    slug: 'access-genie-retail',
    kind: 'Retail vertical',
    line: 'From passive CCTV to actionable retail intelligence.',
    count: '19 modules',
    logo: '/logos/access-genie-retail.webp',
    accent: 'ag',
  },
  {
    slug: 'blugo',
    kind: 'Logistics & mobility',
    line: 'The movement side of enterprise operations.',
    count: '14 modules',
    logo: '/logos/blugo.webp',
    accent: 'blugo',
  },
  {
    slug: 'blura-saga',
    kind: 'Digital intelligence',
    line: 'One engine. Four intelligence workspaces.',
    count: '43 modules',
    logo: '/logos/blura-saga.webp',
    accent: 'saga',
  },
  // CHANGED: EduGenie now follows the page rebuilt in PR 6 (62 modules; was "Education ecosystem", 10 modules).
  {
    slug: 'edugenie',
    kind: 'Workforce management',
    line: 'Learning, operations and customers, on one platform.',
    count: '62 modules',
    logo: '/logos/edugenie.webp',
    accent: 'edu',
  },
  {
    slug: 'access-genie',
    kind: 'Multi-industry platform',
    line: 'From passive surveillance to proactive intelligence.',
    count: '14 modules',
    logo: '/logos/access-genie.webp',
    accent: 'ag',
  },
];

export const garudaProblems = [
  {
    title: 'Too many separate tools',
    text: 'Public conversation, offender records, bank statements, seized devices and paperwork each sit in a different system with a different login.',
  },
  {
    title: 'Intelligence stays in silos',
    text: 'What one unit finds about a person is not seen by the station or wing working the same person next door.',
  },
  {
    title: 'Every step must hold up',
    text: 'Evidence, searches and decisions must be recorded properly so they stand in court, in audit and in information-rights requests.',
  },
];

/** The four GARUDA groups as described on the homepage; tile lines are the live tile text. */
export const garudaGroups = [
  {
    key: 'watch',
    text: 'See what is happening in public spaces, online and on the ground, early.',
    tiles: [
      ['blura-saga', 'Digital intelligence'],
      ['geo-intelligence', 'One map for every product'],
    ],
  },
  {
    key: 'invest',
    text: 'Build the case: offenders, money, devices and evidence.',
    tiles: [
      ['drug-offender-portal', 'Narcotics offender register'],
      ['women-safety-portal', 'Registry & controlled disclosure'],
      ['bluflow', 'Financial intelligence'],
      ['digital-forensics', 'Device & media evidence'],
      ['trap-case-management', 'Anti-corruption trap cases'],
    ],
  },
  {
    key: 'draft',
    text: 'Turn complaints and facts into correct documents and decisions, in minutes.',
    tiles: [
      ['ai-copwriter', 'Voice to structured complaint'],
      ['fir-automation', 'Complaint to registered report'],
      ['memo-generator', 'Supervision memos'],
    ],
  },
  {
    key: 'field',
    text: 'Reach the officer on the beat and the citizen who called.',
    tiles: [
      ['smartcop', 'Officer mobile platform'],
      ['grievance-management', 'Citizen grievances to closure'],
      ['bluvaani', 'The sovereign AI call dispatcher'],
    ],
  },
] as const;

export interface Step {
  who: string;
  title: string;
  text: string;
  maturity: Maturity;
  label: string;
}
export interface Scenario {
  n: string;
  title: string;
  path: string;
  steps: Step[];
  note?: { strong: string; text: string };
}

export const scenarios: Scenario[] = [
  {
    n: '01',
    title: 'Digital signal to field action',
    path: 'Blura SAGA → GARUDA → SmartCOP',
    steps: [
      {
        who: 'Blura SAGA',
        title: 'A digital signal is identified',
        text: 'Public posts, videos, comments and news from configured sources are collected. AI reads language, tone and intent, and the item is scored critical, high, medium or low.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'GARUDA',
        title: 'The finding is reviewed and escalated',
        text: "The alert lands in GARUDA's feed against the subject's GARUDA ID, with the evidence attached and the source, timestamp and hash preserved.",
        maturity: 'integration',
        label: 'Integration level 3 · data exchange',
      },
      {
        who: 'Geo Intelligence',
        title: 'Placed on the map',
        text: 'Where the signal has a location, it joins the hotspot, beat and geo-fence layers so a commander sees where to act.',
        maturity: 'integration',
        label: 'Integration level 2 · deep link',
      },
      {
        who: 'SmartCOP',
        title: 'The field officer receives the task',
        text: "A task is pushed to the officer's phone with the alert context. The officer accepts, acts, captures geotagged evidence and updates the status, which returns to GARUDA.",
        maturity: 'established',
        label: 'Established in product',
      },
    ],
  },
  {
    n: '02',
    title: 'Citizen call to documentation',
    path: 'BluVaani → AI CopWriter → FIR Automation',
    steps: [
      {
        who: 'BluVaani',
        title: 'A citizen calls',
        text: 'The call is answered in whichever language the citizen speaks, transcribed with speakers separated, and scored for intent, urgency, place and names.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'BluVaani',
        title: 'Routed and handed off',
        text: 'Dispatched to the right station, unit or patrol by jurisdiction and availability. A complaint is handed to the documentation products with the transcript attached.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'AI CopWriter',
        title: 'Structured into a draft',
        text: "The complaint is translated and placed into the report's five Ws and one H. Missing elements are flagged rather than left silently blank.",
        maturity: 'integration',
        label: 'Handoff defined, per-deployment integration',
      },
      {
        who: 'FIR Automation',
        title: 'Verified and registered',
        text: 'Statutory sections are suggested with reasons; the station house officer checks, edits and approves, and only then is it registered in the crime records system.',
        maturity: 'proposed',
        label: 'Proposed · validate the records interface per state',
      },
    ],
    note: {
      strong: 'A human approves before registration.',
      text: "Section suggestions are decision support. Nothing is registered on the AI's own output.",
    },
  },
  {
    n: '03',
    title: 'Grievance to resolution',
    path: 'SAGA / BluVaani → Grievance → SmartCOP',
    steps: [
      {
        who: 'SAGA / BluVaani',
        title: 'A grievance is received',
        text: 'From public conversation detected by Blura SAGA, from a petition at the desk, or from a citizen call handled by BluVaani.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'Grievance Management',
        title: 'Classified and routed',
        text: 'Sorted into complaint, criticism, suggestion or query, assigned a category and station, and routed with a response-time timer.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'Grievance / SmartCOP',
        title: 'The responsible desk acts',
        text: 'Remarks are required at every step. Where field action is needed, the task reaches the officer on SmartCOP.',
        maturity: 'integration',
        label: 'Integration level 2 · deep link',
      },
      {
        who: 'GARUDA',
        title: 'Resolution and closure tracked',
        text: "The citizen is updated, closure is recorded, and grievance trends by station and category feed GARUDA's dashboard.",
        maturity: 'integration',
        label: 'Integration level 3 · data exchange',
      },
    ],
  },
  {
    n: '04',
    title: 'Retail floor to management',
    path: 'Access Genie Retail → Analytics → Leadership',
    steps: [
      {
        who: 'Store cameras',
        title: 'Feeds are analysed',
        text: 'Streams are decoded at the edge or in the cluster, and models run against the zones, time windows and thresholds the chain has set.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'Correlation engine',
        title: 'Events are identified',
        text: 'A detection becomes a sales, risk or operations event against one of the sixteen KPIs, correlated over time rather than fired per frame.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'Dispatch',
        title: 'Evidence and alerts are generated',
        text: 'Local siren and strobe where the event warrants it, plus an encrypted alert payload to messaging, mail and the live dashboard. Every clip and snapshot is hash-stamped.',
        maturity: 'established',
        label: 'Established in product',
      },
      {
        who: 'Leadership',
        title: 'Performance reviewed across stores',
        text: 'A nightly executive scorecard delivers store-wise KPIs, violation logs and conversion metrics, so the picture does not depend on anyone compiling it.',
        maturity: 'established',
        label: 'Established in product',
      },
    ],
  },
];

export const deployOptions: { n: string; title: string; text: string; accent: Accent }[] = [
  {
    n: 'Option 01',
    title: 'Fully on-premise',
    text: "Everything runs on servers inside the organisation's premises. Video, records and evidence never leave. Language and AI models run on local GPU servers.",
    accent: 'field',
  },
  {
    n: 'Option 02',
    title: 'Private cloud',
    text: 'A dedicated cluster the organisation controls, with elastic compute for peak load. Suited to estates with many sites and variable inference demand.',
    accent: 'watch',
  },
  {
    n: 'Option 03',
    title: 'Hybrid',
    text: 'Inference at the edge with central correlation and reporting. Only metadata, vectors and alert snapshots cross the network — not video.',
    accent: 'draft',
  },
];

export const security = [
  [
    'Sovereign processing',
    "AI runs on servers inside the organisation's premises where the deployment requires it.",
  ],
  ['Zero-trust access', 'identity-based, multi-factor, least privilege, micro-segmented.'],
  ['Encryption', "at rest and in transit, with key management under the organisation's control."],
  [
    'Role-based access',
    'what a person sees depends on their rank, unit and jurisdiction; access is removed in one click on transfer.',
  ],
  [
    'Immutable audit',
    'every search, view, download, approval and AI draft recorded with who, when and why, exportable for audit or court.',
  ],
  [
    'Sensitive data masked',
    'identifiers and victim details masked by default; revealing them needs a reason, and is logged.',
  ],
];
export const evidence = [
  ['Hashed on capture', 'evidence is hashed at the moment of capture, before upload.'],
  [
    'Chain of custody',
    'every step from capture to report is logged, with statutory certificates produced for digital records.',
  ],
  ['Geotag and timestamp', 'location and time watermarked onto field evidence.'],
  [
    'Provenance travels with the finding',
    'source, timestamp and hash stay attached, because an AI assessment is not admissible alone.',
  ],
  [
    'AI suggests, a human decides',
    'face matches, risk scores, section suggestions and drafted documents are reviewed and approved before any action.',
  ],
  [
    'Forensic soundness',
    'seized-device data is imaged write-protected with the original untouched.',
  ],
];

export const proof = [
  ['2', 'state police forces running the platform'],
  ['7', 'police programmes live across those forces'],
  ['20 lakh+', 'traffic challans generated (over 2 million)'],
  ['8,500+', 'helpline calls handled by the AI voice agent in ten operating days'],
  ['1,500+', 'potential financial-fraud cases identified from those calls'],
  ['56', 'stores in the retail intelligence deployment'],
  ['1,000+', 'camera endpoints continuously monitored'],
  ['24', 'districts covered by statewide traffic enforcement on existing CCTV'],
];

export const beforeAfter = [
  [
    'Road coverage',
    'Spot checks at a few points, for a few hours',
    'Every lane watched, around the clock',
  ],
  [
    'Night evidence',
    'Plates and seatbelts hard to read after dark',
    'Two images per violation, readable at night',
  ],
  [
    'Helpline calls',
    'Notes taken by hand; detail lost between the call and the file',
    'Every call transcribed, classified and turned into a structured case',
  ],
  [
    'Supervision memos',
    'Days to draft, and repeat lapses went unseen',
    'Drafts within minutes, with automatic escalation after three warnings',
  ],
  [
    'Offender registry',
    'One person scattered across three systems',
    'One master profile with linked cases and routed release alerts',
  ],
  [
    'Store monitoring',
    'A passive archive reviewed hours or days later',
    'Sixteen measured KPIs with evidence against each',
  ],
];

export const companyFacts = [
  ['1991', 'founded, headquartered in Hyderabad'],
  ['10', 'countries of presence'],
  ['BSE + NSE', 'listed · 539607 and BLUECLOUDS'],
  ['ISO', '9001:2015 and 27001:2022'],
];

export const engagement = [
  [
    'Assess',
    'Site survey of cameras, recorders and network; the problems that matter most; integrations and approvals mapped.',
  ],
  [
    'Pilot',
    'A scoped deployment on your own feeds and records, measured against what you asked it to change.',
  ],
  [
    'Deploy',
    'Rollout to the units and sites where the pilot proved out, with training and handover.',
  ],
  [
    'Scale',
    'Additional modules, sites or verticals added onto the same platform and the same identity model.',
  ],
];

/**
 * Demonstrations: NEW section asked for by the plan. Every entry is an existing demo on the
 * live site; the line under each is that demo page's own headline.
 */
export const demos: { path: string; slug: string; title: string; line: string }[] = [
  {
    path: '/demos/traffic-analytics/',
    slug: 'access-genie',
    title: 'Traffic AI Analytics',
    line: 'Live demo · 40 cameras' /* CHANGED: the demo page says 21 analytics but runs 20; fixed at Gate 5 */,
  },
  {
    path: '/demos/garuda/',
    slug: 'garuda',
    title: 'GARUDA Ecosystem',
    line: 'One front door. Thirteen products. Working as one.',
  },
  {
    path: '/demos/blura-saga/',
    slug: 'blura-saga',
    title: 'Blura SAGA',
    line: 'One engine. Four intelligence workspaces.',
  },
  {
    path: '/demos/smartcop/',
    slug: 'smartcop',
    title: 'SmartCOP',
    line: 'One platform. From the beat to command.',
  },
  {
    path: '/demos/bluvaani/',
    slug: 'bluvaani',
    title: 'BluVaani',
    line: 'One citizen call. Understood, recorded, acted on.',
  },
  {
    path: '/demos/ai-copwriter/',
    slug: 'ai-copwriter',
    title: 'AI CopWriter',
    line: 'Complaint in ਪੰਜਾਬੀ. FIR draft in English.',
  },
  {
    path: '/demos/women-safety-portal/',
    slug: 'women-safety-portal',
    title: 'Women Safety Portal',
    line: 'One registry. Two doors. One limit.',
  },
  {
    path: '/demos/geo-intelligence/',
    slug: 'geo-intelligence',
    title: 'Geo Intelligence',
    line: 'Any state. Layer by layer.',
  },
  {
    path: '/demos/memo-generator/',
    slug: 'memo-generator',
    title: 'Compliant Memo Generator',
    line: "Last night's raids. This morning's memos.",
  },
  {
    path: '/demos/bluflow/',
    slug: 'bluflow',
    title: 'BluFlow',
    line: 'Scattered financial records. One connected picture. For every industry.',
  },
  {
    path: '/demos/access-genie-retail/',
    slug: 'access-genie-retail',
    title: 'Access Genie Retail',
    line: 'Unified Intelligence. 56 Jewellery Stores. 16 Critical KPIs.',
  },
];

/**
 * Enquiry options. CHANGED: the live list offered "Access Genie — policing (GARUDA)" and left out
 * eight products. GARUDA is now its own option and every product is listed; existing labels are kept.
 */
export const enquiryOptions = [
  "GARUDA – Blue Cloud's Policing Operational Ecosystem",
  'Access Genie — retail',
  'Access Genie — another industry',
  'BluGo',
  'Blura SAGA',
  'EduGenie',
  'SmartCOP',
  'BluVaani — the sovereign AI call dispatcher',
  'AI CopWriter',
  'FIR Automation',
  'Compliant Memo Generator',
  'Women Safety Portal',
  'Drug Offender Portal',
  'BluFlow',
  'Digital Forensics',
  'Trap Case Management',
  'Grievance Management',
  'Geo Intelligence',
  'The whole portfolio',
];
