import ScheduleCard from "./ScheduleCard";


const ScheduleGrid = ({ classes, onEdit, onDelete, calculateEndTime }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {classes.map((cls) => (
        <ScheduleCard
          key={cls._id}
          cls={cls}
          onEdit={onEdit}
          onDelete={onDelete}
          calculateEndTime={calculateEndTime}
        />
      ))}
    </div>
  );
};

export default ScheduleGrid;