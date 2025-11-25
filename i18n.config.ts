export default defineI18nConfig(() => {
  return {
    fallbackLocale: 'en',
    numberFormats: {
      ja: {
        currency: {
          style: 'currency', currency: 'EUR', notation: 'standard',
        },
        decimal: {
          style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent', useGrouping: false,
        },
      },
      en: {
        currency: {
          style: 'currency', currency: 'EUR', notation: 'standard',
        },
        decimal: {
          style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent', useGrouping: false,
        },
      },
    },
    datetimeFormats: {
      ja: {
        short: {
          year: 'numeric', month: 'short', day: 'numeric',
        },
        long: {
          year: 'numeric', month: 'short', day: 'numeric',
          weekday: 'short', hour: 'numeric', minute: 'numeric',
        },
      },
      en: {
        short: {
          year: 'numeric', month: 'short', day: 'numeric',
        },
        long: {
          year: 'numeric', month: 'short', day: 'numeric',
          weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: true,
        },
      },
    },
  }
})
