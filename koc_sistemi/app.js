/**
 * Dilek Koçluk - Öğrenci Koçluk, Haftalık Program & Deneme Sınavı Yanlış Analiz Sistemi
 * Tam fonksiyonel istemci taraflı uygulama motoru
 */

// ==========================================================================
// 1. VARSAYILAN VERİTABANI VE VERİ MODELİ
// ==========================================================================
const DAYS_OF_WEEK = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

const TYT_DEFAULT_SUBJECTS = ['Türkçe', 'Sosyal Bilgiler', 'Temel Matematik', 'Fen Bilimleri'];
const AYT_DEFAULT_SUBJECTS = ['AYT Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Edebiyat', 'Tarih-1', 'Coğrafya-1'];

const ALL_SUBJECT_OPTIONS = [
  'Matematik', 'Geometri', 'Fizik', 'Kimya', 'Biyoloji', 
  'Türkçe', 'Edebiyat', 'Tarih', 'Coğrafya', 'Felsefe/Din', 
  'Paragraf', 'Diğer'
];

const ERROR_REASONS = [
  'Bilgi Eksikliği',
  'Dikkat / İşlem Hatası',
  'Zaman / Yetişmedi',
  'Soru Kökü Yanlış Okundu',
  'Formül / Kural Unutuldu',
  'Diğer'
];

