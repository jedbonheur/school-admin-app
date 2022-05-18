 export const AssignmentList = (courses) => {
   if(!courses){
     return
   }
   let newAssignment = []  
    courses.map(course => {
      return course.assignments.map(assignment => {
            return newAssignment.push({...assignment,...course})
      })
    })
  
  return newAssignment
 }
 export const getRouteByRole = (role) => {
   return role === 'student' ? '/getStudent/' : role === 'teacher' ? '/getTeacher/' : role === 'admin' ? '/getAdmin/' : ''
  }
  
  export const getAnouncementUrl = (role) => {
 return role === 'student' ? '/get-studemt-announcement/' : role === 'teacher' ? '/get-teacher-announcement/' : ''
}

 export const CourseStudentList = (courses) => {
  if(!courses){
     return
   }
   let newStudents = []  
    courses.map(course => {
      return course.students.map(student => {
            return newStudents.push({...student})
      })
    })
  
  return newStudents
 }
 export const ExamList = (courses) => {
  if(!courses){
     return
   }
   let newExams = []  
    courses.map(course => {
      return course.exams.map(exam => {
            return newExams.push({...exam})
      })
    })
  
  return newExams
 }