export const GLOSSARY = {
  outlier: {
    term: 'Outlier',
    def: 'Titik data yang jauh berbeda dari nilai-nilai lain dalam dataset. Bisa jadi anomali, kesalahan data, atau fenomena nyata yang menarik.',
  },
  tren: {
    term: 'Tren',
    def: 'Kecenderungan arah data dalam jangka panjang: naik, turun, atau datar. Berbeda dari fluktuasi jangka pendek.',
  },
  median: {
    term: 'Median',
    def: 'Nilai tengah ketika data diurutkan. Lebih tahan terhadap outlier dibanding mean (rata-rata).',
  },
  mean: {
    term: 'Mean',
    def: 'Rata-rata aritmetik. Dihitung dengan menjumlahkan semua nilai lalu dibagi jumlah data. Sensitif terhadap outlier.',
  },
  lonjakan: {
    term: 'Lonjakan (Spike)',
    def: 'Kenaikan tiba-tiba dan tajam pada suatu titik waktu, yang kemudian kembali ke nilai sebelumnya.',
  },
  musiman: {
    term: 'Pola Musiman',
    def: 'Variasi berulang dalam data yang terjadi pada interval waktu yang dapat diprediksi (harian, mingguan, tahunan).',
  },
  dekomposisi: {
    term: 'Dekomposisi Time Series',
    def: 'Memecah data time series menjadi komponen: tren, musiman, dan residual (sisa yang tidak dapat dijelaskan).',
  },
  forecast: {
    term: 'Forecast (Peramalan)',
    def: 'Prediksi nilai masa depan berdasarkan pola historis. Selalu memiliki tingkat ketidakpastian.',
  },
  retensi: {
    term: 'Retensi',
    def: 'Persentase pengguna/pelanggan yang tetap aktif setelah periode waktu tertentu. Metrik kunci kesehatan produk.',
  },
  cohort: {
    term: 'Cohort',
    def: 'Kelompok pengguna yang dimulai pada waktu yang sama (misal: mendaftar di bulan yang sama) dan dianalisis bersama.',
  },
  churn: {
    term: 'Churn',
    def: 'Pengguna/pelanggan yang berhenti menggunakan produk/layanan. Churn rate = persentase yang pergi dalam periode tertentu.',
  },
  'drop-off': {
    term: 'Drop-off',
    def: 'Titik dalam alur pengguna di mana sebagian besar orang berhenti atau keluar. Biasanya divisualisasikan sebagai funnel.',
  },
  'a/b test': {
    term: 'A/B Test',
    def: 'Eksperimen terkontrol di mana dua versi (A dan B) dibandingkan secara bersamaan untuk mengukur perbedaan efek.',
  },
  korelasi: {
    term: 'Korelasi',
    def: 'Hubungan statistik antara dua variabel. Positif = bergerak searah, negatif = berlawanan. Tidak membuktikan kausalitas!',
  },
  kausalitas: {
    term: 'Kausalitas',
    def: 'Hubungan sebab-akibat. Lebih kuat dari korelasi—membutuhkan eksperimen terkontrol atau desain penelitian khusus untuk dibuktikan.',
  },
  regresi: {
    term: 'Regresi',
    def: 'Metode statistik untuk memodelkan hubungan antara variabel dependen (Y) dan satu atau lebih variabel independen (X).',
  },
  confounder: {
    term: 'Confounder (Variabel Perancu)',
    def: 'Variabel ketiga yang berhubungan dengan X dan Y, sehingga menciptakan korelasi palsu antara X dan Y.',
  },
  ctr: {
    term: 'CTR (Click-Through Rate)',
    def: 'Persentase orang yang mengklik sebuah iklan/link dibanding total yang melihatnya. CTR = (Klik / Tayangan) × 100%.',
  },
  distribusi: {
    term: 'Distribusi',
    def: 'Pola sebaran nilai dalam dataset: bagaimana data tersebar, di mana pusatnya, seberapa lebar sebarannya.',
  },
  histogram: {
    term: 'Histogram',
    def: 'Grafik bar yang menampilkan distribusi frekuensi data kontinu. Berbeda dari bar chart biasa karena X-nya adalah rentang nilai.',
  },
  modus: {
    term: 'Modus',
    def: 'Nilai yang paling sering muncul dalam dataset. Bisa ada lebih dari satu modus.',
  },
  'standar deviasi': {
    term: 'Standar Deviasi (SD)',
    def: 'Ukuran sebaran data dari mean. SD kecil = data berkumpul dekat mean. SD besar = data tersebar luas.',
  },
  'kurva normal': {
    term: 'Kurva Normal (Bell Curve)',
    def: 'Distribusi simetris di mana mayoritas data berkumpul di tengah (mean) dan makin sedikit ke arah ekstrem.',
  },
  'unique visitors': {
    term: 'Unique Visitors',
    def: 'Jumlah individu berbeda yang mengunjungi website dalam periode tertentu, tidak peduli berapa kali mereka berkunjung.',
  },
  seo: {
    term: 'SEO (Search Engine Optimization)',
    def: 'Proses mengoptimalkan website agar muncul lebih tinggi di hasil mesin pencari organik (non-berbayar).',
  },
  'confounding factor': {
    term: 'Confounding Factor',
    def: 'Lihat Confounder. Variabel yang tidak diukur tapi mempengaruhi hubungan yang sedang diamati.',
  },
  kategorisasi: {
    term: 'Kategorisasi',
    def: 'Pengelompokan data ke dalam kategori-kategori yang berbeda untuk perbandingan.',
  },
  margin: {
    term: 'Margin (Profit)',
    def: 'Persentase keuntungan dari total pendapatan. Margin = (Laba / Pendapatan) × 100%.',
  },
  'average order value': {
    term: 'Average Order Value (AOV)',
    def: 'Rata-rata nilai per transaksi. AOV = Total Pendapatan / Jumlah Transaksi.',
  },
  normalisasi: {
    term: 'Normalisasi',
    def: 'Proses mengubah skala data agar dapat dibandingkan secara adil, misalnya membagi dengan jumlah item atau total.',
  },
  'reverse causality': {
    term: 'Reverse Causality',
    def: 'Situasi di mana hubungan sebab-akibat bisa bekerja ke dua arah. X menyebabkan Y, tapi Y juga bisa menyebabkan X.',
  },
  pearson: {
    term: 'Korelasi Pearson',
    def: 'Mengukur kekuatan dan arah hubungan linear antara dua variabel kontinu. Nilainya -1 sampai +1.',
  },
  spearman: {
    term: 'Korelasi Spearman',
    def: 'Mengukur korelasi berbasis peringkat (rank). Lebih tahan terhadap outlier dan data non-normal.',
  },
  engagement: {
    term: 'Engagement',
    def: 'Tingkat keterlibatan aktif pengguna dengan produk/konten (klik, komentar, durasi, dll).',
  },
};

export function getDefinition(term) {
  const key = term.toLowerCase();
  return GLOSSARY[key] || null;
}