// ==========================================================================
// 1.1 TYT & AYT DETAYLI MÜFREDAT VERİTABANI (MEB / ÖSYM UYUMLU)
// ==========================================================================
const CURRICULUM_DATABASE = [
  // ==================== TYT TÜRKÇE ====================
  {
    id: 'tyt_turkce_1',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 1,
    topicName: 'Sözcükte ve Söz Öbeğinde Anlam',
    subtopics: [
      'Sözcükte Anlam Özellikleri (Gerçek, Yan, Mecaz, Terim Anlam, Deyim ve Atasözleri)',
      'Sözcükte Anlam İlişkileri (Anlamdaşlık, Yakın Anlamlılık, Somut-Soyut Anlam, Zıt Anlam, Genel-Özel Anlam)',
      'Sözcükte Anlam Olayları (Dolaylama, Ad Aktarması [Mecaz-ı Mürsel], Deyim Aktarması, Kişileştirme)',
      'Sözcük Öbeğinde Anlam (Altı Çizili Sözün Cümleye Kattığı Anlam)'
    ]
  },
  {
    id: 'tyt_turkce_2',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 2,
    topicName: 'Sözcük Düzeyinde Anlatım Bozuklukları (Bağlaşıklık)',
    subtopics: [
      'Yanlış Anlamda Kullanılan Sözcükler',
      'Gereksiz Kullanılan Sözcükler (Duruluk)',
      'Anlamca Çelişen Sözcüklerin Bir Arada Kullanılması',
      'Yerinde Kullanılmayan Sözcükler (Sözcüğün Yanlış Yerde Kullanımı)',
      'Deyimlerin ve Atasözlerinin Yanlış Kullanılması',
      'Tamlama Yanlışlıkları (Ad ve Sıfat Tamlamalarının Yanlış Oluşumu)'
    ]
  },
  {
    id: 'tyt_turkce_3',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 3,
    topicName: 'Cümlede Anlam ve Yorumu',
    subtopics: [
      'Anlamdaş ve Yakın Anlamlı Yargılar',
      'Öznel ve Nesnel Yargılar',
      'Neden-Sonuç, Amaç-Sonuç, Koşul-Sonuç Cümleleri',
      'Tanım, İstek, Öneri, Yadsıma, Varsayım, Olasılık, Eleştiri Cümleleri',
      'Dolaylı ve Doğrudan Anlatım Özelliği Olan Cümleler',
      'Eksik Cümle Tamamlama ve Cümle Oluşturma'
    ]
  },
  {
    id: 'tyt_turkce_4',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 4,
    topicName: 'Sözcükte Yapı ve Ekler',
    subtopics: [
      'Sözcükte Kök (Ad Kökleri, Eylem Kökleri, Sesteş ve Ortak Kökler)',
      'Ekler (Yapım Ekleri, Çekim Ekleri, Sözcük Türetme Yolları)',
      'Yapılarına Göre Sözcükler (Basit, Türemiş, Birleşik Sözcükler)'
    ]
  },
  {
    id: 'tyt_turkce_5',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 5,
    topicName: 'Anlatım Türleri ve Düşünceyi Geliştirme Yolları',
    subtopics: [
      'Anlatım Biçimleri (Açıklayıcı, Tartışmacı, Betimleyici, Öyküleyici Anlatım)',
      'Düşünceyi Geliştirme Yolları (Tanımlama, Örnekleme, Karşılaştırma, Tanık Gösterme, Sayısal Verilerden Yararlanma)',
      'Anlatım İlkeleri (Yalınlık, Duruluk, Doğallık, Akıcılık, Özgünlük, Yoğunluk)'
    ]
  },
  {
    id: 'tyt_turkce_6',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 6,
    topicName: 'Paragrafta Anlam ve Yapı',
    subtopics: [
      'Paragrafta Ana Düşünce ve Konu',
      'Yardımcı Düşünceler ve Olumsuz Soru Kökleri (Değinilmemiştir / Çıkarılamaz)',
      'Paragrafın Yapısı (Giriş, Gelişme, Sonuç Cümleleri)',
      'Düşüncenin Akışını Bozan Cümle & Paragrafı İkiye Bölme',
      'Paragrafta Boşluk Doldurma ve Paragraf Tamamlama'
    ]
  },
  {
    id: 'tyt_turkce_7',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 7,
    topicName: 'Ses Bilgisi',
    subtopics: [
      'Ünlü Düşmesi, Ünlü Daralması, Ünlü Türemesi',
      'Ünsüz Yumuşaması (Değişimi), Ünsüz Benzeşmesi (Sertleşmesi), Ünsüz Düşmesi ve Türemesi',
      'Kaynaştırma Harfleri, Ulama, Büyük ve Küçük Ünlü Uyumu'
    ]
  },
  {
    id: 'tyt_turkce_8',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 8,
    topicName: 'Yazım Kuralları',
    subtopics: [
      'Büyük Harflerin Kullanıldığı Yerler',
      'Sayıların, Tarihlerin ve Kısaltmaların Yazımı',
      '"de / da", "ki", "mi" Ek ve Bağlaçlarının Yazımı',
      'Birleşik Sözcüklerin ve İkilemelerin Yazımı'
    ]
  },
  {
    id: 'tyt_turkce_9',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 9,
    topicName: 'Noktalama İşaretleri',
    subtopics: [
      'Nokta, Virgül, Noktalı Virgül ve İki Nokta Kullanımı',
      'Üç Nokta, Soru İşareti, Ünlem İşareti',
      'Tırnak İşareti, Kısa ve Uzun Çizgi, Yay Ayraç ve Kesme İşareti'
    ]
  },
  {
    id: 'tyt_turkce_10',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 10,
    topicName: 'İsimler (Adlar), Sıfatlar (Ön Adlar) ve Tamlamalar',
    subtopics: [
      'İsim Çeşitleri (Varlıklara Verilişine, Maddelerine ve Sayılarına Göre)',
      'İsim Tamlamaları (Belirtili, Belirtisiz, Zincirleme)',
      'Niteleme ve Belirtme Sıfatları (İşaret, Sayı, Belgisiz, Soru)',
      'Sıfat Tamlamaları ve Adlaşmış Sıfat'
    ]
  },
  {
    id: 'tyt_turkce_11',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 11,
    topicName: 'Zamirler (Adıllar) ve Zarflar (Belirteçler)',
    subtopics: [
      'Kişi, İşaret, Belgisiz ve Soru Zamirleri, Dönüşlülük Zamiri, Ek Halindeki Zamirler',
      'Durum, Zaman, Miktar (Azlık-Çokluk), Yer-Yön ve Soru Zarfları'
    ]
  },
  {
    id: 'tyt_turkce_12',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 12,
    topicName: 'Edat (İlgeç), Bağlaç ve Ünlem',
    subtopics: [
      'Edatların Cümleye Kattığı Anlamlar (Gibi, İçin, Kadar, Göre, İle, Rağmen vb.)',
      'Bağlaçların Görevleri ve Kullanımı (Ve, Ama, Fakat, Çünkü, Ya Da, Hem... Hem... vb.)',
      'Ünlemler ve Seslenme Bildiren Sözcükler'
    ]
  },
  {
    id: 'tyt_turkce_13',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 13,
    topicName: 'Fiiller (Eylemler), Ek Fiil ve Anlam Kayması',
    subtopics: [
      'Haber (Bildirme) ve Dilek (Tasarlama) Kipleri',
      'Basit Zamanlı ve Birleşik Zamanlı Fiiller (Hikaye, Rivayet, Şart)',
      'Ek Fiilin Görevleri ve Cümleye Kattığı Anlamlar',
      'Fiillerde Anlam (Zaman) Kayması'
    ]
  },
  {
    id: 'tyt_turkce_14',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 14,
    topicName: 'Fiilimsiler (Eylemsiler)',
    subtopics: [
      'İsim-Fiil (Mastar: -ma, -ış, -mak)',
      'Sıfat-Fiil (Ortaç: -an, -ası, -mez, -ar, -dik, -ecek, -miş)',
      'Zarf-Fiil (Bağ-Fiil: -ken, -alı, -esiye, -meden, -erek, -dıkça vb.)'
    ]
  },
  {
    id: 'tyt_turkce_15',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 15,
    topicName: 'Fiilde Çatı',
    subtopics: [
      'Öznesine Göre Fiil Çatıları (Etken, Edilgen, Dönüşlü, İşteş)',
      'Nesnesine Göre Fiil Çatıları (Geçişli, Geçişsiz, Oldurgan, Ettirgen)'
    ]
  },
  {
    id: 'tyt_turkce_16',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 16,
    topicName: 'Cümlenin Ögeleri',
    subtopics: [
      'Temel Ögeler (Yüklem ve Özne [Gerçek, Gizli, Sözde])',
      'Yardımcı Ögeler (Nesne [Belirtili/Belirtisiz], Dolaylı Tümleç [Yer Tamlayıcısı], Zarf Tümleci)',
      'Cümle Dışı Unsurlar, Ara Söz ve Ara Cümle, Vurgulanan Öge'
    ]
  },
  {
    id: 'tyt_turkce_17',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 17,
    topicName: 'Cümle Türleri',
    subtopics: [
      'Yüklemin Türüne Göre (İsim / Fiil Cümlesi)',
      'Yüklemin Yerine Göre (Kurallı, Devrik, Eksiltili Cümle)',
      'Anlamlarına Göre (Olumlu, Olumsuz, Soru, Ünlem Cümlesi)',
      'Yapılarına Göre Cümleler (Basit, Birleşik [Girişik, Şartlı, Ki\'li, İç İçe], Sıralı, Bağlı Cümle)'
    ]
  },
  {
    id: 'tyt_turkce_18',
    examType: 'TYT',
    subject: 'Türkçe',
    orderNo: 18,
    topicName: 'Cümle Düzeyinde Anlatım Bozuklukları (Bağdaşıklık)',
    subtopics: [
      'Özne - Yüklem Uyumsuzluğu (Tekillik-Çoğulluk, Kişi, Olumluluk-Olumsuzluk)',
      'Öge Eksiklikleri (Nesne, Dolaylı Tümleç, Zarf Tümleci, Yüklem Eksikliği)',
      'Ek Fiil ve Fiilimsi Uyumsuzlukları',
      'Çatı Uyuşmazlığı'
    ]
  },

  // ==================== TYT MATEMATİK ====================
  {
    id: 'tyt_mat_1',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 1,
    topicName: 'Temel Kavramlar & Sayı Kümeleri',
    subtopics: [
      'Rakam, Doğal, Tam, Rasyonel, İrrasyonel ve Gerçel Sayılar',
      'Tek ve Çift Sayılar, Pozitif ve Negatif Sayılar',
      'Asal Sayılar, Aralarında Asal Sayılar ve Faktöriyel Kavramı',
      'Ardışık Sayılar ve Terim Sayısı / Toplam Formülleri'
    ]
  },
  {
    id: 'tyt_mat_2',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 2,
    topicName: 'Sayı Basamakları ve Çözümleme',
    subtopics: [
      'Basamak Değeri ve Sayı Değeri',
      'İki, Üç ve Dört Basamaklı Sayıların Çözümlenmesi (10a+b vb.)',
      'Basamak Analizi Problemleri ve Rakamları Farklı Sayı Kurguları'
    ]
  },
  {
    id: 'tyt_mat_3',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 3,
    topicName: 'Bölme ve Bölünebilme Kuralları',
    subtopics: [
      'Bölme Algoritması (Bölünen = Bölen x Bölüm + Kalan, Kalan < Bölen)',
      '2, 3, 4, 5, 8, 9, 10, 11 ile Bölünebilme Kuralları',
      'Aralarında Asal Çarpanlara Ayrılan Sayılarla Bölünebilme (6, 12, 15, 18, 30, 36, 45)'
    ]
  },
  {
    id: 'tyt_mat_4',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 4,
    topicName: 'Asal Çarpanlara Ayırma, EBOB - EKOK',
    subtopics: [
      'Pozitif Bölen Sayısı, Tam Bölen Sayısı ve Asal Olmayan Bölenler',
      'EBOB (En Büyük Ortak Bölen) ve EKOK (En Küçük Ortak Kat) Özellikleri',
      'Aralarında Asal Sayıların EBOB/EKOK Bağıntıları',
      'EBOB - EKOK Günlük Hayat Problemleri ve Periyodik Tekrar Durumları'
    ]
  },
  {
    id: 'tyt_mat_5',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 5,
    topicName: 'Rasyonel ve Ondalık Sayılar',
    subtopics: [
      'Basit, Bileşik ve Tam Sayılı Kesirler',
      'Rasyonel Sayılarda Dört İşlem ve İşlem Önceliği',
      'Rasyonel Sayılarda Sıralama',
      'Devirli Ondalık Sayılar ve Rasyonel Sayıya Çevirme'
    ]
  },
  {
    id: 'tyt_mat_6',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 6,
    topicName: 'Basit Eşitsizlikler',
    subtopics: [
      'Aralık Kavramı (Açık, Kapalı, Yarı Açık Aralık)',
      'Eşitsizliklerin Özellikleri (Toplama, Çıkarma, Pozitif/Negatif Sayı ile Çarpma-Bölme)',
      'Taraf Tarafa Toplama ve Kuvvet Alma Kuralları',
      'Birinci Dereceden Bir Bilinmeyenli Eşitsizlikler'
    ]
  },
  {
    id: 'tyt_mat_7',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 7,
    topicName: 'Mutlak Değer',
    subtopics: [
      'Mutlak Değerin Tanımı ve Geometrik Yorumu (Uzaklık)',
      'Mutlak Değerin Temel Özellikleri (|x.y| = |x|.|y| vb.)',
      'Mutlak Değerli Denklemler',
      'Mutlak Değerli Eşitsizlikler (|f(x)| < a, |f(x)| > a)'
    ]
  },
  {
    id: 'tyt_mat_8',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 8,
    topicName: 'Üslü İfadeler',
    subtopics: [
      'Üslü Sayıların Tanımı ve Temel Kuralları',
      'Üslü İfadelerde Dört İşlem',
      'Üslü Denklemler ve Taban/Üs Eşitlikleri',
      'Üslü Sayılarda Sıralama ve Basamak Sayısı Bulma'
    ]
  },
  {
    id: 'tyt_mat_9',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 9,
    topicName: 'Köklü İfadeler',
    subtopics: [
      'Kök Derecesi ve Tanım Kümesi (Çift/Tek Derece)',
      'Kök İçine ve Dışına Çıkarma',
      'Köklü Sayılarda Dört İşlem ve Eşlenik ile Çarpma',
      'İç İçe Kökler ve Özel Kök Kalıpları √(a ± 2√b)'
    ]
  },
  {
    id: 'tyt_mat_10',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 10,
    topicName: 'Çarpanlara Ayırma ve Özdeşlikler',
    subtopics: [
      'Ortak Çarpan Parantezine Alma ve Gruplandırma Yöntemi',
      'İki Kare Farkı Özdeşliği: a² - b² = (a-b)(a+b)',
      'Tam Kare Özdeşlikleri: (a ± b)², (a + b + c)²',
      'İki Küp Toplamı ve Farkı: a³ ± b³',
      'Rasyonel İfadelerin Sadeleştirilmesi'
    ]
  },
  {
    id: 'tyt_mat_11',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 11,
    topicName: 'Oran - Orantı',
    subtopics: [
      'Oran ve Orantının Özellikleri',
      'Doğru Orantı, Ters Orantı ve Bileşik Orantı',
      'Aritmetik Ortalama, Geometrik Ortalama ve Harmonik Ortalama'
    ]
  },
  {
    id: 'tyt_mat_12',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 12,
    topicName: 'Sayı ve Kesir Problemleri',
    subtopics: [
      'Denklem Kurma ve Değişken Belirleme',
      'Kuyruk, Mum, Merdiven, Bilet, Adım Problemleri',
      'Kesir Modelleme ve Kalan Parça Problemleri'
    ]
  },
  {
    id: 'tyt_mat_13',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 13,
    topicName: 'Yaş Problemleri',
    subtopics: [
      'Kişiler Arasındaki Yaş Farkının Sabitliği',
      'Geçmiş ve Gelecek Yıllardaki Yaş İlişkileri',
      'Yaş Ortalaması Değişimleri'
    ]
  },
  {
    id: 'tyt_mat_14',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 14,
    topicName: 'İşçi - Emek Problemleri',
    subtopics: [
      'Birim Zamanda Yapılan İş Oranı (1/t formülü)',
      'Birlikte Çalışma ve İşi Bırakma Durumları',
      'İşçi Sayısı, Çalışma Süresi ve Verim İlişkisi'
    ]
  },
  {
    id: 'tyt_mat_15',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 15,
    topicName: 'Hız ve Hareket Problemleri',
    subtopics: [
      'Temel Hareket Bağıntısı: Yol = Hız x Zaman',
      'Zıt Yönde ve Aynı Yönde Hareket (Karşılaşma ve Yetişme Süreleri)',
      'Dairesel Pistte Hareket',
      'Nehir / Akıntı ve Rüzgar Problemleri, Tren / Tünel Problemleri',
      'Ortalama Hız Formülü'
    ]
  },
  {
    id: 'tyt_mat_16',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 16,
    topicName: 'Yüzde, Kâr - Zarar ve İskonto Problemleri',
    subtopics: [
      'Yüzde Hesapları ve Yüzde Değişimleri',
      'Maliyet, Satış, Etiket Fiyatı, Kâr ve Zarar Bağıntıları',
      'İndirim (İskonto), Zam ve Enflasyon Problemleri'
    ]
  },
  {
    id: 'tyt_mat_17',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 17,
    topicName: 'Karışım Problemleri',
    subtopics: [
      'Madde Oranı ve Yüzdesi (Saf Madde / Toplam Karışım)',
      'Saf Su / Saf Madde Ekleme ve Buharlaştırma',
      'Farklı Yüzdelere Sahip Karışımların Birleştirilmesi'
    ]
  },
  {
    id: 'tyt_mat_18',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 18,
    topicName: 'Grafik ve Tablo Problemleri',
    subtopics: [
      'Daire Grafiği (Açı Dağılımı: 360°)',
      'Çizgi ve Sütun Grafikleri Okuma ve Yorumlama',
      'Tablo Okuma ve Yeni Nesil Kurgulu Problemler'
    ]
  },
  {
    id: 'tyt_mat_19',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 19,
    topicName: 'Mantık',
    subtopics: [
      'Önerme Kavramı ve Doğruluk Değeri',
      'Mantık Bağlaçları: Ve (∧), Veya (∨), İse (⇒), Ancak ve Ancak (⇔), Ya da (⊻)',
      'Totoloji ve Çelişki, De Morgan Kuralları',
      'Açık Önermeler ve Niceleyiciler (Her [∀], Bazı [∃])'
    ]
  },
  {
    id: 'tyt_mat_20',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 20,
    topicName: 'Kümeler ve Kartezyen Çarpım',
    subtopics: [
      'Küme Gösterimleri (Liste, Ortak Özellik, Venn Şeması)',
      'Alt Küme ve Öz Alt Küme Sayısı (2ⁿ formülü)',
      'Kümelerde İşlemler (Kesişim, Birleşim, Fark, Evrensel ve Tümleme)',
      'Küme Problemleri (Dil Bilenler, Spor Yapanlar vb.)',
      'Kartezyen Çarpım ve Grafiği: s(A x B) = s(A) . s(B)'
    ]
  },
  {
    id: 'tyt_mat_21',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 21,
    topicName: 'Fonksiyonlar (Temel Düzey)',
    subtopics: [
      'Fonksiyon Tanımı, Tanım, Değer ve Görüntü Kümeleri',
      'Fonksiyon Türleri (Birebir, Örten, İçine, Sabit, Birim [Özdeş], Doğrusal, Tek ve Çift)',
      'Fonksiyonlarda Dört İşlem',
      'Bileşke Fonksiyon: (f o g)(x)',
      'Bir Fonksiyonun Tersi: f⁻¹(x) ve Grafik Yorumu'
    ]
  },
  {
    id: 'tyt_mat_22',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 22,
    topicName: 'Polinomlar (Temel Düzey)',
    subtopics: [
      'Polinom Tanımı, Derecesi, Başkatsayısı ve Sabit Terimi',
      'Katsayılar Toplamı [P(1)] ve Sabit Terim [P(0)] Bulma',
      'Polinomlarda Dört İşlem ve Bakkal Bölmesi',
      'Polinomlarda Kalan Bulma (x-a ile Bölümünden Kalan)'
    ]
  },
  {
    id: 'tyt_mat_23',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 23,
    topicName: 'Sayma Kuralları, Permütasyon ve Kombinasyon',
    subtopics: [
      'Toplama ve Çarpma Yoluyla Sayma',
      'Permütasyon (Dizilim / Sıralama) ve Tekrarlı Permütasyon',
      'Kombinasyon (Seçim / Gruplama) Özellikleri: C(n,r)',
      'Geometrik Kombinasyon (Nokta, Doğru, Üçgen, Dörtgen Sayısı)'
    ]
  },
  {
    id: 'tyt_mat_24',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 24,
    topicName: 'Binom Açılımı',
    subtopics: [
      'Pascal Üçgeni ve Binom Katsayıları',
      '(x + y)ⁿ Açılımında Genel Terim Formülü: C(n,r).xⁿ⁻ʳ.yʳ',
      'Baştan/Sondan Terim, Sabit Terim ve Ortanca Terim Bulma'
    ]
  },
  {
    id: 'tyt_mat_25',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 25,
    topicName: 'Olasılık (Temel Düzey)',
    subtopics: [
      'Örnek Uzay, Olay, İmkansız Olay ve Kesin Olay',
      'Eş Olası Örnek Uzayda Bir Olayın Olasılığı: P(A) = s(A)/s(E)',
      'Ayrık ve Ayrık Olmayan Olayların Olasılığı: P(A ∪ B)',
      'Koşullu Olasılık Girişi ve Bağımsız Olaylar'
    ]
  },
  {
    id: 'tyt_mat_26',
    examType: 'TYT',
    subject: 'Temel Matematik',
    orderNo: 26,
    topicName: 'İstatistik ve Veri Analizi',
    subtopics: [
      'Merkezi Eğilim Ölçüleri: Aritmetik Ortalama, Medyan (Ortanca), Mod (Tepe Değer)',
      'Merkezi Yayılım Ölçüleri: Açıklık (Ranj), Çeyrekler Açıklığı, Standart Sapma',
      'Kutu Grafiği ve Serpme Grafiği Yorumlama'
    ]
  },

  // ==================== TYT GEOMETRİ ====================
  {
    id: 'tyt_geo_1',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 1,
    topicName: 'Doğruda ve Üçgende Açılar',
    subtopics: [
      'Tümler ve Bütünler Açılar, Paralel Doğrularda Açılar (Z, U, M, Kalem Ucu Kuralları)',
      'Üçgende İç ve Dış Açılar Toplamı',
      'Açıortay Bağıntıları ve İki Açıortay Arasındaki Açı Formülleri'
    ]
  },
  {
    id: 'tyt_geo_2',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 2,
    topicName: 'Özel Üçgenler (Dik, İkizkenar, Eşkenar)',
    subtopics: [
      'Pisagor Bağıntısı ve Özel Dik Üçgenler (3-4-5, 5-12-13, 8-15-17, 7-24-25)',
      'Öklid Bağıntıları (h² = p.k, b² = k.a, c² = p.a)',
      '30-60-90, 45-45-90, 30-30-120, 15-75-90 Üçgenleri',
      'İkizkenar Üçgen (YAKİ kuralı) ve Eşkenar Üçgen Alan/Yükseklik Bağıntıları'
    ]
  },
  {
    id: 'tyt_geo_3',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 3,
    topicName: 'Açıortay, Kenarortay ve Açı-Kenar Bağıntıları',
    subtopics: [
      'İç Açıortay ve Dış Açıortay Teoremleri',
      'Kenarortay ve Ağırlık Merkezi (G: 1\'e 2 oranı), Muhteşem Üçlü',
      'Üçgen Eşitsizliği (|b-c| < a < b+c) ve Büyük Açı Karşısında Büyük Kenar Kuralı'
    ]
  },
  {
    id: 'tyt_geo_4',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 4,
    topicName: 'Üçgende Eşlik, Benzerlik ve Alan',
    subtopics: [
      'A.A., K.A.K., K.K.K. Benzerliği, Temel Orantı ve Thales Teoremleri',
      'Benzerlik Oranı (k) ve Alanlar Oranı (k²)',
      'Üçgende Alan Formülleri (Taban x Yükseklik / 2, Sinüslü Alan, Heron)',
      'Yükseklikleri veya Tabanları Eşit Üçgenlerde Alan Oranlama'
    ]
  },
  {
    id: 'tyt_geo_5',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 5,
    topicName: 'Çokgenler ve Dörtgenler',
    subtopics: [
      'Düzgün Çokgenler (İç/Dış Açı, Düzgün Beşgen, Düzgün Altıgen Alan ve Köşegen Özellikleri)',
      'Genel Dörtgen Özellikleri ve Köşegen Bağıntıları',
      'Yamuk (İkizkenar ve Dik Yamuk, Orta Taban, Alan)',
      'Paralelkenar, Eşkenar Dörtgen, Dikdörtgen, Kare ve Deltoid Özellikleri ve Alanları'
    ]
  },
  {
    id: 'tyt_geo_6',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 6,
    topicName: 'Çember ve Daire',
    subtopics: [
      'Çemberde Açılar (Merkez, Çevre, Teğet-Kiriş, İç ve Dış Açılar)',
      'Çemberde Kiriş ve Teğet Uzunluk Özellikleri',
      'Dairenin Çevresi ve Alanı, Daire Diliminin Alanı ve Yay Uzunluğu'
    ]
  },
  {
    id: 'tyt_geo_7',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 7,
    topicName: 'Katı Cisimler (Uzay Geometri)',
    subtopics: [
      'Dik Prizmalar (Küp, Dikdörtgenler Prizması, Üçgen/Altıgen Prizma Alan ve Hacimleri)',
      'Dik Dairesel Silindir (Yanal Alan, Toplam Alan, Hacim)',
      'Piramitler ve Dik Dairesel Koni (Ana Doğru, Yanal Alan, Hacim)',
      'Küre (Yüzey Alanı: 4πr², Hacim: 4/3 πr³)'
    ]
  },
  {
    id: 'tyt_geo_8',
    examType: 'TYT',
    subject: 'Geometri',
    orderNo: 8,
    topicName: 'Analitik Geometri (Nokta ve Doğru)',
    subtopics: [
      'Noktanın Analitik İncelenmesi (Koordinat Sistemi, İki Nokta Arası Uzaklık, Orta Nokta)',
      'Doğrunun Eğimi ve Eğim Açısı',
      'Doğru Denklemleri (Eğimi ve Bir Noktası Bilinen Doğru, İki Noktadan Geçen Doğru)',
      'Paralel ve Dik Doğruların Eğim İlişkisi, Noktanın Doğruya Uzaklığı'
    ]
  },

  // ==================== TYT FİZİK ====================
  {
    id: 'tyt_fiz_1',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 1,
    topicName: 'Fizik Bilimine Giriş & Fiziksel Nicelikler',
    subtopics: [
      'Fiziğin Alt Dalları (K-A-M-Y-O-N-E-T)',
      'Temel ve Türetilmiş Büyüklükler (K-I-S-A-M-U-Z)',
      'Skaler ve Vektörel Büyüklükler, Bilimsel Araştırma Merkezleri (TÜBİTAK, CERN, ASELSAN, NASA, ESA)'
    ]
  },
  {
    id: 'tyt_fiz_2',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 2,
    topicName: 'Madde ve Özellikleri',
    subtopics: [
      'Kütle, Hacim ve Özkütle (d = m/V), Karışımların Özkütlesi',
      'Katıların Dayanıklılığı (Boyutlar Arası İlişki: Kesit Alanı / Hacim)',
      'Adezyon ve Kohezyon Kuvvetleri',
      'Yüzey Gerilimi ve Kılcallık Olayı'
    ]
  },
  {
    id: 'tyt_fiz_3',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 3,
    topicName: 'Sıvıların Kaldırma Kuvveti ve Basınç',
    subtopics: [
      'Katı Basıncı ve Piezoelektrik Olayı',
      'Durgun Sıvı Basıncı (P = h.d.g), Sıvı Basınç Kuvveti ve U Boruları',
      'Pascal Prensibi ve Su Cendereleri, Gaz Basıncı (Barometre ve Manometre)',
      'Arşimet Prensibi ve Sıvıların Kaldırma Kuvveti (F_k = V_batan . d_sıvı . g), Yüzme-Askıda Kalma-Batma Durumları'
    ]
  },
  {
    id: 'tyt_fiz_4',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 4,
    topicName: 'Isı, Sıcaklık ve Genleşme',
    subtopics: [
      'Sıcaklık, İç Enerji ve Termometre Çeşitleri / Dönüşümleri',
      'Özgül Isı (c), Isı Sığası (C = m.c) ve Isı Alışverişi (Q = m.c.ΔT)',
      'Hal Değişimi (Q = m.L) ve Isıl Denge',
      'Isı İletim Yolları (İletim, Konveksiyon, Işıma) ve Isı Yalıtımı',
      'Katı, Sıvı ve Gazlarda Genleşme, Suyun Özel Durumu (+4°C)'
    ]
  },
  {
    id: 'tyt_fiz_5',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 5,
    topicName: 'Hareket ve Kuvvet',
    subtopics: [
      'Konum, Yer Değiştirme, Alınan Yol, Sürat ve Hız',
      'Düzgün Doğrusal Hareket ve Konum-Zaman / Hız-Zaman Grafikleri',
      'İvme Kavramı ve İvmeli Hareket Grafikleri',
      'Kuvvet Çeşitleri ve Newton\'un Hareket Yasaları (Eylemsizlik, Temel Yasa F=m.a, Etki-Tepki)',
      'Statik ve Kinetik Sürtünme Kuvveti (F_s = k.N)'
    ]
  },
  {
    id: 'tyt_fiz_6',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 6,
    topicName: 'İş, Güç, Enerji ve Mekanik Enerjinin Korunumu',
    subtopics: [
      'Fiziksel İş (W = F.Δx) ve Güç (P = W/t)',
      'Öteleme Kinetik Enerjisi (E_k = 1/2 m.v²) ve Yer Çekimi Potansiyel Enerjisi (E_p = m.g.h)',
      'Esneklik Potansiyel Enerjisi (E_p = 1/2 k.x²)',
      'Mekanik Enerjinin Korunumu ve Sürtünmeli Sistemlerde Enerji Kaybı',
      'Verim ve Yenilenebilir / Yenilenemez Enerji Kaynakları'
    ]
  },
  {
    id: 'tyt_fiz_7',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 7,
    topicName: 'Elektrostatik',
    subtopics: [
      'Elektrik Yükleri ve Özellikleri',
      'Elektriklenme Çeşitleri (Sürtünme, Dokunma ve Etki ile Elektriklenme)',
      'Elektroskop Yapısı ve Yük Tespiti',
      'Coulomb Kuvveti (F = k.q₁.q₂/d²) ve İletken Kürelerde Yük Dağılımı (Faraday Kafesi)'
    ]
  },
  {
    id: 'tyt_fiz_8',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 8,
    topicName: 'Elektrik Akımı, Devreler ve Manyetizma',
    subtopics: [
      'Elektrik Akımı, Potansiyel Fark ve Direnç (Ohm Yasası: V = I.R)',
      'Dirençlerin Seri ve Paralel Bağlanması, Eşdeğer Direnç',
      'Voltmetre ve Ampermetre Bağlama Kuralları',
      'Üreteçlerin Bağlanması, Elektriksel Enerji ve Güç (P = I².R = V.I), Lamba Parlaklıkları',
      'Mıknatıslar, Manyetik Alan Çizgileri ve Akım Taşıyan Düz Telin Manyetik Alanı'
    ]
  },
  {
    id: 'tyt_fiz_9',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 9,
    topicName: 'Dalgalar',
    subtopics: [
      'Temel Dalga Değişkenleri (Periyot, Frekans, Dalga Boyu, Hız: v = λ.f, Genlik)',
      'Yay Dalgaları (Atma, Yansıma, İletilme, Girişim)',
      'Su Dalgaları (Düzlem ve Parabolik Engellerden Yansıma, Derinlik ve Kırılma, Stroboskop)',
      'Ses Dalgaları (Tını, Yükseklik/Frekans, Şiddet/Genlik, Rezonans, Yankı) ve Deprem Dalgaları'
    ]
  },
  {
    id: 'tyt_fiz_10',
    examType: 'TYT',
    subject: 'Fizik',
    orderNo: 10,
    topicName: 'Optik',
    subtopics: [
      'Aydınlanma Şiddeti, Işık Akısı ve Noktasal Işık Kaynağı',
      'Gölge ve Yarı Gölge Oluşumu, Güneş ve Ay Tutulmaları',
      'Düzlem Aynada Yansıma ve Görüntü Özellikleri (Görüş Alanı)',
      'Küresel Aynalar (Çukur ve Tümsek Aynada Özel Işınlar ve Görüntü)',
      'Işığın Kırılması, Snell Yasası, Tam Yansıma ve Sınır Açısı, Görünür Derinlik',
      'Mercekler (İnce ve Kalın Kenarlı Merceklerde Özel Işınlar ve Görüntü) ve Renk Kuramı'
    ]
  },

  // ==================== TYT KİMYA ====================
  {
    id: 'tyt_kim_1',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 1,
    topicName: 'Kimya Bilimi ve Güvenlik',
    subtopics: [
      'Simyadan Kimyaya Geçiş ve Önemli Simyacılar / Kimyacılar',
      'Kimya Disiplinleri ve Kimyacıların Çalışma Alanları',
      'Elementler, Bileşikler ve Yaygın Adları',
      'Kimya Laboratuvarında Güvenlik Kuralları ve Güvenlik Uyarı İşaretleri'
    ]
  },
  {
    id: 'tyt_kim_2',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 2,
    topicName: 'Atom ve Periyodik Sistem',
    subtopics: [
      'Atom Modelleri (Dalton, Thomson, Rutherford, Bohr)',
      'Atomun Yapısı (Proton, Nötron, Elektron, İzotop, İzoton, İzobar, İzoelektronik Tanecikler)',
      'Periyodik Sistem ve Grup/Periyot Bulma',
      'Periyodik Özelliklerin Değişimi (Atom Yarıçapı, İyonlaşma Enerjisi, Elektron İlgisi, Elektronegatiflik, Metalik/Ametalik Karakter)'
    ]
  },
  {
    id: 'tyt_kim_3',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 3,
    topicName: 'Kimyasal Türler Arası Etkileşimler',
    subtopics: [
      'Kimyasal Türler (Atom, Molekül, İyon, Radikal)',
      'Güçlü Etkileşimler (İyonik Bağ, Kovalent Bağ [Apolar/Polar], Metalik Bağ)',
      'Lewis Elektron Nokta Formülleri ve İyonik/Kovalent Bileşiklerin Adlandırılması',
      'Zayıf Etkileşimler (Van der Waals Kuvvetleri [Dipol-Dipol, İndüklenmiş Dipol / London] ve Hidrojen Bağı)',
      'Fiziksel ve Kimyasal Değişimler'
    ]
  },
  {
    id: 'tyt_kim_4',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 4,
    topicName: 'Maddenin Halleri',
    subtopics: [
      'Maddenin Katı Hali (Amorf Katılar, Kristal Katılar: İyonik, Moleküler, Kovalent, Metalik)',
      'Sıvılar (Viskozite, Buharlaşma Hızı, Denge Buhar Basıncı, Kaynama Noktası, Bağıl Nem)',
      'Gazlar (Temel Özellikleri, Basınç, Hacim, Sıcaklık, Mol Bağıntıları)',
      'Plazma Hali ve Özellikleri, Hal Değişim Grafikleri'
    ]
  },
  {
    id: 'tyt_kim_5',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 5,
    topicName: 'Doğa ve Kimya',
    subtopics: [
      'Su ve Hayat, Suyun Önemi, Sert ve Yumuşak Su Özellikleri',
      'Çevre Kimyası: Hava Kirleticileri (Sera Gazları, Asit Yağmurları, Ozon Tabakası)',
      'Toprak ve Su Kirleticileri ve Çevre Koruma Bilinci'
    ]
  },
  {
    id: 'tyt_kim_6',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 6,
    topicName: 'Kimyanın Temel Kanunları ve Hesaplamalar',
    subtopics: [
      'Kütlenin Korunumu Yasası (Lavoisier)',
      'Sabit Oranlar Yasası (Proust) ve Katlı Oranlar Yasası (Dalton)',
      'Mol Kavramı (Avogadro Sayısı, Bağıl Atom Kütlesi, Mol Kütlesi, NK\'da Gaz Hacmi)',
      'Kimyasal Tepkime Denklemleri ve Denkleştirme',
      'Kimyasal Hesaplamalar (Mol, Kütle, Hacim, Sınırlayıcı Bileşen, Saf Olmayan Madde ve Verim Hesapları)'
    ]
  },
  {
    id: 'tyt_kim_7',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 7,
    topicName: 'Karışımlar ve Ayrıştırma Yöntemleri',
    subtopics: [
      'Homojen (Çözelti) ve Heterojen Karışımlar (Süspansiyon, Emülsiyon, Aerosol, Kolloid)',
      'Çözünme Süreci ve Derişim Birimleri (Kütlece Yüzde, Hacimce Yüzde, ppm)',
      'Çözeltilerin Koligatif Özellikleri (Donma Noktası Alçalması, Kaynama Noktası Yükselmesi)',
      'Karışımları Ayırma Teknikleri (Tanecik Boyutu, Yoğunluk, Erime/Kaynama Noktası, Çözünürlük Farkı)'
    ]
  },
  {
    id: 'tyt_kim_8',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 8,
    topicName: 'Asitler, Bazlar ve Tuzlar',
    subtopics: [
      'Asitlerin ve Bazların Genel Özellikleri, İndikatörler ve pH Kavramı',
      'Asit ve Bazların Tepkimeleri (Nötralleşme, Metallerle Tepkimeler [Aktif, Amfoter, Soy Metal])',
      'Hayatımızda Asitler ve Bazlar, Asit Yağmurları ve Güvenli Kullanım',
      'Tuzlar: Özellikleri ve Önemli Tuzlar (NaCl, Na₂CO₃, NaHCO₃, CaCO₃, NH₄Cl)'
    ]
  },
  {
    id: 'tyt_kim_9',
    examType: 'TYT',
    subject: 'Kimya',
    orderNo: 9,
    topicName: 'Kimya Her Yerde',
    subtopics: [
      'Temizlik Maddeleri (Sabun ve Deterjanın Yapısı, Hijyen Maddeleri: Çamaşır Suyu, Kireç Kaymağı)',
      'Yaygın Polimerler (Kauçuk, Polietilen, PET, Kevlar, PVC, Teflon, Polistiren)',
      'Kozmetik Malzemeler, İlaç Formları (Hap, Şurup, İğne, Merhem)',
      'Gıdalar, Katkı Maddeleri, Pastörizasyon ve UHT İşlemleri, Yağ Türleri'
    ]
  },

  // ==================== TYT BİYOLOJİ ====================
  {
    id: 'tyt_biyo_1',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 1,
    topicName: 'Canlıların Ortak Özellikleri ve Temel Bileşenleri',
    subtopics: [
      'Canlıların Ortak Özellikleri (Hücresel Yapı, Beslenme, Solunum, Boşaltım, Hareket, Uyarılara Tepki, Homeostazi, Metabolizma, Büyüme-Gelişme, Üreme, Uyum)',
      'İnorganik Bileşikler (Su, Mineraller, Asitler, Bazlar, Tuzlar)',
      'Organik Bileşikler (Karbonhidratlar: Monosakkarit, Disakkarit, Polisakkarit; Yağlar [Trigliserit, Fosfolipit, Steroit]; Proteinler)',
      'Enzimlerin Yapısı ve Çalışmasına Etki Eden Faktörler',
      'Vitaminler, Nükleik Asitler (DNA, RNA) ve ATP Yapısı'
    ]
  },
  {
    id: 'tyt_biyo_2',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 2,
    topicName: 'Hücre Teorisi, Organeller ve Madde Geçişleri',
    subtopics: [
      'Prokaryot ve Ökaryot Hücre Yapısı',
      'Hücre Zarı Yapısı (Akıcı Mozaik Zar Modeli)',
      'Zardan Madde Geçişleri (Pasif Taşıma: Difüzyon, Kolaylaştırılmış Difüzyon, Osmoz; Aktif Taşıma; Endositoz: Fagositoz/Pinositoz; Ekzositoz)',
      'Sitoplazma ve Organeller (Ribozom, E.R., Golgi, Lizozom, Koful, Peroksizom, Sentrozom, Mitokondri, Plastitler: Kloroplast, Kromoplast, Lökoplast)',
      'Çekirdek Yapısı ve Hücre İskeleti Elemanları'
    ]
  },
  {
    id: 'tyt_biyo_3',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 3,
    topicName: 'Canlıların Çeşitliliği ve Sınıflandırılması',
    subtopics: [
      'Sınıflandırma İlkeleri (Yapay [Ampirik] ve Doğal [Filogenetik] Sınıflandırma)',
      'Sınıflandırma Basamakları (Tür, Cins, Familya, Takım, Sınıf, Şube, Alem) ve İkili Adlandırma',
      'Canlılar Alemleri: Bakteriler ve Arkeler Alemi',
      'Protistler, Mantarlar ve Bitkiler Alemi',
      'Hayvanlar Alemi (Omurgasızlar ve Omurgalılar)',
      'Virüslerin Genel Özellikleri ve Yapısı'
    ]
  },
  {
    id: 'tyt_biyo_4',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 4,
    topicName: 'Hücre Bölünmeleri ve Üreme',
    subtopics: [
      'Hücre Döngüsü ve Mitoz Bölünme Evreleri (İnterfaz, Profaz, Metafaz, Anafaz, Telofaz, Sitokinez)',
      'Eşeysiz Üreme Çeşitleri (Bölünerek, Tomurcuklanma, Sporla, Rejenerasyon, Partenogenez, Vejetatif Üreme)',
      'Mayoz Bölünme Evreleri (Mayoz 1: Krossing-over; Mayoz 2) ve Eşeyli Üreme',
      'Mitoz ve Mayoz Bölünmenin Karşılaştırılması, Karyotip Analizi'
    ]
  },
  {
    id: 'tyt_biyo_5',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 5,
    topicName: 'Kalıtımın Genel Esasları',
    subtopics: [
      'Mendel Genetiği (Alel Gen, Homozigot/Heterozigot, Fenotip/Genotip)',
      'Monohibrit ve Dihibrit Çaprazlamalar, Kontrol Çaprazlaması',
      'Eş Baskınlık ve Çok Alellilik (ABO ve Rh Kan Grupları)',
      'Eşeye Bağlı Kalıtım (X ve Y Kromozomuna Bağlı Kalıtım: Hemofili, Renk Körlüğü)',
      'Soyağaçları ve Genetik Varyasyonlar'
    ]
  },
  {
    id: 'tyt_biyo_6',
    examType: 'TYT',
    subject: 'Biyoloji',
    orderNo: 6,
    topicName: 'Ekosistem Ekolojisi ve Güncel Çevre Sorunları',
    subtopics: [
      'Ekolojik Kavramlar (Tür, Popülasyon, Komünite, Ekosistem, Biyom, Biyosfer, Habitat, Ekolojik Niş)',
      'Ekosistemin Abiyotik ve Biyotik Faktörleri (Üreticiler, Tüketiciler, Ayrıştırıcılar)',
      'Besin Zinciri, Besin Ağı ve Enerji Piramidi (Biyolojik Birikim, Biyokütle)',
      'Madde Döngüleri (Karbon, Azot, Su Döngüsü)',
      'Güncel Çevre Sorunları (Küresel Isınma, Asit Yağmurları, Ötrofikasyon, Ekolojik Ayak İzi, Biyoçeşitliliğin Korunması)'
    ]
  },

  // ==================== TYT SOSYAL BİLİMLER ====================
  {
    id: 'tyt_tar_1',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 1,
    topicName: 'Tarih ve Zaman & İlk Çağ Medeniyetleri',
    subtopics: [
      'Tarih Biliminin Özellikleri, Yöntemi ve Kaynakları',
      'Zamanın Taksimi ve Türklerin Kullandığı Takvimler',
      'İlk Çağ Medeniyet Havzaları (Mezopotamya, Mısır, Anadolu, Ege/Yunan, Hint, Çin, İran)'
    ]
  },
  {
    id: 'tyt_tar_2',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 2,
    topicName: 'İlk ve Orta Çağlarda Türk Dünyası',
    subtopics: [
      'Avrasya\'da İlk Türk İzleri ve Türk Göçleri',
      'İlk Türk Devletleri (Asya Hun, I. ve II. Kök Türk, Uygurlar)',
      'İlk Türk Devletlerinde Devlet Teşkilatı, Ordu (Onlu Sistem), Töre ve Kültür-Medeniyet'
    ]
  },
  {
    id: 'tyt_tar_3',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 3,
    topicName: 'İslam Medeniyetinin Doğuşu ve İlk Türk-İslam Devletleri',
    subtopics: [
      'İslamiyet\'in Doğuşu, Hz. Muhammed Dönemi ve Dört Halife Dönemi',
      'Emeviler ve Abbasiler Dönemi Gelişmeleri',
      'Türklerin İslamiyet\'i Kabulü (Talas Savaşı) ve İlk Türk-İslam Devletleri (Karahanlılar, Gazneliler, Büyük Selçuklular)',
      'İlk Türk-İslam Eserleri ve Kültür-Medeniyeti'
    ]
  },
  {
    id: 'tyt_tar_4',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 4,
    topicName: 'Türkiye Tarihi ve Osmanlı Devleti (Kuruluş & Yükselme)',
    subtopics: [
      'Anadolu\'nun Türkleşmesi, Malazgirt Sonrası I. ve II. Beylikler Dönemi',
      'Türkiye Selçuklu Devleti Siyasi Tarihi, Ticaret ve Kültür Politikaları',
      'Osmanlı Kuruluş Dönemi (1299-1453) Siyasi Gelişmeleri ve İskân/İstimalet Politikaları',
      'Dünya Gücü Osmanlı (1453-1595): İstanbul\'un Fethi, Doğu ve Batı Seferleri, Kapitülasyonlar'
    ]
  },
  {
    id: 'tyt_tar_5',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 5,
    topicName: 'Değişim Çağında Osmanlı ve 20. Yüzyıl Başları',
    subtopics: [
      'Arayış Yılları (17. Yüzyıl Islahatları ve İsyanları)',
      '18. Yüzyıl Değişim ve Diplomasi (Lale Devri, Nizam-ı Cedit)',
      'En Uzun Yüzyıl (19. Yüzyıl): Tanzimat, Islahat, I. ve II. Meşrutiyet',
      'Trablusgarp ve Balkan Savaşları, I. Dünya Savaşı (Cepheler ve Gizli Antlaşmalar)'
    ]
  },
  {
    id: 'tyt_tar_6',
    examType: 'TYT',
    subject: 'Tarih',
    orderNo: 6,
    topicName: 'Milli Mücadele Dönemi ve Atatürkçülük',
    subtopics: [
      'Mondros Mütarekesi, Cemiyetler, Genelgeler ve Kongreler (Amasya, Erzurum, Sivas)',
      'Misak-ı Milli ve I. TBMM Dönemi, Sevr Antlaşması',
      'Kurtuluş Savaşı Cepheleri (Doğu, Güney, Batı [İnönü, Sakarya, Büyük Taarruz]), Mudanya ve Lozan Barış Antlaşması',
      'Atatürk İlkeleri (Cumhuriyetçilik, Milliyetçilik, Halkçılık, Devletçilik, Laiklik, İnkılapçılık) ve Siyasi/Hukuki/Sosyal/Eğitim İnkılapları'
    ]
  },
  {
    id: 'tyt_cog_1',
    examType: 'TYT',
    subject: 'Coğrafya',
    orderNo: 1,
    topicName: 'Doğa ve İnsan, Coğrafi Konum ve Harita Bilgisi',
    subtopics: [
      'Doğa ve İnsan Etkileşimi, Coğrafyanın Bölümleri',
      'Matematik (Mutlak) ve Özel (Göreceli) Konum, Paralel, Meridyen ve Yerel Saat Hesaplamaları',
      'Dünya\'nın Şekli ve Hareketleri (Günlük ve Yıllık Hareket, Eksen Eğikliği, Ekinoks ve Solstis)',
      'Harita Bilgisi, Ölçekler, Projeksiyon Tipleri ve İzohips (Eş Yükselti) Eğrileri'
    ]
  },
  {
    id: 'tyt_cog_2',
    examType: 'TYT',
    subject: 'Coğrafya',
    orderNo: 2,
    topicName: 'İklim Bilgisi (Atmosfer, Sıcaklık, Basınç, Rüzgar, Nem ve Yağış)',
    subtopics: [
      'Atmosferin Katmanları ve Özellikleri, Hava Durumu ve İklim Farkı',
      'Sıcaklığı Etkileyen Faktörler ve İzoterm Haritaları',
      'Basınç ve Rüzgarlar (Sürekli, Devirli [Muson], Yerel Rüzgarlar [Meltem, Fön])',
      'Nem Çeşitleri (Mutlak, Maksimum, Bağıl Nem) ve Yağış Oluşum Tipleri (Konveksiyonel, Orografik, Cephesel)',
      'Büyük İklim Tipleri (Makroklima) ve Türkiye\'nin İklimi'
    ]
  },
  {
    id: 'tyt_cog_3',
    examType: 'TYT',
    subject: 'Coğrafya',
    orderNo: 3,
    topicName: 'Yerin Şekillenmesi, İç ve Dış Kuvvetler',
    subtopics: [
      'Dünya\'nın İç Yapısı, Jeolojik Zamanlar ve Levha Tektoniği',
      'İç Kuvvetler: Orojenez (Dağ Oluşumu), Epirojenez (Kıta Oluşumu), Volkanizma ve Depremler',
      'Dış Kuvvetler: Akarsular, Rüzgarlar, Buzullar, Karstik Şekiller, Dalga ve Akıntıların Oluşturduğu Şekiller',
      'Türkiye\'nin Yer Şekilleri, Gölleri, Akarsuları ve Kıyı Tipleri'
    ]
  },
  {
    id: 'tyt_cog_4',
    examType: 'TYT',
    subject: 'Coğrafya',
    orderNo: 4,
    topicName: 'Nüfus, Yerleşme ve Doğal Afetler',
    subtopics: [
      'Nüfusun Dağılışını Etkileyen Faktörler ve Nüfus Piramitleri',
      'Göç Türleri ve Göçün Mekânsal Etkileri, Kırsal ve Şehirsel Yerleşmeler',
      'Ekonomik Faaliyetlerin Sınıflandırılması (Birincil, İkincil, Üçüncül, Dördüncül, Beşincil)',
      'Doğal Afetler (Deprem, Tsunami, Heyelan, Erozyon, Çığ, Sel ve Taşkın, Orman Yangını)'
    ]
  },
  {
    id: 'tyt_fel_1',
    examType: 'TYT',
    subject: 'Felsefe/Din',
    orderNo: 1,
    topicName: 'Felsefe ve Temel Disiplinleri',
    subtopics: [
      'Felsefenin Anlamı, Özellikleri ve Düşünme Becerisi',
      'Bilgi Felsefesi (Epistemoloji: Doğru Bilginin İmkânı, Akılcılık, Deneycilik, Eleştiricilik)',
      'Varlık Felsefesi (Ontoloji: Varlığın Mahiyeti, Materyalizm, İdealizm, Düalizm)',
      'Ahlak, Sanat, Din, Siyaset ve Bilim Felsefesi Temel Problemleri'
    ]
  },
  {
    id: 'tyt_din_1',
    examType: 'TYT',
    subject: 'Felsefe/Din',
    orderNo: 2,
    topicName: 'Din Kültürü ve Ahlak Bilgisi',
    subtopics: [
      'İnanç Esasları (Allah, Melek, Kitap, Peygamber, Ahiret, Kaza ve Kader İnancı)',
      'İbadetler ve İbadetin Bireysel / Toplumsal Faydaları',
      'Ahlak ve Değerler, İslam Medeniyetinde Bilim ve Sanat',
      'Kur\'an-ı Kerim\'de Bazı Kavramlar ve Peygamberimizin Örnek Şahsiyeti'
    ]
  },

  // ==================== AYT MATEMATİK ====================
  {
    id: 'ayt_mat_1',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 1,
    topicName: 'İleri Düzey Fonksiyonlar',
    subtopics: [
      'Fonksiyon Grafikleri, Parçalı Fonksiyonlar',
      'Fonksiyonlarda Simetri ve Öteleme: f(x±a), f(x)±b, -f(x), f(-x), k.f(x)',
      'Fonksiyonun Değişim Oranı ve Maksimum/Minimum Değerleri'
    ]
  },
  {
    id: 'ayt_mat_2',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 2,
    topicName: 'Polinomlar ve İkinci Dereceden Denklemler',
    subtopics: [
      'İleri Polinom Bölmesi, Kökleri Verilen Polinomu Yazma',
      'İkinci Dereceden Bir Bilinmeyenli Denklemler ve Diskriminant (Δ = b² - 4ac)',
      'Kök - Katsayı Bağıntıları (x₁+x₂ = -b/a, x₁.x₂ = c/a, |x₁-x₂| = √Δ/|a|)',
      'Karmaşık Sayılar Girişi (i² = -1, Eşlenik ve Dört İşlem)'
    ]
  },
  {
    id: 'ayt_mat_3',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 3,
    topicName: 'İkinci Dereceden Eşitsizlikler ve Sistemleri',
    subtopics: [
      'İkinci Dereceden Bir Bilinmeyenli Eşitsizliklerin İşaret Tablosu',
      'Çarpım ve Bölüm Durumundaki Eşitsizlikler, Çift Katlı Kök Kuralları',
      'Eşitsizlik Sistemleri ve Ortak Çözüm Kümeleri',
      'Köklerin İşaretlerinin İncelenmesi (Parametrik Eşitsizlikler)'
    ]
  },
  {
    id: 'ayt_mat_4',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 4,
    topicName: 'Parabol (İkinci Dereceden Fonksiyonlar)',
    subtopics: [
      'Parabolün Tanımı ve Grafiği: f(x) = ax² + bx + c',
      'Tepe Noktası: T(r,k) [r = -b/2a, k = f(r)] ve Simetri Ekseni',
      'Parabolün Eksenleri Kestiği Noktalar ve Köklerle İlişkisi',
      'Grafiği Verilen Parabolün Denklemini Yazma',
      'Doğru ile Parabolün Birbirine Göre Durumu ve Maks-Min Problemleri'
    ]
  },
  {
    id: 'ayt_mat_5',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 5,
    topicName: 'Trigonometri 1 (Temel ve İndirgemeler)',
    subtopics: [
      'Yönlü Açılar, Derece ve Radyan Dönüşümleri, Esas Ölçü',
      'Birim Çember ve Trigonometrik Fonksiyonlar (Sin, Cos, Tan, Cot, Sec, Cosec)',
      'Trigonometrik Özdeşlikler (sin²x + cos²x = 1 vb.)',
      'İşaretler ve Açı İndirgeme Formülleri [π/2 ± α, π ± α, 3π/2 ± α, 2π - α]',
      'Sinüs ve Kosinüs Teoremleri, Periyot ve Trigonometrik Fonksiyon Grafikleri',
      'Ters Trigonometrik Fonksiyonlar (Arcsin, Arccos, Arctan)'
    ]
  },
  {
    id: 'ayt_mat_6',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 6,
    topicName: 'Trigonometri 2 (Toplam-Fark, Yarım Açı, Denklemler)',
    subtopics: [
      'Toplam ve Fark Formülleri: sin(a±b), cos(a±b), tan(a±b)',
      'Yarım Açı (İki Kat Açı) Formülleri: sin2a, cos2a (3 açılımı), tan2a',
      'Trigonometrik Denklemler: sinx = a, cosx = a, tanx = a Genel Çözüm Kümeleri'
    ]
  },
  {
    id: 'ayt_mat_7',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 7,
    topicName: 'Logaritma Fonksiyonu',
    subtopics: [
      'Üstel Fonksiyon ve Tanım Kümesi',
      'Logaritma Fonksiyonunun Tanımı: y = log_a(x) ⇔ x = aʸ',
      'Logaritmanın Temel Özellikleri (Toplama, Çıkarma, Kuvvet Alma, 1 ve a Tabanında Logaritma)',
      'Taban Değiştirme Kuralı, Onluk ve Doğal Logaritma (ln)',
      'Logaritmik Denklemler ve Eşitsizlikler',
      'Üstel ve Logaritmik Fonksiyonların Günlük Hayat Uygulamaları (Deprem Şiddeti, pH, Radyoaktif Bozunma)'
    ]
  },
  {
    id: 'ayt_mat_8',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 8,
    topicName: 'Diziler (Aritmetik ve Geometrik Dizi)',
    subtopics: [
      'Dizi Tanımı, Genel Terim (aₙ) ve Sonlu/Sabit Dizi',
      'Aritmetik Dizi (Ortak Fark [d], Genel Terim: aₙ = a₁ + (n-1)d, İlk n Terim Toplamı Sₙ)',
      'Geometrik Dizi (Ortak Çarpan [r], Genel Terim: aₙ = a₁.rⁿ⁻¹, İlk n Terim Toplamı Sₙ)',
      'Toplam Sembolü (Σ) ve Fibonacci Dizisi'
    ]
  },
  {
    id: 'ayt_mat_9',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 9,
    topicName: 'Limit ve Süreklilik',
    subtopics: [
      'Sağdan ve Soldan Limit Kavramı',
      'Limit Özellikleri ve Polinom, Trigonometrik, Logaritmik Fonksiyonların Limitleri',
      '0/0 Belirsizliği ve Çarpanlara Ayırma / Eşlenik ile Çözümü',
      'Bir Noktada Süreklilik Şartları (Tanımlı Olma, Limit Varlığı ve Eşitlik)',
      'Kapalı Aralıkta Süreklilik ve Süreksizlik Noktaları'
    ]
  },
  {
    id: 'ayt_mat_10',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 10,
    topicName: 'Türev 1 (Türev Alma Kuralları)',
    subtopics: [
      'Türevin Tanımı (Anlık Değişim Oranı ve Limit Tanımı)',
      'Temel Fonksiyonların Türev Alma Kuralları (Kuvvet, Sabit Çarpan, Toplam/Fark)',
      'Çarpımın ve Bölümün Türevi',
      'Bileşke Fonksiyonun Türevi ve Zincir Kuralı',
      'Parçalı ve Mutlak Değer Fonksiyonlarının Türevi, Türev-Süreklilik İlişkisi'
    ]
  },
  {
    id: 'ayt_mat_11',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 11,
    topicName: 'Türev 2 (Türevin Geometrik Yorumu ve Uygulamaları)',
    subtopics: [
      'Türevin Geometrik Anlamı: Teğetin ve Normalin Eğimi ve Denklemleri',
      'Artan ve Azalan Fonksiyonlar, Birinci Türevin İşareti',
      'Yerel Ekstremum Noktalar (Yerel Maksimum ve Yerel Minimum) ve Fermat Teoremi',
      'Maksimum ve Minimum (Ekstremum) Problemleri (Geometrik ve Sayısal Optimizasyon)',
      'Polinom Fonksiyonlarının Grafikleri ve Dönüm (Büküm) Noktası Yorumu'
    ]
  },
  {
    id: 'ayt_mat_12',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 12,
    topicName: 'İntegral 1 (Belirsiz İntegral)',
    subtopics: [
      'Ters Türev (İntegral) Kavramı ve İntegral Sabiti (C)',
      'Temel Belirsiz İntegral Alma Kuralları: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C',
      'Değişken Değiştirme Yöntemi (u = f(x) ve du = f\'(x)dx)'
    ]
  },
  {
    id: 'ayt_mat_13',
    examType: 'AYT',
    subject: 'AYT Matematik',
    orderNo: 13,
    topicName: 'İntegral 2 (Belirli İntegral ve Alan Hesabı)',
    subtopics: [
      'Riemann Alt ve Üst Toplamı, Belirli İntegralin Tanımı',
      'Kalkülüsün Temel Teoremi: ∫ₐᵇ f(x)dx = F(b) - F(a)',
      'Belirli İntegralin Özellikleri (Sınır Değişimi, Parçalama, Simetrik Aralıkta Tek/Çift Fonksiyon)',
      'Eğri ile x Ekseni Arasında Kalan Düzlemsel Alan Hesabı',
      'İki Eğri Arasında Kalan Alan Hesabı ve Grafik Yorumu'
    ]
  },

  // ==================== AYT FİZİK ====================
  {
    id: 'ayt_fiz_1',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 1,
    topicName: 'Vektörler ve Bağıl Hareket',
    subtopics: [
      'Vektörlerin Bileşkesi (Uç Uca Ekleme, Paralelkenar Yöntemi, Bileşenlerine Ayırma)',
      'Bir ve İki Boyutta Bağıl Hareket (V_bağıl = V_gözlenen - V_gözlemci)',
      'Nehir Problemleri (Yere Göre Hız, Suya Göre Hız, Karşı Kıyıya Çıkma Süresi ve Sürüklenme)'
    ]
  },
  {
    id: 'ayt_fiz_2',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 2,
    topicName: 'Newton\'un Hareket Yasaları (Dinamik)',
    subtopics: [
      'Eğik Düzlemde Hareket ve İvme Bağıntıları',
      'Makaralı ve Üst Üste Duran Cisimlerin Hareketi',
      'Asansör İçi Sistemler ve Eylemsizlik Hissi'
    ]
  },
  {
    id: 'ayt_fiz_3',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 3,
    topicName: 'Sabit İvmeli Hareket ve Atışlar',
    subtopics: [
      'Bir Boyutta Sabit İvmeli Hareket Formülleri ve Grafikleri',
      'Serbest Düşme, Düşey Doğrultuda Yukarı ve Aşağı Atış, Limit Hız',
      'Yatay Atış Hareketi (Menzil, Düşme Süresi)',
      'Eğik Atış Hareketi (Maksimum Yükseklik, Uçuş Süresi, Menzil)'
    ]
  },
  {
    id: 'ayt_fiz_4',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 4,
    topicName: 'İş, Güç, Enerji ve Sürtünmeli Sistemler',
    subtopics: [
      'İş - Enerji Teoremi: W_net = ΔE_k',
      'Esneklik Potansiyel Enerjisi ve Yay Sistemleri',
      'Sürtünmeli Eğik Düzlem ve Raylı Sistemlerde Enerji Dönüşümleri'
    ]
  },
  {
    id: 'ayt_fiz_5',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 5,
    topicName: 'İtme ve Çizgisel Momentum',
    subtopics: [
      'İtme (İmpuls) Kavramı: I = F.Δt',
      'Çizgisel Momentum: P = m.V ve İtme-Momentum İlişkisi: I = ΔP',
      'Momentumun Korunumu Yasası: ΣP_ilk = ΣP_son',
      'Bir ve İki Boyutta Esnek ve Esnek Olmayan Çarpışmalar, Patlamalar'
    ]
  },
  {
    id: 'ayt_fiz_6',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 6,
    topicName: 'Tork, Denge ve Kütle Merkezi',
    subtopics: [
      'Tork (Kuvvet Momenti): τ = F.d.sinθ ve Sağ El Kuralı',
      'Kuvvet Çifti ve Denge Şartları (ΣF = 0, Στ = 0)',
      'Ağırlık ve Kütle Merkezi Bulma Yöntemleri (Koordinat Yöntemi, Parça Ekleme/Çıkarma)'
    ]
  },
  {
    id: 'ayt_fiz_7',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 7,
    topicName: 'Basit Makineler',
    subtopics: [
      'Kaldıraç Çeşitleri ve Makaralar (Sabit, Hareketli, Palanga Sistemleri)',
      'Eğik Düzlem, Çıkrık, Vida ve Dişli Çarklar / Kasnaklar',
      'Basit Makinelerin Verimi ve Mekanik Avantaj'
    ]
  },
  {
    id: 'ayt_fiz_8',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 8,
    topicName: 'Elektriksel Kuvvet, Alan ve Potansiyel',
    subtopics: [
      'Noktasal Yükler Arasındaki Coulomb Kuvveti ve Elektrik Alanı (E = k.q/d²)',
      'Elektriksel Potansiyel Enerji (E_p = k.q₁.q₂/d) ve Elektriksel Potansiyel (V = k.q/d)',
      'Elektriksel İş (W = q.ΔV), Eş Potansiyel Çizgileri',
      'Düzgün Elektrik Alan, Yüklü Paralel Levhalar ve Kondansatörler (Sığaçlar: C = ε.A/d)'
    ]
  },
  {
    id: 'ayt_fiz_9',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 9,
    topicName: 'Manyetizma ve Elektromanyetik İndüksiyon',
    subtopics: [
      'Akım Geçen Telin, Halkanın ve Bobinin (Selenoid) Manyetik Alanı',
      'Manyetik Alanda Akım Geçen Tele ve Yüklü Parçacığa Etki Eden Manyetik Kuvvet',
      'Manyetik Akı (Φ = B.A.cosθ) ve Faraday İndüksiyon Kanunu (ε = -ΔΦ/Δt)',
      'Lenz Kanunu ve Öz-İndüksiyon Akımı',
      'Alternatif Akım Devreleri (Empedans, Rezonans, R-L-C) ve Transformatörler (V₁/V₂ = N₁/N₂)'
    ]
  },
  {
    id: 'ayt_fiz_10',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 10,
    topicName: 'Çembersel Hareket ve Basit Harmonik Hareket',
    subtopics: [
      'Düzgün Çembersel Hareket (Çizgisel Hız, Açısal Hız [ω], Merkezcil İvme, Merkezcil Kuvvet)',
      'Yatay ve Düşey Düzlemde Çembersel Hareket, Eğimli Viraj ve Koni Problemleri',
      'Dönerek Öteleme Hareketi ve Eylemsizlik Momenti (I)',
      'Açısal Momentum (L = I.ω) ve Açısal Momentumun Korunumu',
      'Kütle Çekim Kuvveti ve Kepler Kanunları (Yörüngeler, Alanlar, Periyotlar Kanunu)',
      'Basit Harmonik Hareket (Uzanım, Genlik, Geri Çağırıcı Kuvvet, Yaylı ve Basit Sarkaç Periyot Formülleri)'
    ]
  },
  {
    id: 'ayt_fiz_11',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 11,
    topicName: 'Dalga Mekaniği ve Elektromanyetik Dalgalar',
    subtopics: [
      'Su Dalgalarında Kırınım ve Girişim (Düğüm ve Katar Çizgileri)',
      'Işıkta Çift Yarıkta Girişim (Young Deneyi) ve Tek Yarıkta Kırınım (Saçak Genişliği Δx)',
      'Işıkta ve Seste Doppler Olayı',
      'Elektromanyetik Spektrum ve Elektromanyetik Dalgaların Özellikleri'
    ]
  },
  {
    id: 'ayt_fiz_12',
    examType: 'AYT',
    subject: 'AYT Fizik',
    orderNo: 12,
    topicName: 'Modern Fizik ve Atom Fiziğine Giriş',
    subtopics: [
      'Bohr Atom Modeli (Yarıçap, Enerji Seviyeleri, Uyarılma, Işıma Türleri: Lyman, Balmer, Paschen)',
      'Büyük Patlama Teorisi ve Standart Model (Kuarklar, Leptonlar, Bozonlar)',
      'Radyoaktivite (Alfa, Beta, Gama Işımaları, Yarı Ömür, Fisyon ve Füzyon)',
      'Özel Görelilik (Zamanın Genişlemesi ve Uzunluğun Kısalması)',
      'Fotoelektrik Olay (Einstein Fotoelektrik Denklemi: E_foton = E_bağlanma + E_kinetik) ve Compton Saçılması'
    ]
  },

  // ==================== AYT KİMYA ====================
  {
    id: 'ayt_kim_1',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 1,
    topicName: 'Modern Atom Teorisi',
    subtopics: [
      'Bohr Atom Modelinin Yetersizlikleri ve Kuantum Mekaniği (De Broglie, Heisenberg)',
      'Kuantum Sayıları (Baş [n], Açısal Momentum [l], Manyetik [m_l], Spin [m_s])',
      'Elektron Dizilimi Kuralları (Aufbau, Pauli İlkesi, Hund Kuralı)',
      'Küresel Simetri ve Uyarılmış Atom, İzoelektronik Taneciklerin Elektron Dizilimi',
      'Yükseltgenme Basamakları ve Değerlik Elektronları'
    ]
  },
  {
    id: 'ayt_kim_2',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 2,
    topicName: 'Gazlar ve Gaz Yasaları',
    subtopics: [
      'Gaz Yasaları (Boyle, Charles, Gay-Lussac, Avogadro)',
      'İdeal Gaz Denklemi: P.V = n.R.T ve Gazlarda Yoğunluk',
      'Gaz Karışımları, Kısmi Basınç (Dalton Yasası) ve Kısmi Hacim',
      'Graham Difüzyon ve Efüzyon Yasası',
      'Gerçek Gazlar, Joule-Thomson Olayı ve Kritik Sıcaklık'
    ]
  },
  {
    id: 'ayt_kim_3',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 3,
    topicName: 'Sıvı Çözeltiler ve Çözünürlük',
    subtopics: [
      'Derişim Birimleri (Molarite [M = n/V], Molalite [m], Mol Kesri, Kütlece/Hacimce Yüzde, ppm)',
      'Çözelti Hazırlama ve Seyreltme/Deriştirme: M₁.V₁ = M₂.V₂',
      'Koligatif Özellikler (Buhar Basıncı Alçalması [Raoult], Kaynama Noktası Yükselmesi [Ebulyoskopi], Donma Noktası Alçalması [Kriyoskopi], Osmoz)',
      'Çözünürlük ve Çözünürlüğe Etki Eden Faktörler (Sıcaklık, Basınç, Ortak İyon)'
    ]
  },
  {
    id: 'ayt_kim_4',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 4,
    topicName: 'Kimyasal Tepkimelerde Enerji',
    subtopics: [
      'Tepkime Isısı ve Entalpi Değişimi (ΔH = H_ürünler - H_girenler)',
      'Endotermik ve Ekzotermik Tepkimelerin Potansiyel Enerji Grafikleri',
      'Standart Oluşum Entalpisi (ΔH°_f)',
      'Bağ Enerjileri ile Entalpi Hesabı (Kırılan Bağlar - Oluşan Bağlar)',
      'Tepkime Isılarının Toplanabilirliği (Hess Yasası)'
    ]
  },
  {
    id: 'ayt_kim_5',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 5,
    topicName: 'Kimyasal Tepkimelerde Hız',
    subtopics: [
      'Tepkime Hızının Tanımı ve Birimleri (Harcanma ve Oluşma Hızları)',
      'Çarpışma Teorisi, Aktifleşmiş Kompleks ve İleri/Geri Aktifleşme Enerjisi (Ea_i, Ea_g)',
      'Hız Bağıntısı, Tepkime Derecesi ve Molekülerite',
      'Basamaklı (Mekanizmalı) Tepkimelerde Hız (Yavaş Basamak)',
      'Tepkime Hızına Etki Eden Faktörler (Madde Cinsi, Derişim, Basınç/Hacim, Sıcaklık, Katalizör, Temas Yüzeyi)'
    ]
  },
  {
    id: 'ayt_kim_6',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 6,
    topicName: 'Kimyasal Denge',
    subtopics: [
      'Denge Kavramı ve Dinamik Denge Şartları',
      'Derişimler Cinsinden Denge Sabiti (Kc) ve Kısmi Basınçlar Cinsinden Denge Sabiti (Kp)',
      'Kp = Kc.(R.T)^Δn Bağıntısı, Denge Kesri (Qc) ve Sistemin Dengeye Ulaşması',
      'Dengeye Etki Eden Faktörler (Le Chatelier İlkesi: Derişim, Hacim/Basınç, Sıcaklık Etkisi)'
    ]
  },
  {
    id: 'ayt_kim_7',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 7,
    topicName: 'Asit - Baz Dengesi (Sulu Çözelti Dengeleri)',
    subtopics: [
      'Suyun Otoiyonizasyonu ve Ksu (1.10⁻¹⁴), pH ve pOH Kavramları',
      'Bronsted-Lowry Asit-Baz Tanımı ve Konjuge (Eşlenik) Asit-Baz Çiftleri',
      'Kuvvetli ve Zayıf Asit-Baz Çözeltilerinde pH Hesabı (Ka ve Kb)',
      'Tuzların Asit-Baz Özellikleri ve Hidroliz Olayı, Tampon Çözeltiler',
      'Kuvvetli Asit - Kuvvetli Baz Titrasyonu ve Titrasyon Eğrileri'
    ]
  },
  {
    id: 'ayt_kim_8',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 8,
    topicName: 'Çözünürlük Dengesi (KÇÇ)',
    subtopics: [
      'Az Çözünen Tuzların Çözünürlük Çarpımı Sabiti (Kçç)',
      'Molar Çözünürlük ve Kçç Bağıntıları',
      'Çözünürlüğe Sıcaklık ve Ortak İyonun Etkisi',
      'Çökelme Şartları (Q_i > Kçç) ve Seçimli Çöktürme'
    ]
  },
  {
    id: 'ayt_kim_9',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 9,
    topicName: 'Kimya ve Elektrik (Elektrokimya)',
    subtopics: [
      'Redoks Tepkimeleri ve İyon-Elektron Yöntemi ile Denkleştirme',
      'Aktiflik (Metallerde ve Ametallerde Aktiflik Sıralaması)',
      'Galvanik Hücreler (Piller: Anot, Katot, Tuz Köprüsü, Pil Potansiyeli E°_pil)',
      'Standart Elektrot Potansiyelleri (SHE) ve Pil Potansiyeline Etki Eden Faktörler (Nernst Denklemi)',
      'Derişim Pilleri ve Ticari Piller (Lityum-İyon, Kurşunlu Akü)',
      'Elektroliz Olayı, Faraday Elektroliz Kanunları (Q = I.t, m = (Q.M_A)/(96500.z))',
      'Suyun Elektrolizi, Kaplanma ve Korozyondan Korunma (Kurban Elektrot)'
    ]
  },
  {
    id: 'ayt_kim_10',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 10,
    topicName: 'Karbon Kimyasına Giriş',
    subtopics: [
      'Organik ve Anorganik Bileşiklerin Karşılaştırılması',
      'Basit (Kaba) Formül ve Molekül Formülü Bulma',
      'Doğada Karbon ve Allotropları (Elmas, Grafit, Fulleren, Grafen, Karbon Nanotüp)',
      'Lewis Formülleri ve Karbon Atomunun Hibritleşmesi (sp³, sp², sp)',
      'Molekül Geometrisi ve VSEPR Modeli (Doğrusal, Kırık Doğru, Düzlem Üçgen, Düzgün Dörtyüzlü, Üçgen Piramit)'
    ]
  },
  {
    id: 'ayt_kim_11',
    examType: 'AYT',
    subject: 'AYT Kimya',
    orderNo: 11,
    topicName: 'Organik Bileşikler (Hidrokarbonlar ve Fonksiyonel Gruplar)',
    subtopics: [
      'Alkanlar (Parafinler): Adlandırma (IUPAC), Yapı İzomerliği ve Genel Özellikleri',
      'Alkenler (Olefinler): Adlandırma, Cis-Trans Geometrik İzomerliği ve Katılma Tepkimeleri (Markovnikov Kuralı)',
      'Alkinler (Asetilenler): Adlandırma, Tollens/Fehling ile Yer Değiştirme Tepkimeleri',
      'Aromatik Bileşikler (Arenler): Benzen Halkası, Toluen, Naftalin, Anilin, Fenol',
      'Alkoller ve Eterler: Sınıflandırılması, IUPAC Adlandırması ve Özellikleri',
      'Karbonil Bileşikleri: Aldehitler ve Ketonlar (Tollens/Fehling Ayıracı)',
      'Karboksilik Asitler ve Esterler: Adlandırma, Esterleşme Tepkimesi'
    ]
  },

  // ==================== AYT BİYOLOJİ ====================
  {
    id: 'ayt_biyo_1',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 1,
    topicName: 'Sinir Sistemi ve Endokrin Sistem',
    subtopics: [
      'Nöronun Yapısı, İmpuls Oluşumu ve İletimi (Polarizasyon, Depolarizasyon, Repolarizasyon, Sinapslar)',
      'Merkezi Sinir Sistemi (Beyin: Ön, Orta, Arka Beyin; Omurilik ve Refleks Yayı)',
      'Çevresel Sinir Sistemi (Somatik ve Otonom: Sempatik/Parasempatik)',
      'Endokrin Bezler ve Hormonlar (Hipofiz, Tiroid, Paratiroid, Böbrek Üstü Bezi, Pankreas, Eşeysel Bezler)',
      'Geri Bildirim (Feedback) Mekanizması ve Hormonal Hastalıklar'
    ]
  },
  {
    id: 'ayt_biyo_2',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 2,
    topicName: 'Duyu Organları',
    subtopics: [
      'Gözün Yapısı, Görme Mekanizması ve Göz Kusurları (Miyop, Hipermetrop, Astigmat, Presbitlik)',
      'Kulağın Yapısı, İşitme ve Denge Mekanizması (Korti Organı, Yarım Daire Kanalları)',
      'Burun, Dil ve Derinin Yapısı ve Reseptör Türleri (Mekanoreseptör, Fotoreseptör, Termoreseptör, Kemoreseptör)'
    ]
  },
  {
    id: 'ayt_biyo_3',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 3,
    topicName: 'Destek ve Hareket Sistemi',
    subtopics: [
      'Kemik Dokusu (Sıkı ve Süngerimsi Kemik, Havers ve Volkmann Kanalları) ve Kemik Çeşitleri',
      'Kıkırdak Dokusu (Hiyalin, Elastik, Fibröz Kıkırdak) ve Eklem Çeşitleri (Oynar, Yarı Oynar, Oynamaz)',
      'Kas Dokusu Çeşitleri (Çizgili Kas, Düz Kas, Kalp Kası)',
      'Çizgili Kasların Kasılma Mekanizması (Huxley\'in Kayan İplikler Modeli: A, I, H Bantları ve Sarkomer)',
      'Kasılmanın Kimyasal Süreci ve Enerji Kaynakları (ATP, Kreatin Fosfat, Glikojen, Laktik Asit)'
    ]
  },
  {
    id: 'ayt_biyo_4',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 4,
    topicName: 'Sindirim Sistemi',
    subtopics: [
      'Sindirim Kanalı Organları (Ağız, Yutak, Yemek Borusu, Mide, İnce Bağırsak, Kalın Bağırsak)',
      'Sindirime Yardımcı Organlar (Tükürük Bezleri, Karaciğer ve Safra Kesesi, Pankreas)',
      'Karbonhidrat, Protein ve Yağların Kimyasal Sindirimi ve İlgili Enzimler',
      'Besinlerin Emilimi (Kan Kılcalları ve Lenf Kılcalları Yoluyla Emilim)'
    ]
  },
  {
    id: 'ayt_biyo_5',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 5,
    topicName: 'Dolaşım ve Bağışıklık Sistemi',
    subtopics: [
      'Kalbin Yapısı, Çalışması, Kalp Döngüsü (Sistol/Diyastol) ve Kalbin Çalışmasını Etkileyen Faktörler',
      'Kan Damarları (Atardamar, Toplardamar, Kılcal Damar) ve Starling Hipotezi',
      'Büyük ve Küçük Kan Dolaşımı, Kan Dokusu (Plazma ve Kan Hücreleri: Alyuvar, Akyuvar, Kan Pulcukları)',
      'Lenf Dolaşımı (Lenf Sıvısı, Lenf Damarları, Lenf Düğümleri)',
      'Bağışıklık Sistemi (Özgül Olmayan Bağışıklık: 1. ve 2. Savunma Hattı; Özgül Bağışıklık: Humoral [B Hücreleri] ve Hücresel [T Hücreleri] Bağışıklık)'
    ]
  },
  {
    id: 'ayt_biyo_6',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 6,
    topicName: 'Solunum ve Boşaltım (Üriner) Sistemi',
    subtopics: [
      'İnsanda Solunum Sistemi Organları (Burun, Yutak, Gırtlak, Soluk Borusu, Akciğerler ve Alveoller)',
      'Soluk Alıp Verme Mekanizması (Diyafram ve Kaburgalar Arası Kaslar)',
      'Solunum Gazlarının Kanda Taşınması (Oksijenin ve Karbondioksitin Taşınma Yolları, Bohr Etkisi)',
      'Böbreğin Yapısı ve Nefronun Bölümleri (Glomerulus, Bowman Kapsülü, Proksimal Tüp, Henle Kulpu, Distal Tüp, Toplama Kanalı)',
      'İdrar Oluşum Basamakları (Süzülme, Geri Emilim, Salgılama) ve Homeostazinin Sağlanması'
    ]
  },
  {
    id: 'ayt_biyo_7',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 7,
    topicName: 'Üreme Sistemi ve Embriyonik Gelişim',
    subtopics: [
      'Erkek ve Dişi Üreme Sisteminin Yapısı ve Hormonal Kontrolü',
      'Oogenez, Spermatogenez ve Menstrüal Döngü Evreleri (Folikül, Ovulasyon, Korpus Luteum, Menstrüasyon)',
      'Döllenme ve Embriyonik Gelişim Basamakları (Segmentasyon, Blastula, Gastrula, Farklılaşma ve Organogenez)'
    ]
  },
  {
    id: 'ayt_biyo_8',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 8,
    topicName: 'Komünite ve Popülasyon Ekolojisi',
    subtopics: [
      'Komünitede Tür İçi ve Türler Arası İlişkiler (Rekabet, Av-Avcı, Simbiyoz: Mutualizm, Kommensalizm, Parazitizm)',
      'Komünitelerde Süksesyon (Birincil ve İkincil Süksesyon)',
      'Popülasyon Dinamiği (Yoğunluk, Dağılım Modelleri, Yaş Dağılımı)',
      'Popülasyon Büyüme Eğrileri (S Tipi ve J Tipi Büyüme Eğrisi, Taşıma Kapasitesi)'
    ]
  },
  {
    id: 'ayt_biyo_9',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 9,
    topicName: 'Genden Proteine (Nükleik Asitler ve Protein Sentezi)',
    subtopics: [
      'Nükleik Asitlerin Keşfi ve Yapısı (DNA ve RNA Çeşitleri: mRNA, tRNA, rRNA)',
      'DNA\'nın Yarı Korunumlu Replikasyonu (Helikaz, DNA Polimeraz, DNA Ligaz) ve Meselson-Stahl Deneyi',
      'Genetik Şifre (Kodon, Antikodon), Transkripsiyon (Yazılma) ve Translasyon (Okunma)',
      'Protein Sentezi Mekanizması ve Poliribozom (Polizom)',
      'Biyoteknoloji ve Genetik Mühendisliği (Rekombinant DNA, Klonlama, Kök Hücre, Gen Terapisi)'
    ]
  },
  {
    id: 'ayt_biyo_10',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 10,
    topicName: 'Canlılarda Enerji Dönüşümleri (Solunum ve Fotosentez)',
    subtopics: [
      'Hücresel Solunum: Glikoliz Evresi (Sitoplazmada)',
      'Krebs Döngüsü ve Oksidatif Fosforilasyon (ETS: Mitokondri İç Zarı)',
      'Oksijensiz Solunum ve Fermantasyon Çeşitleri (Laktik Asit ve Etil Alkol Fermantasyonu)',
      'Fotosentez Reaksiyonları: Işığa Bağımlı Evre (Tilakoit Zarda) ve Işıktan Bağımsız Evre (Calvin Döngüsü)',
      'Kemosentez Mekanizması ve Fotosentez-Kemosentez Karşılaştırması'
    ]
  },
  {
    id: 'ayt_biyo_11',
    examType: 'AYT',
    subject: 'AYT Biyoloji',
    orderNo: 11,
    topicName: 'Bitki Biyolojisi ve Çevre',
    subtopics: [
      'Bitkisel Dokular (Meristem Doku, Temel Doku: Parankima/Kollenkima/Sklerenkima, İletim Dokusu: Ksilem/Floem, Örtü Doku: Epidermis/Periderm)',
      'Bitki Organları: Kök, Gövde ve Yaprağın Anatomik Yapısı',
      'Bitkilerde Su ve Mineral Taşınması (Kılcallık, Kök Basıncı, Terleme-Çekim Teorisi) ve Organik Madde Taşınması (Basınç-Akış Teorisi)',
      'Bitkisel Hormonlar (Oksin, Giberellin, Sitokinin, Absisik Asit, Etilen) ve Hareketler (Tropizma ve Nasti)',
      'Çiçekli Bitkilerde Üreme, Tozlaşma, Çifte Döllenme, Tohum ve Meyve Oluşumu, Çimlenme'
    ]
  },

  // ==================== AYT EDEBİYAT ====================
  {
    id: 'ayt_edeb_1',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 1,
    topicName: 'Şiir Bilgisi ve Edebi Sanatlar',
    subtopics: [
      'Nazım Birimi, Nazım Şekli, Nazım Türü, Ölçü (Hece, Aruz, Serbest)',
      'Kafiye (Uyak) Çeşitleri (Yarım, Tam, Zengin, Cinaslı) ve Redif, Kafiye Düzenleri',
      'Edebi Sanatlar (Teşbih, İstiare, Mecaz-ı Mürsel, Teşhis, İntak, Tezat, Telmih, Tenasüp, Hüsn-i Talil, Tecahül-i Arif, Kinaye, Tariz, Tevriye)'
    ]
  },
  {
    id: 'ayt_edeb_2',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 2,
    topicName: 'İslamiyet Öncesi ve Geçiş Dönemi Türk Edebiyatı',
    subtopics: [
      'Sözlü Dönem (Koşuk, Sagu, Sav, Destan) ve Yazılı Dönem (Göktürk ve Uygur Metinleri)',
      'Türk Destanları (Alp Er Tunga, Şu, Oğuz Kağan, Ergenekon, Türeyiş, Göç vb.)',
      'Geçiş Dönemi Eserleri (Kutadgu Bilig, Divanü Lugati\'t-Türk, Atabetü\'l-Hakayık, Divan-ı Hikmet, Dede Korkut Hikayeleri)'
    ]
  },
  {
    id: 'ayt_edeb_3',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 3,
    topicName: 'Halk Edebiyatı',
    subtopics: [
      'Anonim Halk Edebiyatı (Mani, Türkü, Ağıt, Ninni, Masal, Karagöz, Orta Oyunu, Meddah)',
      'Âşık Tarzı Halk Edebiyatı (Koşma [Güzelleme, Koçaklama, Taşlama, Ağıt], Semai, Varsağı, Destan) ve Temsilcileri (Köroğlu, Karacaoğlan, Dadaloğlu, Âşık Veysel)',
      'Dini-Tasavvufi (Tekke) Halk Edebiyatı (İlahi, Nefes, Deme, Nutuk, Devriye, Şathiye) ve Temsilcileri (Yunus Emre, Hacı Bektaş, Kaygusuz Abdal, Pir Sultan Abdal)'
    ]
  },
  {
    id: 'ayt_edeb_4',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 4,
    topicName: 'Divan Edebiyatı',
    subtopics: [
      'Divan Edebiyatı Özellikleri, Mazmunlar ve Nesir Türleri (Tazarruname, Tezkire, Seyahatname, Sefaretname, Siyasetname)',
      'Beyitlerle Kurulan Nazım Şekilleri (Gazel, Kaside [Bölümleri], Mesnevi, Müstezat, Kıta)',
      'Dörtlüklerle ve Bentlerle Kurulan Nazım Şekilleri (Rubai, Tuyuğ, Murabba, Şarkı, Terkib-i Bent, Terci-i Bent)',
      'Yüzyıllara Göre Divan Şairleri (Fuzuli, Baki, Nedim, Şeyh Galip, Nef\'i, Nabi, Şeyhi, Ahmedi, Kadı Burhaneddin vb.)'
    ]
  },
  {
    id: 'ayt_edeb_5',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 5,
    topicName: 'Tanzimat, Servet-i Fünun ve Fecr-i Âti Edebiyatı',
    subtopics: [
      'Tanzimat I. Dönem (Şinasi, Namık Kemal, Ziya Paşa, Ahmet Mithat Efendi, Şemsettin Sami)',
      'Tanzimat II. Dönem (Recaizade Mahmut Ekrem, Abdülhak Hamit Tarhan, Samipaşazade Sezai, Muallim Naci, Nabizade Nazım)',
      'Servet-i Fünun Edebiyatı (Tevfik Fikret, Cenap Şahabettin, Halit Ziya Uşaklıgil, Mehmet Rauf, Hüseyin Cahit Yalçın)',
      'Fecr-i Âti Edebiyatı ve Ahmet Haşim, Bağımsız Yazarlar (Hüseyin Rahmi Gürpınar, Ahmet Rasim)'
    ]
  },
  {
    id: 'ayt_edeb_6',
    examType: 'AYT',
    subject: 'Edebiyat',
    orderNo: 6,
    topicName: 'Milli Edebiyat ve Cumhuriyet Dönemi Türk Edebiyatı',
    subtopics: [
      'Milli Edebiyat Dönemi ve Genç Kalemler (Ömer Seyfettin, Ziya Gökalp, Ali Canip Yöntem, Mehmet Emin Yurdakul, Yakup Kadri, Reşat Nuri, Halide Edip, Refik Halit)',
      'Cumhuriyet Dönemi Şiir Anlayışları (Öz Şiir, Yedi Meşaleciler, Toplumcu Gerçekçiler, Garip Akımı, İkinci Yeni, Dini Değerleri Öne Çıkaranlar)',
      'Cumhuriyet Dönemi Roman ve Hikaye (Milli Edebiyat Zevkini Sürdürenler, Toplumcu Gerçekçiler, Bireyin İç Dünyasını Esas Alanlar, Modernist ve Postmodernist Roman)',
      'Cumhuriyet Dönemi Tiyatro ve Öğretici Metinler, Batı Edebiyatı Akımları (Klasisizm, Romantizm, Realizm, Natüralizm, Parnasizm, Sembolizm, Sürrealizm)'
    ]
  },
  {
    id: 'ayt_tar_1',
    examType: 'AYT',
    subject: 'Tarih-1',
    orderNo: 1,
    topicName: 'Tarih Bilimi, İlk Çağ, Orta Çağ ve Türk-İslam Tarihi',
    subtopics: [
      'Tarih Yazıcılığı ve Uygarlıkların Doğuşu',
      'Orta Çağ\'da Siyasi Yapılar, Feodalite ve Haçlı Seferleri',
      'İslam Medeniyeti Siyasi Tarihi, Bilim ve Kültür Kurumları',
      'Selçuklu ve Osmanlı Devlet Teşkilatı, Divan-ı Hümayun ve Tımar Sistemi'
    ]
  },
  {
    id: 'ayt_tar_2',
    examType: 'AYT',
    subject: 'Tarih-1',
    orderNo: 2,
    topicName: '20. Yüzyıl Başları, Milli Mücadele ve Çağdaş Türk/Dünya Tarihi',
    subtopics: [
      'I. ve II. Dünya Savaşı Nedenleri, Gelişimi ve Sonuçları',
      'Milli Mücadele Dönemi Siyasi ve Askeri Gelişmeler, Dış Politika',
      'Soğuk Savaş Dönemi, Bloklaşmalar, Bağlantısızlar Hareketi',
      'Yumuşama (Detant) Dönemi, Küreselleşen Dünya ve Türk Dünyası'
    ]
  },
  {
    id: 'ayt_cog_1',
    examType: 'AYT',
    subject: 'Coğrafya-1',
    orderNo: 1,
    topicName: 'Ekosistemler, Nüfus Politikaları ve Türkiye Ekonomisi',
    subtopics: [
      'Biyoçeşitlilik, Madde Döngüleri ve Enerji Akışı, Ekstrem Doğa Olayları',
      'Dünya\'da Nüfus Politikaları ve Şehirlerin Fonksiyonel Gelişimi',
      'Türkiye\'nin Ekonomi Politikaları, Tarım, Hayvancılık, Ormancılık ve Madenler',
      'Türkiye\'de Sanayi, Enerji Kaynakları, Ulaşım, Ticaret ve Turizm'
    ]
  },
  {
    id: 'ayt_cog_2',
    examType: 'AYT',
    subject: 'Coğrafya-1',
    orderNo: 2,
    topicName: 'Bölgeler, Küresel Örgütler ve Çevre Politikaları',
    subtopics: [
      'Küresel ve Bölgesel Ticaret Hatları, Boğazlar ve Kanallar',
      'Uluslararası Örgütler (BM, NATO, AB, İİT, OECD, Karadeniz Ekonomik İşbirliği)',
      'Çevre Sorunları, Doğal Kaynakların Sürdürülebilir Kullanımı ve Uluslararası Çevre Sözleşmeleri'
    ]
  }
];

