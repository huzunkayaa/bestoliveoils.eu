# v2 — durum tablosu

`design/Olive Oil Library v2.dc.html` içindeki yedi ekranın karşılığı. Bir şey
"kurulu" sayılması için sitede **görünür** olmalı: veri beklediği için hiçbir
sayfada çıkmayan bir modül, kurulu değil, hazır sayılır.

Son güncelleme: 2026-09-12

## Ekranlar

| Ekran | Durum | Kurulu olan | Eksik olan |
| --- | --- | --- | --- |
| 00 Homepage + mega menu | Kısmen | Partner şeridi, taksonomi paneli (20 link), ana sayfa blokları | Mega menü grupları v2'dekiler değil (bizde cultivar/region/intensity, v2'de polyphenol/certification/sensory/award/pairing); dil değiştirici ve B2B linki yok |
| 01 Faceted search | **Evet** | v2 sonuç satırı: 170px şişe · lab rakamları + duyusal barlar · 210px stok rayı. Filtreler, sıralama ve sayaç aynen çalışıyor | Polifenol/asitlik aralık slider'ları ve sensory/pairing facet'leri — veri kapsamı yetersiz (aşağıya bak) |
| 02 Oil detail | **Evet** | Duyusal radar (12 yağ), lab paneli (24), EU 432/2012 rozeti, stokta-yok alternatifleri (39), fiyat/satın alma modülü (16) | — canlı stok sayısı ve paket boyu seçici veri olmadığı için yok |
| 03 Cultivar | Evet | Hub + 40 çeşit sayfası, karşılaştırma tablosu, aroma tanımlayıcıları, kaynaklar | — |
| 04 Producer & mill | Kısmen | Ödül zaman çizelgesi — yağların ödüllerinden türetiliyor, 33/33 üreticide çıkıyor | Terroir tablosu: hiçbir üretici kaydında veri yok |
| 05 Learn hub | Kısmen | Öne çıkan yazı bloğu, kategori altyapısı | Kategori grid'i gizli: iki kategoride yayımlanmış yazı gerekiyor |
| 06 Article | Sayfa tipi | `pull`, `table`, `oil`, `sources` blokları + key figures / "More in" rayı, 17 test | Blokları kullanan tek bir yazı yok; Countries kategorisi ve yazısı yok |

## İhtiyaçlar

Kalanların sebebi kod değil, veri ya da karar:

| İhtiyaç | Ne için | Kim halleder |
| --- | --- | --- |
| Üretici terroir verisi (rakım, toprak, yağış, ağaç sayısı, hasat, değirmene süre) | 04'ün terroir tablosu | Saha araştırması — 33 üreticinin hiçbirinde yok |
| Lab verisi (27 yağ "Not published") | Polifenol/asitlik facet'leri; şu an 18/55 ölçülmüş figüre sahip | Üretici ya da lab raporu |
| Duyusal profil (43 yağda yok) | Sensory facet'i; radar da bu yüzden 12 yağda | Panel oturumu |
| Canlı stok + fiyat beslemesi | 02'de bottle sayısı ve paket boyu seçici | Olijfoliemarkt tarafı |
| Countries kategorisinde bir yazı | 06 ekranının kendisi | İçerik kararı: ben araştırıp yazayım / rakamları sen ver / sen yaz |
| İkinci kategoride bir rehber | 05'in kategori grid'ini görünür kılmak | İçerik |
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
