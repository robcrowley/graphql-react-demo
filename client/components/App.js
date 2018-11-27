import Head from 'next/head';
import Header from './Header';

const App = ({children}) => (
  <div>
    <Head>
      <title>Cassette Revival</title>
      <link rel="stylesheet" href="https://bootswatch.com/4/sketchy/bootstrap.min.css"/>
    </Head>
    <Header/>
    <main className="container">
      {children}
    </main>
  </div>
);

export default App;