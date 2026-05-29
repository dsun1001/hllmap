export const SITE_ORIGIN = "https://hllmap.com";

export const VIEW_LABELS = {
  map: "Default Garrisons",
  tanks: "Tanks"
};

export const GAMES = [
  {
    id: "hll",
    label: "Hell Let Loose",
    shortLabel: "HLL"
  },
  {
    id: "vietnam",
    label: "Hell Let Loose: Vietnam",
    shortLabel: "HLL:V"
  }
];

export const FACTIONS = {
  unitedStates: {
    label: "United States",
    flagImage: "/images/flags/us.svg"
  },
  unitedKingdom: {
    label: "United Kingdom",
    flagImage: "/images/flags/uk.svg"
  },
  germany: {
    label: "German Army",
    flagImage: "/images/flags/balkenkreuz.svg"
  },
  sovietUnion: {
    label: "Soviet Union",
    flagImage: "/images/flags/soviet-union.svg"
  },
  northVietnam: {
    label: "North Vietnam",
    flagImage: "/images/flags/north-vietnam.svg"
  }
};

export const MAPS = [
  {
    id: "carentan",
    label: "Carentan",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/carentan_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/carentan_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "driel",
    label: "Driel",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedKingdom", image: "/images/driel_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/driel_axis.webp", tankImage: "/images/tanks/british_tanks.jpg" }
    ]
  },
  {
    id: "el-alamein",
    label: "El Alamein",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedKingdom", image: "/images/elalamein_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/elalamein_axis.webp", tankImage: "/images/tanks/british_8th_tanks.jpg" }
    ]
  },
  {
    id: "elsenborn-ridge",
    label: "Elsenborn Ridge",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/elsenbornridge_allies.webp", tankImage: "/images/tanks/germany_winter_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/elsenbornridge_axis.webp", tankImage: "/images/tanks/us_winter_tanks.jpg" }
    ]
  },
  {
    id: "foy",
    label: "Foy",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/foy_allies.webp", tankImage: "/images/tanks/germany_winter_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/foy_axis.webp", tankImage: "/images/tanks/us_winter_tanks.jpg" }
    ]
  },
  {
    id: "hill-400",
    label: "Hill 400",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/hill400_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/hill400_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "hurtgen-forest",
    label: "Hurtgen Forest",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/hurtgenforest_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/hurtgenforest_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "kharkov",
    label: "Kharkov",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "sovietUnion", image: "/images/kharkov_allies.webp", tankImage: "/images/tanks/germany_winter_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/kharkov_axis.webp", tankImage: "/images/tanks/soviet_winter_tanks.jpg" }
    ]
  },
  {
    id: "kursk",
    label: "Kursk",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "sovietUnion", image: "/images/kursk_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/kursk_axis.webp", tankImage: "/images/tanks/soviet_tanks.jpg" }
    ]
  },
  {
    id: "mortain",
    label: "Mortain",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/mortain_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/mortain_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "omaha-beach",
    label: "Omaha Beach",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/omahabeach_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/omahabeach_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "purple-heart-lane",
    label: "Purple Heart Lane",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/purpleheartlane_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/purpleheartlane_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "remagen",
    label: "Remagen",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/remagen_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/remagen_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "saint-marie-du-mont",
    label: "Saint Marie Du Mont",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/saintmariedumont_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/saintmariedumont_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "saint-marie-egliese",
    label: "Saint Marie Eglise",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/saintmarieegliese_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/saintmarieegliese_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "smolensk",
    label: "Smolensk",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "sovietUnion", image: "/images/smolensk_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/smolensk_axis.webp", tankImage: "/images/tanks/soviet_tanks.jpg" }
    ]
  },
  {
    id: "stalingrad",
    label: "Stalingrad",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "sovietUnion", image: "/images/stalingrad_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/stalingrad_axis.webp", tankImage: "/images/tanks/soviet_tanks.jpg" }
    ]
  },
  {
    id: "tobruk",
    label: "Tobruk",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedKingdom", image: "/images/tobruk_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/tobruk_axis.webp", tankImage: "/images/tanks/british_8th_tanks.jpg" }
    ]
  },
  {
    id: "utah-beach",
    label: "Utah Beach",
    game: "hll",
    teams: [
      { id: "allies", slug: "allies", label: "Allies", faction: "unitedStates", image: "/images/utahbeach_allies.webp", tankImage: "/images/tanks/germany_tanks.jpg" },
      { id: "axis", slug: "axis", label: "Axis", faction: "germany", image: "/images/utahbeach_axis.webp", tankImage: "/images/tanks/us_tanks.jpg" }
    ]
  },
  {
    id: "thanh-hoa-bridge",
    label: "Thanh Hóa Bridge",
    game: "vietnam",
    legacyTeamSlugs: {
      allies: "us",
      axis: "nva"
    },
    teams: [
      { id: "us", slug: "us", label: "US", faction: "unitedStates", image: "/images/thanhhoabridge_us.webp" },
      { id: "nva", slug: "nva", label: "NVA", faction: "northVietnam", image: "/images/thanhhoabridge_nva.webp" }
    ]
  }
];

