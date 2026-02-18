import {
    baseBlockPaddingType1,
    baseControlButtonLayout,
} from '../../utils/tailwindTemplates'
import {
    useExecutionStore,
    useExercisesStore,
    useScoreStore,
    useUIStore,
} from '../../utils/zustand'
import { EXERCISES_NAMES } from '../../utils/config'
import { useNavigate } from 'react-router'

type ExerciseControlType = {
    currentExercise: keyof EXERCISES_NAMES
    getForearmLengthPoseDetection?: () => Promise<void>
}

const ExerciseControl = ({
    currentExercise,
    getForearmLengthPoseDetection,
}: ExerciseControlType) => {
    const navigate = useNavigate()

    const { scores, removeAllScores } = useScoreStore()
    const { exercisesProgressList, completeAndDisableActiveExercise } =
        useExercisesStore()
    const { resetExternalTimersAction, startExternalTimersAction } =
        useExecutionStore()
    const { toggleModalExecutionSettings } = useUIStore()

    const allExercisesCompleted = Object.values(exercisesProgressList).every(
        (value) => {
            return value.completed === true
        }
    )

    const {
        executionSettings: { qtdSeries },
    } = useExecutionStore()

    return (
        <div
            className={`h-auto ${baseBlockPaddingType1} flex items-center justify-between`}>
            <div className="flex gap-4 ml-auto">
                {currentExercise === EXERCISES_NAMES.LEFT_SHOULDER_ROTATION ||
                currentExercise === EXERCISES_NAMES.RIGHT_SHOULDER_ROTATION ||
                currentExercise ===
                    EXERCISES_NAMES.LEFT_SHOULDER_EXTERNAL_ROTATION ||
                currentExercise ===
                    EXERCISES_NAMES.RIGHT_SHOULDER_EXTERNAL_ROTATION ? (
                    <button
                        onClick={async () =>
                            await getForearmLengthPoseDetection?.()
                        }
                        className={`${baseControlButtonLayout} text-sm text-[#555B58] bg-[#DBE8E3]`}>
                        Capturar comprimento do antebraço
                    </button>
                ) : null}
                <button
                    className={`${baseControlButtonLayout} text-[#555B58] bg-[#DBE8E3]`}
                    disabled={scores.length < 1}
                    onClick={() => {
                        removeAllScores()
                        resetExternalTimersAction()
                    }}>
                    Reiniciar
                </button>
                <button
                    className={`${baseControlButtonLayout} text-white bg-[#3AB45C]`}
                    disabled={scores.length < qtdSeries}
                    onClick={() => {
                        resetExternalTimersAction()

                        if (allExercisesCompleted) {
                            navigate('/')
                            toggleModalExecutionSettings()

                            return
                        }

                        startExternalTimersAction()
                        removeAllScores()
                        completeAndDisableActiveExercise(
                            currentExercise,
                            scores
                        )
                    }}>
                    {allExercisesCompleted ? 'Finalizar' : 'Continuar'}
                </button>
            </div>
        </div>
    )
}

export default ExerciseControl
