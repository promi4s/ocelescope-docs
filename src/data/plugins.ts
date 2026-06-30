export interface Plugin {
	name: string;
	href: string;
	monogram: string;
	author?: string;
	showLanding?: boolean;
	/** Bare DOI (e.g. "10.1007/978-3-031-70418-5_7"), without the doi.org URL prefix. */
	doi?: string;
}

export const plugins: Plugin[] = [
	{
		name: "PM4PY Discovery",
		href: "https://github.com/Grkmr/pm4py-discovery",
		monogram: "PD",
		author: "Görkem Öztürk",
		showLanding: true,
		doi: "10.3233/STAL200004",
	},
	{
		name: "TOTeM",
		href: "https://github.com/Grkmr/TOTeM",
		monogram: "TM",
		author: "Görkem Öztürk",
		showLanding: true,
		doi: "10.1007/978-3-031-70418-5_7",
	},
	{
		name: "OC-DECLARE",
		href: "https://github.com/Grkmr/OC-Declare",
		monogram: "OD",
		author: "Görkem Öztürk",
		showLanding: true,
		doi: "10.1007/978-3-032-02867-9_11",
	},
	{
		name: "OCEL Graph",
		href: "https://github.com/Grkmr/OcelGraph",
		monogram: "OG",
		author: "Görkem Öztürk",
		showLanding: true,
	},
	{
		name: "Object-Centric Inductive Miner",
		href: "https://github.com/uysah/ocim_plugin",
		monogram: "OC",
		author: "Uy Sa Huynh",
		showLanding: true,
	},
];