export const MAP_HISTORIES = {
  carentan: {
    summary: "The Battle of Carentan was fought in June 1944 as U.S. airborne forces pushed to link the Utah and Omaha beachheads.",
    objectives: {
      allies: "The Allied objective was to seize Carentan and open a continuous inland route between the American landing areas.",
      axis: "The Axis objective was to hold the town and counterattack hard enough to keep the beachheads divided."
    },
    outcome: "U.S. forces captured and held Carentan, helping secure the Normandy lodgment and supporting the later breakout from the beachhead."
  },
  driel: {
    summary: "The fighting around Driel formed part of Operation Market Garden in September 1944, with Allied troops trying to force a route across the Lower Rhine near Arnhem.",
    objectives: {
      allies: "The Allied objective was to use airborne and ground forces to secure crossings and relieve the isolated British airborne troops north of the river.",
      axis: "The Axis objective was to contain the bridgehead, block crossings near Driel and Arnhem, and destroy the airborne pocket."
    },
    outcome: "The Allies failed to hold the Arnhem crossing, and the setback ended hopes for a rapid thrust into northern Germany in 1944."
  },
  "el-alamein": {
    summary: "The Second Battle of El Alamein was fought in Egypt in October and November 1942 at the climax of the Western Desert campaign.",
    objectives: {
      allies: "The Allied objective was for the British Eighth Army to break the Axis defensive line, clear minefields, and protect Egypt and the Suez Canal.",
      axis: "The Axis objective was to hold the Alamein line, preserve the German-Italian army, and keep pressure on Egypt."
    },
    outcome: "The Allied victory forced a long Axis retreat across North Africa and became a major turning point in the campaign."
  },
  "elsenborn-ridge": {
    summary: "Elsenborn Ridge was a key defensive position on the northern shoulder of the Battle of the Bulge in December 1944.",
    objectives: {
      allies: "The Allied objective was to hold the ridge, block the roads west, and deny German armor a route toward the Meuse River and Antwerp.",
      axis: "The Axis objective was to break through the Ardennes quickly, capture key road networks, and drive toward Antwerp."
    },
    outcome: "American forces held the ridge, blunting the northern German attack and forcing costly delays that weakened the Ardennes offensive."
  },
  foy: {
    summary: "The fight for Foy took place north of Bastogne in January 1945 as Allied forces pushed back after the German siege of the town.",
    objectives: {
      allies: "The Allied objective was to clear Foy and nearby approaches so Bastogne could be expanded into a stronger base for counterattack.",
      axis: "The Axis objective was to hold the villages north of Bastogne and delay Allied pressure against the shrinking Bulge salient."
    },
    outcome: "The capture of Foy helped open the northern approaches from Bastogne and marked another step in reducing the German offensive."
  },
  "hill-400": {
    summary: "Hill 400, also called Castle Hill, dominated the village of Bergstein during the brutal fighting in the Hurtgen Forest in late 1944.",
    objectives: {
      allies: "The Allied objective was to seize the high ground for observation over German routes, artillery positions, and the Roer River approaches.",
      axis: "The Axis objective was to retake or neutralize the hill to deny American observers control over the surrounding forest and valleys."
    },
    outcome: "The hill changed hands under heavy fire, and the costly struggle showed how the Hurtgen fighting slowed the Allied advance toward the Roer."
  },
  "hurtgen-forest": {
    summary: "The Battle of Hurtgen Forest was a long, attritional campaign fought along the German border from September to December 1944.",
    objectives: {
      allies: "The Allied objective was to clear the forest, protect the flank of the advance, and reach the Roer River dams before Germany could use them defensively.",
      axis: "The Axis objective was to exploit the terrain, fortifications, mines, and artillery to slow the Americans and preserve the western defense line."
    },
    outcome: "The battle became one of the U.S. Army's costliest European campaigns and delayed the push toward the Rhine."
  },
  kharkov: {
    summary: "The Third Battle of Kharkov was fought in February and March 1943 after Soviet advances following Stalingrad overextended the front.",
    objectives: {
      allies: "The Soviet objective was to hold Kharkov and continue the winter offensive into German-held Ukraine.",
      axis: "The German objective was to counterattack, recapture Kharkov, and restore the southern front before the spring thaw."
    },
    outcome: "Germany retook Kharkov and stabilized the front, setting conditions for the later summer battle at Kursk."
  },
  kursk: {
    summary: "The Battle of Kursk in July 1943 centered on Germany's Operation Citadel against a large Soviet salient.",
    objectives: {
      allies: "The Soviet objective was to absorb the German armored attack in deep defensive belts and then launch counteroffensives.",
      axis: "The German objective was to pinch off the Kursk salient, destroy Soviet formations, and regain the initiative after Stalingrad."
    },
    outcome: "The German offensive failed, and the Soviet victory shifted strategic initiative on the Eastern Front decisively toward the Red Army."
  },
  mortain: {
    summary: "The Battle of Mortain in August 1944 was Germany's Operation Luttich counterattack after the American breakout from Normandy.",
    objectives: {
      allies: "The Allied objective was to hold Mortain and the Avranches corridor so Patton's forces could keep moving into Brittany and across France.",
      axis: "The Axis objective was to cut through to Avranches, split the American armies, and reverse the Normandy breakout."
    },
    outcome: "The counterattack failed, exposing German forces to encirclement and helping lead to the Falaise Pocket disaster."
  },
  "omaha-beach": {
    summary: "Omaha Beach was one of the American landing zones on D-Day, 6 June 1944, and saw some of the heaviest fighting of the Normandy landings.",
    objectives: {
      allies: "The Allied objective was to secure the beach exits, move inland, and connect the American and British landing areas.",
      axis: "The Axis objective was to use coastal defenses, strongpoints, and artillery to stop the invasion at the waterline."
    },
    outcome: "U.S. forces broke through after severe losses, giving the Allies a vital Normandy foothold."
  },
  "purple-heart-lane": {
    summary: "Purple Heart Lane was the exposed causeway approach toward Carentan, where U.S. airborne troops fought through marshland and German fire in June 1944.",
    objectives: {
      allies: "The Allied objective was to advance along the causeway, secure Carentan, and link the Utah and Omaha beachheads.",
      axis: "The Axis objective was to defend the flooded approaches and delay the American move into Carentan."
    },
    outcome: "The costly advance helped open the route into Carentan and contributed to connecting the U.S. landing areas."
  },
  remagen: {
    summary: "The Battle of Remagen began in March 1945 when U.S. forces found the Ludendorff Bridge over the Rhine still standing.",
    objectives: {
      allies: "The Allied objective was to seize the bridge intact and rapidly build a bridgehead east of the Rhine.",
      axis: "The Axis objective was to demolish the bridge, contain the bridgehead, and prevent a major Allied crossing into Germany."
    },
    outcome: "The bridge was captured and used before it collapsed, accelerating Allied pressure across the Rhine and into western Germany."
  },
  "saint-marie-du-mont": {
    summary: "Saint Marie Du Mont sat near the Utah Beach exits and airborne drop zones during the opening phase of D-Day.",
    objectives: {
      allies: "The Allied objective was to secure the village, roads, and causeways needed to move troops inland from Utah Beach.",
      axis: "The Axis objective was to hold the inland approaches and delay the link between seaborne and airborne American forces."
    },
    outcome: "American troops captured the area early in the invasion, helping Utah Beach develop into a secure and expandable landing zone."
  },
  "saint-marie-egliese": {
    summary: "Sainte-Mere-Eglise was a vital Normandy crossroads captured by U.S. airborne forces in the early hours of 6 June 1944.",
    objectives: {
      allies: "The Allied objective was to hold the town and block German movement toward the Utah Beach landings.",
      axis: "The Axis objective was to counterattack the crossroads and restore control over the roads behind the beach."
    },
    outcome: "The airborne defense held, protecting the Utah flank and making Sainte-Mere-Eglise one of the first liberated towns in France."
  },
  smolensk: {
    summary: "The 1941 Battle of Smolensk was fought during Operation Barbarossa on the main road toward Moscow.",
    objectives: {
      allies: "The Soviet objective was to slow the German advance, defend the Smolensk gateway, and preserve forces where possible.",
      axis: "The German objective was to encircle Soviet armies around Smolensk and clear the path for a drive on Moscow."
    },
    outcome: "Germany captured the city after major encirclements, but Soviet resistance delayed the timetable for the advance on Moscow."
  },
  stalingrad: {
    summary: "The Battle of Stalingrad raged from 1942 into early 1943 as German forces tried to seize the Volga city.",
    objectives: {
      allies: "The Soviet objective was to hold the city, wear down the attackers, and prepare a wider encirclement of the German flanks.",
      axis: "The German objective was to capture Stalingrad, cut Volga traffic, and protect the wider drive toward the Caucasus oil fields."
    },
    outcome: "Operation Uranus encircled and destroyed the German Sixth Army, making Stalingrad a decisive turning point of the war."
  },
  tobruk: {
    summary: "Tobruk was a major Libyan port and fortress fought over during the North African campaign.",
    objectives: {
      allies: "The Allied objective was to hold or recapture the port to protect supply lines and threaten the Axis flank in Libya.",
      axis: "The Axis objective was to seize Tobruk, remove the Allied port base, and support the advance toward Egypt."
    },
    outcome: "Control of Tobruk shaped the tempo of the desert war, with its sieges and captures affecting supply, morale, and the fight for Egypt."
  },
  "utah-beach": {
    summary: "Utah Beach was the western American landing beach on D-Day, tied closely to airborne operations in the Cotentin Peninsula.",
    objectives: {
      allies: "The Allied objective was to secure the beach, open the causeway exits, link with airborne forces, and push toward Cherbourg.",
      axis: "The Axis objective was to defend the coastal strongpoints and delay any inland breakout from the beach."
    },
    outcome: "The landing succeeded with comparatively light losses, giving the Allies a strong base for the Cotentin and Cherbourg campaigns."
  },
  "thanh-hoa-bridge": {
    summary: "Thanh Hóa Bridge, the Dragon's Jaw, was a heavily defended North Vietnamese rail and road bridge targeted repeatedly from 1965 to 1972.",
    objectives: {
      us: "The US objective was to destroy or disable the bridge to disrupt North Vietnamese logistics moving south.",
      nva: "The NVA objective was to defend, repair, and keep the crossing usable as part of North Vietnam's transport network."
    },
    outcome: "The bridge survived many conventional attacks before precision-guided weapons disabled it in 1972, showing both the limits of earlier interdiction and the impact of guided munitions."
  }
};

