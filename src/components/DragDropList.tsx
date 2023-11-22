import { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { MediaContext } from "../contexts/MediaContext";
import { HtmlBlock } from "../contexts/MediaContext";

const DragDropList = () => {
  const { htmlArray, setHtmlArray } = useContext(MediaContext);

  const [renderedItems, setRenderedItems] = useState<HtmlBlock[]>([]);

  useEffect(() => {
    // Update renderedItems whenever htmlArray changes
    setRenderedItems(htmlArray.slice(1, -1));
  }, [htmlArray]);

  const onDragEnd = (result) => {
    console.log(result);
    if (!result.destination) {
      return;
    }
    const reorderedItems = Array.from(htmlArray.slice(1, -1));
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);
    // Add the first and last items back to htmlArray
    const firstItem = htmlArray[0];
    const lastItem = htmlArray[htmlArray.length - 1];
    const updatedHtmlArray = [firstItem, ...reorderedItems, lastItem];

    setRenderedItems([...reorderedItems]);
    setHtmlArray(updatedHtmlArray);
    console.log("reorderedItems", reorderedItems);
    console.log("updatedHtmlArray", updatedHtmlArray);
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
    </DragDropContext>
  );
};
export default DragDropList;
