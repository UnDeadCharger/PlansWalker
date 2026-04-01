import type { AppDispatch, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

// Use these typed hooks everywhere instead of plain useDispatch/useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(selector: (state: RootState) => T): T =>
  useSelector<RootState, T>(selector);
