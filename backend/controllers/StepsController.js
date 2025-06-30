import { getAllSteps, createStepWithConnection, deleteStepFromDB } from '../models/stepModel.js';

export const getSteps = async (recipeId) => {
    return await getAllSteps(recipeId);
};

export const addNewStep = async (conn, recipeId, data) => {
    return await createStepWithConnection(conn, recipeId, data);
}

export const deleteStep = async (conn, id) => {
    return await deleteStepFromDB(conn, id);
}

export default {
  getSteps,
  addNewStep,
  deleteStep,
};