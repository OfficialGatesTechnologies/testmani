import Document, { Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }
  
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
          <link rel="shortcut icon" type="image/x-icon" href="/static/images/favicon.ico" />
          <link rel='stylesheet' type='text/css' href='/static/nprogress.css' />
          <link rel='stylesheet' type='text/css' href='/static/style.css' />
          <link rel='stylesheet' type='text/css' href='/static/main.css' />
          <link rel='stylesheet' type='text/css' href='/static/responsive.css' />
          <link rel='stylesheet' type='text/css' href='/static/animate.min.css' />
          <link href="https://fonts.googleapis.com/css?family=PT+Sans:400,400i,700,700i&display=swap" rel="stylesheet"/> 
            
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous" />
          <meta charSet="utf-8" />
         
        </Head>
        <body>
       
          <Main />
          <NextScript />  

        </body>

      </html>
    )
  }
}