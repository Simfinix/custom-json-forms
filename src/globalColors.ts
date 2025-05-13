// Palette of generic colors which are gonna be used throughout the app

const globalColors = {
   // Attention color, by state
   // Registered: green, InProgress: orange, Done: blue, NotDone: Red
   attentions: {
      registered: { dark: '#609E50', light: 'rgba(64, 175, 82, .3)' },
      inProgress: {
         dark: '#F67D0E',
         light: 'rgb(245, 196, 135)',
         underlay: 'rgb(241, 172, 86)',
      },
      done: { dark: '#2A8EC7', light: 'rgb(128, 204, 230)' },
      notDone: { dark: '#FF5F3C', light: 'rgb(239, 154, 154)' },
      debited: 'rgb(55, 71, 79)',
      payable: '#2F9E97',
      signed: {dark: '#694AAD', light: '#DAD2EB'},
      notSigned: '#7A0060',
      informed: '#A1DFCC'
   },

   // Calendar day color, if the day is OK then it is 'allDone' (green), if not then it is
   // notAllDone (red)
   calendar: {
      allDone: 'rgb(128, 204, 230)',
      notAllDone: 'rgb(242, 185, 185)',
   },

   // Standardized colors to use in many places
   white: 'rgb(255, 255, 255)',
   black: 'rgb(0, 0, 0)',
   redPdf: 'rgb(211, 67, 67)',
   violet: 'rgb(45, 20, 120)',
   defaultDark: '#462A82',
   defaultLight: '#DAD2EB',

   // One grey darker than the other, the darker one is mostly used in icons and the lighter one
   // in borders and dividers
   grey: {
      darker: 'rgb(36, 36, 36)',
      dark: 'rgb(97, 97, 97)',
      medium: '#B0AFB5',
      light: 'rgb(224, 224, 224)',
   },

   // Cases colors by state (opened or closed)
   // Opened: orange, closed: grey
   cases: {
      open: {
         dark: 'rgb(235, 136, 14)',
         light: 'rgb(245, 196, 135)',
      },
      closed: {
         dark: 'rgb(158, 158, 158)',
         light: 'rgb(224, 224, 224)',
      },
   },
};

export default globalColors;
