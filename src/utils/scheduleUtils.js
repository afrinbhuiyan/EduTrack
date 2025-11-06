import moment from "moment";

// Calculate end time for a class (default duration: 60 minutes)
export const calculateEndTime = (startTime, duration = 60) => {
  if (!startTime) return '';
  
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
};

// Format time for display
export const formatTimeDisplay = (startTime, endTime) => {
  return `${startTime} - ${endTime}`;
};

// Get day name from date
export const getDayName = (date) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[date.getDay()];
};

// Generate unique ID for classes
export const generateClassId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

// Validate class data - MISSING FUNCTION ADDED
export const validateClassData = (classData) => {
  const errors = [];
  
  if (!classData.subject?.trim()) {
    errors.push("Subject is required");
  }
  
  if (!classData.day) {
    errors.push("Day is required");
  }
  
  if (!classData.time) {
    errors.push("Time is required");
  }
  
  return errors;
};

// Prepare calendar events
export const getCalendarEvents = (classes) => {
  return classes.map((cls) => {
    // Get the date for the specific day of the week
    const today = moment();
    const dayOfWeek = moment().day(cls.day).day(); // Get day number (0-6)
    
    // Calculate the date for this week's class day
    const classDate = today.day(dayOfWeek);
    
    // Parse start time
    const [startHours, startMinutes] = cls.time.split(":").map(Number);
    const startMoment = classDate.clone().hour(startHours).minute(startMinutes).second(0);
    
    // Calculate end time
    const endMoment = startMoment.clone().add(60, 'minutes'); // 1 hour duration
    
    return {
      id: cls.id,
      title: `${cls.subject} - ${cls.type}`,
      start: startMoment.toDate(),
      end: endMoment.toDate(),
      resource: cls,
      allDay: false,
    };
  });
};

// Alternative method for calendar events (simpler approach)
export const getCalendarEventsSimple = (classes) => {
  // Use current week dates for demonstration
  const today = moment();
  const startOfWeek = today.startOf('week');
  
  const dayMap = {
    'Sunday': 0,
    'Monday': 1,
    'Tuesday': 2,
    'Wednesday': 3,
    'Thursday': 4,
    'Friday': 5,
    'Saturday': 6
  };

  return classes.map((cls) => {
    const dayIndex = dayMap[cls.day];
    const classDate = startOfWeek.clone().add(dayIndex, 'days');
    
    const [startHours, startMinutes] = cls.time.split(":").map(Number);
    const startMoment = classDate.clone().hour(startHours).minute(startMinutes).second(0);
    const endMoment = startMoment.clone().add(60, 'minutes');
    
    return {
      id: cls.id,
      title: `${cls.subject} - ${cls.type}`,
      start: startMoment.toDate(),
      end: endMoment.toDate(),
      resource: cls,
    };
  });
};

// Filter classes based on criteria
export const filterClasses = (classes, filters) => {
  const { activeDay, type, instructor, searchTerm } = filters;
  
  return classes.filter((cls) => {
    const matchesDay = activeDay === "All" || cls.day === activeDay;
    const matchesType = type === "All" || cls.type === type;
    const matchesInstructor = instructor === "All" || cls.instructor === instructor;
    const matchesSearch = !searchTerm || 
      cls.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cls.instructor && cls.instructor.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesDay && matchesType && matchesInstructor && matchesSearch;
  });
};

// Calculate class statistics
export const getClassStatistics = (classes, days, classTypes) => {
  const totalClasses = classes.length;
  
  // Classes by day
  const classCountByDay = days
    .filter((day) => day !== "All")
    .map((day) => ({
      day,
      count: classes.filter((cls) => cls.day === day).length,
    }));

  // Classes by type
  const typeCounts = classTypes.map((type) => ({
    type,
    count: classes.filter((cls) => cls.type === type).length,
  }));

  // Classes by instructor
  const instructorCount = {};
  classes.forEach((cls) => {
    if (cls.instructor) {
      instructorCount[cls.instructor] = (instructorCount[cls.instructor] || 0) + 1;
    }
  });

  return {
    totalClasses,
    classCountByDay,
    typeCounts,
    instructorCount
  };
};

