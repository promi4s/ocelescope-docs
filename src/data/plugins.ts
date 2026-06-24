export interface Plugin {
  name: string;
  href: string;
  monogram: string;
  author?: string;
  showLanding?: boolean;
}

export const plugins: Plugin[] = [
  {
    name: "PM4PY Discovery",
    href: "https://github.com/Grkmr/pm4py-discovery",
    monogram: "PD",
    author: "Görkem Öztürk",
    showLanding: true,
  },
  {
    name: "TOTeM",
    href: "https://github.com/Grkmr/TOTeM",
    monogram: "TM",
    author: "Görkem Öztürk",
    showLanding: true,
  },
  {
    name: "OC-DECLARE",
    href: "https://github.com/Grkmr/OC-Declare",
    monogram: "OD",
    author: "Görkem Öztürk",
    showLanding: true,
  },
  {
    name: "OCEL Graph",
    href: "https://github.com/Grkmr/OcelGraph",
    monogram: "OG",
    author: "Görkem Öztürk",
    showLanding: true,
  },
];
