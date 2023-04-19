export interface Course {
  id: string;
  title: string;
  image: any;
  description: string;
  modules: Array<{
    id: string;
    title: string;
    duration: string;
    videoId: string;
    bodyText: string;
    submodules: Array<{
      id: string;
      title: string;
      duration: string;
      videoId: string;
      bodyText: string;
      moduleId: string;
    }>;
  }>;
}
