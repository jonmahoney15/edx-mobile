export interface Course {
  id: string;
  course_id: string;
  name: string;
  image: any;
  description: string;
  modules: Array<{
    id: string;
    title: string;
    duration: string;
    videoId: string;
    bodyText: string;
  }>;
}