export const PREVIEW_CREDITS = {
  carentan: {
    image: "/images/previews/carentan.jpg",
    title: "Airborne Troops in Carentan Captured Kubelwagen",
    author: "U.S. Army Signal Corps / National Archives",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Airborne_Troops_in_Carentan_Captured_Kubelwagen.jpg"
  },
  driel: {
    image: "/images/previews/driel.jpg",
    title: "Aerial view of the bridge over the Neder Rijn, Arnhem",
    author: "Unknown author; post-work by W.wolny",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_the_bridge_over_the_Neder_Rijn,_Arnhem.jpg"
  },
  "el-alamein": {
    image: "/images/previews/el-alamein.jpg",
    title: "Italian Bersaglieri, El Alamein 1942",
    author: "Wayne at Battlefield",
    license: "CC BY 4.0",
    source: "https://commons.wikimedia.org/wiki/File:Italian_Bersaglieri,_El_Alamein_1942.jpg"
  },
  "elsenborn-ridge": {
    image: "/images/previews/elsenborn-ridge.jpg",
    title: "US Gun Position on Elsenborn Ridge",
    author: "U.S. Signal Corps",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:US_Gun_Position_on_Elsenborn_Ridge.jpg"
  },
  foy: {
    image: "/images/previews/foy.jpg",
    title: "German equipment near Foy-Notre-Dame, 1944",
    author: "Sgt. Midgley, No. 5 Army Film & Photographic Unit",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:IWM-B-13260-german-equipment-near-Foy-Notre-Dame-19441229.jpg"
  },
  "hill-400": {
    image: "/images/previews/hill-400.jpg",
    title: "Artillery-damaged trees in the Hürtgen Forest",
    author: "U.S. military",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Artillery-damaged_trees_in_the_H%C3%BCrtgen_Forest.jpg"
  },
  "hurtgen-forest": {
    image: "/images/previews/hurtgen-forest.jpg",
    title: "U.S. infantrymen leave the muddy road to enter the Hürtgen Forest",
    author: "Signal Corps Archive",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:SC_270664_-_U.S._infantrymen_leave_the_muddy_road_to_enter_the_the_Hurtgen_Forest,_Germany,_as_they_advance_against_German_installations_in_the_wooded_area._18_November,_1944._(52274984843).jpg"
  },
  kharkov: {
    image: "/images/previews/kharkov.jpg",
    title: "Kharkov, August 1943",
    author: "Unknown Soviet photographer",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Kharkov_agosto_1943.jpg"
  },
  kursk: {
    image: "/images/previews/kursk.jpg",
    title: "T-34 at Kursk",
    author: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:T34_Kursk.jpg"
  },
  mortain: {
    image: "/images/previews/mortain.jpg",
    title: "Battle of Mortain - Devastated German Tank",
    author: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Battle_of_Mortain_-_Devastated_German_Tank.jpg"
  },
  "omaha-beach": {
    image: "/images/previews/omaha-beach.jpg",
    title: "Infantry landing craft approach Omaha Beach in June 1944",
    author: "Wall, U.S. Army Signal Corps",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Infantry_landing_craft_approach_Omaha_Beach_in_June_1944.jpg"
  },
  "purple-heart-lane": {
    image: "/images/previews/purple-heart-lane.jpg",
    title: "Carentan Causeway 01",
    author: "U.S. Army",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Carentan_Causeway_01.jpg"
  },
  remagen: {
    image: "/images/previews/remagen.jpg",
    title: "Ludendorff Bridge at Remagen",
    author: "U.S. Signal Corps / National Archives",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Ludendorff_Bridge_at_Remagen.jpg"
  },
  "saint-marie-du-mont": {
    image: "/images/previews/saint-marie-du-mont.jpg",
    title: "Le 12 juin 1944 à Sainte-Marie-du-Mont",
    author: "Patrick Peccatte and Michel Le Querrec",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Le_12_juin_1944_%C3%A0_Sainte-Marie-du-Mont.jpg"
  },
  "saint-marie-egliese": {
    image: "/images/previews/saint-marie-egliese.jpg",
    title: "St. Mere Eglise, 1944",
    author: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:St._Mere_Eglise_1944.jpg"
  },
  smolensk: {
    image: "/images/previews/smolensk.jpg",
    title: "Soviet cavalry attack, 1941",
    author: "Max Alpert",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:%D0%A1%D0%BE%D0%B2%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B5_%D0%BA%D0%B0%D0%B2%D0%B0%D0%BB%D0%B5%D1%80%D0%B8%D1%81%D1%82%D1%8B_%D0%B2_%D1%81%D0%B0%D0%B1%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%B9_%D0%B0%D1%82%D0%B0%D0%BA%D0%B5_1941.jpg"
  },
  stalingrad: {
    image: "/images/previews/stalingrad.jpg",
    title: "Stalingrad aftermath",
    author: "Unknown author",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Stalingrad_aftermath.jpg"
  },
  tobruk: {
    image: "/images/previews/tobruk.jpg",
    title: "Tobruk trenches",
    author: "Lt. Smith, No. 1 Army Film & Photographic Unit",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Tobruk_trenches.jpg"
  },
  "utah-beach": {
    image: "/images/previews/utah-beach.jpg",
    title: "Landings on Utah beach",
    author: "Photographer: Wall; post-work: W.wolny",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Landings_on_Utah_beach.jpg"
  },
  "thanh-hoa-bridge": {
    image: "/images/previews/thanh-hoa-bridge.jpg",
    title: "Thanh Hoa bridge Vietnam 1972",
    author: "Bud Taylor, VF-161, USN",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Thanh_Hoa_bridge_Vietnam_1972.jpg"
  }
};

