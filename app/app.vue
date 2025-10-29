<template>
  <UApp>
    <UContainer class="container">
      <div class="flex justify-center items-center text-center h-vh">
        <div>
          <UButton @click="startGame">
            {{ isPending ? 'Reveal' : 'Start' }}
          </UButton>

          <HyperText :text="activeWord?.katakana ?? ' '" class="text-4xl font-bold" :duration="800"
            :animate-on-load="true" />

          <p v-if="showAwenser">
            {{ activeWord?.brand }}
          </p>
        </div>
      </div>
    </UContainer>
  </UApp>
</template>

<script setup lang="ts">
const showAwenser = shallowRef(false)
const activeWord = shallowRef<(typeof brands)[0]>()

const brands = [
  { brand: "Apple", katakana: "アップル" },
  { brand: "Google", katakana: "グーグル" },
  { brand: "Microsoft", katakana: "マイクロソフト" },
  { brand: "Amazon", katakana: "アマゾン" },
  { brand: "Facebook", katakana: "フェイスブック" },
  { brand: "Netflix", katakana: "ネットフリックス" },
  { brand: "Tesla", katakana: "テスラ" },
  { brand: "Nike", katakana: "ナイキ" },
  { brand: "Adidas", katakana: "アディダス" },
  { brand: "Samsung", katakana: "サムスン" },
  { brand: "Sony", katakana: "ソニー" },
  { brand: "Nintendo", katakana: "ニンテンドー" },
  { brand: "PlayStation", katakana: "プレイステーション" },
  { brand: "Xbox", katakana: "エックスボックス" },
  { brand: "YouTube", katakana: "ユーチューブ" },
  { brand: "Instagram", katakana: "インスタグラム" },
  { brand: "Twitter", katakana: "ツイッター" },
  { brand: "TikTok", katakana: "ティックトック" },
  { brand: "WhatsApp", katakana: "ワッツアップ" },
  { brand: "Snapchat", katakana: "スナップチャット" },
  { brand: "LinkedIn", katakana: "リンクトイン" },
  { brand: "Uber", katakana: "ウーバー" },
  { brand: "Airbnb", katakana: "エアビーアンドビー" },
  { brand: "Spotify", katakana: "スポティファイ" },
  { brand: "PayPal", katakana: "ペイパル" },
  { brand: "eBay", katakana: "イーベイ" },
  { brand: "Alibaba", katakana: "アリババ" },
  { brand: "Baidu", katakana: "バイドゥ" },
  { brand: "WeChat", katakana: "ウィーチャット" },
  { brand: "Zoom", katakana: "ズーム" },
  { brand: "Slack", katakana: "スラック" },
  { brand: "Discord", katakana: "ディスコード" },
  { brand: "Skype", katakana: "スカイプ" },
  { brand: "Dropbox", katakana: "ドロップボックス" },
  { brand: "OneDrive", katakana: "ワンドライブ" },
  { brand: "iCloud", katakana: "アイクラウド" },
  { brand: "Gmail", katakana: "ジーメール" },
  { brand: "Yahoo", katakana: "ヤフー" },
  { brand: "Bing", katakana: "ビング" },
  { brand: "Firefox", katakana: "ファイアフォックス" },
  { brand: "Chrome", katakana: "クローム" },
  { brand: "Safari", katakana: "サファリ" },
  { brand: "Edge", katakana: "エッジ" },
  { brand: "Opera", katakana: "オペラ" },
  { brand: "Coca-Cola", katakana: "コカコーラ" },
  { brand: "Pepsi", katakana: "ペプシ" },
  { brand: "McDonald's", katakana: "マクドナルド" },
  { brand: "KFC", katakana: "ケンタッキー" },
  { brand: "Burger King", katakana: "バーガーキング" },
  { brand: "Starbucks", katakana: "スターバックス" },
  { brand: "Subway", katakana: "サブウェイ" },
  { brand: "Pizza Hut", katakana: "ピザハット" },
  { brand: "Domino's", katakana: "ドミノ" },
  { brand: "BMW", katakana: "ビーエムダブリュー" },
  { brand: "Mercedes", katakana: "メルセデス" },
  { brand: "Audi", katakana: "アウディ" },
  { brand: "Toyota", katakana: "トヨタ" },
  { brand: "Honda", katakana: "ホンダ" },
  { brand: "Ford", katakana: "フォード" },
  { brand: "Volkswagen", katakana: "フォルクスワーゲン" },
  { brand: "Ferrari", katakana: "フェラーリ" },
  { brand: "Lamborghini", katakana: "ランボルギーニ" },
  { brand: "Porsche", katakana: "ポルシェ" },
  { brand: "Jaguar", katakana: "ジャガー" },
  { brand: "Bentley", katakana: "ベントレー" },
  { brand: "Rolls-Royce", katakana: "ロールスロイス" },
  { brand: "Maserati", katakana: "マセラティ" },
  { brand: "Bugatti", katakana: "ブガッティ" },
  { brand: "McLaren", katakana: "マクラーレン" },
  { brand: "Hyundai", katakana: "ヒュンダイ" },
  { brand: "Kia", katakana: "キア" },
  { brand: "Nissan", katakana: "ニッサン" },
  { brand: "Mazda", katakana: "マツダ" },
  { brand: "Lexus", katakana: "レクサス" },
  { brand: "Infiniti", katakana: "インフィニティ" },
  { brand: "Acura", katakana: "アキュラ" },
  { brand: "Subaru", katakana: "スバル" },
  { brand: "Mitsubishi", katakana: "ミツビシ" },
  { brand: "Suzuki", katakana: "スズキ" },
  { brand: "Isuzu", katakana: "イスズ" },
  { brand: "Daihatsu", katakana: "ダイハツ" },
  { brand: "Volvo", katakana: "ボルボ" },
  { brand: "Saab", katakana: "サーブ" },
  { brand: "Peugeot", katakana: "プジョー" },
  { brand: "Renault", katakana: "ルノー" },
  { brand: "Citroën", katakana: "シトロエン" },
  { brand: "Fiat", katakana: "フィアット" },
  { brand: "Alfa Romeo", katakana: "アルファロメオ" },
  { brand: "Lancia", katakana: "ランチア" },
  { brand: "Škoda", katakana: "シュコダ" },
  { brand: "SEAT", katakana: "セアト" },
  { brand: "Opel", katakana: "オペル" },
  { brand: "Vauxhall", katakana: "ボクソール" },
  { brand: "Holden", katakana: "ホールデン" },
  { brand: "Chanel", katakana: "シャネル" },
  { brand: "Louis Vuitton", katakana: "ルイヴィトン" },
  { brand: "Gucci", katakana: "グッチ" },
  { brand: "Prada", katakana: "プラダ" },
  { brand: "Hermès", katakana: "エルメス" },
  { brand: "Dior", katakana: "ディオール" },
  { brand: "Versace", katakana: "ヴェルサーチ" },
  { brand: "Armani", katakana: "アルマーニ" },
  { brand: "Burberry", katakana: "バーバリー" },
  { brand: "Calvin Klein", katakana: "カルバンクライン" },
  { brand: "Tommy Hilfiger", katakana: "トミーヒルフィガー" },
  { brand: "Ralph Lauren", katakana: "ラルフローレン" },
  { brand: "Hugo Boss", katakana: "ヒューゴボス" },
  { brand: "Zara", katakana: "ザラ" },
  { brand: "H&M", katakana: "エイチアンドエム" },
  { brand: "Uniqlo", katakana: "ユニクロ" }
]

const { isPending, start, stop } = useTimeoutFn(() => {
  showAwenser.value = true
}, 10_000, { immediate: false })

function startGame() {
  if (isPending.value) {
    stop()
    showAwenser.value = true
  } else {
    showAwenser.value = false
    activeWord.value = brands[Math.floor(Math.random() * brands.length)]
    start()
  }
}

function revealAwenser() {
  showAwenser.value = true
  stop()
}
</script>
