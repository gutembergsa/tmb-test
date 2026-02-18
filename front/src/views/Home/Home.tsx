import { Chat, CreateOrderModal, Header } from '../../components'
import {
    baseBlockPaddingType1,
    baseControlButtonLayout,
    baseTableRowTemplate,
} from '../../utils/tailwindTemplates'
import { useSpacing } from '../../hooks'
import { useOrderStore, useUIStore } from '../../utils/zustand'
import { useEffect } from 'react'
import { HOME_TABLE_HEADERS, INTL_DATE_FORMAT } from '../../utils/config'

import DetailIcon from '../../assets/eye.png'
import { setupSignalRConnection } from '../../utils/fetch'

const Home = () => {
    const { VerticalSpace } = useSpacing()
    const { orders, getOrdersRequest } = useOrderStore()
    const { showModalCreateOrder, toggleModalCreateOrder } = useUIStore()

    useEffect(() => {
        getOrdersRequest()
        setupSignalRConnection()
    }, [])

    return (
        <>
            <div className="w-full">
                {' '}
                <Header />
                <VerticalSpace spacing={40} />
                <div className={`${baseBlockPaddingType1} w-full`}>
                    <p className={`text-2xl font-bold`}>Lista de Pedidos</p>
                    <VerticalSpace spacing={30} />
                    <p className="text-[13px] font-normal text-[#555B58]">
                        Duvidas? Converse com nosso chat!
                    </p>
                </div>
                <div
                    className={`${baseBlockPaddingType1} grid grid-cols-2 gap-6 justify-center max-[1042px]:grid-cols-1`}>
                    <div className="max-[1042px]:grid-row-2">
                        <VerticalSpace spacing={20} />
                        <div className="p-[20px] rounded-lg">
                            <Chat />
                        </div>
                    </div>

                    <div className="">
                        <div className="flex gap-[30px] justify-end">
                            <button
                                onClick={async () => toggleModalCreateOrder()}
                                className={`${baseControlButtonLayout} w-[130px] text-sm  bg-[#3AB45C] text-[#FFF]`}>
                                Criar pedido
                            </button>
                        </div>
                        <VerticalSpace spacing={50} />
                        <div className="scrollbar-thin-width">
                            <table className="max-[1279px]:overflow-x-auto w-full max-[1279px]:max-w-full rounded-[8px]">
                                <thead>
                                    <tr className={`${baseTableRowTemplate}`}>
                                        {Object.keys(HOME_TABLE_HEADERS).map(
                                            (v) => (
                                                <th>{v}</th>
                                            )
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="text-[13px] font-normal text-[#555B58] justify-self-center">
                                    <div className="overflow-y-auto max-h-[500px]">
                                        {orders.map((order) => (
                                            <tr
                                                className={`${baseTableRowTemplate}`}>
                                                <td className="justify-self-center content-center">
                                                    {order.cliente}
                                                </td>
                                                <td className="justify-self-center content-center">
                                                    {order.produto}
                                                </td>
                                                <td className="justify-self-center content-center">
                                                    {order.valor}
                                                </td>
                                                <td className="justify-self-center content-center">
                                                    {order.status}
                                                </td>
                                                <td className="justify-self-center content-center">
                                                    {new Intl.DateTimeFormat(
                                                        'pt-BR',
                                                        INTL_DATE_FORMAT
                                                    ).format(
                                                        new Date(
                                                            order.createdAt
                                                        )
                                                    )}
                                                </td>
                                                <td className="justify-self-center content-center">
                                                    <a
                                                        className={`${baseControlButtonLayout}`}
                                                        href={`/order/${order.id}`}>
                                                        <img
                                                            src={DetailIcon}
                                                            alt=""
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </div>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {showModalCreateOrder ? <CreateOrderModal /> : null}
        </>
    )
}
export default Home
