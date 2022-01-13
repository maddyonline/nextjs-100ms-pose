import {
    atom,
} from 'recoil';

// Create a global state for holding poses
export const posesState = atom({
    key: 'posesState', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
});
