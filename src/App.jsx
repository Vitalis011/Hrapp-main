import Header from './Header';
import Person from './Person';
import Footer from './Footer';
import './App.css'

function App() {

  return (
   <div>
    <Header />
    <main>
      <Person name="Alice" title="CEO" salary={6000} phone="0502350934" email="ceo@best.com" animal="Whale" />
      <Person name="Jason" title="CFO" salary={5500} phone="0403849832" email="cfo@best.com" animal="Tiger" />
      <Person name="Mary" title="Secretary" salary={3000} phone="0459393939" email="sec@best.com" animal="Pig" />
      <Person name="Mei" title="Advisor" salary={4800} phone="0403934843" email="advice@best.com" animal="Cat" />
      <Person name="Jay" title="Senior Developer" salary={5400} phone="0449933333" email="juha@best.com" animal="Dog" />
    </main>
    <Footer />
   </div>
  )
}

export default App
