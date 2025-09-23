import { useDraggable } from "@dnd-kit/core";

const ApplicantCard = ({ name, id}) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useDraggable({ id }); 

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
  };

  const initials = name
    ? name.split(" ").map((n) => n[0]).join("").toUpperCase()
    : "?";

    return (
          <div
      ref={setNodeRef}
      tabIndex={0}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-3 rounded-lg border shadow-sm flex items-center gap-3 hover:shadow-md transition cursor-move"
    >
      <div className="bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
        {initials}
      </div>
      <div className="text-sm font-medium text-gray-800">{name}</div>
    </div>
  );
};

export default ApplicantCard