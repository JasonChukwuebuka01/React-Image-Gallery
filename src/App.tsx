
import { SortableContext, arrayMove, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import './App.css'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, KeyboardSensor, PointerSensor, TouchSensor, closestCenter, useSensor, useSensors } from '@dnd-kit/core';
import { useState } from 'react';
import { ImageGallery } from './types/global.types';
import { initialImageData } from './data';
import ImageCard from './components/Card Component/ImageCard';
import AddImageCard from './components/Card Component/AddImageCard';
import ImageOverlayCard from './components/Card Component/ImageOverlayCard';
import Header from './components/Header';


 

function App() {

  const [galleryData, setGalleryData] = useState<ImageGallery[]>(initialImageData);

  const [activeItem, setActiveItem] = useState<ImageGallery | null>(null);

   
  //dnd code starts here
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    }),
    useSensor(TouchSensor)
  )



  function handleDragStart(event: DragStartEvent) {
    const { id } = event.active
    if (!id) return;

    //current item
    const currentItem = galleryData.find(item => item.id === id);
    setActiveItem(currentItem || null);

  };



  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setGalleryData(items => {

        const oldIndex = items.findIndex(item => item.id === active.id);
        const NewIndex = items.findIndex(item => item.id === over.id);

        return arrayMove(items, oldIndex, NewIndex)
      })
    }

  };

  //dnd code ends here





  function handleSelectImage(id: (number | string)) {

    const newGalleryData = galleryData.map((imageItem) => {
      if (imageItem.id === id) {
        return {
          ...imageItem,
          isSelected: !imageItem.isSelected

        }
      };
      return imageItem;
    })
    setGalleryData(newGalleryData)
  }



  function handleDelete(selectedItem: ImageGallery[]){
      const newGalleryData = galleryData.filter(imageItem => !selectedItem.includes(imageItem));

      setGalleryData(newGalleryData)
  }

  return (
    <div className='min-h-screen '>
      <div className='container flex flex-col items-center mx-auto'>
        <div className='bg-white my-8 rounded-lg shadow max-w-5xl grid divide-y'>
          <Header
          onDelete={handleDelete}
          galleryData={galleryData}
          />

          {/*DND CONTEXT*/}
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
           >

            <div className='grid grid-cols-2 md:grid-cols-5 gap-8 p-8'>

              <SortableContext items={galleryData} strategy={rectSortingStrategy}>

               {
                  galleryData.map((imageItem) => (
                    <ImageCard
                      key={imageItem.id}
                      id={imageItem.id}
                      isSelected={imageItem.isSelected}
                      slug={imageItem.slug}
                      onClick={handleSelectImage}
                    />
                  ))
                }

              </SortableContext>

              <AddImageCard
                setGalleryData={setGalleryData}
              />



              <DragOverlay adjustScale={true} wrapperElement='div'>
                 {

                  activeItem ? <ImageOverlayCard
                    className='absolute z-50 h-full w-full'
                    slug={activeItem.slug}
                  /> : null
          
                  }
              </DragOverlay>

            </div>
          </DndContext>
        </div>
      </div>
    </div>
  )
}

export default App
