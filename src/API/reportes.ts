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

export const getRutinasUsuarios = async () => {
  const response = await API.get("/rutinas-usuario");
  return response.data;
};

export const getRutinasUsuariosByDate = async (
  startDate: string,
  endDate: string
) => {
  const params = {
    fecha_inicio: startDate,
    fecha_fin: endDate,
  };
  const response = await API.get("/rutinas-usuario/rutinaByDate", { params });
  return response.data;
};

export const getRutinaById = async (id: number) => {
  const response = await API.get(`/rutinas-usuario/rutinaById/${id}`);
  return response.data;
};

export const getRutinaBySatisfaccion = async (
  id: number,
  satisfaccion: number
) => {
  const params = {
    satisfaccion: satisfaccion,
  };
  const response = await API.get(`/rutinas-usuario/rutinaBySatisfaccion/${id}`, {params});
  return response.data;
};
