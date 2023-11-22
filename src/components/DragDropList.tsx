import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { MediaContext } from "../contexts/MediaContext";
import { HtmlBlock } from "../contexts/MediaContext";

const DragDropList = () => {
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

    const reorderedItems = Array.from(htmlArray.slice(1, -1));
    const [movedItem] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, movedItem);

    // Add the first and last items back to htmlArray
    const firstItem = htmlArray[0];
    const lastItem = htmlArray[htmlArray.length - 1];
    const updatedHtmlArray = [firstItem, ...reorderedItems, lastItem];

    setRenderedItems([...reorderedItems]);
    setHtmlArray(updatedHtmlArray);
    console.log("updatedHtmlArray", updatedHtmlArray);

    if (destination && destination.droppableId === "removeArea") {
      // The item was dragged into the remove area, remove it from the list
      console.log("indexToRemove", indexToRemove);
      console.log("renderedItems", renderedItems);

      const updatedItems = renderedItems.slice(); // Create a copy
      updatedItems.splice(indexToRemove, 1);

      // Update the IDs to be consecutive
      const updatedItemsWithConsecutiveIds = updatedItems.map((item, index) => ({
        ...item,
        id: index + 1,
      }));

      setRenderedItems(updatedItemsWithConsecutiveIds);

      // Update the htmlArray without the removed item
      const updatedHtmlArray = [htmlArray[0], ...updatedItemsWithConsecutiveIds, htmlArray[htmlArray.length - 1]];
      console.log("updatedHtmlArray", updatedHtmlArray);
      setHtmlArray(updatedHtmlArray);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <div className='bg-gray-500 text-white p-2 m-2' {...provided.droppableProps} ref={provided.innerRef}>
            {renderedItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                {(provided) => (
                  <div
                    className='p-2 bg-green-500 m-2'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {/* Render your object properties here */}
                    <p>{item.name}</p>
                    {/* Add more properties as needed */}
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
          <div className='w-64 h-64 bg-red-500 text-white p-2 m-2' {...provided.droppableProps} ref={provided.innerRef}>
            Remove Area
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default DragDropList;
