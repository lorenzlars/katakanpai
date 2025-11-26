export default defineI18nConfig(() => {
  return {
    fallbackLocale: 'en',
    numberFormats: {
      de: {
        decimal: {
          style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent', useGrouping: false,
        },
      },
      ja: {
        decimal: {
          style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent', useGrouping: false,
        },
      },
      en: {
        decimal: {
          style: 'decimal', minimumFractionDigits: 0, maximumFractionDigits: 2,
        },
        percent: {
          style: 'percent', useGrouping: false,
        },
      },
    },
    datetimeFormats: {
      de: {
        short: {
          year: 'numeric', month: 'short', day: 'numeric',
        },
        long: {
          year: 'numeric', month: 'short', day: 'numeric',
          weekday: 'short', hour: 'numeric', minute: 'numeric',
        },
      },
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