function createDefaultCurriculumTracking(student) {
  return CURRICULUM_DATABASE.map(item => {
    let watched = false;
    let watchSource = '';
    let solvedQ = 0;
    let correctQ = 0;
    let wrongQ = 0;
    let coachNote = '';

    if (student && (student.username === 'ahmet' || student.id === 'std_1')) {
      if (item.id === 'tyt_turkce_1') {
        watched = true;
        watchSource = 'Hız ve Renk';
        solvedQ = 160;
        correctQ = 148;
        wrongQ = 12;
        coachNote = 'Kavramlar oturdu, deneme analizleri yapıldı.';
      } else if (item.id === 'tyt_turkce_2') {
        watched = true;
        watchSource = 'Benim Hocam';
        solvedQ = 120;
        correctQ = 110;
        wrongQ = 10;
        coachNote = 'Deyim yanlışlarına dikkat.';
      } else if (item.id === 'tyt_turkce_3') {
        watched = true;
        watchSource = 'Rüştü Hoca';
        solvedQ = 200;
        correctQ = 188;
        wrongQ = 12;
        coachNote = 'Çok başarılı gidiyor.';
      } else if (item.id === 'tyt_mat_1') {
        watched = true;
        watchSource = 'Mert Hoca';
        solvedQ = 250;
        correctQ = 238;
        wrongQ = 12;
        coachNote = 'Temel kavramlar bitti.';
      } else if (item.id === 'tyt_mat_2') {
        watched = true;
        watchSource = 'Rehber Matematik';
        solvedQ = 180;
        correctQ = 172;
        wrongQ = 8;
        coachNote = 'Basamak analizi tamam.';
      } else if (item.id === 'tyt_mat_12') {
        watched = true;
        watchSource = 'Apotemi Problem';
        solvedQ = 320;
        correctQ = 295;
        wrongQ = 25;
        coachNote = 'Problem rutini aksatılmayacak.';
      } else if (item.id === 'ayt_mat_10' || item.id === 'ayt_mat_11') {
        watched = true;
        watchSource = 'Apotemi Türev';
        solvedQ = 220;
        correctQ = 198;
        wrongQ = 22;
        coachNote = 'Teğet ve geometrik yorum tekrar edilecek.';
      } else if (item.id === 'tyt_fiz_1' || item.id === 'tyt_fiz_2') {
        watched = true;
        watchSource = 'VIP Fizik';
        solvedQ = 140;
        correctQ = 130;
        wrongQ = 10;
        coachNote = 'Özkütle grafikleri iyi.';
      } else if (item.id === 'ayt_fiz_8') {
        watched = true;
        watchSource = 'Altuğ Güneş';
        solvedQ = 150;
        correctQ = 132;
        wrongQ = 18;
        coachNote = 'Paralel levhalarda pratik yapılmalı.';
      }
    } else if (student && (student.username === 'zeynep' || student.id === 'std_2')) {
      if (item.id === 'tyt_turkce_1') {
        watched = true;
        watchSource = 'Hız ve Renk';
        solvedQ = 180;
        correctQ = 170;
        wrongQ = 10;
        coachNote = 'Çok iyi.';
      } else if (item.id === 'ayt_edeb_1') {
        watched = true;
        watchSource = 'Kadir Gümüş';
        solvedQ = 240;
        correctQ = 226;
        wrongQ = 14;
        coachNote = 'Edebi sanatlar ezberlendi.';
      } else if (item.id === 'ayt_edeb_4') {
        watched = true;
        watchSource = 'Rüştü Hoca';
        solvedQ = 200;
        correctQ = 185;
        wrongQ = 15;
        coachNote = 'Nazım şekilleri tamam.';
      } else if (item.id === 'tyt_mat_12') {
        watched = true;
        watchSource = 'Şenol Hoca';
        solvedQ = 220;
        correctQ = 195;
        wrongQ = 25;
        coachNote = 'Hız ve yaş problemleri çözüldü.';
      }
    }

    return {
      topicId: item.id,
      examType: item.examType,
      subject: item.subject,
      orderNo: item.orderNo,
      topicName: item.topicName,
      subtopics: item.subtopics || [],
      watched: watched,
      watchSource: watchSource,
      solvedQ: solvedQ,
      correctQ: correctQ,
      wrongQ: wrongQ,
      coachNote: coachNote,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  });
}

const DEFAULT_DATA = {
  admin: {
    username: 'ogretmen',
    password: '123456',
    fullname: 'Öğretmen (Koç)',
    role: 'admin'
  },
  students: [
    {
      id: 'std_1',
      fullname: 'Ahmet Yılmaz',
      username: 'ahmet',
      password: '1234',
      target: 'YKS Sayısal (MF)',
      targetTytNet: 105.00,
      targetAytNet: 75.00,
      role: 'student',
      coachNote: 'Bu hafta özellikle Paragraf rutinini aksatma ve Türev konusundaki zor seviye testlere odaklan. Takıldığın her soruyu not al!',
      tasks: [
        {
          id: 'task_101',
          day: 'Pazartesi',
          subject: 'Matematik',
          topic: 'Türev - Fiziksel Yorum & Geometrik Yorum',
          targetQ: 50,
          solvedQ: 50,
          duration: '90 dk',
          description: 'Apotemi Fasikülü Test 3-4 çözülecek.',
          isDone: true,
          studentNotes: 'Geometrik yorum testini fulledim, gayet iyi anladım.'
        },
        {
          id: 'task_102',
          day: 'Pazartesi',
          subject: 'Paragraf',
          topic: 'Günlük Rutin Paragraf',
          targetQ: 30,
          solvedQ: 30,
          duration: '35 dk',
          description: 'Kronometre tutarak çözülecek.',
          isDone: true,
          studentNotes: '28 doğru 2 yanlış geldi.'
        },
        {
          id: 'task_103',
          day: 'Salı',
          subject: 'Fizik',
          topic: 'Elektriksel Potansiyel ve İş',
          targetQ: 45,
          solvedQ: 45,
          duration: '80 dk',
          description: 'Konu tekrar videosu izle + 3D soru bankası test 2-3.',
          isDone: true,
          studentNotes: 'Konu oturdu hocam.'
        },
        {
          id: 'task_104',
          day: 'Çarşamba',
          subject: 'Kimya',
          topic: 'Sıvı Çözeltiler ve Koligatif Özellikler',
          targetQ: 40,
          solvedQ: 20,
          duration: '75 dk',
          description: 'Ozmotik basınç ve kaynama noktası yükselmesi soruları.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_105',
          day: 'Perşembe',
          subject: 'Biyoloji',
          topic: 'Genden Proteine (Transkripsiyon - Translasyon)',
          targetQ: 50,
          solvedQ: 0,
          duration: '60 dk',
          description: 'MEB kitabı taraması + Palme Soru Bankası.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_106',
          day: 'Cuma',
          subject: 'Geometri',
          topic: 'Çemberde Açılar & Uzunluk',
          targetQ: 40,
          solvedQ: 0,
          duration: '70 dk',
          description: 'Karekök Geometri Test 5-6-7.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_107',
          day: 'Cumartesi',
          subject: 'Deneme Sınavı',
          topic: 'TYT Genel Deneme Sınavı',
          targetQ: 120,
          solvedQ: 0,
          duration: '165 dk',
          description: 'Evde gerçek sınav saatinde (10:15) başlanacak.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_108',
          day: 'Pazar',
          subject: 'Diğer',
          topic: 'Haftalık Deneme Analizi & Eksik Kapatma',
          targetQ: 0,
          solvedQ: 0,
          duration: '90 dk',
          description: 'Cumartesi yapılan denemenin video çözümleri incelenecek.',
          isDone: false,
          studentNotes: ''
        }
      ],
      mockExams: [
        {
          id: 'exam_101',
          title: 'Özdebir Türkiye Geneli TYT-1',
          type: 'TYT',
          date: '2025-10-12',
          totalNet: 92.00,
          scores: [
            { subject: 'Türkçe', correct: 34, wrong: 4, empty: 2, net: 33.00 },
            { subject: 'Sosyal Bilgiler', correct: 16, wrong: 3, empty: 1, net: 15.25 },
            { subject: 'Temel Matematik', correct: 31, wrong: 5, empty: 4, net: 29.75 },
            { subject: 'Fen Bilimleri', correct: 15, wrong: 4, empty: 1, net: 14.00 }
          ],
          mistakes: [
            {
              subject: 'Matematik',
              topic: 'Olasılık & Kombinasyon',
              count: 2,
              reason: 'Bilgi Eksikliği',
              advice: 'Kombinasyon formülleri ve koşullu olasılık soru tipleri tekrar edilecek.',
              resolved: false
            },
            {
              subject: 'Matematik',
              topic: 'Problemler (Grafik & Tablo Yorumlama)',
              count: 2,
              reason: 'Dikkat / İşlem Hatası',
              advice: 'Soru kökünde istenen birimi daire içine alarak çöz.',
              resolved: true
            },
            {
              subject: 'Fizik',
              topic: 'Optik - Kırılma ve Mercekler',
              count: 2,
              reason: 'Formül / Kural Unutuldu',
              advice: 'Mercek çizimleri ve özel ışınlar tablosu çıkarılacak.',
              resolved: false
            },
            {
              subject: 'Türkçe',
              topic: 'Noktalama İşaretleri & Yazım Kuralları',
              count: 2,
              reason: 'Bilgi Eksikliği',
              advice: 'TDK son güncellemeleri ve kesme işareti kuralları çalışılacak.',
              resolved: true
            },
            {
              subject: 'Kimya',
              topic: 'Asitler, Bazlar ve Tuzlar',
              count: 1,
              reason: 'Dikkat / İşlem Hatası',
              advice: 'Nötralleşme mol hesabı basamaklarına dikkat.',
              resolved: true
            }
          ],
          coachFeedback: 'Genel net seviyesi çok iyi. Özellikle Optik ve Olasılık konularındaki tekrarları bu haftaki plana dahil ettik.'
        },
        {
          id: 'exam_102',
          title: '3D Türkiye Geneli AYT Denemesi-1',
          type: 'AYT',
          date: '2025-10-20',
          totalNet: 61.00,
          scores: [
            { subject: 'AYT Matematik', correct: 33, wrong: 4, empty: 3, net: 32.00 },
            { subject: 'Fizik', correct: 10, wrong: 3, empty: 1, net: 9.25 },
            { subject: 'Kimya', correct: 11, wrong: 2, empty: 0, net: 10.50 },
            { subject: 'Biyoloji', correct: 10, wrong: 3, empty: 0, net: 9.25 }
          ],
          mistakes: [
            {
              subject: 'Matematik',
              topic: 'Türev - Geometrik Yorum & Teğet',
              count: 2,
              reason: 'Bilgi Eksikliği',
              advice: 'Apotemi Türev Fasikülü Test 4 çözülecek.',
              resolved: false
            },
            {
              subject: 'Fizik',
              topic: 'Elektriksel Kuvvet ve Potansiyel',
              count: 2,
              reason: 'Zaman / Yetişmedi',
              advice: 'Fizik sorularında işlem süresini kısaltmak için pratik yap.',
              resolved: false
            },
            {
              subject: 'Kimya',
              topic: 'Kimyasal Denge ve Le Chatelier',
              count: 1,
              reason: 'Dikkat / İşlem Hatası',
              advice: 'Hacim ve basınç değişiminin dengeye etkisini tekrarla.',
              resolved: true
            },
            {
              subject: 'Biyoloji',
              topic: 'Fotosentez ve Kemosentez',
              count: 2,
              reason: 'Bilgi Eksikliği',
              advice: 'Işıktan bağımsız evre reaksiyon şeması çizilip masaya asılacak.',
              resolved: false
            }
          ],
          coachFeedback: 'AYT Matematikte geometri kısmı çok temiz gelmiş. Fizikteki süre kaybını soru pratiğiyle çözeceğiz.'
        },
        {
          id: 'exam_103',
          title: 'Bes Yayınları TYT Kurumsal-2',
          type: 'TYT',
          date: '2025-10-28',
          totalNet: 101.50,
          scores: [
            { subject: 'Türkçe', correct: 36, wrong: 3, empty: 1, net: 35.25 },
            { subject: 'Sosyal Bilgiler', correct: 17, wrong: 2, empty: 1, net: 16.50 },
            { subject: 'Temel Matematik', correct: 34, wrong: 3, empty: 3, net: 33.25 },
            { subject: 'Fen Bilimleri', correct: 17, wrong: 2, empty: 1, net: 16.50 }
          ],
          mistakes: [
            {
              subject: 'Türkçe',
              topic: 'Paragrafta Ana Düşünce & Olumsuz Soru Kökü',
              count: 2,
              reason: 'Soru Kökü Yanlış Okundu',
              advice: 'Değinilmemiştir / Ulaşılamaz sorularında önce şıkları oku.',
              resolved: true
            },
            {
              subject: 'Matematik',
              topic: 'Polinomlar & Bölme Kalan İlişkisi',
              count: 2,
              reason: 'Dikkat / İşlem Hatası',
              advice: 'İşlem basamaklarını üşenmeden alt alta yaz.',
              resolved: true
            },
            {
              subject: 'Fizik',
              topic: 'Dinamik - Sürtünme Kuvveti',
              count: 1,
              reason: 'Bilgi Eksikliği',
              advice: 'Statik ve kinetik sürtünme katsayısı farkını gözden geçir.',
              resolved: false
            }
          ],
          coachFeedback: 'Harika bir sıçrama! 100 net barajını aştık. Bu ivmeyi haftalık AYT çalışmalarına da yansıtalım.'
        }
      ]
    },
    {
      id: 'std_2',
      fullname: 'Zeynep Kaya',
      username: 'zeynep',
      password: '1234',
      target: 'YKS Eşit Ağırlık (TM)',
      targetTytNet: 90.00,
      targetAytNet: 65.00,
      role: 'student',
      coachNote: 'Matematik problemlerini mutlaka zamana karşı çöz. Edebiyatta Cumhuriyet Dönemi şiir akımlarını bu hafta bitirelim.',
      tasks: [
        {
          id: 'task_201',
          day: 'Pazartesi',
          subject: 'Matematik',
          topic: 'Hız ve Yaş Problemleri',
          targetQ: 50,
          solvedQ: 50,
          duration: '80 dk',
          description: 'Problem Fasikülü Test 8-10.',
          isDone: true,
          studentNotes: ''
        },
        {
          id: 'task_202',
          day: 'Salı',
          subject: 'Türkçe',
          topic: 'Cumhuriyet Dönemi Şiir',
          targetQ: 40,
          solvedQ: 40,
          duration: '90 dk',
          description: 'Garipçiler ve İkinci Yeni şairleri özet çıkarılacak.',
          isDone: true,
          studentNotes: 'Özetler hazırlandı.'
        },
        {
          id: 'task_203',
          day: 'Çarşamba',
          subject: 'Tarih',
          topic: 'Milli Mücadele Dönemi',
          targetQ: 45,
          solvedQ: 0,
          duration: '60 dk',
          description: 'Kongreler ve TBMM dönemi soru çözümü.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_204',
          day: 'Perşembe',
          subject: 'Coğrafya',
          topic: 'Türkiye’de İklim ve Bitki Örtüsü',
          targetQ: 35,
          solvedQ: 0,
          duration: '50 dk',
          description: 'Harita çalışmaları yapılacak.',
          isDone: false,
          studentNotes: ''
        },
        {
          id: 'task_205',
          day: 'Cuma',
          subject: 'Matematik',
          topic: 'İkinci Dereceden Denklemler',
          targetQ: 40,
          solvedQ: 0,
          duration: '75 dk',
          description: 'Kök-katsayı bağıntıları soru kalıpları.',
          isDone: false,
          studentNotes: ''
        }
      ],
      mockExams: [
        {
          id: 'exam_201',
          title: 'Hız ve Renk TYT-1',
          type: 'TYT',
          date: '2025-10-15',
          totalNet: 78.50,
          scores: [
            { subject: 'Türkçe', correct: 35, wrong: 4, empty: 1, net: 34.00 },
            { subject: 'Sosyal Bilgiler', correct: 18, wrong: 2, empty: 0, net: 17.50 },
            { subject: 'Temel Matematik', correct: 22, wrong: 4, empty: 14, net: 21.00 },
            { subject: 'Fen Bilimleri', correct: 7, wrong: 4, empty: 9, net: 6.00 }
          ],
          mistakes: [
            {
              subject: 'Matematik',
              topic: 'Yüzde & Kar-Zarar Problemleri',
              count: 2,
              reason: 'Zaman / Yetişmedi',
              advice: 'Problemlere günde 20 soru kronometre ile devam.',
              resolved: true
            },
            {
              subject: 'Türkçe',
              topic: 'Cümlenin Ögeleri & Sözcük Türleri',
              count: 2,
              reason: 'Bilgi Eksikliği',
              advice: 'Zarf ve edat ayırt etme alıştırması yapılacak.',
              resolved: false
            }
          ],
          coachFeedback: 'Türkçe ve Sosyal netleri çok güçlü. Matematikteki problem hızımızı artırdığımızda 85+ bandına çıkacağız.'
        },
        {
          id: 'exam_202',
          title: 'Limit Yayınları AYT Eşit Ağırlık-1',
          type: 'AYT',
          date: '2025-10-25',
          totalNet: 52.25,
          scores: [
            { subject: 'Edebiyat', correct: 21, wrong: 3, empty: 0, net: 20.25 },
            { subject: 'Tarih-1', correct: 8, wrong: 2, empty: 0, net: 7.50 },
            { subject: 'Coğrafya-1', correct: 5, wrong: 1, empty: 0, net: 4.75 },
            { subject: 'AYT Matematik', correct: 21, wrong: 5, empty: 14, net: 19.75 }
          ],
          mistakes: [
            {
              subject: 'Edebiyat',
              topic: 'Divan Edebiyatı Nazım Şekilleri & Şairler',
              count: 2,
              reason: 'Formül / Kural Unutuldu',
              advice: 'Müstezat ve terkib-i bent özellikleri tekrar edilecek.',
              resolved: true
            },
            {
              subject: 'Matematik',
              topic: 'Logaritma ve Diziler',
              count: 3,
              reason: 'Bilgi Eksikliği',
              advice: 'Geometrik dizi toplam formülü ve taban değiştirme kuralı çalışılacak.',
              resolved: false
            }
          ],
          coachFeedback: 'Edebiyat ve Tarih çok sağlam gidiyor. Logaritma ve dizi eksiklerini bu hafta kapatalım.'
        }
      ]
    }
  ],
  lessons: [
    {
      id: 'les_1',
      studentId: 'std_1',
      studentName: 'Ahmet Yılmaz',
      date: '2026-09-07',
      time: '16:00 - 17:00',
      subject: 'Matematik',
      topic: 'Türev - Fiziksel & Geometrik Yorum',
      status: 'completed',
      note: 'Teğet eğimi ve maksimum-minimum problemleri çözüldü.'
    },
    {
      id: 'les_2',
      studentId: 'std_2',
      studentName: 'Zeynep Kaya',
      date: '2026-09-08',
      time: '17:30 - 18:30',
      subject: 'Türkçe',
      topic: 'Cumhuriyet Dönemi Şiir & Edebi Sanatlar',
      status: 'completed',
      note: 'İkinci Yeni ve Garip akımları karşılaştırıldı.'
    },
    {
      id: 'les_3',
      studentId: 'std_1',
      studentName: 'Ahmet Yılmaz',
      date: '2026-09-14',
      time: '15:00 - 16:00',
      subject: 'Fizik',
      topic: 'Elektriksel Potansiyel ve İş',
      status: 'completed',
      note: '3D soru bankası test 2-3 analiz edildi.'
    },
    {
      id: 'les_4',
      studentId: 'std_2',
      studentName: 'Zeynep Kaya',
      date: '2026-09-14',
      time: '16:30 - 17:30',
      subject: 'Matematik',
      topic: 'Hız ve Yaş Problemleri',
      status: 'completed',
      note: 'Zamana karşı pratik yapıldı.'
    },
    {
      id: 'les_5',
      studentId: 'std_1',
      studentName: 'Ahmet Yılmaz',
      date: '2026-09-21',
      time: '16:00 - 17:00',
      subject: 'Matematik',
      topic: 'İntegral Alma Kuralları ve Belirsiz İntegral',
      status: 'completed',
      note: 'Değişken değiştirme yöntemi pekiştirildi.'
    },
    {
      id: 'les_6',
      studentId: 'std_2',
      studentName: 'Zeynep Kaya',
      date: '2026-09-21',
      time: '17:30 - 18:30',
      subject: 'Koçluk & Rehberlik',
      topic: 'Haftalık Deneme Analizi & Eksik Kapatma',
      status: 'completed',
      note: 'Deneme netleri incelendi, yeni haftalık program yazıldı.'
    },
    {
      id: 'les_7',
      studentId: 'std_1',
      studentName: 'Ahmet Yılmaz',
      date: '2026-09-25',
      time: '16:30 - 17:30',
      subject: 'Geometri',
      topic: 'Çemberde Açılar & Uzunluk Soru Çözümü',
      status: 'planned',
      note: 'Karekök geometri fasikülünden zor sorular çözülecek.'
    },
    {
      id: 'les_8',
      studentId: 'std_2',
      studentName: 'Zeynep Kaya',
      date: '2026-09-26',
      time: '14:00 - 15:00',
      subject: 'Tarih',
      topic: 'Milli Mücadele Dönemi & Kongreler',
      status: 'planned',
      note: 'Harita üzerinden kronolojik tekrar yapılacak.'
    },
    {
      id: 'les_9',
      studentId: 'std_1',
      studentName: 'Ahmet Yılmaz',
      date: '2026-09-28',
      time: '17:00 - 18:00',
      subject: 'Kimya',
      topic: 'Sıvı Çözeltiler ve Koligatif Özellikler',
      status: 'planned',
      note: 'Kaynama noktası yükselmesi ve ozmotik basınç.'
    }
  ]
};

// ==========================================================================
// 2. STATE (DURUM) YÖNETİMİ
// ==========================================================================
const STORAGE_KEY = 'kocluk360_data_v2';
const SESSION_KEY = 'kocluk360_active_session_v2';
const THEME_KEY = 'kocluk360_theme_v2';

let appState = {
  admin: null,
  students: [],
  lessons: []
};

let currentSession = null;
let selectedStudentId = null;
let studentDayFilter = 'all';

let coachActiveTab = 'schedule';
let studentActiveTab = 'schedule';

let coachExamFilter = 'all';
let coachExamSearchQuery = '';
let coachChartFilter = 'all';

let studentExamFilter = 'all';
let studentExamSearchQuery = '';
let studentChartFilter = 'all';

// Konu Takip Çizelgesi Filtre Durumları
let coachCurriculumExamFilter = 'all'; // 'all' | 'TYT' | 'AYT'
let coachCurriculumSubjectFilter = 'all';
let coachCurriculumStatusFilter = 'all';
let coachCurriculumSearchQuery = '';

let studentCurriculumExamFilter = 'all';
let studentCurriculumSubjectFilter = 'all';
let studentCurriculumStatusFilter = 'all';
let studentCurriculumSearchQuery = '';

// Öğretmen Ders Takvimi Durumları
let calendarCurrentDate = new Date(2026, 8, 21); // Varsayılan Eylül 2026
let calendarSelectedStudent = 'all';
let calendarSelectedStatus = 'all';

function initDatabase() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      appState = JSON.parse(savedData);
      
      if (!appState.lessons || !Array.isArray(appState.lessons) || appState.lessons.length === 0) {
        appState.lessons = JSON.parse(JSON.stringify(DEFAULT_DATA.lessons || []));
      }

      if (appState.students) {
        appState.students.forEach(st => {
          if (!st.mockExams) {
            const defStd = DEFAULT_DATA.students.find(ds => ds.id === st.id || ds.username === st.username);
            st.mockExams = defStd && defStd.mockExams ? JSON.parse(JSON.stringify(defStd.mockExams)) : [];
          }
          if (st.targetTytNet === undefined || st.targetTytNet === null) {
            const defStd = DEFAULT_DATA.students.find(ds => ds.id === st.id || ds.username === st.username);
            st.targetTytNet = defStd && defStd.targetTytNet ? defStd.targetTytNet : 105.00;
          }
          if (st.targetAytNet === undefined || st.targetAytNet === null) {
            const defStd = DEFAULT_DATA.students.find(ds => ds.id === st.id || ds.username === st.username);
            st.targetAytNet = defStd && defStd.targetAytNet ? defStd.targetAytNet : 75.00;
          }
          if (!st.curriculumTracking || !Array.isArray(st.curriculumTracking) || st.curriculumTracking.length === 0) {
            st.curriculumTracking = createDefaultCurriculumTracking(st);
          }
        });
        saveDatabase();
      }
    } catch (e) {
      console.error('Veri yüklenirken hata oluştu, varsayılan yükleniyor:', e);
      appState = JSON.parse(JSON.stringify(DEFAULT_DATA));
      if (appState.students) {
        appState.students.forEach(st => {
          st.curriculumTracking = createDefaultCurriculumTracking(st);
        });
      }
      saveDatabase();
    }
  } else {
    appState = JSON.parse(JSON.stringify(DEFAULT_DATA));
    if (appState.students) {
      appState.students.forEach(st => {
        st.curriculumTracking = createDefaultCurriculumTracking(st);
      });
    }
    saveDatabase();
  }

  if (appState.students && appState.students.length > 0) {
    selectedStudentId = appState.students[0].id;
  }
}

