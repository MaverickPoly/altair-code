import { api } from "./axios.ts";

export const completeLesson = async (lessonId: number) => {
  try {
    const res = await api.post(`learning/lessons/${lessonId}/complete/`);
    return {
      success: true,
      message: "Completed lesson successfully!",
      data: res.data,
    };
  } catch (e: any) {
    return {
      success: false,
      message: e?.response?.data?.detail || "Failed to complete lesson",
    };
  }
};
