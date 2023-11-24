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
      <div className='flex flex-col m-2 py-4 justify-end w-48 font-robot'>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div className='pt-2 rounded-md flex flex-col' {...provided.droppableProps} ref={provided.innerRef}>
              <p className='text-ai-primary text-center text-underline'>Layout</p>
              {renderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`w-full p-2 mt-4 rounded cursor-pointer ${
                        snapshot.isDragging
                          ? "bg-ai-primary"
                          : lastHtmlBlockId === item.id
                          ? "bg-ai-primary"
                          : "toolbar-btn"
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
              className='group flex flex-col w-full h-14 p-2 bg-ai-tertiary text-center rounded mt-4 justify-center items-center'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              <div className='group-hover:opacity-0'>Drag here to Remove</div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default DragDropList;
