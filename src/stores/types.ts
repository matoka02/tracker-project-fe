/* eslint-disable @typescript-eslint/no-empty-object-type */

/* ====== User ====== */
export interface IUser extends User {}

/* ====== TASKS ====== */
export interface ITask extends Task {}
export interface INewTask extends Omit<Task, 'id'> {
  id?: never;
}
