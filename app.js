/* =========================================================================
   Ramadan — single-page app (FR / EN / AR)
   One file for everything: translations, data, router, layout and pages.

   Videos are real YouTube videos (Ramadan 2026 and Ramadan 2027 previews),
   played with YouTube's official embed player. Each one was checked with
   YouTube's oEmbed service (exists + embedding allowed) on 12 Nov 2026.
   ⚠ YouTube embeds need the site to be served over http(s) (GitHub Pages,
   Netlify, a local server…). Opened as a file:// page, YouTube refuses to play.

   Routes:
     #/                    home
     #/category            all videos
     #/category/Trending   one section   (Trending, new, prep2027, Recommended)
     #/category/recipe     one theme     (quran, recipe, series, doc, kids, nasheed, guide)
     #/video/3             video details (id = position in DATA.videos)
     #/shorts/2            shorts player
     #/search?q=iftar      search results
   ========================================================================= */
(function () {
  'use strict';

  /* =======================================================================
     LANGUAGE
     ======================================================================= */
  const LANGS = ['fr', 'en', 'ar'];
  const LOCALES = { fr: 'fr-FR', en: 'en-GB', ar: 'ar-u-nu-latn' };

  function readLang() {
    const fromUrl = new URLSearchParams(location.search).get('lang'); // e.g. index.html?lang=ar
    if (LANGS.includes(fromUrl)) return fromUrl;
    try {
      const saved = localStorage.getItem('ramadan_lang');
      if (saved && LANGS.includes(JSON.parse(saved))) return JSON.parse(saved);
    } catch (e) { /* ignore */ }
    const nav = (navigator.language || 'fr').slice(0, 2).toLowerCase();
    return LANGS.includes(nav) ? nav : 'fr';
  }
  let lang = readLang();

  const UI = {
    fr: {
      home: 'Accueil', movies: 'Vidéos', shorts: 'Shorts', categories: 'Catégories', search: 'Recherche',
      searchPh: 'Rechercher une vidéo, une recette, une récitation…', viewAll: 'Voir tout', readAll: 'Tout lire',
      videoShorts: 'Shorts du Ramadan', liveTitle: 'La Mecque : directs & rediffusions', live: 'Direct', replay: 'Rediffusion', blogs: 'Articles du Ramadan',
      watchNow: 'Regarder', playTrailer: 'Voir les shorts', downloadApp: 'Télécharger l’app',
      year: 'Ramadan {y}', movieDetails: 'Détails de la vidéo', ourMovies: 'Toutes les vidéos', all: 'Tout',
      noVideos: 'Aucune vidéo dans cette catégorie.',
      like: 'J’aime', dislike: 'Je n’aime pas', addList: 'Ma liste', share: 'Partager', onYoutube: 'Voir sur YouTube',
      similar: 'Dans le même esprit', source: 'Source', channel: 'Chaîne', originalTitle: 'Titre original',
      ytDesc: 'Vidéo publiée sur YouTube par la chaîne « {ch} » et intégrée avec le lecteur officiel de YouTube.',
      comments: '{n} commentaires', noComments: 'Soyez le premier à commenter (votre commentaire reste dans ce navigateur).',
      sortTop: 'Plus anciens', sortNew: 'Plus récents', addComment: 'Ajouter un commentaire…', cancel: 'Annuler', post: 'Publier', you: '@Vous', reply: 'Répondre',
      resultsFor: '{n} résultat(s) pour « {q} »', typeToSearch: 'Que cherchez-vous ?',
      noResults: 'Aucun résultat. Essayez « iftar », « Coran », « 2027 » ou « enfants ».', useSearchBar: 'Utilisez la barre de recherche en haut de la page.',
      newHit: 'À découvrir', short: 'Short',
      seeAll: 'Voir tous les résultats pour « {q} »',
      notFound: 'Page introuvable', notFoundText: 'Cette page n’existe pas.', backHome: 'Retour à l’accueil',
      terms: 'Conditions d’utilisation', privacy: 'Confidentialité', license: 'Licence', copyright: 'Copyright ©{y} Ramadan.com',
      prevShort: 'Short précédent', nextShort: 'Short suivant', menu: 'Menu', lang: 'Langue',
      fileWarning: 'Les vidéos YouTube ne se lisent que si le site est ouvert via http(s) (hébergement ou serveur local), pas en double-cliquant sur index.html.',
      Trending: 'Les plus regardés du Ramadan 2026', new: 'Iftar, enfants & traditions', prep2027: 'Se préparer pour le Ramadan 2027', Recommended: 'Coran & nuits bénies',
      kidsTitle: 'Espace enfants', kidsText: 'Chansons, histoires et dessins animés pour faire découvrir le Ramadan aux plus petits.',
      promo: '🌙 Découvrez nos autres applications gratuites →', closePromo: 'Fermer',
      tools: 'Outils Ramadan', navPrayer: 'Horaires', navCard: 'Carte de vœux', navTasbih: 'Tasbih', navTracker: 'Suivi quotidien',
      donate: 'Soutenir', donateTitle: 'Soutenez mon travail ❤️',
      donateText: 'Si vous appréciez mon travail et souhaitez soutenir mes projets, vous pouvez faire un don. Chaque contribution, même petite, fait la différence. Merci pour votre soutien !',
      donateBtn: 'Faire un don sur Ko-fi', donateNote: 'Vous choisissez le montant sur Ko-fi. Le paiement se fait entièrement sur Ko-fi : aucune donnée bancaire ne passe par ce site.',
      donateOpen: 'Ouvrir la fenêtre de don', close: 'Fermer'
    },
    en: {
      home: 'Home', movies: 'Videos', shorts: 'Shorts', categories: 'Categories', search: 'Search',
      searchPh: 'Search a video, a recipe, a recitation…', viewAll: 'View all', readAll: 'Read all',
      videoShorts: 'Ramadan Shorts', liveTitle: 'Makkah: live & replays', live: 'Live', replay: 'Replay', blogs: 'Ramadan articles',
      watchNow: 'Watch now', playTrailer: 'Watch shorts', downloadApp: 'Get the app',
      year: 'Ramadan {y}', movieDetails: 'Video details', ourMovies: 'All videos', all: 'All',
      noVideos: 'No videos in this category.',
      like: 'Like', dislike: 'Dislike', addList: 'My list', share: 'Share', onYoutube: 'Watch on YouTube',
      similar: 'More like this', source: 'Source', channel: 'Channel', originalTitle: 'Original title',
      ytDesc: 'Video published on YouTube by the channel “{ch}”, embedded with YouTube’s official player.',
      comments: '{n} comments', noComments: 'Be the first to comment (your comment stays in this browser).',
      sortTop: 'Oldest', sortNew: 'Newest', addComment: 'Add a comment…', cancel: 'Cancel', post: 'Post', you: '@You', reply: 'Reply',
      resultsFor: '{n} result(s) for “{q}”', typeToSearch: 'What are you looking for?',
      noResults: 'No results. Try “iftar”, “Quran”, “2027” or “kids”.', useSearchBar: 'Use the search bar at the top of the page.',
      newHit: 'Discover', short: 'Short',
      seeAll: 'See all results for “{q}”',
      notFound: 'Page not found', notFoundText: 'This page does not exist.', backHome: 'Back to home',
      terms: 'Terms of use', privacy: 'Privacy', license: 'License', copyright: 'Copyright ©{y} Ramadan.com',
      prevShort: 'Previous short', nextShort: 'Next short', menu: 'Menu', lang: 'Language',
      fileWarning: 'YouTube videos only play when the site is opened over http(s) (hosting or a local server), not by double-clicking index.html.',
      Trending: 'Most watched in Ramadan 2026', new: 'Iftar, kids & traditions', prep2027: 'Getting ready for Ramadan 2027', Recommended: 'Quran & blessed nights',
      kidsTitle: 'Kids zone', kidsText: 'Songs, stories and cartoons to help little ones discover Ramadan.',
      promo: '🌙 Discover our other free apps →', closePromo: 'Close',
      tools: 'Ramadan tools', navPrayer: 'Prayer times', navCard: 'Greeting card', navTasbih: 'Tasbih', navTracker: 'Daily tracker',
      donate: 'Support me', donateTitle: 'Support My Work ❤️',
      donateText: 'If you appreciate my work and want to support my projects, you can make a donation. Every contribution, no matter how small, makes a difference. Thank you for your support!',
      donateBtn: 'Donate on Ko-fi', donateNote: 'You choose the amount on Ko-fi. Payment happens entirely on Ko-fi — no card details ever go through this site.',
      donateOpen: 'Open the donation window', close: 'Close'
    },
    ar: {
      home: 'الرئيسية', movies: 'الفيديوهات', shorts: 'مقاطع قصيرة', categories: 'التصنيفات', search: 'بحث',
      searchPh: 'ابحث عن فيديو، وصفة، تلاوة…', viewAll: 'عرض الكل', readAll: 'قراءة الكل',
      videoShorts: 'مقاطع رمضان القصيرة', liveTitle: 'مكة المكرمة: بث مباشر وإعادة', live: 'مباشر', replay: 'إعادة', blogs: 'مقالات رمضانية',
      watchNow: 'شاهد الآن', playTrailer: 'المقاطع القصيرة', downloadApp: 'حمّل التطبيق',
      year: 'رمضان {y}', movieDetails: 'تفاصيل الفيديو', ourMovies: 'كل الفيديوهات', all: 'الكل',
      noVideos: 'لا توجد فيديوهات في هذا التصنيف.',
      like: 'أعجبني', dislike: 'لم يعجبني', addList: 'قائمتي', share: 'مشاركة', onYoutube: 'شاهد على يوتيوب',
      similar: 'فيديوهات مشابهة', source: 'المصدر', channel: 'القناة', originalTitle: 'العنوان الأصلي',
      ytDesc: 'فيديو منشور على يوتيوب من قناة «{ch}» ومعروض عبر مشغّل يوتيوب الرسمي.',
      comments: '{n} تعليقات', noComments: 'كن أول من يعلّق (يبقى تعليقك في هذا المتصفح).',
      sortTop: 'الأقدم', sortNew: 'الأحدث', addComment: 'أضف تعليقًا…', cancel: 'إلغاء', post: 'نشر', you: '@أنت', reply: 'رد',
      resultsFor: '{n} نتيجة لـ «{q}»', typeToSearch: 'عمّ تبحث؟',
      noResults: 'لا توجد نتائج. جرّب «إفطار» أو «القرآن» أو «2027» أو «أطفال».', useSearchBar: 'استخدم شريط البحث أعلى الصفحة.',
      newHit: 'اكتشف', short: 'مقطع قصير',
      seeAll: 'عرض كل النتائج لـ «{q}»',
      notFound: 'الصفحة غير موجودة', notFoundText: 'هذه الصفحة غير موجودة.', backHome: 'العودة إلى الرئيسية',
      terms: 'شروط الاستخدام', privacy: 'الخصوصية', license: 'الترخيص', copyright: 'جميع الحقوق محفوظة ©{y} Ramadan.com',
      prevShort: 'المقطع السابق', nextShort: 'المقطع التالي', menu: 'القائمة', lang: 'اللغة',
      fileWarning: 'لا تعمل فيديوهات يوتيوب إلا إذا فُتح الموقع عبر http(s) (استضافة أو خادم محلي)، وليس بالنقر المزدوج على index.html.',
      Trending: 'الأكثر مشاهدة في رمضان 2026', new: 'الإفطار والأطفال والعادات', prep2027: 'الاستعداد لرمضان 2027', Recommended: 'القرآن والليالي المباركة',
      kidsTitle: 'فضاء الأطفال', kidsText: 'أناشيد وقصص ورسوم متحركة لتعريف الصغار بشهر رمضان.',
      promo: '🌙 اكتشف تطبيقاتنا المجانية الأخرى ←', closePromo: 'إغلاق',
      tools: 'أدوات رمضان', navPrayer: 'المواقيت', navCard: 'بطاقة تهنئة', navTasbih: 'السبحة', navTracker: 'المتابعة اليومية',
      donate: 'ادعمني', donateTitle: 'ادعم عملي ❤️',
      donateText: 'إذا أعجبك عملي وأردت دعم مشاريعي، يمكنك تقديم تبرّع. كل مساهمة، مهما كانت صغيرة، تُحدث فرقًا. شكرًا لدعمك!',
      donateBtn: 'تبرّع عبر Ko-fi', donateNote: 'تختار المبلغ على Ko-fi. تتم عملية الدفع بالكامل على Ko-fi، ولا تمرّ أي بيانات بنكية عبر هذا الموقع.',
      donateOpen: 'فتح نافذة التبرّع', close: 'إغلاق'
    }
  };

  function t(key, vars) {
    let s = (UI[lang] && UI[lang][key]) || UI.fr[key] || key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }
  const L = (v) => (v && typeof v === 'object' ? (v[lang] || v.fr) : v);
  const allLangs = (v) => (v && typeof v === 'object' ? Object.values(v).join(' ') : String(v || ''));

  /* =======================================================================
     DATA — edit your content here
     ======================================================================= */
  const TYPES = {
    quran:   { icon: 'flaticon-history', label: { fr: 'Coran', en: 'Quran', ar: 'القرآن' } },
    recipe:  { icon: 'flaticon-theater', label: { fr: 'Recettes', en: 'Recipes', ar: 'وصفات' } },
    series:  { icon: 'flaticon-television', label: { fr: 'Séries', en: 'Series', ar: 'مسلسلات' } },
    doc:     { icon: 'flaticon-video-player', label: { fr: 'Reportages', en: 'Reports', ar: 'تقارير' } },
    kids:    { icon: 'flaticon-volleyball', label: { fr: 'Enfants', en: 'Kids', ar: 'أطفال' } },
    nasheed: { icon: 'flaticon-music', label: { fr: 'Anachid', en: 'Nasheeds', ar: 'أناشيد' } },
    guide:   { icon: 'flaticon-technological', label: { fr: 'Conseils', en: 'Guides', ar: 'إرشادات' } }
  };
  const TYPE_ORDER = ['quran', 'recipe', 'kids', 'nasheed', 'guide', 'doc', 'series'];
  const SECTIONS = ['Trending', 'new', 'prep2027', 'Recommended'];

  /*  yt: YouTube video id · ch: channel · orig: original YouTube title
      sec: home row · type: theme · year: which Ramadan · live: show in the Makkah live/replay row */
  const YT_VIDEOS = [
    // ---- Most watched, Ramadan 2026
    { yt: 'iK9JdHBb5tQ', ch: 'Averon Music Studios', year: 2026, type: 'nasheed', sec: 'Trending',
      orig: 'Halla Ramadan 2026 🌙 | Beautiful Ramadan Nasheed – هَلَّ رَمَضَانُ Official Video',
      title: { fr: 'Halla Ramadan — nachid officiel', en: 'Halla Ramadan — official nasheed', ar: 'هلّ رمضان — نشيد رسمي' } },
    { yt: 'cmMnNiCKKmw', ch: 'Yahya Alhihi', year: 2026, type: 'doc', sec: 'Trending',
      orig: 'Best of Ramadan 2026',
      title: { fr: 'Le meilleur du Ramadan 2026', en: 'Best of Ramadan 2026', ar: 'أفضل لحظات رمضان 2026' } },
    { yt: '4veBoLYjAXE', ch: 'Rappel Sunnah', year: 2026, type: 'guide', sec: 'Trending',
      orig: 'Ramadan 2026 : un mois pour changer ta vie à jamais',
      title: { fr: 'Ramadan 2026 : un mois pour changer ta vie', en: 'Ramadan 2026: a month to change your life', ar: 'رمضان 2026: شهر لتغيير حياتك' } },
    { yt: 'jDLR_xiswKI', ch: 'Cuisine Marocaine', year: 2026, type: 'recipe', sec: 'Trending',
      orig: "LES 5 RECETTES LES PLUS DEMANDÉES POUR LE REPAS D'IFTAR RAMADAN 2026 🥰 Cuisine Marocaine 🇲🇦",
      title: { fr: 'Les 5 recettes d’iftar les plus demandées (cuisine marocaine)', en: 'The 5 most requested iftar recipes (Moroccan cuisine)', ar: 'أكثر 5 وصفات إفطار طلبًا (المطبخ المغربي)' } },
    { yt: 'hxHM7FQjNvE', ch: 'MiniMuslims', year: 2026, type: 'kids', sec: 'Trending',
      orig: 'Ramadan Songs for Kids 🌙 2026 Compilation ☀️ MiniMuslims',
      title: { fr: 'Chansons du Ramadan pour enfants — compilation 2026', en: 'Ramadan songs for kids — 2026 compilation', ar: 'أناشيد رمضان للأطفال — مجموعة 2026' } },
    { yt: 'jVlJUHunbUY', ch: 'Al Quran Recitation HD', year: 2026, type: 'quran', sec: 'Trending', live: 'replay',
      orig: 'Peaceful Taraweeh in Makkah | 23rd Ramadan Night | Masjid al-Haram',
      title: { fr: 'Tarawih à La Mecque — 23e nuit', en: 'Taraweeh in Makkah — 23rd night', ar: 'التراويح في المسجد الحرام — الليلة 23' } },
    { yt: 'Jejw-h0S7Gw', ch: 'DawnNews English', year: 2026, type: 'doc', sec: 'Trending',
      orig: 'Eid al-Fitr 2026: Global Celebrations Begin March 20 as Moon Sighting Splits Dates Across Regions',
      title: { fr: 'Aïd al-Fitr 2026 : les célébrations dans le monde', en: 'Eid al-Fitr 2026: celebrations around the world', ar: 'عيد الفطر 2026: احتفالات حول العالم' } },

    // ---- Iftar, kids & traditions
    { yt: 'AASfD-CYeUA', ch: 'Marium’s Food Channel', year: 2026, type: 'recipe', sec: 'new',
      orig: 'Ramadan 2026 Complete Iftar Menu | Easy & Delicious',
      title: { fr: 'Menu d’iftar complet, facile et délicieux', en: 'Complete iftar menu, easy and delicious', ar: 'قائمة إفطار كاملة سهلة ولذيذة' } },
    { yt: 'GToSILIyT0A', ch: 'Silsila Islam', year: 2026, type: 'kids', sec: 'new',
      orig: 'Ramadan 2026 Special 🌙 | Beautiful Islamic Story for Kids | Silsila Islam | Moral Lessons| episode 1',
      title: { fr: 'Une belle histoire islamique pour enfants — épisode 1', en: 'A beautiful Islamic story for kids — episode 1', ar: 'قصة إسلامية جميلة للأطفال — الحلقة 1' } },
    { yt: '7CHjCsIG6BM', ch: 'جوان و ليليان | Jwan & Lilian', year: 2026, type: 'doc', sec: 'new',
      orig: 'زينة رمضان 2026 🌛 جولة في بيتنا',
      title: { fr: 'Décoration du Ramadan : visite de notre maison', en: 'Ramadan decorations: a tour of our home', ar: 'زينة رمضان 2026: جولة في بيتنا' } },
    { yt: 'SJWZ03xMeoo', ch: 'Recipes of the world', year: 2026, type: 'recipe', sec: 'new',
      orig: '6 Ramadan Special Iftar Snacks Recipes 2026 By Recipes Of The World',
      title: { fr: '6 snacks spécial iftar', en: '6 special iftar snacks', ar: '6 مقبلات خاصة بالإفطار' } },
    { yt: '9Yyww6xGrb0', ch: 'US Arab Radio', year: 2026, type: 'guide', sec: 'new',
      orig: 'Ramadan 2026: A Journey of Spiritual Reflection and Physical Well-being',
      title: { fr: 'Ramadan 2026 : réflexion spirituelle et bien-être', en: 'Ramadan 2026: spiritual reflection and well-being', ar: 'رمضان 2026: تأمل روحي وصحة جسدية' } },
    { yt: 'Gv8jJwKWLGc', ch: 'Funtastic Kids Rhymes & Songs', year: 2026, type: 'kids', sec: 'new',
      orig: 'Ramadan Is Here 🥁 | Happy Ramadan Song for Kids | Drum & Duff | Ramadan Videos for Kids 2026',
      title: { fr: '« Ramadan Is Here » — chanson pour enfants', en: '“Ramadan Is Here” — song for kids', ar: '«رمضان هنا» — أنشودة للأطفال' } },
    { yt: 'PuYuZ_nPtpg', ch: 'Phoenix Pictures International', year: 2026, type: 'series', sec: 'new',
      orig: 'رمضان 2026🌙🩵 فيديو كليب وأغنية مسلسل سر وقدر',
      title: { fr: 'Clip de la chanson de la série « Sirr wa Qadar »', en: 'Music video of the series “Sirr wa Qadar” song', ar: 'فيديو كليب أغنية مسلسل «سر وقدر»' } },
    { yt: 'NdySsnJgGLs', ch: 'Anila’s Dining', year: 2026, type: 'recipe', sec: 'new',
      orig: 'Ramadan Special Complete Iftar Menu Recipes 2026 | Easy & Low Budget Iftar Menu | Iftar Recipes',
      title: { fr: 'Menu d’iftar complet à petit budget', en: 'Complete low-budget iftar menu', ar: 'قائمة إفطار كاملة بميزانية بسيطة' } },
    { yt: 'DPlD0Z59-7E', ch: 'Noor of Dunya', year: 2026, type: 'kids', sec: 'new',
      orig: 'Ramadan Around The World 🌙 Islamic Songs For Kids | Heart Touching Ramadan Nasheed 2026',
      title: { fr: 'Le Ramadan autour du monde — nachid pour enfants', en: 'Ramadan around the world — nasheed for kids', ar: 'رمضان حول العالم — نشيد للأطفال' } },
    { yt: 'dzofGRX_I0k', ch: 'Travel Addis', year: 2026, type: 'doc', sec: 'new',
      orig: 'EiD Al-Fitr 2026 in Addis Ababa Massive Crowd & Beautiful Celebration! UNFORGETTABLE sense!',
      title: { fr: 'L’Aïd al-Fitr 2026 à Addis-Abeba', en: 'Eid al-Fitr 2026 in Addis Ababa', ar: 'عيد الفطر 2026 في أديس أبابا' } },

    // ---- Getting ready for Ramadan 2027
    { yt: 'jfM78gCREb4', ch: 'Islamic Knowledge', year: 2027, type: 'guide', sec: 'prep2027',
      orig: 'Ramzan 2027 Calendar | First Ramadan Date 2027 | Ramadan 2027 time table',
      title: { fr: 'Calendrier du Ramadan 2027 : premier jour et horaires', en: 'Ramadan 2027 calendar: first day and timetable', ar: 'تقويم رمضان 2027: أول يوم والمواعيد' } },
    { yt: 'd9uHR0Cq07E', ch: 'Islamic Knowledge', year: 2027, type: 'guide', sec: 'prep2027',
      orig: 'Ramadan Calendar 2027 | 2027 Ramzan Calendar | When is Ramadan 2027',
      title: { fr: 'Quand commence le Ramadan 2027 ?', en: 'When does Ramadan 2027 start?', ar: 'متى يبدأ رمضان 2027؟' } },
    { yt: 'ymsSa4H60TY', ch: 'Religious Story TV', year: 2026, type: 'guide', sec: 'prep2027',
      orig: 'Ramadan 2026 With This Knowledge Will Transform You',
      title: { fr: 'Entrer dans le Ramadan avec cette connaissance', en: 'Entering Ramadan with this knowledge', ar: 'ادخل رمضان بهذه المعرفة' } },
    { yt: 'kzZN5EM_YFA', ch: 'Shine With Tara', year: 2026, type: 'kids', sec: 'prep2027',
      orig: 'How to prep for Ramadan 2026 | What is Patience | Islamic Cartoon for Kids',
      title: { fr: 'Se préparer au Ramadan : la patience (dessin animé)', en: 'Preparing for Ramadan: patience (cartoon)', ar: 'الاستعداد لرمضان: الصبر (رسوم متحركة)' } },
    { yt: 'gbwEvjQ4Ae0', ch: 'Marium’s Food Channel', year: 2026, type: 'recipe', sec: 'prep2027',
      orig: '6 Make & Freeze Iftar Snacks | Ramadan 2026 Special',
      title: { fr: '6 snacks d’iftar à préparer et congeler', en: '6 make-and-freeze iftar snacks', ar: '6 مقبلات إفطار للتحضير والتجميد' } },
    { yt: 'njrJwvK33lo', ch: 'Savory and Sweet Food', year: 2026, type: 'recipe', sec: 'prep2027',
      orig: 'Ramadan Meal Prep 2026 - Part 1 | freezer friendly recipes',
      title: { fr: 'Préparer ses repas du Ramadan à l’avance — partie 1', en: 'Ramadan meal prep — part 1', ar: 'تحضير وجبات رمضان مسبقًا — الجزء 1' } },
    { yt: 'U1aa1a9yiUM', ch: 'KALAMUNA MEDIA', year: 2026, type: 'nasheed', sec: 'prep2027',
      orig: 'MARHABAN YA RAMADHAN 2026',
      title: { fr: 'Marhaban ya Ramadan', en: 'Marhaban ya Ramadan', ar: 'مرحبًا يا رمضان' } },

    // ---- Quran & blessed nights
    { yt: 'UYfd7Ru-eCU', ch: 'Daily Quran Recitation 4', year: 2026, type: 'quran', sec: 'Recommended', live: 'live',
      orig: 'LIVE Makkah Today: Ramadan 2026 (1447 AH) | Taraweeh, Tahajjud & Kaaba 24/7 Stream',
      title: { fr: 'La Mecque en direct : Tarawih, Tahajjud et la Kaaba', en: 'Makkah live: Taraweeh, Tahajjud and the Kaaba', ar: 'مكة مباشرة: التراويح والتهجد والكعبة' } },
    { yt: 'A83_MbQ-cj4', ch: 'Zikrullah TV', year: 2026, type: 'quran', sec: 'Recommended',
      orig: 'Surah Al-Qadr | LAYLATUL QADR (Ramadan 2026) Deeply Relaxing Tranquil Quran Recitation #laylatulqadr',
      title: { fr: 'Sourate Al-Qadr — récitation apaisante', en: 'Surah Al-Qadr — tranquil recitation', ar: 'سورة القدر — تلاوة هادئة' } },
    { yt: 'rYchrrfgxfU', ch: 'Habibullah TV', year: 2026, type: 'quran', sec: 'Recommended',
      orig: '27th Night Laylatul Qadr Dua 2026 | Powerful Ramadan Night Prayer | #ramadan2026 #laylatulqadr',
      title: { fr: 'Douaa de la 27e nuit (Laylat al-Qadr)', en: 'Dua of the 27th night (Laylat al-Qadr)', ar: 'دعاء الليلة 27 (ليلة القدر)' } },
    { yt: '0eZlWHta_uE', ch: 'Habibullah TV', year: 2026, type: 'quran', sec: 'Recommended',
      orig: 'Ramadan 2026 | Special Beautiful Recite for Ramadan | Ramadan Ayat for Peace of Heart | #ramadan2026',
      title: { fr: 'Versets du Ramadan pour apaiser le cœur', en: 'Ramadan verses for peace of heart', ar: 'آيات رمضانية لطمأنينة القلب' } },
    { yt: 'BN0pxj1GmIk', ch: 'Zikrullah TV', year: 2026, type: 'quran', sec: 'Recommended',
      orig: 'Surah Al-Qadr (سورة القدر) | Ramadan 2026 LAYLATUL QADR The Blessed Night of Power ✨ Relaxing Quran',
      title: { fr: 'Sourate Al-Qadr — la Nuit du Destin', en: 'Surah Al-Qadr — the Night of Power', ar: 'سورة القدر — ليلة القدر المباركة' } },
    { yt: '8VPV33ns3xs', ch: 'Zikrullah TV', year: 2026, type: 'quran', sec: 'Recommended',
      orig: 'Best Laylatul Qadr Dua 2026 | Powerful Ramadan Night Dua for Rizq, Forgiveness & Barakah',
      title: { fr: 'Douaa de Laylat al-Qadr : pardon et baraka', en: 'Laylat al-Qadr dua: forgiveness and barakah', ar: 'دعاء ليلة القدر: المغفرة والبركة' } },
    { yt: 'W6_62G2Kp6w', ch: 'moneycontrol', year: 2026, type: 'doc', sec: 'Recommended', live: 'replay',
      orig: 'Eid al-Fitr 2026 LIVE: Muslims gather for prayers on the first day of Eid al-Fitr in Mecca',
      title: { fr: 'Aïd al-Fitr 2026 : la prière à La Mecque', en: 'Eid al-Fitr 2026: prayers in Mecca', ar: 'عيد الفطر 2026: صلاة العيد في مكة' } },
    { yt: 'jS-08zZ2P4c', ch: 'Al-Qalam Media', year: 2026, type: 'quran', sec: 'Recommended', live: 'live',
      orig: 'LIVE Makkah Today: Ramadan 2026 (1447 AH) | Taraweeh, Tahajjud & Kaaba 24/7 Stream',
      title: { fr: 'La Kaaba 24h/24 — Ramadan 1447', en: 'The Kaaba 24/7 — Ramadan 1447', ar: 'الكعبة على مدار الساعة — رمضان 1447' } }
  ];

  const YT_SHORTS = [
    { yt: 'lcGfoDz9ymo', ch: 'National Zakat Foundation', year: 2027, type: 'guide',
      orig: 'When is Ramadan 2027? Expected Ramadan and Eid dates',
      title: { fr: 'Ramadan 2027 : les dates prévues', en: 'When is Ramadan 2027? Expected dates', ar: 'رمضان 2027: المواعيد المتوقعة' } },
    { yt: 'LfQPRFgJ3Y4', ch: 'IKHLAS Media', year: 2026, type: 'nasheed',
      orig: 'Countdown to Ramadan 2026! 🌙 | Ahlan Ramadan 18/02/2026 #Shorts',
      title: { fr: 'Compte à rebours vers le Ramadan 2026', en: 'Countdown to Ramadan 2026', ar: 'العد التنازلي لرمضان 2026' } },
    { yt: 'TgUDk1MEoCE', ch: 'The Federal', year: 2026, type: 'doc',
      orig: 'Ramadan 2026 begins in Pakistan after crescent moon sighting | #shorts',
      title: { fr: 'Le croissant est aperçu : le Ramadan 2026 commence', en: 'Crescent sighted: Ramadan 2026 begins', ar: 'رؤية الهلال: بدء رمضان 2026' } },
    { yt: 'pDXjpZEZsHM', ch: 'The National News', year: 2026, type: 'doc',
      orig: 'Ramadan 2026 brings global fasting hours closer together',
      title: { fr: 'Des heures de jeûne plus proches dans le monde', en: 'Fasting hours closer together worldwide', ar: 'ساعات صيام متقاربة حول العالم' } },
    { yt: '58vO2jDMAvw', ch: 'The National News', year: 2026, type: 'guide',
      orig: 'Ramadan 2026: Why fasting hours will feel more balanced worldwide',
      title: { fr: 'Pourquoi le jeûne sera plus équilibré en 2026', en: 'Why fasting feels more balanced in 2026', ar: 'لماذا سيكون الصيام أكثر توازنًا في 2026' } },
    { yt: 'LQRdvnFypzA', ch: 'DawateIslami', year: 2026, type: 'nasheed',
      orig: 'Ramzan Mubarak | 2026 #shortvideo #ramadan',
      title: { fr: 'Ramadan Moubarak', en: 'Ramadan Mubarak', ar: 'رمضان مبارك' } }
  ];

  const ytThumb = (id) => 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
  const ytWatch = (id) => 'https://www.youtube.com/watch?v=' + id;
  const ytEmbed = (id) => 'https://www.youtube-nocookie.com/embed/' + id + '?rel=0&modestbranding=1&playsinline=1';

  const DATA = {
    videos: YT_VIDEOS.map((v, id) => Object.assign({ id, thumbnail: ytThumb(v.yt) }, v)),
    shorts: YT_SHORTS.map((s, id) => Object.assign({ id, thumbnail: ytThumb(s.yt) }, s)),

    blogs: [
      { img: 1, title: { fr: '10 conseils pour bien vivre le jeûne', en: '10 tips for a good fast', ar: '10 نصائح لصيام مريح' },
        text: { fr: 'Sommeil, hydratation, repas équilibrés : les bons gestes pour garder l’énergie toute la journée.', en: 'Sleep, hydration, balanced meals: good habits to keep your energy all day long.', ar: 'النوم والترطيب والوجبات المتوازنة: عادات بسيطة للحفاظ على طاقتك طوال اليوم.' } },
      { img: 2, title: { fr: 'Que manger au suhoor ?', en: 'What to eat at suhoor?', ar: 'ماذا نأكل في السحور؟' },
        text: { fr: 'Des idées simples et rassasiantes pour tenir jusqu’au maghrib sans fringale.', en: 'Simple, filling ideas to last until maghrib without cravings.', ar: 'أفكار بسيطة ومشبعة للصمود حتى المغرب دون جوع.' } },
      { img: 3, title: { fr: 'Les dix dernières nuits : un programme simple', en: 'The last ten nights: a simple plan', ar: 'العشر الأواخر: برنامج بسيط' },
        text: { fr: 'Prière, lecture du Coran, douaa et sadaqa : organiser ses nuits pour ne rien manquer.', en: 'Prayer, Quran, dua and charity: organise your nights so you miss nothing.', ar: 'صلاة وقراءة القرآن ودعاء وصدقة: نظّم لياليك حتى لا يفوتك شيء.' } },
      { img: 1, title: { fr: 'Ramadan 2027 : se préparer dès maintenant', en: 'Ramadan 2027: getting ready now', ar: 'رمضان 2027: الاستعداد من الآن' },
        text: { fr: 'Le Ramadan 2027 est attendu vers début février 2027, selon l’observation du croissant. Quelques idées pour s’y préparer.', en: 'Ramadan 2027 is expected in early February 2027, depending on the moon sighting. A few ideas to prepare.', ar: 'يُتوقّع أن يبدأ رمضان 2027 في أوائل فبراير 2027 حسب رؤية الهلال. أفكار للاستعداد له.' } }
    ].map((b, i) => ({
      coverImage: 'assets/img/tt-2-article-' + b.img + '.jpg',
      minutes: [5, 4, 6, 3][i],
      date: ['2026-02-10', '2026-02-14', '2026-03-08', '2026-11-12'][i],
      title: b.title,
      text: b.text,
      link: 'pages/blog-details.html'
    }))
  };

  const heroSlides = () => {
    const halla = DATA.videos.find((v) => v.yt === 'iK9JdHBb5tQ');
    const recipes = DATA.videos.find((v) => v.yt === 'jDLR_xiswKI');
    return [
      { title: { fr: 'Ramadan Moubarak', en: 'Ramadan Mubarak', ar: 'رمضان مبارك' },
        text: { fr: 'Les plus beaux moments du Ramadan 2026 : anachid, récitations, recettes et célébrations.', en: 'The best moments of Ramadan 2026: nasheeds, recitations, recipes and celebrations.', ar: 'أجمل لحظات رمضان 2026: أناشيد وتلاوات ووصفات واحتفالات.' },
        watch: link.video(halla), more: '#/shorts' },
      { title: { fr: 'Les recettes de l’iftar', en: 'Iftar recipes', ar: 'وصفات الإفطار' },
        text: { fr: 'Menus complets, snacks et cuisine marocaine : des idées pour chaque soir du mois.', en: 'Complete menus, snacks and Moroccan cuisine: ideas for every evening of the month.', ar: 'قوائم كاملة ومقبلات ومطبخ مغربي: أفكار لكل ليلة من الشهر.' },
        watch: link.video(recipes), more: link.category('recipe') },
      { title: { fr: 'Le Ramadan 2027 approche', en: 'Ramadan 2027 is coming', ar: 'رمضان 2027 يقترب' },
        text: { fr: 'Attendu vers début février 2027 selon l’observation du croissant : calendrier, dates prévues et préparation.', en: 'Expected in early February 2027 depending on the moon sighting: calendar, expected dates and preparation.', ar: 'يُتوقّع في أوائل فبراير 2027 حسب رؤية الهلال: التقويم والمواعيد المتوقعة والاستعداد.' },
        watch: link.category('prep2027'), more: '#/shorts/0' }
    ];
  };

  /* =======================================================================
     HELPERS
     ======================================================================= */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const logError = (msg, err) => console.error(msg, err);
  const isFile = location.protocol === 'file:';

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem('ramadan_' + key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
    },
    set(key, value) {
      try { localStorage.setItem('ramadan_' + key, JSON.stringify(value)); } catch (e) { /* storage blocked */ }
    }
  };

  const link = {
    video: (v) => '#/video/' + v.id,
    short: (s) => '#/shorts/' + s.id,
    category: (name) => '#/category' + (name ? '/' + encodeURIComponent(name) : ''),
    search: (q) => '#/search?q=' + encodeURIComponent(q)
  };

  let pageCleanup = [];
  function onLeave(fn) { pageCleanup.push(fn); }
  function cleanupPage() {
    pageCleanup.forEach((fn) => { try { fn(); } catch (e) { logError('cleanup', e); } });
    pageCleanup = [];
  }

  function slider(selector, options) {
    if (typeof Swiper === 'undefined' || !$(selector)) return null;
    try {
      const s = new Swiper(selector, options);
      onLeave(() => s.destroy(true, true));
      return s;
    } catch (e) { logError('Swiper ' + selector, e); return null; }
  }

  const bySection = (sec) => DATA.videos.filter((v) => v.sec === sec);
  const byType = (type) => DATA.videos.filter((v) => v.type === type);
  const lives = () => DATA.videos.filter((v) => v.live);

  /* =======================================================================
     TEMPLATES
     ======================================================================= */
  const tpl = {
    sectionHeading(title, moreLink, moreText) {
      return `
        <div class="tt-section-heading d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center gap-2">
            <span><i class="flaticon-play-button-arrowhead"></i></span>
            <h6 class="tt-section-title mb-0">${esc(title)}</h6>
          </div>
          ${moreLink ? `<a href="${moreLink}" class="tt-section-heading__btn">${esc(moreText || t('viewAll'))}</a>` : ''}
        </div>`;
    },

    infos(v) {
      return `
        <div class="tt-video__infos">
          <span class="spa-year spa-year--${v.year}">${esc(t('year', { y: v.year }))}</span>
          <span>${esc(L(TYPES[v.type].label))}</span>
        </div>`;
    },

    videoCard(v) {
      return `
        <div class="tt-video">
          <a href="${link.video(v)}" class="tt-video__thumb spa-thumb"><img src="${esc(v.thumbnail)}" alt="${esc(L(v.title))}" loading="lazy"><span class="spa-yt-badge"><i class="flaticon-play-button"></i></span></a>
          <div>
            <a href="${ytWatch(v.yt)}" target="_blank" rel="noopener" class="tt-video__author">${esc(v.ch)}</a>
            <a href="${link.video(v)}" class="tt-video__title">${esc(L(v.title))}</a>
            ${tpl.infos(v)}
          </div>
        </div>`;
    },

    videoHorizontal(v, extraClass) {
      return `
        <div class="tt-video-horizontal ${extraClass || ''}" data-href="${link.video(v)}">
          <div class="thumbnail"><img src="${esc(v.thumbnail)}" alt="${esc(L(v.title))}" loading="lazy"></div>
          <div>
            <span class="tt-video__author">${esc(v.ch)}</span>
            <a href="${link.video(v)}" class="tt-video__title">${esc(L(v.title))}</a>
            ${tpl.infos(v)}
          </div>
        </div>`;
    },

    videoSlider(cls, navId, videos) {
      return `
        <div class="swiper ${cls} position-relative">
          <div class="swiper-wrapper">
            ${videos.map((v) => `<div class="swiper-slide">${tpl.videoCard(v)}</div>`).join('')}
          </div>
          <button class="tt-slider-nav" id="${navId}" aria-label="${esc(t('viewAll'))}"><i class="flaticon-right-arrow"></i></button>
        </div>`;
    },

    breadcrumb(title) {
      return `
        <section class="tt-breadcrumb">
          <div class="tt-breadcrumb-container">
            <h1 class="tt-breadcrumb-title">${esc(title)}</h1>
            <div class="tt-breadcrumb-nav">
              <a href="#/"><i class="flaticon-home"></i>${esc(t('home'))}</a>
              <span class="separator"><i class="flaticon-right-arrow"></i></span>
              <span class="current-page">${esc(title)}</span>
            </div>
          </div>
        </section>`;
    },

    empty(icon, text) {
      return `<div class="spa-empty"><i class="${icon}"></i>${esc(text)}</div>`;
    },

    // YouTube's official embed player (privacy-enhanced domain)
    player(yt, title, vertical) {
      if (isFile) {
        return `<div class="spa-yt-frame ${vertical ? 'is-vertical' : ''} spa-yt-file"><img src="${esc(ytThumb(yt))}" alt=""><p>${esc(t('fileWarning'))}<br><a href="${ytWatch(yt)}" target="_blank" rel="noopener">${esc(t('onYoutube'))} ↗</a></p></div>`;
      }
      return `<div class="spa-yt-frame ${vertical ? 'is-vertical' : ''}">
        <iframe src="${ytEmbed(yt)}" title="${esc(title)}" loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      </div>`;
    },

    comment(c) {
      return `
        <div class="tt-video-details__comment">
          <div class="tt-video-details__comment-avatar"><img src="assets/img/user-dp-1.png" alt=""></div>
          <div class="tt-video-details__comment-text">
            <div class="tt-video-details__comment-head">
              <span class="tt-video-details__comment-author">${esc(c.author)}</span>
              <span class="tt-video-details__comment-date">${esc(new Date(c.at).toLocaleDateString(LOCALES[lang]))}</span>
            </div>
            <p class="mb-0">${esc(c.text)}</p>
          </div>
        </div>`;
    }
  };

  /* =======================================================================
     PAGES — each returns { title, html, mount() }
     ======================================================================= */
  const pages = {};

  /* ----- HOME ----------------------------------------------------------- */
  pages.home = function () {
    const row = (sec, cls, nav) => `
      <div class="tt-trending-videos">
        ${tpl.sectionHeading(t(sec), link.category(sec))}
        ${tpl.videoSlider(cls, nav, bySection(sec))}
      </div>`;

    return {
      title: t('home'),
      html: `
        ${rcMiniHtml()}
        <div class="tt-hero">
          <div class="tt-hero-slider swiper">
            <div class="swiper-wrapper">
              ${heroSlides().map((s) => `
                <div class="swiper-slide">
                  <div class="tt-hero-slide">
                    <h2 class="tt-hero__title">${esc(L(s.title))}</h2>
                    <p class="tt-hero__descr">${esc(L(s.text))}</p>
                    <div class="tt-hero__btns">
                      <a href="${s.watch}" class="btn-1">${esc(t('watchNow'))}</a>
                      <a href="${s.more}" class="btn-2"><i class="flaticon-play-button"></i> ${esc(t('playTrailer'))}</a>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
          </div>
          <div class="tt-hero-slider-pagination"></div>
        </div>

        <div>
          ${tpl.sectionHeading(t('videoShorts'), '#/shorts')}
          <div class="swiper tt-shorts position-relative">
            <div class="swiper-wrapper">
              ${DATA.shorts.map((s) => `
                <div class="swiper-slide">
                  <div class="tt-short">
                    <a href="${link.short(s)}" class="spa-short-thumb"><img src="${esc(s.thumbnail)}" alt="${esc(L(s.title))}" loading="lazy"></a>
                    <div>
                      <a href="${link.short(s)}" class="tt-short__title">${esc(L(s.title))}</a>
                      <div class="views-count"><span>${esc(s.ch)} · ${esc(t('year', { y: s.year }))}</span></div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
            <button class="tt-slider-nav" id="tt-shorts-slider-nav" aria-label="${esc(t('nextShort'))}"><i class="flaticon-right-arrow"></i></button>
          </div>
        </div>

        <div class="tt-categories-og-container">
          <div class="tt-categories">
            <button class="active">${esc(t('all'))}</button>
            ${TYPE_ORDER.map((ty) => `<button data-href="${link.category(ty)}">${esc(L(TYPES[ty].label))}</button>`).join('')}
          </div>
        </div>

        ${row('Trending', 'tt-trending-videos-slider', 'tt-trending-videos-slider-nav')}

        <div class="tt-lives overflow-hidden">
          <h6 class="tt-lives__title">${esc(t('liveTitle'))}</h6>
          <div class="swiper tt-live-slider position-relative">
            <div class="swiper-wrapper">
              ${lives().map((v) => `
                <div class="swiper-slide">
                  <div class="tt-live">
                    <a href="${link.video(v)}" class="tt-live__thumb spa-live-thumb"><img src="${esc(v.thumbnail)}" alt="${esc(L(v.title))}" loading="lazy"></a>
                    <span class="tt-live__status">${esc(t(v.live))}</span>
                    <div class="tt-live__txt">
                      <span class="tt-video__author">${esc(v.ch)}</span>
                      <a href="${link.video(v)}" class="tt-video__title">${esc(L(v.title))}</a>
                      <div class="tt-video__infos"><span>${esc(t('year', { y: v.year }))}</span></div>
                    </div>
                  </div>
                </div>`).join('')}
            </div>
            <button class="tt-slider-nav" id="tt-live-slider-nav" aria-label="${esc(t('viewAll'))}"><i class="flaticon-right-arrow"></i></button>
          </div>
        </div>

        ${row('new', 'tt-latest-movies-slider', 'tt-latest-movies-slider-nav')}
        ${row('prep2027', 'tt-exclusive-videos-slider', 'tt-exclusive-videos-slider-nav')}

        <div class="tt-sub-banner">
          <div class="row row-cols-xl-2 row-cols-1 align-items-center">
            <div class="col"><div class="tt-sub-banner__img"><img src="assets/img/sub-banner-img.png" alt=""></div></div>
            <div class="col">
              <div class="tt-sub-banner__txt">
                <h2 class="tt-sub-banner__title">${esc(t('kidsTitle'))}</h2>
                <p class="tt-sub-banner__descr">${esc(t('kidsText'))}</p>
                <div class="tt-sub-banner__btns">
                  <a href="${link.category('kids')}">${esc(t('watchNow'))}</a>
                  <a href="#">${esc(t('downloadApp'))}</a>
                </div>
                <img src="assets/img/sub-banner-vector.png" alt="" class="tt-sub-banner__vector">
              </div>
            </div>
          </div>
        </div>

        ${row('Recommended', 'tt-recommended-movies-slider', 'tt-recommended-movies-slider-nav')}

        <div class="tt-blogs pt-5">
          ${tpl.sectionHeading(t('blogs'), 'pages/blog.html', t('readAll'))}
          <div class="row row-cols-xxl-4 row-cols-xl-3 row-cols-2 row-cols-xxs-1 g-2 g-sm-3 g-lg-4">
            ${DATA.blogs.map((b) => `
              <div class="col">
                <div class="tt-blog">
                  <a href="${esc(b.link)}" class="tt-blog__cover"><img src="${esc(b.coverImage)}" alt="" loading="lazy"></a>
                  <div class="tt-blog__txt">
                    <ul class="tt-blog__infos">
                      <li>${esc(new Intl.NumberFormat(LOCALES[lang], { style: 'unit', unit: 'minute', unitDisplay: 'short' }).format(b.minutes))}</li>
                      <li>${esc(new Intl.DateTimeFormat(LOCALES[lang], { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(b.date + 'T12:00:00')))}</li>
                    </ul>
                    <a href="${esc(b.link)}" class="tt-blog__title">${esc(L(b.title))}</a>
                    <p class="tt-blog__descr">${esc(L(b.text))}</p>
                  </div>
                </div>
              </div>`).join('')}
          </div>
        </div>`,

      mount() {
        slider('.tt-hero-slider', {
          slidesPerView: 1, spaceBetween: 20, autoplay: { delay: 5000 }, loop: true,
          pagination: { el: '.tt-hero-slider-pagination', clickable: true }
        });
        slider('.tt-shorts', { slidesPerView: 'auto', spaceBetween: 15, navigation: { nextEl: '#tt-shorts-slider-nav' } });
        [
          ['.tt-trending-videos-slider', '#tt-trending-videos-slider-nav'],
          ['.tt-live-slider', '#tt-live-slider-nav'],
          ['.tt-latest-movies-slider', '#tt-latest-movies-slider-nav'],
          ['.tt-exclusive-videos-slider', '#tt-exclusive-videos-slider-nav'],
          ['.tt-recommended-movies-slider', '#tt-recommended-movies-slider-nav']
        ].forEach(([sel, nav]) => slider(sel, { slidesPerView: 'auto', spaceBetween: 20, navigation: { nextEl: nav } }));

        $('.tt-categories').addEventListener('click', clickableCards);
        updateLocLabel();
        renderRamadanBadge();
        rcTick();
        placeMobileCategories();
        window.addEventListener('resize', placeMobileCategories);
        onLeave(() => {
          window.removeEventListener('resize', placeMobileCategories);
          $('.tt-categories-mobile-container').innerHTML = '';
        });
      }
    };
  };

  function placeMobileCategories() {
    const chips = $('.tt-categories');
    const mobile = $('.tt-categories-mobile-container');
    const original = $('.tt-categories-og-container');
    if (!chips || !mobile || !original) return;
    if (window.innerWidth < 768) { if (chips.parentElement !== mobile) mobile.appendChild(chips); }
    else if (chips.parentElement !== original) original.appendChild(chips);
  }

  /* ----- CATEGORY ------------------------------------------------------- */
  pages.category = function (params) {
    const key = params[0] ? decodeURIComponent(params[0]) : '';
    const section = SECTIONS.find((s) => s.toLowerCase() === key.toLowerCase());
    const type = TYPES[key] ? key : '';
    const videos = section ? bySection(section) : type ? byType(type) : DATA.videos;
    const title = section ? t(section) : type ? L(TYPES[type].label) : t('ourMovies');
    const chips = [['', t('all')]].concat(TYPE_ORDER.map((ty) => [ty, L(TYPES[ty].label)]));
    const current = section || type;

    return {
      title,
      html: `
        ${tpl.breadcrumb(title)}
        <section class="tt-section-spacing">
          <div class="tt-inner-movies-container">
            <div class="tt-inner-movies-header">
              <div class="row row-cols-sm-2 row-cols-1 gy-3">
                ${lives().slice(0, 2).map((v) => `
                  <div class="col">
                    <div class="tt-2-popular-show">
                      <div class="tt-2-popular-show-img spa-popular-img"><img src="${esc(v.thumbnail)}" alt=""></div>
                      <div class="tt-2-popular-show-txt">
                        <a href="${link.video(v)}" class="tt-2-popular-show-btn" aria-label="${esc(t('watchNow'))}"><i class="flaticon-play-button"></i></a>
                        <div class="bottom">
                          <span class="tt-video__author">${esc(v.ch)}</span>
                          <a href="${link.video(v)}" class="tt-video__title">${esc(L(v.title))}</a>
                          <div class="tt-video__infos"><span>${esc(t(v.live))}</span><span>${esc(t('year', { y: v.year }))}</span></div>
                        </div>
                      </div>
                    </div>
                  </div>`).join('')}
              </div>
            </div>

            <div class="tt-categories spa-cat-btns">
              ${chips.map(([k, label]) => `<button data-href="${link.category(k)}" class="${current === k ? 'active' : ''}">${esc(label)}</button>`).join('')}
            </div>

            ${videos.length ? `
              <div class="row row-cols-xxl-5 row-cols-lg-4 row-cols-sm-3 row-cols-2 row-cols-xxs-1 tt-inner-movies-row">
                ${videos.map((v) => `<div class="col">${tpl.videoCard(v)}</div>`).join('')}
              </div>` : tpl.empty('flaticon-video-player', t('noVideos'))}
          </div>
        </section>`,

      mount() {
        $('#app-view').addEventListener('click', clickableCards);
        onLeave(() => $('#app-view').removeEventListener('click', clickableCards));
      }
    };
  };

  /* ----- VIDEO DETAILS -------------------------------------------------- */
  pages.video = function (params) {
    const video = DATA.videos[Number(params[0])] || DATA.videos[0];
    const similar = DATA.videos.filter((v) => (v.type === video.type || v.sec === video.sec) && v.id !== video.id);
    const others = DATA.videos.filter((v) => v.id !== video.id);
    const reactions = store.get('reactions', {});
    const myList = store.get('mylist', []);
    const r = reactions[video.yt] || '';
    const pageUrl = location.href;
    const title = L(video.title);

    return {
      title,
      html: `
        ${tpl.breadcrumb(t('movieDetails'))}
        <div class="tt-video-details-container tt-section-spacing">
          <div class="tt-video-details">
            <div class="d-flex align-items-start">
              <div class="tt-video-details__left">
                <div class="tt-video-details__video">${tpl.player(video.yt, title, false)}</div>
                <div>
                  <div class="tt-video-details__heading">
                    <div class="left">
                      <div class="tt-video-details__info"><span class="spa-year spa-year--${video.year}">${esc(t('year', { y: video.year }))}</span></div>
                      <div class="tt-video-details__info">${esc(L(TYPES[video.type].label))}</div>
                    </div>
                    <div class="right">
                      <button data-react="like" class="${r === 'like' ? 'is-on' : ''}"><i class="flaticon-like"></i> <span>${esc(t('like'))}</span></button>
                      <button data-react="dislike" class="${r === 'dislike' ? 'is-on' : ''}"><i class="flaticon-dislike"></i> <span>${esc(t('dislike'))}</span></button>
                      <button data-mylist class="${myList.includes(video.yt) ? 'is-on' : ''}"><i class="flaticon-add-1"></i> <span>${esc(t('addList'))}</span></button>
                      <div class="position-relative share-btn"><i class="flaticon-share"></i> <span>${esc(t('share'))}</span>
                        <div class="share-options">
                          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}" target="_blank" rel="noopener" aria-label="Facebook"><i class="flaticon-facebook"></i></a>
                          <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}" target="_blank" rel="noopener" aria-label="X"><i class="flaticon-twitter"></i></a>
                          <a href="https://wa.me/?text=${encodeURIComponent(title + ' ' + pageUrl)}" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="flaticon-share"></i></a>
                          <a href="${ytWatch(video.yt)}" target="_blank" rel="noopener" aria-label="YouTube"><i class="flaticon-youtube"></i></a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5 class="tt-video-details__title">${esc(title)}</h5>
                  <div class="tt-video-details__descr"><p class="mb-0">${esc(t('ytDesc', { ch: video.ch }))}</p></div>

                  <div class="spa-source">
                    <h5 class="tt-video-details__inner-title">${esc(t('source'))}</h5>
                    <dl>
                      <dt>${esc(t('channel'))}</dt><dd>${esc(video.ch)}</dd>
                      <dt>${esc(t('originalTitle'))}</dt><dd dir="auto">${esc(video.orig)}</dd>
                    </dl>
                    <a href="${ytWatch(video.yt)}" target="_blank" rel="noopener" class="spa-yt-link"><i class="flaticon-youtube"></i> ${esc(t('onYoutube'))}</a>
                  </div>

                  <div class="tt-video-details__same-author-videos tt-trending-videos pt-0">
                    <div class="tt-section-heading d-flex align-items-center justify-content-between">
                      <h5 class="tt-video-details__inner-title mb-0">${esc(t('similar'))}</h5>
                      <div class="tt-same-author-videos-slider-nav">
                        <button class="prev" aria-label="prev"><i class="flaticon-left-arrow"></i></button>
                        <button class="next" aria-label="next"><i class="flaticon-right-arrow"></i></button>
                      </div>
                    </div>
                    <div class="swiper tt-same-author-videos-slider position-relative">
                      <div class="swiper-wrapper">
                        ${(similar.length ? similar : others).map((v) => `<div class="swiper-slide padding-20">${tpl.videoCard(v)}</div>`).join('')}
                      </div>
                    </div>
                  </div>

                  <div class="tt-video-details__comment-container">
                    <div class="tt-video-details__comment-form-container">
                      <div class="heading">
                        <h5 class="mb-0" id="comment-count"></h5>
                        <select name="comment-sort" id="comment-sort" aria-label="${esc(t('sortNew'))}">
                          <option value="new">${esc(t('sortNew'))}</option>
                          <option value="old">${esc(t('sortTop'))}</option>
                        </select>
                      </div>
                      <form class="tt-video-details__comment-form" id="comment-form">
                        <textarea name="comment" placeholder="${esc(t('addComment'))}" maxlength="500" required></textarea>
                        <div class="btns">
                          <button type="reset">${esc(t('cancel'))}</button>
                          <button type="submit">${esc(t('post'))}</button>
                        </div>
                      </form>
                    </div>
                    <div class="tt-video-details__comments" id="comment-list"></div>
                  </div>
                </div>
              </div>

              <div class="tt-video-details__right">
                <div class="tt-video-details__categories-slider swiper">
                  <div class="swiper-wrapper tt-categories-nav">
                    ${TYPE_ORDER.map((ty) => `<div class="swiper-slide"><a href="${link.category(ty)}" class="tt-video-details__category">${esc(L(TYPES[ty].label))}</a></div>`).join('')}
                  </div>
                  <div class="tt-video-details__categories-slider-nav">
                    <button class="prev" aria-label="prev"><i class="flaticon-left-arrow"></i></button>
                    <button class="next" aria-label="next"><i class="flaticon-right-arrow"></i></button>
                  </div>
                </div>
                <div class="tt-video-details__right-videos">${others.map((v) => tpl.videoHorizontal(v)).join('')}</div>
              </div>
            </div>
          </div>
        </div>`,

      mount() {
        slider('.tt-same-author-videos-slider', {
          slidesPerView: 'auto', spaceBetween: 20,
          navigation: { nextEl: '.tt-same-author-videos-slider-nav .next', prevEl: '.tt-same-author-videos-slider-nav .prev' }
        });
        slider('.tt-video-details__categories-slider', {
          slidesPerView: 'auto', spaceBetween: 10,
          navigation: { nextEl: '.tt-video-details__categories-slider-nav .next', prevEl: '.tt-video-details__categories-slider-nav .prev' }
        });

        // Like / dislike / my list — saved in this browser, keyed by YouTube id
        $$('[data-react]').forEach((btn) => btn.addEventListener('click', () => {
          const all = store.get('reactions', {});
          all[video.yt] = all[video.yt] === btn.dataset.react ? '' : btn.dataset.react;
          store.set('reactions', all);
          $$('[data-react]').forEach((b) => b.classList.toggle('is-on', b.dataset.react === all[video.yt]));
        }));
        const listBtn = $('[data-mylist]');
        listBtn.addEventListener('click', () => {
          let list = store.get('mylist', []);
          list = list.includes(video.yt) ? list.filter((id) => id !== video.yt) : list.concat(video.yt);
          store.set('mylist', list);
          listBtn.classList.toggle('is-on', list.includes(video.yt));
        });

        // Comments — saved in this browser only
        const sortEl = $('#comment-sort');
        const key = 'comments_' + video.yt;
        const renderComments = () => {
          let all = store.get(key, []);
          if (sortEl.value === 'old') all = all.slice().reverse();
          $('#comment-list').innerHTML = all.length ? all.map(tpl.comment).join('') : `<p class="spa-empty py-4">${esc(t('noComments'))}</p>`;
          $('#comment-count').textContent = t('comments', { n: String(all.length).padStart(2, '0') });
        };
        renderComments();
        sortEl.addEventListener('change', renderComments);
        $('#comment-form').addEventListener('submit', (e) => {
          e.preventDefault();
          const text = e.target.comment.value.trim();
          if (!text) return;
          const mine = store.get(key, []);
          mine.unshift({ author: t('you'), at: Date.now(), text });
          store.set(key, mine);
          e.target.reset();
          sortEl.value = 'new';
          renderComments();
        });

        $('.tt-video-details__right-videos').addEventListener('click', clickableCards);
      }
    };
  };

  /* ----- SHORTS --------------------------------------------------------- */
  pages.shorts = function (params) {
    let index = Math.min(Math.max(Number(params[0]) || 0, 0), DATA.shorts.length - 1);

    const shortHtml = (s) => {
      const liked = (store.get('reactions', {})[s.yt] || '') === 'like';
      return `
      <div class="spa-short-col">
        <div class="tt-shorts-video-container spa-yt-short">${tpl.player(s.yt, L(s.title), true)}</div>
        <div class="spa-short-info">
          <h6 class="mb-1">${esc(L(s.title))}</h6>
          <div class="tt-video__infos"><span>${esc(s.ch)}</span><span class="spa-year spa-year--${s.year}">${esc(t('year', { y: s.year }))}</span></div>
        </div>
      </div>
      <div class="tt-shorts-interactions spa-short-actions">
        <div class="tt-shorts-interaction"><button data-like class="${liked ? 'is-on' : ''}" aria-label="${esc(t('like'))}"><i class="flaticon-like"></i></button><span class="txt">${esc(t('like'))}</span></div>
        <div class="tt-shorts-interaction"><button data-share aria-label="${esc(t('share'))}"><i class="flaticon-share"></i></button><span class="txt">${esc(t('share'))}</span></div>
        <div class="tt-shorts-interaction"><a href="${ytWatch(s.yt)}" target="_blank" rel="noopener" class="spa-round" aria-label="${esc(t('onYoutube'))}"><i class="flaticon-youtube"></i></a><span class="txt">YouTube</span></div>
      </div>`;
    };

    return {
      title: t('shorts'),
      html: `
        <div class="tt-shorts-container d-flex align-items-center justify-content-center gap-4">
          <div class="d-flex align-items-center justify-content-center" id="short-slot"></div>
          <div class="tt-shorts-nav">
            <button id="short-up" aria-label="${esc(t('prevShort'))}"><i class="flaticon-up-arrow"></i></button>
            <button id="short-down" aria-label="${esc(t('nextShort'))}"><i class="flaticon-arrow-down-sign-to-navigate"></i></button>
          </div>
        </div>`,

      mount() {
        const slot = $('#short-slot');
        const up = $('#short-up');
        const down = $('#short-down');

        const show = () => {
          slot.innerHTML = shortHtml(DATA.shorts[index]);
          up.disabled = index <= 0;
          up.classList.toggle('disabled', up.disabled);
          down.disabled = index >= DATA.shorts.length - 1;
          down.classList.toggle('disabled', down.disabled);
          history.replaceState(null, '', location.pathname + location.search + '#/shorts/' + index);
        };
        const go = (step) => {
          const next = index + step;
          if (next < 0 || next >= DATA.shorts.length) return;
          index = next;
          show();
        };

        up.addEventListener('click', () => go(-1));
        down.addEventListener('click', () => go(1));
        slot.addEventListener('click', async (e) => {
          const s = DATA.shorts[index];
          const likeBtn = e.target.closest('[data-like]');
          if (likeBtn) {
            const all = store.get('reactions', {});
            all[s.yt] = all[s.yt] === 'like' ? '' : 'like';
            store.set('reactions', all);
            likeBtn.classList.toggle('is-on', all[s.yt] === 'like');
            return;
          }
          if (!e.target.closest('[data-share]')) return;
          const url = location.href;
          if (navigator.share) { try { await navigator.share({ title: L(s.title), url }); } catch (err) { /* cancelled */ } }
          else if (navigator.clipboard) { navigator.clipboard.writeText(url); }
        });

        const onKey = (e) => {
          if (e.target.matches('input, textarea, select')) return;
          if (e.key === 'ArrowDown') { e.preventDefault(); go(1); }
          if (e.key === 'ArrowUp') { e.preventDefault(); go(-1); }
        };
        document.addEventListener('keydown', onKey);
        onLeave(() => document.removeEventListener('keydown', onKey));

        show();
      }
    };
  };

  /* ----- SEARCH (all languages + channel + original title) ------------- */
  function searchAll(q) {
    const query = q.trim().toLowerCase();
    if (!query) return { videos: [], shorts: [] };
    const hit = (item) => [item.title, item.orig, item.ch, TYPES[item.type].label, String(item.year), UI.fr[item.sec], UI.en[item.sec], UI.ar[item.sec]]
      .some((f) => allLangs(f).toLowerCase().includes(query));
    return { videos: DATA.videos.filter(hit), shorts: DATA.shorts.filter(hit) };
  }

  pages.search = function (params, query) {
    const q = (query.get('q') || '').trim();
    const res = searchAll(q);
    const total = res.videos.length + res.shorts.length;

    const row = (item, href, kind) => `
      <div class="tt-search-result-single tt-watch-history-single tt-video-horizontal" data-href="${href}">
        <div class="thumbnail"><img src="${esc(item.thumbnail)}" alt="${esc(L(item.title))}" loading="lazy"></div>
        <div class="tt-watch-history-single__txt">
          <a href="${href}" class="tt-video__title tt-watch-history-single__title">${esc(L(item.title))}</a>
          <div class="tt-video__infos mb-3">
            <span class="spa-year spa-year--${item.year}">${esc(t('year', { y: item.year }))}</span>
            <span>${esc(kind || L(TYPES[item.type].label))}</span>
          </div>
          <h6 class="more-info" dir="auto">${esc(item.orig)}</h6>
          <div class="author-info"><div class="author-channel"><span class="name">${esc(item.ch)}</span></div></div>
        </div>
      </div>`;

    return {
      title: q ? t('search') + ' : ' + q : t('search'),
      html: `
        <div>
          <div class="tt-search-result-heading">
            <h3 class="mb-0">${esc(q ? t('resultsFor', { n: total, q }) : t('typeToSearch'))}</h3>
          </div>
          <div class="tt-search-result-wrapper d-flex align-items-start gap-4">
            <div class="left">
              ${total ? res.videos.map((v) => row(v, link.video(v))).join('') + res.shorts.map((s) => row(s, link.short(s), t('short'))).join('')
                : tpl.empty('flaticon-search', q ? t('noResults') : t('useSearchBar'))}
            </div>
            <div class="right">
              ${tpl.sectionHeading(t('newHit'), link.category('prep2027'))}
              <div>${bySection('prep2027').map((v) => tpl.videoHorizontal(v, 'w-100')).join('')}</div>
            </div>
          </div>
        </div>`,

      mount() {
        const input = $('#tt-search');
        if (input.value !== q) input.value = q;
        $('#app-view').addEventListener('click', clickableCards);
        onLeave(() => $('#app-view').removeEventListener('click', clickableCards));
      }
    };
  };

  function clickableCards(e) {
    if (e.target.closest('a')) return;
    const el = e.target.closest('[data-href]');
    if (el) location.hash = el.dataset.href;
  }

  pages.notFound = function () {
    return {
      title: t('notFound'),
      html: `${tpl.breadcrumb(t('notFound'))}${tpl.empty('flaticon-report', t('notFoundText'))}<p class="text-center"><a href="#/" class="tt-section-heading__btn">${esc(t('backHome'))}</a></p>`
    };
  };

  /* =======================================================================
     RAMADAN TOOLS (merged from the former ramadan-companion app)
     #/prayer  Iftar/Suhoor countdown + prayer times (Aladhan API, no key)
     #/card    greeting-card generator (canvas → PNG, share / download)
     #/tasbih  digital dhikr counter (Web Audio + vibration)
     #/tracker daily good-deeds & Quran tracker
     ======================================================================= */
  const RC = {
    // Your Ko-fi page — the "Support" popup opens this link (new tab). Change it here only.
    donateUrl: 'https://ko-fi.com/benjemaaahmed',
    // Watermark printed at the bottom of every greeting card. Empty = current domain.
    siteUrl: '',
    // Link of the top promo bar ("our other free apps"). Empty = root of the current domain.
    promoUrl: '',
    // Used only if geolocation is refused on the first visit.
    defaultLocation: { type: 'city', city: 'Makkah', country: 'Saudi Arabia', label: 'Makkah, Saudi Arabia' }
  };
  const API = 'https://api.aladhan.com/v1/';
  const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  const pad = (n) => String(n).padStart(2, '0');
  const byId = (id) => document.getElementById(id);
  const setText = (id, v) => { const e = byId(id); if (e && e.textContent !== v) e.textContent = v; };
  const SITE_LABEL = RC.siteUrl || (location.host
    ? (location.host + location.pathname.replace(/[^/]*$/, '')).replace(/\/$/, '')
    : 'Ramadan');
  const SHARE_URL = /^https?:/.test(location.protocol) ? location.origin + location.pathname : '';
  const PROMO_URL = RC.promoUrl || (/^https?:/.test(location.protocol) ? location.origin + '/' : '#');

  const RC_I18N = {
    fr: {
      locating: 'Localisation…', loading: 'Chargement des horaires…',
      iftarIn: 'Iftar dans', suhoorIn: 'Fin du Suhoor dans',
      iftarAt: 'Iftar (Maghrib) à {time}', suhoorAt: 'Imsak / Fajr à {time}',
      hoursShort: 'Heures', minutesShort: 'Minutes', secondsShort: 'Secondes',
      ramadanDay: 'Jour {n} du Ramadan {y}', ramadanIn: 'Ramadan {y} dans {n} jours', ramadanTomorrow: 'Ramadan {y} commence demain',
      iftarNow: 'C’est l’heure de l’Iftar 🌙', seeTimes: 'Voir les horaires',
      prayerEyebrow: 'Horaires', prayerTitle: 'Iftar, Suhoor & prières', prayerSub: 'Compte à rebours en direct et horaires des 5 prières pour votre ville.',
      prayerTimes: 'Horaires de prière', next: 'Prochaine · {t}', hUnit: 'h', mUnit: 'min', lessMin: '< 1 min',
      fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha', sunrise: 'Lever', imsak: 'Imsak',
      errorFetch: 'Impossible de charger les horaires. Vérifiez la ville ou votre connexion.', retry: 'Réessayer',
      offlineCache: 'Hors ligne : derniers horaires enregistrés.',
      cardEyebrow: 'Partagez la baraka', cardTitle: 'Carte de vœux Ramadan',
      cardSub: 'Créez une carte élégante en quelques secondes et partagez-la sur WhatsApp, Instagram ou en story.',
      recipient: 'Pour (prénom)', recipientPh: 'Ex : Maman, Yasmine, la famille…', sender: 'De la part de (optionnel)', senderPh: 'Votre prénom',
      theme: 'Thème', themeEmerald: 'Émeraude & Or', themeMidnight: 'Croissant de minuit', themeLantern: 'Lanterne royale', themeDesert: 'Coucher du désert',
      message: 'Message', customOption: '✍️ Message personnalisé…', customMessage: 'Votre message', customPh: 'Écrivez votre vœu…',
      format: 'Format', formatPost: 'Post 4:5', formatStory: 'Story 9:16',
      share: 'Partager / Télécharger', download: 'Télécharger', whatsapp: 'WhatsApp',
      shareText: 'Ramadan Moubarak 🌙 Créez votre carte de vœux gratuite ici :',
      downloaded: 'Carte téléchargée ✨', shareFail: 'Partage indisponible — la carte a été téléchargée.',
      cardHeadline: 'Ramadan Moubarak', cardTo: 'Pour {name}', cardFrom: '— {name}',
      tasbihEyebrow: 'Dhikr', tasbihTitle: 'Tasbih digital', tasbihSub: 'Touchez le cercle pour compter. Votre progression est enregistrée.',
      tapHint: 'Touchez', target: 'Objectif', rounds: 'Tours', totalToday: 'Total aujourd’hui',
      reset: 'Réinitialiser', mute: 'Couper le son', unmute: 'Activer le son',
      targetReached: 'Objectif atteint ! Qu’Allah l’accepte 🤍', resetDone: 'Compteur remis à zéro',
      trackerEyebrow: 'Bonnes actions', trackerTitle: 'Suivi quotidien', trackerSub: 'Cochez vos bonnes actions du jour et suivez votre régularité.',
      item_fast: 'Jeûne du jour', item_prayers: '5 prières quotidiennes', item_quran: 'Lecture du Coran', item_taraweeh: 'Prière de Tarawih',
      item_sadaqah: 'Sadaqa / Charité', item_dua: 'Dua avant l’Iftar', item_adhkar: 'Adhkar du matin & du soir',
      pagesGoal: 'pages sur {n} (1 Juz)',
      msg0: 'Commencez la journée avec une belle intention 🌱', msg1: 'Bon début, continuez ainsi !', msg2: 'Plus de la moitié, MashaAllah ✨',
      msg3: 'Presque complet, encore un effort !', msg4: 'Journée complète, MashaAllah ! 🤍',
      last7: '7 derniers jours', resetDay: 'Réinitialiser la journée', dayReset: 'Journée réinitialisée',
      locTitle: 'Votre localisation', useGps: 'Utiliser ma position', or: 'ou', city: 'Ville', country: 'Pays',
      cityPh: 'Ex : Paris', countryPh: 'Ex : France', method: 'Méthode de calcul', methodAuto: 'Automatique (recommandé)',
      save: 'Enregistrer', cancel: 'Annuler', gpsDenied: 'Localisation refusée. Saisissez votre ville.',
      gpsUnsupported: 'Géolocalisation indisponible. Saisissez votre ville.', gpsError: 'Position introuvable. Saisissez votre ville.',
      fillBoth: 'Indiquez la ville et le pays.', locSaved: 'Localisation mise à jour ✓', chooseCity: 'Choisissez votre ville pour des horaires précis.'
    },
    en: {
      locating: 'Locating…', loading: 'Loading prayer times…',
      iftarIn: 'Iftar in', suhoorIn: 'Suhoor ends in',
      iftarAt: 'Iftar (Maghrib) at {time}', suhoorAt: 'Imsak / Fajr at {time}',
      hoursShort: 'Hours', minutesShort: 'Minutes', secondsShort: 'Seconds',
      ramadanDay: 'Day {n} of Ramadan {y}', ramadanIn: 'Ramadan {y} in {n} days', ramadanTomorrow: 'Ramadan {y} starts tomorrow',
      iftarNow: 'It’s Iftar time 🌙', seeTimes: 'See prayer times',
      prayerEyebrow: 'Prayer times', prayerTitle: 'Iftar, Suhoor & prayers', prayerSub: 'Live countdown and the 5 daily prayer times for your city.',
      prayerTimes: 'Prayer times', next: 'Next · {t}', hUnit: 'h', mUnit: 'min', lessMin: '< 1 min',
      fajr: 'Fajr', dhuhr: 'Dhuhr', asr: 'Asr', maghrib: 'Maghrib', isha: 'Isha', sunrise: 'Sunrise', imsak: 'Imsak',
      errorFetch: 'Could not load prayer times. Check the city or your connection.', retry: 'Retry',
      offlineCache: 'Offline: showing last saved times.',
      cardEyebrow: 'Share the blessings', cardTitle: 'Ramadan greeting card',
      cardSub: 'Create an elegant card in seconds and share it on WhatsApp, Instagram or your story.',
      recipient: 'To (name)', recipientPh: 'e.g. Mom, Yasmine, the family…', sender: 'From (optional)', senderPh: 'Your name',
      theme: 'Theme', themeEmerald: 'Emerald & Gold', themeMidnight: 'Midnight Crescent', themeLantern: 'Royal Lantern', themeDesert: 'Desert Sunset',
      message: 'Message', customOption: '✍️ Custom message…', customMessage: 'Your message', customPh: 'Write your wish…',
      format: 'Format', formatPost: 'Post 4:5', formatStory: 'Story 9:16',
      share: 'Share / Download', download: 'Download', whatsapp: 'WhatsApp',
      shareText: 'Ramadan Mubarak 🌙 Make your own free greeting card here:',
      downloaded: 'Card downloaded ✨', shareFail: 'Sharing unavailable — the card was downloaded.',
      cardHeadline: 'Ramadan Mubarak', cardTo: 'To {name}', cardFrom: '— {name}',
      tasbihEyebrow: 'Dhikr', tasbihTitle: 'Digital Tasbih', tasbihSub: 'Tap the circle to count. Your progress is saved.',
      tapHint: 'Tap', target: 'Target', rounds: 'Rounds', totalToday: 'Total today',
      reset: 'Reset', mute: 'Mute', unmute: 'Unmute',
      targetReached: 'Target reached! May Allah accept it 🤍', resetDone: 'Counter reset',
      trackerEyebrow: 'Good deeds', trackerTitle: 'Daily tracker', trackerSub: 'Check off today’s good deeds and keep your streak going.',
      item_fast: 'Fasted today', item_prayers: '5 daily prayers', item_quran: 'Quran reading', item_taraweeh: 'Taraweeh prayer',
      item_sadaqah: 'Sadaqah / Charity', item_dua: 'Dua before Iftar', item_adhkar: 'Morning & evening Adhkar',
      pagesGoal: 'pages of {n} (1 Juz)',
      msg0: 'Start the day with a beautiful intention 🌱', msg1: 'Good start, keep going!', msg2: 'Over halfway, MashaAllah ✨',
      msg3: 'Almost there, one more push!', msg4: 'Day complete, MashaAllah! 🤍',
      last7: 'Last 7 days', resetDay: 'Reset today', dayReset: 'Today has been reset',
      locTitle: 'Your location', useGps: 'Use my location', or: 'or', city: 'City', country: 'Country',
      cityPh: 'e.g. London', countryPh: 'e.g. United Kingdom', method: 'Calculation method', methodAuto: 'Automatic (recommended)',
      save: 'Save', cancel: 'Cancel', gpsDenied: 'Location denied. Please enter your city.',
      gpsUnsupported: 'Geolocation unavailable. Please enter your city.', gpsError: 'Could not get your position. Please enter your city.',
      fillBoth: 'Please enter both city and country.', locSaved: 'Location updated ✓', chooseCity: 'Pick your city for accurate times.'
    },
    ar: {
      locating: 'جارٍ تحديد الموقع…', loading: 'جارٍ تحميل المواقيت…',
      iftarIn: 'الإفطار بعد', suhoorIn: 'ينتهي السحور بعد',
      iftarAt: 'الإفطار (المغرب) الساعة {time}', suhoorAt: 'الإمساك / الفجر الساعة {time}',
      hoursShort: 'ساعات', minutesShort: 'دقائق', secondsShort: 'ثوانٍ',
      ramadanDay: 'اليوم {n} من رمضان {y}', ramadanIn: 'رمضان {y} بعد {n} يومًا', ramadanTomorrow: 'رمضان {y} يبدأ غدًا',
      iftarNow: 'حان وقت الإفطار 🌙', seeTimes: 'عرض المواقيت',
      prayerEyebrow: 'المواقيت', prayerTitle: 'الإفطار والسحور والصلوات', prayerSub: 'عدّ تنازلي مباشر ومواقيت الصلوات الخمس لمدينتك.',
      prayerTimes: 'مواقيت الصلاة', next: 'القادمة · {t}', hUnit: 'س', mUnit: 'د', lessMin: 'أقل من دقيقة',
      fajr: 'الفجر', dhuhr: 'الظهر', asr: 'العصر', maghrib: 'المغرب', isha: 'العشاء', sunrise: 'الشروق', imsak: 'الإمساك',
      errorFetch: 'تعذّر تحميل المواقيت. تحقّق من المدينة أو من الاتصال.', retry: 'إعادة المحاولة',
      offlineCache: 'دون اتصال: عرض آخر مواقيت محفوظة.',
      cardEyebrow: 'شارك البركة', cardTitle: 'بطاقة تهنئة رمضان',
      cardSub: 'صمّم بطاقة أنيقة في ثوانٍ وشاركها على واتساب أو إنستغرام أو في القصة.',
      recipient: 'إلى (الاسم)', recipientPh: 'مثال: أمي، ياسمين، العائلة…', sender: 'من (اختياري)', senderPh: 'اسمك',
      theme: 'التصميم', themeEmerald: 'زمرد وذهب', themeMidnight: 'هلال منتصف الليل', themeLantern: 'الفانوس الملكي', themeDesert: 'غروب الصحراء',
      message: 'الرسالة', customOption: '✍️ رسالة مخصّصة…', customMessage: 'رسالتك', customPh: 'اكتب تهنئتك…',
      format: 'المقاس', formatPost: 'منشور 4:5', formatStory: 'قصة 9:16',
      share: 'مشاركة / تحميل', download: 'تحميل', whatsapp: 'واتساب',
      shareText: 'رمضان مبارك 🌙 صمّم بطاقتك المجانية من هنا:',
      downloaded: 'تم تحميل البطاقة ✨', shareFail: 'المشاركة غير متاحة — تم تحميل البطاقة.',
      cardHeadline: 'كل عام وأنتم بخير', cardTo: 'إلى {name}', cardFrom: '— {name}',
      tasbihEyebrow: 'الذكر', tasbihTitle: 'السبحة الرقمية', tasbihSub: 'المس الدائرة للعدّ. يتم حفظ تقدّمك تلقائيًا.',
      tapHint: 'المس', target: 'الهدف', rounds: 'الدورات', totalToday: 'مجموع اليوم',
      reset: 'إعادة الضبط', mute: 'كتم الصوت', unmute: 'تشغيل الصوت',
      targetReached: 'أتممت الهدف! تقبّل الله 🤍', resetDone: 'تمت إعادة العدّاد',
      trackerEyebrow: 'الأعمال الصالحة', trackerTitle: 'المتابعة اليومية', trackerSub: 'سجّل أعمالك الصالحة اليوم وحافظ على استمراريتك.',
      item_fast: 'صيام اليوم', item_prayers: 'الصلوات الخمس', item_quran: 'قراءة القرآن', item_taraweeh: 'صلاة التراويح',
      item_sadaqah: 'الصدقة', item_dua: 'الدعاء قبل الإفطار', item_adhkar: 'أذكار الصباح والمساء',
      pagesGoal: 'صفحة من {n} (جزء واحد)',
      msg0: 'ابدأ يومك بنيّة طيبة 🌱', msg1: 'بداية جميلة، واصل!', msg2: 'تجاوزت النصف، ما شاء الله ✨',
      msg3: 'اقتربت من الإتمام، بقي القليل!', msg4: 'يوم مكتمل، ما شاء الله! 🤍',
      last7: 'آخر 7 أيام', resetDay: 'إعادة ضبط اليوم', dayReset: 'تمت إعادة ضبط اليوم',
      locTitle: 'موقعك', useGps: 'استخدم موقعي', or: 'أو', city: 'المدينة', country: 'الدولة',
      cityPh: 'مثال: تونس', countryPh: 'مثال: تونس', method: 'طريقة الحساب', methodAuto: 'تلقائي (موصى به)',
      save: 'حفظ', cancel: 'إلغاء', gpsDenied: 'تم رفض الوصول للموقع. أدخل مدينتك.',
      gpsUnsupported: 'تحديد الموقع غير متاح. أدخل مدينتك.', gpsError: 'تعذّر تحديد موقعك. أدخل مدينتك.',
      fillBoth: 'أدخل المدينة والدولة.', locSaved: 'تم تحديث الموقع ✓', chooseCity: 'اختر مدينتك للحصول على مواقيت دقيقة.'
    }
  };
  function rt(key, vars) {
    let s = (RC_I18N[lang] && RC_I18N[lang][key]) || RC_I18N.en[key] || key;
    if (vars) Object.keys(vars).forEach((k) => { s = s.split('{' + k + '}').join(vars[k]); });
    return s;
  }

  const HIJRI_MONTHS = {
    fr: ['Mouharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Joumada al-Oula', 'Joumada al-Thania', 'Rajab', 'Chaabane', 'Ramadan', 'Chawwal', 'Dhou al-Qi’da', 'Dhou al-Hijja'],
    en: ['Muharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumada al-Ula', 'Jumada al-Akhirah', 'Rajab', 'Sha’ban', 'Ramadan', 'Shawwal', 'Dhu al-Qi’dah', 'Dhu al-Hijjah'],
    ar: ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة']
  };
  const METHODS = [
    ['auto', null], ['3', 'Muslim World League'], ['2', 'ISNA (North America)'], ['4', 'Umm al-Qura, Makkah'],
    ['5', 'Egyptian General Authority'], ['12', 'UOIF (France)'], ['18', 'Tunisia'], ['19', 'Algeria'],
    ['21', 'Morocco'], ['13', 'Diyanet (Turkey)'], ['8', 'Gulf Region'], ['16', 'Dubai'], ['9', 'Kuwait'],
    ['10', 'Qatar'], ['1', 'Karachi'], ['17', 'JAKIM (Malaysia)'], ['20', 'Kemenag (Indonesia)'],
    ['11', 'MUIS (Singapore)'], ['23', 'Jordan'], ['15', 'Moonsighting Committee']
  ];
  const PRAYER_ICONS = {
    Fajr: '<svg viewBox="0 0 24 24"><path d="M3 18h18M6 18a6 6 0 0 1 12 0M12 6v3M5.6 10.6l1.6 1.6M18.4 10.6l-1.6 1.6M8 21h8"/></svg>',
    Dhuhr: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>',
    Asr: '<svg viewBox="0 0 24 24"><circle cx="10" cy="10" r="3.6"/><path d="M10 2.8v1.8M2.8 10h1.8M4.9 4.9l1.3 1.3M15.1 4.9l-1.3 1.3"/><path d="M8.5 20h9a3.5 3.5 0 0 0 0-7 4.6 4.6 0 0 0-8.8 1.4A2.8 2.8 0 0 0 8.5 20z"/></svg>',
    Maghrib: '<svg viewBox="0 0 24 24"><path d="M3 17h18M7 17a5 5 0 0 1 10 0M12 3v6M9 6l3 3 3-3M7 21h10"/></svg>',
    Isha: '<svg viewBox="0 0 24 24"><path d="M15.5 3.5a8.5 8.5 0 1 0 5 13.6A7 7 0 0 1 15.5 3.5z"/><path d="M18.5 4l.6 1.5 1.5.6-1.5.6-.6 1.5-.6-1.5-1.5-.6 1.5-.6z"/></svg>'
  };
  const PIN_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>';

  let toastTimer = null;
  function rcToast(msg) {
    const el = byId('rc-toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
  }

  const rcHead = (eyebrow, title, sub) => `
    <header class="rc-section-head">
      <span class="rc-eyebrow">${esc(rt(eyebrow))}</span>
      <h2>${esc(rt(title))}</h2>
      <p>${esc(rt(sub))}</p>
    </header>`;

  /* ----- prayer times & countdown -------------------------------------- */
  let rcLoc = store.get('rc_location', null);
  let rcMethod = store.get('rc_method', 'auto');
  let pd = null;            // { today, tomorrow, tz, fetchedDate }
  let pdLoading = false;
  let pdRequest = 0;
  let lastAutoReload = 0;
  let ramadanStart = store.get('rc_ramadanStart', null);
  const tzFormatters = {};

  const locKey = (l) => (!l ? '' : l.type === 'coords' ? 'c:' + l.lat + ',' + l.lon : 'n:' + (l.city + '|' + l.country).toLowerCase());

  function tzFormatter(tz) {
    if (!tzFormatters[tz]) {
      const opts = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' };
      try { tzFormatters[tz] = new Intl.DateTimeFormat('en-GB', Object.assign({ timeZone: tz }, opts)); }
      catch (e) { tzFormatters[tz] = new Intl.DateTimeFormat('en-GB', opts); }
    }
    return tzFormatters[tz];
  }
  // Wall-clock time at the selected city (works even if the visitor is in another time zone)
  function nowInTz(tz) {
    const p = {};
    tzFormatter(tz || 'UTC').formatToParts(new Date()).forEach((x) => { p[x.type] = x.value; });
    let h = parseInt(p.hour, 10);
    if (h === 24) h = 0;
    return {
      date: p.day + '-' + p.month + '-' + p.year,
      iso: p.year + '-' + p.month + '-' + p.day,
      secs: h * 3600 + parseInt(p.minute, 10) * 60 + parseInt(p.second, 10)
    };
  }
  const localDateStr = (d) => pad(d.getDate()) + '-' + pad(d.getMonth() + 1) + '-' + d.getFullYear();
  const localIso = (d) => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  function addDaysIso(iso, n) {
    const [y, m, d] = iso.split('-').map(Number);
    const dt = new Date(Date.UTC(y, m - 1, d + n));
    return pad(dt.getUTCDate()) + '-' + pad(dt.getUTCMonth() + 1) + '-' + dt.getUTCFullYear();
  }
  const cleanTime = (s) => String(s || '').trim().slice(0, 5);
  const toSec = (s) => { const [h, m] = cleanTime(s).split(':').map(Number); return (h || 0) * 3600 + (m || 0) * 60; };

  async function fetchTimings(dateStr, l) {
    const mq = rcMethod !== 'auto' ? '&method=' + encodeURIComponent(rcMethod) : '';
    const url = l.type === 'coords'
      ? API + 'timings/' + dateStr + '?latitude=' + l.lat + '&longitude=' + l.lon + mq
      : API + 'timingsByCity/' + dateStr + '?city=' + encodeURIComponent(l.city) + '&country=' + encodeURIComponent(l.country) + mq;
    const res = await fetch(url);
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const json = await res.json();
    if (json.code !== 200 || !json.data || !json.data.timings) throw new Error('Bad response');
    return json.data;
  }

  let rcStatus = { msg: '', error: false, retry: false };
  function setStatus(msg, isError, withRetry) {
    rcStatus = { msg: msg || '', error: !!isError, retry: !!withRetry };
    const el = byId('rc-status');
    if (!el) return;
    el.classList.toggle('is-error', rcStatus.error);
    el.textContent = rcStatus.msg;
    if (rcStatus.retry) {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = rt('retry');
      b.addEventListener('click', () => loadPrayerData());
      el.appendChild(b);
    }
  }

  async function loadPrayerData() {
    if (!rcLoc) return;
    const myId = ++pdRequest;
    const myLoc = rcLoc;
    pdLoading = true;
    setStatus('');
    try {
      let today = await fetchTimings(localDateStr(new Date()), myLoc);
      const tz = (today.meta && today.meta.timezone) || Intl.DateTimeFormat().resolvedOptions().timeZone;
      const now = nowInTz(tz);
      if (today.date && today.date.gregorian && today.date.gregorian.date !== now.date) today = await fetchTimings(now.date, myLoc);
      let tomorrow = null;
      try { tomorrow = await fetchTimings(addDaysIso(now.iso, 1), myLoc); } catch (e) { tomorrow = null; }
      if (myId !== pdRequest) return;
      pd = { today, tomorrow, tz, fetchedDate: now.date };
      store.set('rc_prayerCache', { key: locKey(myLoc) + '|' + rcMethod, pd });
      afterPrayerData();
    } catch (err) {
      if (myId !== pdRequest) return;
      const cache = store.get('rc_prayerCache', null);
      if (cache && cache.pd && cache.key === locKey(myLoc) + '|' + rcMethod) {
        pd = cache.pd;
        afterPrayerData();
        setStatus(rt('offlineCache'), false);
      } else {
        setStatus(rt('errorFetch'), true, true);
      }
    } finally {
      if (myId === pdRequest) pdLoading = false;
    }
  }

  function afterPrayerData() {
    updateLocLabel();
    renderPrayerHeader();
    renderPrayerList();
    loadRamadanStart();
    renderRamadanBadge();
    rcTick();
    scheduleCardRender();
  }

  function updateLocLabel() {
    const tzName = pd && pd.tz && pd.tz.indexOf('/') > -1 ? pd.tz.split('/').pop().replace(/_/g, ' ') : '';
    const label = (rcLoc && rcLoc.label) || tzName || rt('locating');
    setText('rc-loc-label', label);
    setText('rc-mini-loc', label);
  }

  function renderPrayerHeader() {
    if (!pd || !byId('rc-hijri')) return;
    const h = pd.today.date.hijri;
    setText('rc-hijri', parseInt(h.day, 10) + ' ' + HIJRI_MONTHS[lang][h.month.number - 1] + ' ' + h.year + (lang === 'ar' ? ' هـ' : ' AH'));
    let greg;
    const o = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    try { greg = new Intl.DateTimeFormat(LOCALES[lang], Object.assign({ timeZone: pd.tz }, o)).format(new Date()); }
    catch (e) { greg = new Intl.DateTimeFormat(LOCALES[lang], o).format(new Date()); }
    setText('rc-greg', greg.charAt(0).toUpperCase() + greg.slice(1));
    const T = pd.today.timings;
    setText('rc-extra', rt('imsak') + ' ' + cleanTime(T.Imsak) + ' · ' + rt('sunrise') + ' ' + cleanTime(T.Sunrise));
  }

  function hijriInfo() {
    if (!pd) return null;
    const h = pd.today.date.hijri;
    const month = h.month.number;
    const year = parseInt(h.year, 10);
    return { day: parseInt(h.day, 10), month, year, ramadanYear: month <= 9 ? year : year + 1 };
  }

  async function loadRamadanStart() {
    const info = hijriInfo();
    if (!info || info.month === 9) return;
    if (ramadanStart && ramadanStart.year === info.ramadanYear) { renderRamadanBadge(); return; }
    try {
      const json = await (await fetch(API + 'hToG/01-09-' + info.ramadanYear)).json();
      const g = json && json.data && json.data.gregorian && json.data.gregorian.date;
      if (!g) return;
      const [d, m, y] = g.split('-');
      ramadanStart = { year: info.ramadanYear, iso: y + '-' + m + '-' + d };
      store.set('rc_ramadanStart', ramadanStart);
      renderRamadanBadge();
    } catch (e) { /* the badge is optional */ }
  }

  function ramadanBadgeText() {
    const info = hijriInfo();
    if (!info) return '';
    if (info.month === 9) return '🌙 ' + rt('ramadanDay', { n: info.day, y: info.year });
    if (ramadanStart && ramadanStart.year === info.ramadanYear) {
      const now = nowInTz(pd.tz);
      const days = Math.round((Date.parse(ramadanStart.iso + 'T00:00:00Z') - Date.parse(now.iso + 'T00:00:00Z')) / 86400000);
      if (days === 1) return '🌙 ' + rt('ramadanTomorrow', { y: info.ramadanYear });
      if (days > 1) return '🌙 ' + rt('ramadanIn', { n: days, y: info.ramadanYear });
    }
    return '';
  }

  function renderRamadanBadge() {
    const txt = ramadanBadgeText();
    ['rc-badge', 'rc-mini-badge'].forEach((id) => {
      const el = byId(id);
      if (!el) return;
      el.textContent = txt;
      el.hidden = !txt;
    });
  }

  function renderPrayerList() {
    const list = byId('rc-prayers');
    if (!list) return;
    const T = pd ? pd.today.timings : null;
    list.innerHTML = PRAYERS.map((p) =>
      '<li class="rc-prayer" data-p="' + p + '"><span class="rc-p-icon" aria-hidden="true">' + PRAYER_ICONS[p] + '</span>' +
      '<span class="rc-p-name">' + esc(rt(p.toLowerCase())) + '<span class="rc-p-sub">&nbsp;</span></span>' +
      '<span class="rc-p-time">' + (T ? cleanTime(T[p]) : '--:--') + '</span></li>').join('');
  }

  function fmtDuration(secs) {
    if (secs < 60) return rt('lessMin');
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return h > 0 ? h + ' ' + rt('hUnit') + ' ' + pad(m) + ' ' + rt('mUnit') : m + ' ' + rt('mUnit');
  }

  // Runs every second (see boot)
  function rcTick() {
    const todayLocal = localIso(new Date());
    if (todayLocal !== trackerDay) {
      trackerDay = todayLocal;
      if (byId('trk-items')) renderTracker();
      if (byId('rc-count')) renderTasbih();
    }

    if (!pd) {
      setText('rc-cd-label', rt('loading'));
      setText('rc-mini-label', rt('loading'));
      return;
    }
    const now = nowInTz(pd.tz);
    if (now.date !== pd.fetchedDate && !pdLoading && Date.now() - lastAutoReload > 60000) {
      lastAutoReload = Date.now();
      if (pd.tomorrow && pd.tomorrow.date.gregorian.date === now.date) {
        pd = { today: pd.tomorrow, tomorrow: null, tz: pd.tz, fetchedDate: now.date };
        afterPrayerData();
      }
      loadPrayerData();
      return;
    }

    const T = pd.today.timings;
    const fajr = toSec(T.Fajr);
    const magh = toSec(T.Maghrib);
    const tFajrStr = pd.tomorrow ? pd.tomorrow.timings.Fajr : T.Fajr;
    const tFajr = toSec(tFajrStr);
    let mode; let remaining; let targetStr; let pct; let startLbl; let endLbl;
    if (now.secs < fajr) {
      mode = 'suhoor'; remaining = fajr - now.secs; targetStr = T.Fajr;
      pct = (86400 - magh + now.secs) / (86400 - magh + fajr);
      startLbl = rt('maghrib') + ' ' + cleanTime(T.Maghrib); endLbl = rt('fajr') + ' ' + cleanTime(T.Fajr);
    } else if (now.secs < magh) {
      mode = 'iftar'; remaining = magh - now.secs; targetStr = T.Maghrib;
      pct = (now.secs - fajr) / (magh - fajr);
      startLbl = rt('fajr') + ' ' + cleanTime(T.Fajr); endLbl = rt('maghrib') + ' ' + cleanTime(T.Maghrib);
    } else {
      mode = 'suhoor'; remaining = 86400 - now.secs + tFajr; targetStr = tFajrStr;
      pct = (now.secs - magh) / (86400 - magh + tFajr);
      startLbl = rt('maghrib') + ' ' + cleanTime(T.Maghrib); endLbl = rt('fajr') + ' ' + cleanTime(tFajrStr);
    }
    pct = Math.max(0, Math.min(1, pct));
    const hh = pad(Math.floor(remaining / 3600));
    const mm = pad(Math.floor((remaining % 3600) / 60));
    const ss = pad(remaining % 60);
    const label = mode === 'iftar' ? rt('iftarIn') : rt('suhoorIn');

    // mini widget on the home page
    setText('rc-mini-label', label);
    setText('rc-mini-time', hh + ':' + mm + ':' + ss);
    const mini = byId('rc-mini');
    if (mini && mini.dataset.mode !== mode) mini.dataset.mode = mode;

    // full prayer page
    const hero = byId('rc-hero');
    if (!hero) return;
    if (hero.dataset.mode !== mode) hero.dataset.mode = mode;
    setText('rc-cd-label', label);
    setText('rc-h', hh);
    setText('rc-m', mm);
    setText('rc-s', ss);
    setText('rc-cd-target', mode === 'iftar' ? rt('iftarAt', { time: cleanTime(targetStr) }) : rt('suhoorAt', { time: cleanTime(targetStr) }));
    byId('rc-fp-fill').style.width = (pct * 100).toFixed(2) + '%';
    byId('rc-fp-dot').style.insetInlineStart = (pct * 100).toFixed(2) + '%';
    setText('rc-fp-start', startLbl);
    setText('rc-fp-end', endLbl);
    const sinceMagh = now.secs - magh;
    byId('rc-dua').hidden = !(sinceMagh >= 0 && sinceMagh < 1800);

    let nextName = null; let nextIn = 0;
    for (const p of PRAYERS) {
      const s = toSec(T[p]);
      if (s > now.secs) { nextName = p; nextIn = s - now.secs; break; }
    }
    if (!nextName) { nextName = 'Fajr'; nextIn = 86400 - now.secs + tFajr; }
    $$('#rc-prayers .rc-prayer').forEach((li) => {
      const p = li.dataset.p;
      const isNext = p === nextName;
      li.classList.toggle('is-next', isNext);
      li.classList.toggle('is-past', !isNext && nextName !== 'Fajr' && toSec(T[p]) <= now.secs);
      const sub = li.querySelector('.rc-p-sub');
      const txt = isNext ? rt('next', { t: fmtDuration(nextIn) }) : ' ';
      if (sub.textContent !== txt) sub.textContent = txt;
    });
  }

  /* ----- location ------------------------------------------------------ */
  async function reverseGeocode(lat, lon) {
    try {
      const res = await fetch('https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=' + lat + '&longitude=' + lon + '&localityLanguage=' + lang);
      if (!res.ok) return null;
      const j = await res.json();
      return [j.city || j.locality || j.principalSubdivision, j.countryName].filter(Boolean).join(', ') || null;
    } catch (e) { return null; }
  }
  const saveLoc = () => store.set('rc_location', rcLoc);

  function requestGps() {
    return new Promise((resolve) => {
      if (!('geolocation' in navigator)) { rcToast(rt('gpsUnsupported')); resolve(false); return; }
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = Number(pos.coords.latitude.toFixed(4));
        const lon = Number(pos.coords.longitude.toFixed(4));
        rcLoc = { type: 'coords', lat, lon, label: null };
        saveLoc();
        updateLocLabel();
        loadPrayerData();
        reverseGeocode(lat, lon).then((label) => {
          if (label && rcLoc && rcLoc.type === 'coords' && rcLoc.lat === lat && rcLoc.lon === lon) {
            rcLoc.label = label;
            saveLoc();
            updateLocLabel();
          }
        });
        resolve(true);
      }, (err) => {
        rcToast(err && err.code === 1 ? rt('gpsDenied') : rt('gpsError'));
        resolve(false);
      }, { enableHighAccuracy: false, timeout: 12000, maximumAge: 3600000 });
    });
  }

  function renderLocDialog() {
    const dlg = byId('rc-loc-dialog');
    if (!dlg) return;
    dlg.innerHTML = `
      <form id="rc-loc-form" novalidate>
        <h3>${esc(rt('locTitle'))}</h3>
        <button type="button" class="rc-btn rc-btn--gold rc-btn--block" id="rc-gps">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="8"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/></svg>
          <span>${esc(rt('useGps'))}</span>
        </button>
        <div class="rc-or"><span>${esc(rt('or'))}</span></div>
        <div class="rc-field-row">
          <label class="rc-field"><span>${esc(rt('city'))}</span><input type="text" id="rc-city" placeholder="${esc(rt('cityPh'))}" autocomplete="address-level2"></label>
          <label class="rc-field"><span>${esc(rt('country'))}</span><input type="text" id="rc-country" placeholder="${esc(rt('countryPh'))}" autocomplete="country-name"></label>
        </div>
        <label class="rc-field"><span>${esc(rt('method'))}</span>
          <select id="rc-method">${METHODS.map(([v, n]) => `<option value="${v}">${esc(n || rt('methodAuto'))}</option>`).join('')}</select>
        </label>
        <div class="rc-dialog-actions">
          <button type="button" class="rc-btn rc-btn--ghost" id="rc-loc-cancel">${esc(rt('cancel'))}</button>
          <button type="submit" class="rc-btn rc-btn--gold">${esc(rt('save'))}</button>
        </div>
      </form>`;
  }

  function openLocDialog() {
    const dlg = byId('rc-loc-dialog');
    byId('rc-city').value = rcLoc && rcLoc.type === 'city' ? rcLoc.city : '';
    byId('rc-country').value = rcLoc && rcLoc.type === 'city' ? rcLoc.country : '';
    byId('rc-method').value = rcMethod;
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function closeLocDialog() {
    const dlg = byId('rc-loc-dialog');
    if (typeof dlg.close === 'function') dlg.close(); else dlg.removeAttribute('open');
  }

  function initLocation() {
    document.body.insertAdjacentHTML('beforeend',
      '<dialog id="rc-loc-dialog" class="rc rc-sheet"></dialog><div class="rc-toast" id="rc-toast" role="status" aria-live="polite"></div>');
    renderLocDialog();
    const dlg = byId('rc-loc-dialog');

    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-open-loc]')) { e.preventDefault(); openLocDialog(); }
    });
    dlg.addEventListener('click', async (e) => {
      if (e.target === dlg || e.target.closest('#rc-loc-cancel')) { closeLocDialog(); return; }
      if (e.target.closest('#rc-gps')) {
        const m = byId('rc-method').value;
        if (m !== rcMethod) { rcMethod = m; store.set('rc_method', rcMethod); }
        closeLocDialog();
        if (await requestGps()) rcToast(rt('locSaved'));
      }
    });
    dlg.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = byId('rc-city').value.trim();
      const country = byId('rc-country').value.trim();
      const m = byId('rc-method').value;
      if (city || country) {
        if (!city || !country) { rcToast(rt('fillBoth')); return; }
        rcLoc = { type: 'city', city, country, label: city + ', ' + country };
        saveLoc();
      } else if (m === rcMethod) { closeLocDialog(); return; }
      rcMethod = m;
      store.set('rc_method', rcMethod);
      closeLocDialog();
      pd = null;
      ramadanStart = store.get('rc_ramadanStart', null);
      ['rc-h', 'rc-m', 'rc-s'].forEach((id) => setText(id, '--'));
      setText('rc-mini-time', '--:--:--');
      updateLocLabel();
      renderPrayerList();
      loadPrayerData().then(() => { if (pd) rcToast(rt('locSaved')); });
    });

    if (rcLoc) {
      loadPrayerData();
    } else {
      rcLoc = Object.assign({}, RC.defaultLocation);
      loadPrayerData();
      requestGps().then((ok) => { if (!ok) rcToast(rt('chooseCity')); });
    }
  }

  // Small countdown banner shown at the top of the home page
  function rcMiniHtml() {
    return `
      <a href="#/prayer" class="rc-mini" id="rc-mini" data-mode="iftar">
        <span class="rc-mini__moon" aria-hidden="true">🌙</span>
        <span class="rc-mini__label" id="rc-mini-label">${esc(rt('loading'))}</span>
        <b class="rc-mini__time" id="rc-mini-time" dir="ltr">--:--:--</b>
        <span class="rc-mini__loc"><span id="rc-mini-loc"></span></span>
        <span class="rc-mini__badge" id="rc-mini-badge" hidden></span>
        <span class="rc-mini__go">${esc(rt('seeTimes'))} →</span>
      </a>`;
  }

  pages.prayer = function () {
    return {
      title: rt('prayerTitle'),
      html: `
        <div class="rc">
          ${rcHead('prayerEyebrow', 'prayerTitle', 'prayerSub')}
          <section class="rc-hero" id="rc-hero" data-mode="iftar">
            <div class="rc-hero-top">
              <button type="button" class="rc-chip" data-open-loc>${PIN_SVG}<span id="rc-loc-label"></span><span aria-hidden="true">▾</span></button>
              <span class="rc-chip rc-chip--gold" id="rc-hijri">—</span>
            </div>
            <p class="rc-greg" id="rc-greg">&nbsp;</p>
            <p class="rc-badge" id="rc-badge" hidden></p>
            <div class="rc-moon" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <radialGradient id="rcMoonGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#f7e3a1"/><stop offset="100%" stop-color="#D4AF37"/></radialGradient>
                  <mask id="rcMoonMask"><rect width="120" height="120" fill="#fff"/><circle cx="76" cy="48" r="38" fill="#000"/></mask>
                </defs>
                <circle cx="58" cy="60" r="42" fill="url(#rcMoonGlow)" mask="url(#rcMoonMask)"/>
                <path d="M92 26l2.4 5.6 6 .6-4.6 4 1.4 6-5.2-3.2-5.2 3.2 1.4-6-4.6-4 6-.6z" fill="#f7e3a1"/>
              </svg>
            </div>
            <p class="rc-cd-label" id="rc-cd-label">${esc(rt('loading'))}</p>
            <div class="rc-countdown" dir="ltr" role="timer">
              <div class="rc-unit"><span class="rc-num" id="rc-h">--</span><span class="rc-cap">${esc(rt('hoursShort'))}</span></div>
              <span class="rc-sep" aria-hidden="true">:</span>
              <div class="rc-unit"><span class="rc-num" id="rc-m">--</span><span class="rc-cap">${esc(rt('minutesShort'))}</span></div>
              <span class="rc-sep" aria-hidden="true">:</span>
              <div class="rc-unit"><span class="rc-num" id="rc-s">--</span><span class="rc-cap">${esc(rt('secondsShort'))}</span></div>
            </div>
            <p class="rc-target" id="rc-cd-target">&nbsp;</p>
            <div class="rc-fp" aria-hidden="true">
              <div class="rc-fp-track"><div class="rc-fp-fill" id="rc-fp-fill"></div><div class="rc-fp-dot" id="rc-fp-dot"></div></div>
              <div class="rc-fp-labels"><span id="rc-fp-start"></span><span id="rc-fp-end"></span></div>
            </div>
            <div class="rc-dua" id="rc-dua" hidden>
              <strong>${esc(rt('iftarNow'))}</strong>
              <span lang="ar" dir="rtl">ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ</span>
            </div>
            <p class="rc-status" id="rc-status" role="status"></p>
          </section>
          <section class="rc-panel">
            <div class="rc-panel-head"><h2>${esc(rt('prayerTimes'))}</h2><span class="rc-muted" id="rc-extra"></span></div>
            <ul class="rc-prayers" id="rc-prayers"></ul>
          </section>
        </div>`,
      mount() {
        updateLocLabel();
        renderPrayerHeader();
        renderPrayerList();
        renderRamadanBadge();
        setStatus(rcStatus.msg, rcStatus.error, rcStatus.retry);
        rcTick();
      }
    };
  };

  /* ----- greeting card (canvas) ----------------------------------------- */
  const CARD_THEMES = {
    emerald:  { bg: ['#03271f', '#0b5c48', '#021511'], soft: '#0a4a3b', accent: '#D4AF37', accent2: '#f7e3a1', text: '#fbf6e6', sub: '#d6e8df', pattern: 'rgba(212,175,55,0.13)', deco: 'crescent' },
    midnight: { bg: ['#070b24', '#1d2d72', '#03051a'], soft: '#141f55', accent: '#e9d8a6', accent2: '#ffffff', text: '#f3f1ff', sub: '#c9cfee', pattern: 'rgba(233,216,166,0.10)', deco: 'stars' },
    lantern:  { bg: ['#2a0815', '#741a33', '#16030a'], soft: '#4f1024', accent: '#e8b94a', accent2: '#ffdf99', text: '#fff3e0', sub: '#f3d5c6', pattern: 'rgba(232,185,74,0.12)', deco: 'lanterns' },
    desert:   { bg: ['#2d1846', '#8a3a6a', '#f0954a'], soft: '#5a2552', accent: '#ffd98a', accent2: '#fff1cf', text: '#fffaf0', sub: '#ffe6d8', pattern: 'rgba(255,236,200,0.10)', deco: 'dunes' }
  };
  const BLESSINGS = {
    fr: [
      'Que ce mois béni remplisse ton cœur de paix, ta maison de lumière et tes jours de bénédictions.',
      'Qu’Allah accepte ton jeûne, tes prières et toutes tes bonnes actions. Ramadan Moubarak !',
      'Je te souhaite un Ramadan rempli de miséricorde, de pardon et de la douceur de la foi.',
      'Que le croissant de Ramadan t’apporte espoir, santé et bonheur, à toi et à tous tes proches.',
      'Taqabbal Allahu minna wa minkum — qu’Allah accepte de nous et de vous.'
    ],
    en: [
      'May this blessed month fill your heart with peace, your home with light and your days with endless blessings.',
      'May Allah accept your fasting, your prayers and all your good deeds. Ramadan Mubarak!',
      'Wishing you a Ramadan full of mercy, forgiveness and the sweetness of faith.',
      'May the crescent of Ramadan bring hope, health and happiness to you and all your loved ones.',
      'Taqabbal Allahu minna wa minkum — may Allah accept from us and from you.'
    ],
    ar: [
      'أسأل الله أن يملأ قلبك سلامًا وبيتك نورًا وأيامك بركةً في هذا الشهر الفضيل.',
      'تقبّل الله صيامكم وقيامكم وصالح أعمالكم. رمضان مبارك!',
      'أتمنى لك رمضانًا مليئًا بالرحمة والمغفرة وحلاوة الإيمان.',
      'أهلّه الله عليك باليُمن والإيمان، والسلامة والإسلام، وبلّغك فيه ما تحب.',
      'تقبّل الله منا ومنكم، وكل عام وأنتم بخير.'
    ]
  };

  const card = Object.assign({ name: '', from: '', theme: 'emerald', msg: 0, custom: '', format: 'post' }, store.get('rc_card', {}));
  if (!CARD_THEMES[card.theme]) card.theme = 'emerald';
  let cardRenderQueued = false;
  let fontsReady = Promise.resolve();

  function loadCardFonts() {
    if (!document.fonts || !document.fonts.load) return;
    const specs = [
      ['700 150px Amiri', 'رمضان كريم Aa'], ['400 44px Amiri', 'رمضان Aa'], ['italic 400 44px Amiri', 'Aa'],
      ['700 46px Cairo', 'رمضان Aa'], ['500 42px Cairo', 'رمضان Aa'], ['600 26px Cairo', 'Aa']
    ];
    fontsReady = Promise.race([
      Promise.all(specs.map(([f, s]) => document.fonts.load(f, s).catch(() => null))),
      new Promise((r) => setTimeout(r, 3500))
    ]).then(() => undefined);
    document.fonts.ready.then(() => scheduleCardRender());
  }

  function hexA(hex, a) {
    const n = parseInt(hex.slice(1), 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  function mulberry32(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
      return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
    };
  }
  function starPath(ctx, cx, cy, r, inner, points, rot) {
    ctx.beginPath();
    for (let i = 0; i < points * 2; i++) {
      const ang = (rot || -Math.PI / 2) + (i * Math.PI) / points;
      const rad = i % 2 === 0 ? r : r * inner;
      const x = cx + Math.cos(ang) * rad;
      const y = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
  }
  function drawPattern(ctx, W, H, th) {
    const s = 135;
    ctx.save();
    ctx.strokeStyle = th.pattern;
    ctx.lineWidth = 2;
    for (let y = -s / 2; y < H + s; y += s) {
      for (let x = -s / 2; x < W + s; x += s) {
        starPath(ctx, x, y, 42, 0.7654, 8, -Math.PI / 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.stroke();
        starPath(ctx, x + s / 2, y + s / 2, 16, 0.5, 4, 0); ctx.stroke();
      }
    }
    ctx.restore();
  }
  function drawCrescent(ctx, x, y, r, color, glow, withStar) {
    const size = Math.ceil(r * 2 + 8);
    const off = document.createElement('canvas');
    off.width = off.height = size;
    const o = off.getContext('2d');
    const c = size / 2;
    const grad = o.createRadialGradient(c - r * 0.3, c - r * 0.3, r * 0.1, c, c, r);
    grad.addColorStop(0, '#fff8dc');
    grad.addColorStop(1, color);
    o.fillStyle = grad;
    o.beginPath(); o.arc(c, c, r, 0, Math.PI * 2); o.fill();
    o.globalCompositeOperation = 'destination-out';
    o.beginPath(); o.arc(c + r * 0.42, c - r * 0.2, r * 0.86, 0, Math.PI * 2); o.fill();
    ctx.save();
    ctx.shadowColor = glow;
    ctx.shadowBlur = r * 0.6;
    ctx.drawImage(off, x - c, y - c);
    ctx.drawImage(off, x - c, y - c);
    if (withStar) {
      ctx.fillStyle = color;
      starPath(ctx, x + r * 0.62, y - r * 0.1, r * 0.2, 0.42, 5, -Math.PI / 2);
      ctx.fill();
    }
    ctx.restore();
  }
  function drawLantern(ctx, x, y, s, th) {
    ctx.save();
    ctx.strokeStyle = th.accent; ctx.fillStyle = th.accent; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, y - s * 0.42); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y - s * 0.36, s * 0.07, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.26, y);
    ctx.quadraticCurveTo(x - s * 0.2, y - s * 0.22, x, y - s * 0.3);
    ctx.quadraticCurveTo(x + s * 0.2, y - s * 0.22, x + s * 0.26, y);
    ctx.closePath(); ctx.fill();
    const bodyTop = y + s * 0.04;
    const bodyBot = y + s * 0.86;
    ctx.save();
    ctx.shadowColor = '#ffc75a'; ctx.shadowBlur = s * 0.55;
    const g = ctx.createRadialGradient(x, (bodyTop + bodyBot) / 2, s * 0.05, x, (bodyTop + bodyBot) / 2, s * 0.5);
    g.addColorStop(0, '#fff3c4'); g.addColorStop(0.5, '#ffc95c'); g.addColorStop(1, '#c46a12');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(x - s * 0.24, bodyTop); ctx.lineTo(x + s * 0.24, bodyTop); ctx.lineTo(x + s * 0.32, y + s * 0.4);
    ctx.lineTo(x + s * 0.2, bodyBot); ctx.lineTo(x - s * 0.2, bodyBot); ctx.lineTo(x - s * 0.32, y + s * 0.4);
    ctx.closePath(); ctx.fill();
    ctx.restore();
    ctx.lineWidth = 3; ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, bodyTop); ctx.lineTo(x, bodyBot);
    ctx.moveTo(x - s * 0.32, y + s * 0.4); ctx.lineTo(x + s * 0.32, y + s * 0.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.24, bodyBot); ctx.lineTo(x + s * 0.24, bodyBot);
    ctx.lineTo(x + s * 0.14, bodyBot + s * 0.1); ctx.lineTo(x - s * 0.14, bodyBot + s * 0.1);
    ctx.closePath(); ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - s * 0.05, bodyBot + s * 0.1); ctx.lineTo(x, bodyBot + s * 0.22); ctx.lineTo(x + s * 0.05, bodyBot + s * 0.1);
    ctx.fill();
    ctx.restore();
  }
  function drawHangingStar(ctx, x, len, r, th) {
    ctx.save();
    ctx.strokeStyle = th.accent; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, len - r); ctx.stroke();
    ctx.shadowColor = th.accent; ctx.shadowBlur = 20; ctx.fillStyle = th.accent;
    starPath(ctx, x, len, r, 0.7654, 8, -Math.PI / 2); ctx.fill();
    ctx.restore();
  }
  function drawStarField(ctx, W, H, maxY, th, count, seed) {
    const rnd = mulberry32(seed);
    ctx.save();
    for (let i = 0; i < count; i++) {
      const x = rnd() * W; const y = rnd() * maxY; const r = 1 + rnd() * 2.6;
      ctx.globalAlpha = 0.35 + rnd() * 0.6;
      ctx.fillStyle = th.accent2;
      if (r > 3) { starPath(ctx, x, y, r * 2.2, 0.35, 4, 0); ctx.fill(); }
      else { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
    }
    ctx.restore();
  }
  function drawDunes(ctx, W, H) {
    ctx.save();
    const sunY = H - 250;
    const sg = ctx.createRadialGradient(W * 0.5, sunY, 10, W * 0.5, sunY, 330);
    sg.addColorStop(0, 'rgba(255,226,150,0.95)'); sg.addColorStop(0.35, 'rgba(255,190,110,0.5)'); sg.addColorStop(1, 'rgba(255,160,90,0)');
    ctx.fillStyle = sg; ctx.fillRect(0, sunY - 330, W, 660);
    ctx.fillStyle = '#ffe1a0'; ctx.beginPath(); ctx.arc(W * 0.5, sunY, 120, 0, Math.PI * 2); ctx.fill();
    [{ c: '#7a2f4f', y: H - 260, a: 90 }, { c: '#4a1d3c', y: H - 190, a: 70 }, { c: '#24101f', y: H - 120, a: 50 }].forEach((L2, i) => {
      ctx.fillStyle = L2.c;
      ctx.beginPath();
      ctx.moveTo(0, H);
      ctx.lineTo(0, L2.y + (i % 2 ? -L2.a * 0.4 : L2.a * 0.3));
      ctx.bezierCurveTo(W * 0.25, L2.y - L2.a, W * 0.45, L2.y + L2.a, W * (i % 2 ? 0.7 : 0.62), L2.y - L2.a * 0.2);
      ctx.bezierCurveTo(W * 0.82, L2.y - L2.a * 0.9, W * 0.92, L2.y, W, L2.y - L2.a * 0.3);
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    });
    ctx.restore();
  }
  function drawFrame(ctx, W, H, th) {
    ctx.save();
    ctx.strokeStyle = hexA(th.accent, 0.9); ctx.lineWidth = 3; ctx.strokeRect(36, 36, W - 72, H - 72);
    ctx.strokeStyle = hexA(th.accent, 0.45); ctx.lineWidth = 1.5; ctx.strokeRect(52, 52, W - 104, H - 104);
    ctx.fillStyle = th.accent;
    [[36, 36], [W - 36, 36], [36, H - 36], [W - 36, H - 36]].forEach(([x, y]) => {
      starPath(ctx, x, y, 22, 0.7654, 8, -Math.PI / 2); ctx.fill();
      ctx.save(); ctx.fillStyle = th.bg[0]; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    });
    ctx.restore();
  }
  function drawDivider(ctx, cx, y, w, th) {
    ctx.save();
    const g = ctx.createLinearGradient(cx - w / 2, 0, cx + w / 2, 0);
    g.addColorStop(0, hexA(th.accent, 0)); g.addColorStop(0.5, th.accent); g.addColorStop(1, hexA(th.accent, 0));
    ctx.strokeStyle = g; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(cx - w / 2, y); ctx.lineTo(cx - 26, y); ctx.moveTo(cx + 26, y); ctx.lineTo(cx + w / 2, y); ctx.stroke();
    ctx.fillStyle = th.accent;
    starPath(ctx, cx, y, 15, 0.7654, 8, -Math.PI / 2); ctx.fill();
    ctx.restore();
  }
  function wrapLines(ctx, text, maxW) {
    const words = text.split(/\s+/).filter(Boolean);
    const lines = [];
    let line = '';
    words.forEach((w) => {
      const test = line ? line + ' ' + w : w;
      if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = w; } else { line = test; }
    });
    if (line) lines.push(line);
    return lines;
  }
  const setLetterSpacing = (ctx, v) => { if ('letterSpacing' in ctx) ctx.letterSpacing = v; };
  function currentMessage() {
    if (card.msg === 'custom') return card.custom.trim() || BLESSINGS[lang][0];
    const list = BLESSINGS[lang];
    return list[Math.min(Number(card.msg) || 0, list.length - 1)];
  }

  function drawCard() {
    const cv = byId('rc-canvas');
    if (!cv) return;
    const W = 1080;
    const H = card.format === 'story' ? 1920 : 1350;
    if (cv.width !== W) cv.width = W;
    if (cv.height !== H) cv.height = H;
    const preview = $('.rc-card-preview');
    if (preview) preview.classList.toggle('is-story', card.format === 'story');
    const ctx = cv.getContext('2d');
    const th = CARD_THEMES[card.theme];
    const story = H > 1500;
    const isAr = lang === 'ar';

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, W, H);
    let bg;
    if (card.theme === 'desert') {
      bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, th.bg[0]); bg.addColorStop(0.55, th.bg[1]); bg.addColorStop(1, th.bg[2]);
    } else {
      bg = ctx.createRadialGradient(W / 2, H * 0.3, 40, W / 2, H * 0.45, H * 0.85);
      bg.addColorStop(0, th.bg[1]); bg.addColorStop(0.55, th.bg[0]); bg.addColorStop(1, th.bg[2]);
    }
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    drawPattern(ctx, W, H, th);
    const haloY = story ? H * 0.52 : H * 0.58;
    const halo = ctx.createRadialGradient(W / 2, haloY, 0, W / 2, haloY, W * 0.62);
    halo.addColorStop(0, hexA(th.soft, 0.85)); halo.addColorStop(1, hexA(th.soft, 0));
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, W, H);

    const off = story ? 220 : 0;
    if (th.deco === 'crescent') {
      drawHangingStar(ctx, W * 0.2, 170 + off * 0.6, 22, th);
      drawHangingStar(ctx, W * 0.8, 230 + off * 0.6, 18, th);
      drawCrescent(ctx, W / 2, 255 + off, 118, th.accent, hexA(th.accent, 0.8), true);
    } else if (th.deco === 'stars') {
      drawStarField(ctx, W, H, story ? H * 0.42 : H * 0.36, th, story ? 110 : 80, 7);
      drawCrescent(ctx, W / 2 + 40, 250 + off, 130, th.accent, 'rgba(220,230,255,0.9)', true);
    } else if (th.deco === 'lanterns') {
      drawLantern(ctx, W * 0.22, 230 + off * 0.7, 120, th);
      drawLantern(ctx, W * 0.5, 150 + off, 160, th);
      drawLantern(ctx, W * 0.78, 270 + off * 0.7, 105, th);
    } else {
      drawStarField(ctx, W, H, H * 0.3, th, 50, 3);
      drawDunes(ctx, W, H);
      drawCrescent(ctx, W / 2, 245 + off, 105, th.accent, hexA(th.accent, 0.8), true);
    }
    drawFrame(ctx, W, H, th);

    ctx.textAlign = 'center';
    ctx.textBaseline = 'alphabetic';
    let y = story ? 780 : 540;
    ctx.save();
    ctx.direction = 'rtl';
    ctx.font = '700 150px Amiri, serif';
    const hg = ctx.createLinearGradient(0, y - 130, 0, y + 20);
    hg.addColorStop(0, th.accent2); hg.addColorStop(0.6, th.accent); hg.addColorStop(1, hexA(th.accent, 0.85));
    ctx.fillStyle = hg;
    ctx.shadowColor = hexA(th.accent, 0.55);
    ctx.shadowBlur = 40;
    ctx.fillText('رمضان كريم', W / 2, y);
    ctx.restore();

    const info = hijriInfo();
    y += 108;
    ctx.save();
    ctx.direction = isAr ? 'rtl' : 'ltr';
    ctx.fillStyle = th.accent2;
    if (isAr) {
      ctx.font = '700 46px Cairo, sans-serif';
      ctx.fillText(rt('cardHeadline') + (info ? ' · ' + info.ramadanYear + ' هـ' : ''), W / 2, y);
    } else {
      ctx.font = '700 38px Cairo, sans-serif';
      setLetterSpacing(ctx, '7px');
      ctx.fillText((rt('cardHeadline') + (info ? ' ' + info.ramadanYear : '')).toUpperCase(), W / 2, y);
      setLetterSpacing(ctx, '0px');
    }
    ctx.restore();

    y += 52;
    drawDivider(ctx, W / 2, y, 520, th);

    ctx.direction = isAr ? 'rtl' : 'ltr';
    const name = card.name.trim();
    if (name) {
      y += 100;
      ctx.save();
      ctx.font = '700 66px Amiri, serif';
      ctx.fillStyle = th.text;
      ctx.shadowColor = 'rgba(0,0,0,0.35)';
      ctx.shadowBlur = 12;
      let label = rt('cardTo', { name });
      while (ctx.measureText(label).width > W - 220 && label.length > 4) label = label.slice(0, -2) + '…';
      ctx.fillText(label, W / 2, y);
      ctx.restore();
      y += 40;
    } else {
      y += 30;
    }

    const msg = currentMessage();
    const maxLines = story ? 8 : 5;
    let size = isAr ? 48 : 42;
    let lines;
    const msgFont = (sz) => (isAr ? '500 ' + sz + 'px Amiri, serif' : '500 ' + sz + 'px Cairo, sans-serif');
    do {
      ctx.font = msgFont(size);
      lines = wrapLines(ctx, msg, W - 260);
      if (lines.length <= maxLines) break;
      size -= 2;
    } while (size > 26);
    if (lines.length > maxLines) {
      lines = lines.slice(0, maxLines);
      lines[maxLines - 1] = lines[maxLines - 1].replace(/\s*\S*$/, '') + '…';
    }
    const lh = Math.round(size * (isAr ? 1.75 : 1.5));
    ctx.save();
    ctx.fillStyle = th.sub;
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 10;
    y += lh;
    lines.forEach((ln, i) => ctx.fillText(ln, W / 2, y + i * lh));
    y += (lines.length - 1) * lh;
    ctx.restore();

    const from = card.from.trim();
    if (from) {
      y += Math.round(lh * 1.3);
      ctx.save();
      ctx.font = 'italic 400 44px Amiri, serif';
      ctx.fillStyle = th.accent2;
      ctx.fillText(rt('cardFrom', { name: from }), W / 2, y);
      ctx.restore();
    }

    ctx.save();
    ctx.direction = 'ltr';
    ctx.font = '600 26px Cairo, sans-serif';
    setLetterSpacing(ctx, '2px');
    ctx.fillStyle = hexA(card.theme === 'desert' ? '#ffe6c8' : th.accent2, 0.78);
    ctx.fillText('✦  ' + SITE_LABEL + '  ✦', W / 2, H - 82);
    setLetterSpacing(ctx, '0px');
    ctx.restore();
    ctx.restore();
  }

  function scheduleCardRender() {
    if (cardRenderQueued || !byId('rc-canvas')) return;
    cardRenderQueued = true;
    fontsReady.then(() => requestAnimationFrame(() => { cardRenderQueued = false; drawCard(); }));
  }
  const saveCard = () => store.set('rc_card', card);

  function cardBlob() {
    return new Promise((resolve, reject) => {
      drawCard();
      byId('rc-canvas').toBlob((b) => (b ? resolve(b) : reject(new Error('toBlob failed'))), 'image/png');
    });
  }
  function cardFileName() {
    const slug = (card.name.trim() || 'ramadan').normalize('NFKD').replace(/[^\w-]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase() || 'ramadan';
    return 'ramadan-card-' + slug + '.png';
  }
  function downloadBlob(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = cardFileName();
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }
  const shareMessage = () => rt('shareText') + (SHARE_URL ? ' ' + SHARE_URL + '#/card' : '');

  async function shareCard() {
    const btn = byId('rc-share');
    btn.disabled = true;
    try {
      await fontsReady;
      const blob = await cardBlob();
      const file = new File([blob], cardFileName(), { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file], title: rt('cardHeadline'), text: shareMessage() });
          return;
        } catch (err) { if (err && err.name === 'AbortError') return; }
      }
      downloadBlob(blob);
      rcToast(rt('downloaded'));
    } catch (e) {
      rcToast(rt('shareFail'));
    } finally {
      btn.disabled = false;
    }
  }

  pages.card = function () {
    const themes = [['emerald', 'themeEmerald'], ['midnight', 'themeMidnight'], ['lantern', 'themeLantern'], ['desert', 'themeDesert']];
    const list = BLESSINGS[lang];
    return {
      title: rt('cardTitle'),
      html: `
        <div class="rc">
          ${rcHead('cardEyebrow', 'cardTitle', 'cardSub')}
          <div class="rc-card-maker">
            <div class="rc-card-preview"><canvas id="rc-canvas" width="1080" height="1350" aria-label="${esc(rt('cardTitle'))}"></canvas></div>
            <form class="rc-panel rc-card-controls" id="rc-card-form" autocomplete="off">
              <label class="rc-field"><span>${esc(rt('recipient'))}</span>
                <input type="text" id="rc-name" maxlength="32" placeholder="${esc(rt('recipientPh'))}" value="${esc(card.name)}"></label>
              <label class="rc-field"><span>${esc(rt('sender'))}</span>
                <input type="text" id="rc-from" maxlength="32" placeholder="${esc(rt('senderPh'))}" value="${esc(card.from)}"></label>
              <fieldset class="rc-field"><legend>${esc(rt('theme'))}</legend>
                <div class="rc-theme-grid">
                  ${themes.map(([k, label]) => `<button type="button" class="rc-theme" data-theme="${k}" aria-pressed="${card.theme === k}"><span class="rc-sw rc-sw--${k}"></span><span>${esc(rt(label))}</span></button>`).join('')}
                </div>
              </fieldset>
              <label class="rc-field"><span>${esc(rt('message'))}</span>
                <select id="rc-msg">
                  ${list.map((m, i) => `<option value="${i}">${esc(m.length > 70 ? m.slice(0, 68) + '…' : m)}</option>`).join('')}
                  <option value="custom">${esc(rt('customOption'))}</option>
                </select></label>
              <label class="rc-field" id="rc-custom-wrap" ${card.msg === 'custom' ? '' : 'hidden'}><span>${esc(rt('customMessage'))}</span>
                <textarea id="rc-custom" maxlength="220" rows="3" placeholder="${esc(rt('customPh'))}">${esc(card.custom)}</textarea></label>
              <fieldset class="rc-field"><legend>${esc(rt('format'))}</legend>
                <div class="rc-seg" id="rc-format">
                  <button type="button" data-format="post" aria-pressed="${card.format === 'post'}">${esc(rt('formatPost'))}</button>
                  <button type="button" data-format="story" aria-pressed="${card.format === 'story'}">${esc(rt('formatStory'))}</button>
                </div>
              </fieldset>
              <div class="rc-card-actions">
                <button type="button" class="rc-btn rc-btn--gold" id="rc-share">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>
                  <span>${esc(rt('share'))}</span>
                </button>
                <div class="rc-row2">
                  <button type="button" class="rc-btn rc-btn--ghost" id="rc-download">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11M7 10l5 5 5-5M5 20h14"/></svg><span>${esc(rt('download'))}</span>
                  </button>
                  <button type="button" class="rc-btn rc-btn--wa" id="rc-wa">
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.3-4A8 8 0 1 1 8.4 19z"/></svg><span>${esc(rt('whatsapp'))}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>`,
      mount() {
        const msgSel = byId('rc-msg');
        msgSel.value = String(card.msg);
        if (msgSel.selectedIndex < 0) { card.msg = 0; msgSel.value = '0'; }
        byId('rc-name').addEventListener('input', (e) => { card.name = e.target.value; saveCard(); scheduleCardRender(); });
        byId('rc-from').addEventListener('input', (e) => { card.from = e.target.value; saveCard(); scheduleCardRender(); });
        byId('rc-custom').addEventListener('input', (e) => { card.custom = e.target.value; saveCard(); scheduleCardRender(); });
        msgSel.addEventListener('change', () => {
          card.msg = msgSel.value === 'custom' ? 'custom' : Number(msgSel.value);
          byId('rc-custom-wrap').hidden = card.msg !== 'custom';
          if (card.msg === 'custom') byId('rc-custom').focus();
          saveCard();
          scheduleCardRender();
        });
        $$('.rc-theme').forEach((b) => b.addEventListener('click', () => {
          card.theme = b.dataset.theme;
          $$('.rc-theme').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          saveCard();
          scheduleCardRender();
        }));
        $$('#rc-format button').forEach((b) => b.addEventListener('click', () => {
          card.format = b.dataset.format;
          $$('#rc-format button').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          saveCard();
          scheduleCardRender();
        }));
        byId('rc-card-form').addEventListener('submit', (e) => e.preventDefault());
        byId('rc-share').addEventListener('click', shareCard);
        byId('rc-download').addEventListener('click', async () => {
          try { await fontsReady; downloadBlob(await cardBlob()); rcToast(rt('downloaded')); }
          catch (e) { rcToast(rt('shareFail')); }
        });
        byId('rc-wa').addEventListener('click', () => {
          window.open('https://wa.me/?text=' + encodeURIComponent(shareMessage()), '_blank', 'noopener');
        });
        scheduleCardRender();
      }
    };
  };

  /* ----- tasbih ------------------------------------------------------- */
  const DHIKR = [
    { id: 'subhanallah', ar: 'سُبْحَانَ اللَّهِ', tr: 'SubhanAllah', mean: { fr: 'Gloire à Allah', en: 'Glory be to Allah', ar: 'التسبيح' } },
    { id: 'alhamdulillah', ar: 'الْحَمْدُ لِلَّهِ', tr: 'Alhamdulillah', mean: { fr: 'Louange à Allah', en: 'All praise is due to Allah', ar: 'التحميد' } },
    { id: 'allahuakbar', ar: 'اللَّهُ أَكْبَرُ', tr: 'Allahu Akbar', mean: { fr: 'Allah est le Plus Grand', en: 'Allah is the Greatest', ar: 'التكبير' } },
    { id: 'astaghfirullah', ar: 'أَسْتَغْفِرُ اللَّهَ', tr: 'Astaghfirullah', mean: { fr: 'Je demande pardon à Allah', en: 'I seek forgiveness from Allah', ar: 'الاستغفار' } }
  ];
  const RING_C = 2 * Math.PI * 120;
  const tasbih = Object.assign({ dhikr: 'subhanallah', target: 33, counts: {}, today: { date: '', n: 0 }, muted: false }, store.get('rc_tasbih', {}));
  if (!DHIKR.some((d) => d.id === tasbih.dhikr)) tasbih.dhikr = 'subhanallah';
  if ([33, 99, 100].indexOf(tasbih.target) === -1) tasbih.target = 33;

  let audioCtx = null;
  function getAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }
  function playClick() {
    if (tasbih.muted) return;
    const a = getAudio();
    if (!a) return;
    const now = a.currentTime;
    [[1350, 520, 'sine', 0.22, 0.09], [190, 190, 'triangle', 0.18, 0.07]].forEach(([f1, f2, type, vol, dur]) => {
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = type;
      o.frequency.setValueAtTime(f1, now);
      if (f2 !== f1) o.frequency.exponentialRampToValueAtTime(f2, now + 0.06);
      g.gain.setValueAtTime(0.0001, now);
      g.gain.exponentialRampToValueAtTime(vol, now + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
      o.connect(g).connect(a.destination);
      o.start(now);
      o.stop(now + dur + 0.01);
    });
  }
  function playChime() {
    if (tasbih.muted) return;
    const a = getAudio();
    if (!a) return;
    const start = a.currentTime + 0.02;
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
      const o = a.createOscillator();
      const g = a.createGain();
      const tt = start + i * 0.1;
      o.type = 'triangle';
      o.frequency.setValueAtTime(f, tt);
      g.gain.setValueAtTime(0.0001, tt);
      g.gain.exponentialRampToValueAtTime(0.16, tt + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, tt + 1.3);
      o.connect(g).connect(a.destination);
      o.start(tt);
      o.stop(tt + 1.4);
    });
  }
  const vibrate = (p) => { if (navigator.vibrate) { try { navigator.vibrate(p); } catch (e) { /* unsupported */ } } };
  function dhikrState() {
    if (!tasbih.counts[tasbih.dhikr]) tasbih.counts[tasbih.dhikr] = { c: 0, r: 0 };
    return tasbih.counts[tasbih.dhikr];
  }
  function ensureTasbihDay() {
    const d = localIso(new Date());
    if (tasbih.today.date !== d) tasbih.today = { date: d, n: 0 };
  }
  const saveTasbih = () => store.set('rc_tasbih', tasbih);

  function renderTasbih() {
    if (!byId('rc-count')) return;
    ensureTasbihDay();
    const d = DHIKR.find((x) => x.id === tasbih.dhikr);
    const st = dhikrState();
    $$('.rc-dhikr-chip').forEach((c) => c.setAttribute('aria-pressed', String(c.dataset.id === tasbih.dhikr)));
    setText('rc-dhikr-ar', d.ar);
    setText('rc-dhikr-tr', lang === 'ar' ? d.mean.ar : d.tr + ' · ' + d.mean[lang]);
    setText('rc-count', String(st.c));
    setText('rc-target-txt', '/ ' + tasbih.target);
    setText('rc-rounds', String(st.r));
    setText('rc-total', String(tasbih.today.n));
    byId('rc-ring-fg').style.strokeDashoffset = String(RING_C * (1 - Math.min(st.c / tasbih.target, 1)));
    byId('rc-tasbih-btn').classList.toggle('is-complete', st.c >= tasbih.target);
    $$('#rc-target button').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.target) === tasbih.target)));
    const mute = byId('rc-mute');
    mute.setAttribute('aria-pressed', String(tasbih.muted));
    mute.setAttribute('aria-label', tasbih.muted ? rt('unmute') : rt('mute'));
  }

  function tasbihTap(e) {
    ensureTasbihDay();
    const st = dhikrState();
    if (st.c >= tasbih.target) st.c = 0;
    st.c += 1;
    tasbih.today.n += 1;
    if (st.c === tasbih.target) {
      st.r += 1;
      playChime();
      vibrate([70, 50, 70, 50, 140]);
      rcToast(rt('targetReached'));
    } else {
      playClick();
      vibrate(14);
    }
    saveTasbih();
    renderTasbih();
    const host = byId('rc-ripples');
    const rect = host.getBoundingClientRect();
    const r = document.createElement('span');
    r.className = 'rc-ripple';
    r.style.left = (e && e.clientX ? e.clientX - rect.left : rect.width / 2) + 'px';
    r.style.top = (e && e.clientY ? e.clientY - rect.top : rect.height / 2) + 'px';
    r.addEventListener('animationend', () => r.remove());
    host.appendChild(r);
    const cnt = byId('rc-count');
    cnt.classList.remove('bump');
    void cnt.offsetWidth;
    cnt.classList.add('bump');
    const btn = byId('rc-tasbih-btn');
    btn.classList.add('is-pressed');
    setTimeout(() => btn.classList.remove('is-pressed'), 90);
  }

  pages.tasbih = function () {
    return {
      title: rt('tasbihTitle'),
      html: `
        <div class="rc rc-narrow">
          ${rcHead('tasbihEyebrow', 'tasbihTitle', 'tasbihSub')}
          <div class="rc-panel rc-stack">
            <div class="rc-dhikr-chips">
              ${DHIKR.map((d) => `<button type="button" class="rc-dhikr-chip" data-id="${d.id}" aria-pressed="false"><span class="ar" lang="ar">${d.ar}</span><span class="tr">${d.tr}</span></button>`).join('')}
            </div>
            <div><p class="rc-dhikr-ar" id="rc-dhikr-ar" lang="ar" dir="rtl"></p><p class="rc-dhikr-tr" id="rc-dhikr-tr"></p></div>
            <div class="rc-tasbih-wrap">
              <button type="button" class="rc-tasbih-btn" id="rc-tasbih-btn" aria-label="+1">
                <svg class="rc-ring" viewBox="0 0 260 260" aria-hidden="true">
                  <defs><linearGradient id="rcRingGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f7e3a1"/><stop offset="100%" stop-color="#b8901f"/></linearGradient></defs>
                  <circle class="bg" cx="130" cy="130" r="120"/>
                  <circle class="fg" id="rc-ring-fg" cx="130" cy="130" r="120"/>
                </svg>
                <span class="rc-tasbih-inner">
                  <span class="rc-count" id="rc-count">0</span>
                  <span class="rc-target-txt" id="rc-target-txt">/ 33</span>
                  <span class="rc-hint">${esc(rt('tapHint'))}</span>
                </span>
                <span class="rc-ripples" id="rc-ripples" aria-hidden="true"></span>
              </button>
            </div>
            <div class="rc-meta">
              <div><b id="rc-rounds">0</b><small>${esc(rt('rounds'))}</small></div>
              <div><b id="rc-total">0</b><small>${esc(rt('totalToday'))}</small></div>
            </div>
            <div class="rc-controls">
              <div class="rc-seg" id="rc-target" role="group" aria-label="${esc(rt('target'))}">
                ${[33, 99, 100].map((n) => `<button type="button" data-target="${n}" aria-pressed="false">${n}</button>`).join('')}
              </div>
              <button type="button" class="rc-icon-btn" id="rc-mute" aria-pressed="false" aria-label="${esc(rt('mute'))}">
                <svg class="ic-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>
                <svg class="ic-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M17 9l5 6M22 9l-5 6"/></svg>
              </button>
              <button type="button" class="rc-icon-btn" id="rc-reset" aria-label="${esc(rt('reset'))}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4v6h6"/><path d="M5.5 15a7.5 7.5 0 1 0 1.8-7.8L4 10"/></svg>
              </button>
            </div>
          </div>
        </div>`,
      mount() {
        const btn = byId('rc-tasbih-btn');
        btn.addEventListener('pointerdown', (e) => {
          if (e.button !== undefined && e.button !== 0) return;
          e.preventDefault();
          tasbihTap(e);
        });
        btn.addEventListener('keydown', (e) => {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) tasbihTap(null); }
        });
        btn.addEventListener('contextmenu', (e) => e.preventDefault());
        $$('.rc-dhikr-chip').forEach((c) => c.addEventListener('click', () => { tasbih.dhikr = c.dataset.id; saveTasbih(); renderTasbih(); }));
        $$('#rc-target button').forEach((b) => b.addEventListener('click', () => { tasbih.target = Number(b.dataset.target); saveTasbih(); renderTasbih(); }));
        byId('rc-mute').addEventListener('click', () => {
          tasbih.muted = !tasbih.muted;
          saveTasbih();
          renderTasbih();
          if (!tasbih.muted) playClick();
        });
        byId('rc-reset').addEventListener('click', () => {
          const st = dhikrState();
          st.c = 0;
          st.r = 0;
          saveTasbih();
          renderTasbih();
          rcToast(rt('resetDone'));
        });
        renderTasbih();
      }
    };
  };

  /* ----- daily tracker ------------------------------------------------ */
  const QURAN_GOAL = 20;
  const TRACK_PRAYERS = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const SIMPLE_ITEMS = [{ id: 'taraweeh', icon: '🕌' }, { id: 'sadaqah', icon: '💝' }, { id: 'dua', icon: '🤲' }, { id: 'adhkar', icon: '📿' }];
  const TOTAL_UNITS = 1 + TRACK_PRAYERS.length + 1 + SIMPLE_ITEMS.length;
  const CHECK_SVG = '<svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  const tracker = store.get('rc_tracker', {});
  let trackerDay = localIso(new Date());

  function dayData(iso) {
    if (!tracker[iso]) tracker[iso] = { done: {}, pages: 0 };
    return tracker[iso];
  }
  function dayPct(iso) {
    const d = tracker[iso];
    if (!d) return 0;
    let units = d.done.fast ? 1 : 0;
    TRACK_PRAYERS.forEach((p) => { if (d.done['p_' + p]) units += 1; });
    units += Math.min((d.pages || 0) / QURAN_GOAL, 1);
    SIMPLE_ITEMS.forEach((it) => { if (d.done[it.id]) units += 1; });
    return Math.round((units / TOTAL_UNITS) * 100);
  }
  (function pruneTracker() {
    const limit = Date.now() - 90 * 86400000;
    Object.keys(tracker).forEach((k) => {
      const ts = Date.parse(k + 'T00:00:00');
      if (isNaN(ts) || ts < limit) delete tracker[k];
    });
  })();
  const saveTracker = () => store.set('rc_tracker', tracker);
  const itemBtn = (id, icon, label, on) =>
    '<button type="button" class="rc-item" data-toggle="' + id + '" aria-pressed="' + on + '">' +
    '<span class="ic" aria-hidden="true">' + icon + '</span><span class="lb">' + esc(label) + '</span>' +
    '<span class="rc-check" aria-hidden="true">' + CHECK_SVG + '</span></button>';

  function renderTracker() {
    const box = byId('trk-items');
    if (!box) return;
    const d = dayData(trackerDay);
    const prayersDone = TRACK_PRAYERS.filter((p) => d.done['p_' + p]).length;
    const pages = d.pages || 0;
    const qPct = Math.min(100, (pages / QURAN_GOAL) * 100);
    let html = itemBtn('fast', '🌙', rt('item_fast'), !!d.done.fast);
    html += '<div class="rc-group"><div class="rc-group-head"><span class="ic" aria-hidden="true">🕋</span><span class="lb">' + esc(rt('item_prayers')) +
      '</span><span class="rc-count-sm">' + prayersDone + '/5</span></div><div class="rc-pchips">' +
      TRACK_PRAYERS.map((p) => '<button type="button" class="rc-pchip" data-toggle="p_' + p + '" aria-pressed="' + !!d.done['p_' + p] + '">' + esc(rt(p)) + '</button>').join('') +
      '</div></div>';
    html += '<div class="rc-group"><div class="rc-group-head"><span class="ic" aria-hidden="true">📖</span><span class="lb">' + esc(rt('item_quran')) +
      '</span><span class="rc-count-sm">' + Math.round(qPct) + '%</span></div>' +
      '<div class="rc-stepper"><button type="button" data-pages="-1" aria-label="-1">−</button><span class="v">' + pages + '</span>' +
      '<button type="button" data-pages="1" aria-label="+1">+</button><span class="goal">' + esc(rt('pagesGoal', { n: QURAN_GOAL })) + '</span></div>' +
      '<div class="rc-mini-track"><div class="rc-mini-fill" style="width:' + qPct + '%"></div></div></div>';
    SIMPLE_ITEMS.forEach((it) => { html += itemBtn(it.id, it.icon, rt('item_' + it.id), !!d.done[it.id]); });
    box.innerHTML = html;

    const pct = dayPct(trackerDay);
    setText('trk-pct', pct + '%');
    byId('trk-fill').style.width = pct + '%';
    byId('trk-bar').setAttribute('aria-valuenow', String(pct));
    setText('trk-msg', rt(pct === 0 ? 'msg0' : pct < 35 ? 'msg1' : pct < 70 ? 'msg2' : pct < 100 ? 'msg3' : 'msg4'));

    const fmt = new Intl.DateTimeFormat(LOCALES[lang], { weekday: 'short' });
    const base = new Date();
    let week = '';
    for (let i = 6; i >= 0; i--) {
      const dt = new Date(base.getFullYear(), base.getMonth(), base.getDate() - i);
      const p = dayPct(localIso(dt));
      week += '<div class="rc-wday' + (i === 0 ? ' is-today' : '') + '" title="' + p + '%"><div class="rc-wbar"><i style="height:' + p + '%"></i></div>' +
        '<small>' + esc(fmt.format(dt).replace('.', '')) + '</small></div>';
    }
    byId('trk-week').innerHTML = week;
  }

  pages.tracker = function () {
    return {
      title: rt('trackerTitle'),
      html: `
        <div class="rc rc-narrow">
          ${rcHead('trackerEyebrow', 'trackerTitle', 'trackerSub')}
          <div class="rc-panel rc-stack">
            <div class="rc-progress-head"><span class="rc-big" id="trk-pct">0%</span><p id="trk-msg"></p></div>
            <div class="rc-track" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" id="trk-bar"><div class="rc-fill" id="trk-fill"></div></div>
            <div class="rc-items" id="trk-items"></div>
            <div class="rc-week"><h3>${esc(rt('last7'))}</h3><div class="rc-week-grid" id="trk-week"></div></div>
            <button type="button" class="rc-btn rc-btn--ghost rc-btn--sm" id="trk-reset">${esc(rt('resetDay'))}</button>
          </div>
        </div>`,
      mount() {
        byId('trk-items').addEventListener('click', (e) => {
          const d = dayData(trackerDay);
          const tog = e.target.closest('[data-toggle]');
          const step = e.target.closest('[data-pages]');
          if (tog) {
            d.done[tog.dataset.toggle] = !d.done[tog.dataset.toggle];
            if (d.done[tog.dataset.toggle]) vibrate(10);
          } else if (step) {
            d.pages = Math.max(0, Math.min(604, (d.pages || 0) + Number(step.dataset.pages)));
          } else return;
          saveTracker();
          renderTracker();
          const sel = tog ? '[data-toggle="' + tog.dataset.toggle + '"]' : '[data-pages="' + step.dataset.pages + '"]';
          const again = $('#trk-items ' + sel);
          if (again) again.focus({ preventScroll: true });
        });
        byId('trk-reset').addEventListener('click', () => {
          tracker[trackerDay] = { done: {}, pages: 0 };
          saveTracker();
          renderTracker();
          rcToast(rt('dayReset'));
        });
        renderTracker();
      }
    };
  };

  /* ----- Ko-fi donation popup ------------------------------------------
     Only a link to Ko-fi: no payment is handled or stored on this site, and the
     site never claims a donation succeeded (Ko-fi confirms it on its own page). */
  const CUP_SVG = '<svg class="kofi-ic" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
    '<path d="M3 8h13v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" fill="currentColor"/>' +
    '<path d="M16 9.5h1.5a3 3 0 0 1 0 6H16" fill="none" stroke="currentColor" stroke-width="2"/>' +
    '<path d="M9.5 15.4 7 13a1.6 1.6 0 0 1 2.5-2 1.6 1.6 0 0 1 2.5 2z" fill="#ff5e5b"/></svg>';

  function renderDonate() {
    setText('kofi-fab-txt', t('donate'));
    setText('kofi-title', t('donateTitle'));
    setText('kofi-text', t('donateText'));
    setText('kofi-btn-txt', t('donateBtn'));
    setText('kofi-note', t('donateNote'));
    const fab = byId('kofi-fab');
    if (fab) fab.setAttribute('aria-label', t('donateOpen'));
    const close = byId('kofi-close');
    if (close) close.setAttribute('aria-label', t('close'));
  }

  function initDonate() {
    document.body.insertAdjacentHTML('beforeend', `
      <button type="button" class="kofi-fab" id="kofi-fab" aria-haspopup="dialog" aria-expanded="false" aria-controls="kofi-pop">
        ${CUP_SVG}<span id="kofi-fab-txt"></span>
      </button>
      <div class="kofi-pop" id="kofi-pop" role="dialog" aria-modal="false" aria-labelledby="kofi-title" aria-describedby="kofi-text" hidden>
        <button type="button" class="kofi-close" id="kofi-close">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18"/></svg>
        </button>
        <div class="kofi-cup">${CUP_SVG}</div>
        <h2 class="kofi-title" id="kofi-title"></h2>
        <p class="kofi-text" id="kofi-text"></p>
        <a class="kofi-btn" id="kofi-link" href="${esc(RC.donateUrl)}" target="_blank" rel="noopener noreferrer">
          ${CUP_SVG}<span id="kofi-btn-txt"></span><span class="kofi-ext" aria-hidden="true">↗</span>
        </a>
        <p class="kofi-note" id="kofi-note"></p>
      </div>`);
    renderDonate();

    const fab = byId('kofi-fab');
    const pop = byId('kofi-pop');
    let opener = fab;
    const isOpen = () => !pop.hidden;
    const open = (from) => {
      opener = from || fab;
      pop.hidden = false;
      fab.setAttribute('aria-expanded', 'true');
      byId('kofi-link').focus();
    };
    const close = (restoreFocus) => {
      if (!isOpen()) return;
      pop.hidden = true;
      fab.setAttribute('aria-expanded', 'false');
      if (restoreFocus && opener) opener.focus();
    };

    fab.addEventListener('click', () => (isOpen() ? close(true) : open(fab)));
    byId('kofi-close').addEventListener('click', () => close(true));
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-open-donate]');
      if (trigger) { e.preventDefault(); open(trigger); return; }
      if (isOpen() && !e.target.closest('#kofi-pop, #kofi-fab')) close(false);
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen()) { e.preventDefault(); close(true); }
      const trigger = e.target.closest && e.target.closest('[data-open-donate]');
      if (trigger && e.key === ' ') { e.preventDefault(); open(trigger); } // Enter already fires a click
    });
    // keep keyboard focus inside the small popup while it is open
    pop.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const items = [byId('kofi-close'), byId('kofi-link')];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? -1 : 1) + items.length) % items.length].focus();
    });
  }

  function initPromo() {
    try{
    const bar = byId('ecosystem-promo-bar');
    if (!bar) return;
    byId('promo-link').href = PROMO_URL;
    try { if (sessionStorage.getItem('ramadan_promo_closed') === '1') bar.hidden = true; } catch (e) { /* blocked */ }
    byId('promo-close').addEventListener('click', () => {
      bar.hidden = true;
      try { sessionStorage.setItem('ramadan_promo_closed', '1'); } catch (e) { /* blocked */ }
    });
    } catch(e) {
    }
  }

  /* =======================================================================
     ROUTER
     ======================================================================= */

  function parseHash() {
    const raw = location.hash.replace(/^#\/?/, '');
    const [path, qs] = raw.split('?');
    const parts = path.split('/').filter(Boolean);
    return { name: parts[0] || 'home', params: parts.slice(1), query: new URLSearchParams(qs || '') };
  }

  function render(keepScroll) {
    const { name, params, query } = parseHash();
    const page = (pages[name] && name !== 'notFound' ? pages[name] : pages.notFound)(params, query);
    const y = window.scrollY;

    cleanupPage();
    $('#app-view').innerHTML = page.html;
    document.title = page.title + ' · Ramadan';
    try { if (page.mount) page.mount(); } catch (e) { logError('Error mounting page "' + name + '":', e); }

    $$('[data-route]').forEach((a) => a.classList.toggle('active', a.dataset.route === name));
    $$('#sidebar-categories a').forEach((a) => a.classList.toggle('active', location.hash === a.getAttribute('href')));

    $('.tt-sidebar').classList.remove('active');
    closeSuggestions();
    window.scrollTo(0, keepScroll === true ? y : 0);
  }

  /* =======================================================================
     LAYOUT: language, sidebar, search, legacy links
     ======================================================================= */
  function translateShell() {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
    $$('[data-i18n]').forEach((el) => { el.textContent = t(el.dataset.i18n, { y: new Date().getFullYear() }); });
    $$('[data-i18n-ph]').forEach((el) => { el.placeholder = t(el.dataset.i18nPh); });
    $$('[data-i18n-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('.spa-lang button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $('#sidebar-categories').innerHTML = TYPE_ORDER.map((ty) =>
      `<li><a href="${link.category(ty)}"><i class="${TYPES[ty].icon}"></i> ${esc(L(TYPES[ty].label))}</a></li>`).join('');
  }

  function setLang(next) {
    if (!LANGS.includes(next) || next === lang) return;
    lang = next;
    store.set('lang', lang);
    translateShell();
    renderLocDialog();
    renderDonate();
    render(true);
  }

  function initSidebar() {
    const sidebar = $('.tt-sidebar');
    $('.tt-sidebar-collapse-btn').addEventListener('click', () => {
      $$('.to-collapse', sidebar).forEach((el) => el.classList.toggle('d-none'));
      sidebar.classList.toggle('sidebar-collapsed');
    });
    $('.tt-sidebar-toggler').addEventListener('click', () => sidebar.classList.toggle('active'));
    $$('.tt-sidebar-nav-dropdown').forEach((dd) => {
      dd.firstElementChild.addEventListener('click', (e) => {
        e.preventDefault();
        dd.classList.toggle('active');
      });
    });
    document.addEventListener('click', (e) => {
      if (!sidebar.classList.contains('active')) return;
      if (e.target.closest('.tt-sidebar, .tt-sidebar-toggler')) return;
      sidebar.classList.remove('active');
    });
  }

  let suggestionFocus = -1;
  function closeSuggestions() {
    const box = $('#search-suggestions');
    box.classList.remove('active');
    box.style.display = '';
    suggestionFocus = -1;
  }

  function initSearch() {
    const form = $('#search-form');
    const input = $('#tt-search');
    const box = $('#search-suggestions');

    const update = () => {
      const q = input.value.trim();
      if (!q) { closeSuggestions(); box.innerHTML = ''; return; }
      const res = searchAll(q);
      const types = TYPE_ORDER.filter((ty) => allLangs(TYPES[ty].label).toLowerCase().includes(q.toLowerCase()));
      const items = [
        ...types.map((ty) => ({ href: link.category(ty), label: L(TYPES[ty].label) })),
        ...res.videos.slice(0, 5).map((v) => ({ href: link.video(v), label: L(v.title) + ' · ' + v.ch })),
        ...res.shorts.slice(0, 3).map((s) => ({ href: link.short(s), label: L(s.title) + ' · ' + t('short') }))
      ].slice(0, 8);
      items.push({ href: link.search(q), label: t('seeAll', { q }) });
      box.innerHTML = items.map((it) => `<a href="${it.href}">${esc(it.label)}</a>`).join('');
      box.classList.add('active');
      box.style.display = 'block';
      suggestionFocus = -1;
    };

    input.addEventListener('input', update);
    input.addEventListener('focus', () => { if (input.value.trim()) update(); });
    input.addEventListener('keydown', (e) => {
      const links = $$('a', box);
      if (!links.length || !box.classList.contains('active')) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        suggestionFocus = (suggestionFocus + (e.key === 'ArrowDown' ? 1 : -1) + links.length) % links.length;
        links.forEach((a, i) => a.classList.toggle('is-focused', i === suggestionFocus));
      } else if (e.key === 'Enter' && suggestionFocus >= 0) {
        e.preventDefault();
        location.hash = links[suggestionFocus].getAttribute('href');
        input.blur();
      } else if (e.key === 'Escape') {
        closeSuggestions();
      }
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = input.value.trim();
      if (q) location.hash = link.search(q);
      input.blur();
    });
    box.addEventListener('mousedown', (e) => e.preventDefault());
    box.addEventListener('click', () => closeSuggestions());
    document.addEventListener('click', (e) => { if (!e.target.closest('.tt-header__search-wrapper')) closeSuggestions(); });

    $$('.tt-mobile-search-btn').forEach((btn) => btn.addEventListener('click', () => {
      const s = $('.tt-header__search');
      s.classList.toggle('active');
      if (s.classList.contains('active')) { window.scrollTo(0, 0); input.focus(); }
    }));
  }

  /* =======================================================================
     BOOT
     ======================================================================= */
  window.handleLogin = function (response) {
    console.log('JWT:', response.credential);
  };

  function boot() {
    translateShell();
    $$('.spa-lang button').forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
    initSidebar();
    initSearch();
    initPromo();
    initDonate();
    loadCardFonts();
    initLocation();
    window.addEventListener('hashchange', () => render());
    render();

    // one clock for the whole app (countdown, next prayer, day change)
    const loop = () => {
      try { rcTick(); } catch (e) { logError('tick', e); }
      setTimeout(loop, 1000 - (Date.now() % 1000) + 5);
    };
    loop();
    document.addEventListener('visibilitychange', () => { if (!document.hidden) rcTick(); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
