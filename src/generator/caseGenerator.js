// Seeded Procedural Case Generator for Chart Insight Lab

// Mulberry32 seeded random number generator
function createPRNG(seed) {
  let s = Math.abs(seed) || 123456;
  return function() {
    let t = (s += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateSeed() {
  return Math.floor(100000 + Math.random() * 900000);
}

export function generateProceduralCase(preferredCategory = 'Semua') {
  return generateSeededCase(preferredCategory, generateSeed(), 2);
}

export function generateSeededCase(category = 'Semua', seedNumber = 482910, complexity = 2) {
  const seed = parseInt(seedNumber, 10) || 482910;
  const rand = createPRNG(seed);

  const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
  const randFloat = (min, max, dec = 1) => parseFloat((rand() * (max - min) + min).toFixed(dec));
  const pick = (arr) => arr[Math.floor(rand() * arr.length)];

  const CATEGORY_LIST = ['Finance', 'E-Commerce', 'Digital Marketing', 'SaaS & Product', 'Healthcare', 'Social Media'];
  const targetCategory = category === 'Semua' ? pick(CATEGORY_LIST) : category;

  if (targetCategory === 'Finance') {
    const startNPL = randFloat(1.1, 1.8);
    const spikeIndex = randInt(4, 7);
    const labels = ['B1','B2','B3','B4','B5','B6','B7','B8','B9','B10'];
    const values = [];
    let curr = startNPL;

    for (let i = 0; i < 10; i++) {
      if (i < spikeIndex) {
        curr += randFloat(0.04, 0.12);
      } else {
        curr += randFloat(0.35, 0.65);
      }
      values.push(parseFloat(curr.toFixed(2)));
    }

    const finalVal = values[values.length - 1];
    const pct = (((finalVal - startNPL) / startNPL) * 100).toFixed(0);

    return {
      seed,
      category: 'Finance',
      chartType: 'line',
      title: `Monitoring Risiko NPL: Lompatan +${pct}%`,
      xLabel: 'Bulan Monitoring',
      yLabel: 'Rasio NPL (%)',
      labels,
      values,
      problem: `Rasio kredit macet (NPL 90) melonjak dari ${startNPL}% ke ${finalVal}% sejak Bulan ke-${spikeIndex + 1}. Manajemen ingin tahu apakah kebijakan approval pinjaman terlalu longgar.`,
      quickAnswer: `Pola kenaikan eksponensial setelah B${spikeIndex + 1}. Rasio mendekati ambang batas kritis 5.0%. Terjadi pelonggaran kriteria borrower baru demi mengejar target omset.`,
      reasoning: `Grafik memperlihatkan akselerasi (kemiringan garis semakin curam). Kelompok peminjam yang disetujui 3 bulan sebelumnya mengalami gagal bayar massal.`,
      daInsight: `Cohort borrower dari channel promosi bunga murah menyumbang 65% kredit macet baru.`,
      daAction: `1. Naikkan cutoff credit score otomatis dari 620 ke 680.\n2. Fokuskan tim penagihan pada DPD 1-15 hari.\n3. Evaluasi channel marketing berisiko tinggi.`,
      daKpi: ['NPL 90 Hari', 'First Payment Default', 'Collection Rate'],
      dsAnalysis: `Kurva menunjukkan akselerasi non-linear. Terjadi population drift pada distribusi credit score nasabah baru.`,
      dsAlgorithms: ['Logistic Regression (WoE/IV)', 'LightGBM Default Classifier', 'Survival Analysis (Cox Model)'],
      dsLibraries: ['optbinning', 'lightgbm', 'lifelines', 'scipy.stats'],
      dos: [
        'Gunakan Vintage Analysis (analisis per bulan pencairan pinjaman).',
        'Pantau rasio DPD dini (1-30 hari) sebagai sinyal peringatan awal.'
      ],
      donts: [
        'JANGAN menyetujui pinjaman baru sembarangan hanya untuk menutupi persentase kredit macet lama.',
        'JANGAN menyalahkan faktor eksternal sebelum mengaudit credit scoring internal.'
      ]
    };
  }

  if (targetCategory === 'E-Commerce') {
    const baseRev = randInt(40, 65);
    const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];
    const values = [];

    for (let i = 0; i < 12; i++) {
      let v = baseRev + (i * randFloat(1.5, 2.8));
      if (i === 10) v *= randFloat(1.4, 1.6); // Nov
      if (i === 11) v *= randFloat(1.7, 2.2); // Des
      values.push(Math.round(v));
    }

    const nov = values[10];
    const des = values[11];
    const jan = values[0];

    return {
      seed,
      category: 'E-Commerce',
      chartType: 'bar',
      title: `Penjualan Bulanan: Pola Musiman Akhir Tahun`,
      xLabel: 'Bulan',
      yLabel: 'Pendapatan (Juta Rp)',
      labels: months,
      values,
      problem: `Penjualan naik drastis di Nov (${nov}jt) dan Des (${des}jt) dibanding Jan (${jan}jt). Tim logistik ingin menambah gudang sewa tahunan 2x lipat. Apakah langkah ini aman?`,
      quickAnswer: `Lonjakan akhir tahun adalah efek Musiman (Harbolnas 11.11 & Natal), bukan pertumbuhan organik permanen. Menambah gudang sewa permanen berisiko rugi saat traffic normal di awal tahun.`,
      reasoning: `Grafik menunjukkan pertumbuhan organik rata-rata 4-6% di Jan-Okt, diikuti lonjakan musiman musiman di Nov-Des yang hampir selalu diikuti penurunan di Jan-Feb.`,
      daInsight: `Margin laba bersih saat promo besar sering tertekan oleh diskon dan subsidi ongkir.`,
      daAction: `1. Gunakan gudang sementara (fleksibel 3PL) selama 2 bulan festival belanja.\n2. Adakan clearance sale di Januari untuk menghabiskan stok sisa.\n3. Optimalkan stok barang terlaris 2 bulan sebelum Q4.`,
      daKpi: ['Net Margin Profit', 'Inventory Turnover', 'Retur Barang'],
      dsAnalysis: `Time series mengandung tren linier dan variasi musiman multiplikatif. Wajib didekomposisi sebelum dibuat prediksi tahun depan.`,
      dsAlgorithms: ['STL Time Series Decomposition', 'SARIMAX with Holiday Flags', 'Facebook Prophet'],
      dsLibraries: ['statsmodels', 'prophet', 'pandas', 'scikit-learn'],
      dos: [
        'Bandingkan pertumbuhan secara Year-over-Year (YoY) di bulan yang sama.',
        'Hitung laba bersih setelah dikurangi biaya promo dan diskon.'
      ],
      donts: [
        'JANGAN menyewa fasilitas permanen hanya berdasarkan kapasitas di bulan puncak belanja.',
        'JANGAN menyamakan omset kotor (GMV) dengan uang untung bersih.'
      ]
    };
  }

  if (targetCategory === 'Digital Marketing') {
    const scatterData = [];
    for (let b = 0.8; b <= 10.0; b += randFloat(0.4, 0.7)) {
      const budget = parseFloat(b.toFixed(1));
      const baseCTR = 4.2 / Math.pow(budget, 0.55);
      const noise = randFloat(-0.3, 0.3);
      const ctr = parseFloat(Math.max(0.6, baseCTR + noise).toFixed(2));
      scatterData.push({ x: budget, y: ctr });
    }

    return {
      seed,
      category: 'Digital Marketing',
      chartType: 'scatter',
      title: `Pengeluaran Iklan vs CTR: Hukum Hasil Berkurang`,
      xLabel: 'Budget Iklan (Juta Rp)',
      yLabel: 'CTR (%)',
      labels: [],
      scatterData,
      problem: `Saat anggaran iklan dinaikkan dari 1jt ke 10jt, nilai CTR justru turun dari 4.5% ke bawah 1.5%. Mengapa menambah uang tidak membuat rasio klik bertambah proporsional?`,
      quickAnswer: `Terjadi kejenuhan audiens (Ad Fatigue). Budget kecil menjangkau calon pembeli paling relevan; budget besar terpaksa menjangkau audiens luas yang kurang peduli.`,
      reasoning: `Grafik scatter membentuk kurva melengkung ke bawah (decay). Di atas budget 4 juta, penambahan biaya hanya memberikan kenaikan hasil yang sangat kecil (diminishing returns).`,
      daInsight: `Sweet spot budget per kampanye ada di kisaran 2 - 3.5 juta. Lebih efektif membagi budget ke 3 iklan berbeda daripada memompa 1 iklan sendirian.`,
      daAction: `1. Batasi maksimal budget 3 juta per grup iklan (horizontal scaling).\n2. Ganti gambar dan teks iklan setiap 2 minggu agar audiens tidak bosan.\n3. Ukur metrik transaksi akhir (ROAS), bukan cuma jumlah klik.`,
      daKpi: ['ROAS (Return on Ad Spend)', 'Ad Frequency', 'Cost Per Click'],
      dsAnalysis: `Hubungan antar variabel mengikuti kurva logaritmik atau power-law. Perlu pemodelan kurva kurva Hill Function.`,
      dsAlgorithms: ['Hill Function Saturation Model', 'Logarithmic Curve Fitting', 'Multi-Armed Bandit'],
      dsLibraries: ['scipy.optimize', 'scikit-learn', 'numpy', 'seaborn'],
      dos: [
        'Bagi target audiens ke beberapa kelompok kecil daripada membidik satu kelompok raksasa.',
        'Pantau frekuensi tayang: jika frekuensi > 3x dan CTR turun, ganti materi iklan.'
      ],
      donts: [
        'JANGAN menaikkan budget lebih dari 30% per hari karena merusak algoritma optimasi.',
        'JANGAN menyimpulkan iklan gagal hanya dari CTR tanpa mengecek penjualan riil.'
      ]
    };
  }

  if (targetCategory === 'SaaS & Product') {
    const dropW1 = randInt(40, 55);
    const values = [100, 100 - dropW1, randInt(31, 35), randInt(25, 29), randInt(21, 24), randInt(16, 20), randInt(14, 18)];
    const labels = ["W0","W1","W2","W3","W4","W8","W12"];

    return {
      seed,
      category: 'SaaS & Product',
      chartType: 'line',
      title: `Kurva Retensi Pengguna: Titik Kritis Minggu Pertama`,
      xLabel: 'Minggu Sejak Daftar',
      yLabel: 'Pengguna Aktif (%)',
      labels,
      values,
      problem: `Aplikasi kehilangan ${dropW1}% pengguna baru hanya dalam 7 hari pertama (W0 ke W1). Setelah minggu ke-4, kurva mulai mendatar di angka ~15-20%. Di mana titik perbaikan paling penting?`,
      quickAnswer: `Fase paling kritis adalah 7 hari pertama (W0 ke W1). Pengguna yang tidak memahami nilai produk di minggu pertama akan langsung meninggalkan aplikasi.`,
      reasoning: `Bentuk kurva adalah L-Curve. Penurunan curam di awal adalah masalah pengalaman pertama (onboarding). Garis yang mendatar di W4-W12 (~15%) membuktikan adanya pengguna setia inti.`,
      daInsight: `Pengguna yang mencoba fitur utama di 48 jam pertama memiliki peluang bertahan 3.5x lebih tinggi di minggu ke-12.`,
      daAction: `1. Sederhanakan alur pendaftaran (maksimal 2-3 langkah).\n2. Buat panduan singkat saat pertama kali membuka aplikasi.\n3. Kirim notifikasi pengingat di hari ke-1, ke-3, dan ke-7.`,
      daKpi: ['Day-1 & Day-7 Retention', 'Activation Rate', 'Churn Rate W12'],
      dsAnalysis: `Mengikuti fungsi survival analysis (Kaplan-Meier curve). Risiko churn tertinggi ada di interval hari ke-0 sampai ke-7.`,
      dsAlgorithms: ['Kaplan-Meier Survival Curve', 'Cox Proportional Hazards', 'XGBoost Churn Predictor'],
      dsLibraries: ['lifelines', 'scikit-learn', 'statsmodels', 'matplotlib'],
      dos: [
        'Fokuskan 80% tenaga pada perbaikan pengalaman 7 hari pertama pemakaian.',
        'Pastikan kurva retensi mendatar sebagai bukti produk disukai pengguna setia.'
      ],
      donts: [
        'JANGAN buang uang untuk iklan pengguna baru jika retensi minggu pertamanya masih bocor.',
        'JANGAN menganggap orang yang sekadar login sebagai pengguna yang aktif bernilai.'
      ]
    };
  }

  // Healthcare fallback
  const labels = ["0-15m","15-30m","30-45m","45-60m","60-75m","75-90m","90-105m",">105m"];
  const p1 = randInt(330, 390);
  const p2 = randInt(380, 440);
  const p3 = randInt(180, 230);
  const p4 = randInt(90, 120);
  const p5 = randInt(45, 70);
  const p6 = randInt(20, 38);
  const p7 = randInt(10, 20);
  const p8 = randInt(4, 10);
  const values = [p1, p2, p3, p4, p5, p6, p7, p8];

  return {
    seed,
    category: 'Healthcare',
    chartType: 'bar',
    title: `Distribusi Waktu Tunggu UGD: Jebakan Angka Rata-Rata`,
    xLabel: 'Rentang Waktu Tunggu (Menit)',
    yLabel: 'Jumlah Pasien',
    labels,
    values,
    problem: `Waktu tunggu rata-rata pasien UGD tercatat 28 menit (tampak normal), namun pasien sering komplain antrian lama. Mengapa angka rata-rata menipu kenyataan sebenarnya?`,
    quickAnswer: `Distribusi data condong ke kanan (Right-Skewed). Mayoritas selesai cepat (<30 menit), namun ada ekor panjang pasien yang menunggu >60 menit yang memicu 90% komplain. Jangan pakai rata-rata (Mean), gunakan Persentil P90 / P95!`,
    reasoning: `Grafik bukan kurva lonceng simetris. Ekor kanan yang panjang menandakan ada hambatan (bottleneck) pada layanan lab darah atau rujukan dokter spesialis.`,
    daInsight: `Standar kepuasan layanan medis dinilai dari batas terburuk (P95), bukan performa rata-rata pasien umum.`,
    daAction: `1. Buat jalur cepat (Fast-Track) khusus pasien bergejala ringan.\n2. Tambah dokter jaga pada jam sibuk (pukul 17.00 - 21.00).\n3. Terapkan target maksimal tunggu lab darah di bawah 40 menit.`,
    daKpi: ['P90 & P95 Wait Time', 'Left Without Being Seen Rate', 'Door-to-Doctor Time'],
    dsAnalysis: `Data berdistribusi Gamma / Log-Normal. Uji parametrik biasa seperti t-test tidak valid; gunakan Teori Antrian (Queueing Theory).`,
    dsAlgorithms: ['Queueing Theory Simulation (M/M/c Model)', 'Kernel Density Estimation (KDE)', 'Gamma Parameter Fitting'],
    dsLibraries: ['scipy.stats', 'simpy', 'numpy', 'seaborn'],
    dos: [
      'Gunakan persentil P90 dan P95 saat menganalisis waktu tunggu antrian.',
      'Pisahkan antrian berdasarkan tingkat keparahan kondisi pasien.'
    ],
    donts: [
      'JANGAN bangga dengan rata-rata 25 menit jika ada pasien gawat yang tertahan berjam-jam.',
      'JANGAN berasumsi data antrian selalu berdistribusi normal.'
    ]
  };
}