function saveDatabase() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
}

// ==========================================================================
// 3. TEMA (DARK / LIGHT) VE ARAYÜZ YARDIMCILARI
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('theme-toggle-btn');
  if (btn) {
    btn.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun" style="color: #f59e0b"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '<i class="fa-solid fa-circle-info text-info"></i>';
  if (type === 'success') icon = '<i class="fa-solid fa-circle-check text-success"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-circle-exclamation text-danger"></i>';

  toast.innerHTML = `${icon} <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(50px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function getSubjectBadgeClass(subject) {
  switch (subject) {
    case 'Matematik':
    case 'AYT Matematik':
    case 'Temel Matematik': 
      return 'badge-mat';
    case 'Geometri': return 'badge-geo';
    case 'Fizik': return 'badge-fizik';
    case 'Kimya': return 'badge-kimya';
    case 'Biyoloji': return 'badge-biyo';
    case 'Türkçe':
    case 'Edebiyat': return 'badge-turkce';
    case 'Tarih':
    case 'Tarih-1': return 'badge-tarih';
    case 'Coğrafya':
    case 'Coğrafya-1': return 'badge-cog';
    case 'Paragraf': return 'badge-paragraf';
    case 'Deneme Sınavı': return 'badge-deneme';
    default: return 'badge-diger';
  }
}

function getReasonBadgeClass(reason) {
  switch (reason) {
    case 'Bilgi Eksikliği': return 'badge-reason-knowledge';
    case 'Dikkat / İşlem Hatası': return 'badge-reason-careless';
    case 'Zaman / Yetişmedi': return 'badge-reason-time';
    case 'Soru Kökü Yanlış Okundu': return 'badge-reason-reading';
    case 'Formül / Kural Unutuldu': return 'badge-reason-formula';
    default: return 'badge-reason-other';
  }
}

// ==========================================================================
// 4. OTURUM VE KİMLİK DOĞRULAMA (AUTH)
// ==========================================================================
function checkExistingSession() {
  const savedSession = localStorage.getItem(SESSION_KEY);
  if (savedSession) {
    try {
      currentSession = JSON.parse(savedSession);
      renderAppropriateView();
      return;
    } catch (e) {
      localStorage.removeItem(SESSION_KEY);
    }
  }
  showLoginView();
}

function handleLogin(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('login-username').value.trim().toLowerCase();
  const passwordInput = document.getElementById('login-password').value.trim();

  if (!usernameInput || !passwordInput) {
    showToast('Lütfen kullanıcı adı ve şifrenizi girin.', 'error');
    return;
  }

  // 1. Admin kontrolü
  if (usernameInput === appState.admin.username.toLowerCase() && passwordInput === appState.admin.password) {
    currentSession = {
      role: 'admin',
      username: appState.admin.username,
      fullname: appState.admin.fullname
    };
    if (document.getElementById('remember-me-check').checked) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
    }
    showToast(`Hoş geldiniz, ${appState.admin.fullname}!`, 'success');
    renderAppropriateView();
    return;
  }

  // 2. Öğrenci kontrolü
  const student = appState.students.find(s => s.username.toLowerCase() === usernameInput && s.password === passwordInput);
  if (student) {
    currentSession = {
      role: 'student',
      id: student.id,
      username: student.username,
      fullname: student.fullname,
      target: student.target
    };
    if (document.getElementById('remember-me-check').checked) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentSession));
    }
    showToast(`Hoş geldin, ${student.fullname}!`, 'success');
    renderAppropriateView();
    return;
  }

  showToast('Kullanıcı adı veya şifre hatalı!', 'error');
}

function handleLogout() {
  currentSession = null;
  localStorage.removeItem(SESSION_KEY);
  showToast('Başarıyla çıkış yapıldı.', 'info');
  showLoginView();
}

window.fillDemoCredentials = function(username, password) {
  document.getElementById('login-username').value = username;
  document.getElementById('login-password').value = password;
  showToast(`Demo bilgileri dolduruldu: ${username}`, 'info');
};

// ==========================================================================
// 5. GÖRÜNÜM GEÇİŞLERİ VE RENDER MOTORU
// ==========================================================================
function showLoginView() {
  document.getElementById('login-section').classList.remove('hidden');
  document.getElementById('coach-dashboard').classList.add('hidden');
  document.getElementById('student-dashboard').classList.add('hidden');
  document.getElementById('user-profile-badge').classList.add('hidden');
  
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
}

function renderAppropriateView() {
  if (!currentSession) {
    showLoginView();
    return;
  }

  document.getElementById('login-section').classList.add('hidden');
  document.getElementById('user-profile-badge').classList.remove('hidden');
  document.getElementById('header-fullname').textContent = currentSession.fullname;
  document.getElementById('header-avatar').textContent = currentSession.fullname.charAt(0).toUpperCase();
  document.getElementById('header-role').textContent = currentSession.role === 'admin' ? 'Koç / Admin' : 'Öğrenci';

  if (currentSession.role === 'admin') {
    document.getElementById('coach-dashboard').classList.remove('hidden');
    document.getElementById('student-dashboard').classList.add('hidden');
    renderCoachDashboard();
  } else if (currentSession.role === 'student') {
    document.getElementById('coach-dashboard').classList.add('hidden');
    document.getElementById('student-dashboard').classList.remove('hidden');
    renderStudentDashboard();
  }
}

// ==========================================================================
// 6. SEKME GEÇİŞLERİ (TABS NAVIGATION)
// ==========================================================================
window.switchCoachTab = function(tabName) {
  coachActiveTab = tabName;
  
  const btnSchedule = document.getElementById('coach-tab-btn-schedule');
  const btnExam = document.getElementById('coach-tab-btn-exam');
  const btnTopics = document.getElementById('coach-tab-btn-topics');
  const btnCalendar = document.getElementById('coach-tab-btn-calendar');
  const contentSchedule = document.getElementById('coach-tab-content-schedule');
  const contentExam = document.getElementById('coach-tab-content-exam');
  const contentTopics = document.getElementById('coach-tab-content-topics');
  const contentCalendar = document.getElementById('coach-tab-content-calendar');

  [btnSchedule, btnExam, btnTopics, btnCalendar].forEach(b => b && b.classList.remove('active'));
  [contentSchedule, contentExam, contentTopics, contentCalendar].forEach(c => c && c.classList.add('hidden'));

  if (tabName === 'schedule') {
    if (btnSchedule) btnSchedule.classList.add('active');
    if (contentSchedule) contentSchedule.classList.remove('hidden');
    renderSelectedStudentSchedule();
  } else if (tabName === 'exam-analysis' || tabName === 'exam') {
    if (btnExam) btnExam.classList.add('active');
    if (contentExam) contentExam.classList.remove('hidden');
    renderCoachExamAnalysis();
  } else if (tabName === 'topics-tracker' || tabName === 'topics') {
    if (btnTopics) btnTopics.classList.add('active');
    if (contentTopics) contentTopics.classList.remove('hidden');
    renderCoachCurriculumTracker();
  } else if (tabName === 'calendar') {
    if (btnCalendar) btnCalendar.classList.add('active');
    if (contentCalendar) contentCalendar.classList.remove('hidden');
    renderCoachCalendar();
  }
};

window.switchStudentTab = function(tabName) {
  studentActiveTab = tabName;

  const btnSchedule = document.getElementById('student-tab-btn-schedule');
  const btnExam = document.getElementById('student-tab-btn-exam');
  const btnTopics = document.getElementById('student-tab-btn-topics');
  const contentSchedule = document.getElementById('student-tab-content-schedule');
  const contentExam = document.getElementById('student-tab-content-exam');
  const contentTopics = document.getElementById('student-tab-content-topics');

  [btnSchedule, btnExam, btnTopics].forEach(b => b && b.classList.remove('active'));
  [contentSchedule, contentExam, contentTopics].forEach(c => c && c.classList.add('hidden'));

  if (tabName === 'schedule') {
    if (btnSchedule) btnSchedule.classList.add('active');
    if (contentSchedule) contentSchedule.classList.remove('hidden');
  } else if (tabName === 'exam-analysis' || tabName === 'exam') {
    if (btnExam) btnExam.classList.add('active');
    if (contentExam) contentExam.classList.remove('hidden');
    renderStudentExamAnalysis();
  } else if (tabName === 'topics-tracker' || tabName === 'topics') {
    if (btnTopics) btnTopics.classList.add('active');
    if (contentTopics) contentTopics.classList.remove('hidden');
    renderStudentCurriculumTracker();
  }
};

// ==========================================================================
// 7. KOÇ (ADMIN) PANELİ İŞLEMLERİ
// ==========================================================================
function renderCoachDashboard() {
  calculateAndRenderGlobalStats();
  renderCoachStudentPills();
  renderSelectedStudentSchedule();
  renderCoachExamAnalysis();
  renderCoachCurriculumTracker();
  renderCoachCalendar();
}

function calculateAndRenderGlobalStats() {
  const totalStudents = appState.students.length;
  let totalTasks = 0;
  let completedTasks = 0;
  let targetQuestions = 0;
  let solvedQuestions = 0;

  appState.students.forEach(st => {
    (st.tasks || []).forEach(task => {
      totalTasks++;
      if (task.isDone) completedTasks++;
      targetQuestions += (task.targetQ || 0);
      solvedQuestions += (task.solvedQ || 0);
    });
  });

  const avgCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  document.getElementById('stat-total-students').textContent = totalStudents;
  document.getElementById('stat-total-tasks').textContent = totalTasks;
  document.getElementById('stat-avg-completion').textContent = `%${avgCompletion}`;
  document.getElementById('stat-solved-questions').textContent = `${solvedQuestions} / ${targetQuestions}`;
}

function renderCoachStudentPills() {
  const container = document.getElementById('coach-student-pills');
  container.innerHTML = '';

  if (appState.students.length === 0) {
    container.innerHTML = '<p class="text-muted" style="font-size: 0.9rem;">Henüz kayıtlı öğrenci yok. Yukarıdaki "Yeni Öğrenci Ekle" butonuyla ekleyebilirsiniz.</p>';
    document.getElementById('coach-student-details').classList.add('hidden');
    return;
  }

  document.getElementById('coach-student-details').classList.remove('hidden');

  if (!selectedStudentId || !appState.students.find(s => s.id === selectedStudentId)) {
    selectedStudentId = appState.students[0].id;
  }

  appState.students.forEach(student => {
    const btn = document.createElement('button');
    btn.className = `student-pill-btn ${student.id === selectedStudentId ? 'active' : ''}`;
    
    const totalT = (student.tasks || []).length;
    const compT = (student.tasks || []).filter(t => t.isDone).length;
    const pct = totalT > 0 ? Math.round((compT / totalT) * 100) : 0;
    const examCount = (student.mockExams || []).length;

    btn.innerHTML = `
      <span class="pill-avatar">${student.fullname.charAt(0)}</span>
      <span>${student.fullname}</span>
      <span style="font-size: 0.75rem; opacity: 0.85;">(%${pct} • ${examCount} Deneme)</span>
    `;

    btn.onclick = () => {
      selectedStudentId = student.id;
      renderCoachStudentPills();
      renderSelectedStudentSchedule();
      renderCoachExamAnalysis();
      renderCoachCurriculumTracker();
    };

    container.appendChild(btn);
  });
}

function renderSelectedStudentSchedule() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) return;

  document.getElementById('detail-student-avatar').textContent = student.fullname.charAt(0).toUpperCase();
  document.getElementById('detail-student-name').textContent = student.fullname;
  document.getElementById('detail-student-target').textContent = student.target || 'Genel Koçluk';
  document.getElementById('detail-student-username').textContent = student.username;
  document.getElementById('detail-student-password').textContent = student.password;

  const tasks = student.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isDone).length;
  const targetQ = tasks.reduce((acc, t) => acc + (t.targetQ || 0), 0);
  const solvedQ = tasks.reduce((acc, t) => acc + (t.solvedQ || 0), 0);
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  document.getElementById('detail-student-completed-tasks').textContent = completedTasks;
  document.getElementById('detail-student-total-tasks').textContent = totalTasks;
  document.getElementById('detail-student-solved-q').textContent = solvedQ;
  document.getElementById('detail-student-target-q').textContent = targetQ;
  document.getElementById('detail-student-progress-pct').textContent = `%${pct}`;
  document.getElementById('detail-student-progress-fill').style.width = `${pct}%`;

  document.getElementById('coach-note-textarea').value = student.coachNote || '';

  const examCount = (student.mockExams || []).length;
  const tabBadge = document.getElementById('coach-tab-exam-count');
  if (tabBadge) tabBadge.textContent = examCount;

  const grid = document.getElementById('coach-weekly-grid');
  grid.innerHTML = '';

  const todayIndex = new Date().getDay();
  const dayNamesMapping = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNamesMapping[todayIndex];

  DAYS_OF_WEEK.forEach(day => {
    const dayColumn = document.createElement('div');
    dayColumn.className = `day-column ${day === todayName ? 'is-today' : ''}`;

    const dayTasks = tasks.filter(t => t.day === day);

    let tasksHTML = '';
    if (dayTasks.length === 0) {
      tasksHTML = `
        <div class="empty-day-state">
          <i class="fa-regular fa-calendar-xmark"></i>
          <span>Planlanan görev yok</span>
        </div>
      `;
    } else {
      tasksHTML = dayTasks.map(task => `
        <div class="task-card ${task.isDone ? 'is-completed' : ''}">
          <div class="task-top-row">
            <span class="subject-badge ${getSubjectBadgeClass(task.subject)}">${task.subject}</span>
            <div class="task-actions">
              <button class="btn-icon-mini" title="Düzenle" onclick="openEditTaskModal('${student.id}', '${task.id}')">
                <i class="fa-solid fa-pen"></i>
              </button>
              <button class="btn-icon-mini" title="Sil" onclick="deleteTask('${student.id}', '${task.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="task-topic">${escapeHtml(task.topic)}</div>
          ${task.description ? `<div class="task-description-preview">${escapeHtml(task.description)}</div>` : ''}
          <div class="task-meta-row">
            <span><i class="fa-solid fa-bullseye"></i> ${task.solvedQ || 0} / ${task.targetQ || 0} Soru</span>
            <span><i class="fa-regular fa-clock"></i> ${task.duration || '-'}</span>
          </div>
          <div class="task-student-toggle-row">
            <span style="font-size: 0.75rem; font-weight: 700; color: ${task.isDone ? 'var(--success)' : 'var(--text-muted)'};">
              <i class="fa-solid ${task.isDone ? 'fa-circle-check' : 'fa-circle-notch'}"></i>
              ${task.isDone ? 'Öğrenci Tamamladı' : 'Bekliyor'}
            </span>
          </div>
          ${task.studentNotes ? `
            <div class="student-notes-bubble">
              <i class="fa-regular fa-comment"></i><b>Öğrenci:</b> ${escapeHtml(task.studentNotes)}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    dayColumn.innerHTML = `
      <div class="day-header">
        <div class="day-title-box">
          <span class="day-name">${day}</span>
          ${day === todayName ? '<span class="today-indicator">Bugün</span>' : ''}
        </div>
        <span class="day-task-count">${dayTasks.length} Görev</span>
      </div>
      <div class="day-tasks-list">
        ${tasksHTML}
      </div>
      <button class="btn-add-task-day" onclick="openAddTaskModal('${student.id}', '${day}')">
        <i class="fa-solid fa-plus"></i> Görev Ekle
      </button>
    `;

    grid.appendChild(dayColumn);
  });
}

// ==========================================================================
// 8. DENEME SINAVI & YANLIŞ KONU ANALİTİK MOTORU
// ==========================================================================
function calculateStudentExamStats(student) {
  const exams = student.mockExams || [];
  
  const tytExams = exams.filter(e => e.type === 'TYT');
  const aytExams = exams.filter(e => e.type === 'AYT');

  const tytTotalNet = tytExams.reduce((acc, e) => acc + (parseFloat(e.totalNet) || 0), 0);
  const aytTotalNet = aytExams.reduce((acc, e) => acc + (parseFloat(e.totalNet) || 0), 0);

  const tytAvg = tytExams.length > 0 ? (tytTotalNet / tytExams.length).toFixed(2) : '0.00';
  const aytAvg = aytExams.length > 0 ? (aytTotalNet / aytExams.length).toFixed(2) : '0.00';

  const topicMap = {};
  let totalMistakesCount = 0;
  let resolvedMistakesCount = 0;

  exams.forEach(exam => {
    (exam.mistakes || []).forEach(m => {
      totalMistakesCount += (m.count || 1);
      if (m.resolved) resolvedMistakesCount += (m.count || 1);

      const key = `${m.subject}__${m.topic.trim().toLowerCase()}`;
      if (!topicMap[key]) {
        topicMap[key] = {
          subject: m.subject,
          topic: m.topic,
          totalCount: 0,
          reasons: new Set(),
          adviceList: [],
          examCount: 0,
          resolvedCount: 0
        };
      }
      topicMap[key].totalCount += (m.count || 1);
      topicMap[key].examCount += 1;
      if (m.reason) topicMap[key].reasons.add(m.reason);
      if (m.advice) topicMap[key].adviceList.push(m.advice);
      if (m.resolved) topicMap[key].resolvedCount += (m.count || 1);
    });
  });

  const topicList = Object.values(topicMap).map(item => ({
    subject: item.subject,
    topic: item.topic,
    totalCount: item.totalCount,
    reasons: Array.from(item.reasons),
    adviceList: item.adviceList,
    examCount: item.examCount,
    resolvedCount: item.resolvedCount,
    isFullyResolved: item.resolvedCount >= item.totalCount
  }));

  topicList.sort((a, b) => b.totalCount - a.totalCount);

  const resolvedPct = totalMistakesCount > 0 ? Math.round((resolvedMistakesCount / totalMistakesCount) * 100) : 0;

  return {
    totalExams: exams.length,
    tytAvg,
    aytAvg,
    totalMistakesCount,
    resolvedMistakesCount,
    resolvedPct,
    criticalTopicsCount: topicList.length,
    topicList,
    exams
  };
}

// ==========================================================================
// 8.5. DENEME NET HEDEFLERİ VE İLERLEYİŞ GRAFİĞİ MOTORU
// ==========================================================================

/**
 * TYT ve AYT Net Hedef Kartları ve Gerçekleşme Oranları
 */
function renderTargetCards(containerId, student, isCoach = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const exams = (student.mockExams || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // TYT İstatistik ve Hedef Analizi
  const tytExams = exams.filter(e => e.type === 'TYT');
  const targetTyt = parseFloat(student.targetTytNet) || 105.00;
  const lastTytExam = tytExams.length > 0 ? tytExams[tytExams.length - 1] : null;
  const lastTytNet = lastTytExam ? parseFloat(lastTytExam.totalNet) : null;
  const avgTytNet = tytExams.length > 0 
    ? (tytExams.reduce((sum, e) => sum + parseFloat(e.totalNet), 0) / tytExams.length)
    : null;
  
  const tytPct = lastTytNet !== null ? Math.min(100, Math.round((lastTytNet / targetTyt) * 100)) : 0;
  const tytDiff = lastTytNet !== null ? (targetTyt - lastTytNet) : null;
  
  let tytStatusPill = '';
  if (lastTytNet === null) {
    tytStatusPill = `<span class="target-status-pill status-nodata"><i class="fa-solid fa-circle-notch"></i> Henüz Deneme Yok</span>`;
  } else if (lastTytNet >= targetTyt) {
    tytStatusPill = `<span class="target-status-pill status-reached"><i class="fa-solid fa-circle-check"></i> Hedefe Ulaşıldı! 🎯</span>`;
  } else {
    tytStatusPill = `<span class="target-status-pill status-pending"><i class="fa-solid fa-hourglass-half"></i> Hedefe ${tytDiff.toFixed(2)} Net Kaldı</span>`;
  }

  // AYT İstatistik ve Hedef Analizi
  const aytExams = exams.filter(e => e.type === 'AYT');
  const targetAyt = parseFloat(student.targetAytNet) || 75.00;
  const lastAytExam = aytExams.length > 0 ? aytExams[aytExams.length - 1] : null;
  const lastAytNet = lastAytExam ? parseFloat(lastAytExam.totalNet) : null;
  const avgAytNet = aytExams.length > 0 
    ? (aytExams.reduce((sum, e) => sum + parseFloat(e.totalNet), 0) / aytExams.length)
    : null;
  
  const aytPct = lastAytNet !== null ? Math.min(100, Math.round((lastAytNet / targetAyt) * 100)) : 0;
  const aytDiff = lastAytNet !== null ? (targetAyt - lastAytNet) : null;

  let aytStatusPill = '';
  if (lastAytNet === null) {
    aytStatusPill = `<span class="target-status-pill status-nodata"><i class="fa-solid fa-circle-notch"></i> Henüz Deneme Yok</span>`;
  } else if (lastAytNet >= targetAyt) {
    aytStatusPill = `<span class="target-status-pill status-reached"><i class="fa-solid fa-circle-check"></i> Hedefe Ulaşıldı! 🎯</span>`;
  } else {
    aytStatusPill = `<span class="target-status-pill status-pending"><i class="fa-solid fa-hourglass-half"></i> Hedefe ${aytDiff.toFixed(2)} Net Kaldı</span>`;
  }

  container.innerHTML = `
    <!-- TYT Net Hedef Kartı -->
    <div class="target-net-card target-tyt">
      <div class="target-card-header">
        <span class="target-type-badge">
          <i class="fa-solid fa-graduation-cap"></i> TYT NET HEDEFİ
        </span>
        ${tytStatusPill}
      </div>

      <div class="target-metrics-row">
        <div class="target-metric-box">
          <span class="metric-lbl">Son Net</span>
          <span class="metric-val text-highlight">${lastTytNet !== null ? lastTytNet.toFixed(2) : '-'}</span>
        </div>
        <div class="target-metric-box">
          <span class="metric-lbl">Ortalama</span>
          <span class="metric-val">${avgTytNet !== null ? avgTytNet.toFixed(2) : '-'}</span>
        </div>
        <div class="target-metric-box">
          <span class="metric-lbl">Koç Hedefi</span>
          <span class="metric-val text-highlight">${targetTyt.toFixed(2)}</span>
        </div>
      </div>

      <div class="target-progress-section">
        <div class="target-progress-info">
          <span class="progress-text">Hedefe Yakınlık / Başarı</span>
          <span class="progress-pct">${tytPct}%</span>
        </div>
        <div class="target-progress-track">
          <div class="target-progress-fill" style="width: ${tytPct}%"></div>
        </div>
      </div>

      <div class="target-card-footer-tip">
        <span>${lastTytNet !== null && lastTytNet >= targetTyt ? '🎉 Hedef aşıldı, yeni zirvelere!' : (lastTytDiffText(tytDiff))}</span>
        ${isCoach ? `<a href="javascript:void(0)" onclick="openEditTargetsModal('${student.id}')" style="color: #0ea5e9; font-weight: 700; text-decoration: none;"><i class="fa-solid fa-pen"></i> Düzenle</a>` : ''}
      </div>
    </div>

    <!-- AYT Net Hedef Kartı -->
    <div class="target-net-card target-ayt">
      <div class="target-card-header">
        <span class="target-type-badge">
          <i class="fa-solid fa-rocket"></i> AYT NET HEDEFİ
        </span>
        ${aytStatusPill}
      </div>

      <div class="target-metrics-row">
        <div class="target-metric-box">
          <span class="metric-lbl">Son Net</span>
          <span class="metric-val text-highlight">${lastAytNet !== null ? lastAytNet.toFixed(2) : '-'}</span>
        </div>
        <div class="target-metric-box">
          <span class="metric-lbl">Ortalama</span>
          <span class="metric-val">${avgAytNet !== null ? avgAytNet.toFixed(2) : '-'}</span>
        </div>
        <div class="target-metric-box">
          <span class="metric-lbl">Koç Hedefi</span>
          <span class="metric-val text-highlight">${targetAyt.toFixed(2)}</span>
        </div>
      </div>

      <div class="target-progress-section">
        <div class="target-progress-info">
          <span class="progress-text">Hedefe Yakınlık / Başarı</span>
          <span class="progress-pct">${aytPct}%</span>
        </div>
        <div class="target-progress-track">
          <div class="target-progress-fill" style="width: ${aytPct}%"></div>
        </div>
      </div>

      <div class="target-card-footer-tip">
        <span>${lastAytNet !== null && lastAytNet >= targetAyt ? '🎉 Hedef aşıldı, harika performans!' : (lastAytDiffText(aytDiff))}</span>
        ${isCoach ? `<a href="javascript:void(0)" onclick="openEditTargetsModal('${student.id}')" style="color: #f59e0b; font-weight: 700; text-decoration: none;"><i class="fa-solid fa-pen"></i> Düzenle</a>` : ''}
      </div>
    </div>
  `;
}

function lastTytDiffText(diff) {
  if (diff === null) return 'Henüz girilmiş bir TYT denemesi yok.';
  if (diff <= 0) return 'Hedefe ulaşıldı!';
  return `Hedefe ulaşmak için <b class="diff-badge" style="color: #0ea5e9;">+${diff.toFixed(2)} net</b> artış gerekiyor.`;
}

function lastAytDiffText(diff) {
  if (diff === null) return 'Henüz girilmiş bir AYT denemesi yok.';
  if (diff <= 0) return 'Hedefe ulaşıldı!';
  return `Hedefe ulaşmak için <b class="diff-badge" style="color: #f59e0b;">+${diff.toFixed(2)} net</b> artış gerekiyor.`;
}

/**
 * İnteraktif SVG Deneme Gelişim & Trend Grafiği Çizici
 */
/**
 * Pürüzsüz Bezier eğrisi üretici (Catmull-Rom / Cubic Spline benzeri)
 */
function getSmoothCurvePath(points) {
  if (!points || points.length === 0) return '';
  if (points.length === 1) return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  if (points.length === 2) {
    return `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} L ${points[1].x.toFixed(1)} ${points[1].y.toFixed(1)}`;
  }

  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = i > 0 ? points[i - 1] : points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = i < points.length - 2 ? points[i + 2] : p2;

    const cp1x = p1.x + (p2.x - p0.x) / 5;
    const cp1y = p1.y + (p2.y - p0.y) / 5;
    const cp2x = p2.x - (p3.x - p1.x) / 5;
    const cp2y = p2.y - (p3.y - p1.y) / 5;

    d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }
  return d;
}

function getSmoothAreaPath(points, bottomY) {
  if (!points || points.length <= 1) return '';
  const curveD = getSmoothCurvePath(points);
  const lastX = points[points.length - 1].x.toFixed(1);
  const firstX = points[0].x.toFixed(1);
  return `${curveD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
}

/**
 * İnteraktif SVG Deneme Gelişim & Trend Grafiği Çizici (Orantılı & Pürüzsüz)
 */
function renderExamProgressChart(containerId, student, chartFilter = 'all') {
  const container = document.getElementById(containerId);
  if (!container) return;

  let exams = (student.mockExams || []).slice().sort((a, b) => new Date(a.date) - new Date(b.date));

  if (chartFilter === 'TYT') {
    exams = exams.filter(e => e.type === 'TYT');
  } else if (chartFilter === 'AYT') {
    exams = exams.filter(e => e.type === 'AYT');
  }

  if (exams.length === 0) {
    container.innerHTML = `
      <div class="chart-empty-container">
        <i class="fa-solid fa-chart-line"></i>
        <h4>Henüz İlerleyiş Grafiği Oluşturulamadı</h4>
        <p>${chartFilter !== 'all' ? `${chartFilter} türünde kayıtlı deneme bulunmuyor.` : 'Öğrencinin net gelişimini ve hedefe yakınlığını grafik üzerinde görmek için deneme sınavı ekleyin.'}</p>
      </div>
    `;
    return;
  }

  const targetTyt = parseFloat(student.targetTytNet) || 105.00;
  const targetAyt = parseFloat(student.targetAytNet) || 75.00;

  // Dengeli ve orantılı ViewBox parametreleri (Genişlik: 860, Yükseklik: 340)
  const svgW = 860;
  const svgH = 340;
  const padL = 60;
  const padR = 85;
  const padT = 40;
  const padB = 60;
  const chartW = svgW - padL - padR;
  const chartH = svgH - padT - padB;

  // Maksimum Y ölçeği
  let maxY = 120;
  if (chartFilter === 'AYT') {
    maxY = 80;
  } else {
    const maxExamNet = Math.max(...exams.map(e => parseFloat(e.totalNet) || 0), 0);
    const maxTarget = Math.max(chartFilter !== 'AYT' ? targetTyt : 0, chartFilter !== 'TYT' ? targetAyt : 0);
    maxY = Math.max(120, maxExamNet + 10, maxTarget + 10);
  }

  const minY = 0;

  const getY = (val) => {
    const clamped = Math.max(minY, Math.min(maxY, val));
    return padT + chartH - ((clamped - minY) / (maxY - minY)) * chartH;
  };

  // Yatayda aşırı gerilmeyi (horizontal stretching) önleyen dengeli dağılım
  const maxSpan = Math.min(chartW, Math.max(260, (exams.length - 1) * 160));
  const startX = padL + (chartW - maxSpan) / 2;

  const getX = (index, total) => {
    if (total <= 1) return padL + chartW / 2;
    return startX + (index / (total - 1)) * maxSpan;
  };

  // Grid Çizgileri
  const gridSteps = chartFilter === 'AYT' ? [0, 20, 40, 60, 80] : [0, 25, 50, 75, 100, 125];
  let gridLinesSvg = '';
  gridSteps.forEach(stepVal => {
    if (stepVal <= maxY) {
      const y = getY(stepVal);
      gridLinesSvg += `
        <line x1="${padL}" y1="${y}" x2="${padL + chartW}" y2="${y}" class="chart-grid-line" />
        <text x="${padL - 12}" y="${y + 4}" class="chart-axis-text" text-anchor="end" font-weight="600">${stepVal} N</text>
      `;
    }
  });

  // Hedef Çizgileri ve Sağ Taraftaki Hedef Bayrakları
  let targetLinesSvg = '';
  if (chartFilter === 'all' || chartFilter === 'TYT') {
    const tytTargetY = getY(targetTyt);
    targetLinesSvg += `
      <g>
        <line x1="${padL}" y1="${tytTargetY}" x2="${padL + chartW}" y2="${tytTargetY}" class="chart-target-line-tyt" />
        <rect x="${padL + chartW + 4}" y="${tytTargetY - 11}" width="74" height="20" rx="4" fill="rgba(14, 165, 233, 0.18)" stroke="rgba(14, 165, 233, 0.4)" stroke-width="1"/>
        <text x="${padL + chartW + 41}" y="${tytTargetY + 3}" fill="#0ea5e9" font-size="10" font-weight="800" text-anchor="middle">🎯 TYT ${targetTyt}</text>
      </g>
    `;
  }
  if (chartFilter === 'all' || chartFilter === 'AYT') {
    const aytTargetY = getY(targetAyt);
    targetLinesSvg += `
      <g>
        <line x1="${padL}" y1="${aytTargetY}" x2="${padL + chartW}" y2="${aytTargetY}" class="chart-target-line-ayt" />
        <rect x="${padL + chartW + 4}" y="${aytTargetY - 11}" width="74" height="20" rx="4" fill="rgba(245, 158, 11, 0.18)" stroke="rgba(245, 158, 11, 0.4)" stroke-width="1"/>
        <text x="${padL + chartW + 41}" y="${aytTargetY + 3}" fill="#f59e0b" font-size="10" font-weight="800" text-anchor="middle">🎯 AYT ${targetAyt}</text>
      </g>
    `;
  }

  // Noktalar, Dikey Kılavuzlar ve Eğriler
  let guideLinesSvg = '';
  let pathsSvg = '';
  let pointsSvg = '';
  let xLabelsSvg = '';

  const tytExams = [];
  const aytExams = [];
  const allPoints = [];

  exams.forEach((exam, idx) => {
    const x = getX(idx, exams.length);
    const y = getY(parseFloat(exam.totalNet) || 0);
    const pt = { x, y, exam, idx };
    allPoints.push(pt);

    if (exam.type === 'TYT') tytExams.push(pt);
    else if (exam.type === 'AYT') aytExams.push(pt);

    // Dikey Kılavuz Çizgisi
    guideLinesSvg += `
      <line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + chartH}" stroke="rgba(255, 255, 255, 0.06)" stroke-width="1" stroke-dasharray="3 3"/>
    `;

    // X Ekseni Etiketleri
    const shortDate = exam.date ? exam.date.slice(5) : '';
    const cleanTitle = exam.title.length > 15 ? exam.title.slice(0, 13) + '...' : exam.title;
    xLabelsSvg += `
      <g>
        <text x="${x}" y="${padT + chartH + 20}" class="chart-axis-text" text-anchor="middle" font-weight="800" fill="var(--text-primary)">${escapeHtml(shortDate)}</text>
        <text x="${x}" y="${padT + chartH + 36}" class="chart-axis-text" text-anchor="middle" font-size="10" fill="var(--text-secondary)">${escapeHtml(cleanTitle)}</text>
      </g>
    `;
  });

  const bottomY = padT + chartH;

  // TYT Pürüzsüz Eğri ve Degrade Dolgu
  if (tytExams.length > 0) {
    if (tytExams.length > 1) {
      pathsSvg += `
        <path d="${getSmoothAreaPath(tytExams, bottomY)}" class="chart-area-tyt" />
        <path d="${getSmoothCurvePath(tytExams)}" class="chart-path-tyt" />
      `;
    }
  }

  // AYT Pürüzsüz Eğri ve Degrade Dolgu
  if (aytExams.length > 0) {
    if (aytExams.length > 1) {
      pathsSvg += `
        <path d="${getSmoothAreaPath(aytExams, bottomY)}" class="chart-area-ayt" />
        <path d="${getSmoothCurvePath(aytExams)}" class="chart-path-ayt" />
      `;
    }
  }

  // Veri Noktaları ve Değer Baloncukları
  allPoints.forEach(pt => {
    const isTyt = pt.exam.type === 'TYT';
    const netVal = (parseFloat(pt.exam.totalNet) || 0).toFixed(2);
    const color = isTyt ? '#0ea5e9' : '#f59e0b';
    const pointClass = isTyt ? 'chart-point-tyt' : 'chart-point-ayt';

    const scoresSummary = (pt.exam.scores || []).map(s => `${s.subject}: ${s.correct}D ${s.wrong}Y (${s.net}N)`).join('\n');
    const tooltipText = `${pt.exam.title} (${pt.exam.type})\nTarih: ${pt.exam.date || '-'}\nToplam Net: ${netVal} Net\n---\n${scoresSummary}`;

    pointsSvg += `
      <g>
        <!-- Değer Rozeti -->
        <rect x="${(pt.x - 26).toFixed(1)}" y="${(pt.y - 28).toFixed(1)}" width="52" height="18" rx="9" fill="var(--bg-card)" stroke="${color}" stroke-width="1.5" />
        <text x="${pt.x.toFixed(1)}" y="${(pt.y - 15).toFixed(1)}" fill="${color}" font-size="10.5" font-weight="900" text-anchor="middle">
          ${netVal}
        </text>

        <!-- Nokta Çemberi -->
        <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="6" class="chart-point ${pointClass}">
          <title>${escapeHtml(tooltipText)}</title>
        </circle>
      </g>
    `;
  });

  // SVG Oluşturma (preserveAspectRatio="xMidYMid meet" ile orantılı)
  container.innerHTML = `
    <svg class="exam-svg-chart" viewBox="0 0 ${svgW} ${svgH}" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="tytGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0ea5e9" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#0ea5e9" stop-opacity="0.0"/>
        </linearGradient>
        <linearGradient id="aytGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0"/>
        </linearGradient>
      </defs>

      <!-- Grid Çizgileri -->
      ${gridLinesSvg}

      <!-- Dikey Kılavuz Çizgileri -->
      ${guideLinesSvg}

      <!-- Hedef Referans Çizgileri -->
      ${targetLinesSvg}

      <!-- Alanlar ve Trend Çizgileri -->
      ${pathsSvg}

      <!-- Sınav Veri Noktaları -->
      ${pointsSvg}

      <!-- X Ekseni Etiketleri -->
      ${xLabelsSvg}
    </svg>

    <!-- Grafik Gösterge Lejantı -->
    <div class="chart-legend-box">
      ${chartFilter === 'all' || chartFilter === 'TYT' ? `
        <div class="chart-legend-item">
          <span class="legend-color-dot" style="background: #0ea5e9;"></span>
          <span>TYT Netleri</span>
        </div>
        <div class="chart-legend-item">
          <span class="legend-target-dash"></span>
          <span>Hedef TYT (${targetTyt} Net)</span>
        </div>
      ` : ''}

      ${chartFilter === 'all' || chartFilter === 'AYT' ? `
        <div class="chart-legend-item">
          <span class="legend-color-dot" style="background: #f59e0b;"></span>
          <span>AYT Netleri</span>
        </div>
        <div class="chart-legend-item">
          <span class="legend-target-dash ayt"></span>
          <span>Hedef AYT (${targetAyt} Net)</span>
        </div>
      ` : ''}
    </div>
  `;
}

// ==========================================================================
// 9. KOÇ DENEME & YANLIŞ KONU ANALİZİ GÖRÜNÜMÜ
// ==========================================================================
function renderCoachExamAnalysis() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) return;

  const stats = calculateStudentExamStats(student);

  document.getElementById('coach-stat-tyt-avg').textContent = stats.tytAvg;
  document.getElementById('coach-stat-ayt-avg').textContent = stats.aytAvg;
  document.getElementById('coach-stat-exam-count').textContent = stats.totalExams;
  document.getElementById('coach-stat-mistake-count').textContent = stats.criticalTopicsCount;
  document.getElementById('coach-topic-summary-count').textContent = `${stats.criticalTopicsCount} Konu`;

  // 0. TYT & AYT Hedef Kartları ve Gelişim Grafiği
  renderTargetCards('coach-targets-container', student, true);
  renderExamProgressChart('coach-progress-chart-container', student, coachChartFilter);

  // 1. Sol Panel: Konu Bazlı Yanlış Yoğunluğu Listesi
  const topicContainer = document.getElementById('coach-topic-mistakes-summary');
  topicContainer.innerHTML = '';

  if (stats.topicList.length === 0) {
    topicContainer.innerHTML = `
      <div class="empty-day-state" style="padding: 2rem 1rem;">
        <i class="fa-solid fa-clipboard-check text-success" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
        <span>Henüz kayıtlı yanlış konu bulunmuyor. Yeni bir deneme eklediğinizde eksik konular burada listelenecektir.</span>
      </div>
    `;
  } else {
    const maxFreq = stats.topicList[0].totalCount || 1;

    stats.topicList.forEach(item => {
      const fillPct = Math.min(100, Math.round((item.totalCount / maxFreq) * 100));
      const div = document.createElement('div');
      div.className = `topic-mistake-item ${item.totalCount >= 3 ? 'critical' : ''}`;

      const reasonsHTML = item.reasons.map(r => `
        <span class="badge-reason ${getReasonBadgeClass(r)}">${r}</span>
      `).join('');

      div.innerHTML = `
        <div class="topic-mistake-top">
          <div style="display: flex; align-items: center; gap: 0.45rem;">
            <span class="subject-badge ${getSubjectBadgeClass(item.subject)}">${item.subject}</span>
            <span class="topic-name">${escapeHtml(item.topic)}</span>
          </div>
          <span class="topic-freq-badge">${item.totalCount} Yanlış</span>
        </div>
        <div class="topic-bar-track">
          <div class="topic-bar-fill" style="width: ${fillPct}%"></div>
        </div>
        <div class="topic-meta-bottom">
          <div class="topic-reasons-wrap">
            ${reasonsHTML || '<span class="text-muted" style="font-size: 0.72rem;">Sebep girilmedi</span>'}
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            <i class="fa-solid fa-file-lines"></i> ${item.examCount} Denemede Çıktı
          </span>
        </div>
        ${item.adviceList.length > 0 ? `
          <div class="mistake-advice-text">
            <i class="fa-solid fa-lightbulb"></i> <b>Öneri:</b> ${escapeHtml(item.adviceList[item.adviceList.length - 1])}
          </div>
        ` : ''}
      `;
      topicContainer.appendChild(div);
    });
  }

  // 2. Sağ Panel: Deneme Kartları Listesi
  renderCoachExamCards(student);
}

