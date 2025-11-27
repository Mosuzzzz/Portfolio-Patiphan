import WindowWrapper from "#hoc/WindowWrapper"
import WindowControls from "#components/WindowControls"
import useWindowStore from "#store/window"

const ImageViewer = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header" className="bg-[#f6f6f6] border-b border-[#d1d1d1]">
                <WindowControls target="imgfile" />
                <div className="flex-1 text-center text-sm font-medium text-gray-700">{data.title || "Image"}</div>
            </div>
            <div className="flex-1 bg-black/5 flex items-center justify-center p-4">
                <img
                    src={data.src}
                    alt={data.title || "Image"}
                    className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                />
            </div>
        </>
    )
}

const ImageViewerWindow = WindowWrapper(ImageViewer, "imgfile")

export default ImageViewerWindow
