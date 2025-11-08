import { useState, useEffect, useMemo } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { motion } from "framer-motion";

// Utils imports
import {
  calculateEndTime,
  filterClasses,
  exportSchedule,
  importSchedule,
  validateClassData,
  getClassStatistics,
  getBarChartData,
  getPieChartData,
  getInstructorChartData,
  getUniqueInstructors,
  getSampleData,
  getDefaultClassData,
  processRecurringClasses,
  getLineChartData,
  getLineChartOptions,
  getCalendarEvents,
} from "../../utils/scheduleUtils";


// Component imports
import Loading from "../../components/Loading";
import ScheduleFilters from "../../components/filters/ScheduleFilters";
import BarChart from "../../components/charts/BarChart";
import ClassTypeChart from "../../components/charts/ClassTypeChart";
import WeeklyTrendChart from "../../components/charts/WeeklyTrendChart";
import InstructorDistributionChart from "../../components/charts/InstructorDistributionChart";
import ClassForm from "../../components/schedule/ClassForm";
import Sidebar from "../../components/schedule/Sidebar";
import EmptyState from "../../components/schedule/EmptyState";
import ScheduleGrid from "../../components/schedule/ScheduleGrid";
import ListView from "../../components/schedule/ListView";
import FloatingActionButton from "../../components/schedule/FloatingActionButton";
import "react-big-calendar/lib/css/react-big-calendar.css";

// ChartJS registers
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale,
} from "chart.js";
import { showNotification } from "../../utils/notification";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  RadialLinearScale
);

// Moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

