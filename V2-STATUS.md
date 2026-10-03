# v2 — durum tablosu

`design/Olive Oil Library v2.dc.html` içindeki yedi ekranın karşılığı. Bir şey
"kurulu" sayılması için sitede **görünür** olmalı: veri beklediği için hiçbir
sayfada çıkmayan bir modül, kurulu değil, hazır sayılır.

Son güncelleme: 2026-10-03

## Ekranlar

| Ekran | Durum | Kurulu olan | Eksik olan |
| --- | --- | --- | --- |
| 00 Homepage + mega menu | Kısmen | Partner şeridi, taksonomi paneli (20 link), ana sayfa blokları | Mega menü grupları v2'dekiler değil (bizde cultivar/region/intensity, v2'de polyphenol/certification/sensory/award/pairing); dil değiştirici ve B2B linki yok |
| 01 Faceted search | **Evet** | v2 sonuç satırı: 170px şişe · lab rakamları + duyusal barlar · 210px stok rayı. Filtreler, sıralama ve sayaç aynen çalışıyor | Polifenol/asitlik aralık slider'ları ve sensory/pairing facet'leri — veri kapsamı yetersiz (aşağıya bak) |
| 02 Oil detail | **Evet** | Duyusal radar (12 yağ), lab paneli (24), EU 432/2012 rozeti, stokta-yok alternatifleri (39), fiyat/satın alma modülü (16) | — canlı stok sayısı ve paket boyu seçici veri olmadığı için yok |
| 03 Cultivar | Evet | `Cultivars.dc.html`'in dört artboard'u kuruldu — aşağıdaki tabloya bak | Intensity facet'i (veri yok) |
| 04 Producer & mill | Kısmen | Ödül zaman çizelgesi — yağların ödüllerinden türetiliyor, 33/33 üreticide çıkıyor | Terroir tablosu: hiçbir üretici kaydında veri yok |
| 05 Learn hub | **Evet** | Öne çıkan yazı, kategori şeridi (2 raf: Tasting, Kitchen & storage) | Buying rafı boş; Countries kategorisi yok |
| 06 Article | **Evet** | `pull`, `table`, `oil`, `sources` blokları — storage rehberi hepsini kullanıyor; key figures rayı | Countries kategorisi ve yazısı yok |

## Cultivars.dc.html · dört artboard

| Artboard | Durum | Not |
| --- | --- | --- |
| 1a Index — default | **Evet** | Hero + arama, "Start here" kısayolları, sayımlı facet çipleri, sıralama, 3'lü grid, "Show more" |
| 1b Index — typeahead, sinonim eşleşmesi | **Evet** | 122 sinonim indeksli; "kalamata" → Kalamon, "edremit" → Ayvalık, hangi adla eşleştiğini yazıyor |
| 1c Index — aktif filtre, sonuç yok | **Evet** | Boş durum + "Remove ‘X’ · N varieties" kaçış düğmeleri, sayılar kartlardan hesaplanıyor |
| 2 Cultivar detail (Kalamon) | **Evet** | "Name warning" callout'u veriden geliyor; hesaplanan üçüncü stat kesikli çerçeveyle bekliyor; boş raf ve yayımlanmamış değerler tasarımdaki gibi |
| 3 Compare | **Evet** | 2–4 sütun, satır etiketi sabit, hiçbirinde yayımlanmamış satır katlanıyor + "Show anyway" |
| 4a/4b Mobile index + filtre sheet | **Evet** | Sticky "Filter (N)" düğmesi ve bottom sheet; facet rayı taşınıyor, kopyalanmıyor |

Tasarımdan bilinçli sapan tek şey **Intensity facet'i**: hiçbir kayıtta veri yok,
kırk çeşidi ağızda bıraktığı hisse göre sınıflamak panelin işi. Alan okunuyor,
eklendiği gün facet kendiliğinden çıkar. Kartlarda ve detayda "Intensity not
published" çipi görünüyor.

Compare sayfası yeni bir rota: `/cultivars/compare/`.

## İhtiyaçlar

Kalanların sebebi kod değil, veri ya da karar:

| İhtiyaç | Ne için | Kim halleder |
| --- | --- | --- |
| Üretici terroir verisi (rakım, toprak, yağış, ağaç sayısı, hasat, değirmene süre) | 04'ün terroir tablosu | Saha araştırması — 33 üreticinin hiçbirinde yok |
| Lab verisi (27 yağ "Not published") | Polifenol/asitlik facet'leri; şu an 18/55 ölçülmüş figüre sahip | Üretici ya da lab raporu |
| Duyusal profil (43 yağda yok) | Sensory facet'i; radar da bu yüzden 12 yağda | Panel oturumu |
| Canlı stok + fiyat beslemesi | 02'de bottle sayısı ve paket boyu seçici | Olijfoliemarkt tarafı |
| Countries kategorisinde bir yazı | Learn'ün üçüncü rafı | İçerik kararı |
| Şişe fotoğrafları (Etruna ×2, Casa del Agua, Cutrera Selezione, Palusci ×4 + 39 WBOO yağı) | Kart ve detay sayfaları | Shopify CDN build ortamından erişilemiyor; dosyalar `src/assets/img/`e elle konmalı |
| Çeşit yoğunluk sınıflaması (Delicate/Medium/Robust) | Cultivars index'in Intensity facet'i | Panel oturumu — 40 çeşidin hiçbirinde yok |
| Çeviriler (NL/DE/FR/IT) | Header'ın dil değiştiricisi | Çeviri; beş ölü link koymaktansa yok |
| B2B / Horeca sayfası | Header'ın trade linki | Sayfa yazılmalı |

## Bilinçli olarak yapılmayanlar

Bunlar eksik değil, karar:

- **Sayısal aroma çarkı** — IOC panel medyanları 40 çeşidin çoğunda yok.
- **Cultivar smoke point** — parti özelliği, çeşit özelliği değil. Yerine shelf stability.
- **Ortalama panel puanı** istatistiği — çoğu çeşitte tadılmış yağ yok.
- **"Most read" rayı** — analitik toplamıyoruz.
- **Bülten formu** — backend yok; üçüncü ölü form olurdu.
- **Spesifikasyon değerlerine bar** — bar ölçüm demek; "≥ 500 mg/kg" ölçüm değil.
- **"In stock · N bottles"** — stok beslemesi yok; sayılmayan bir sayı yazmayız.
- **Yatay ödül çizelgesi** — bir üretici tek yılda 13 ödül alabiliyor; yatay eksende okunmuyor, dikey kuruldu.

## 3 Ekim 2026'da eklenenler

- 5 demo yağ, demo üretici, sahte okur yorumları ve "Marta Ruiz" silindi.
- `/how-we-rate/`, `/contact/`, `/rankings/worlds-best-olive-oils-2025-26/` (83 satır, 42'si library'ye bağlı).
- Storage rehberi (`/learn/why-your-oil-goes-flat/`) — kategori şeridi açıldı.
- Mağazadaki 8 yağ + Etruna ve Marina Palusci üretici sayfaları (katalog kaydı, puansız).
- Library'de yorum sayısı ve "Most reviewed" kalktı; WBOO çipleri açıklandı.