function renderCoachExamCards(student) {
  const container = document.getElementById('coach-exam-cards-list');
  container.innerHTML = '';

  let exams = student.mockExams || [];

  if (coachExamFilter !== 'all') {
    exams = exams.filter(e => e.type === coachExamFilter);
  }

  if (coachExamSearchQuery) {
    const q = coachExamSearchQuery.toLowerCase();
    exams = exams.filter(e => {
      const matchTitle = e.title && e.title.toLowerCase().includes(q);
      const matchTopic = (e.mistakes || []).some(m => m.topic && m.topic.toLowerCase().includes(q));
      return matchTitle || matchTopic;
    });
  }

  if (exams.length === 0) {
    container.innerHTML = `
      <div class="empty-day-state" style="padding: 3rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-file-circle-plus" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-muted);"></i>
        <h4>Kayıtlı Deneme Bulunamadı</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 1rem;">Öğrencinin haftalık sınav karnesini ve yanlış analizini girmek için yukarıdaki "Yeni Deneme Analizi Ekle" butonuna tıklayın.</p>
        <button class="btn btn-primary" onclick="openAddExamModal()">
          <i class="fa-solid fa-plus"></i> Hemen Deneme Ekle
        </button>
      </div>
    `;
    return;
  }

  exams.forEach(exam => {
    const card = document.createElement('div');
    const typeClass = exam.type === 'TYT' ? 'card-type-tyt' : (exam.type === 'AYT' ? 'card-type-ayt' : 'card-type-genel');
    card.className = `mock-exam-card ${typeClass}`;

    const subjectsHTML = (exam.scores || []).map(sc => `
      <div class="subject-net-chip">
        <span class="chip-subj-name">${sc.subject}</span>
        <span class="chip-dyb">${sc.correct || 0}D ${sc.wrong || 0}Y ${sc.empty || 0}B</span>
        <span class="chip-net-val">${(parseFloat(sc.net) || 0).toFixed(2)} Net</span>
      </div>
    `).join('');

    let mistakesHTML = '';
    if (!exam.mistakes || exam.mistakes.length === 0) {
      mistakesHTML = `<p class="text-muted" style="font-size: 0.82rem; margin: 0.5rem 0;">Bu denemede yanlış konu kaydedilmemiş (Ful veya girilmedi).</p>`;
    } else {
      mistakesHTML = exam.mistakes.map((m, mIdx) => `
        <div class="exam-mistake-row ${m.resolved ? 'resolved' : ''}">
          <div class="mistake-left-info">
            <span class="subject-badge ${getSubjectBadgeClass(m.subject)}">${m.subject}</span>
            <span class="mistake-topic-title">${escapeHtml(m.topic)}</span>
            <span class="mistake-count-badge">${m.count || 1} Yanlış</span>
            ${m.reason ? `<span class="badge-reason ${getReasonBadgeClass(m.reason)}">${m.reason}</span>` : ''}
          </div>
          <div>
            <span style="font-size: 0.75rem; font-weight: 700; color: ${m.resolved ? 'var(--success)' : 'var(--warning)'};">
              <i class="fa-solid ${m.resolved ? 'fa-circle-check' : 'fa-clock'}"></i>
              ${m.resolved ? 'Öğrenci Telafi Etti' : 'Eksik Bekliyor'}
            </span>
          </div>
          ${m.advice ? `
            <div class="mistake-advice-text">
              <i class="fa-solid fa-compass"></i> <b>Koç Telafi Notu:</b> ${escapeHtml(m.advice)}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    const typeBadge = exam.type === 'TYT' 
      ? '<span class="badge-type-tyt"><i class="fa-solid fa-award"></i> TYT DENEMESİ</span>'
      : (exam.type === 'AYT' 
        ? '<span class="badge-type-ayt"><i class="fa-solid fa-bolt"></i> AYT DENEMESİ</span>' 
        : `<span class="badge-type-genel">${exam.type}</span>`);

    card.innerHTML = `
      <div class="exam-card-header">
        <div>
          <div class="exam-title-row">
            ${typeBadge}
            <span class="exam-card-title">${escapeHtml(exam.title)}</span>
          </div>
          <div class="exam-date-tag" style="margin-top: 0.35rem;">
            <i class="fa-regular fa-calendar"></i> ${exam.date || 'Tarih belirtilmedi'}
          </div>
        </div>

        <div class="exam-card-total-net ${exam.type.toLowerCase()}">
          <span class="net-lbl">Toplam Net</span>
          <span class="net-val">${(parseFloat(exam.totalNet) || 0).toFixed(2)}</span>
        </div>
      </div>

      <div class="exam-subjects-grid">
        ${subjectsHTML}
      </div>

      <div class="exam-mistakes-box">
        <div class="mistakes-box-header">
          <span class="mistakes-box-title">
            <i class="fa-solid fa-triangle-exclamation"></i> Yanlış Yapılan Konular ve Analiz (${(exam.mistakes || []).length})
          </span>
        </div>
        <div class="exam-mistakes-table">
          ${mistakesHTML}
        </div>
      </div>

      ${exam.coachFeedback ? `
        <div class="exam-card-coach-note">
          <i class="fa-solid fa-comment-dots" style="color: var(--primary);"></i> <b>Koç Değerlendirmesi:</b> ${escapeHtml(exam.coachFeedback)}
        </div>
      ` : ''}

      <div class="exam-card-footer-actions">
        <button class="btn btn-sm btn-outline-primary" onclick="openEditExamModal('${student.id}', '${exam.id}')">
          <i class="fa-solid fa-pen-to-square"></i> Düzenle
        </button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteMockExam('${student.id}', '${exam.id}')">
          <i class="fa-solid fa-trash-can"></i> Sil
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

window.setCoachExamFilter = function(filterType) {
  coachExamFilter = filterType;
  document.querySelectorAll('#coach-exam-type-filter .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === filterType);
  });
  renderCoachExamAnalysis();
};

window.handleCoachExamSearch = function() {
  coachExamSearchQuery = document.getElementById('coach-exam-search').value.trim();
  renderCoachExamAnalysis();
};

window.setCoachChartFilter = function(filterType) {
  coachChartFilter = filterType;
  document.querySelectorAll('#coach-chart-filter-pills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-chart') === filterType);
  });
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (student) {
    renderExamProgressChart('coach-progress-chart-container', student, coachChartFilter);
  }
};

// ==========================================================================
// 10. ÖĞRENCİ PANELİ VE DENEME ANALİZİ
// ==========================================================================
function renderStudentDashboard() {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) {
    showToast('Öğrenci profili bulunamadı.', 'error');
    handleLogout();
    return;
  }

  document.getElementById('student-welcome-name').textContent = student.fullname;
  
  const coachNoteText = document.getElementById('student-coach-note-text');
  if (student.coachNote && student.coachNote.trim()) {
    coachNoteText.textContent = student.coachNote;
  } else {
    coachNoteText.textContent = 'Koçun henüz bu hafta için özel bir not eklemedi.';
  }

  const tasks = student.tasks || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.isDone).length;
  const targetQ = tasks.reduce((acc, t) => acc + (t.targetQ || 0), 0);
  const solvedQ = tasks.reduce((acc, t) => acc + (t.solvedQ || 0), 0);
  const pct = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  document.getElementById('st-metric-total-tasks').textContent = totalTasks;
  document.getElementById('st-metric-completed-tasks').textContent = completedTasks;
  document.getElementById('st-metric-solved-q').textContent = `${solvedQ} / ${targetQ}`;
  document.getElementById('st-metric-pct').textContent = `%${pct}`;
  document.getElementById('st-metric-progress-fill').style.width = `${pct}%`;
  document.getElementById('student-banner-progress').textContent = `%${pct}`;

  const examCount = (student.mockExams || []).length;
  const tabBadge = document.getElementById('student-tab-exam-count');
  if (tabBadge) tabBadge.textContent = examCount;

  renderStudentScheduleGrid(student);
  renderStudentExamAnalysis();
  renderStudentCurriculumTracker();
}

function renderStudentScheduleGrid(student) {
  const grid = document.getElementById('student-weekly-grid');
  grid.innerHTML = '';

  const tasks = student.tasks || [];
  const todayIndex = new Date().getDay();
  const dayNamesMapping = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  const todayName = dayNamesMapping[todayIndex];

  const daysToRender = studentDayFilter === 'all' ? DAYS_OF_WEEK : [studentDayFilter];

  daysToRender.forEach(day => {
    const dayColumn = document.createElement('div');
    dayColumn.className = `day-column ${day === todayName ? 'is-today' : ''}`;

    const dayTasks = tasks.filter(t => t.day === day);

    let tasksHTML = '';
    if (dayTasks.length === 0) {
      tasksHTML = `
        <div class="empty-day-state">
          <i class="fa-regular fa-circle-check"></i>
          <span>Bu gün için atanmış görev yok</span>
        </div>
      `;
    } else {
      tasksHTML = dayTasks.map(task => `
        <div class="task-card ${task.isDone ? 'is-completed' : ''}">
          <div class="task-top-row">
            <span class="subject-badge ${getSubjectBadgeClass(task.subject)}">${task.subject}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);"><i class="fa-regular fa-clock"></i> ${task.duration || '-'}</span>
          </div>
          <div class="task-topic">${escapeHtml(task.topic)}</div>
          ${task.description ? `<div class="task-description-preview">${escapeHtml(task.description)}</div>` : ''}
          <div class="task-meta-row">
            <span><i class="fa-solid fa-bullseye"></i> Hedef: <b>${task.targetQ || 0}</b> Soru</span>
            <span><i class="fa-solid fa-pen-nib text-warning"></i> Çözülen: <b>${task.solvedQ || 0}</b></span>
          </div>

          <div class="task-student-toggle-row">
            <label class="task-check-label" onclick="event.stopPropagation()">
              <input type="checkbox" ${task.isDone ? 'checked' : ''} onchange="toggleTaskDoneStudent('${task.id}', this.checked)">
              <span>${task.isDone ? '<b class="text-success">Tamamlandı</b>' : 'Tamamla'}</span>
            </label>
            <button class="btn btn-sm btn-secondary" onclick="openCompleteTaskModal('${task.id}')" title="Soru sayısını ve notunu güncelle">
              <i class="fa-solid fa-sliders"></i> Detay & Soru Gir
            </button>
          </div>

          ${task.studentNotes ? `
            <div class="student-notes-bubble">
              <i class="fa-regular fa-comment"></i><b>Notum:</b> ${escapeHtml(task.studentNotes)}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    dayColumn.innerHTML = `
      <div class="day-header">
        <div class="day-title-box">
          <span class="day-name">${day}</span>
          ${day === todayName ? '<span class="today-indicator">Bugün</span>' : ''}
        </div>
        <span class="day-task-count">${dayTasks.filter(t => t.isDone).length}/${dayTasks.length} Yapıldı</span>
      </div>
      <div class="day-tasks-list">
        ${tasksHTML}
      </div>
    `;

    grid.appendChild(dayColumn);
  });
}

function renderStudentExamAnalysis() {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;

  const stats = calculateStudentExamStats(student);

  document.getElementById('st-stat-tyt-avg').textContent = stats.tytAvg;
  document.getElementById('st-stat-ayt-avg').textContent = stats.aytAvg;
  document.getElementById('st-stat-exam-count').textContent = stats.totalExams;
  document.getElementById('st-stat-resolved-pct').textContent = `%${stats.resolvedPct}`;
  document.getElementById('st-topic-summary-count').textContent = `${stats.criticalTopicsCount} Konu`;

  // 0. Öğrenci TYT & AYT Hedef Kartları ve Gelişim Grafiği
  renderTargetCards('student-targets-container', student, false);
  renderExamProgressChart('student-progress-chart-container', student, studentChartFilter);

  // 1. Sol Panel: Öğrenci Öncelikli Tekrar Listesi
  const topicContainer = document.getElementById('student-topic-mistakes-summary');
  topicContainer.innerHTML = '';

  if (stats.topicList.length === 0) {
    topicContainer.innerHTML = `
      <div class="empty-day-state" style="padding: 2rem 1rem;">
        <i class="fa-solid fa-circle-check text-success" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
        <span>Harika! Şu an için tespit edilmiş bir yanlış konun yok veya deneme analizlerin henüz girilmemiş.</span>
      </div>
    `;
  } else {
    const maxFreq = stats.topicList[0].totalCount || 1;

    stats.topicList.forEach(item => {
      const fillPct = Math.min(100, Math.round((item.totalCount / maxFreq) * 100));
      const div = document.createElement('div');
      div.className = `topic-mistake-item ${item.totalCount >= 3 ? 'critical' : ''}`;

      const reasonsHTML = item.reasons.map(r => `
        <span class="badge-reason ${getReasonBadgeClass(r)}">${r}</span>
      `).join('');

      div.innerHTML = `
        <div class="topic-mistake-top">
          <div style="display: flex; align-items: center; gap: 0.45rem;">
            <span class="subject-badge ${getSubjectBadgeClass(item.subject)}">${item.subject}</span>
            <span class="topic-name">${escapeHtml(item.topic)}</span>
          </div>
          <span class="topic-freq-badge">${item.totalCount} Yanlış</span>
        </div>
        <div class="topic-bar-track">
          <div class="topic-bar-fill" style="width: ${fillPct}%"></div>
        </div>
        <div class="topic-meta-bottom">
          <div class="topic-reasons-wrap">
            ${reasonsHTML || '<span class="text-muted" style="font-size: 0.72rem;">Sebep girilmedi</span>'}
          </div>
          <span style="font-size: 0.75rem; color: var(--text-muted);">
            <i class="fa-solid fa-file-lines"></i> ${item.examCount} Denemede Çıktı
          </span>
        </div>
        ${item.adviceList.length > 0 ? `
          <div class="mistake-advice-text">
            <i class="fa-solid fa-compass"></i> <b>Koçunun Tavsiyesi:</b> ${escapeHtml(item.adviceList[item.adviceList.length - 1])}
          </div>
        ` : ''}
      `;
      topicContainer.appendChild(div);
    });
  }

  // 2. Sağ Panel: Öğrenci Deneme Karneleri
  renderStudentExamCards(student);
}

function renderStudentExamCards(student) {
  const container = document.getElementById('student-exam-cards-list');
  container.innerHTML = '';

  let exams = student.mockExams || [];

  if (studentExamFilter !== 'all') {
    exams = exams.filter(e => e.type === studentExamFilter);
  }

  if (studentExamSearchQuery) {
    const q = studentExamSearchQuery.toLowerCase();
    exams = exams.filter(e => {
      const matchTitle = e.title && e.title.toLowerCase().includes(q);
      const matchTopic = (e.mistakes || []).some(m => m.topic && m.topic.toLowerCase().includes(q));
      return matchTitle || matchTopic;
    });
  }

  if (exams.length === 0) {
    container.innerHTML = `
      <div class="empty-day-state" style="padding: 3rem 1.5rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-graduation-cap" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-muted);"></i>
        <h4>Henüz Deneme Sonucun Eklenmemiş</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted);">Koçun deneme sınavlarını sisteme girdikçe karnelerin ve yanlış yapılan konuların burada görünecektir.</p>
      </div>
    `;
    return;
  }

  exams.forEach(exam => {
    const card = document.createElement('div');
    const typeClass = exam.type === 'TYT' ? 'card-type-tyt' : (exam.type === 'AYT' ? 'card-type-ayt' : 'card-type-genel');
    card.className = `mock-exam-card ${typeClass}`;

    const subjectsHTML = (exam.scores || []).map(sc => `
      <div class="subject-net-chip">
        <span class="chip-subj-name">${sc.subject}</span>
        <span class="chip-dyb">${sc.correct || 0}D ${sc.wrong || 0}Y ${sc.empty || 0}B</span>
        <span class="chip-net-val">${(parseFloat(sc.net) || 0).toFixed(2)} Net</span>
      </div>
    `).join('');

    let mistakesHTML = '';
    if (!exam.mistakes || exam.mistakes.length === 0) {
      mistakesHTML = `<p class="text-muted" style="font-size: 0.82rem; margin: 0.5rem 0;">Bu denemede yanlış konu kaydedilmemiş.</p>`;
    } else {
      mistakesHTML = exam.mistakes.map((m, mIdx) => `
        <div class="exam-mistake-row ${m.resolved ? 'resolved' : ''}">
          <div class="mistake-left-info">
            <span class="subject-badge ${getSubjectBadgeClass(m.subject)}">${m.subject}</span>
            <span class="mistake-topic-title">${escapeHtml(m.topic)}</span>
            <span class="mistake-count-badge">${m.count || 1} Yanlış</span>
            ${m.reason ? `<span class="badge-reason ${getReasonBadgeClass(m.reason)}">${m.reason}</span>` : ''}
          </div>

          <div class="student-mistake-toggle ${m.resolved ? 'is-done' : ''}" onclick="toggleMistakeResolvedStudent('${exam.id}', ${mIdx}, ${!m.resolved})">
            <i class="fa-solid ${m.resolved ? 'fa-square-check' : 'fa-square'}"></i>
            <span>${m.resolved ? 'İncelendi & Çözüldü' : 'Yanlışı İnceledim'}</span>
          </div>

          ${m.advice ? `
            <div class="mistake-advice-text">
              <i class="fa-solid fa-compass"></i> <b>Koçun Telafi Önerisi:</b> ${escapeHtml(m.advice)}
            </div>
          ` : ''}
        </div>
      `).join('');
    }

    const typeBadge = exam.type === 'TYT' 
      ? '<span class="badge-type-tyt"><i class="fa-solid fa-award"></i> TYT DENEMESİ</span>'
      : (exam.type === 'AYT' 
        ? '<span class="badge-type-ayt"><i class="fa-solid fa-bolt"></i> AYT DENEMESİ</span>' 
        : `<span class="badge-type-genel">${exam.type}</span>`);

    card.innerHTML = `
      <div class="exam-card-header">
        <div>
          <div class="exam-title-row">
            ${typeBadge}
            <span class="exam-card-title">${escapeHtml(exam.title)}</span>
          </div>
          <div class="exam-date-tag" style="margin-top: 0.35rem;">
            <i class="fa-regular fa-calendar"></i> ${exam.date || 'Tarih belirtilmedi'}
          </div>
        </div>

        <div class="exam-card-total-net ${exam.type.toLowerCase()}">
          <span class="net-lbl">Toplam Netim</span>
          <span class="net-val">${(parseFloat(exam.totalNet) || 0).toFixed(2)}</span>
        </div>
      </div>

      <div class="exam-subjects-grid">
        ${subjectsHTML}
      </div>

      <div class="exam-mistakes-box">
        <div class="mistakes-box-header">
          <span class="mistakes-box-title">
            <i class="fa-solid fa-triangle-exclamation"></i> Bu Denemedeki Yanlışlarım (${(exam.mistakes || []).length})
          </span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">Yanlışlarını tekrar ettikçe işaretle!</span>
        </div>
        <div class="exam-mistakes-table">
          ${mistakesHTML}
        </div>
      </div>

      ${exam.coachFeedback ? `
        <div class="exam-card-coach-note">
          <i class="fa-solid fa-comment-dots" style="color: var(--primary);"></i> <b>Koçunun Değerlendirmesi:</b> ${escapeHtml(exam.coachFeedback)}
        </div>
      ` : ''}
    `;

    container.appendChild(card);
  });
}

window.toggleMistakeResolvedStudent = function(examId, mistakeIndex, isResolved) {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;

  const exam = (student.mockExams || []).find(e => e.id === examId);
  if (exam && exam.mistakes && exam.mistakes[mistakeIndex]) {
    exam.mistakes[mistakeIndex].resolved = isResolved;
    saveDatabase();
    renderStudentExamAnalysis();
    showToast(isResolved ? 'Yanlış soru telafi edildi olarak işaretlendi! 👏' : 'Yanlış durumu güncellendi.', 'success');
  }
};

window.setStudentExamFilter = function(filterType) {
  studentExamFilter = filterType;
  document.querySelectorAll('#st-exam-type-filter .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === filterType);
  });
  renderStudentExamAnalysis();
};

window.handleStudentExamSearch = function() {
  studentExamSearchQuery = document.getElementById('student-exam-search').value.trim();
  renderStudentExamAnalysis();
};

window.setStudentChartFilter = function(filterType) {
  studentChartFilter = filterType;
  document.querySelectorAll('#student-chart-filter-pills .filter-pill').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-chart') === filterType);
  });
  const student = appState.students.find(s => s.id === currentSession.id);
  if (student) {
    renderExamProgressChart('student-progress-chart-container', student, studentChartFilter);
  }
};

// ==========================================================================
// 11. GÖREV MODALI VE İŞLEMLERİ
// ==========================================================================
window.openModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('hidden');
};

window.closeModal = function(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('hidden');
};

window.setTaskDaysPreset = function(preset) {
  const checkboxes = document.querySelectorAll('.task-day-cb');
  checkboxes.forEach(cb => {
    if (preset === 'all') {
      cb.checked = true;
    } else if (preset === 'weekdays') {
      cb.checked = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma'].includes(cb.value);
    } else if (preset === 'weekend') {
      cb.checked = ['Cumartesi', 'Pazar'].includes(cb.value);
    } else if (preset === 'clear') {
      cb.checked = false;
    }
  });
  window.updateTaskDaysSummary();
};

window.updateTaskDaysSummary = function() {
  const checked = Array.from(document.querySelectorAll('.task-day-cb:checked')).map(cb => cb.value);
  const summaryEl = document.getElementById('task-days-summary');
  if (!summaryEl) return;

  if (checked.length === 0) {
    summaryEl.className = 'day-selection-summary';
    summaryEl.innerHTML = '<i class="fa-solid fa-triangle-exclamation text-warning"></i> En az 1 gün seçmelisiniz.';
  } else if (checked.length === 7) {
    summaryEl.className = 'day-selection-summary has-selection';
    summaryEl.innerHTML = '<i class="fa-solid fa-check-circle text-success"></i> <strong>Tüm Hafta (7 Gün)</strong> seçildi.';
  } else if (checked.length === 5 && checked.includes('Pazartesi') && checked.includes('Cuma') && !checked.includes('Cumartesi') && !checked.includes('Pazar')) {
    summaryEl.className = 'day-selection-summary has-selection';
    summaryEl.innerHTML = '<i class="fa-solid fa-check-circle text-success"></i> <strong>Hafta İçi (5 Gün)</strong> seçildi.';
  } else if (checked.length === 2 && checked.includes('Cumartesi') && checked.includes('Pazar')) {
    summaryEl.className = 'day-selection-summary has-selection';
    summaryEl.innerHTML = '<i class="fa-solid fa-check-circle text-success"></i> <strong>Hafta Sonu (2 Gün)</strong> seçildi.';
  } else {
    summaryEl.className = 'day-selection-summary has-selection';
    summaryEl.innerHTML = `<i class="fa-solid fa-calendar-check text-primary"></i> Seçili Günler (${checked.length} gün): <strong>${checked.join(', ')}</strong>`;
  }
};

window.openAddTaskModal = function(studentId, defaultDay = 'Pazartesi') {
  document.getElementById('modal-task-title').innerHTML = '<i class="fa-solid fa-calendar-plus"></i> Yeni Görev Ekle';
  document.getElementById('task-edit-id').value = '';
  document.getElementById('task-student-id').value = studentId || selectedStudentId;

  const checkboxes = document.querySelectorAll('.task-day-cb');
  checkboxes.forEach(cb => {
    cb.checked = (cb.value === defaultDay);
  });
  window.updateTaskDaysSummary();

  document.getElementById('task-subject').value = 'Matematik';
  document.getElementById('task-topic').value = '';
  document.getElementById('task-target-q').value = '40';
  document.getElementById('task-duration').value = '90 dk';
  document.getElementById('task-description').value = '';
  openModal('modal-task');
};

window.openEditTaskModal = function(studentId, taskId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;
  const task = (student.tasks || []).find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('modal-task-title').innerHTML = '<i class="fa-solid fa-pen-to-square"></i> Görevi Düzenle';
  document.getElementById('task-edit-id').value = task.id;
  document.getElementById('task-student-id').value = student.id;

  const checkboxes = document.querySelectorAll('.task-day-cb');
  checkboxes.forEach(cb => {
    cb.checked = (cb.value === task.day);
  });
  window.updateTaskDaysSummary();

  document.getElementById('task-subject').value = task.subject;
  document.getElementById('task-topic').value = task.topic;
  document.getElementById('task-target-q').value = task.targetQ || 0;
  document.getElementById('task-duration').value = task.duration || '';
  document.getElementById('task-description').value = task.description || '';
  openModal('modal-task');
};

function handleTaskFormSubmit(e) {
  e.preventDefault();
  const editId = document.getElementById('task-edit-id').value;
  const studentId = document.getElementById('task-student-id').value;
  
  const selectedDays = Array.from(document.querySelectorAll('.task-day-cb:checked')).map(cb => cb.value);
  const subject = document.getElementById('task-subject').value;
  const topic = document.getElementById('task-topic').value.trim();
  const targetQ = parseInt(document.getElementById('task-target-q').value) || 0;
  const duration = document.getElementById('task-duration').value.trim();
  const description = document.getElementById('task-description').value.trim();

  if (selectedDays.length === 0) {
    showToast('Lütfen görevin ekleneceği en az bir gün seçin.', 'warning');
    return;
  }

  if (!topic) {
    showToast('Lütfen konu veya çalışma başlığı girin.', 'error');
    return;
  }

  const student = appState.students.find(s => s.id === studentId);
  if (!student) {
    showToast('Öğrenci bulunamadı.', 'error');
    return;
  }

  if (!student.tasks) student.tasks = [];

  if (editId) {
    const task = student.tasks.find(t => t.id === editId);
    if (task) {
      task.day = selectedDays[0];
      task.subject = subject;
      task.topic = topic;
      task.targetQ = targetQ;
      task.duration = duration;
      task.description = description;

      if (selectedDays.length > 1) {
        for (let i = 1; i < selectedDays.length; i++) {
          const extraDay = selectedDays[i];
          const extraTask = {
            id: 'task_' + Date.now() + '_' + i + '_' + Math.random().toString(36).substring(2, 6),
            day: extraDay,
            subject,
            topic,
            targetQ,
            solvedQ: 0,
            duration,
            description,
            isDone: false,
            studentNotes: ''
          };
          student.tasks.push(extraTask);
        }
        showToast(`Görev güncellendi ve seçilen diğer ${selectedDays.length - 1} güne de eklendi.`, 'success');
      } else {
        showToast('Görev başarıyla güncellendi.', 'success');
      }
    }
  } else {
    selectedDays.forEach((day, index) => {
      const newTask = {
        id: 'task_' + Date.now() + '_' + index + '_' + Math.random().toString(36).substring(2, 6),
        day,
        subject,
        topic,
        targetQ,
        solvedQ: 0,
        duration,
        description,
        isDone: false,
        studentNotes: ''
      };
      student.tasks.push(newTask);
    });

    if (selectedDays.length > 1) {
      showToast(`${selectedDays.length} gün için görevler başarıyla planlandı.`, 'success');
    } else {
      showToast('Yeni görev başarıyla eklendi.', 'success');
    }
  }

  saveDatabase();
  closeModal('modal-task');
  renderCoachDashboard();
}

window.deleteTask = function(studentId, taskId) {
  if (!confirm('Bu görevi silmek istediğinize emin misiniz?')) return;
  const student = appState.students.find(s => s.id === studentId);
  if (student && student.tasks) {
    student.tasks = student.tasks.filter(t => t.id !== taskId);
    saveDatabase();
    showToast('Görev silindi.', 'info');
    renderCoachDashboard();
  }
};

function saveCoachNote() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) return;
  const noteText = document.getElementById('coach-note-textarea').value;
  student.coachNote = noteText;
  saveDatabase();
  showToast('Koç notu kaydedildi!', 'success');
}

// ==========================================================================
// 12. HAFTALIK DENEME SINAVI VE YANLIŞ KONU MODALI (ADMIN / KOÇ)
// ==========================================================================
window.openAddExamModal = function() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) {
    showToast('Lütfen önce bir öğrenci seçin.', 'error');
    return;
  }

  document.getElementById('modal-exam-title').innerHTML = `<i class="fa-solid fa-file-pen"></i> Yeni Deneme Sınavı & Yanlış Analizi (${escapeHtml(student.fullname)})`;
  document.getElementById('exam-edit-id').value = '';
  document.getElementById('exam-student-id').value = student.id;
  document.getElementById('exam-title-input').value = '';
  document.getElementById('exam-type-select').value = 'TYT';
  document.getElementById('exam-date-input').value = new Date().toISOString().slice(0, 10);
  document.getElementById('exam-coach-feedback').value = '';

  renderExamSubjectsFormRows('TYT', []);

  const container = document.getElementById('mistake-topics-container');
  container.innerHTML = '';
  addMistakeTopicRow();

  recalcExamTotalNet();
  openModal('modal-mock-exam');
};

window.openEditExamModal = function(studentId, examId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  const exam = (student.mockExams || []).find(e => e.id === examId);
  if (!exam) return;

  document.getElementById('modal-exam-title').innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Deneme Analizini Düzenle (${escapeHtml(student.fullname)})`;
  document.getElementById('exam-edit-id').value = exam.id;
  document.getElementById('exam-student-id').value = student.id;
  document.getElementById('exam-title-input').value = exam.title || '';
  document.getElementById('exam-type-select').value = exam.type || 'TYT';
  document.getElementById('exam-date-input').value = exam.date || '';
  document.getElementById('exam-coach-feedback').value = exam.coachFeedback || '';

  renderExamSubjectsFormRows(exam.type || 'TYT', exam.scores || []);

  const container = document.getElementById('mistake-topics-container');
  container.innerHTML = '';

  if (exam.mistakes && exam.mistakes.length > 0) {
    exam.mistakes.forEach(m => addMistakeTopicRow(m));
  } else {
    addMistakeTopicRow();
  }

  recalcExamTotalNet();
  openModal('modal-mock-exam');
};

window.getSubjectsForExamType = function(examType = 'TYT') {
  if (examType === 'TYT') {
    return ['Türkçe', 'Temel Matematik', 'Geometri', 'Fizik', 'Kimya', 'Biyoloji', 'Tarih', 'Coğrafya', 'Felsefe', 'Din Kültürü', 'Diğer'];
  } else if (examType === 'AYT') {
    return ['AYT Matematik', 'Geometri', 'AYT Fizik', 'AYT Kimya', 'AYT Biyoloji', 'AYT Edebiyat', 'AYT Tarih', 'AYT Coğrafya', 'Felsefe Grubu / Din', 'Diğer'];
  } else if (examType === 'LGS') {
    return ['Türkçe', 'Matematik', 'Fen Bilimleri', 'T.C. İnkılap', 'Din Kültürü', 'İngilizce', 'Diğer'];
  }
  return [
    'Türkçe', 'Temel Matematik', 'AYT Matematik', 'Geometri',
    'Fizik', 'AYT Fizik', 'Kimya', 'AYT Kimya', 'Biyoloji', 'AYT Biyoloji',
    'AYT Edebiyat', 'Tarih', 'AYT Tarih', 'Coğrafya', 'AYT Coğrafya',
    'Felsefe', 'Din Kültürü', 'Diğer'
  ];
};

window.getCurriculumTopicsForSubject = function(subjectName, examType = 'TYT') {
  if (!subjectName || subjectName === 'Diğer') return [];

  const sNorm = subjectName.toLowerCase().trim();

  let list = CURRICULUM_DATABASE.filter(item => {
    const itemSubjNorm = item.subject.toLowerCase();
    
    // Birebir eşleşme
    if (itemSubjNorm === sNorm) return true;

    // Türkçe & Paragraf
    if ((sNorm.includes('türkçe') || sNorm.includes('turkce') || sNorm.includes('paragraf')) && itemSubjNorm.includes('türkçe')) {
      return true;
    }
    // Matematik
    if (sNorm === 'matematik' || sNorm === 'temel matematik') {
      return itemSubjNorm.includes('temel matematik') || itemSubjNorm === 'matematik';
    }
    if (sNorm.includes('ayt matematik')) {
      return itemSubjNorm.includes('ayt matematik') || (item.examType === 'AYT' && itemSubjNorm.includes('matematik'));
    }
    // Geometri
    if (sNorm.includes('geometri') || sNorm.includes('geo')) {
      return itemSubjNorm.includes('geometri');
    }
    // Fizik
    if (sNorm === 'fizik' || sNorm === 'tyt fizik') {
      return itemSubjNorm === 'fizik' || (item.examType === 'TYT' && itemSubjNorm.includes('fizik'));
    }
    if (sNorm.includes('ayt fizik')) {
      return itemSubjNorm.includes('ayt fizik') || (item.examType === 'AYT' && itemSubjNorm.includes('fizik'));
    }
    // Kimya
    if (sNorm === 'kimya' || sNorm === 'tyt kimya') {
      return itemSubjNorm === 'kimya' || (item.examType === 'TYT' && itemSubjNorm.includes('kimya'));
    }
    if (sNorm.includes('ayt kimya')) {
      return itemSubjNorm.includes('ayt kimya') || (item.examType === 'AYT' && itemSubjNorm.includes('kimya'));
    }
    // Biyoloji
    if (sNorm === 'biyoloji' || sNorm === 'tyt biyoloji') {
      return itemSubjNorm === 'biyoloji' || (item.examType === 'TYT' && itemSubjNorm.includes('biyoloji'));
    }
    if (sNorm.includes('ayt biyoloji')) {
      return itemSubjNorm.includes('ayt biyoloji') || (item.examType === 'AYT' && itemSubjNorm.includes('biyoloji'));
    }
    // Edebiyat
    if (sNorm.includes('edebiyat')) {
      return itemSubjNorm.includes('edebiyat');
    }
    // Tarih
    if (sNorm === 'tarih' || sNorm === 'tyt tarih') {
      return itemSubjNorm === 'tarih' || (item.examType === 'TYT' && itemSubjNorm.includes('tarih'));
    }
    if (sNorm.includes('ayt tarih') || sNorm === 'tarih-1') {
      return itemSubjNorm.includes('ayt tarih') || (item.examType === 'AYT' && itemSubjNorm.includes('tarih'));
    }
    // Coğrafya
    if (sNorm === 'coğrafya' || sNorm === 'cografya' || sNorm === 'tyt coğrafya') {
      return itemSubjNorm === 'coğrafya' || (item.examType === 'TYT' && itemSubjNorm.includes('coğrafya'));
    }
    if (sNorm.includes('ayt coğrafya') || sNorm.includes('ayt cografya') || sNorm === 'coğrafya-1') {
      return itemSubjNorm.includes('ayt coğrafya') || (item.examType === 'AYT' && itemSubjNorm.includes('coğrafya'));
    }
    // Felsefe & Din
    if (sNorm.includes('felsefe') && itemSubjNorm.includes('felsefe')) return true;
    if (sNorm.includes('din') && itemSubjNorm.includes('din')) return true;
    if ((sNorm.includes('felsefe') || sNorm.includes('din')) && (itemSubjNorm.includes('felsefe') || itemSubjNorm.includes('din'))) return true;

    return itemSubjNorm.includes(sNorm) || sNorm.includes(itemSubjNorm);
  });

  if (list.length === 0) {
    list = CURRICULUM_DATABASE.filter(item => {
      const itemSubjNorm = item.subject.toLowerCase();
      return itemSubjNorm.includes(sNorm) || sNorm.includes(itemSubjNorm);
    });
  }

  return list;
};

window.generateMistakeTopicOptionsHTML = function(subjectName, examType, selectedTopic = '') {
  const topics = getCurriculumTopicsForSubject(subjectName, examType);

  let html = `<option value="" disabled ${!selectedTopic ? 'selected' : ''}>-- Konu Seçin (${topics.length} Konu) --</option>`;
  let foundMatch = false;

  if (topics && topics.length > 0) {
    const tytTopics = topics.filter(t => t.examType === 'TYT');
    const aytTopics = topics.filter(t => t.examType === 'AYT');

    if (tytTopics.length > 0 && aytTopics.length > 0) {
      html += `<optgroup label="TYT Konuları">`;
      tytTopics.forEach(t => {
        const isSel = (selectedTopic && selectedTopic === t.topicName);
        if (isSel) foundMatch = true;
        html += `<option value="${escapeHtml(t.topicName)}" ${isSel ? 'selected' : ''}>${t.orderNo ? t.orderNo + '. ' : ''}${escapeHtml(t.topicName)}</option>`;
      });
      html += `</optgroup>`;

      html += `<optgroup label="AYT Konuları">`;
      aytTopics.forEach(t => {
        const isSel = (selectedTopic && selectedTopic === t.topicName);
        if (isSel) foundMatch = true;
        html += `<option value="${escapeHtml(t.topicName)}" ${isSel ? 'selected' : ''}>${t.orderNo ? t.orderNo + '. ' : ''}${escapeHtml(t.topicName)}</option>`;
      });
      html += `</optgroup>`;
    } else {
      topics.forEach(t => {
        const isSel = (selectedTopic && selectedTopic === t.topicName);
        if (isSel) foundMatch = true;
        html += `<option value="${escapeHtml(t.topicName)}" ${isSel ? 'selected' : ''}>${t.orderNo ? t.orderNo + '. ' : ''}${escapeHtml(t.topicName)}</option>`;
      });
    }
  }

  const isCustom = Boolean(selectedTopic && !foundMatch);
  html += `<option value="__custom__" ${isCustom ? 'selected' : ''}>➕ Diğer / Farklı Konu (Elle Yaz)...</option>`;

  return { html, isCustom, foundMatch };
};

window.onMistakeSubjectChange = function(subjectSelect) {
  const row = subjectSelect.closest('.mistake-row-card');
  if (!row) return;

  const examTypeSelect = document.getElementById('exam-type-select');
  const currentExamType = examTypeSelect ? examTypeSelect.value : 'TYT';

  const newSubject = subjectSelect.value;
  const topicSelect = row.querySelector('.mistake-row-topic');
  const customInput = row.querySelector('.mistake-row-custom-topic');

  const { html: topicOptionsHTML, isCustom } = generateMistakeTopicOptionsHTML(newSubject, currentExamType, '');

  if (topicSelect) {
    topicSelect.innerHTML = topicOptionsHTML;
  }
  if (customInput) {
    customInput.value = '';
    if (isCustom || newSubject === 'Diğer') {
      customInput.classList.remove('hidden');
    } else {
      customInput.classList.add('hidden');
    }
  }
};

window.onMistakeTopicSelectChange = function(topicSelect) {
  const row = topicSelect.closest('.mistake-row-card');
  if (!row) return;

  const customInput = row.querySelector('.mistake-row-custom-topic');
  if (!customInput) return;

  if (topicSelect.value === '__custom__') {
    customInput.classList.remove('hidden');
    customInput.focus();
  } else {
    customInput.classList.add('hidden');
  }
};

window.handleExamTypeChange = function(examType) {
  renderExamSubjectsFormRows(examType, []);
  recalcExamTotalNet();

  // Mevcut tüm yanlış satırlarındaki ders ve konu listelerini güncelle
  const mistakeRows = document.querySelectorAll('#mistake-topics-container .mistake-row-card');
  const availableSubjects = getSubjectsForExamType(examType);

  mistakeRows.forEach(mrow => {
    const subjSelect = mrow.querySelector('.mistake-row-subject');
    if (subjSelect) {
      const currentSubj = subjSelect.value;
      subjSelect.innerHTML = availableSubjects.map(subj => `
        <option value="${escapeHtml(subj)}" ${currentSubj === subj ? 'selected' : ''}>${escapeHtml(subj)}</option>
      `).join('');
      onMistakeSubjectChange(subjSelect);
    }
  });
};

function renderExamSubjectsFormRows(examType, existingScores = []) {
  const tbody = document.getElementById('exam-subjects-tbody');
  tbody.innerHTML = '';

  let subjects = TYT_DEFAULT_SUBJECTS;
  if (examType === 'AYT') {
    subjects = AYT_DEFAULT_SUBJECTS;
  } else if (examType === 'LGS') {
    subjects = ['Türkçe', 'Matematik', 'Fen Bilimleri', 'T.C. İnkılap', 'Din Kültürü', 'İngilizce'];
  } else if (examType === 'GENEL') {
    subjects = ['Matematik', 'Fizik', 'Kimya', 'Biyoloji', 'Türkçe', 'Tarih', 'Coğrafya'];
  }

  subjects.forEach(subjectName => {
    const existing = existingScores.find(s => s.subject === subjectName) || {};
    const tr = document.createElement('tr');
    tr.className = 'subject-score-row';
    tr.setAttribute('data-subject', subjectName);

    tr.innerHTML = `
      <td>
        <span class="subject-badge ${getSubjectBadgeClass(subjectName)}">${subjectName}</span>
      </td>
      <td>
        <input type="number" min="0" class="input-subj-correct" value="${existing.correct !== undefined ? existing.correct : 0}" oninput="recalcExamTotalNet()">
      </td>
      <td>
        <input type="number" min="0" class="input-subj-wrong" value="${existing.wrong !== undefined ? existing.wrong : 0}" oninput="recalcExamTotalNet()">
      </td>
      <td>
        <input type="number" min="0" class="input-subj-empty" value="${existing.empty !== undefined ? existing.empty : 0}">
      </td>
      <td>
        <span class="calculated-net-cell" id="net-cell-${encodeURIComponent(subjectName)}">${existing.net !== undefined ? (parseFloat(existing.net) || 0).toFixed(2) : '0.00'}</span>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.recalcExamTotalNet = function() {
  let grandTotalNet = 0;
  const rows = document.querySelectorAll('#exam-subjects-tbody .subject-score-row');

  rows.forEach(row => {
    const subjName = row.getAttribute('data-subject');
    const cInput = row.querySelector('.input-subj-correct');
    const wInput = row.querySelector('.input-subj-wrong');
    const netCell = row.querySelector('.calculated-net-cell');

    const correct = parseInt(cInput.value) || 0;
    const wrong = parseInt(wInput.value) || 0;

    const net = Math.max(0, correct - (wrong / 4));
    grandTotalNet += net;

    if (netCell) {
      netCell.textContent = net.toFixed(2);
    }
  });

  const previewBadge = document.getElementById('exam-total-net-preview');
  if (previewBadge) {
    previewBadge.textContent = grandTotalNet.toFixed(2);
  }
};

window.addMistakeTopicRow = function(data = {}) {
  const container = document.getElementById('mistake-topics-container');
  if (!container) return;

  const examTypeSelect = document.getElementById('exam-type-select');
  const currentExamType = examTypeSelect ? examTypeSelect.value : 'TYT';

  const row = document.createElement('div');
  row.className = 'mistake-row-card';

  const availableSubjects = getSubjectsForExamType(currentExamType);
  const selectedSubject = data.subject || availableSubjects[0] || 'Türkçe';

  const subjectOptionsHTML = availableSubjects.map(subj => `
    <option value="${escapeHtml(subj)}" ${selectedSubject === subj ? 'selected' : ''}>${escapeHtml(subj)}</option>
  `).join('');

  const reasonOptionsHTML = ERROR_REASONS.map(r => `
    <option value="${escapeHtml(r)}" ${data.reason === r ? 'selected' : ''}>${escapeHtml(r)}</option>
  `).join('');

  const { html: topicOptionsHTML, isCustom } = generateMistakeTopicOptionsHTML(selectedSubject, currentExamType, data.topic || '');

  row.innerHTML = `
    <div>
      <select class="mistake-row-subject" onchange="onMistakeSubjectChange(this)" title="Ders Seçimi">
        ${subjectOptionsHTML}
      </select>
    </div>

    <div class="mistake-topic-cell">
      <select class="mistake-row-topic" onchange="onMistakeTopicSelectChange(this)" title="Konu Seçimi" required>
        ${topicOptionsHTML}
      </select>
      <input type="text" class="mistake-row-custom-topic ${isCustom ? '' : 'hidden'}" placeholder="Özel Konu Adı Yazın..." value="${isCustom && data.topic ? escapeHtml(data.topic) : ''}">
    </div>

    <div>
      <input type="number" min="1" class="mistake-row-count" placeholder="Adet" value="${data.count || 1}" title="Yanlış soru adedi">
    </div>

    <div>
      <select class="mistake-row-reason" title="Hata Nedeni">
        ${reasonOptionsHTML}
      </select>
    </div>

    <div>
      <input type="text" class="mistake-row-advice" placeholder="Koç Telafi Notu (Örn: Fasikül test 3 tekrar)" value="${data.advice ? escapeHtml(data.advice) : ''}">
    </div>

    <div>
      <button type="button" class="btn-remove-row" onclick="this.closest('.mistake-row-card').remove()" title="Bu konuyu sil">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;

  container.appendChild(row);
};

function handleMockExamFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('exam-edit-id').value;
  const studentId = document.getElementById('exam-student-id').value;
  const title = document.getElementById('exam-title-input').value.trim();
  const type = document.getElementById('exam-type-select').value;
  const date = document.getElementById('exam-date-input').value;
  const coachFeedback = document.getElementById('exam-coach-feedback').value.trim();

  if (!title) {
    showToast('Lütfen deneme sınavının adını girin.', 'error');
    return;
  }

  const student = appState.students.find(s => s.id === studentId);
  if (!student) {
    showToast('Öğrenci bulunamadı.', 'error');
    return;
  }

  if (!student.mockExams) student.mockExams = [];

  const scores = [];
  let grandTotalNet = 0;
  const rows = document.querySelectorAll('#exam-subjects-tbody .subject-score-row');

  rows.forEach(row => {
    const subject = row.getAttribute('data-subject');
    const correct = parseInt(row.querySelector('.input-subj-correct').value) || 0;
    const wrong = parseInt(row.querySelector('.input-subj-wrong').value) || 0;
    const empty = parseInt(row.querySelector('.input-subj-empty').value) || 0;
    const net = Math.max(0, correct - (wrong / 4));
    grandTotalNet += net;

    scores.push({
      subject,
      correct,
      wrong,
      empty,
      net: parseFloat(net.toFixed(2))
    });
  });

  const mistakes = [];
  const mistakeRows = document.querySelectorAll('#mistake-topics-container .mistake-row-card');

  mistakeRows.forEach(mrow => {
    const subj = mrow.querySelector('.mistake-row-subject').value;
    const topicSelect = mrow.querySelector('.mistake-row-topic');
    const customInput = mrow.querySelector('.mistake-row-custom-topic');

    let topic = topicSelect ? topicSelect.value : '';
    if ((topic === '__custom__' || !topic) && customInput) {
      topic = customInput.value.trim();
    }

    const count = parseInt(mrow.querySelector('.mistake-row-count').value) || 1;
    const reason = mrow.querySelector('.mistake-row-reason').value;
    const advice = mrow.querySelector('.mistake-row-advice').value.trim();

    if (topic && topic !== '__custom__') {
      mistakes.push({
        subject: subj,
        topic,
        count,
        reason,
        advice,
        resolved: false
      });
    }
  });

  if (editId) {
    const exam = student.mockExams.find(e => e.id === editId);
    if (exam) {
      exam.title = title;
      exam.type = type;
      exam.date = date;
      exam.totalNet = parseFloat(grandTotalNet.toFixed(2));
      exam.scores = scores;
      exam.mistakes = mistakes;
      exam.coachFeedback = coachFeedback;
      showToast('Deneme sınavı analizi başarıyla güncellendi.', 'success');
    }
  } else {
    const newExam = {
      id: 'exam_' + Date.now(),
      title,
      type,
      date,
      totalNet: parseFloat(grandTotalNet.toFixed(2)),
      scores,
      mistakes,
      coachFeedback
    };
    student.mockExams.push(newExam);
    showToast(`"${title}" deneme analizi eklendi!`, 'success');
  }

  saveDatabase();
  closeModal('modal-mock-exam');
  renderCoachDashboard();
}

window.deleteMockExam = function(studentId, examId) {
  if (!confirm('Bu deneme sınavını ve yanlış analizini silmek istediğinize emin misiniz?')) return;
  
  const student = appState.students.find(s => s.id === studentId);
  if (student && student.mockExams) {
    student.mockExams = student.mockExams.filter(e => e.id !== examId);
    saveDatabase();
    showToast('Deneme sınavı silindi.', 'info');
    renderCoachDashboard();
  }
};

// ==========================================================================
// 12.5. DENEME NET HEDEFLERİ DÜZENLEME MODALI (KOÇ / ADMIN)
// ==========================================================================
window.openEditTargetsModal = function(studentId = null) {
  const targetId = studentId || selectedStudentId;
  const student = appState.students.find(s => s.id === targetId);
  if (!student) {
    showToast('Lütfen önce bir öğrenci seçin.', 'error');
    return;
  }

  document.getElementById('target-student-id').value = student.id;
  document.getElementById('target-student-name-preview').textContent = `${student.fullname} (${student.target || 'Genel'})`;
  document.getElementById('target-tyt-input').value = student.targetTytNet !== undefined ? student.targetTytNet : 105.00;
  document.getElementById('target-ayt-input').value = student.targetAytNet !== undefined ? student.targetAytNet : 75.00;

  openModal('modal-net-targets');
};

function handleNetTargetsFormSubmit(e) {
  e.preventDefault();

  const studentId = document.getElementById('target-student-id').value;
  const tytTarget = parseFloat(document.getElementById('target-tyt-input').value);
  const aytTarget = parseFloat(document.getElementById('target-ayt-input').value);

  if (isNaN(tytTarget) || tytTarget < 0 || tytTarget > 120) {
    showToast('Hedef TYT neti 0 ile 120 arasında geçerli bir sayı olmalıdır.', 'error');
    return;
  }

  if (isNaN(aytTarget) || aytTarget < 0 || aytTarget > 80) {
    showToast('Hedef AYT neti 0 ile 80 arasında geçerli bir sayı olmalıdır.', 'error');
    return;
  }

  const student = appState.students.find(s => s.id === studentId);
  if (!student) {
    showToast('Öğrenci profili bulunamadı.', 'error');
    return;
  }

  student.targetTytNet = parseFloat(tytTarget.toFixed(2));
  student.targetAytNet = parseFloat(aytTarget.toFixed(2));

  saveDatabase();
  closeModal('modal-net-targets');
  showToast(`🎯 "${student.fullname}" için TYT: ${student.targetTytNet} ve AYT: ${student.targetAytNet} net hedefleri kaydedildi!`, 'success');

  if (currentSession && currentSession.role === 'admin') {
    renderCoachDashboard();
  } else {
    renderStudentDashboard();
  }
}

// ==========================================================================
// 13. ÖĞRENCİ EKLEME / DÜZENLEME & GÖREV TAMAMLAMA
// ==========================================================================
function handleStudentFormSubmit(e) {
  e.preventDefault();
  const fullname = document.getElementById('new-student-fullname').value.trim();
  const username = document.getElementById('new-student-username').value.trim().toLowerCase();
  const password = document.getElementById('new-student-password').value.trim();
  const target = document.getElementById('new-student-target').value;

  if (!fullname || !username || !password) {
    showToast('Lütfen tüm zorunlu alanları doldurun.', 'error');
    return;
  }

  const exists = appState.students.some(s => s.username.toLowerCase() === username) || appState.admin.username.toLowerCase() === username;
  if (exists) {
    showToast('Bu kullanıcı adı zaten kullanılıyor. Lütfen başka bir kullanıcı adı seçin.', 'error');
    return;
  }

  const newStudent = {
    id: 'std_' + Date.now(),
    fullname,
    username,
    password,
    target,
    role: 'student',
    coachNote: 'Aramıza hoş geldin! Bu haftaki çalışma programını ve deneme analizlerini adım adım tamamlayalım.',
    tasks: [],
    mockExams: [],
    curriculumTracking: createDefaultCurriculumTracking({ fullname, username, target })
  };

  appState.students.push(newStudent);
  selectedStudentId = newStudent.id;
  saveDatabase();

  closeModal('modal-student');
  document.getElementById('student-form').reset();
  showToast(`Öğrenci "${fullname}" başarıyla eklendi!`, 'success');
  renderCoachDashboard();
}

function deleteCurrentStudent() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) return;

  if (!confirm(`"${student.fullname}" adlı öğrenciyi ve tüm programını silmek istediğinize emin misiniz?`)) return;

  const deletedStudentId = student.id;
  appState.students = appState.students.filter(s => s.id !== deletedStudentId);
  appState.lessons = (appState.lessons || []).filter(l => l.studentId !== deletedStudentId);
  selectedStudentId = appState.students.length > 0 ? appState.students[0].id : null;
  saveDatabase();

  showToast('Öğrenci ve ilgili ders kayıtları silindi.', 'info');
  renderCoachDashboard();
}

window.toggleTaskDoneStudent = function(taskId, isChecked) {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;

  const task = (student.tasks || []).find(t => t.id === taskId);
  if (task) {
    task.isDone = isChecked;
    if (isChecked && (!task.solvedQ || task.solvedQ === 0) && task.targetQ > 0) {
      task.solvedQ = task.targetQ;
    }
    saveDatabase();
    renderStudentDashboard();
    showToast(isChecked ? 'Görev tamamlandı olarak işaretlendi! Tebrikler! 🎉' : 'Görev durumu güncellendi.', 'success');
  }
};

window.openCompleteTaskModal = function(taskId) {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;
  const task = (student.tasks || []).find(t => t.id === taskId);
  if (!task) return;

  document.getElementById('complete-task-id').value = task.id;
  document.getElementById('complete-task-preview').innerHTML = `
    <div class="p-subject">${task.subject} • ${task.day}</div>
    <div class="p-topic">${escapeHtml(task.topic)}</div>
    <div class="p-target"><i class="fa-solid fa-bullseye"></i> Hedef: ${task.targetQ || 0} Soru | Planlanan Süre: ${task.duration || '-'}</div>
  `;
  document.getElementById('complete-solved-q').value = task.solvedQ !== undefined ? task.solvedQ : task.targetQ;
  document.getElementById('complete-notes').value = task.studentNotes || '';
  document.getElementById('complete-is-done').checked = task.isDone || false;

  openModal('modal-complete-task');
};

function handleCompleteTaskSubmit(e) {
  e.preventDefault();
  const taskId = document.getElementById('complete-task-id').value;
  const solvedQ = parseInt(document.getElementById('complete-solved-q').value) || 0;
  const studentNotes = document.getElementById('complete-notes').value.trim();
  const isDone = document.getElementById('complete-is-done').checked;

  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;

  const task = (student.tasks || []).find(t => t.id === taskId);
  if (task) {
    task.solvedQ = solvedQ;
    task.studentNotes = studentNotes;
    task.isDone = isDone;

    saveDatabase();
    closeModal('modal-complete-task');
    renderStudentDashboard();
    showToast('İlerlemeniz başarıyla kaydedildi!', 'success');
  }
}

window.exportScheduleData = function() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(appState, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `kocluk360_yedek_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Program verileri başarıyla indirildi.', 'success');
};

function escapeHtml(string) {
  if (!string) return '';
  return String(string)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// 13.5. TYT & AYT MÜFREDAT KONU TAKİP & DOĞRU-YANLIŞ ANALİZ MOTORU
// ==========================================================================

function calculateStudentCurriculumStats(student) {
  const list = student.curriculumTracking || [];
  const totalTopics = list.length;
  const watchedTopics = list.filter(t => t.watched).length;
  const watchedPct = totalTopics > 0 ? Math.round((watchedTopics / totalTopics) * 100) : 0;
  
  const totalSolvedQ = list.reduce((acc, t) => acc + (parseInt(t.solvedQ) || 0), 0);
  const totalCorrectQ = list.reduce((acc, t) => acc + (parseInt(t.correctQ) || 0), 0);
  const totalWrongQ = list.reduce((acc, t) => acc + (parseInt(t.wrongQ) || 0), 0);
  
  const totalEvaluatedQ = totalCorrectQ + totalWrongQ;
  const accuracyPct = totalEvaluatedQ > 0 ? Math.round((totalCorrectQ / totalEvaluatedQ) * 100) : 0;
  const totalNet = Math.max(0, totalCorrectQ - (totalWrongQ / 4)).toFixed(2);

  return {
    totalTopics,
    watchedTopics,
    watchedPct,
    totalSolvedQ,
    totalCorrectQ,
    totalWrongQ,
    accuracyPct,
    totalNet
  };
}

function renderCoachCurriculumTracker() {
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (!student) return;

  if (!student.curriculumTracking || student.curriculumTracking.length === 0) {
    student.curriculumTracking = createDefaultCurriculumTracking(student);
    saveDatabase();
  }

  const stats = calculateStudentCurriculumStats(student);

  const elTotal = document.getElementById('coach-curriculum-total-topics');
  if (elTotal) elTotal.textContent = stats.totalTopics;

  const elWatched = document.getElementById('coach-curriculum-watched-count');
  if (elWatched) elWatched.textContent = stats.watchedTopics;

  const elWatchedPct = document.getElementById('coach-curriculum-watched-pct');
  if (elWatchedPct) elWatchedPct.textContent = `%${stats.watchedPct}`;

  const elSolved = document.getElementById('coach-curriculum-solved-q');
  if (elSolved) elSolved.textContent = stats.totalSolvedQ.toLocaleString();

  const elAvgSub = document.getElementById('coach-curriculum-avg-q-sub');
  if (elAvgSub) {
    const avgQ = stats.totalTopics > 0 ? Math.round(stats.totalSolvedQ / stats.totalTopics) : 0;
    elAvgSub.textContent = `Ort. Konu Başı: ${avgQ} Soru`;
  }

  const elAcc = document.getElementById('coach-curriculum-accuracy-pct');
  if (elAcc) elAcc.textContent = `%${stats.accuracyPct}`;

  const elDy = document.getElementById('coach-curriculum-dy-counts');
  if (elDy) elDy.textContent = `${stats.totalCorrectQ} D / ${stats.totalWrongQ} Y • Net: ${stats.totalNet}`;

  const tabBadge = document.getElementById('coach-tab-topic-count');
  if (tabBadge) {
    tabBadge.textContent = `${stats.watchedTopics}/${stats.totalTopics} (%${stats.watchedPct})`;
  }

  renderSubjectProgressGrid('coach', student);
  renderCurriculumSubjectPills('coach', student);
  renderCurriculumTable('coach', student);
}

function renderStudentCurriculumTracker() {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student) return;

  if (!student.curriculumTracking || student.curriculumTracking.length === 0) {
    student.curriculumTracking = createDefaultCurriculumTracking(student);
    saveDatabase();
  }

  const stats = calculateStudentCurriculumStats(student);

  const elTotal = document.getElementById('student-curriculum-total-topics');
  if (elTotal) elTotal.textContent = stats.totalTopics;

  const elWatched = document.getElementById('student-curriculum-watched-count');
  if (elWatched) elWatched.textContent = stats.watchedTopics;

  const elWatchedPct = document.getElementById('student-curriculum-watched-pct');
  if (elWatchedPct) elWatchedPct.textContent = `%${stats.watchedPct}`;

  const elSolved = document.getElementById('student-curriculum-solved-q');
  if (elSolved) elSolved.textContent = stats.totalSolvedQ.toLocaleString();

  const elAvgSub = document.getElementById('student-curriculum-avg-q-sub');
  if (elAvgSub) {
    const avgQ = stats.totalTopics > 0 ? Math.round(stats.totalSolvedQ / stats.totalTopics) : 0;
    elAvgSub.textContent = `Ort. Konu Başı: ${avgQ} Soru`;
  }

  const elAcc = document.getElementById('student-curriculum-accuracy-pct');
  if (elAcc) elAcc.textContent = `%${stats.accuracyPct}`;

  const elDy = document.getElementById('student-curriculum-dy-counts');
  if (elDy) elDy.textContent = `${stats.totalCorrectQ} D / ${stats.totalWrongQ} Y • Net: ${stats.totalNet}`;

  const tabBadge = document.getElementById('student-tab-topic-count');
  if (tabBadge) {
    tabBadge.textContent = `${stats.watchedTopics}/${stats.totalTopics} (%${stats.watchedPct})`;
  }

  renderSubjectProgressGrid('student', student);
  renderCurriculumSubjectPills('student', student);
  renderCurriculumTable('student', student);
}

function renderSubjectProgressGrid(role, student) {
  const containerId = role === 'coach' ? 'coach-subject-progress-grid' : 'student-subject-progress-grid';
  const container = document.getElementById(containerId);
  if (!container) return;

  const list = student.curriculumTracking || [];
  const subjectMap = {};

  list.forEach(t => {
    const key = t.subject;
    if (!subjectMap[key]) {
      subjectMap[key] = {
        subject: t.subject,
        examType: t.examType,
        total: 0,
        watched: 0,
        solvedQ: 0,
        correctQ: 0,
        wrongQ: 0
      };
    }
    subjectMap[key].total++;
    if (t.watched) subjectMap[key].watched++;
    subjectMap[key].solvedQ += (parseInt(t.solvedQ) || 0);
    subjectMap[key].correctQ += (parseInt(t.correctQ) || 0);
    subjectMap[key].wrongQ += (parseInt(t.wrongQ) || 0);
  });

  const subjects = Object.values(subjectMap);
  const activeSubject = role === 'coach' ? coachCurriculumSubjectFilter : studentCurriculumSubjectFilter;

  container.innerHTML = subjects.map(s => {
    const pct = s.total > 0 ? Math.round((s.watched / s.total) * 100) : 0;
    const evalQ = s.correctQ + s.wrongQ;
    const accPct = evalQ > 0 ? Math.round((s.correctQ / evalQ) * 100) : 0;
    const isActive = activeSubject === s.subject;
    const badgeClass = getSubjectBadgeClass(s.subject);

    return `
      <div class="subject-progress-tile ${isActive ? 'is-active' : ''}" onclick="${role === 'coach' ? `setCoachCurriculumSubjectFilter('${s.subject}')` : `setStudentCurriculumSubjectFilter('${s.subject}')`}">
        <div class="tile-header">
          <span class="subject-badge ${badgeClass}">${s.subject}</span>
          <span class="tile-stat-pill">${s.watched}/${s.total} Konu</span>
        </div>
        <div class="tile-progress-bar-wrap">
          <div class="tile-progress-bar" style="width: ${pct}%"></div>
        </div>
        <div class="tile-meta-row">
          <span><i class="fa-solid fa-pen-nib"></i> ${s.solvedQ} Soru</span>
          <span><i class="fa-solid fa-bullseye"></i> %${accPct} Başarı</span>
          <span class="tile-pct-val">%${pct}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderCurriculumSubjectPills(role, student) {
  const containerId = role === 'coach' ? 'coach-curriculum-subject-pills' : 'student-curriculum-subject-pills';
  const container = document.getElementById(containerId);
  if (!container) return;

  const list = student.curriculumTracking || [];
  const examFilter = role === 'coach' ? coachCurriculumExamFilter : studentCurriculumExamFilter;
  const activeSubject = role === 'coach' ? coachCurriculumSubjectFilter : studentCurriculumSubjectFilter;

  const filteredList = examFilter === 'all' ? list : list.filter(t => t.examType === examFilter);
  const uniqueSubjects = Array.from(new Set(filteredList.map(t => t.subject)));

  let html = `
    <button class="filter-pill ${activeSubject === 'all' ? 'active' : ''}" onclick="${role === 'coach' ? `setCoachCurriculumSubjectFilter('all')` : `setStudentCurriculumSubjectFilter('all')`}">
      Tüm Dersler (${filteredList.length})
    </button>
  `;

  uniqueSubjects.forEach(subj => {
    const count = filteredList.filter(t => t.subject === subj).length;
    const isActive = activeSubject === subj;
    html += `
      <button class="filter-pill ${isActive ? 'active' : ''}" onclick="${role === 'coach' ? `setCoachCurriculumSubjectFilter('${subj}')` : `setStudentCurriculumSubjectFilter('${subj}')`}">
        ${subj} (${count})
      </button>
    `;
  });

  container.innerHTML = html;
}

function renderCurriculumTable(role, student) {
  const tbodyId = role === 'coach' ? 'coach-curriculum-tbody' : 'student-curriculum-tbody';
  const tbody = document.getElementById(tbodyId);
  if (!tbody) return;

  const examFilter = role === 'coach' ? coachCurriculumExamFilter : studentCurriculumExamFilter;
  const subjectFilter = role === 'coach' ? coachCurriculumSubjectFilter : studentCurriculumSubjectFilter;
  const statusFilter = role === 'coach' ? coachCurriculumStatusFilter : studentCurriculumStatusFilter;
  const searchQuery = (role === 'coach' ? coachCurriculumSearchQuery : studentCurriculumSearchQuery).toLowerCase().trim();

  let list = (student.curriculumTracking || []).slice();

  if (examFilter !== 'all') {
    list = list.filter(t => t.examType === examFilter);
  }

  if (subjectFilter !== 'all') {
    list = list.filter(t => t.subject === subjectFilter);
  }

  if (statusFilter === 'watched') {
    list = list.filter(t => t.watched);
  } else if (statusFilter === 'not_watched') {
    list = list.filter(t => !t.watched);
  } else if (statusFilter === 'solved') {
    list = list.filter(t => (parseInt(t.solvedQ) || 0) > 0);
  } else if (statusFilter === 'not_solved') {
    list = list.filter(t => !(parseInt(t.solvedQ) || 0));
  } else if (statusFilter === 'low_accuracy') {
    list = list.filter(t => {
      const c = parseInt(t.correctQ) || 0;
      const w = parseInt(t.wrongQ) || 0;
      const tot = c + w;
      return tot > 0 && ((c / tot) * 100 < 75);
    });
  } else if (statusFilter === 'high_accuracy') {
    list = list.filter(t => {
      const c = parseInt(t.correctQ) || 0;
      const w = parseInt(t.wrongQ) || 0;
      const tot = c + w;
      return tot > 0 && ((c / tot) * 100 >= 85);
    });
  }

  if (searchQuery) {
    list = list.filter(t => {
      const name = (t.topicName || '').toLowerCase();
      const subj = (t.subject || '').toLowerCase();
      const source = (t.watchSource || '').toLowerCase();
      const subtopics = (t.subtopics || []).join(' ').toLowerCase();
      const note = (t.coachNote || '').toLowerCase();
      return name.includes(searchQuery) || subj.includes(searchQuery) || source.includes(searchQuery) || subtopics.includes(searchQuery) || note.includes(searchQuery);
    });
  }

  const titleEl = document.getElementById(role === 'coach' ? 'coach-curriculum-table-title' : 'student-curriculum-table-title');
  const countEl = document.getElementById(role === 'coach' ? 'coach-curriculum-filtered-count' : 'student-curriculum-filtered-count');

  if (titleEl) {
    let titleText = `<i class="fa-solid fa-table"></i> ${examFilter === 'all' ? 'Tüm TYT & AYT' : examFilter} Konu Takip Çizelgesi`;
    if (subjectFilter !== 'all') titleText += ` (${subjectFilter})`;
    titleEl.innerHTML = titleText;
  }
  if (countEl) countEl.textContent = `${list.length} Konu Listeleniyor`;

  if (list.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-table-cell" style="text-align: center; padding: 2.5rem 1rem;">
          <div style="color: var(--text-muted); font-size: 0.95rem;">
            <i class="fa-solid fa-filter-circle-xmark" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
            <span>Seçilen filtrelere veya arama kriterlerine uygun konu bulunamadı.</span>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = list.map((item, index) => {
    const solved = parseInt(item.solvedQ) || 0;
    const correct = parseInt(item.correctQ) || 0;
    const wrong = parseInt(item.wrongQ) || 0;
    const evaluated = correct + wrong;
    const accuracy = evaluated > 0 ? Math.round((correct / evaluated) * 100) : 0;
    const net = evaluated > 0 ? Math.max(0, correct - (wrong / 4)).toFixed(2) : '0.00';

    let accuracyClass = 'acc-neutral';
    if (evaluated > 0) {
      if (accuracy >= 85) accuracyClass = 'acc-high';
      else if (accuracy >= 65) accuracyClass = 'acc-mid';
      else accuracyClass = 'acc-low';
    }

    const subtopicsHTML = (item.subtopics && item.subtopics.length > 0)
      ? `<ul class="subtopics-compact-list">
          ${item.subtopics.map(st => `<li><i class="fa-solid fa-caret-right"></i> ${escapeHtml(st)}</li>`).join('')}
         </ul>`
      : '<span class="text-muted" style="font-size: 0.8rem;">-</span>';

    // Watched Column
    let watchedCellHTML = '';
    if (role === 'coach') {
      watchedCellHTML = `
        <div class="watched-cell-wrap">
          <button class="btn-watched-toggle ${item.watched ? 'is-watched' : 'not-watched'}" 
                  onclick="quickToggleTopicWatched('${student.id}', '${item.topicId}')"
                  title="İzlenme durumunu hızlıca değiştirmek için tıklayın">
            <i class="fa-solid ${item.watched ? 'fa-circle-check' : 'fa-circle'}"></i>
            <span>${item.watched ? 'İzlendi' : 'İzlenmedi'}</span>
          </button>
          ${item.watchSource ? `<span class="watch-source-pill" title="İzlenen Kaynak"><i class="fa-solid fa-bookmark"></i> ${escapeHtml(item.watchSource)}</span>` : ''}
        </div>
      `;
    } else {
      watchedCellHTML = `
        <div class="watched-cell-wrap">
          <span class="watched-badge-student ${item.watched ? 'is-watched' : 'not-watched'}">
            <i class="fa-solid ${item.watched ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
            <span>${item.watched ? 'İzlendi' : 'İzlenmedi'}</span>
          </span>
          ${item.watchSource ? `<span class="watch-source-pill" title="İzlenen Kaynak"><i class="fa-solid fa-bookmark"></i> ${escapeHtml(item.watchSource)}</span>` : ''}
        </div>
      `;
    }

    // Solved Q Column
    let solvedCellHTML = '';
    if (role === 'coach') {
      solvedCellHTML = `
        <div class="solved-q-cell-wrap">
          <span class="solved-q-count ${solved > 0 ? 'text-highlight' : 'text-muted'}">${solved}</span>
          <div class="quick-add-q-btns no-print">
            <button class="btn-q-inc" title="+20 Soru Ekle" onclick="quickAddSolvedQuestions('${student.id}', '${item.topicId}', 20)">+20</button>
            <button class="btn-q-inc" title="+50 Soru Ekle" onclick="quickAddSolvedQuestions('${student.id}', '${item.topicId}', 50)">+50</button>
          </div>
        </div>
      `;
    } else {
      solvedCellHTML = `
        <div class="solved-q-cell-wrap">
          <span class="solved-q-count ${solved > 0 ? 'text-highlight' : 'text-muted'}">${solved} Soru</span>
        </div>
      `;
    }

    // D-Y Analysis Column
    let dyCellHTML = '';
    if (evaluated > 0) {
      dyCellHTML = `
        <div class="dy-analysis-wrap">
          <div class="dy-counts-row">
            <span class="c-tag text-success"><b>${correct}</b> D</span>
            <span class="c-tag text-danger"><b>${wrong}</b> Y</span>
            <span class="c-tag text-primary"><b>${net}</b> Net</span>
          </div>
          <div class="accuracy-mini-bar-wrap">
            <div class="accuracy-mini-bar ${accuracyClass}" style="width: ${accuracy}%"></div>
          </div>
          <span class="accuracy-pct-lbl ${accuracyClass}">%${accuracy} Başarı</span>
        </div>
      `;
    } else {
      dyCellHTML = `
        <div class="dy-analysis-wrap">
          <span class="text-muted" style="font-size: 0.82rem;">Henüz D-Y girilmedi</span>
        </div>
      `;
    }

    const coachNoteHTML = item.coachNote
      ? `<div class="topic-coach-note-bubble"><i class="fa-solid fa-comment-dots text-primary"></i> ${escapeHtml(item.coachNote)}</div>`
      : `<span class="text-muted" style="font-size: 0.8rem; font-style: italic;">Not eklenmedi</span>`;

    let actionsHTML = '';
    if (role === 'coach') {
      actionsHTML = `
        <div class="table-actions-cell no-print">
          <button class="btn btn-sm btn-outline-primary btn-icon-only" title="Düzenle / D-Y Gir" onclick="openEditTopicModal('${student.id}', '${item.topicId}')">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          ${item.isCustom ? `
            <button class="btn btn-sm btn-outline-danger btn-icon-only" title="Konuyu Sil" onclick="deleteCustomTopic('${student.id}', '${item.topicId}')" style="margin-left: 0.25rem;">
              <i class="fa-solid fa-trash"></i>
            </button>
          ` : ''}
        </div>
      `;
    } else {
      actionsHTML = `
        <div class="table-actions-cell no-print">
          <button class="btn btn-sm btn-outline-success" onclick="openStudentTopicUpdateModal('${item.topicId}')">
            <i class="fa-solid fa-check"></i> Güncelle
          </button>
        </div>
      `;
    }

    return `
      <tr class="curriculum-tr ${item.watched ? 'row-watched' : ''}">
        <td class="text-center" style="font-weight: 700; color: var(--text-muted); font-size: 0.85rem;">
          ${item.orderNo || (index + 1)}
        </td>
        <td>
          <div class="topic-main-col">
            <span class="subject-badge ${getSubjectBadgeClass(item.subject)}">${item.examType} ${item.subject}</span>
            <span class="topic-title-text">${escapeHtml(item.topicName)}</span>
          </div>
        </td>
        <td>
          ${subtopicsHTML}
        </td>
        <td class="text-center">
          ${watchedCellHTML}
        </td>
        <td class="text-center">
          ${solvedCellHTML}
        </td>
        <td class="text-center">
          ${dyCellHTML}
        </td>
        <td>
          ${coachNoteHTML}
        </td>
        <td class="text-center no-print">
          ${actionsHTML}
        </td>
      </tr>
    `;
  }).join('');
}

// Filtre Handler Fonksiyonları
window.setCoachCurriculumExamFilter = function(examType) {
  coachCurriculumExamFilter = examType;
  coachCurriculumSubjectFilter = 'all';
  document.querySelectorAll('#coach-curriculum-exam-filter .filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-exam') === examType);
  });
  renderCoachCurriculumTracker();
};

