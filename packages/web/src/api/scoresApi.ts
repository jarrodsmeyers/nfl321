/* eslint-disable import/prefer-default-export */
import request from "./client";

export const getScoresByWeek = (token: string, week: string) => {
  return request.get(`/scores?week=${week}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
