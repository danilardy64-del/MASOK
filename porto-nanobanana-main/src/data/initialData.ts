
import { PortfolioItem } from "../../types";

// Data awal yang diekstrak dari PDF.
// Gambar (imageData) diset null karena harus diupload manual.
// Story berisi prompt dari PDF.

export const INITIAL_DATA: PortfolioItem[] = [
  {
    id: 1,
    imageData: null,
    story: JSON.stringify({
      id: { title: "KILAU AI Cover", story: "Sebuah potret sampul majalah mode tinggi, berdasarkan komposisi gambar pertama. Di bagian atas, dengan huruf besar, tebal, dan berjenis serif hitam, judulnya tertulis 'KILAU AI'. Di bawah teks tersebut terdapat potret close-up saya dengan fitur wajah [LAMPIRKAN FOTO WAJAH ANDA DISINI SEBAGAI REFERENSI]. memegang gelas coupe berisi cairan berwarna amber (seperti whiskey) hingga ke bibirnya, menatap kamera dengan intens dan langsung. Mengenakan jaket tuxedo hitam, kemeja putih berkerah terbuka yang rapi, beberapa cincin tengkorak perak berukir di tangan kanannya, dan kalung tengkorak perak besar yang terlihat di dadanya. Pencahayaan menggunakan flash studio yang keras dan kontras tinggi, menciptakan bayangan tajam dan jelas dari subjek di latar belakang putih polos di belakangnya. Grain fotografi. Rasio 9:16." },
      en: { title: "KILAU AI Cover", story: "High fashion magazine cover portrait. 'KILAU AI' title in bold serif black font. Close-up portrait holding a coupe glass with amber liquid. Wearing black tuxedo jacket, open white shirt, skull rings, skull necklace. Hard studio flash lighting, high contrast, sharp shadows on white background. Photographic grain. Aspect Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 2,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Christmas Glow", story: "Sebuah foto potret dengan efek kilatan cahaya dari depan belakang yang kuat dan dramatis. Sumber cahaya yang kuat di belakang subjek menciptakan cahaya tepi yang terang dan berkilau di sekitar rambut depan wajah dan tepi tubuh mereka. Cahaya kilauan glow up juga mengisi bagian depan wajah subjek dan rambut, membuat kulit dan pakaian mereka bersinar dengan sorotan cahaya. Nada warna keseluruhan kilau dan efek glow. Latar belakang sama dan buram, dengan cahaya bokeh yang kabur. Tidak ada teks yang ditampilkan. tambahkan topi natal dan partikel salju di rambut dan topinya. tanpa merubah pose pada gambar. Rasio gambar 9:16" },
      en: { title: "Christmas Glow", story: "Portrait photo with strong dramatic backlight rim lighting. Glowing edge light on hair and body. Front fill light makes skin and clothes glow. Sparkle and glow effect tones. Blurred bokeh background. Add santa hat and snow particles on hair. Keep original pose. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 3,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Backlight Bloom", story: "Pertahankan karakter pose karakter gambar pertama. Terangi subjek dengan cahaya latar belakang (backlight) yang sangat kuat, dan dramatis sebagai sumber cahaya utama. Cahaya dari belakang ini harus menciptakan garis bingkai cahaya (rim light) yang intens dan 'glowing' di sekeliling rambut, bahu, dan sisi wajah subjek. Letakkan wajah dalam bayangan yang relatif lembut namun tetap terlihat jelas berkat pantulan cahaya difusi (diffused fill light). Tambahkan efek 'bloom' (cahaya yang berpendar) yang kuat, kabut atmosfer tipis, dan 'halo' cahaya. Render kulit dengan kesan transparan yang bercahaya (luminous translucency). Sorot setiap helai rambut yang menyala emas. Pertahankan kesan sinematik dan kontras yang dalam. Rasio 9:16" },
      en: { title: "Backlight Bloom", story: "Strong dramatic backlight acting as main source. Intense glowing rim light around hair and shoulders. Face in soft shadow with diffused fill light. Strong bloom effect, atmospheric haze, light halo. Luminous translucency skin rendering. Golden backlit hair strands. Cinematic contrast. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 4,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Boxing Poster", story: "Sebuah poster olahraga sinematik yang hiper-realistis, kasar, dan memacu adrenalin. Potret close-up petarung berotot yang berkeringat. Tatapan LANGSUNG ke lensa kamera dengan intimidasi. Bertelanjang dada, otot trapezius jelas. Kulit memerah/perunggu dengan butiran keringat berat. Tangan diangkat dekat dagu dalam posisi pertahanan tinju, dibalut perban tinju kasa putih yang sedikit terurai. JUDUL UTAMA: Teks Sans-Serif geometris masif tebal berwarna MERAH CRIMSON CERAH berbunyi 'KILAU' (atas) dan 'AI' (bawah) di belakang kepala subjek (efek kedalaman 3D). Teks sekunder: 'UNSTOPPABLE FORCE'. Pencahayaan dramatis dan murung." },
      en: { title: "Boxing Poster", story: "Hyper-realistic cinematic sports poster. Gritty, adrenaline. Close-up muscular fighter sweating. Staring DIRECTLY at lens. Shirtless, defined trapezius. Reddish/bronze skin with heavy sweat beads. Hands in boxing defense with white gauze wraps. MAIN TITLE: Massive geometric Sans-Serif BRIGHT CRIMSON RED text 'KILAU' and 'AI' behind subject head (3D depth). Secondary text: 'UNSTOPPABLE FORCE'. Dramatic moody lighting." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 5,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Cinema Chronicles", story: "Sebuah pemotretan potret fotografi yang nostalgik, sinematik, dan sangat atmosferik. Membangkitkan perasaan adegan film romantis klasik era 90-an di dalam teater vintage. Close-up jarak menengah (medium shot). Pose: Sedang duduk di dalam bioskop tetapi condong ke depan, menyandarkan lengan yang bersilang dan dagunya dengan nyaman di bagian atas sandaran kursi merah tepat di depannya. Tatapan: Menatap LANGSUNG ke lensa kamera dengan tatapan lembut, dalam, dan memikat. Pakaian: Gaya akademis yang terinspirasi retro. Rasio 9:16." },
      en: { title: "Cinema Chronicles", story: "Nostalgic cinematic portrait photography. 90s classic romance movie vibe in vintage theater. Medium shot close-up. Pose: Sitting in cinema leaning forward, arms crossed, chin on red seat backrest. Gaze: Direct to camera, soft, deep, alluring. Outfit: Retro inspired academia style. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 6,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Ghost Movement", story: "Potret seni rupa surealis indah namun menghantui. Hitam Putih Monokromatik kontras tinggi. Efek 'Long Exposure' atau 'Shutter Drag'. Fitur penentu adalah motion blur (gerakan kabur). Ada 'jejak hantu' transparan yang jelas atau eksposur ganda (double-exposure) dari wajahnya yang memulas/terseret secara horizontal ke sisi kanan. Ekspresi suram, kosong, melankolis. Pakaian: Blazer Hitam/Jaket Jas gelap menyatu dengan bayangan, Kemeja Putih bersih di dalamnya dengan kerah terbuka. Pencahayaan Low Key (Chiaroscuro). Rasio 9:16." },
      en: { title: "Ghost Movement", story: "Surreal fine art portrait. High contrast Black and White. Long Exposure / Shutter Drag effect. Distinct motion blur ghost trail or double exposure dragging horizontally to right. Ethereal, soul leaving body. Somber, melancholic expression. Outfit: Dark Black Blazer blending into shadow, clean White Shirt underneath with open collar. Low Key Chiaroscuro lighting. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 7,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Gorillaz Style", story: "Ilustrasikan ulang subjek menjadi karakter bergaya Gorillaz (Gaya Jamie Hewlett). Pertahankan esensi wajah agar tetap bisa dikenali namun ubah bentuknya mengikuti geometri kartun khas Hewlett. DNA GAYA: garis tepi tinta yang tegas (kontur hitam tebal), pewarnaan cel-shading datar, blok bayangan tajam, midtones 'gritty', tekstur kotoran (grime), noise cetakan micro-halftone. Proporsi kartun-punk, kepala sedikit diperbesar, anggota tubuh ramping. Palet warna moody, urban, distopia. Rasio 9:16." },
      en: { title: "Gorillaz Style", story: "Re-illustrate subject as Gorillaz style character (Jamie Hewlett style). Preserve facial essence but adapt to cartoon geometry. Style DNA: Bold ink outlines, flat cel-shading, sharp shadow blocks, gritty midtones, grime texture, micro-halftone noise. Cartoon-punk proportions, slightly enlarged head. Moody, urban, dystopian color palette. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 8,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Fuji 400 Editorial", story: "Apply an editorial Fuji 400 film aesthetic to the uploaded photo. Render as if shot on Fuji 400 film camera with natural film grain, soft texture, and slightly muted yet warm color tones. For indoor/nighttime: use direct on-camera flash bright, frontal illumination hitting skin creating crisp but soft shadow. Authentic film color response. Specular shine. Rasio 9:16." },
      en: { title: "Fuji 400 Editorial", story: "Apply an editorial Fuji 400 film aesthetic to the uploaded photo. Render as if shot on Fuji 400 film camera with natural film grain, soft texture, and slightly muted yet warm color tones. For indoor/nighttime: use direct on-camera flash bright, frontal illumination hitting skin creating crisp but soft shadow. Authentic film color response. Specular shine. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 9,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Bootleg Streetwear", story: "Desain poster estetika 'Bootleg Streetwear' mentah, lo-fi, kasar. Meniru fotokopi xerox kualitas rendah atau zine punk 90-an. Digital noise berat. Potret hitam-putih kontras tinggi. Wajah dirender dengan efek 'Bitmap Dithering' atau 'Coarse Halftone Dot'. Ambang batas (threshold) dalam. Pose: Sikap keren acuh tak acuh, tangan dekat mulut/dagu. Pakaian: Hoodie/Kaos streetwear oversized gelap. Latar belakang: 'Blue Noise' (tekstur berbintik Royal Blue dan Putih). Tipografi: Judul 'NINNE' (atau custom) font Stensil Putih tebal, Tag Graffiti. Rasio 9:16." },
      en: { title: "Bootleg Streetwear", story: "Raw, lo-fi, gritty 'Bootleg Streetwear' poster aesthetic. Low quality xerox photocopy or 90s punk zine style. Heavy digital noise. High contrast BW portrait. Face rendered with 'Bitmap Dithering' or 'Coarse Halftone Dot'. Deep threshold. Pose: Cool nonchalant, hand near mouth/chin. Outfit: Dark oversized hoodie/tee. Background: 'Blue Noise' (Royal Blue and White static texture). Typography: White Stencil font title, Graffiti tags. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 10,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Kodak Gold Flash", story: "Ubah gambar menjadi foto editorial beresolusi tinggi dengan estetika pindaian klise film vintage Kodak Gold 200. Lakukan pencahayaan ulang (re-light) untuk mensimulasikan efek lampu kilat kamera langsung yang tajam (gaya paparazzi). Ciptakan sorotan 'dewy' (lembab) dan mengkilap pada kulit. Kilau perunggu keemasan (golden-hour glow). Gelapkan latar belakang (vignette alami). Grading warna hangat (amber, emas, cokelat tua). Tambahkan artefak film 35mm, grain halus, halation. Rasio 9:16." },
      en: { title: "Kodak Gold Flash", story: "Transform into high-res editorial photo with Vintage Kodak Gold 200 film scan aesthetic. Re-light to simulate sharp direct camera flash (paparazzi style). Create dewy/glossy highlights on skin. Golden-hour bronze glow. Darken background (natural vignette). Warm color grading (amber, gold, dark brown). Add 35mm film artifacts, fine grain, halation. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 11,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Grunge Metro 90s", story: "Potret vintage sinematik hiper-realistis, film 35mm, estetika nostalgia 90-an. Subjek bersandar santai di pintu interior gerbong kereta bawah tanah vintage. Pakaian: Gaya 'grunge-meets-chic'. Jaket kulit hitam vintage oversized (bomber), kemeja putih berkancing rapi (kerah terbuka, tidak dimasukkan). Aksesoris: Walkman Retro di pinggang dengan kabel earphone. Pose: Menatap langsung kamera, ekspresi tenang melankolis. Latar: Gerbong metro jadul, pintu kuning mustard/ochre, tiang pegangan krom. Rasio 9:16." },
      en: { title: "Grunge Metro 90s", story: "Hyper-realistic cinematic vintage portrait, 35mm film, 90s nostalgia. Subject leaning on vintage subway train door. Outfit: 'Grunge-meets-chic'. Oversized vintage black leather bomber jacket, white button-up shirt (unbuttoned top, untucked). Accessory: Retro Walkman on waist with earphone cables. Pose: Direct gaze, calm melancholic. Background: Old school metro car, mustard/ochre door, chrome poles. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 12,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Velvet Sofa Flash", story: "Gambar diam sinematik sudut pandang atas. Subjek duduk di sofa velvet pink vintage, dikelilingi dinding panel kayu dipoles. Cahaya flash langsung keras menonjolkan bayangan tegas dan sorotan tajam. Tampilan editorial hiper-modern. Perhiasan mencolok. Energi percaya diri dan mewah. Tekstur kaya kain velvet dan kayu. Realisme tinggi. Rasio 9:16." },
      en: { title: "Velvet Sofa Flash", story: "Cinematic still from high angle. Subject sitting on vintage pink velvet sofa, surrounded by polished wood panel walls. Hard direct flash lighting highlighting sharp shadows and highlights. Hyper-modern editorial look. Bold jewelry. Confident luxurious energy. Rich textures of velvet and wood. High realism. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 13,
    imageData: null,
    story: JSON.stringify({
      id: { title: "3D Pixar Style", story: "Poster karakter film animasi 3D CGI berkualitas tinggi (gaya Disney/Pixar). Subjek pria ditransformasikan ke gaya kartun 3D tampan. Render 'subsurface scattering' pada kulit (halus, semi-translusen). Mata besar ekspresif dengan kedalaman iris detail. Rambut 'grooming' partikel 3D. Pakaian: Sama persis dengan foto input namun tekstur 3D realistis (rajutan/kulit/denim). Pose: Three-quarter view, wajah menoleh ke kamera, senyum percaya diri. Latar: Gradasi biru langit bersih. Pencahayaan softbox studio + cool blue rim light. Rasio 9:16." },
      en: { title: "3D Pixar Style", story: "High-end 3D CGI animated feature film character poster (Disney/Pixar style). Male subject transformed into handsome 3D cartoon. Subsurface scattering on skin. Large expressive eyes. 3D particle hair grooming. Outfit: Matches input photo with realistic 3D textures. Pose: Three-quarter view, face turned to camera, confident smile. Background: Clean soft blue gradient. Softbox studio lighting + cool blue rim light. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 14,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Claustrophobic Crowd", story: "Street photography potret close-up hiper-realistis yang sesak (claustrophobic). Fokus ketat pada wajah dan bahu atas. Ekspresi: Tajam, fokus, tenang, tabah, sedikit lelah. Kontras dengan gerakan di sekitarnya. Pakaian: Kemeja Putih Berkerah (kusut/berantakan), Dasi Merah longgar. Elemen Kunci: Obstruksi Latar Depan Berat (bahu/punggung orang lain yang buram menghalangi bingkai). Motion Blur Ekstrem pada kerumunan (garis-garis hantu warna hitam/abu/biru). Depth of field dangkal. Pencahayaan siang hari perkotaan tersaring. Rasio 9:16." },
      en: { title: "Claustrophobic Crowd", story: "Claustrophobic hyper-realistic street photography close-up portrait. Tight focus on face/shoulders. Expression: Sharp, calm, stoic, slightly exhausted. Outfit: White Dress Shirt (wrinkled/messy), Loose Red Tie. Key Element: Heavy Foreground Occlusion (blurry shapes of people blocking frame). Extreme Motion Blur on crowd (ghostly streaks). Shallow depth of field. Filtered urban daylight. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 15,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Canon Digic Cam", story: "Bidikan close-up ditampilkan pada layar LCD kamera digital saku (compact) Canon. Bodi kamera terlihat mengelilingi gambar (tombol, dial, label 'IMAGE STABILIZER'). Foto di layar: Di dalam ruangan malam hari, diterangi flash bawaan terang. Sorotan tajam pada wajah/rambut. Latar belakang dapur remang-remang buram. Suasana jujur (candid), mentah, nostalgik awal 2000-an. Warna sedikit pudar/dingin (cool undertones). Kontras flash kuat. Grain alami. Rasio 9:16." },
      en: { title: "Canon Digic Cam", story: "Close-up shot displayed on Canon compact digital camera LCD screen. Camera body visible around image (buttons, dials, 'IMAGE STABILIZER' label). On-screen photo: Indoor night, bright built-in flash. Sharp highlights on face/hair. Dim blurred kitchen background. Candid, raw, early 2000s nostalgia. Slightly washed out/cool undertones. Strong flash contrast. Natural grain. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 16,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Shadows of Elegance", story: "Potret sampul majalah mode tinggi sinematik. Estetika gelap dan dramatis. Judul 'KILAU AI' huruf serif merah tua besar. Pose sudut profil tajam, menoleh ke belakang bahu. Jaket jas navy sleek, kaus leher tinggi putih. Pencahayaan: Garis cahaya diagonal tajam hanya menerangi mata dan hidung. Sisanya tenggelam dalam bayangan. Latar belakang merah burgundy gelap kaya. Teks: 'SHADOWS OF ELEGANCE'. Rasio 9:16." },
      en: { title: "Shadows of Elegance", story: "Cinematic high fashion magazine cover. Dark dramatic aesthetic. 'KILAU AI' title in dark red serif. Sharp profile pose looking back over shoulder. Sleek navy suit jacket, white high neck tee. Lighting: Sharp diagonal slash of light hitting only eyes and nose. Rest in shadow. Dark burgundy background. Text: 'SHADOWS OF ELEGANCE'. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 17,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Surreal Elevator Garden", story: "Potret 'Selfie iPhone Cermin' surealis seperti mimpi. Lokasi: Lift logam modern yang diubah menjadi taman. Subjek berdiri di tengah lift menghadap cermin. Pose: Mengangkat ponsel untuk selfie. Pakaian formal/jas. Lantai lift tertutup karpet Bunga Liar Segar rimbun (mawar, aster, baby breath). Dinding Baja Tahan Karat memantulkan bunga dan subjek secara terdistorsi. Efek 'Fokus Lembut' / 'Pro-Mist'. Cahaya halasi (mekar). Warna pastel pudar (desaturated). Rasio 9:16." },
      en: { title: "Surreal Elevator Garden", story: "Surreal dreamlike 'Mirror iPhone Selfie'. Location: Modern metal elevator turned into garden. Subject standing in center facing mirror. Pose: Taking selfie. Formal outfit. Floor covered in lush Fresh Wildflowers. Stainless steel walls reflecting flowers and distorted subject. 'Soft Focus' / 'Pro-Mist' effect. Halation lighting. Desaturated pastel colors. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 18,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Candid Street Blur", story: "Foto kandid close-up menangkap saya di tengah kerumunan padat. Gaya rambut dan syal hitam. Menatap langsung kamera. Dikelilingi bentuk motion blur kuat dari orang lewat (guratan warna). Latar depan tertutup buram. Cahaya siang alami terang. Suasana kacau ramai. Grain film, depth of field dangkal. Fotografi jalanan mentah, film 35mm. Rasio 9:16." },
      en: { title: "Candid Street Blur", story: "Candid close-up photo in dense crowd. Wearing black scarf. Staring direct at camera. Surrounded by strong motion blur of people passing (streaks of color). Foreground occlusion. Bright natural daylight. Chaotic bustling atmosphere. Film grain, shallow depth of field. Raw street photography, 35mm film. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 19,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Lego Minifigure", story: "Render 3D fotorealistik karakter minifigure Lego. Tekstur plastik ABS cetak injeksi, finishing mengkilap. Warna kulit menyesuaikan subjek. Tangan bentuk C khas Lego. Pose dan ekspresi sesuai gambar. Fotografi mainan makro, fokus tajam pada minifig. Cahaya studio profesional volumetrik. Subjek terisolasi tanpa latar belakang (bersih). Rasio 9:16." },
      en: { title: "Lego Minifigure", story: "Photorealistic 3D render of Lego minifigure. Injection molded ABS plastic texture, glossy finish. Skin tone matches subject. Lego C-hands. Pose and expression match input. Macro toy photography, sharp focus. Professional studio lighting, volumetric. Isolated subject, clean background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 20,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Vintage Photobooth", story: "Strip foto booth hitam putih bergaya vintage. Grid 2x2 empat pose berbeda. Pakaian: Kaos gelap, kalung rantai. Latar: Dinding panel kayu rustik. Pose 1: Marah gigi terkatup. Pose 2: Kacamata hitam bulat, senyum sinis mulut terbuka. Pose 3: Profil samping, pegang rokok. Pose 4: Tatapan langsung sinis intens. Tekstur butiran film kasar, kontras tinggi. Rasio 9:16." },
      en: { title: "Vintage Photobooth", story: "Vintage Black and White photobooth strip. 2x2 grid. Outfit: Dark tee, chain necklace. Background: Rustic wood panel. Pose 1: Angry clenched teeth. Pose 2: Round sunglasses, cynical open mouth smile. Pose 3: Side profile holding cigarette. Pose 4: Direct intense cynical gaze. Coarse film grain, high contrast. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 21,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Low Angle Concrete", story: "Foto potret sinematik sudut pandang rendah ekstrem (worm's eye view). Subjek duduk di tepian struktur beton raksasa/jembatan layang. Outfit: Kaos oblong putih oversized, celana denim/chino hitam baggy, sneakers high-top hitam (mirip Converse). Lingkungan: Balok beton arsitektural kasar (brutalist), besi tulangan (rebar) berkarat menonjol. Latar: Langit biru 'Deep Cyan'/'Teal Blue' luas tanpa awan. Cahaya matahari sore cerah keras (hard sunlight). Rasio 9:16." },
      en: { title: "Low Angle Concrete", story: "Cinematic extreme low angle portrait (worm's eye view). Subject sitting on edge of massive concrete structure/overpass. Outfit: Oversized white t-shirt, baggy black denim/chinos, black high-top sneakers. Environment: Rough architectural concrete (brutalist), exposed rusty rebar. Background: Vast cloudless 'Deep Cyan'/'Teal Blue' sky. Bright hard afternoon sunlight. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 22,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Pertamina JDM Vibes", story: "Foto analog bertekstur kasar awal 2000-an (grunge aesthetic). Pria berpose di stasiun bensin Pertamina malam hari. Outfit: Kaos hitam vintage, jeans longgar, sepatu Nike Air Jordan tebal. Latar: Di belakang mobil Mazda 3 hatchback modifikasi (merah permen, widebody). Cahaya: Kilatan kamera keras langsung. Logo Pertamina dan 'PASTI PAS' terlihat. Lantai aspal basah memantulkan neon. ISO tinggi, butiran kasar. Rasio 9:16." },
      en: { title: "Pertamina JDM Vibes", story: "Gritty early 2000s analog photo (grunge aesthetic). Man posing at Pertamina gas station at night. Outfit: Vintage black tee, baggy jeans, chunky Air Jordans. Background: Behind modified Mazda 3 hatchback (candy red, widebody). Lighting: Hard direct flash. Pertamina logo and 'PASTI PAS' sign visible. Wet asphalt reflecting neon. High ISO, grain. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 23,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Vintage Mag Cover", story: "Potret sampul majalah vintage. Bingkai hijau mint khas mengelilingi latar belakang merah cerah solid. Judul 'KILAUAI' sans-serif merah tebal. Subjek: Tanpa kemeja, pegang rokok menyala dekat pipi. Rambut gelap acak-acakan. Pencahayaan gelap misterius, bayangan dalam. Teks: 'THE TIMELESS MAN EDITION', 'THE ART OF BEING', 'COVER STORY: REDEFINING LUXURY'. Tekstur kertas retro halus. Rasio 9:16." },
      en: { title: "Vintage Mag Cover", story: "Vintage magazine cover portrait. Mint green frame around solid bright red background. Title 'KILAUAI' in bold red sans-serif. Subject: Shirtless, holding lit cigarette near cheek. Messy dark hair. Dark mysterious lighting, deep shadows. Text: 'THE TIMELESS MAN EDITION', 'THE ART OF BEING', 'COVER STORY: REDEFINING LUXURY'. Vintage paper texture. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 24,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Cinema Seat Portrait", story: "Bidikan medium-penuh sinematik. Duduk sendirian di kursi teater/bioskop kuno berbantal merah. Pakaian: Kemeja putih sedikit kusut, dasi merah kusut, celana hitam pinggang tinggi. Pose: Menyandarkan kepala malas, tangan di sandaran. Latar: Remang-remang, nostalgia filmis, grain lembut. Warna seperti Kodak Portra 400. Bokeh membuai. Cahaya chiaroscuro muram. Kaus kaki mengintip. Kesendirian kontemplatif. Rasio 9:16." },
      en: { title: "Cinema Seat Portrait", story: "Cinematic medium-full shot. Sitting alone in vintage red theater seat. Outfit: Rumpled white shirt, messy red tie, high-waisted black trousers. Pose: Head leaning lazily on hand, arm draped on backrest. Setting: Dim, nostalgic filmic, soft grain. Kodak Portra 400 vibes. Bokeh background. Moody chiaroscuro lighting. Socks peeking out. Contemplative solitude. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 25,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Y2K Streetwear Poster", story: "Desain poster fashion 'Y2K Streetwear' berani. Efek Lensa Fisheye sudut tinggi (top-down). Subjek mencondongkan tubuh ke depan (perspektif jenaka kepala besar). Pose 'swagger' miring. Pakaian: Kaus Crewneck Abu-abu Muda bertekstur (quilted/waffle) dengan logo 'DONTINII'. Latar: Tipografi 'Bubble Font' grafiti masif 'ARRA' di belakang kepala (putih outline hitam tebal). Ikon bunga merah dan kilatan petir kuning. Latar studio putih solid high-key. Rasio 9:16." },
      en: { title: "Y2K Streetwear Poster", story: "Bold 'Y2K Streetwear' fashion poster. High angle Fisheye lens effect (top-down). Subject leaning forward (playful big head perspective). Swagger tilt pose. Outfit: Light Grey textured Crewneck (quilted/waffle) with 'DONTINII' logo. Background: Massive graffiti 'Bubble Font' typography 'ARRA' behind head (white with thick black outline). Red flower and yellow lightning icons. Solid white high-key studio background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 26,
    imageData: null,
    story: JSON.stringify({
      id: { title: "3D Stylized Teal", story: "Potret karakter 3D CGI (Stylized Realism). Gaya animasi studio besar (Pixar/Disney) tapi tekstur kulit hiper-realistis (Subsurface Scattering). Pori-pori dan ketidaksempurnaan wajah terlihat. Mata besar ekspresif, rambut 3D lembut. Pakaian: Sweater rajut krem/putih. Latar Belakang: Warna TOSCA (Turquoise/Teal) solid matte. Pencahayaan Three-Point Lighting studio. Rim light terang memisahkan subjek dari latar. Rasio 9:16." },
      en: { title: "3D Stylized Teal", story: "3D CGI Character portrait (Stylized Realism). Major studio animation style (Pixar/Disney) but hyper-realistic skin texture (Subsurface Scattering). Visible pores and imperfections. Large expressive eyes, soft 3D hair. Outfit: Cream/white knit sweater. Background: Solid matte TOSCA (Turquoise/Teal). Three-Point Studio Lighting. Bright rim light separating subject. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 27,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Red Avant Garde", story: "Poster desain grafis avant-garde. Paduan fotografi high-fashion dan seni vektor geometris. Pose angkuh/elegan 3/4 view. Pakaian: Jaket Biker Kulit Hitam, Turtleneck Hitam. Efek Artistik: 'Pengirisan Horizontal' (Glitch/Slice effect). Gambar dipotong menjadi 4-5 strip yang bergeser tidak sejajar. Latar: Hitam pekat dengan Blok Persegi Panjang Vertikal MERAH KRIMSON di belakang. Teks 'KILAU' putih tebal sans-serif (diganti dari FASHION) sebagian tertutup kepala. Rasio 9:16." },
      en: { title: "Red Avant Garde", story: "Avant-garde graphic design poster. High-fashion photography meets geometric vector art. Haughty/elegant 3/4 pose. Outfit: Black Leather Biker Jacket, Black Turtleneck. Artistic Effect: 'Horizontal Slicing' (Glitch/Slice). Image cut into 4-5 shifted strips. Background: Pitch black with massive CRIMSON RED Vertical Rectangle block. 'KILAU' text in bold white sans-serif (replacing FASHION) partially occluded by head. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 28,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Giant Phone Miniature", story: "Komposisi fotografi surealis 'Miniatur'. Subjek berdiri percaya diri di atas layar Ponsel Pintar Raksasa yang tergeletak. Pakaian: Serba hitam (Kemeja lengan pendek camp collar, celana chino pendek, kacamata hitam). Aksesoris: Headphone Over-Ear Putih besar, sepatu chunky putih. Ponsel: Model kelas atas pinggiran perak, layar menyala menampilkan Spotify/Apple Music 'Mode Gelap' (Playlist Hindia: 'Evaluasi' / 'Secukupnya'). Pencahayaan studio tajam. Rasio 3:4." },
      en: { title: "Giant Phone Miniature", story: "Surreal 'Miniature' photography composition. Subject standing confidently on screen of Giant Lying Smartphone. Outfit: All black (Short sleeve camp collar shirt, chino shorts, sunglasses). Accessories: Large White Over-Ear Headphones, white chunky sneakers. Phone: High-end silver rim, screen on showing Dark Mode Music App (Indie Playlist: 'Evaluasi' / 'Secukupnya'). Sharp studio lighting. Ratio 3:4." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 29,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Crowded Train 35mm", story: "Foto film sinematik perspektif kandid. Terhimpit di gerbong kereta bawah tanah padat jam sibuk. Blazer hitam, kemeja putih tak dikancing. Tatapan renung jauh. Wajah tajam, orang sekitar menghalangi (foreground obstruction). Cahaya 'Golden Hour' hangat masuk dari jendela, lens flare. Suasana panas, lelah, melankolis. Grain film 35mm, light leaks. Bokeh signifikan. Rasio 9:16." },
      en: { title: "Crowded Train 35mm", story: "Cinematic film photo, candid perspective. Squeezed in crowded subway train during rush hour. Black blazer, unbuttoned white shirt. Distant brooding gaze. Sharp face, surrounding people creating foreground obstruction. Warm 'Golden Hour' light through windows, lens flare. Hot, exhausted, melancholic atmosphere. 35mm film grain, light leaks. Significant bokeh. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 30,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Crowd Surfing Hero", story: "Fotografi dokumenter olahraga emosional (sports editorial). Momen 'Crowd Surfing' diarak lautan manusia. Sudut pandang rendah (low-angle). Ekspresi kemenangan, kelegaan, syukur menatap langit. Pakaian: 'Racing Suit' (Baju Balap) Putih tebal. Tangan mengangkat Helm Balap Full-Face tinggi-tinggi seperti trofi. Kerumunan di bawah buram (bokeh), tangan-tangan menopang. Latar langit putih cerah/mendung. Rasio 9:16." },
      en: { title: "Crowd Surfing Hero", story: "Emotional sports editorial documentary photography. 'Crowd Surfing' moment carried by sea of people. Low-angle shot. Expression of victory, relief, gratitude looking at sky. Outfit: White 'Racing Suit'. Hand raising Full-Face Racing Helmet high like a trophy. Blurred crowd below (bokeh), hands supporting. Bright white/overcast sky background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 31,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Falling Books Worms Eye", story: "Foto sinematik dinamis sudut rendah (worm's eye view). Menangkap subjek jatuh ke belakang. Wajah terkejut mata terbelalak menempel pada permukaan transparan (kaca) di depan lensa. Tangan terulur putus asa. Foreground: Buku-buku jatuh, pecahan kaca, puing, tetesan air menghantam permukaan. Background: Rak buku tinggi perpustakaan buram memusingkan. Cahaya hangat dramatis. Motion blur kekacauan. Rasio 9:16." },
      en: { title: "Falling Books Worms Eye", story: "Dynamic cinematic low angle (worm's eye view). Subject falling backwards. Shocked face pressed against transparent surface (glass) in front of lens. Hands reaching out desperately. Foreground: Falling books, shattered glass, debris, water droplets hitting surface. Background: Dizzying blurred high library bookshelves. Warm dramatic lighting. Motion blur chaos. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 32,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Oil Painting Portrait", story: "Potret lukis dramatis, rasio 9:16. Kacamata hitam bulat frame kecil. Jaket jas gelap, kemeja off-white bertekstur, dasi gelap. Tatapan lurus tenang serius. Pencahayaan sinematik redup, bayangan kuat. Latar belakang MERAH TUA solid kaya. Tekstur menyerupai lukisan minyak digital kualitas tinggi (digital oil painting). Rasio 9:16." },
      en: { title: "Oil Painting Portrait", story: "Dramatic painted portrait, 9:16. Small round sunglasses. Dark suit jacket, textured off-white shirt, dark tie. Direct calm serious gaze. Dim cinematic lighting, strong shadows. Solid rich DARK RED background. Texture resembles high quality digital oil painting. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 33,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Green Frame Magazine", story: "Potret sampul majalah vintage. Bingkai HIJAU MINT mengelilingi latar MERAH CERAH. Judul 'KILAU AI' merah. Pose: Mengatur syal sutra/bandana bermotif kuning di leher. Jaket bomber hitam, kaus putih. Cincin statement. Teks: 'THE MODERN STYLE', 'DEFINING STYLE'. Tekstur kertas retro halus. Rasio 9:16." },
      en: { title: "Green Frame Magazine", story: "Vintage magazine cover. MINT GREEN frame surrounding BRIGHT RED background. Title 'KILAU AI' in red. Pose: Adjusting yellow patterned silk scarf/bandana. Black bomber jacket, white tee. Statement rings. Text: 'THE MODERN STYLE', 'DEFINING STYLE'. Vintage paper texture. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 34,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Holographic Sticker", story: "Fotografi makro hiper-realistis. Stiker Holografik Kustom ditempel pada tiang lampu jalan usang. Stiker menampilkan foto 'full body' subjek dengan pose mode elegan. Pakaian sesuai referensi. Stiker memiliki Lapisan Kilau Prismatik (efek Kirakira) dan Tepi Die-Cut Putih tebal. Tiang logam/beton berkarat, bertekstur grunge. Latar: Jalanan kota Eropa buram (bokeh), trotoar batu bulat. Rasio 9:16." },
      en: { title: "Holographic Sticker", story: "Hyper-realistic macro photography. Custom Holographic Sticker stuck on worn street lamp pole. Sticker shows full body shot of subject in elegant fashion pose. Outfit matches reference. Sticker has Prismatic/Holographic sheen (Kirakira effect) and thick White Die-Cut Border. Rusty/grunge metal or concrete pole. Background: Blurred European street (bokeh), cobblestones. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 35,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Fisheye Car Garage", story: "Gaya jalanan bawah tanah (Underground street style). Budaya mobil tahun 90-an. Lensa Fisheye sudut lebar. Subjek bersandar pada mobil impor perak modifikasi (JDM). Jaket pembalap, sepatu Vans. Latar: Parkiran gedung (basement) dengan lampu neon. Lantai beton. Mobil-mobil lain di latar belakang. Vibe: 'Made of chrome and concrete'. Rasio 9:16." },
      en: { title: "Fisheye Car Garage", story: "Underground street style. 90s car culture. Wide angle Fisheye lens. Subject leaning on modified silver import car (JDM). Racing jacket, Vans shoes. Setting: Parking garage (basement) with neon lights. Concrete floor. Other cars in background. Vibe: 'Made of chrome and concrete'. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 36,
    imageData: null,
    story: JSON.stringify({
      id: { title: "NBA VHS Screengrab", story: "Tangkapan layar bergaya VHS ilegal pertandingan NBA awal 2000-an. Subjek melakukan dribel crossover. Pakaian: Jersey basket 'SUNS' raksasa, celana jeans baggy, rantai berat. Flash langsung keras. Lensa fisheye 8mm distorsi ekstrem. Blur gerakan (shutter drag). Warna desaturated, pergeseran magenta, scanlines. Energi mixtape And1. Rasio 9:16." },
      en: { title: "NBA VHS Screengrab", story: "Bootleg VHS screengrab of early 2000s NBA game. Subject doing crossover dribble. Outfit: Giant 'SUNS' basketball jersey, baggy jeans, heavy chains. Hard direct flash. 8mm fisheye extreme distortion. Motion blur (shutter drag). Desaturated colors, magenta shift, scanlines. And1 mixtape energy. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 37,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Paparazzi Scrum", story: "Foto candid flash, adegan kerumunan media intens. Subjek dikelilingi mikrofon pers dan kamera yang disodorkan ke wajah. Jas formal gelap, kemeja putih, dasi gelap. Tatapan serius tabah. Cahaya kilat keras menciptakan sorotan tajam. Latar belakang: Kerumunan jurnalis buram, bokeh lampu kilat. Tekstur foto berita berbutir. Rasio 9:16." },
      en: { title: "Paparazzi Scrum", story: "Candid flash photo, intense media scrum scene. Subject surrounded by press microphones and cameras thrust in face. Dark formal suit, white shirt, dark tie. Serious stoic gaze. Hard flash lighting creating sharp highlights. Background: Blurred crowd of journalists, flash bokeh. Gritty news photo texture. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 38,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Wire Chair Portrait", story: "Potret mode editorial kelas atas. Duduk di kursi kisi-kisi kawat krom modern (Bertoia Diamond). Pakaian: Kemeja katun putih bertekstur (kancing dibuka dalam), lengan digulung, celana hitam, suspender (bretel) hitam bermotif. Aksesoris: Tato burung layang-layang di punggung tangan, kalung rantai perak tipis. Rambut keriting berantakan. Warna penuh: Kulit keemasan hangat. Latar belakang putih/abu-abu lembut. Rasio 9:16." },
      en: { title: "Wire Chair Portrait", story: "High-end editorial fashion portrait. Sitting on chrome wire grid chair (Bertoia Diamond). Outfit: Textured white cotton shirt (deeply unbuttoned), rolled sleeves, black trousers, patterned black suspenders. Accessories: Swallow tattoo on back of hand, thin silver chain necklace. Messy curly hair. Full Color: Warm golden skin. Soft white/grey background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 39,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Overhead Ghost Crowd", story: "Foto overhead (sudut atas) sinematik. Subjek berdiri diam menatap lurus ke atas (ke kamera). Tangan di saku blazer hitam. Lokasi: Jalanan bata malam hari. Sekitar subjek: Kerumunan pejalan kaki bergerak cepat (blur gerakan hantu / long exposure). Kontras antara subjek tajam statis dan kerumunan hantu. Suasana malam suram redup. Rasio 9:16." },
      en: { title: "Overhead Ghost Crowd", story: "Cinematic overhead photo. Subject standing still looking straight up at camera. Hands in black blazer pockets. Location: Brick street at night. Surroundings: Crowds of pedestrians moving fast (ghostly motion blur / long exposure). Contrast between sharp static subject and ghostly crowd. Dim somber night atmosphere. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 40,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Puppy Pile", story: "Potret mode fantasi mimpi. Subjek berbaring telentang dikelilingi lautan bulu. Mengenakan setelan jas krem elegan, dasi merah muda pucat. Dikerumuni lusinan anak anjing Pomeranian kecil berbulu halus. Tangan membelai anjing. Ekspresi hangat lembut. Pencahayaan high-key lembut, pastel. Rasio 9:16." },
      en: { title: "Puppy Pile", story: "Dreamy fantasy fashion portrait. Subject lying on back surrounded by sea of fur. Wearing elegant cream suit, pale pink tie. Swarmed by dozens of fluffy Pomeranian puppies. Hands petting dogs. Warm gentle expression. Soft high-key lighting, pastel tones. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 41,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Yellow Flowers Field", story: "Potret moody sinematik. Pria berjongkok di tengah ladang bunga liar kuning tinggi (mustar/rapeseed). Memegang seikat bunga menutupi sebagian wajah (mulut/hidung). Mata menatap tajam melalui celah bunga. Kaos hitam lengan panjang. Gelang rantai perak tebal. Latar: Buraman hijau tua dan bokeh kuning. Bunga 'out of focus' di depan lensa (foreground blur). Pencahayaan mendung lembut. Rasio 3:4." },
      en: { title: "Yellow Flowers Field", story: "Moody cinematic portrait. Man crouching in field of tall yellow wildflowers (mustard/rapeseed). Holding bunch of flowers covering part of face (mouth/nose). Eyes staring intensely through gap. Black long-sleeve tee. Thick silver chain bracelet. Background: Dark green blur and yellow bokeh. Out-of-focus flowers in foreground. Soft overcast lighting. Ratio 3:4." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 42,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Press Conference", story: "Foto mendetail perspektif mata. Duduk sabar di kursi kayu di tengah kerumunan media kacau. Kemeja putih oversized, tato di lengan/leher. Kacamata hitam gelap. Tangan tertangkup di pangkuan. Puluhan tangan memegang HP dengan flash dan kamera menyorot ke arahnya. Flash keras menciptakan highlight silau. Latar belakang gelap buram. Nada sinematik gelap dan kasar (gritty). Rasio 9:16." },
      en: { title: "Press Conference", story: "Detailed eye-level photo. Sitting patiently on wooden chair in chaotic media scrum. Oversized white shirt, tattoos on arms/neck. Dark sunglasses. Hands clasped in lap. Dozens of hands holding phones with flash and cameras pointing at him. Harsh flash creating blinding highlights. Dark blurred background. Dark and gritty cinematic tone. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 43,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Fisheye Gas Station Selfie", story: "Render 3D hiper-realistis / Foto. Selfie lensa fisheye dramatis malam hari. Senyum lebar, gril gigi berlian (grillz). Pakaian jalanan 'drip' mencolok, perhiasan, rompi puffer. Bersandar pada Mazda 3 merah modifikasi. Lokasi: SPBU Pertamina Indonesia. Logo Pertamina dan 'PASTI PAS' melengkung terdistorsi fisheye. Lantai basah neon. Rasio 9:16." },
      en: { title: "Fisheye Gas Station Selfie", story: "Hyper-realistic 3D render / Photo. Dramatic fisheye selfie at night. Wide smile, diamond grillz. Flashy 'drip' streetwear, jewelry, puffer vest. Leaning on modified red Mazda 3. Location: Indonesian Pertamina Gas Station. Distorted Pertamina logo and 'PASTI PAS' sign. Wet neon floor. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 44,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Basquiat Art Style", story: "Lukisan neo-ekspresionisme gaya Jean-Michel Basquiat. Media: Krayon minyak, akrilik, spidol di atas kardus cokelat. Subjek: Potret wajah pria primitif emosional. Garis kontur hitam kasar. Warna wajah oranye/kuning/biru bertabrakan. Mata tidak simetris. Pakaian: Jersey hitam dengan kerah garis putih. Simbol: Mahkota kuning (Crown) khas Basquiat, tulisan 'NO FAKE', 'HUSTLE HARD', 'KILAUAI'. Coretan tengkorak. Rasio 9:16." },
      en: { title: "Basquiat Art Style", story: "Neo-expressionism painting in Jean-Michel Basquiat style. Media: Oil stick, acrylic, marker on brown cardboard. Subject: Primitive emotional male portrait. Rough black contour lines. Clashing orange/yellow/blue face colors. Asymmetrical eyes. Outfit: Black jersey with white collar outline. Symbols: Yellow Crown, text 'NO FAKE', 'HUSTLE HARD', 'KILAUAI'. Skull doodles. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 45,
    imageData: null,
    story: JSON.stringify({
      id: { title: "90s Zine Scan", story: "Scan digital sampul majalah/zine buletin 90-an. Tekstur kertas kasar, noise grain berat. Header: Blok Merah Pudar dengan judul 'KILAUAI' (miring/italic putih). Visual Utama: Foto sudut rendah di balik pagar kawat (chain-link fence). Pakaian: Streetwear baggy, kaos biru dongker/hitam. Sidebar Hijau: 'STYLE ICON FROM BIG CITY', foto thumbnail kecil. Teks paragraf padat rata kiri. Rasio 9:16." },
      en: { title: "90s Zine Scan", story: "Digital scan of 90s community bulletin/zine cover. Rough paper texture, heavy noise grain. Header: Faded Red block with 'KILAUAI' title (white italic). Main Visual: Low angle photo behind chain-link fence. Outfit: Baggy streetwear, navy/black tee. Green Sidebar: 'STYLE ICON FROM BIG CITY', small thumbnails. Dense left-aligned paragraph text. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 46,
    imageData: null,
    story: JSON.stringify({
      id: { title: "70s Vintage Car", story: "Mode editorial jalanan retro 70-an/80-an. Bersandar pada bagasi mobil sport klasik Italia (mirip Ferrari Dino/Lamborghini Urraco) warna Emas Champagne. Outfit: Jaket Bomber Corduroy Cokelat Zaitun dengan Kerah Bulu Domba Putih (Shearling). Jeans denim gelap lurus. Pose 'effortless' tangan menopang kepala. Latar jalanan kota. Rasio 3:4." },
      en: { title: "70s Vintage Car", story: "70s/80s retro street editorial fashion. Leaning on trunk of classic Italian sports car (like Ferrari Dino/Urraco) in Champagne Gold. Outfit: Dark Olive Corduroy Bomber Jacket with White Shearling Collar. Dark straight indigo jeans. 'Effortless' pose hand on head. City street background. Ratio 3:4." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 47,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Biker Match Lighting", story: "Potret sinematik pengendara motor 'outlaw' saat sunset. Duduk di atas motor cruiser hitam. Menyalakan rokok dengan korek api, tangan melindungi nyala. Wajah diterangi dari bawah oleh api (under-lighting). Cahaya matahari (golden rim light) pada rambut. Outfit: Rompi Kulit (Kutte) usang dengan patch 'PRESIDENT' / 'MEN OF MAYHEM'. Asap rokok melingkar. Detail setang motor di foreground. Rasio 9:16." },
      en: { title: "Biker Match Lighting", story: "Cinematic outlaw biker portrait at sunset. Sitting on black cruiser motorcycle. Lighting cigarette with match, cupping flame. Face under-lit by fire. Golden rim light on hair. Outfit: Worn Leather Vest (Kutte) with 'PRESIDENT' / 'MEN OF MAYHEM' patches. Cigarette smoke swirling. Motorcycle handlebars in foreground. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 48,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Teal Hair Boxing", story: "Foto film vintage kasar (90-an). Close-up wajah ditutupi sepasang sarung tinju merah besar usang. Rambut warna Teal Gelap (Hijau Tosca). Anting hoop perak. Kemeja putih kerah. Flash langsung keras. Latar belakang gelap, siluet pohon biru tua. Mentah dan intens. Rasio 9:16." },
      en: { title: "Teal Hair Boxing", story: "Gritty vintage film photo (90s). Close-up face covering mouth with large worn red boxing gloves. Dark Teal hair. Silver hoop earring. White collared shirt. Hard direct flash. Dark background, dark blue tree silhouettes. Raw and intense. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 49,
    imageData: null,
    story: JSON.stringify({
      id: { title: "AE86 Drift King", story: "Potret 'Street Car Culture'. Berpose duduk di atas kap mesin Toyota Sprinter Trueno AE86 (Hachiroku) warna Panda (Hitam Putih). Outfit: Jaket Balap Vintage Putih (Racing Bomber), celana kargo putih, sneakers putih. Tanpa kacamata. Pose santai 'swag'. Latar: Jalanan pelabuhan/industri langit biru cerah. Rasio 9:16." },
      en: { title: "AE86 Drift King", story: "'Street Car Culture' portrait. Sitting on hood of Toyota Sprinter Trueno AE86 (Hachiroku) in Panda (Black & White). Outfit: White Vintage Racing Bomber Jacket, white cargo pants, white sneakers. No sunglasses. Relaxed 'swag' pose. Background: Industrial/harbor road, bright blue sky. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 50,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Skateboard Fisheye", story: "Bidikan fisheye sudut rendah dinamis. Skater terbang di udara (melompat). Helm merah, kaos putih, jeans longgar. Sepatu kets menjorok besar ke lensa (perspektif ekstrem). Latar: Kerumunan skater lain menonton, gedung perkotaan. Langit biru pekat, matahari backlight. Penuh energi. Rasio 9:16." },
      en: { title: "Skateboard Fisheye", story: "Dynamic low angle fisheye shot. Skater flying in air (jump). Red helmet, white tee, baggy jeans. Sneakers looming large into lens (extreme perspective). Background: Crowd of skaters watching, urban buildings. Deep blue sky, sun backlight. High energy. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 51,
    imageData: null,
    story: JSON.stringify({
      id: { title: "GTA V Style", story: "Remake gambar menjadi screenshot gameplay Grand Theft Auto V (GTA 5). Gaya Grafis RAGE Engine. Render 3D realtime, poligon terlihat, tekstur game (bukan foto asli). Pencahayaan: Siang hari terik (Los Santos Weather), bayangan tajam. Warna saturasi tinggi khas GTA. Efek Bloom, Ambient Occlusion. Rasio 9:16." },
      en: { title: "GTA V Style", story: "Remake image into Grand Theft Auto V (GTA 5) gameplay screenshot. RAGE Engine Graphics style. Realtime 3D render, visible polygons, game textures (not photo-real). Lighting: Harsh mid-day sun (Los Santos Weather), sharp shadows. Vibrant GTA colors. Bloom, Ambient Occlusion. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 52,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Danny Phantom Style", story: "Ubah subjek menjadi gaya karakter kartun Danny Phantom (Nickelodeon). Garis sudut tajam (blocky shapes). Ekspresi percaya diri/nakal. Rambut bergaya kartun runcing. Pakaian disederhanakan menjadi bentuk datar (flat shapes). Tanpa tekstur kain, hanya bayangan cel basic. Latar belakang putih polos. Rasio 9:16." },
      en: { title: "Danny Phantom Style", story: "Transform subject into Danny Phantom (Nickelodeon) cartoon style. Sharp angular lines (blocky shapes). Confident/mischievous expression. Spiky cartoon hair. Clothing simplified to flat shapes. No fabric texture, basic cel shading. Pure white background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 53,
    imageData: null,
    story: JSON.stringify({
      id: { title: "GTA San Andreas CJ", story: "Transfer gaya ke mesin RenderWare (GTA San Andreas tahun 2004). Geometri Low-Poly (kotak-kotak). Tekstur resolusi rendah. Bayangan datar (flat shading). Tangan mengepal kotak. Wajah tekstur tempelan (texture mapping). Background dunia game retro 2000-an. Tanpa efek modern (no raytracing/blur). Rasio 9:16." },
      en: { title: "GTA San Andreas CJ", story: "Style transfer to RenderWare engine (GTA San Andreas 2004). Low-Poly geometry (blocky). Low resolution textures. Flat shading. Blocky fists. Face texture mapped. Retro 2000s game world background. No modern effects (no raytracing/blur). Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 54,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Canon IXUS 210", story: "Estetika kamera kompak CCD lawas (Canon IXUS 210 / Digic 4). Midtones terangkat, highlight bloom lembut, atmosfer sedikit berkabut. Cahaya matahari samping (directional side sunlight) menciptakan highlight glowing pada pipi/hidung. Eksposur +2/3 (agak overexposed). Warna Canon Custom: Kontras -2, Saturasi -1. Noise CCD lembut. Rasio 9:16." },
      en: { title: "Canon IXUS 210", story: "Old compact CCD camera aesthetic (Canon IXUS 210 / Digic 4). Lifted midtones, gentle highlight bloom, hazy atmosphere. Directional side sunlight creating glowing highlights on cheek/nose. Exposure +2/3 (slightly overexposed). Canon Custom Color: Contrast -2, Saturation -1. Soft CCD noise. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 55,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Gachiakuta Anime", story: "Gaya Anime GACHIAKUTA. Garis tepi tinta kasar (ink outlines) dengan variasi tekanan. Warna industrial, earthy, muted (tanah/debu). Desaturasi. Cel shading dengan pemisahan bayangan keras (hard shadow). Tekstur grafiti/grunge. Latar belakang putih. Rasio 9:16." },
      en: { title: "Gachiakuta Anime", story: "GACHIAKUTA Anime style. Rough ink outlines with pressure variation. Industrial, earthy, muted colors (dirt/dust). Desaturated. Cel shading with hard shadow separation. Graffiti/grunge texture. White background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 56,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Night Flash Portrait", story: "Pertahankan detail asli foto, ubah pencahayaan. Lingkungan malam gelap. Flash depan langsung (direct front-facing flash) hangat mengenai wajah dan tubuh atas. Highlight glowing pada kulit. Bloom lensa halus. Latar belakang tetap gelap untuk menjaga atmosfer malam. Rasio 9:16." },
      en: { title: "Night Flash Portrait", story: "Keep original details, change lighting. Dark night environment. Warm direct front-facing flash hitting face and upper body. Glowing highlights on skin. Subtle lens bloom. Keep background dark to maintain night atmosphere. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 57,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Blur Concert Motion", story: "Efek blur gerakan (motion blur) pada suasana konser/pesta. Subjek tetap tajam (fokus), elemen lain (lampu, latar, kerumunan) buram dengan jejak cahaya (light trails). Suasana hangat, pencahayaan rendah (low light). Kesan candid malam hari. Rasio 9:16." },
      en: { title: "Blur Concert Motion", story: "Motion blur effect in concert/party setting. Subject remains sharp (in focus), other elements (lights, background, crowd) blurred with light trails. Warm atmosphere, low light. Candid night out vibe. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 58,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Voyeuristic Street", story: "Potret jalanan candid 'raw' dan sempit. Profil samping. Fokus sedikit meleset (soft focus). Wajah lelah/berkeringat. Obstruksi Masif: Bahu/kepala orang lain yang buram menutupi sebagian frame (foreground blur), menciptakan efek mengintip (voyeuristic). Latar belakang bokeh lampu kota malam Indonesia (creamy bokeh). Rasio 9:16." },
      en: { title: "Voyeuristic Street", story: "Raw, claustrophobic candid street portrait. Side profile. Soft focus. Tired/sweaty face. Massive Obstruction: Blurry shoulders/heads of others covering part of frame (foreground blur), creating peeping (voyeuristic) effect. Background creamy bokeh of Indonesian city night lights. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 59,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Sensual 3D Animation", story: "Ilustrasi animasi 3D bergaya sensual dan elegan. Karakter percaya diri. Proporsi halus, kurva lembut. Pencahayaan sinematik lembut, highlight hangat. Tekstur kulit sangat detail namun dipoles (glossy-silk finish). Latar belakang Hitam Pekat (#000000) untuk kontras drama. Kualitas Ultra HD. Rasio 9:16." },
      en: { title: "Sensual 3D Animation", story: "Sensual and elegant stylized 3D animated illustration. Confident character. Refined proportions, smooth curves. Soft cinematic lighting, warm highlights. Highly detailed yet polished skin texture (glossy-silk finish). Pure Black background (#000000) for dramatic contrast. Ultra HD quality. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 60,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Cinematic Sunset Backlight", story: "Fotografi film sinematik. Tone hangat keemasan. Sudut rendah (low angle). Backlight matahari terbenam intens tepat di belakang subjek. Efek 'Rim Light' emas bersinar membingkai tubuh. God rays (sinar mentari) menembus atmosfer berasap. Lensa anamorfoik. Latar perkotaan buram bokeh. Rasio 9:16." },
      en: { title: "Cinematic Sunset Backlight", story: "Cinematic film photography. Golden warm tones. Low angle shot. Intense sunset backlight directly behind subject. Golden 'Rim Light' effect framing body. God rays cutting through smoky atmosphere. Anamorphic lens. Blurred urban bokeh background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 61,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Scott Pilgrim Style", story: "Karakter gaya animasi 'Scott Pilgrim Takes Off'. Garis luar hitam tebal, bentuk grafis bersih. Warna cel-shaded datar. Anatomi disederhanakan, kepala besar ekspresif. Mata besar gaya manga, hidung minimalis. Siluet rambut grafis tegas. Palet warna cerah retro. Latar belakang putih polos. Rasio 9:16." },
      en: { title: "Scott Pilgrim Style", story: "Character in 'Scott Pilgrim Takes Off' animation style. Thick black outlines, clean graphic shapes. Flat cel-shaded colors. Simplified anatomy, expressive large head. Manga-style large eyes, minimalist nose. Graphic hair silhouette. Bright retro color palette. Plain white background. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  },
  {
    id: 62,
    imageData: null,
    story: JSON.stringify({
      id: { title: "Demon Slayer Style", story: "Karakter gaya anime 'Demon Slayer' (Kimetsu no Yaiba). Garis rapi tajam (crisp linework). Cel shading kualitas tinggi. Warna jenuh seimbang. Hasil akhir polesan serial TV. TIDAK ada arsir manga kasar. Rasio 9:16." },
      en: { title: "Demon Slayer Style", story: "Character in 'Demon Slayer' (Kimetsu no Yaiba) anime style. Crisp linework. High-quality cel shading. Saturated balanced colors. Polished TV-series finish. NO rough manga sketching. Ratio 9:16." }
    }),
    isLoading: false,
    error: null
  }
];