// Prepare chart data for classes by day
export const getBarChartData = (classCountByDay) => {
  return {
    labels: classCountByDay.map((item) => item.day),
    datasets: [
      {
        label: "Number of Classes",
        data: classCountByDay.map((item) => item.count),
        backgroundColor: "#6A67CE",
      },
    ],
  };
};

// Prepare chart data for class types
export const getPieChartData = (typeCounts) => {
  return {
    labels: typeCounts.map((item) => item.type),
    datasets: [
      {
        data: typeCounts.map((item) => item.count),
        backgroundColor: [
          "#6A67CE",
          "#FF7C7C",
          "#4ECDC4",
          "#FFD166",
          "#4682B4",
          "#98FB98",
        ],
      },
    ],
  };
};

// Prepare chart data for instructor distribution
export const getInstructorChartData = (instructorCount) => {
  return {
    labels: Object.keys(instructorCount),
    datasets: [
      {
        data: Object.values(instructorCount),
        backgroundColor: [
          "#6A67CE",
          "#FF7C7C",
          "#4ECDC4",
          "#FFD166",
          "#4682B4",
          "#98FB98",
        ],
      },
    ],
  };
};

// Export classes data
export const exportSchedule = (classes) => {
  const dataStr = JSON.stringify(classes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `schedule-${new Date().toISOString().split('T')[0]}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// Import classes data
export const importSchedule = (file, onSuccess, onError) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const importedClasses = JSON.parse(event.target.result);
      
      // Basic validation of imported data
      if (Array.isArray(importedClasses) && importedClasses.every(cls => 
        cls.subject && cls.day && cls.time
      )) {
        onSuccess(importedClasses);
      } else {
        onError("Invalid schedule data format");
      }
    } catch (error) {
      onError("Invalid file format");
    }
  };
  reader.onerror = () => onError("Error reading file");
  reader.readAsText(file);
};

// Get unique instructors from classes
export const getUniqueInstructors = (classes) => {
  return [
    "All",
    ...new Set(classes.map((cls) => cls.instructor).filter(Boolean)),
  ];
};

// Initialize sample data
export const getSampleData = () => {
  return [
    {
      id: 1,
      subject: "Mathematics",
      day: "Monday",
      time: "10:00",
      instructor: "Dr. Smith",
      room: "Room 301",
      type: "Lecture",
      color: "#6A67CE",
    },
    {
      id: 2,
      subject: "Physics",
      day: "Tuesday",
      time: "14:00",
      instructor: "Prof. Johnson",
      room: "Lab 205",
      type: "Lab",
      color: "#FF7C7C",
    },
    {
      id: 3,
      subject: "Computer Science",
      day: "Wednesday",
      time: "09:30",
      instructor: "Ms. Davis",
      room: "Computer Lab",
      type: "Practical",
      color: "#4ECDC4",
    },
    {
      id: 4,
      subject: "English Literature",
      day: "Thursday",
      time: "11:00",
      instructor: "Dr. Wilson",
      room: "Room 102",
      type: "Discussion",
      color: "#FFD166",
    },
    {
      id: 5,
      subject: "History",
      day: "Friday",
      time: "13:00",
      instructor: "Mr. Brown",
      room: "Room 215",
      type: "Lecture",
      color: "#6A67CE",
    },
  ];
};

// Get default class form data
export const getDefaultClassData = () => {
  return {
    subject: "",
    day: "Monday",
    time: "09:00",
    instructor: "",
    room: "",
    type: "Lecture",
    color: "#6A67CE",
    recurring: false,
    recurringDays: [],
  };
};

// Process recurring classes
export const processRecurringClasses = (classData, isEditing = false) => {
  let newClasses = [];
  
  if (classData.recurring && classData.recurringDays.length > 0) {
    newClasses = classData.recurringDays.map((day) => ({
      ...classData,
      day,
      id: isEditing ? classData.id : Date.now() + Math.random(),
    }));
  } else {
    newClasses = [{ ...classData, id: isEditing ? classData.id : Date.now() }];
  }
  
  return newClasses;
};

// Line chart data for weekly trend (sample data)
export const getLineChartData = () => {
  return {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Classes per Week",
        data: [12, 19, 8, 15],
        borderColor: "#6A67CE",
        backgroundColor: "rgba(106, 103, 206, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
};

// Line chart options
export const getLineChartOptions = () => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
};