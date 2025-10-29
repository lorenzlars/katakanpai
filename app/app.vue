<template>
  <UApp>
    <div class="mx-auto flex flex-col justify-center items-center gap-3 sm:max-w-screen-sm p-6">
      <h1 class="text-secondary text-5xl font-light">
        Kata<span class="font-bold">kanpai</span>
      </h1>

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

      <UModal title="Settings">
        <UButton label="Settings" color="neutral" variant="ghost" icon="i-lucide-cog" class="mt-12" />

        <template #body>
          <div class="flex gap-6">
            <UFormField label="Difficulty" name="level" class="w-full">
              <USelect v-model="level" :items="levels" class="w-full" />
            </UFormField>

            <UFormField label="Seconds to guess" name="seconds" class="w-full">
              <UInput v-model="seconds" type="number" class="w-full" />
            </UFormField>
          </div>
        </template>
      </UModal>
    </div>
  </UApp>
</template>

<script setup lang="ts">
type Levels = keyof typeof brands

const TICKS_PER_SECOND = 10
const showAnswer = shallowRef(false)
const activeWord = shallowRef<{ brand: string; katakana: string }>()
const levels: { label: string, value: Levels }[] = [
  { label: 'Easy', value: 'easy' },
  { label: 'Normal', value: 'normal' },
  { label: 'Hard', value: 'hard' },
]
const seconds = shallowRef(10)
const interval = computed(() => seconds.value * TICKS_PER_SECOND)
const level = shallowRef<Levels>('easy')
const progress = shallowRef(100)
const settingsVisible = shallowRef(false)

