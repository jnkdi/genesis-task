const URL_BASE = 'https://api.wisey.app/api/v1';

export async function getCoursesRequest() {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOTRlNjg4NS1kM2U5LTQwY2EtYTVjYy01MDRkNjZlZDVlN2QiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg3MDQ3NjIsImV4cCI6MTY3OTYwNDc2Mn0.Qw3LF39CDp27ZxoGzt5rikJM_OTx0eNaoyFFLxxrXUM';
  
  const request = await fetch(`${URL_BASE}/core/preview-courses`, {headers: {Authorization: `Bearer ${token}`}});
    
    if(!request.ok) {
      console.log('fail get Courses request');
      return;
    }

    const response = await request.json();

    return response.courses;
}

export async function getCourseRequest(courseId) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3Yjg3MWRlNS00NWY5LTRiMWQtOTg5OS04ODc2ZjMxZTMxZDUiLCJwbGF0Zm9ybSI6InN1YnNjcmlwdGlvbnMiLCJpYXQiOjE2Nzg4MDYyOTgsImV4cCI6MTY3OTcwNjI5OH0.G5jsTwrB38g3DAfD1f-gX6NeOyZSjG2Bz9lXEhrVl6U';
  
  const request = await fetch(`${URL_BASE}/core/preview-courses/${courseId}`, {headers: {Authorization: `Bearer ${token}`}});
    
    if(!request.ok) {
      console.log('fail get Course request');
      return;
    }

    const response = await request.json();

    return response;
}