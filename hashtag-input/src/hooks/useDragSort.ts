import { useRef } from "react"

export function useDragSort<T>(list: T[], setList: React.Dispatch<React.SetStateAction<T[]>>) {
    const dragItem = useRef<number | null>(null)
    const dragOverItem = useRef<number | null>(null)

    const dragStart = (idx: number) => {
        dragItem.current = idx
    }

    const dragEnter = (idx: number) => {
        dragOverItem.current = idx
    }

    const drop = () => {
        if (dragItem.current === null || dragOverItem.current === null) return

        const newList = [...list]
        const dragged = newList[dragItem.current]

        newList.splice(dragItem.current, 1)
        newList.splice(dragOverItem.current, 0, dragged)

        dragItem.current = null
        dragOverItem.current = null

        setList(newList)
    }

    return { dragStart, dragEnter, drop }
}