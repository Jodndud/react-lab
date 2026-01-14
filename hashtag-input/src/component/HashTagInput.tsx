import { useDragSort } from "../hooks/useDragSort"
import { useHashTag } from "../hooks/useHashTag"

export default function HashTagInput(){
    const {
        hashArr, setHashArr,
        hashTag, setHashTag,
        deleteTagButton, handleKeyDown
    } = useHashTag(5)

    const { dragStart, dragEnter, drop } = useDragSort(hashArr, setHashArr)

    return(
        <div className="flex align-start gap-2 w-100">
            <span className="flex-1 pt-2 font-bold">태그</span>
            <div className="min-h-15 flex-4 flex-wrap flex items-start border-1 border-[#ddd] rounded-md py-1 px-4 text-sm">
                {hashArr.map((tag, idx) => {
                    return(
                        <div
                            key={idx}
                            className="flex gap-3 my-1 mr-2 bg-red-100 text-red-500 rounded-xs px-1 cursor-pointer"
                            onClick={() => deleteTagButton(tag)}
                            draggable
                            onDragStart={() => dragStart(idx)}
                            onDragEnter={() => dragEnter(idx)}
                            onDragEnd={drop}
                            onDragOver={(e) => {
                                e.preventDefault()
                                e.dataTransfer.dropEffect = "move"
                            }}
                        >
                            <p>#{tag}</p>
                            <p>x</p>
                        </div>
                    )
                })}
                <input
                    className="outline-none my-1"
                    type="text"
                    placeholder={hashArr.length < 5 ? "#태그 입력 (최대 5개)" : "최대 5개까지 입력"}
                    value={hashTag}
                    onChange={(e) => { setHashTag(e.target.value)}}
                    onCompositionEnd={(e) => {setHashTag(e.currentTarget.value)}}
                    onKeyDown={handleKeyDown}
                    disabled={hashArr.length >= 5}
                />
            </div>
        </div>
    )
}