import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MediaContext, HtmlBlock } from "../contexts/MediaContext";
import { PromptTemplate } from "../utils/Prompts";

interface DragDropListProps {
  setLastHtmlBlockIndex: (params: number | null) => void;
  lastHtmlBlockIndex: number | null;
  setSelectedSection: (params: PromptTemplate) => void;
  getSectionDetails: (params: PromptTemplate) => string;
  pastHtmlArrays: HtmlBlock[][];
  setPastHtmlArrays: (params: HtmlBlock[][]) => void;
}

const DragDropList: React.FC<DragDropListProps> = ({
  setLastHtmlBlockIndex,
  lastHtmlBlockIndex,
  setSelectedSection,
  getSectionDetails,
  pastHtmlArrays,
  setPastHtmlArrays,
}) => {
  const { htmlArray, setHtmlArray } = useContext(MediaContext);
  const [renderedItems, setRenderedItems] = useState<HtmlBlock[]>([]);

  useEffect(() => {
    // Update renderedItems whenever htmlArray changes
    setRenderedItems(htmlArray.slice(1, -1));
  }, [htmlArray]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;
    const indexToRemove = source.index;
    console.log("lastHtmlBlockIndex", lastHtmlBlockIndex);

    const reorderedItems = Array.from(htmlArray.slice(1, -1));
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    // Add the first and last items back to htmlArray
    const firstItem = htmlArray[0];
    const lastItem = htmlArray[htmlArray.length - 1];
    const updatedHtmlArray = [firstItem, ...reorderedItems, lastItem];

    setRenderedItems([...reorderedItems]);
    setHtmlArray([...updatedHtmlArray]);

    if (destination && destination.droppableId === "removeArea") {
      // The item was dragged into the remove area, remove it from the list
      console.log("indexToRemove", indexToRemove);

      const updatedItems = renderedItems.slice(); // Create a copy
      updatedItems.splice(indexToRemove, 1);

      setRenderedItems([...updatedItems]);

      // Update the htmlArray without the removed item
      const updatedHtmlArray = [htmlArray[0], ...updatedItems, htmlArray[htmlArray.length - 1]];
      console.log("updatedHtmlArray", updatedHtmlArray);
      setHtmlArray(updatedHtmlArray);
      setPastHtmlArrays([...pastHtmlArrays, updatedHtmlArray]);
      setLastHtmlBlockIndex(null);
    }
  };

  const handleItemClick = (item: HtmlBlock, event: React.MouseEvent) => {
    event.preventDefault();

    if (item.id !== lastHtmlBlockIndex) {
      setLastHtmlBlockIndex(item.id);
      setSelectedSection(item.name as PromptTemplate);
      return;
    }
    if (item.id === lastHtmlBlockIndex) {
      setLastHtmlBlockIndex(null);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-col m-2 py-4 justify-end'>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              className='bg-gray-200 p-4 pt-2 rounded-md flex flex-col'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <p className='text-center font-semibold'>Layout</p>
              {renderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`w-full p-4 mt-2 rounded cursor-pointer ${
                        snapshot.isDragging
                          ? "bg-green-800 text-white"
                          : lastHtmlBlockIndex === item.id
                          ? "bg-green-500 text-white"
                          : "bg-black text-white hover:bg-green-800"
                      }`}
                      onClick={(event) => handleItemClick(item, event)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {item.name === item.name ? (
                        <p className='flex text-center'>
                          {item.id} {getSectionDetails(item.name as PromptTemplate)}
                        </p>
                      ) : (
                        <p>Do something else when name is falsy</p>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId='removeArea' direction='horizontal'>
          {(provided) => (
            <div
              className='w-full h-14 p-4 sticky bg-red-500 text-white text-center rounded mt-2 hover:bg-red-800'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              Drag here to Remove
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default DragDropList;