window.setCoachCurriculumSubjectFilter = function(subject) {
  coachCurriculumSubjectFilter = subject;
  renderCoachCurriculumTracker();
};

window.handleCoachCurriculumFilterChange = function() {
  coachCurriculumStatusFilter = document.getElementById('coach-curriculum-status-filter').value;
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (student) renderCurriculumTable('coach', student);
};

window.handleCoachCurriculumSearch = function() {
  coachCurriculumSearchQuery = document.getElementById('coach-curriculum-search').value;
  const student = appState.students.find(s => s.id === selectedStudentId);
  if (student) renderCurriculumTable('coach', student);
};

window.setStudentCurriculumExamFilter = function(examType) {
  studentCurriculumExamFilter = examType;
  studentCurriculumSubjectFilter = 'all';
  document.querySelectorAll('#student-curriculum-exam-filter .filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-exam') === examType);
  });
  renderStudentCurriculumTracker();
};

window.setStudentCurriculumSubjectFilter = function(subject) {
  studentCurriculumSubjectFilter = subject;
  renderStudentCurriculumTracker();
};

window.handleStudentCurriculumFilterChange = function() {
  studentCurriculumStatusFilter = document.getElementById('student-curriculum-status-filter').value;
  const student = appState.students.find(s => s.id === currentSession.id);
  if (student) renderCurriculumTable('student', student);
};

