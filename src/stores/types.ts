/* eslint-disable @typescript-eslint/no-empty-object-type */

/* ====== TASKS ====== */
export interface ITask extends Task {}
export interface INewTask extends Omit<Task, 'id'> {
  id?: never;
}
