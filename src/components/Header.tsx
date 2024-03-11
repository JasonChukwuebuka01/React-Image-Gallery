import CheckboxIcon from "../assets/Icons/CheckboxIcon";
import EmptyCheckboxIcon from "../assets/Icons/EmptyCheckboxIcon";
import { ImageGallery } from "../types/global.types"

interface HeaderProps {
    onDelete: (selectedItem: ImageGallery[]) => void;
    galleryData: ImageGallery[]
}

const Header = ({ onDelete, galleryData }: HeaderProps) => {

    const selectedItem = galleryData.filter(item => item.isSelected);


    return (
        <div className="flex items-center justify-between gap-4 p-5">
            {
                selectedItem.length > 0 ?
                    <>
                        <h2 className="text-lg md:text-2xl font-semibold text-gray-800 flex items-center gap-2">
                             {
                                selectedItem.length > 0?  (<CheckboxIcon className="text-blue-600"/>) : (<EmptyCheckboxIcon/>)
                             }
                             <span>
                                {
                                    selectedItem.length > 0? `${selectedItem.length} file${selectedItem.length === 1? "" : "s"} Selected` : `${selectedItem.length} files Selected`
                                }
                             </span>
                        </h2>
                        <button
                        onClick={
                             selectedItem.length > 0? (()=> onDelete(selectedItem)) : ()=>{}
                        }
                        className="font-semibold text-red-500 text-base md:text-lg hover:underline">
                            {
                                selectedItem.length > 0? `Delete Files` : `Delete files`
                            }
                        </button>
                    </> : <p className="text-2xl font-semibold text-gray-800">ShowCase</p>
            }
        </div>
    )
}

export default Header