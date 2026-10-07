/* EDIT YOUR WORDS AND IMAGE ENTRIES HERE.
   Keep the quotation marks and commas. See EDITING.md for examples.
   Every photograph below is a credited placeholder, not Éamonn's own work. */
window.SITE_CONTENT = {
  name: "Éamonn Needham",
  role: "Postdoctoral researcher · UC Davis",
  headline: "Reading the stories",
  headlineSecondLine: "written in",
  headlineEmphasis: "rocks.",
  introduction: "I study how rocks and crystals record the processes that shape Earth and the Moon.",
  biography: "My research combines laboratory experiments, microscopy, chemical measurements, and numerical models to investigate magma, mineral growth, and the preservation of geological histories.",
  groupUrl: "https://jwatkins529.github.io/",
  linkedInUrl: "https://www.linkedin.com/in/eamonn-needham-178535163",
  email: "",
  portrait: "",
  cv: "",
  poster: "",
  photos: [
    {
      id: "sierra", title: "A landscape of questions", category: "Field & landscapes",
      thumbnail: "assets/sierra-thumb.webp", full: "assets/sierra.webp",
      alt: "Snow-covered Sierra Nevada peaks above a dry valley and foothills.",
      caption: "Sierra Nevada, California. A reference photograph for the fieldwork collection.",
      credit: "G. Thomas, via USGS · public domain", placeholder: true,
      source: "https://www.usgs.gov/media/images/sierraescarpmentcajpg"
    },
    {
      id: "lava", title: "Magma at the surface", category: "Volcanic processes",
      thumbnail: "assets/lava-thumb.webp", full: "assets/lava.webp",
      alt: "Lava fountain and glowing lava flows at Kīlauea's fissure 8.",
      caption: "Kīlauea, fissure 8, 2018. A reference photograph for the volcanology pages.",
      credit: "USGS Hawaiian Volcano Observatory · public domain", placeholder: true,
      source: "https://www.usgs.gov/media/images/kilauea-volcano-fissure-8-lava-fountain-1"
    },
    {
      id: "crystals", title: "A closer look", category: "Crystals & textures",
      thumbnail: "assets/crystals-thumb.webp", full: "assets/crystals.webp",
      alt: "A rock thin section showing contrasting mineral colours under polarized light.",
      caption: "Thin section under polarized light. A reference image for microscopy and mineral textures.",
      credit: "USGS Core Research Center · public domain", placeholder: true,
      source: "https://www.usgs.gov/media/images/polarized-thin-section"
    },
    {
      id: "basalt", title: "Textures that preserve a history", category: "Crystals & textures",
      thumbnail: "assets/basalt-thumb.webp", full: "assets/basalt.webp",
      alt: "A dark vesicular basalt specimen with a porous surface against a plain background.",
      caption: "Vesicular basalt from the USGS specimen collection. A reference image for sample photography.",
      credit: "USGS · public domain", placeholder: true,
      source: "https://www.usgs.gov/media/images/vesicular-basalt-top-view"
    },
    {
      id: "moon", title: "Looking beyond Earth", category: "Earth & Moon",
      thumbnail: "assets/moon-thumb.webp", full: "assets/moon.webp",
      alt: "An Apollo 17 astronaut driving a lunar rover across the Moon's rocky surface.",
      caption: "Apollo 17: Eugene Cernan photographed by Harrison Schmitt on the lunar surface.",
      credit: "NASA / Apollo 17", placeholder: true,
      source: "https://www.nasa.gov/image-article/apollo-17-final-lunar-landing-mission-lands-moon-dec-11-1972/"
    },
    {
      id: "earth", title: "One planet, many histories", category: "Earth & Moon",
      thumbnail: "assets/earth-thumb.webp", full: "assets/earth.webp",
      alt: "The illuminated Earth seen from space, with blue oceans, white clouds, and Africa visible.",
      caption: "Earth photographed during Apollo 17. A reference image for the planetary science collection.",
      credit: "NASA / Apollo 17", placeholder: true,
      source: "https://www.nasa.gov/image-article/earth-full-view-from-apollo-17/"
    }
  ],
  projects: [
    {
      id: "volcanoes", number: "01", title: "Volcanic processes", image: "lava",
      question: "How does magma become a volcanic deposit?",
      summary: "From fragmentation during an eruption to the textures left in volcanic rocks, I investigate the processes that connect magma to the materials we find at the surface.",
      approach: "Combining observations of volcanic materials with microscopy and experiments connects small-scale textures to the larger processes that form them.",
      methods: ["Volcanology", "Microscopy", "Experiments"], gallery: ["lava", "basalt", "sierra"]
    },
    {
      id: "crystals", number: "02", title: "Crystals & diffusion", image: "crystals",
      question: "What do crystals remember?",
      summary: "Minerals grow, react, and exchange elements. Their chemical and isotopic patterns offer a way to investigate the conditions and timescales of magmatic processes.",
      approach: "Laboratory experiments, chemical measurements, and numerical models help interpret the geological histories preserved within individual minerals.",
      methods: ["Experimental petrology", "Geochemistry", "Numerical models"], gallery: ["crystals", "basalt"]
    },
    {
      id: "moon", number: "03", title: "Lunar geochemistry", image: "moon",
      question: "How much of the early Moon survives in its minerals?",
      summary: "Lunar samples preserve records of the Moon's early history. Understanding how later processes modify those records is essential to interpreting what they tell us.",
      approach: "Mineral chemistry and experiments provide ways to examine which signatures are preserved, which are modified, and how we can distinguish them.",
      methods: ["Lunar samples", "Mineral chemistry", "Experiments"], gallery: ["moon", "earth", "crystals"]
    }
  ],
  // Add real entries when ready: {year:"2026", title:"...", authors:"...", journal:"...", url:"https://doi.org/..."}
  publications: []
};
