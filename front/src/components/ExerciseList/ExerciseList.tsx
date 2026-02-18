import {
    baseBolderFontForTitle,
    baseControlButtonLayout,
} from '../../utils/tailwindTemplates'
import { useExercisesStore, useUIStore } from '../../utils/zustand'
import { EXERCISES_NAMES, type ListItemType } from '../../utils/config'

const ExerciseList = ({
    exerciseList = [],
}: {
    exerciseList: ListItemType[]
}) => {
    const { exercisesProgressList } = useExercisesStore()

    return (
        <ul className="pl-5 flex flex-col gap-8">
            {exerciseList.map((exercise, index) => {
                const exerciseProgressScoreList = exercise.exerciseNames
                    .map((exerciseName) => ({
                        ...exercisesProgressList[
                            exerciseName as keyof EXERCISES_NAMES
                        ],
                        exerciseName,
                    }))
                    .reduce((acc, currentExerciseProgressScoreList) => {
                        if (
                            currentExerciseProgressScoreList &&
                            currentExerciseProgressScoreList.scores &&
                            currentExerciseProgressScoreList.scores.length
                        ) {
                            const average =
                                currentExerciseProgressScoreList.scores.reduce(
                                    (acc, { score }) => acc + score!,
                                    0
                                ) /
                                currentExerciseProgressScoreList.scores.length

                            acc.push(Math.round(average))
                        }
                        return acc
                    }, [] as number[])

                return (
                    <ListItem
                        key={`${exercise.exerciseNames}-${exercise.exerciseURL}`}
                        index={index + 1}
                        disabled={false}
                        scores={exerciseProgressScoreList}
                        {...exercise}
                    />
                )
            })}
        </ul>
    )
}

const ListItem = ({
    exerciseTitle,
    exerciseDetail,
    exerciseURL,
    scores,
    index,
    disabled,
}: ListItemType & { scores: number[]; index: number; disabled: boolean }) => {
    const { toggleModalExecutionSettings } = useUIStore()

    return (
        <li
            className={
                disabled
                    ? 'flex items-center justify-between gap-10 opacity-30 pointer-events-none'
                    : 'flex items-center justify-between gap-10'
            }>
            <div className="flex items-center justify-between gap-10">
                <p className="text-[39px] font-bold text-[#3AB45C]">{index}</p>
                <div className="">
                    <p className={`${baseBolderFontForTitle}`}>
                        {exerciseTitle}
                    </p>
                    <p className="max-w-[350px] text-[13px] font-normal text-[#555B58]">
                        {exerciseDetail}
                    </p>
                </div>
            </div>
            {scores.length < 1 || scores.find((score) => isNaN(score)) ? (
                <button
                    role="link"
                    className={`${baseControlButtonLayout} text-white ${
                        disabled ? 'bg-[#D8D8D8]' : 'bg-[#3AB45C]'
                    }`}
                    onClick={() => toggleModalExecutionSettings(exerciseURL)}>
                    Iniciar
                </button>
            ) : (
                <div className="">
                    <p
                        className={`${baseBolderFontForTitle} text-[8px] text-center`}>
                        PONTUAÇÃO MÉDIA
                    </p>

                    {scores.map((score) => (
                        <p
                            className={`text-2xl font-bold ${
                                score > 50 ? 'text-[#3AB45C]' : 'text-[#F0D441]'
                            } text-center`}>
                            {score}
                        </p>
                    ))}
                </div>
            )}
        </li>
    )
}

export default ExerciseList
