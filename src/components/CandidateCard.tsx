import { FC } from "react";
import { Draggable } from "react-beautiful-dnd";

interface CandidateCardProps {
  id: string;
  name: string;
  profileUrl: string;
  rating: number;
  avatarUrl: string;
  index: number;
}

export const CandidateCard: FC<CandidateCardProps> = ({
  id,
  name,
  profileUrl,
  rating,
  avatarUrl,
  index,
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center space-y-2"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full" />
          <div className="text-center">
            <p className="text-sm font-medium">{name}</p>
            <a href={profileUrl} className="text-blue-500 text-sm">
              VER PERFIL
            </a>
          </div>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs font-semibold">
            {rating}
          </span>
        </div>
      )}
    </Draggable>
  );
};
