import Head from 'next/head'
import Form from '../components/form'

export default function Home() {
  return (
    <div>
      <Head>
        <title>EZ Music Fan Link Builder</title>
        <meta name="description" content="Generate a fanlink with a few clicks, without signing up for anything." />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <main className="bg-slate-700 pt-16 pb-16">
        <Form></Form>
      </main>
    </div>
  )
}