const brands = {
  easy: [
    // Up to 3 katakana characters
    { brand: "Zoom", katakana: "ズーム" },
    { brand: "Bing", katakana: "ビング" },
    { brand: "Edge", katakana: "エッジ" },
    { brand: "Pepsi", katakana: "ペプシ" },
    { brand: "Kia", katakana: "キア" },
    { brand: "Volvo", katakana: "ボルボ" },
    { brand: "Saab", katakana: "サーブ" },
    { brand: "Fiat", katakana: "フィアット" },
    { brand: "Opel", katakana: "オペル" },
    { brand: "Zara", katakana: "ザラ" },
    { brand: "BMW", katakana: "BMW" },
    { brand: "KFC", katakana: "KFC" },
    { brand: "CNN", katakana: "CNN" },
    { brand: "BBC", katakana: "BBC" },
    { brand: "IBM", katakana: "IBM" },
    { brand: "AMD", katakana: "AMD" },
    { brand: "LG", katakana: "LG" },
    { brand: "HP", katakana: "HP" },
    { brand: "Gap", katakana: "ギャップ" },
    { brand: "Mars", katakana: "マーズ" },
    { brand: "Shell", katakana: "シェル" },
    { brand: "Dell", katakana: "デル" },
    { brand: "Intel", katakana: "インテル" },
    { brand: "Xerox", katakana: "ゼロックス" },
    { brand: "Kodak", katakana: "コダック" },
    { brand: "Polo", katakana: "ポロ" },
    { brand: "Lego", katakana: "レゴ" },
    { brand: "Ikea", katakana: "イケア" },
    { brand: "Visa", katakana: "ビザ" },
    { brand: "Axa", katakana: "アクサ" },
    { brand: "BP", katakana: "BP" },
    { brand: "3M", katakana: "3M" }
  ],
  normal: [
    // 3-6 katakana characters
    { brand: "Apple", katakana: "アップル" },
    { brand: "Google", katakana: "グーグル" },
    { brand: "Amazon", katakana: "アマゾン" },
    { brand: "Tesla", katakana: "テスラ" },
    { brand: "Nike", katakana: "ナイキ" },
    { brand: "Sony", katakana: "ソニー" },
    { brand: "Samsung", katakana: "サムスン" },
    { brand: "Twitter", katakana: "ツイッター" },
    { brand: "Uber", katakana: "ウーバー" },
    { brand: "PayPal", katakana: "ペイパル" },
    { brand: "eBay", katakana: "イーベイ" },
    { brand: "Alibaba", katakana: "アリババ" },
    { brand: "Baidu", katakana: "バイドゥ" },
    { brand: "WeChat", katakana: "ウィーチャット" },
    { brand: "Slack", katakana: "スラック" },
    { brand: "Skype", katakana: "スカイプ" },
    { brand: "Gmail", katakana: "ジーメール" },
    { brand: "Yahoo", katakana: "ヤフー" },
    { brand: "Firefox", katakana: "ファイアフォックス" },
    { brand: "Chrome", katakana: "クローム" },
    { brand: "Safari", katakana: "サファリ" },
    { brand: "Opera", katakana: "オペラ" },
    { brand: "Domino's", katakana: "ドミノ" },
    { brand: "Mercedes", katakana: "メルセデス" },
    { brand: "Audi", katakana: "アウディ" },
    { brand: "Toyota", katakana: "トヨタ" },
    { brand: "Honda", katakana: "ホンダ" },
    { brand: "Ford", katakana: "フォード" },
    { brand: "Ferrari", katakana: "フェラーリ" },
    { brand: "Porsche", katakana: "ポルシェ" },
    { brand: "Jaguar", katakana: "ジャガー" },
    { brand: "Bentley", katakana: "ベントレー" },
    { brand: "Maserati", katakana: "マセラティ" },
    { brand: "Bugatti", katakana: "ブガッティ" },
    { brand: "Hyundai", katakana: "ヒュンダイ" },
    { brand: "Nissan", katakana: "ニッサン" },
    { brand: "Mazda", katakana: "マツダ" },
    { brand: "Lexus", katakana: "レクサス" },
    { brand: "Acura", katakana: "アキュラ" },
    { brand: "Subaru", katakana: "スバル" },
    { brand: "Suzuki", katakana: "スズキ" },
    { brand: "Isuzu", katakana: "イスズ" },
    { brand: "Daihatsu", katakana: "ダイハツ" },
    { brand: "Peugeot", katakana: "プジョー" },
    { brand: "Renault", katakana: "ルノー" },
    { brand: "Lancia", katakana: "ランチア" },
    { brand: "Škoda", katakana: "シュコダ" },
    { brand: "SEAT", katakana: "セアト" },
    { brand: "Holden", katakana: "ホールデン" },
    { brand: "Chanel", katakana: "シャネル" },
    { brand: "Gucci", katakana: "グッチ" },
    { brand: "Prada", katakana: "プラダ" },
    { brand: "Hermès", katakana: "エルメス" },
    { brand: "Dior", katakana: "ディオール" },
    { brand: "Versace", katakana: "ヴェルサーチ" },
    { brand: "Armani", katakana: "アルマーニ" },
    { brand: "Burberry", katakana: "バーバリー" },
    { brand: "Uniqlo", katakana: "ユニクロ" }
  ],
  hard: [
    // 6+ katakana characters
    { brand: "Microsoft", katakana: "マイクロソフト" },
    { brand: "Facebook", katakana: "フェイスブック" },
    { brand: "Netflix", katakana: "ネットフリックス" },
    { brand: "Adidas", katakana: "アディダス" },
    { brand: "Nintendo", katakana: "ニンテンドー" },
    { brand: "PlayStation", katakana: "プレイステーション" },
    { brand: "Xbox", katakana: "エックスボックス" },
    { brand: "YouTube", katakana: "ユーチューブ" },
    { brand: "Instagram", katakana: "インスタグラム" },
    { brand: "TikTok", katakana: "ティックトック" },
    { brand: "WhatsApp", katakana: "ワッツアップ" },
    { brand: "Snapchat", katakana: "スナップチャット" },
    { brand: "LinkedIn", katakana: "リンクトイン" },
    { brand: "Airbnb", katakana: "エアビーアンドビー" },
    { brand: "Spotify", katakana: "スポティファイ" },
    { brand: "Discord", katakana: "ディスコード" },
    { brand: "Dropbox", katakana: "ドロップボックス" },
    { brand: "OneDrive", katakana: "ワンドライブ" },
    { brand: "iCloud", katakana: "アイクラウド" },
    { brand: "Coca-Cola", katakana: "コカコーラ" },
    { brand: "McDonald's", katakana: "マクドナルド" },
    { brand: "Burger King", katakana: "バーガーキング" },
    { brand: "Starbucks", katakana: "スターバックス" },
    { brand: "Subway", katakana: "サブウェイ" },
    { brand: "Pizza Hut", katakana: "ピザハット" },
    { brand: "BMW", katakana: "ビーエムダブリュー" },
    { brand: "Volkswagen", katakana: "フォルクスワーゲン" },
    { brand: "Lamborghini", katakana: "ランボルギーニ" },
    { brand: "Rolls-Royce", katakana: "ロールスロイス" },
    { brand: "McLaren", katakana: "マクラーレン" },
    { brand: "Infiniti", katakana: "インフィニティ" },
    { brand: "Mitsubishi", katakana: "ミツビシ" },
    { brand: "Citroën", katakana: "シトロエン" },
    { brand: "Alfa Romeo", katakana: "アルファロメオ" },
    { brand: "Vauxhall", katakana: "ボクソール" },
    { brand: "Louis Vuitton", katakana: "ルイヴィトン" },
    { brand: "Calvin Klein", katakana: "カルバンクライン" },
    { brand: "Tommy Hilfiger", katakana: "トミーヒルフィガー" },
    { brand: "Ralph Lauren", katakana: "ラルフローレン" },
    { brand: "Hugo Boss", katakana: "ヒューゴボス" },
    { brand: "H&M", katakana: "エイチアンドエム" },
    { brand: "Mastercard", katakana: "マスターカード" },
    { brand: "American Express", katakana: "アメリカンエクスプレス" },
    { brand: "Goldman Sachs", katakana: "ゴールドマンサックス" },
    { brand: "Morgan Stanley", katakana: "モルガンスタンレー" },
    { brand: "JPMorgan Chase", katakana: "ジェーピーモルガンチェース" },
    { brand: "Bank of America", katakana: "バンクオブアメリカ" },
    { brand: "Wells Fargo", katakana: "ウェルズファーゴ" },
    { brand: "Citigroup", katakana: "シティグループ" },
    { brand: "Credit Suisse", katakana: "クレディスイス" },
    { brand: "Deutsche Bank", katakana: "ドイツ銀行" },
    { brand: "UBS", katakana: "ユービーエス" },
    { brand: "Barclays", katakana: "バークレイズ" },
    { brand: "HSBC", katakana: "エイチエスビーシー" },
    { brand: "Standard Chartered", katakana: "スタンダードチャータード" },
    { brand: "Royal Bank of Scotland", katakana: "ロイヤルバンクオブスコットランド" },
    { brand: "Santander", katakana: "サンタンデール" }
  ]
}

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
    const selectedBrands = brands[level.value]

    showAnswer.value = false
    activeWord.value = selectedBrands[Math.floor(Math.random() * selectedBrands.length)]

    start()
  }
}
</script>
