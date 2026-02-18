/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import {
    useExecutionStore,
    useExercisesStore,
    useScoreStore,
} from '../../utils/zustand'
import type { EXERCISES_NAMES } from '../../utils/config'

const ExerciseIntervalTake = ({
    timeLimit = 2,
    intervalLimit = 1,
    series = 10,
    currentExercise,
}: {
    timeLimit?: number
    intervalLimit?: number
    series?: number
    currentExercise?: keyof EXERCISES_NAMES
}) => {
    const [tick, setTick] = useState(0)
    const [currentSeries, setCurrentSeries] = useState(1)
    const [intervalID, setIntervalID] = useState<NodeJS.Timeout>()

    const [startupCountDown, setStartupCountDown] = useState(5)
    const [executionCountDown, setExecutionCountDown] = useState(timeLimit)
    const [intervalCountDown, setIntervalCountDown] = useState(intervalLimit)

    const { completeAndDisableActiveExercise } = useExercisesStore()
    const { scores } = useScoreStore()

    const {
        executionProgress,
        triggerContinueActionButton,
        startExecution,
        finishExecution,
        startExecutionInterval,
        finishExecutionInterval,
        resetExecution,
        setExternalTimersResetAction,
        setExternalTimerStartsAction,
    } = useExecutionStore()

    const started =
        executionProgress.started && !executionProgress.interval ? true : false
    const interval =
        executionProgress.started && executionProgress.interval ? true : false

    const startTimer = () => {
        const id = setInterval(() => {
            if (executionProgress.done === true) {
                clearInterval(id)
            }
            setTick((t) => t + 1)
        }, 1000)
        setIntervalID(id)
        return id
    }

    const resetTimer = () => {
        clearInterval(intervalID)

        setExecutionCountDown(timeLimit)
        setIntervalCountDown(intervalLimit)
        setStartupCountDown(5)
        setCurrentSeries(1)
        resetExecution()
    }

    useEffect(() => {
        const id = startTimer()
        setExternalTimersResetAction(resetTimer)
        setExternalTimerStartsAction(startTimer)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        // 1) STARTUP
        if (!executionProgress.started) {
            if (startupCountDown > 0) {
                setStartupCountDown((v) => v - 1)
                return
            }

            // Acabou startup → começa execução
            triggerContinueActionButton?.click()

            startExecution()
            return
        }

        // 2) EXECUÇÃO ATIVA
        if (executionProgress.started && !executionProgress.interval) {
            if (executionCountDown > 0) {
                setExecutionCountDown((v) => v - 1)
                return
            }

            // acabou execução
            startExecutionInterval()
            return
        }

        // 3) INTERVALO ATIVO
        if (executionProgress.started && executionProgress.interval) {
            if (intervalCountDown > 0) {
                setIntervalCountDown((v) => v - 1)
                return
            }

            // acabou intervalo → próxima série
            if (currentSeries < series) {
                setCurrentSeries((s) => s + 1)
                setExecutionCountDown(timeLimit)
                setIntervalCountDown(intervalLimit)
                finishExecutionInterval() // volta para execução
                triggerContinueActionButton?.click()
                return
            }

            if (currentSeries >= series) {
                setExecutionCountDown(timeLimit)
                setIntervalCountDown(intervalLimit)
                setCurrentSeries(1)
                finishExecution()
                completeAndDisableActiveExercise(
                    currentExercise as keyof EXERCISES_NAMES,
                    scores
                )
                return clearInterval(intervalID)
            }
        }

        return () => clearInterval(intervalID)
    }, [tick, executionProgress.done === false])

    return (
        <div className="w-full h-full flex justify-center">
            <div
                className={`w-[15px] h-[15px] absolute top-10 right-10 rounded-full ${
                    executionProgress.done
                        ? 'bg-red-300'
                        : interval
                        ? 'bg-yellow-100'
                        : started
                        ? 'bg-green-300'
                        : 'bg-red-300'
                } `}></div>

            <div className="relative top-[30px]">
                {executionProgress.done ? (
                    <p>
                        Encerramos clique em{' '}
                        {executionProgress.done === true
                            ? 'finalizar'
                            : 'continuar'}
                        !
                    </p>
                ) : interval ? (
                    <p> Intervalo termina em: {intervalCountDown} segundos</p>
                ) : started ? (
                    <p> Faça o movimento em: {executionCountDown} segundos</p>
                ) : (
                    <p>Iniciando em: {startupCountDown} segundos</p>
                )}
            </div>
        </div>
    )
}

export default ExerciseIntervalTake
