import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar, Welcome, Dock } from "#components";
import { TerminalWindow, SafariWindow, ResumeWindow, FinderWindow, ContactWindow, PhotosWindow, ImageViewerWindow } from "#windows";

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
      <ContactWindow />
      <PhotosWindow />
      <ImageViewerWindow />
    </main>
  )
}

export default App