export const FLAG_CREDITS = [
  {
    label: "United States",
    title: "Flag of the United States.svg",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Flag_of_the_United_States.svg"
  },
  {
    label: "United Kingdom",
    title: "Flag of the United Kingdom.svg",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Flag_of_the_United_Kingdom.svg"
  },
  {
    label: "German Army",
    title: "Balkenkreuz.svg",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Balkenkreuz.svg"
  },
  {
    label: "Soviet Union",
    title: "Flag of the Soviet Union.svg",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Flag_of_the_Soviet_Union.svg"
  },
  {
    label: "North Vietnam",
    title: "Flag of North Vietnam (1955-1976).svg",
    license: "Public domain",
    source: "https://commons.wikimedia.org/wiki/File:Flag_of_North_Vietnam_(1955%E2%80%931976).svg"
  }
];

export function getGame(gameId) {
  return GAMES.find(game => game.id === gameId) || GAMES[0];
}

export function getFaction(factionId) {
  return FACTIONS[factionId] || null;
}

export function getMapsByGame(gameId) {
  return MAPS.filter(map => map.game === gameId);
}

export function getMap(mapId) {
  return MAPS.find(map => map.id === mapId) || null;
}

export function getTeam(map, teamSlug) {
  return map?.teams.find(team => team.slug === teamSlug || team.id === teamSlug) || null;
}

