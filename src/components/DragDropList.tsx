import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { HtmlContext, HtmlBlock } from "../contexts/HtmlContext";
import { PromptTemplate } from "../utils/Prompts";

interface DragDropListProps {
  setSelectedSection: (params: PromptTemplate) => void;
  getSectionDetails: (params: PromptTemplate) => string;
}

const DragDropList: React.FC<DragDropListProps> = ({ setSelectedSection, getSectionDetails }) => {
  const { htmlArray, setHtmlArray, pastHtmlArrays, setPastHtmlArrays, lastHtmlBlockId, setLastHtmlBlockId } =
    useContext(HtmlContext);
  const [renderedItems, setRenderedItems] = useState<HtmlBlock[]>([]);

  useEffect(() => {
    // Update renderedItems whenever htmlArray changes
    setRenderedItems(htmlArray.slice(1, -1));
  }, [htmlArray]);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (destination === undefined || destination === null) return null;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;
    const indexToRemove = source.index;

    const reorderedItems = Array.from(htmlArray.slice(1, -1));
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);
    setRenderedItems(reorderedItems);

    // Add the first and last items back to htmlArray
    const firstItem = htmlArray[0];
    const lastItem = htmlArray[htmlArray.length - 1];
    const newHtmlArray = [firstItem, ...reorderedItems, lastItem];
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    setHtmlArray(newHtmlArray);

    if (destination && destination.droppableId === "removeArea") {
      // The item was dragged into the remove area, remove it from the list
      console.log("indexToRemove", indexToRemove);

      const updatedItems = renderedItems.slice(); // Create a copy
      updatedItems.splice(indexToRemove, 1);
      setRenderedItems(updatedItems);

      // Update the htmlArray without the removed item
      const updatedHtmlArray = [htmlArray[0], ...updatedItems, htmlArray[htmlArray.length - 1]];
      setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
      setHtmlArray(updatedHtmlArray);
      setLastHtmlBlockId(null);
    }
  };

  const handleItemClick = (item: HtmlBlock, event: React.MouseEvent) => {
    event.preventDefault();
    if (item.id !== lastHtmlBlockId) {
      setLastHtmlBlockId(item.id);
      setSelectedSection(item.name as PromptTemplate);
      return;
    }
    if (item.id === lastHtmlBlockId) {
      setLastHtmlBlockId(null);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className='flex flex-col m-2 py-4 justify-end '>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div
              className='bg-gray-200 p-2 pt-2 rounded-md flex flex-col'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <p className='text-center font-semibold'>Layout</p>
              {renderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`w-full p-2 mt-2 rounded cursor-pointer ${
                        snapshot.isDragging
                          ? "bg-green-800 text-white"
                          : lastHtmlBlockId === item.id
                          ? "bg-green-500 text-white"
                          : "bg-black text-white hover:bg-green-800"
                      }`}
                      onClick={(event) => handleItemClick(item, event)}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <p className='flex text-center'>
                        {item.id} {getSectionDetails(item.name as PromptTemplate)}
                      </p>
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
              className='w-full p-2 h-10 bg-red-500 text-white text-center rounded mt-2 hover:bg-red-800'
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
