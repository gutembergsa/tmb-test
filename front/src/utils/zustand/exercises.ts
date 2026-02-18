import { create } from 'zustand'
import type { EXERCISE_PROGRESS, EXERCISES_NAMES, Score } from '../config'

interface ExercisesState {
    exercisesProgressList: EXERCISE_PROGRESS
    addExercisesProgress: (exerciseName: keyof EXERCISES_NAMES) => void
    completeAndDisableActiveExercise: (
        exerciseName: keyof EXERCISES_NAMES,
        score: Score[]
    ) => void
}

export const useExercisesStore = create<ExercisesState>((set) => ({
    exercisesProgressList: {},
    addExercisesProgress: (exerciseName) =>
        set((state) => {
            const updatedExercisesProgressList = {
                ...state.exercisesProgressList,
                [exerciseName]: { scores: [], completed: false, active: true },
            }
            return {
                ...state,
                exercisesProgressList: updatedExercisesProgressList,
            }
        }),
    completeAndDisableActiveExercise: (exerciseName, scores) =>
        set((state) => {
            const highsteScore = scores.find((score) => score.highest !== false)

            const highsteScoresList = scores.map((score, index, array) => {
                if (!highsteScore && index === array.length - 1) {
                    return { ...score, highest: true }
                }

                return score
            })

            const updatedExercisesProgressList = {
                ...state.exercisesProgressList,
                [exerciseName]: {
                    scores: highsteScoresList,
                    completed: true,
                    active: false,
                },
            }

            return {
                ...state,
                exercisesProgressList: updatedExercisesProgressList,
            }
        }),
}))
