import { FC, ReactNode } from "react";
import { Droppable } from "react-beautiful-dnd";

interface KanbanColumnProps {
  id: string;
  title: string;
  count: number;
  color: string;
  children: ReactNode;
}

export const KanbanColumn: FC<KanbanColumnProps> = ({
  id,
  title,
  count,
  color,
  children,
}) => {
  return (
    <div className="w-64 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold" style={{ color }}>
          {title}
        </h2>
        <span className="text-sm text-gray-500">{count}</span>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            className="flex flex-col space-y-4"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {children}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
