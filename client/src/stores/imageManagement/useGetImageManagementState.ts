import { useImageManagementStore } from './imageManagementStore'; // @type {Function} - Zustand 스토어
import { ImageManagementState } from './initialImageManagementState';

export const useGetImageManagementState = <T>(
  selector: (state: ImageManagementState) => T
): T => {
  const state = useImageManagementStore(selector);

  return state;
};
