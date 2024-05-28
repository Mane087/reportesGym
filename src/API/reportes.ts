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

export const getData = async (periodo: number) => {
  const reponse = await API.get(`/rutinas-usuario/date/${periodo}`);
  return reponse.data;
}

export const getDataByTrainer = async (id: number, periodo: number) => {
  const params = {
    periodo: periodo,
  };
  const response = await API.get(`/rutinas-usuario/entrenador/${id}`, { params });
  return response.data;
}

export const getDataBySucursal = async (id: number, periodo: number) => {
  const params = {
    periodo: periodo,
  };
  const response = await API.get(`/rutinas-usuario/sucursal/${id}`, { params });
  return response.data;
}