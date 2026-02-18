import { create } from 'zustand'
import type { Score } from '../config'

interface ScoresState {
    scores: Score[]
    addScore: (score: Score) => void
    updateActiveScore: (score: Score) => void
    removeAllScores: () => void
    resetActiveScore: () => void
}

export const useScoreStore = create<ScoresState>((set) => ({
    scores: [],
    addScore: (score) =>
        set((state) => {
            const scores = state.scores.map((score) => ({
                ...score,
                active: false,
            }))
            return { scores: [...scores, { ...score }] }
        }),
    updateActiveScore: (data) =>
        set((state) => {
            let scores = state.scores.map((score) => {
                if (score.active === true) {
                    return { ...score, ...data }
                }
                return { ...score }
            })

            const highestScoreIndex = scores.reduce(
                (maxIndex, currentItem, currentIndex, arr) => {
                    return currentItem.score! > arr[maxIndex].score!
                        ? currentIndex
                        : maxIndex
                },
                0
            )

            scores = scores.map((score, index) => {
                if (score.highest === true && index !== highestScoreIndex) {
                    return { ...score, highest: false }
                }
                if (index === highestScoreIndex) {
                    return { ...score, highest: true }
                }
                return { ...score }
            })

            return { scores: [...scores] }
        }),
    resetActiveScore: () =>
        set((state) => {
            const scores = state.scores.map((score) => {
                if (score.active === true) {
                    return { ...score, score: 10 }
                }
                return { ...score }
            })

            return { scores: [...scores] }
        }),
    removeAllScores: () => set(() => ({ scores: [] })),
}))
