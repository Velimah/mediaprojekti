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
    //checks if the item was dropped outside the list/remove area
    if (destination === undefined || destination === null) return null;
    if (source.droppableId === destination.droppableId && destination.index === source.index) return null;
    // the index of the item being moved
    const indexToRemove = source.index;

    // removes first and last objects from htmlArray
    const reorderedItems = Array.from(htmlArray.slice(1, -1));
    //saves to moved item
    const [movedItem] = reorderedItems.splice(source.index, 1);
    // puts moved item into new position
    reorderedItems.splice(destination.index, 0, movedItem);
    // renders the list with new order
    setRenderedItems(reorderedItems);

    // Add the first and last items back to htmlArray
    const firstItem = htmlArray[0];
    const lastItem = htmlArray[htmlArray.length - 1];
    const newHtmlArray = [firstItem, ...reorderedItems, lastItem];
    // saves array history
    setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
    // updates complete htmlArray
    setHtmlArray(newHtmlArray);

    //check if item is moved into remove area
    if (destination && destination.droppableId === "removeArea") {
      // removes active html block
      setLastHtmlBlockId(null);

      // creates a new array without the removed item and renders it
      const updatedItems = renderedItems.slice();
      updatedItems.splice(indexToRemove, 1);
      setRenderedItems(updatedItems);

      // Update the htmlArray without the removed item
      const updatedHtmlArray = [htmlArray[0], ...updatedItems, htmlArray[htmlArray.length - 1]];
      setPastHtmlArrays([...pastHtmlArrays, htmlArray]);
      setHtmlArray(updatedHtmlArray);
    }
  };

  // toggles active html block and changs form names when clicked
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
      <div className='flex flex-col m-2 justify-end w-48 font-robot 2xl:absolute right-4 top-[500px] p-2 rounded-md'>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <div className='pt-1 rounded-md flex flex-col' {...provided.droppableProps} ref={provided.innerRef}>
              <p className='text-ai-primary text-center text-underline'>Layout</p>
              {renderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className={`w-full p-2 mt-2 rounded cursor-pointer ${
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
                      <p className='flex text-center '>
                        <span className='flex justify-center gap-2'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 24 24'
                            fill='currentColor'
                            className='w-6 h-6'
                          >
                            <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                            <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                            <g id='SVGRepo_iconCarrier'>
                              {" "}
                              <path
                                d='M5 10H19M14 19L12 21L10 19M14 5L12 3L10 5M5 14H19'
                                stroke='#000000'
                                stroke-width='2'
                                stroke-linecap='round'
                                stroke-linejoin='round'
                              ></path>{" "}
                            </g>
                          </svg>
                          {getSectionDetails(item.name as PromptTemplate)}
                        </span>
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
              className='group flex flex-col w-full h-12 p-2 mt-4 bg-ai-tertiary text-center rounded justify-center items-center'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {provided.placeholder}
              <div className=''>
                <span className='flex justify-center gap-2'>
                  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' className='w-6 h-6'>
                    <g id='SVGRepo_bgCarrier' stroke-width='0'></g>
                    <g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                      {" "}
                      <g id='Interface / Trash_Full'>
                        {" "}
                        <path
                          id='Vector'
                          d='M14 10V17M10 10V17M6 6V17.8C6 18.9201 6 19.4798 6.21799 19.9076C6.40973 20.2839 6.71547 20.5905 7.0918 20.7822C7.5192 21 8.07899 21 9.19691 21H14.8031C15.921 21 16.48 21 16.9074 20.7822C17.2837 20.5905 17.5905 20.2839 17.7822 19.9076C18 19.4802 18 18.921 18 17.8031V6M6 6H8M6 6H4M8 6H16M8 6C8 5.06812 8 4.60241 8.15224 4.23486C8.35523 3.74481 8.74432 3.35523 9.23438 3.15224C9.60192 3 10.0681 3 11 3H13C13.9319 3 14.3978 3 14.7654 3.15224C15.2554 3.35523 15.6447 3.74481 15.8477 4.23486C15.9999 4.6024 16 5.06812 16 6M16 6H18M18 6H20'
                          stroke='#000000'
                          stroke-width='2'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                        ></path>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                  Delete
                </span>
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
export default DragDropList;
