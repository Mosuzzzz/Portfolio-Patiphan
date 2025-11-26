import gsap from "gsap";
import {Draggable} from "gsap/Draggable";
import { Navbar,Welcome,Dock } from "#components";
import {TerminalWindow,SafariWindow,ResumeWindow,FinderWindow} from "#windows";

gsap.registerPlugin(Draggable); 

const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />
      <TerminalWindow />
      <SafariWindow />
      <ResumeWindow />
      <FinderWindow />
    </main>
  )
}

export default App