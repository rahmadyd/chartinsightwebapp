// Procedural Case Generator for Chart Insight Lab
// Generates realistic charts, business problems, answers, algorithms & DOs/DONTs on the fly!

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min, max, decimals = 1) {
  const val = Math.random() * (max - min) + min;
  return parseFloat(val.toFixed(decimals));
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const TEMPLATES = [
  // ─── 1. FINANCE ───
  {
    category: 'Finance',
    chartType: 'line',
    build: () => {
      const startNPL = randFloat(1.1, 1.8);
      const spikeMonth = randInt(5, 7);
      const labels = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'];
      const values = [];
      let curr = startNPL;

      for (let i = 1; i <= 10; i++) {
        if (i < spikeMonth) {
          curr += randFloat(0.05, 0.15);
        } else {
          curr += randFloat(0.3, 0.6); // accelerate
        }
        values.push(parseFloat(curr.toFixed(2)));
      }

      const finalVal = values[values.length - 1];
      const jumpRate = ((finalVal - startNPL) / startNPL * 100).toFixed(0);

      return {
        id: `gen-finance-${Date.now()}`,
        title: `Kenaikan Risiko Kredit Macet (NPL): Lompatan ${jumpRate}%`,
        category: 'Finance',
        level: 'Menengah',
        chartType: 'line',
        problemStatement: `Portofolio pembiayaan fintech mengalami lonjakan rasio NPL dari ${startNPL}% ke ${finalVal}% terutama sejak bulan ke-${spikeMonth}. Manajemen ingin tahu apakah ini risiko sistemik makro atau kualitas borrower yang memburuk akibat pelonggaran credit scoring.`,
        context: `Data rasio NPL 90 hari selama 10 bulan berturut-turut pada portofolio pinjaman aktif senilai Rp 150 Miliar.`,
        xLabel: 'Bulan Monitoring',
        yLabel: 'Rasio NPL (%)',
        labels,
        values,
        quickAnswer: `Terjadi percepatan NPL (kurva eksponensial) mulai Bulan ke-${spikeMonth}. Rasio mencapai ${finalVal}% mendekati threshold krisis regulasi (5.0%). Kebijakan persetujuan otomatis harus segera diperketat.`,
        detailedReasoning: `Tren awal (B1-B${spikeMonth-1}) relatif datar dengan kenaikan bertahap. Mulai B${spikeMonth}, gradien kurva melonjak drastis. Ini menandakan cohort pinjaman yang disalurkan 3 bulan sebelum B${spikeMonth} memiliki gagal bayar serentak. Ini indikasi kuat bahwa kampanye akuisisi borrower baru melonggarkan batas skor kredit demi target omset.`,
        dataAnalyst: {
          insight: `Cohort borrower baru yang diakuisisi dengan promo bunga murah memiliki tingkat default 2.5x lebih tinggi dibandingkan nasabah repeat.`,
          recommendations: `1. Naikkan cutoff credit score otomatis dari 620 ke 680.\n2. Alokasikan tim desk collection lebih agresif pada DPD 1-15 hari.\n3. Hentikan sementara channel akuisisi marketing dengan rasio gagal bayar tertinggi.`,
          kpiMetrics: ['NPL 90 Days', 'Vintage Default Curve', 'First Payment Default (FPD)', 'Collection Efficiency']
        },
        dataScience: {
          statisticalAnalysis: `Karakteristik kurva menunjukkan akselerasi non-linear (second derivative positif). Terjadi population drift signifikan pada distribusi credit score nasabah baru.`,
          algorithms: [
            'Logistic Regression with WoE & Information Value',
            'LightGBM Credit Default Classifier',
            'Survival Analysis (Cox Proportional Hazards Model)'
          ],
          pythonLibraries: ['optbinning', 'lightgbm', 'lifelines', 'scipy.stats'],
          nextExperiment: 'Uji apakah model scorecard lama mengalami performa drop menggunakan metrik KS-Statistic dan Population Stability Index (PSI).'
        },
        dosAndDonts: {
          dos: [
            'Gunakan Vintage Analysis (cohort analisis berdasarkan bulan pencairan) untuk mengisolasi cohort bermasalah.',
            'Hitung metrik DPD dini (1-30 hari) sebagai leading indicator sebelum menembus NPL 90.',
            'Sesuaikan pencadangan kerugian penurunan nilai (CKPN / IFRS 9) seiring kenaikan NPL.'
          ],
          donts: [
            'JANGAN melonggarkan kriteria pinjaman baru hanya untuk memperbesar denominator portofolio (evergreening).',
            'JANGAN berasumsi semua kenaikan NPL akibat faktor eksternal sebelum mengaudit algoritma scoring internal.',
            'JANGAN abaikan konsentrasi risiko pada segmen produk atau wilayah tertentu.'
          ]
        },
        glossary: ['korelasi', 'tren', 'regresi', 'cohort']
      };
    }
  },

  // ─── 2. E-COMMERCE ───
  {
    category: 'E-Commerce',
    chartType: 'bar',
    build: () => {
      const baseRev = randInt(35, 60);
      const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
      const values = [];

      for (let i = 0; i < 12; i++) {
        let v = baseRev + (i * randFloat(1.2, 2.5)); // organic growth
        if (i === 10) v *= randFloat(1.4, 1.6); // Nov 11.11 spike
        if (i === 11) v *= randFloat(1.7, 2.1); // Des 12.12 + holiday
        values.push(Math.round(v));
      }

      const novVal = values[10];
      const desVal = values[11];
      const janVal = values[0];

      return {
        id: `gen-ecom-${Date.now()}`,
        title: `Lonjakan Musiman Akhir Tahun (Peak vs Organic Growth)`,
        category: 'E-Commerce',
        level: 'Pemula',
        chartType: 'bar',
        problemStatement: `Penjualan melonjak tajam di bulan November (${novVal}jt) dan Desember (${desVal}jt) dibanding rata-rata awal tahun (${janVal}jt). Tim logistik mengusulkan penambahan staf permanen 2x lipat. Apakah lonjakan ini akan berlanjut di Januari?`,
        context: `Total pendapatan bulanan toko online retail (dalam juta Rupiah) sepanjang 12 bulan terakhir.`,
        xLabel: 'Bulan',
        yLabel: 'Total Pendapatan (Juta Rp)',
        labels: months,
        values,
        quickAnswer: `Kenaikan di Nov-Des adalah efek Seasonality murni (Festival 11.11, 12.12 & Liburan Akhir Tahun). Penambahan staf permanen tidak disarankan karena hampir pasti terjadi 'January Drop' pasca musim belanja.`,
        detailedReasoning: `Data menunjukkan dua komponen: (1) Pertumbuhan organik yang stabil berkisar 4-7% per bulan dari Jan-Okt, dan (2) Anomali musiman musiman masif di Nov-Des. Mengambil komitmen biaya tetap (fixed cost) jangka panjang berdasarkan peak season adalah kesalahan fatal retail.`,
        dataAnalyst: {
          insight: `Gross margin saat festival belanja sebenarnya tertekan akibat diskon besar dan subsidi ongkir, meskipun GMV tampak melonjak 2x lipat.`,
          recommendations: `1. Gunakan staf paruh waktu (seasonal workers) atau vendor fulfillment 3PL selama 60 hari puncak.\n2. Rencanakan 'New Year Clearance Sale' di Januari untuk menghabiskan sisa stok lambat.\n3. Evaluasi profitabilitas bersih per transaksi setelah memperhitungkan biaya retur.`,
          kpiMetrics: ['Net Profit Margin', 'Inventory Holding Cost', 'Return-to-Origin (RTO) Rate', 'MoM Sales Growth']
        },
        dataScience: {
          statisticalAnalysis: `Time series ini bersifat non-stasioner dengan tren linier dan multiplicative seasonal variance. Model regresi linier biasa akan menghasilkan forecast bias yang parah di Q1.`,
          algorithms: [
            'STL Time Series Decomposition (Loess Smoothing)',
            'SARIMAX with Exogenous Promotional Flags',
            'Prophet with Custom Seasonality Regressors'
          ],
          pythonLibraries: ['statsmodels.tsa.seasonal', 'prophet', 'pandas', 'scikit-learn'],
          nextExperiment: 'Pisahkan komponen Time Series: Trend, Seasonality, dan Remainder (Noise) untuk memvalidasi laju pertumbuhan organik murni.'
        },
        dosAndDonts: {
          dos: [
            'Bandingkan pertumbuhan secara Year-over-Year (YoY) pada bulan yang sama, bukan hanya MoM.',
            'Hitung kontribusi diskon dan biaya promosi terhadap margin laba bersih.',
            'Siapkan skenario manajemen persediaan untuk antisipasi penurunan traffic di kuartal 1.'
          ],
          donts: [
            'JANGAN menyamakan Gross Merchandise Value (GMV) kotor dengan laba bersih perusahaan.',
            'JANGAN menambah biaya tetap (fixed operational expenses) permanen berdasarkan kapasitas puncak musiman.',
            'JANGAN mengabaikan lonjakan retur barang yang terjadi pasca belanja akhir tahun.'
          ]
        },
        glossary: ['musiman', 'tren', 'forecast', 'dekomposisi']
      };
    }
  },

  // ─── 3. DIGITAL MARKETING ───
  {
    category: 'Digital Marketing',
    chartType: 'scatter',
    build: () => {
      const scatterData = [];
      for (let b = 0.5; b <= 10.0; b += randFloat(0.3, 0.6)) {
        // Power-law decay: y = A / (x^0.6) + noise
        const budget = parseFloat(b.toFixed(1));
        const baseCTR = 4.2 / Math.pow(budget, 0.55);
        const noise = randFloat(-0.35, 0.35);
        const ctr = parseFloat(Math.max(0.5, baseCTR + noise).toFixed(2));
        scatterData.push({ x: budget, y: ctr });
      }

      return {
        id: `gen-marketing-${Date.now()}`,
        title: `Saturasi Pengeluaran Iklan vs CTR (Hukum Hasil Berkurang)`,
        category: 'Digital Marketing',
        level: 'Menengah',
        chartType: 'scatter',
        problemStatement: `Tim digital marketing menaikkan anggaran iklan berbayar dari 1 juta hingga 10 juta per kampanye. Namun CTR (Click-Through Rate) mengalami penurunan tajam ketika anggaran diperbesar. Mengapa menaikkan budget justru menurunkan efisiensi klik?`,
        context: `Hasil pengujian ${scatterData.length} kampanye iklan: sumbu X = Budget Iklan (Juta Rp), sumbu Y = CTR (%).`,
        xLabel: 'Budget Iklan per Kampanye (Juta Rp)',
        yLabel: 'CTR (%)',
        labels: [],
        scatterData,
        quickAnswer: `Terjadi Audience Saturation & Creative Fatigue. Budget kecil (<3 jt) menyasar audiens berrelevansi tertinggi, sementara budget besar terpaksa memperluas tayangan ke audiens dingin yang kurang peduli.`,
        detailedReasoning: `Scatter plot menunjukkan relasi non-linear negatif yang melengkung (diminishing return decay). Titik efisiensi optimum berada di budget 2-3.5 juta dengan CTR di atas 2.8%. Melebihi 6 juta, kurva mendatar di bawah 1.5% CTR, menandakan penambahan uang tidak lagi efektif menambah engagement.`,
        dataAnalyst: {
          insight: `Alih-alih menaikkan budget satu kampanye ke 10 juta (vertical scaling), perusahaan jauh lebih untung membagi budget ke 3 kampanye berbeda dengan budget 3 jutaan (horizontal scaling).`,
          recommendations: `1. Batasi budget cap per ad set di angka 3 juta.\n2. Lakukan rotasi materi visual/copywriting setiap 10 hari untuk mencegah creative fatigue.\n3. Evaluasi metrik konversi (Cost Per Acquisition / ROAS) sebagai patokan akhir, bukan hanya klik.`,
          kpiMetrics: ['ROAS', 'Cost Per Acquisition (CPA)', 'Ad Frequency', 'Click-Through Rate (CTR)']
        },
        dataScience: {
          statisticalAnalysis: `Korelasi Pearson bernilai r ≈ -0.85, namun fitting linier tidak memadai. Pemodelan kurva logaritmik atau kurva saturasi Hill Function jauh lebih akurat menjelaskan dinamika ini.`,
          algorithms: [
            'Hill Function Saturation Modeling (Marketing Mix Model)',
            'Multi-Armed Bandit (Thompson Sampling) untuk alokasi dinamis budget iklan',
            'Non-Linear Least Squares Curve Fitting'
          ],
          pythonLibraries: ['scipy.optimize', 'scikit-learn', 'numpy', 'seaborn'],
          nextExperiment: 'Gunakan Hill Function E = (Budget^S) / (K^S + Budget^S) untuk menemukan titik infleksi matematis (titik di mana setiap tambahan 1 rupiah memberi marginal return terkecil).'
        },
        dosAndDonts: {
          dos: [
            'Gunakan horizontal scaling dengan membagi target audiens ke beberapa segmen independen.',
            'Pantau metrik Ad Frequency: jika frekuensi tayang > 3.2 dan CTR turun, audiens sudah bosan.',
            'Uji transformasi data non-linear (logaritmik) saat memodelkan efisiensi iklan.'
          ],
          donts: [
            'JANGAN langsung menilai kampanye rugi hanya karena CTR rendah tanpa mengecek average order value (AOV).',
            'JANGAN memompa budget lebih dari 30% per hari karena akan mereset fase pembelajaran algoritma Meta/Google Ads.',
            'JANGAN mencampur channel iklan yang berbeda karakteristiknya dalam satu kesimpulan kurva yang sama.'
          ]
        },
        glossary: ['korelasi', 'ctr', 'regresi', 'confounder']
      };
    }
  },

  // ─── 4. SAAS & PRODUCT ───
  {
    category: 'SaaS & Product',
    chartType: 'line',
    build: () => {
      const dropW1 = randInt(40, 55);
      const values = [100, 100 - dropW1, randInt(30, 36), randInt(25, 29), randInt(21, 25), randInt(16, 20), randInt(13, 17)];
      const labels = ["W0","W1","W2","W3","W4","W8","W12"];

      return {
        id: `gen-saas-${Date.now()}`,
        title: `Kurva Retensi Cohort SaaS: Identifikasi Drop-Off Titik Kritis`,
        category: 'SaaS & Product',
        level: 'Menengah',
        chartType: 'line',
        problemStatement: `Aplikasi produktivitas kehilangan ${dropW1}% pengguna baru hanya dalam 7 hari pertama (W0 ke W1). Setelah minggu ke-4, kurva retensi mulai mendatar di angka ~15-20%. Di mana titik intervensi yang paling krusial?`,
        context: `Kurva retensi cohort mingguan dari registrasi (W0=100%) hingga 12 minggu penggunaan aktif.`,
        xLabel: 'Minggu Sejak Registrasi',
        yLabel: 'Retensi Pengguna Aktif (%)',
        labels,
        values,
        quickAnswer: `Titik kritis paling fatal adalah W0 ke W1 (Onboarding Drop). Jika pengguna tidak merasakan 'Aha! Moment' dalam 7 hari pertama, mereka tidak akan pernah kembali. Fokuskan perbaikan pada alur pendaftaran dan aktivasi dini.`,
        detailedReasoning: `Bentuk kurva adalah L-Curve klasik. Penurunan curam di awal menandakan friction tinggi pada first-time user experience (FTUX). Kabar baiknya, kurva yang mendatar di W4-W12 (~15%) membuktikan adanya 'Core Retained Segment' yang benar-benar membutuhkan produk (Product-Market Fit awal).`,
        dataAnalyst: {
          insight: `Pengguna yang melakukan fitur inti dalam 48 jam pertama memiliki retensi 3.8x lebih tinggi di W12 dibanding pengguna pasif.`,
          recommendations: `1. Pangkas langkah registrasi dari 6 formulir menjadi cukup 2 langkah utama.\n2. Rancang checklist onboarding interaktif dengan panduan visual fitur utama.\n3. Kirim push notification kontekstual di hari ke-1, ke-3, dan ke-5 untuk mendorong pemakaian berulang.`,
          kpiMetrics: ['Day-1 & Day-7 Retention', 'Activation Rate', 'Time to Value (TTV)', 'Churn Rate W12']
        },
        dataScience: {
          statisticalAnalysis: `Pola ini mengikuti kurva Survival Analysis (Kaplan-Meier hazard function). Hazard rate tertinggi terjadi di interval [0, 7] hari, kemudian mendekati konstan.`,
          algorithms: [
            'Kaplan-Meier Survival Estimator',
            'Cox Proportional Hazards Regression',
            'XGBoost Churn Classifier with SHAP Feature Attribution'
          ],
          pythonLibraries: ['lifelines', 'scikit-learn', 'shap', 'matplotlib'],
          nextExperiment: 'Gunakan SHAP Value dari model prediksi churn untuk mendeteksi event pemicu (apakah user yang mengundang rekan kerja churn lebih rendah secara signifikan).'
        },
        dosAndDonts: {
          dos: [
            'Fokuskan 80% perbaikan UX pada 7 hari pertama, bukan menambah fitur rumit di akhir.',
            'Cek apakah kurva retensi mendatar (flattening) sebagai tanda dasar Product-Market Fit.',
            'Gunakan survival analysis untuk mengatasi data censored (user yang baru bergabung beberapa minggu).'
          ],
          donts: [
            'JANGAN terus menghabiskan budget akuisisi user baru jika retensi minggu pertama masih bocor parah.',
            'JANGAN mencampur pengguna berbayar dan gratis dalam satu grafik cohort yang sama.',
            'JANGAN mendefinisikan retensi hanya dari sekadar membuka aplikasi (login) tanpa melakukan aktivitas bernilai.'
          ]
        },
        glossary: ['retensi', 'cohort', 'churn', 'drop-off', 'a/b test']
      };
    }
  },

  // ─── 5. HEALTHCARE & OPERATIONS ───
  {
    category: 'Healthcare',
    chartType: 'bar',
    build: () => {
      const p1 = randInt(320, 380);
      const p2 = randInt(390, 450);
      const p3 = randInt(190, 240);
      const p4 = randInt(90, 130);
      const p5 = randInt(50, 75);
      const p6 = randInt(25, 45);
      const p7 = randInt(12, 25);
      const p8 = randInt(5, 12);

      const labels = ["0-15m","15-30m","30-45m","45-60m","60-75m","75-90m","90-105m",">105m"];
      const values = [p1, p2, p3, p4, p5, p6, p7, p8];
      const total = values.reduce((a, b) => a + b, 0);
      const longWait = p5 + p6 + p7 + p8;

      return {
        id: `gen-health-${Date.now()}`,
        title: `Distribusi Waktu Tunggu Pasien UGD: Ekor Panjang (Long-Tail) Antrian`,
        category: 'Healthcare',
        level: 'Menengah',
        chartType: 'bar',
        problemStatement: `Manajemen rumah sakit mencatat rata-rata waktu tunggu penanganan dokter UGD adalah ~28 menit. Namun keluhan pasien di media sosial terus meningkat. Mengapa angka rata-rata yang baik justru menipu kenyataan di lapangan?`,
        context: `Histogram distribusi waktu tunggu penanganan dokter UGD dari ${total} pasien dalam satu bulan.`,
        xLabel: 'Rentang Waktu Tunggu (Menit)',
        yLabel: 'Jumlah Pasien (Frekuensi)',
        labels,
        values,
        quickAnswer: `Distribusi antrian ini sangat Mencong ke Kanan (Right-Skewed / Long Tail). Walau rata-rata ~28 menit, terdapat ${longWait} pasien yang menunggu lebih dari 1 jam. Merekalah sumber 95% komplain rumah sakit. Jangan pakai Mean, gunakan Persentil P90 / P95!`,
        detailedReasoning: `Data antrian hampir tidak pernah berdistribusi normal (bell curve). Mayoritas pasien selesai cepat (<30 menit), namun ada ekor panjang (bottleneck di lab darah/dokter spesialis) yang menyebabkan sebagian kecil pasien tertahan berjam-jam. Nilai Mean terdistorsi dan menutupi risiko fatalitas pada pasien di ekor kanan.`,
        dataAnalyst: {
          insight: `Komplain reputasi dan risiko kepatuhan medis ditentukan oleh batas terburuk (P95), bukan oleh performa rata-rata pasien umum.`,
          recommendations: `1. Ubah target SLA rumah sakit menjadi: '95% pasien ditangani dokter di bawah 45 menit' (P95 standard).\n2. Buat Fast-Track Lane untuk kasus non-gawat darurat ringan (Triage Level 4 & 5).\n3. Tambah shift dokter residen di jam beban puncak (pukul 17.00 - 21.00).`,
          kpiMetrics: ['P90 & P95 Wait Time', 'Left Without Being Seen (LWBS) Rate', 'Triage-to-Doctor Time', 'Bed Turnaround Time']
        },
        dataScience: {
          statisticalAnalysis: `Distribusi ini mengikuti distribusi Gamma / Log-Normal. Uji parametrik standar seperti Student t-test tidak valid di sini. Analisis antrian harus menggunakan Queueing Theory (M/M/c Kendall Notation).`,
          algorithms: [
            'Discrete Event Queue Simulation (M/M/c with SimPy)',
            'Maximum Likelihood Estimation (MLE) of Gamma Parameters',
            'Non-Parametric Percentile Bootstrap Confidence Intervals'
          ],
          pythonLibraries: ['scipy.stats', 'simpy', 'numpy', 'seaborn'],
          nextExperiment: 'Bangun simulasi antrian diskrit untuk menghitung secara pasti berapa jumlah dokter jaga minimal yang dibutuhkan agar P95 waktu tunggu tidak melampaui 45 menit.'
        },
        dosAndDonts: {
          dos: [
            'Gunakan persentil ke-90 (P90) dan ke-95 (P95) saat menganalisis data antrian dan durasi layanan.',
            'Pisahkan analisis berdasarkan kategori tingkat kegawatan triase (Merah/Kuning/Hijau).',
            'Simulasikan bottleneck pada fasilitas penunjang (lab darah, radiologi) yang sering memperlambat alur.'
          ],
          donts: [
            'JANGAN berpuas diri dengan metrik "Mean / Rata-rata" yang menutupi penderitaan pasien di ekor kanan.',
            'JANGAN berasumsi data antrian berdistribusi normal simetris.',
            'JANGAN memangkas waktu diagnosa dokter hanya demi mengejar kecepatan throughput antrian.'
          ]
        },
        glossary: ['distribusi', 'histogram', 'mean', 'median', 'standar deviasi']
      };
    }
  },

  // ─── 6. SOCIAL MEDIA ───
  {
    category: 'Social Media',
    chartType: 'line',
    build: () => {
      const baseViews = randInt(1100, 1600);
      const spikeWeek = randInt(4, 6);
      const multiplier = randFloat(3.2, 4.8);
      const values = [];
      const labels = ["M1","M2","M3","M4","M5","M6","M7","M8"];

      for (let w = 1; w <= 8; w++) {
        if (w === spikeWeek) {
          values.push(Math.round(baseViews * multiplier));
        } else if (w > spikeWeek) {
          values.push(Math.round(baseViews * randFloat(1.15, 1.35))); // residual lift
        } else {
          values.push(Math.round(baseViews * randFloat(0.9, 1.1)));
        }
      }

      const peakVal = values[spikeWeek - 1];

      return {
        id: `gen-social-${Date.now()}`,
        title: `Deteksi Outlier & Residual Lift pada Konten Viral`,
        category: 'Social Media',
        level: 'Pemula',
        chartType: 'line',
        problemStatement: `Pada Minggu ke-${spikeWeek}, views konten melonjak ke angka ${peakVal.toLocaleString()} (naik ${(multiplier * 100).toFixed(0)}%), namun kemudian turun kembali di minggu berikutnya. Apakah ini tanda channel tumbuh permanen atau hanya anomali sesaat?`,
        context: `Performa impresi mingguan akun konten kreator selama 8 minggu berturut-turut.`,
        xLabel: 'Minggu Publikasi',
        yLabel: 'Total Views Reels',
        labels,
        values,
        quickAnswer: `Lonjakan M${spikeWeek} adalah Outlier Viralitas (kejadian insidental). Namun perhatikan minggu setelahnya: baseline traffic naik ~20% lebih tinggi dari sebelumnya (Residual Lift). Ambil formula konten viralnya untuk diuji ulang.`,
        detailedReasoning: `Data menunjukkan pola 'Viral Spike with Residual Plateau'. M${spikeWeek} adalah anomali statistik (>3 SD). Setelah lonjakan selesai, traffic tidak turun ke baseline awal (M1-M${spikeWeek-1}), melainkan tertahan di level lebih tinggi berkat penambahan follower baru yang terjaring saat viral.`,
        dataAnalyst: {
          insight: `Materi video di M${spikeWeek} berhasil menembus algoritma Explore/FYP. Efek terpenting adalah mengonversi penonton baru menjadi follower aktif.`,
          recommendations: `1. Bedah 3 detik pertama video M${spikeWeek} (hook visual, audio trending, text hook).\n2. Buat serial konten kelanjutan (Part 2 & Part 3) segera saat audiens masih hangat.\n3. Jangan jadikan angka ${peakVal.toLocaleString()} sebagai target mingguan reguler tim konten.`,
          kpiMetrics: ['Follower Growth Rate', 'Average Watch Time', 'Profile Visit to Follow Conversion', 'Save & Share Ratio']
        },
        dataScience: {
          statisticalAnalysis: `Nilai M${spikeWeek} adalah outlier ekstrem terisolasi. Menggunakan mean akan mendistorsi rata-rata channel. Uji Chow Test / Changepoint Analysis dapat digunakan untuk membuktikan apakah terjadi structural shift pada baseline traffic setelah minggu ke-${spikeWeek}.`,
          algorithms: [
            'Z-Score & Interquartile Range (IQR) Outlier Detection',
            'Time Series Changepoint Detection (PELT / Ruptures)',
            'Exponential Smoothing with Trend Adjustment'
          ],
          pythonLibraries: ['ruptures', 'scipy.stats', 'statsmodels', 'pandas'],
          nextExperiment: 'Terapkan algoritma PELT (Pruned Exact Linear Time) untuk memverifikasi apakah residual lift pasca-viral memiliki signifikansi statistik.'
        },
        dosAndDonts: {
          dos: [
            'Gunakan Median dan IQR saat menganalisis akun media sosial dengan konten yang sesekali viral.',
            'Cek apakah ada residual lift (kenaikan baseline permanen) pasca konten viral.',
            'Analisis rasio Share dan Save sebagai proxy algoritma rekomendasi platform.'
          ],
          donts: [
            'JANGAN menetapkan target KPI bulanan berdasarkan performa puncak satu video viral.',
            'JANGAN berasumsi konten berikutnya otomatis berhasil tanpa mempertahankan variabel pemicunya.',
            'JANGAN abaikan interaksi di kolom komentar yang menjadi bahan bakar algoritma platform.'
          ]
        },
        glossary: ['outlier', 'median', 'mean', 'tren', 'lonjakan']
      };
    }
  }
];

export function generateProceduralCase(preferredCategory = 'Semua Kategori') {
  let matchedTemplates = TEMPLATES;
  if (preferredCategory && preferredCategory !== 'Semua Kategori') {
    const filtered = TEMPLATES.filter(t => t.category.toLowerCase() === preferredCategory.toLowerCase());
    if (filtered.length > 0) matchedTemplates = filtered;
  }

  const selectedTemplate = pick(matchedTemplates);
  return selectedTemplate.build();
}
