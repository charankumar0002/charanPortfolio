import { Route, Router } from "react-router-dom";
import Header from "./components/header";
import { Suspense, lazy } from "react";
const Home = lazy(() => import ("./pages/Home/home"));
const About = lazy(() => import ("./pages/About/about"));

function App() {
  return (
   <>
<Router>
  <Header/>
  <main>
    <Suspense>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      
    </Suspense>
  </main>
</Router>
   </>
  );
}

export default App;
