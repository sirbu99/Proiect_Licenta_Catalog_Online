const express = require('express');
const router = express.Router({ mergeParams: true });
const authMiddleware = require('../middleware/auth')

const facultiesController = require('../controllers/faculties');
const studentsController = require('../controllers/students');
const teachersController = require('../controllers/teachers');
const scheduleController = require('../controllers/schedule');
const subjectsController = require('../controllers/subjects');
const announcementsController = require('../controllers/announcements');
const gradesController = require('../controllers/grades');


router.get('/', facultiesController.getAllFaculties);

router.get("/:facultyId", facultiesController.getFacultyById);
router.post("/", facultiesController.postFaculty);
router.put("/:facultyId", facultiesController.putFaculty);
router.delete("/:id", facultiesController.deleteFaculty);


router.get("/:facultyId/students", studentsController.getStudents);

router.get("/:facultyId/students/list", studentsController.getStudentsList);


router.get("/:facultyId/teachers", teachersController.getTeachers);
router.get("/:facultyId/teachers-list", teachersController.getTeachersList);

router.use(authMiddleware.checkAuth);
router.get("/:facultyId/grades", gradesController.getGradesByTeacher);
router.post("/:facultyId/grades/:subjectId/edit", gradesController.editGradeForStudent);
router.get("/:facultyId/schedule", scheduleController.getSchedule);
router.get("/:facultyId/schedule/groups", scheduleController.getGroupsFromSchedule);
router.get("/:facultyId/schedule/subjects", subjectsController.getSubjects);
router.get("/:facultyId/schedule/years", scheduleController.getYearsFromSchedule);
router.get("/:facultyId/schedule/half-years", scheduleController.getHalfYearsFromSchedule);

router.get("/:facultyId/groups", facultiesController.getGroupsFromFaculty);


router.post("/:facultyId/schedule", scheduleController.addScheduleEntry);
router.delete("/:facultyId/schedule", scheduleController.deleteAllFromSchedule);



router.get("/:facultyId/announcements", announcementsController.getAnnouncements);
router.get("/:facultyId/announcements/:announcementId", announcementsController.getAnnouncementById);
router.post("/:facultyId/announcements", announcementsController.addAnnouncement);



router.get("/:facultyId/subjects", subjectsController.getSubjectsList);
router.get("/:facultyId/subjects-list/:userId", subjectsController.getSubjectsByTeacher);


router.get("/:facultyId/grades", gradesController.getGrades);

module.exports = router;