export default function Schedule() {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState(getDefaultClassData());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [activeDay, setActiveDay] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );
  const [filters, setFilters] = useState({
    type: "All",
    instructor: "All",
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  const days = [
    "All",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const colorOptions = [
    { name: "Purple", value: "#6A67CE" },
    { name: "Coral", value: "#FF7C7C" },
    { name: "Teal", value: "#4ECDC4" },
    { name: "Gold", value: "#FFD166" },
    { name: "Steel Blue", value: "#4682B4" },
    { name: "Pale Green", value: "#98FB98" },
  ];
  const classTypes = [
    "Lecture",
    "Lab",
    "Tutorial",
    "Seminar",
    "Workshop",
    "Exam",
  ];

  // Load from local storage
  useEffect(() => {
    const savedClasses = localStorage.getItem("classes");
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("classes", JSON.stringify(classes));
  }, [classes]);

  // Sample data
  useEffect(() => {
    if (classes.length === 0) {
      setClasses(getSampleData());
    }
  }, [classes.length]);

  // Real-time clock
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "recurring") {
      setNewClass({ ...newClass, recurring: checked });
    } else if (name === "recurringDays") {
      const options = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setNewClass({ ...newClass, recurringDays: options });
    } else {
      setNewClass({ ...newClass, [name]: value });
    }
  };

  const addClass = async (e) => {
    e.preventDefault();

    const validationErrors = validateClassData(newClass);
    if (validationErrors.length > 0) {
      showNotification(validationErrors[0], "error");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    const newClasses = processRecurringClasses(newClass, isEditing);

    if (isEditing) {
      setClasses(
        classes.map((cls) =>
          cls.id === editId ? { ...newClass, id: editId } : cls
        )
      );
      showNotification("Class updated successfully!");
    } else {
      setClasses([...classes, ...newClasses]);
      showNotification("Class(es) added successfully!");
    }

    setNewClass(getDefaultClassData());
    setIsEditing(false);
    setEditId(null);
    setIsLoading(false);
    setIsFormOpen(false);
  };

  const editClass = (cls) => {
    setNewClass(cls);
    setIsEditing(true);
    setEditId(cls.id);
    setIsFormOpen(true);
  };

  const deleteClass = (id) => {
    setClasses(classes.filter((cls) => cls.id !== id));
    showNotification("Class deleted successfully!");
  };

  const cancelEdit = () => {
    setNewClass(getDefaultClassData());
    setIsEditing(false);
    setEditId(null);
    setIsFormOpen(false);
  };

  // Drag and drop for list view
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedClasses = Array.from(filteredClasses);
    const [movedClass] = reorderedClasses.splice(result.source.index, 1);
    reorderedClasses.splice(result.destination.index, 0, movedClass);
    const newClasses = classes.map(
      (cls) => reorderedClasses.find((rCls) => rCls.id === cls.id) || cls
    );
    setClasses(newClasses);
  };

  // Filtered classes with memo
  const filteredClasses = useMemo(() => {
    return filterClasses(classes, {
      activeDay,
      type: filters.type,
      instructor: filters.instructor,
      searchTerm,
    });
  }, [classes, activeDay, searchTerm, filters]);

  // Chart data preparation
  const statistics = useMemo(
    () => getClassStatistics(classes, days, classTypes),
    [classes, days, classTypes]
  );

  const barData = useMemo(
    () => getBarChartData(statistics.classCountByDay),
    [statistics.classCountByDay]
  );
  const pieData = useMemo(
    () => getPieChartData(statistics.typeCounts),
    [statistics.typeCounts]
  );
  const instructorData = useMemo(
    () => getInstructorChartData(statistics.instructorCount),
    [statistics.instructorCount]
  );

  // Line chart data (static for now)
  const lineData = useMemo(() => getLineChartData(), []);
  const lineOptions = useMemo(() => getLineChartOptions(), []);

  // Unique instructors for filter
  const uniqueInstructors = useMemo(
    () => getUniqueInstructors(classes),
    [classes]
  );

  // Calendar events - FIXED
  const events = useMemo(
    () => getCalendarEvents(filteredClasses),
    [filteredClasses]
  );

  // Export schedule
  const handleExportSchedule = () => {
    exportSchedule(classes);
    showNotification("Schedule exported successfully!");
  };

  // Import schedule
  const handleImportSchedule = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    importSchedule(
      file,
      (importedClasses) => {
        setClasses(importedClasses);
        showNotification("Schedule imported successfully!");
      },
      (errorMessage) => {
        showNotification(errorMessage, "error");
      }
    );
  };

  // Calendar event style
  const eventStyleGetter = (event) => {
    const backgroundColor = event.resource?.color || "#6A67CE";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <div>
      {/* Loading Spinner */}
      {isLoading && <Loading />}

      <div className="py-4 px-4 sm:px-6 lg:px-8 min-h-screen bg-gray-50 text-gray-900">
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Header */}
            <div className="text-start">
              <h1 className="text-3xl font-bold mb-2">
                Class Schedule Tracker
              </h1>
              <p className="text-gray-600 text-sm">
                Never miss a class again! Keep track of your weekly schedule
                with color-coded subjects.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Current Time: {currentTime}
              </p>
            </div>

            {/* Export/Import */}
            <div className="flex gap-4">
              <button
                onClick={handleExportSchedule}
                className="px-6 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 transition-all shadow-sm"
              >
                Export Schedule
              </button>
              <label className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all shadow-sm cursor-pointer">
                Import Schedule
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportSchedule}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Schedule Display */}
            <div className="w-full xl:w-3/5 space-y-6">
              {/* Controls */}
              <div className="bg-white rounded-sm p-6 flex flex-wrap items-center justify-between gap-4 border border-gray-200">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">View:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === "grid"
                        ? "bg-teal-100 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === "list"
                        ? "bg-teal-100 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    List
                  </button>
                  <button
                    onClick={() => setViewMode("calendar")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      viewMode === "calendar"
                        ? "bg-teal-100 text-teal-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Calendar
                  </button>
                </div>

                <ScheduleFilters
                  days={days}
                  activeDay={activeDay}
                  setActiveDay={setActiveDay}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  filters={filters}
                  setFilters={setFilters}
                  uniqueInstructors={uniqueInstructors}
                  classTypes={classTypes}
                />
              </div>

              {/* Schedule Display */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200"
              >
                <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Weekly Schedule</h2>
                  <span className="text-sm bg-teal-100 text-teal-700 px-3 py-1 rounded-full">
                    {filteredClasses.length} classes
                  </span>
                </div>

                {filteredClasses.length === 0 ? (
                  <EmptyState />
                ) : viewMode === "calendar" ? (
                  <div className="p-6">
                    <Calendar
                      localizer={localizer}
                      events={events}
                      startAccessor="start"
                      endAccessor="end"
                      style={{ height: 600 }}
                      onSelectEvent={(event) => editClass(event.resource)}
                      eventPropGetter={eventStyleGetter}
                      views={["month", "week", "day"]}
                      defaultView="week"
                      step={60}
                      showMultiDayTimes
                    />
                  </div>
                ) : viewMode === "grid" ? (
                  <ScheduleGrid
                    classes={filteredClasses}
                    onEdit={editClass}
                    onDelete={deleteClass}
                    calculateEndTime={calculateEndTime}
                  />
                ) : (
                  <ListView
                    classes={filteredClasses}
                    onEdit={editClass}
                    onDelete={deleteClass}
                    calculateEndTime={calculateEndTime}
                    onDragEnd={onDragEnd}
                  />
                )}
              </motion.div>
            </div>

            {/* Charts Section */}
            <div className="w-full xl:w-2/5 space-y-6 hidden xl:block">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <BarChart barData={barData} />
                <ClassTypeChart pieData={pieData} />
                <WeeklyTrendChart
                  lineData={lineData}
                  lineOptions={lineOptions}
                />
                <InstructorDistributionChart instructorData={instructorData} />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <FloatingActionButton onClick={() => setIsFormOpen(true)} />

        {/* Sidebar Form */}
        <Sidebar isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
          <ClassForm
            newClass={newClass}
            handleChange={handleChange}
            addClass={addClass}
            isEditing={isEditing}
            cancelEdit={cancelEdit}
            days={days}
            colorOptions={colorOptions}
            classTypes={classTypes}
          />
        </Sidebar>
      </div>
    </div>
  );
}