export function getDefaultRouteForMap(map, preferredTeamSlug = null, preferredView = "map") {
  const team = getTeam(map, preferredTeamSlug) || map.teams[0];
  const view = preferredView === "tanks" && team.tankImage ? "tanks" : "map";
  return {
    type: "detail",
    map,
    team,
    view,
    path: getDetailPath(map, team, view)
  };
}

export function getDetailPath(map, team, view = "map") {
  return `/${map.id}/${team.slug}/${view}`;
}

export function getCanonicalUrl(path) {
  if (path === "/") return `${SITE_ORIGIN}/`;
  return `${SITE_ORIGIN}${path}`;
}

export function getImageForRoute(route) {
  if (route.type !== "detail") return "/images/tank_id.webp";
  return route.view === "tanks" ? route.team.tankImage : route.team.image;
}

export function getPreviewImageForMap(map) {
  return PREVIEW_CREDITS[map.id]?.image || map.teams[0].image;
}

export function getPreviewCredits() {
  return MAPS
    .map(map => ({ map, credit: PREVIEW_CREDITS[map.id] }))
    .filter(item => item.credit);
}

export function getFlagCredits() {
  return FLAG_CREDITS;
}

export function getMapHistory(map) {
  return map ? MAP_HISTORIES[map.id] || null : null;
}

