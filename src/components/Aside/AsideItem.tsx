import React, { useCallback } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AsideBoxItem, AsideBoxItemButton } from "../../styles/asideStyle";
import { AsideItemType } from "../../types/reduxType";
import { CHANGE_INCORRECT_NOTE_PAGE } from "../../reduxSaga/actionType/quiz";


const AsideItem: React.FC<AsideItemType> = ({ id, selectId, title }) => {
    const dispatch = useDispatch();
    const handleNoteClick = useCallback(() => {
        dispatch({ type: CHANGE_INCORRECT_NOTE_PAGE, payload: { id } })
    }, [])

    return (
        <AsideBoxItem $color={id === selectId ? "blue" : ""}>
            <div>
                {title}
            </div>
            <AsideBoxItemButton>
                <Button size={"middle"} onClick={handleNoteClick}>오답노트</Button>
                <Button size={"middle"}>결과보기</Button>
            </AsideBoxItemButton>
        </AsideBoxItem>
    )
}

export default AsideItem;