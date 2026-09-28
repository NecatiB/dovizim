<div align="center">

# 📈 Dövizim — Öğrenme & Pratik Projesi

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<p align="center">
  <b>Frontend becerilerimi geliştirmek, API/Widget entegrasyonlarını ve DOM manipülasyonunu pekiştirmek için hazırladığım kişisel web projesi.</b>
</p>

🌐 **Canlı Demo:** [dovizim.page.gd](https://dovizim.page.gd)

---

</div>

## 🎯 Projenin Amacı & Öğrenim Hedefleri

Bu projeyi yapmaktaki temel amacım; kütüphane veya framework (React vb.) kullanmadan, saf **HTML, CSS ve Vanilla JS** bilgimi pekiştirmekti.

┌─────────────────────────────────────────────────────────────────────────┐
│                           ÖĞRENİM ODAKLARI                              │
├─────────────────────────────────────────────────────────────────────────┤
│  ⚙️  DOM Manipülasyonu      : Anlık veri hesaplama & ekran güncelleme   │
│  📐  CSS Grid & Flexbox     : Responsive panel ve düzen kurgusu          │
│  📊  Widget Entegrasyonu    : TradingView grafik kütüphanesi kullanımı  │
│  🎨  UI/UX Tasarımı         : Koyu tema (Dark Mode) odaklı arayüz        │
└─────────────────────────────────────────────────────────────────────────┘


---

## 🛠️ Sayfadaki Özellikler

| Özellik | Açıklama |
| :--- | :--- |
| 💳 **Canlı Veri Kartları** | Dolar, Euro, Sterlin, Gram Altın, Çeyrek Altın ve Bitcoin takip alanı |
| 📈 **TradingView Grafik** | Sol araç çubuğu ve teknik analiz araçları aktif grafik penceresi |
| 🗜️ **Hızlı Çevirici** | Döviz ve altın birimleri arasında anlık dönüşüm yapan küçük araç |
| 🧮 **Hesap Makinesi** | Sayfa içinde hızlı matematiksel işlemler için 4 işlem hesabı |
| 📡 **Kayan Ticker Bandı** | En üstte piyasa özetini gösteren kesintisiz bant |

---

## 🏗️ Proje Nasıl Yapıldı & Nerelerde Zorlandım?

Bu projeyi yaparken dışarıdan hazır bir kütüphane veya React/Vue gibi framework'ler kullanmadım. Sıfırdan HTML, CSS ve Vanilla JS ile çözmeye çalıştım. İşin açıkçası yaparken beni biraz uğraştıran ve "burası nasıl olacak" dedirten yerler oldu:

> ### 1. Sayfa Düzeni (Flexbox ve Grid Kavgası)
> * **Ne Yaptım?:** Sayfayı iki ana parçaya böldüm. Sol tarafa canlı kartları, TradingView grafiğini ve tabloyu koydum. Sağ tarafa ise sabit duran çevirici ile hesap makinesini yerleştirdim.
> * **Nerede Zorlandım?:** Mobilde ve farklı ekran boyutlarında sağ panelin aşağı kayması, grafiğin taşması ortalığı biraz karıştırdı. CSS Grid ve Flexbox'ı beraber kullanarak ekran küçüldüğünde sağ paneli alta alacak şekilde oturtmayı başardım.

> ### 2. TradingView Grafiğini Ekleme (Widget Entegrasyonu)
> * **Ne Yaptım?:** TradingView'in bize sunduğu hazır iframe/script kodunu çekip sayfadaki grafik alanına gömdüm.
> * **Nerede Zorlandım?:** Grafiğin boyutu ilk başta ya çok küçük kalıyordu ya da kapsayıcı div'in dışına taşıyordu. Yüksekliği `720px` yapıp sol taraftaki çizim araçlarını (mıknatıs, cetvel vs.) görünür kılmak için iframe boyutlandırmasıyla bayağı bir deneme-yanılma yapmam gerekti.

> ### 3. Döviz Çevirici ve Hesap Makinesi Mantığı (JavaScript)
> * **Ne Yaptım?:** `script.js` dosyasında tıklandığında veya değer girildiğinde anlık olarak çarpan/bölen fonksiyonlar yazdım.
> * **Nerede Zorlandım?:** 
>   * Hesap makinesinde `eval()` gibi tehlikeli şeylere girmeden butonlara basıldıkça ekrana yazma ve silme (`C` / `←`) mantığını kurarken ilk başta birkaç mantık hatası yaptım (noktaların üst üste gelmesi, sıfıra bölme vb.).
>   * Çeviricide döviz ile altın birimlerinin değerlerini mantıklı bir girdiyle çarptırıp DOM üzerindeki input'a anlık yansıtmayı `addEventListener('input', ...)` ile çözdüm.

> ### 4. Kayan Ticker (Üst Bant)
> * **Ne Yaptım?:** Sayfanın en üstünde canlı fiyatların akması için basit bir animasyonlu bant chuẩn hazırladım.
> * **Nerede Zorlandım?:** CSS `keyframes` ile sonsuz döngüde kaydırma yaparken listenin sonuna gelince aniden başa sarması çirkin duruyordu. İçerideki elemanları kopyalayarak akışın kesintisiz durmasını sağladım.

---

## 🗂️ Dosya Yapısı

```bash
Piyasa360/
├── index.html        # Sayfa yapısı ve HTML elemanları
├── style.css         # Tasarım, Grid/Flex düzeni ve renk değişkenleri
├── script.js         # Çevirici mantığı, hesap makinesi ve grafik fonksiyonları
└── README.md         # Proje özeti ve öğrenim notları
