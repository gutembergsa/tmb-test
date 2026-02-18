import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import type { Order } from '../../utils/config'
import { fetchOrdersById } from '../../utils/fetch'
import { Header } from '../../components'
import {
    baseBlockPaddingType1,
    baseControlButtonLayout,
} from '../../utils/tailwindTemplates'
import { useSpacing } from '../../hooks'

const OrderDetail = () => {
    const { VerticalSpace } = useSpacing()
    const { id } = useParams()
    const [order, setOrder] = useState<Order | null>()

    useEffect(() => {
        if (!id) return
        fetchOrdersById(id).then((order) => setOrder(order))
        return () => {
            setOrder(null)
        }
    }, [id])

    if (!order) return

    return (
        <div className="w-full">
            {' '}
            <Header />
            <VerticalSpace spacing={40} />
            <div className={`${baseBlockPaddingType1} flex justify-center`}>
                <div className="">
                    <p className={`text-2xl font-bold`}>Pedido {order.id}</p>
                    <p className="text-[13px] font-normal text-[#555B58]">
                        Feito em {order.createdAt}
                    </p>
                    <VerticalSpace spacing={50} />
                    <p className={`text-xl font-bold`}>Cliente</p>
                    <p className="text-[13px] font-normal text-[#555B58]">
                        {order.cliente}
                    </p>
                    <VerticalSpace spacing={20} />
                    <p className={`text-xl font-bold`}>Produto</p>
                    <p className="text-[13px] font-normal text-[#555B58]">
                        {order.produto}
                    </p>
                    <VerticalSpace spacing={20} />
                    <p className={`text-xl font-bold`}>Valor</p>
                    <p className="text-[13px] font-normal text-[#555B58]">
                        {order.valor}
                    </p>
                    <VerticalSpace spacing={20} />
                    <p className={`text-xl font-bold`}>Status</p>
                    <p className="text-[13px] font-normal text-[#555B58]">
                        {order.status}
                    </p>
                    <VerticalSpace spacing={20} />
                </div>
                <div className="">
                    <div className="flex gap-[30px] justify-end"></div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