window.handleStudentCurriculumSearch = function() {
  studentCurriculumSearchQuery = document.getElementById('student-curriculum-search').value;
  const student = appState.students.find(s => s.id === currentSession.id);
  if (student) renderCurriculumTable('student', student);
};

// İşlem & Modal Handler Fonksiyonları
window.quickToggleTopicWatched = function(studentId, topicId) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student || !student.curriculumTracking) return;
  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (topic) {
    topic.watched = !topic.watched;
    topic.lastUpdated = new Date().toISOString().split('T')[0];
    saveDatabase();
    renderCoachCurriculumTracker();
    showToast(`"${topic.topicName}" konusu ${topic.watched ? 'İzlendi (✓)' : 'İzlenmedi'} olarak güncellendi.`, 'success');
  }
};

window.quickAddSolvedQuestions = function(studentId, topicId, amount) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student || !student.curriculumTracking) return;
  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (topic) {
    const currentSolved = parseInt(topic.solvedQ) || 0;
    const currentCorrect = parseInt(topic.correctQ) || 0;
    topic.solvedQ = currentSolved + amount;
    topic.correctQ = currentCorrect + Math.round(amount * 0.9);
    topic.wrongQ = (parseInt(topic.wrongQ) || 0) + (amount - Math.round(amount * 0.9));
    topic.lastUpdated = new Date().toISOString().split('T')[0];
    saveDatabase();
    renderCoachCurriculumTracker();
    showToast(`"${topic.topicName}" konusuna +${amount} soru eklendi!`, 'success');
  }
};

