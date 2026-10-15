// ---------------------------------------------------------------------------
// Live sites — the real, deployed websites shown in the scrolling showcase on
// the home page. Each is a live screenshot (auto-generated from the URL) that
// links straight to the site. Add/remove entries here.
// ---------------------------------------------------------------------------

export interface LiveSite {
  name: string;
  url: string;
  group: 'Primary' | 'Event';
  accent: string; // fallback gradient tint before the screenshot loads
}

export const primarySites: LiveSite[] = [
  { name: 'ARI', url: 'https://www.theari.us/', group: 'Primary', accent: '#5b7fa6' },
  { name: 'RAM', url: 'https://www.theari.us/ram/', group: 'Primary', accent: '#4a5d7e' },
  { name: 'Heartland BioWorks', url: 'https://www.heartlandbioworks.com/', group: 'Primary', accent: '#5a8f7b' },
  { name: 'SciTech Connect', url: 'https://www.scitechconnect.us/scitech-fradyupdate/home', group: 'Primary', accent: '#3f6f8f' },
  { name: 'MAIN Hub', url: 'https://main-hub-mock.vercel.app/', group: 'Primary', accent: '#7c9a76' },
  { name: 'PGC', url: 'https://www.pgc.capital/', group: 'Primary', accent: '#9c8f6f' },
  { name: 'UAS Test Site', url: 'https://uas-test-site.vercel.app/', group: 'Primary', accent: '#6f9c5a' },
  { name: 'DARPAConnect', url: 'https://darpa-connect.vercel.app/', group: 'Primary', accent: '#7a6f9c' },
  { name: 'MDIS', url: 'https://www.midwestdefenseinnovationsummit.com/', group: 'Primary', accent: '#c2554d' },
];

export const eventSites: LiveSite[] = [
  { name: 'HBW Groundbreaking', url: 'https://events.bizzabo.com/863867', group: 'Event', accent: '#5a8f7b' },
  { name: 'Crane Congressional Breakfast', url: 'https://events.bizzabo.com/CraneCongressionalBreakfast2026', group: 'Event', accent: '#4a5d7e' },
  { name: 'Crane Congressional Reception', url: 'https://events.bizzabo.com/CraneCongressionalReception-Breakfast2026', group: 'Event', accent: '#5b7fa6' },
  { name: 'HBW Lunch & Learn', url: 'https://events.bizzabo.com/921636', group: 'Event', accent: '#5a8f7b' },
  { name: 'SciTechConnect Jackson', url: 'https://events.bizzabo.com/SciTechConnectJackson', group: 'Event', accent: '#3f6f8f' },
  { name: 'DARPA Colorado', url: 'https://events.bizzabo.com/DARPA-Colorado', group: 'Event', accent: '#7a6f9c' },
  { name: 'UAS Test Site Ribbon Cutting', url: 'https://events.bizzabo.com/UAS-TestSite-RC', group: 'Event', accent: '#6f9c5a' },
  { name: 'UWBG Market ID Event', url: 'https://events.bizzabo.com/scmc-uwbg-market-identification-event', group: 'Event', accent: '#9c8f6f' },
];

export const allLiveSites: LiveSite[] = [...primarySites, ...eventSites];
