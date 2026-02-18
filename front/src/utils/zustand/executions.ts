import { create } from 'zustand'
import type { EXECUTION_PROGRESS, EXECUTION_SETTING } from '../config'

interface ExecutionState {
    resetingExecution: boolean
    executionProgress: EXECUTION_PROGRESS
    executionSettings: EXECUTION_SETTING
    defineExecutionSettings: (settings: EXECUTION_SETTING) => void
    startExecution: () => void
    finishExecution: () => void
    resetExecution: () => void
    startExecutionInterval: () => void
    finishExecutionInterval: () => void

    triggerContinueActionButton: HTMLButtonElement | null
    setContinueActionButton: (button: HTMLButtonElement | null) => void

    setExternalTimersResetAction: (actionCallback: () => unknown) => void
    resetExternalTimersAction: () => void

    setExternalTimerStartsAction: (actionCallback: () => unknown) => void
    startExternalTimersAction: () => void
}

export const useExecutionStore = create<ExecutionState>((set) => ({
    resetingExecution: false,

    executionProgress: {
        started: false,
        done: false,
        interval: false,
        currentSeries: 0,
        currentRepeticoes: 0,
    },
    executionSettings: {
        qtdSeries: 0,
        qtdRepeticoes: 0,
        isAuto: false,
        isAutoTimeLimit: 0,
        isAutoTimeInterval: 0,
    },
    defineExecutionSettings: (settings) =>
        set((state) => {
            return {
                ...state,
                executionSettings: settings,
            }
        }),
    startExecution: () =>
        set((state) => {
            return {
                ...state,
                executionProgress: {
                    ...state.executionProgress,
                    started: true,
                    done: false,
                    interval: false,
                },
            }
        }),
    finishExecution: () =>
        set((state) => {
            return {
                ...state,
                executionProgress: {
                    ...state.executionProgress,
                    interval: false,
                    done: true,
                },
            }
        }),
    resetExecution: () =>
        set((state) => {
            return {
                ...state,
                executionProgress: {
                    ...state.executionProgress,
                    resetingExecution: !state.resetingExecution,
                    started: false,
                    interval: false,
                    done: false,
                },
            }
        }),
    startExecutionInterval: () =>
        set((state) => {
            return {
                ...state,
                executionProgress: {
                    ...state.executionProgress,
                    interval: true,
                },
            }
        }),
    finishExecutionInterval: () =>
        set((state) => {
            return {
                ...state,
                executionProgress: {
                    ...state.executionProgress,
                    interval: false,
                },
            }
        }),
    triggerContinueActionButton: null,
    setContinueActionButton: (button) =>
        set((state) => {
            return {
                ...state,
                triggerContinueActionButton: button,
            }
        }),
    setExternalTimersResetAction: (callback) =>
        set((state) => {
            return {
                ...state,
                resetExternalTimersAction: callback,
            }
        }),
    resetExternalTimersAction: () => {},

    setExternalTimerStartsAction: (callback) =>
        set((state) => {
            return {
                ...state,
                startExternalTimersAction: callback,
            }
        }),
    startExternalTimersAction: () => {},
}))
