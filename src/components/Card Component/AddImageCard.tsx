import { twMerge } from "tailwind-merge"
import ImageIcon from "../../assets/Icons/ImageIcon"
import { ImageGallery } from "../../types/global.types"
import { useState } from "react"
import Modal from "../Modal/Modal"
import CloseIcon from "../../assets/Icons/CloseIcon"
import { nanoid } from "nanoid"


interface AddImageCard {
    setGalleryData: React.Dispatch<React.SetStateAction<ImageGallery[]>>
}

const AddImageCard = ({ setGalleryData }: AddImageCard) => {

    const [isModalOpen, setIsModalOpen] = useState(false);


    function handleImageSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const imageUrl = event.currentTarget["image-url"].value

        if (!imageUrl) return;
  
        setGalleryData(prev => [...prev, {
            id: nanoid(),
            slug: imageUrl,
            isSelected: false
        }]);

        setIsModalOpen(false);
    }
    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className={twMerge(" rounded-xl  flex flex-col justify-center items-center  border border-dashed border-gray-300 cursor-pointer hover:bg-gray-300 transition-colors duration-500 aspect-square")}>
                <ImageIcon />
                <p className="font-semibold text-xs md:text-base  whitespace-nowrap">Add Image</p>
            </button>

            <Modal
                open={isModalOpen}
                handleClose={() => setIsModalOpen(false)}
                modalId="addImageModal"
            >
                <form onSubmit={handleImageSubmit} className="relative py-12 px-6 bg-neutral-50 rounded w-[680px] max-h-[95vh]">
                    <CloseIcon onClick={() => setIsModalOpen(false)}
                        width={31}
                        className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-700 transition-all"
                    />

                    <h2 className="text-2xl font-semibold text-center mb-8">Add New Image</h2>

                    <input type="url" name="image-url" id="image-url" placeholder="https://example.com/image.png" className="w-full border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent" />

                    <div className="flex justify-end mt-4">
                        <button type="submit" className="px-8 py-2.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-500">Add Image</button>
                    </div>
                </form>
            </Modal>
        </>

    )
}

export default AddImageCard