import WindowWrapper from "#hoc/WindowWrapper"
import WindowControls from "#components/WindowControls"
import { PanelLeft, ChevronLeft, ChevronRight, Share, Copy, Plus, Search } from "lucide-react"

const Safari = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />
                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <ChevronLeft className="icon" />
                    <ChevronRight className="icon" />
                </div>


                <div className="flex-1 flex-center gap-3">
                    <div className="search">
                        <Search className="icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            className="flex-1"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>

            </div>
            <div className="blog">
                <div className="blog-header">
                    <h1>Blog</h1>
                </div>
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, "safari")

export default SafariWindow
