// type ExecutionSettingsModalType = {};

import {
    baseContentBoxStruct,
    baseControlButtonLayout,
} from '../../utils/tailwindTemplates'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useExecutionStore, useUIStore } from '../../utils/zustand'

import CloseIcon from '../../assets/x-cross-icon.png'
import { useSpacing } from '../../hooks'
import { useNavigate } from 'react-router'
import type { EXECUTION_SETTING } from '../../utils/config'

type ExecutionSettingsModalInputs = EXECUTION_SETTING

const ExecutionSettingsModal = () => {
    const { VerticalSpace } = useSpacing()
    const navigate = useNavigate()

    const {
        dataModalExecutionSettings: exerciseURL,
        toggleModalExecutionSettings,
    } = useUIStore()

    const { defineExecutionSettings } = useExecutionStore()

    const { register, handleSubmit, watch } =
        useForm<ExecutionSettingsModalInputs>({
            defaultValues: {
                isAuto: false,
                qtdSeries: 10,
                isAutoTimeInterval: 0,
                isAutoTimeLimit: 5,
            },
        })

    const onSubmit: SubmitHandler<ExecutionSettingsModalInputs> = (data) => {
        defineExecutionSettings(data)
        navigate(exerciseURL as string)
    }

    const isAuto = watch('isAuto')

    return (
        <div className="bg-[#00000080] fixed w-full h-full top-0 left-0 flex justify-center items-center">
            <form
                className={`${baseContentBoxStruct} w-[496px] p-[20px] grid gap-[24px]`}
                onSubmit={handleSubmit(onSubmit)}>
                <p className="col-span-full text-xl text-[#131514] font-bold flex align-middle justify-between">
                    Configurar Exercício
                    <button onClick={toggleModalExecutionSettings}>
                        <img src={CloseIcon} alt="close" />
                    </button>
                </p>
                <label className="col-span-full" htmlFor="qtdSeries">
                    <p className="mb-[4px] text-base text-[#555B58] font-bold">
                        Quantas repetições?
                    </p>
                    <input
                        id="qtdSeries"
                        type="number"
                        min={1}
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm"
                        {...register('qtdSeries')}
                    />
                </label>
                {/* <label className="col-span-full" htmlFor="qtdSeries">
                    <p className="mb-[4px] text-base text-[#555B58] font-bold">
                        Quantas repetições?
                    </p>
                    <input
                        id="qtdRepeticoes"
                        type="number"
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm"
                        defaultValue={0}
                        {...register('qtdRepeticoes')}
                    />
                </label> */}
                <VerticalSpace spacing={10} />
                <label
                    className="col-span-full flex items-center gap-[12px] cursor-pointer"
                    htmlFor="isAuto">
                    <input
                        id="isAuto"
                        type="checkbox"
                        className={`w-[24px] h-[24px] rounded-sm bg-[#EDF5F3] bg-center bg-no-repeat bg-size-[13px_9px] checked:bg-[#3AB45C] checked:bg-[url('https://q4hfcoxcg9qsukse.public.blob.vercel-storage.com/checkbox-check-icon.png')] cursor-pointer`}
                        min={1}
                        {...register('isAuto')}
                    />
                    <span className=" text-sm text-[#555B58] font-base">
                        Esta será uma execução automática.
                    </span>
                </label>
                <label
                    className="relative col-span-full grid grid-cols-[150px_1fr] items-center"
                    htmlFor="qtdSeries">
                    <span className="text-sm text-[#555B58] font-bold">
                        Tempo de <br /> execução
                    </span>
                    <input
                        id="isAutoTimeLimit"
                        type="number"
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm field-sizing-content disabled:opacity-[50%]"
                        defaultValue={5}
                        step={5}
                        min={5}
                        disabled={!isAuto}
                        {...register('isAutoTimeLimit')}
                    />
                    <span className="absolute right-[40px] text-xs text-[#555B58]">
                        Segundos
                    </span>
                </label>
                <label
                    className="relative col-span-full grid grid-cols-[150px_1fr] items-center"
                    htmlFor="qtdSeries">
                    <span className="text-sm text-[#555B58] font-bold">
                        Tempo de <br /> intervalo
                    </span>
                    <input
                        id="isAutoTimeInterval"
                        type="number"
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm field-sizing-content disabled:opacity-[50%]"
                        defaultValue={0}
                        step={5}
                        min={0}
                        disabled={!isAuto}
                        {...register('isAutoTimeInterval')}
                    />
                    <span className="absolute right-[40px] text-xs text-[#555B58]">
                        Segundos
                    </span>
                </label>
                <button
                    type="submit"
                    className={`${baseControlButtonLayout} ml-auto bg-[#3AB45C] w-min text-white text-xs`}>
                    Prosseguir
                </button>
            </form>
        </div>
    )
}

export default ExecutionSettingsModal
