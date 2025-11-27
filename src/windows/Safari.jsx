import WindowWrapper from "#hoc/WindowWrapper"
import WindowControls from "#components/WindowControls"
import { PanelLeft, ChevronLeft, ChevronRight, Share, Copy, Plus, Search, RotateCw, Lock, Github, Globe, Shield } from "lucide-react"
import { useState } from "react"
import { favorites } from "#constants"

const Safari = () => {
    
    const [currentUrl, setCurrentUrl] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [history, setHistory] = useState([""]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleNavigate = (url) => {
        const newHistory = history.slice(0, currentIndex + 1);
        newHistory.push(url);
        setHistory(newHistory);
        setCurrentIndex(newHistory.length - 1);
        setCurrentUrl(url);
        setInputValue(url);
        setIsLoading(true);
    };

    const handleBack = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleForward = () => {
        if (currentIndex < history.length - 1) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            setCurrentUrl(history[newIndex]);
            setInputValue(history[newIndex]);
        }
    };

    const handleRefresh = () => {
        const url = currentUrl;
        setCurrentUrl("");
        setTimeout(() => setCurrentUrl(url), 10);
        setIsLoading(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = inputValue.trim();
        if (!url) return;

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        handleNavigate(url);
    };

    return (
        <>
            <div id="window-header">
                <WindowControls target="safari" />
                <PanelLeft className="ml-10 icon" />

                <div className="flex items-center gap-1 ml-5">
                    <button onClick={handleBack} disabled={currentIndex <= 0} className="disabled:opacity-30">
                        <ChevronLeft className="icon" />
                    </button>
                    <button onClick={handleForward} disabled={currentIndex >= history.length - 1} className="disabled:opacity-30">
                        <ChevronRight className="icon" />
                    </button>
                </div>


                <div className="flex-1 flex-center gap-3">
                    <form onSubmit={handleSubmit} className="search group focus-within:ring-2 ring-blue-500/50 transition-all">
                        {currentUrl ? <Lock className="w-3 h-3 text-gray-500" /> : <Search className="icon" />}
                        <input
                            type="text"
                            placeholder="Search or enter website name"
                            className="flex-1 bg-transparent outline-none text-xs text-center group-focus-within:text-left transition-all"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        {isLoading && <RotateCw className="w-3 h-3 animate-spin text-gray-500" />}
                    </form>
                </div>

                <div className="flex items-center gap-5">
                    <Share className="icon" />
                    <Plus className="icon" />
                    <Copy className="icon" />
                </div>

            </div>
            <div className="blog flex-1 bg-white/90 backdrop-blur-xl relative overflow-hidden">
                {currentUrl ? (
                    currentUrl.includes("github.com") ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center space-y-6">
                            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                                <Github className="w-12 h-12 text-gray-700" />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-gray-800">GitHub Security</h2>
                                <p className="text-gray-600 max-w-md">
                                    GitHub does not allow their website to be embedded in other applications for security reasons.
                                </p>
                            </div>
                            <button
                                onClick={() => window.open(currentUrl, "_blank")}
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                Open in New Tab <Share className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <iframe
                            src={currentUrl}
                            className="w-full h-full border-none"
                            onLoad={() => setIsLoading(false)}
                            title="browser-frame"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                        />
                    )
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-10 overflow-y-auto">
                        <div className="max-w-4xl w-full space-y-12">
                            <div className="text-center space-y-2">
                                <h1 className="text-4xl font-bold text-gray-800">Favorites</h1>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {favorites.map((fav) => (
                                    <button
                                        key={fav.id}
                                        onClick={() => handleNavigate(fav.url)}
                                        className="flex flex-col items-center gap-3 group p-4 rounded-xl hover:bg-gray-100/50 transition-all"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl group-hover:scale-105 transition-transform text-gray-700">
                                            {fav.icon === "github" && <Github className="w-8 h-8" />}
                                            {fav.icon === "globe" && <Globe className="w-8 h-8" />}
                                            {fav.icon === "search" && <Search className="w-8 h-8" />}
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 group-hover:text-black">{fav.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-800 ml-2">Privacy Report</h2>
                                <div className="bg-white/50 p-4 rounded-xl flex items-center gap-4 shadow-sm">
                                    <Shield className="w-8 h-8 text-green-600" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">In the last 7 days, Safari has prevented 42 trackers from profiling you.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

const SafariWindow = WindowWrapper(Safari, "safari")

export default SafariWindow