export function getRouteHeading(route) {
  if (route.type === "home") return "HLL Map";
  if (route.type === "about") return "About HLL Map";
  return `${route.map.label} ${route.team.label} ${VIEW_LABELS[route.view]}`;
}

export function getSeo(route) {
  if (route.type === "about") {
    return {
      title: "HLL Map - About",
      description: "About hllmap.com, a fan-made tool for Hell Let Loose default garrison maps and tank identification.",
      canonical: getCanonicalUrl("/about"),
      image: getCanonicalUrl("/images/tank_id.webp"),
      heading: getRouteHeading(route)
    };
  }

  if (route.type === "detail") {
    const game = getGame(route.map.game);
    const heading = getRouteHeading(route);
    const isTanks = route.view === "tanks";
    const history = getMapHistory(route.map);
    return {
      title: heading,
      description: history
        ? `${history.summary} View ${route.map.label} ${route.team.label} ${isTanks ? "tank identification" : "default garrison locations"} for ${game.label}.`
        : isTanks
          ? `${route.map.label} ${route.team.label} tank identification for ${game.label}. Use this page to identify enemy tanks on ${route.map.label}.`
          : `${route.map.label} ${route.team.label} default garrison locations for ${game.label}. Use this map to find Offensive mode default garrison spawn locations.`,
      canonical: getCanonicalUrl(route.path),
      image: getCanonicalUrl(getImageForRoute(route)),
      heading
    };
  }

  return {
    title: "HLL Map - Default Garrisons and Tank Identification",
    description: "HLL Map helps you find Hell Let Loose default garrison locations, switch between games, maps, and teams, and identify tanks.",
    canonical: getCanonicalUrl("/"),
    image: getCanonicalUrl("/images/tank_id.webp"),
    heading: "HLL Map"
  };
}

