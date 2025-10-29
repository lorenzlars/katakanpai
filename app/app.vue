<template>
  <UApp>
    <UContainer>
      <div class="flex flex-col justify-center items-center gap-3 max-w-80">
        <h1 class="text-secondary text-5xl">
          Kata<span class="font-bold">kanpai</span>
        </h1>

        <UInput v-model="seconds" />
        <USelect v-model="level" :items="levels" />

        <div class="h-16">
          <HyperText :text="activeWord?.katakana ?? ' '" class="text-4xl font-bold" :duration="800"
            :animate-on-load="true" />
        </div>

        <div class="h-30 w-full">
          <UCard class="h-full flex justify-center items-center" variant="subtle">
            <p v-if="showAnswer" class="text-3xl">{{ activeWord?.brand }}</p>
          </UCard>
        </div>

        <UProgress v-model="progress" />

        <UButton @click="startGame" size="xl" class="w-full justify-center" variant="outline">
          {{ isActive ? 'Reveal' : 'Start' }}
        </UButton>
      </div>
    </UContainer>
  </UApp>
</template>

<script setup lang="ts">
const TICKS_PER_SECOND = 10
const showAnswer = shallowRef(false)
const activeWord = shallowRef<(typeof brands)[0]>()
const levels = ['Easy', 'Solid', 'Hard']
const seconds = shallowRef(10)
const interval = computed(() => seconds.value * TICKS_PER_SECOND)
const level = shallowRef()
const progress = shallowRef(100)

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

const { isActive, remaining, start, stop, pause, resume } = useCountdown(interval, {
  onComplete() {
    showAnswer.value = true
  },
  onTick() {
    progress.value = 100 / interval.value * remaining.value
  },
  interval: 1_000 / TICKS_PER_SECOND
})

function startGame() {
  if (isActive.value) {
    stop()
    showAnswer.value = true
  } else {
    showAnswer.value = false
    activeWord.value = brands[Math.floor(Math.random() * brands.length)]
    start()
  }
}
</script>
