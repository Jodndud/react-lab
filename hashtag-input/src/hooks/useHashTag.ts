import { useState } from "react"

export function useHashTag(maxCount: number = 5) {
    const [hashArr, setHashArr] = useState<string[]>([])
    const [hashTag, setHashTag] = useState<string>("")

    const addHashTag = () => {
        const trimmed = hashTag.trim()
        if (!trimmed || hashArr.length >= maxCount) return

        setHashArr(prev => prev.includes(trimmed) ? prev : [...prev, trimmed])
        setHashTag("")
    }

    const deleteTagButton = (tag: string) => {
        setHashArr(prev => prev.filter(t => t !== tag))
    }

    const deleteLastTag = () => {
        if (hashTag !== "" || hashArr.length === 0) return
        setHashArr(prev => prev.slice(0, -1))
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) return

        if (e.code === "Space") {
            e.preventDefault()
            addHashTag()
        }

        if (e.key === "Backspace") {
            deleteLastTag()
        }
    }

    return {
        hashArr,
        setHashArr,
        hashTag,
        setHashTag,
        addHashTag,
        deleteTagButton,
        handleKeyDown,
    }
}