export function parseRoute(pathname) {
  const cleanPath = normalizePath(pathname);
  if (cleanPath === "/") return { type: "home", path: "/" };
  if (cleanPath === "/about" || cleanPath === "/about.html") return { type: "about", path: "/about" };

  const [, mapId, teamSlug, view] = cleanPath.split("/");
  const map = getMap(mapId);
  if (!map || !teamSlug || !view) return { type: "notFound", path: cleanPath };

  let team = getTeam(map, teamSlug);
  if (!team && map.legacyTeamSlugs?.[teamSlug]) {
    team = getTeam(map, map.legacyTeamSlugs[teamSlug]);
    return {
      type: "redirect",
      to: getDetailPath(map, team, view === "tanks" && team.tankImage ? "tanks" : "map")
    };
  }

  if (!team) return { type: "notFound", path: cleanPath };
  if (view !== "map" && view !== "tanks") return { type: "redirect", to: getDetailPath(map, team, "map") };
  if (view === "tanks" && !team.tankImage) return { type: "redirect", to: getDetailPath(map, team, "map") };

  return {
    type: "detail",
    map,
    team,
    view,
    path: getDetailPath(map, team, view)
  };
}

export function getIndexableRoutes() {
  const routes = [
    { type: "home", path: "/" },
    { type: "about", path: "/about" }
  ];

  for (const map of MAPS) {
    for (const team of map.teams) {
      routes.push({ type: "detail", map, team, view: "map", path: getDetailPath(map, team, "map") });
      if (team.tankImage) {
        routes.push({ type: "detail", map, team, view: "tanks", path: getDetailPath(map, team, "tanks") });
      }
    }
  }

  return routes;
}

export function getSitemapXml() {
  const urls = getIndexableRoutes()
    .map(route => `  <url>\n    <loc>${getSeo(route).canonical}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

function normalizePath(pathname) {
  if (!pathname || pathname === "/") return "/";
  const path = pathname.split("?")[0].split("#")[0];
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}
