import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import ClassListItem from "./ScheduleList";

const ListView = ({ classes, onEdit, onDelete, calculateEndTime, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="classes">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="divide-y divide-gray-200"
          >
            {classes.map((cls, index) => (
              <Draggable
                key={cls.id}
                draggableId={cls.id.toString()}
                index={index}
              >
                {(provided) => (
                  <ClassListItem
                    cls={cls}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    calculateEndTime={calculateEndTime}
                    provided={provided}
                  />
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

export default ListView;