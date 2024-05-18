import { API } from "./API";

export const userProgressReport = async (
  id: number,
  startDate: string,
  endDate: string
) => {
  const params = {
    startDate: startDate,
    endDate: endDate,
  };

  const response = await API.get(`/progreso-usuarios/${id}`, { params });
  return response.data;
};
