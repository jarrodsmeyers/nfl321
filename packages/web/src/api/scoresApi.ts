/* eslint-disable import/prefer-default-export */
import getAxiosClient from "./client";

export const getScoresByWeek = (week: string) =>
  getAxiosClient().then((axios) => axios.get(`/scores?week=${week}`));

export const loadSchedule = () =>
  getAxiosClient().then((axios) => axios.post("/actions/load-schedule"));
