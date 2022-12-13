export const globalStyle = {
  html: {
    boxSsizing: 'border-box',
    width: '100vw',
    overflowX: 'hidden',
  },
  
  '*, *::before, *::after': {
    boxSizing: 'inherit',
  },

  body: {
      margin: 0,      
      fontFamily: " -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
      color:' #212121',
    backgroundColor:' #fff',
              
    },

  "html.no-scroll": {
    overflow: "hidden",
  },
    
    'h1, h2, p, ul': {
      margin: 0,
      padding: 0,
    },
    
    img: {
      display: 'block',
      maxWidth: '100%',
      height: 'auto'
    },
};