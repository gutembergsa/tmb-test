const useSpacing = () => {
    const HorizontalSpace = ({ spacing = 10 }: { spacing: number }) => (
        <div
            className={`w-${spacing} h-full`}
            style={{ width: spacing, height: '100%' }}
        />
    )
    const VerticalSpace = ({ spacing = 10 }: { spacing: number }) => (
        <div
            className={`h-${spacing} w-full`}
            style={{ height: spacing, width: '100%' }}
        />
    )

    return { HorizontalSpace, VerticalSpace }
}

export default useSpacing
