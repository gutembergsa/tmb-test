import {
    baseContentBoxStruct,
    baseControlButtonLayout,
} from '../../utils/tailwindTemplates'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useOrderStore, useUIStore } from '../../utils/zustand'

import CloseIcon from '../../assets/x-cross-icon.png'
import { useSpacing } from '../../hooks'
import type { Order } from '../../utils/config'

type CreateOrderModalInputs = Omit<Order, 'id' | 'createdAt'>

const CreateOrderModal = () => {
    const { VerticalSpace } = useSpacing()

    const { toggleModalCreateOrder } = useUIStore()

    const { createOrdersRequest } = useOrderStore()

    const { register, handleSubmit } = useForm<CreateOrderModalInputs>({
        defaultValues: { status: 'Pendente' },
    })

    const onSubmit: SubmitHandler<CreateOrderModalInputs> = (data) => {
        createOrdersRequest(data)
        toggleModalCreateOrder()
    }

    return (
        <div className="bg-[#00000080] fixed w-full h-full top-0 left-0 flex justify-center items-center">
            <form
                className={`${baseContentBoxStruct} w-[496px] p-[20px] grid gap-[24px]`}
                onSubmit={handleSubmit(onSubmit)}>
                <p className="col-span-full text-xl text-[#131514] font-bold flex align-middle justify-between">
                    Novo Pedido
                    <button onClick={toggleModalCreateOrder}>
                        <img src={CloseIcon} alt="close" />
                    </button>
                </p>
                <label className="col-span-full" htmlFor="cliente">
                    <p className="mb-[4px] text-base text-[#555B58] font-bold">
                        Cliente
                    </p>
                    <input
                        required
                        id="cliente"
                        type="text"
                        min={1}
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm"
                        {...register('cliente')}
                    />
                </label>
                <label className="col-span-full" htmlFor="cliente">
                    <p className="mb-[4px] text-base text-[#555B58] font-bold">
                        Produto
                    </p>
                    <input
                        required
                        id="produto"
                        type="text"
                        min={1}
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm"
                        {...register('produto')}
                    />
                </label>
                <label
                    className="relative col-span-full grid grid-cols-[150px_1fr] items-center"
                    htmlFor="valor">
                    <span className="text-sm text-[#555B58] font-bold">
                        Valor
                    </span>
                    <input
                        required
                        id="valor"
                        type="number"
                        className="w-full h-[48px] p-[16px] bg-[#EDF5F3] rounded-lg text-[#555B58] text-sm field-sizing-content disabled:opacity-[50%]"
                        inputMode="decimal"
                        placeholder="0,00"
                        min={0.0}
                        step="any"
                        {...register('valor')}
                    />
                </label>
                <VerticalSpace spacing={10} />
                <button
                    type="submit"
                    className={`${baseControlButtonLayout} ml-auto bg-[#3AB45C] w-min text-white text-xs`}>
                    Salvar
                </button>
            </form>
        </div>
    )
}

export default CreateOrderModal