window.openEditTopicModal = function(studentId, topicId) {
  const targetId = studentId || selectedStudentId;
  const student = appState.students.find(s => s.id === targetId);
  if (!student || !student.curriculumTracking) return;
  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (!topic) return;

  document.getElementById('topic-edit-student-id').value = student.id;
  document.getElementById('topic-edit-topic-id').value = topic.topicId;

  const bannerBadge = document.getElementById('topic-modal-subject-badge');
  if (bannerBadge) {
    bannerBadge.className = `subject-badge ${getSubjectBadgeClass(topic.subject)}`;
    bannerBadge.textContent = `${topic.examType} • ${topic.subject}`;
  }
  const bannerName = document.getElementById('topic-modal-topic-name');
  if (bannerName) bannerName.textContent = topic.topicName;

  document.getElementById('topic-edit-watched').checked = !!topic.watched;
  document.getElementById('topic-edit-source').value = topic.watchSource || '';
  document.getElementById('topic-edit-solved-q').value = topic.solvedQ || 0;
  document.getElementById('topic-edit-correct-q').value = topic.correctQ || 0;
  document.getElementById('topic-edit-wrong-q').value = topic.wrongQ || 0;
  document.getElementById('topic-edit-coach-note').value = topic.coachNote || '';

  calculateTopicAccuracyPreview();
  openModal('modal-topic-edit');
};

window.calculateTopicAccuracyPreview = function() {
  const correct = parseInt(document.getElementById('topic-edit-correct-q').value) || 0;
  const wrong = parseInt(document.getElementById('topic-edit-wrong-q').value) || 0;
  const total = correct + wrong;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const net = total > 0 ? Math.max(0, correct - (wrong / 4)).toFixed(2) : '0.00';

  const elPct = document.getElementById('topic-calc-pct');
  const elNet = document.getElementById('topic-calc-net');
  if (elPct) elPct.textContent = `%${pct}`;
  if (elNet) elNet.textContent = net;
};

function handleTopicEditFormSubmit(e) {
  e.preventDefault();
  const studentId = document.getElementById('topic-edit-student-id').value;
  const topicId = document.getElementById('topic-edit-topic-id').value;
  const watched = document.getElementById('topic-edit-watched').checked;
  const watchSource = document.getElementById('topic-edit-source').value.trim();
  const solvedQ = parseInt(document.getElementById('topic-edit-solved-q').value) || 0;
  const correctQ = parseInt(document.getElementById('topic-edit-correct-q').value) || 0;
  const wrongQ = parseInt(document.getElementById('topic-edit-wrong-q').value) || 0;
  const coachNote = document.getElementById('topic-edit-coach-note').value.trim();

  const student = appState.students.find(s => s.id === studentId);
  if (!student || !student.curriculumTracking) return;

  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (topic) {
    topic.watched = watched;
    topic.watchSource = watchSource;
    topic.solvedQ = solvedQ;
    topic.correctQ = correctQ;
    topic.wrongQ = wrongQ;
    topic.coachNote = coachNote;
    topic.lastUpdated = new Date().toISOString().split('T')[0];

    saveDatabase();
    closeModal('modal-topic-edit');
    showToast(`"${topic.topicName}" konu takip bilgileri başarıyla kaydedildi!`, 'success');

    if (currentSession && currentSession.role === 'admin') {
      renderCoachCurriculumTracker();
    } else {
      renderStudentCurriculumTracker();
    }
  }
}

window.openStudentTopicUpdateModal = function(topicId) {
  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student || !student.curriculumTracking) return;
  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (!topic) return;

  document.getElementById('student-topic-id-input').value = topic.topicId;
  const badge = document.getElementById('student-topic-subject-badge');
  if (badge) {
    badge.className = `subject-badge ${getSubjectBadgeClass(topic.subject)}`;
    badge.textContent = `${topic.examType} • ${topic.subject}`;
  }
  const heading = document.getElementById('student-topic-name-heading');
  if (heading) heading.textContent = topic.topicName;

  document.getElementById('st-topic-watched-check').checked = !!topic.watched;
  document.getElementById('st-topic-source-input').value = topic.watchSource || '';
  document.getElementById('st-topic-solved-input').value = topic.solvedQ || 0;
  document.getElementById('st-topic-correct-input').value = topic.correctQ || 0;
  document.getElementById('st-topic-wrong-input').value = topic.wrongQ || 0;

  openModal('modal-student-topic-update');
};

function handleStudentTopicUpdateSubmit(e) {
  e.preventDefault();
  const topicId = document.getElementById('student-topic-id-input').value;
  const watched = document.getElementById('st-topic-watched-check').checked;
  const watchSource = document.getElementById('st-topic-source-input').value.trim();
  const solvedQ = parseInt(document.getElementById('st-topic-solved-input').value) || 0;
  const correctQ = parseInt(document.getElementById('st-topic-correct-input').value) || 0;
  const wrongQ = parseInt(document.getElementById('st-topic-wrong-input').value) || 0;

  const student = appState.students.find(s => s.id === currentSession.id);
  if (!student || !student.curriculumTracking) return;

  const topic = student.curriculumTracking.find(t => t.topicId === topicId);
  if (topic) {
    topic.watched = watched;
    topic.watchSource = watchSource;
    topic.solvedQ = solvedQ;
    topic.correctQ = correctQ;
    topic.wrongQ = wrongQ;
    topic.lastUpdated = new Date().toISOString().split('T')[0];

    saveDatabase();
    closeModal('modal-student-topic-update');
    showToast(`"${topic.topicName}" çalışmanız başarıyla kaydedildi! 🎉`, 'success');
    renderStudentCurriculumTracker();
  }
}

window.openAddCustomTopicModal = function() {
  document.getElementById('custom-topic-form').reset();
  openModal('modal-custom-topic');
};

function handleCustomTopicFormSubmit(e) {
  e.preventDefault();
  const examType = document.getElementById('custom-topic-exam-type').value;
  const subject = document.getElementById('custom-topic-subject').value;
  const topicName = document.getElementById('custom-topic-name').value.trim();
  const subtopicsRaw = document.getElementById('custom-topic-subtopics').value.trim();
  const subtopics = subtopicsRaw ? subtopicsRaw.split('\n').map(s => s.trim()).filter(Boolean) : [];

  if (!topicName) {
    showToast('Lütfen konu başlığı girin.', 'error');
    return;
  }

  const newTopicId = 'custom_' + Date.now();

  appState.students.forEach(st => {
    if (!st.curriculumTracking) st.curriculumTracking = createDefaultCurriculumTracking(st);
    st.curriculumTracking.push({
      topicId: newTopicId,
      examType,
      subject,
      orderNo: st.curriculumTracking.length + 1,
      topicName,
      subtopics,
      watched: false,
      watchSource: '',
      solvedQ: 0,
      correctQ: 0,
      wrongQ: 0,
      coachNote: '',
      isCustom: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    });
  });

  saveDatabase();
  closeModal('modal-custom-topic');
  showToast(`"${topicName}" konusu müfredata eklendi!`, 'success');

  if (currentSession && currentSession.role === 'admin') {
    renderCoachCurriculumTracker();
  } else {
    renderStudentCurriculumTracker();
  }
}

window.deleteCustomTopic = function(studentId, topicId) {
  if (!confirm('Bu özel konuyu çizelgeden silmek istediğinize emin misiniz?')) return;
  const student = appState.students.find(s => s.id === studentId);
  if (student && student.curriculumTracking) {
    student.curriculumTracking = student.curriculumTracking.filter(t => t.topicId !== topicId);
    saveDatabase();
    showToast('Özel konu silindi.', 'info');
    renderCoachCurriculumTracker();
  }
};

window.printCurriculumSheet = function(role) {
  window.print();
};

// ==========================================================================
// 13.6. ÖĞRETMEN DERS & SEANS TAKVİMİ MOTORU (KOÇ / ADMIN)
// ==========================================================================
const TURKISH_MONTHS = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
const TURKISH_DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

function formatDateYMD(d) {
  if (!d) return '';
  const dateObj = (d instanceof Date) ? d : new Date(d);
  if (isNaN(dateObj.getTime())) return '';
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function formatDateTurkish(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const y = parseInt(parts[0], 10);
  const m = parseInt(parts[1], 10) - 1;
  const d = parseInt(parts[2], 10);
  const dateObj = new Date(y, m, d);
  const monthName = TURKISH_MONTHS[m] || '';
  const dayName = TURKISH_DAY_NAMES[dateObj.getDay()] || '';
  return `${d} ${monthName} ${y}, ${dayName}`;
}

function getLessonStatusInfo(status) {
  switch (status) {
    case 'completed':
      return { label: 'Yapıldı', class: 'completed', icon: 'fa-circle-check', badgeClass: 'status-completed' };
    case 'cancelled':
      return { label: 'İptal / Ertelendi', class: 'cancelled', icon: 'fa-circle-xmark', badgeClass: 'status-cancelled' };
    case 'planned':
    default:
      return { label: 'Planlandı', class: 'planned', icon: 'fa-clock', badgeClass: 'status-planned' };
  }
}

function getStudentNameById(studentId) {
  const student = (appState.students || []).find(s => s.id === studentId);
  return student ? student.fullname : 'Öğrenci';
}

function renderCoachCalendar() {
  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();
  const monthName = TURKISH_MONTHS[month];

  // Başlıkları güncelle
  const currentMonthHeading = document.getElementById('calendar-current-month-label');
  if (currentMonthHeading) {
    currentMonthHeading.textContent = `${monthName} ${year}`;
  }

  const statsMonthTitle = document.getElementById('calendar-stats-month-title');
  if (statsMonthTitle) {
    statsMonthTitle.textContent = `${monthName} ${year} - Öğrenci Bazlı Aylık Ders Sayıları`;
  }

  const listHeading = document.getElementById('calendar-list-heading');
  if (listHeading) {
    listHeading.textContent = `${monthName} ${year} - Bu Ayki Dersler Listesi`;
  }

  updateCalendarFilterDropdowns();
  renderMonthlyStudentLessonStats();
  renderCalendarMonthGrid();
  renderMonthlyLessonsTable();
  updateCoachLessonTabBadge();
}

function updateCalendarFilterDropdowns() {
  const studentSelect = document.getElementById('calendar-student-filter');
  if (studentSelect) {
    const prevVal = calendarSelectedStudent;
    studentSelect.innerHTML = `
      <option value="all">Tüm Öğrenciler (${appState.students.length})</option>
      ${appState.students.map(st => `
        <option value="${st.id}" ${st.id === prevVal ? 'selected' : ''}>${escapeHtml(st.fullname)}</option>
      `).join('')}
    `;
    studentSelect.value = prevVal;
  }

  const statusSelect = document.getElementById('calendar-status-filter');
  if (statusSelect) {
    statusSelect.value = calendarSelectedStatus;
  }
}

function renderMonthlyStudentLessonStats() {
  const container = document.getElementById('calendar-monthly-stats-overview');
  if (!container) return;

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const allLessons = appState.lessons || [];
  const monthLessons = allLessons.filter(l => {
    if (!l.date) return false;
    const parts = l.date.split('-');
    if (parts.length < 2) return false;
    const ly = parseInt(parts[0], 10);
    const lm = parseInt(parts[1], 10) - 1;
    return ly === year && lm === month;
  });

  const totalMonthCount = monthLessons.length;
  const completedMonthCount = monthLessons.filter(l => l.status === 'completed').length;
  const plannedMonthCount = monthLessons.filter(l => l.status === 'planned').length;
  const cancelledMonthCount = monthLessons.filter(l => l.status === 'cancelled').length;

  let html = `
    <!-- Genel Ay Toplamı Kartı -->
    <div class="cal-stat-card total-summary-card">
      <div class="cal-stat-top">
        <div class="cal-stat-icon-circle icon-total">
          <i class="fa-solid fa-calendar-check"></i>
        </div>
        <div class="cal-stat-main-info">
          <span class="cal-stat-lbl">Bu Ayki Toplam Ders</span>
          <div class="cal-stat-val-row">
            <span class="cal-stat-val text-primary">${totalMonthCount}</span>
            <span class="cal-stat-unit">Ders</span>
          </div>
        </div>
      </div>
      <div class="cal-stat-breakdown">
        <span class="pill-stat stat-success" title="Tamamlanan dersler"><i class="fa-solid fa-check"></i> <b>${completedMonthCount}</b> Yapıldı</span>
        <span class="pill-stat stat-primary" title="Planlanan dersler"><i class="fa-solid fa-clock"></i> <b>${plannedMonthCount}</b> Planlandı</span>
        ${cancelledMonthCount > 0 ? `<span class="pill-stat stat-danger" title="İptal edilen dersler"><i class="fa-solid fa-ban"></i> <b>${cancelledMonthCount}</b> İptal</span>` : ''}
      </div>
    </div>
  `;

  // Her Öğrenci İçin Aylık Ders Kartı
  appState.students.forEach(student => {
    const studentMonthLessons = monthLessons.filter(l => l.studentId === student.id);
    const stTotal = studentMonthLessons.length;
    const stCompleted = studentMonthLessons.filter(l => l.status === 'completed').length;
    const stPlanned = studentMonthLessons.filter(l => l.status === 'planned').length;
    const stCancelled = studentMonthLessons.filter(l => l.status === 'cancelled').length;

    html += `
      <div class="cal-stat-card student-lesson-card ${calendarSelectedStudent === student.id ? 'is-filtered' : ''}">
        <div class="cal-stat-top">
          <div class="cal-stat-avatar">${escapeHtml(student.fullname.charAt(0).toUpperCase())}</div>
          <div class="cal-stat-main-info">
            <span class="cal-stat-student-name" title="${escapeHtml(student.fullname)}">${escapeHtml(student.fullname)}</span>
            <span class="cal-stat-student-target">${escapeHtml(student.target || 'Genel')}</span>
          </div>
          <div class="cal-stat-student-count">
            <span class="st-count-number">${stTotal}</span>
            <span class="st-count-unit">Ders</span>
          </div>
        </div>

        <div class="cal-stat-breakdown">
          <span class="pill-stat stat-success" title="Bu ay yapılan ders"><i class="fa-solid fa-circle-check"></i> <b>${stCompleted}</b> Yapıldı</span>
          <span class="pill-stat stat-primary" title="Bu ay planlanan ders"><i class="fa-solid fa-hourglass-half"></i> <b>${stPlanned}</b> Planlandı</span>
          ${stCancelled > 0 ? `<span class="pill-stat stat-danger" title="İptal edilen ders"><i class="fa-solid fa-ban"></i> <b>${stCancelled}</b></span>` : ''}
        </div>

        <div class="cal-stat-card-actions">
          <button class="btn btn-xs btn-outline-primary" onclick="openAddLessonModal(null, '${student.id}')" title="${escapeHtml(student.fullname)} için yeni ders planla">
            <i class="fa-solid fa-plus"></i> Ders Ekle
          </button>
          <button class="btn btn-xs btn-outline-secondary" onclick="onCalendarStudentFilterChange('${calendarSelectedStudent === student.id ? 'all' : student.id}')">
            ${calendarSelectedStudent === student.id ? '<i class="fa-solid fa-filter-circle-xmark"></i> Filtreyi Kaldır' : '<i class="fa-solid fa-filter"></i> Takvimde Filtrele'}
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function renderCalendarMonthGrid() {
  const container = document.getElementById('calendar-days-grid');
  if (!container) return;

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const firstDayObj = new Date(year, month, 1);
  const firstDayIndex = firstDayObj.getDay(); // 0 = Pazar, 1 = Pazartesi
  const firstDayMonday = (firstDayIndex + 6) % 7; // 0 = Pazartesi, 6 = Pazar

  const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((firstDayMonday + daysInCurrentMonth) / 7) * 7;

  const today = new Date();
  const isCurrentRealMonth = (today.getFullYear() === year && today.getMonth() === month);
  const realTodayDay = today.getDate();

  const allLessons = appState.lessons || [];

  let gridHTML = '';

  for (let i = 0; i < totalCells; i++) {
    let dayNumber = 0;
    let cellDateStr = '';
    let isOtherMonth = false;
    let isToday = false;

    if (i < firstDayMonday) {
      // Önceki ayın günleri
      dayNumber = daysInPrevMonth - firstDayMonday + i + 1;
      const prevM = month === 0 ? 11 : month - 1;
      const prevY = month === 0 ? year - 1 : year;
      cellDateStr = `${prevY}-${String(prevM + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      isOtherMonth = true;
    } else if (i >= firstDayMonday + daysInCurrentMonth) {
      // Sonraki ayın günleri
      dayNumber = i - (firstDayMonday + daysInCurrentMonth) + 1;
      const nextM = month === 11 ? 0 : month + 1;
      const nextY = month === 11 ? year + 1 : year;
      cellDateStr = `${nextY}-${String(nextM + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      isOtherMonth = true;
    } else {
      // Bu ayın günleri
      dayNumber = i - firstDayMonday + 1;
      cellDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNumber).padStart(2, '0')}`;
      isOtherMonth = false;
      if (isCurrentRealMonth && dayNumber === realTodayDay) {
        isToday = true;
      }
    }

    // Bu güne ait dersleri filtrele
    let dayLessons = allLessons.filter(l => l.date === cellDateStr);

    if (calendarSelectedStudent !== 'all') {
      dayLessons = dayLessons.filter(l => l.studentId === calendarSelectedStudent);
    }
    if (calendarSelectedStatus !== 'all') {
      dayLessons = dayLessons.filter(l => l.status === calendarSelectedStatus);
    }

    // Ders kartları HTML'i
    let lessonsHTML = '';
    if (dayLessons.length > 0) {
      lessonsHTML = dayLessons.map(lesson => {
        const studentName = lesson.studentName || getStudentNameById(lesson.studentId);
        const statusInfo = getLessonStatusInfo(lesson.status);
        const subjectBadgeClass = getSubjectBadgeClass(lesson.subject);

        return `
          <div class="cal-lesson-badge ${statusInfo.badgeClass}" onclick="openEditLessonModal('${lesson.id}')" title="Düzenlemek için tıklayın: ${escapeHtml(studentName)} - ${escapeHtml(lesson.subject)}">
            <div class="cal-lesson-top">
              <span class="cal-lesson-time">
                <i class="fa-regular fa-clock"></i> ${escapeHtml(lesson.time || 'Saat serbest')}
              </span>
              <span class="status-indicator-dot" title="${statusInfo.label}">
                <i class="fa-solid ${statusInfo.icon}"></i>
              </span>
            </div>
            <div class="cal-lesson-student">
              <i class="fa-solid fa-user-graduate"></i> ${escapeHtml(studentName)}
            </div>
            <div class="cal-lesson-topic">
              <span class="subject-badge ${subjectBadgeClass}">${escapeHtml(lesson.subject)}</span>
              <span>${escapeHtml(lesson.topic || '')}</span>
            </div>
          </div>
        `;
      }).join('');
    }

    gridHTML += `
      <div class="calendar-day-cell ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'is-today' : ''}" data-date="${cellDateStr}">
        <div class="day-cell-top">
          <span class="day-cell-number">${dayNumber}</span>
          <button class="btn-add-lesson-mini" onclick="openAddLessonModal('${cellDateStr}')" title="Bu güne ders planla (${cellDateStr})">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="day-lessons-stack">
          ${lessonsHTML}
        </div>
      </div>
    `;
  }

  container.innerHTML = gridHTML;
}

function renderMonthlyLessonsTable() {
  const container = document.getElementById('calendar-lessons-table-wrapper');
  const countBadge = document.getElementById('calendar-list-count');
  if (!container) return;

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const allLessons = appState.lessons || [];
  let monthLessons = allLessons.filter(l => {
    if (!l.date) return false;
    const parts = l.date.split('-');
    if (parts.length < 2) return false;
    const ly = parseInt(parts[0], 10);
    const lm = parseInt(parts[1], 10) - 1;
    return ly === year && lm === month;
  });

  if (calendarSelectedStudent !== 'all') {
    monthLessons = monthLessons.filter(l => l.studentId === calendarSelectedStudent);
  }
  if (calendarSelectedStatus !== 'all') {
    monthLessons = monthLessons.filter(l => l.status === calendarSelectedStatus);
  }

  // Tarihe ve saate göre sırala
  monthLessons.sort((a, b) => {
    if (a.date !== b.date) return a.date.localeCompare(b.date);
    return (a.time || '').localeCompare(b.time || '');
  });

  if (countBadge) {
    countBadge.textContent = `${monthLessons.length} Ders`;
  }

  if (monthLessons.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="padding: 2.5rem 1rem; text-align: center; color: var(--text-muted);">
        <i class="fa-regular fa-calendar-xmark" style="font-size: 2.5rem; margin-bottom: 0.75rem; color: var(--text-muted); opacity: 0.6; display: block;"></i>
        <h4 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 0.4rem; color: var(--text-secondary);">Bu Ay İçin Kayıtlı Ders Bulunamadı</h4>
        <p style="font-size: 0.85rem; margin-bottom: 1rem;">Seçilen kriterlere uygun veya bu ay planlanan özel ders / seans bulunmuyor.</p>
        <button class="btn btn-sm btn-primary" onclick="openAddLessonModal()">
          <i class="fa-solid fa-plus"></i> Yeni Ders Planla
        </button>
      </div>
    `;
    return;
  }

  let tableHTML = `
    <table class="lessons-data-table">
      <thead>
        <tr>
          <th style="width: 180px;">Tarih & Saat</th>
          <th style="width: 170px;">Öğrenci</th>
          <th style="width: 130px;">Ders / Alan</th>
          <th>İşlenen / Planlanan Konu & Notlar</th>
          <th style="width: 150px;" class="text-center">Durum</th>
          <th style="width: 110px;" class="text-center">İşlemler</th>
        </tr>
      </thead>
      <tbody>
        ${monthLessons.map(lesson => {
          const studentName = lesson.studentName || getStudentNameById(lesson.studentId);
          const statusInfo = getLessonStatusInfo(lesson.status);
          const formattedDate = formatDateTurkish(lesson.date);

          return `
            <tr>
              <td>
                <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                  <strong style="font-size: 0.88rem; color: var(--text-primary);"><i class="fa-regular fa-calendar" style="color: var(--primary); margin-right: 0.35rem;"></i>${escapeHtml(formattedDate)}</strong>
                  <span style="font-size: 0.78rem; color: var(--text-muted);"><i class="fa-regular fa-clock" style="margin-right: 0.3rem;"></i>${escapeHtml(lesson.time || 'Saat serbest')}</span>
                </div>
              </td>
              <td>
                <div style="display: flex; align-items: center; gap: 0.55rem;">
                  <div class="cal-stat-avatar" style="width: 30px; height: 30px; font-size: 0.8rem;">${escapeHtml(studentName.charAt(0).toUpperCase())}</div>
                  <div>
                    <div style="font-weight: 800; color: var(--text-primary); font-size: 0.88rem;">${escapeHtml(studentName)}</div>
                  </div>
                </div>
              </td>
              <td>
                <span class="subject-badge ${getSubjectBadgeClass(lesson.subject)}">${escapeHtml(lesson.subject)}</span>
              </td>
              <td>
                <div>
                  <div style="font-weight: 700; color: var(--text-primary); font-size: 0.88rem;">${escapeHtml(lesson.topic || '-')}</div>
                  ${lesson.note ? `<div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;"><i class="fa-regular fa-comment-dots" style="color: var(--text-muted); margin-right: 0.25rem;"></i>${escapeHtml(lesson.note)}</div>` : ''}
                </div>
              </td>
              <td class="text-center">
                <span class="lesson-status-pill ${statusInfo.class}" onclick="toggleLessonStatus('${lesson.id}')" title="Durumu değiştirmek için tıklayın">
                  <i class="fa-solid ${statusInfo.icon}"></i> ${statusInfo.label}
                </span>
              </td>
              <td class="text-center">
                <div style="display: flex; gap: 0.4rem; justify-content: center;">
                  <button class="btn-icon-mini" onclick="openEditLessonModal('${lesson.id}')" title="Dersi Düzenle">
                    <i class="fa-solid fa-pen"></i>
                  </button>
                  <button class="btn-icon-mini" onclick="deleteLessonById('${lesson.id}')" title="Dersi Sil">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  container.innerHTML = tableHTML;
}

window.changeCalendarMonth = function(offset) {
  calendarCurrentDate = new Date(calendarCurrentDate.getFullYear(), calendarCurrentDate.getMonth() + offset, 1);
  renderCoachCalendar();
};

window.setCalendarToday = function() {
  calendarCurrentDate = new Date(2026, 8, 21); // Test ortamında Eylül 2026
  renderCoachCalendar();
};

window.onCalendarStudentFilterChange = function(val) {
  calendarSelectedStudent = val;
  renderCoachCalendar();
};

window.onCalendarStatusFilterChange = function(val) {
  calendarSelectedStatus = val;
  renderCoachCalendar();
};

window.openAddLessonModal = function(defaultDate = null, defaultStudentId = null) {
  const form = document.getElementById('lesson-form');
  if (form) form.reset();

  document.getElementById('lesson-edit-id').value = '';
  document.getElementById('modal-lesson-title').innerHTML = `<i class="fa-solid fa-calendar-plus text-primary"></i> Yeni Özel Ders / Seans Planla`;

  // Öğrenci seçeneklerini doldur
  const studentSelect = document.getElementById('lesson-student-select');
  if (studentSelect) {
    studentSelect.innerHTML = appState.students.map(st => `
      <option value="${st.id}">${escapeHtml(st.fullname)} (${escapeHtml(st.target || 'Genel')})</option>
    `).join('');

    const targetStudentId = defaultStudentId || selectedStudentId || (appState.students[0] && appState.students[0].id);
    if (targetStudentId) {
      studentSelect.value = targetStudentId;
    }
  }

  // Varsayılan tarih
  const dateInput = document.getElementById('lesson-date');
  if (dateInput) {
    dateInput.value = defaultDate || formatDateYMD(calendarCurrentDate) || '2026-09-21';
  }

  // Varsayılan saat ve durum
  const statusSelect = document.getElementById('lesson-status');
  if (statusSelect) statusSelect.value = 'planned';

  const deleteBtn = document.getElementById('btn-delete-lesson');
  if (deleteBtn) deleteBtn.classList.add('hidden');

  openModal('modal-lesson');
};

window.openEditLessonModal = function(lessonId) {
  const lesson = (appState.lessons || []).find(l => l.id === lessonId);
  if (!lesson) {
    showToast('Ders kaydı bulunamadı.', 'error');
    return;
  }

  document.getElementById('lesson-edit-id').value = lesson.id;
  document.getElementById('modal-lesson-title').innerHTML = `<i class="fa-solid fa-pen-to-square text-primary"></i> Ders Bilgilerini Düzenle`;

  const studentSelect = document.getElementById('lesson-student-select');
  if (studentSelect) {
    studentSelect.innerHTML = appState.students.map(st => `
      <option value="${st.id}">${escapeHtml(st.fullname)} (${escapeHtml(st.target || 'Genel')})</option>
    `).join('');
    studentSelect.value = lesson.studentId;
  }

  document.getElementById('lesson-date').value = lesson.date || '';
  document.getElementById('lesson-time').value = lesson.time || '';
  document.getElementById('lesson-subject').value = lesson.subject || 'Matematik';
  document.getElementById('lesson-status').value = lesson.status || 'planned';
  document.getElementById('lesson-topic').value = lesson.topic || '';
  document.getElementById('lesson-note').value = lesson.note || '';

  const deleteBtn = document.getElementById('btn-delete-lesson');
  if (deleteBtn) deleteBtn.classList.remove('hidden');

  openModal('modal-lesson');
};

function handleLessonFormSubmit(e) {
  e.preventDefault();

  const editId = document.getElementById('lesson-edit-id').value;
  const studentId = document.getElementById('lesson-student-select').value;
  const date = document.getElementById('lesson-date').value;
  const time = document.getElementById('lesson-time').value.trim();
  const subject = document.getElementById('lesson-subject').value;
  const status = document.getElementById('lesson-status').value;
  const topic = document.getElementById('lesson-topic').value.trim();
  const note = document.getElementById('lesson-note').value.trim();

  if (!studentId || !date || !topic) {
    showToast('Lütfen öğrenci, tarih ve konu alanlarını doldurun.', 'error');
    return;
  }

  const student = appState.students.find(s => s.id === studentId);
  const studentName = student ? student.fullname : 'Öğrenci';

  if (!appState.lessons) appState.lessons = [];

  if (editId) {
    const existing = appState.lessons.find(l => l.id === editId);
    if (existing) {
      existing.studentId = studentId;
      existing.studentName = studentName;
      existing.date = date;
      existing.time = time;
      existing.subject = subject;
      existing.status = status;
      existing.topic = topic;
      existing.note = note;
      existing.updatedAt = new Date().toISOString();
      showToast('Ders bilgileri başarıyla güncellendi.', 'success');
    }
  } else {
    const newLesson = {
      id: 'les_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      studentId,
      studentName,
      date,
      time,
      subject,
      status,
      topic,
      note,
      createdAt: new Date().toISOString()
    };
    appState.lessons.push(newLesson);
    showToast(`"${studentName}" için yeni ders planlandı!`, 'success');
  }

  saveDatabase();
  closeModal('modal-lesson');
  renderCoachCalendar();
}

window.handleDeleteCurrentLesson = function() {
  const editId = document.getElementById('lesson-edit-id').value;
  if (!editId) return;

  if (!confirm('Bu dersi takvimden silmek istediğinize emin misiniz?')) return;

  appState.lessons = (appState.lessons || []).filter(l => l.id !== editId);
  saveDatabase();
  closeModal('modal-lesson');
  showToast('Ders silindi.', 'info');
  renderCoachCalendar();
};

window.deleteLessonById = function(lessonId) {
  if (!confirm('Bu dersi takvimden silmek istediğinize emin misiniz?')) return;

  appState.lessons = (appState.lessons || []).filter(l => l.id !== lessonId);
  saveDatabase();
  showToast('Ders silindi.', 'info');
  renderCoachCalendar();
};

window.toggleLessonStatus = function(lessonId) {
  const lesson = (appState.lessons || []).find(l => l.id === lessonId);
  if (!lesson) return;

  let nextStatus = 'planned';
  if (lesson.status === 'planned') nextStatus = 'completed';
  else if (lesson.status === 'completed') nextStatus = 'cancelled';
  else nextStatus = 'planned';

  lesson.status = nextStatus;
  lesson.updatedAt = new Date().toISOString();
  saveDatabase();

  const statusInfo = getLessonStatusInfo(nextStatus);
  showToast(`Ders durumu güncellendi: ${statusInfo.label}`, 'success');
  renderCoachCalendar();
};

function updateCoachLessonTabBadge() {
  const badge = document.getElementById('coach-tab-lesson-count');
  if (!badge) return;

  const year = calendarCurrentDate.getFullYear();
  const month = calendarCurrentDate.getMonth();

  const monthLessons = (appState.lessons || []).filter(l => {
    if (!l.date) return false;
    const parts = l.date.split('-');
    if (parts.length < 2) return false;
    const ly = parseInt(parts[0], 10);
    const lm = parseInt(parts[1], 10) - 1;
    return ly === year && lm === month;
  });

  badge.textContent = monthLessons.length;
}

// ==========================================================================
// 14. EVENT LISTENERS (OLAY DİNLEYİCİLERİ)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initDatabase();
  initTheme();

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  const togglePassBtn = document.getElementById('toggle-password-btn');
  if (togglePassBtn) {
    togglePassBtn.addEventListener('click', () => {
      const passInput = document.getElementById('login-password');
      const isPass = passInput.type === 'password';
      passInput.type = isPass ? 'text' : 'password';
      togglePassBtn.innerHTML = isPass ? '<i class="fa-regular fa-eye-slash"></i>' : '<i class="fa-regular fa-eye"></i>';
    });
  }

  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

  const taskForm = document.getElementById('task-form');
  if (taskForm) taskForm.addEventListener('submit', handleTaskFormSubmit);

  const studentForm = document.getElementById('student-form');
  if (studentForm) studentForm.addEventListener('submit', handleStudentFormSubmit);

  const completeTaskForm = document.getElementById('complete-task-form');
  if (completeTaskForm) completeTaskForm.addEventListener('submit', handleCompleteTaskSubmit);

  const mockExamForm = document.getElementById('mock-exam-form');
  if (mockExamForm) mockExamForm.addEventListener('submit', handleMockExamFormSubmit);

  const netTargetsForm = document.getElementById('net-targets-form');
  if (netTargetsForm) netTargetsForm.addEventListener('submit', handleNetTargetsFormSubmit);

  const topicEditForm = document.getElementById('topic-edit-form');
  if (topicEditForm) topicEditForm.addEventListener('submit', handleTopicEditFormSubmit);

  const studentTopicUpdateForm = document.getElementById('student-topic-update-form');
  if (studentTopicUpdateForm) studentTopicUpdateForm.addEventListener('submit', handleStudentTopicUpdateSubmit);

  const customTopicForm = document.getElementById('custom-topic-form');
  if (customTopicForm) customTopicForm.addEventListener('submit', handleCustomTopicFormSubmit);

  const lessonForm = document.getElementById('lesson-form');
  if (lessonForm) lessonForm.addEventListener('submit', handleLessonFormSubmit);

  const btnOpenAddStudent = document.getElementById('btn-open-add-student');
  if (btnOpenAddStudent) {
    btnOpenAddStudent.addEventListener('click', () => openModal('modal-student'));
  }

  const btnOpenAddTaskGlobal = document.getElementById('btn-open-add-task-global');
  if (btnOpenAddTaskGlobal) {
    btnOpenAddTaskGlobal.addEventListener('click', () => openAddTaskModal(selectedStudentId, 'Pazartesi'));
  }

  const btnSaveCoachNote = document.getElementById('btn-save-coach-note');
  if (btnSaveCoachNote) {
    btnSaveCoachNote.addEventListener('click', saveCoachNote);
  }

  const btnDeleteStudent = document.getElementById('btn-delete-student');
  if (btnDeleteStudent) {
    btnDeleteStudent.addEventListener('click', deleteCurrentStudent);
  }

  const studentDayTabs = document.getElementById('student-day-tabs');
  if (studentDayTabs) {
    studentDayTabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('day-tab')) {
        document.querySelectorAll('#student-day-tabs .day-tab').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        studentDayFilter = e.target.getAttribute('data-day');
        const student = appState.students.find(s => s.id === currentSession.id);
        if (student) renderStudentScheduleGrid(student);
      }
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.add('hidden');
    }
  });

  checkExistingSession();
});

