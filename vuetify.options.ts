import colors from 'vuetify/lib/util/colors';

export default () => ({
  
  theme: {
    dark: false,
    themes: {
      dark: {
        primary: colors.blue.darken2,
        accent: colors.grey.darken3,
        secondary: colors.amber.darken3,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.deepOrange.accent4,
        success: colors.green.accent3
      },
      space: '#172b4d'
    },
    options: {
      customProperties: true
    }
  }
});
