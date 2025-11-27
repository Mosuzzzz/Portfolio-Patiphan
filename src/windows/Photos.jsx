import WindowWrapper from "#hoc/WindowWrapper"
import WindowControls from "#components/WindowControls"
import { Heart, Search, ChevronLeft, Play, Share, ZoomIn, ZoomOut } from "lucide-react"
import useWindowStore from "#store/window"
import { photos } from "#constants"

const Photos = () => {
    const { openWindow } = useWindowStore();



    return (
        <>
            <div id="window-header" className="bg-[#f6f6f6] border-b border-[#d1d1d1]">
                <WindowControls target="photos" />

                <div className="flex items-center gap-4 ml-8">
                    <div className="flex bg-[#e3e3e3] rounded-md p-0.5">
                        <button className="px-3 py-0.5 bg-white rounded shadow-sm text-xs font-medium">Library</button>
                        <button className="px-3 py-0.5 text-xs font-medium text-gray-600">Memories</button>
                        <button className="px-3 py-0.5 text-xs font-medium text-gray-600">People</button>
                    </div>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-4 mr-2">
                    <div className="flex items-center gap-1">
                        <ZoomOut className="w-4 h-4 text-gray-500" />
                        <input type="range" className="w-20 h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer" />
                        <ZoomIn className="w-4 h-4 text-gray-500" />
                    </div>
                    <Search className="w-4 h-4 text-gray-500" />
                </div>
            </div>

            <div className="flex h-full bg-white">
                {/* Sidebar */}
                <div className="w-48 bg-[#f2f2f7] border-r border-[#d1d1d1] p-2 flex flex-col gap-1 text-sm">
                    <div className="px-2 py-1 text-gray-500 font-semibold text-xs mt-2">Library</div>
                    <div className="px-2 py-1 bg-[#007aff] text-white rounded flex justify-between items-center">
                        <span>All Photos</span>
                        <span className="text-xs opacity-80">{photos.length}</span>
                    </div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Days</div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Months</div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Years</div>

                    <div className="px-2 py-1 text-gray-500 font-semibold text-xs mt-4">Albums</div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Favorites</div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Recents</div>
                    <div className="px-2 py-1 text-gray-700 hover:bg-black/5 rounded">Imports</div>
                </div>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {photos.map((photo) => (
                            <div
                                key={photo.id}
                                onClick={() => openWindow("imgfile", photo)}
                                className="aspect-square group cursor-pointer relative overflow-hidden bg-gray-100 rounded-md"
                            >
                                <img
                                    src={photo.src}
                                    alt={photo.title}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

const PhotosWindow = WindowWrapper(Photos, "photos")

export default PhotosWindow
