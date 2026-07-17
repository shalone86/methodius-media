// ============================================================
//  METHODIUS MEDIA — SHARED CONFIG
//  Edit this file to add/remove albums and update site info.
//
//  HOW TO ADD AN ALBUM — two options, use whichever is easier:
//
//  OPTION A: Paste the full Bandcamp embed code
//    embedCode: `<iframe ... src="...album=1713466879/..."></iframe>`
//
//  OPTION B: Just the ID number (from the embed src URL)
//    bandcampId: "1713466879"
//
//  Title, artist, and year are always required.
// ============================================================

const CONFIG = {

  // --- SITE INFO ---
  contact: {
    email: "hello@methodiusmedia.com",       // shown as mailto link
    chat: "https://tawk.to/methodius",  // replace with your tawk.to link
    chatLabel: "Chat with us live"
  },

  // --- HERO (Methodius Media main site only) ---
  hero: {
    image: "hero.jpg",           // place image in same folder as index.html
    headline: "Sacred Sound. Open Source.",
    tagline: "Immersive lofi and catchy dance pop for Byzantine and Latin Catholics. Crafted by humans. Free for everyone."
  },

  // --- CATHOLIC LOFI ALBUMS ---
  catholicLofi: [ 
    {
      title: "Our Father - Catholic Lofi",
      artist: "Catholic Lofi Beats ft. Shalone Cason",
      year: "2026",
      bandcampId: "737153111"
    },
    {
      title: "Byzantine Daily Prayers Lofi",
      artist: "Catholic Lofi Beats ft. Shalone Cason",
      year: "2026",
      bandcampId: "3024765759"
    },
    {
      title: "Ten Commandments Lofi",
      artist: "Catholic Lofi Beats ft. Shalone Cason",
      year: "2026",
      bandcampId: "1713466879"
    },
    {
      title: "Gregory the Great Lofi",
      artist: "Catholic Lofi Beats",
      year: "2024",
      bandcampId: "594351153"
    },
      {
      title: "12 Days of Christmas Lofi",
      artist: "Catholic Lofi Beats",
      year: "2022",
      bandcampId: "3773185173"
    },
     {
      title: "Advent Lofi",
      artist: "Catholic Lofi Beats",
      year: "2023",
      bandcampId: "1106122776"
    },
    // Add more albums below — copy/paste the block above and replace the values
  ],

  // --- CHAPEL POP ALBUMS ---
  chapelPop: [ 
    {
       title: "Hail Mary - Rosary Prayers",
       artist: "Chapel Pop",
       year: "2026",
       bandcampId: "3985338179"
     },
    {
       title: "Our Father",
       artist: "Chapel Pop",
       year: "2026",
       bandcampId: "3605100398"
     },
    {
       title: "Byzantine Daily Prayers",
       artist: "Chapel Pop",
       year: "2026",
       bandcampId: "3286988232"
     },
  ],

  // --- DONATION / SUPPORT ---
  support: {
    stripeLink: "https://buy.stripe.com/your-link",       // replace
    stripeLabel: "One-time gift via Stripe",
    donorboxCampaign: "your-campaign-slug",               // replace (just the slug)
    donorboxLabel: "Monthly support via Donorbox"
  }
};
