import React, { useCallback } from "react";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { AsideBoxItem, AsideBoxItemButton } from "../../styles";
import { AsideItemType } from "../../types/reduxType";
import { CHANGE_INCORRECT_NOTE_PAGE } from "../../reduxSaga/actionType/quiz";


const AsideItem: React.FC<AsideItemType> = ({ id, selectId, title }) => {
    const dispatch = useDispatch();
    const handleViewClick = useCallback((value: boolean) => () => {
        dispatch({ type: CHANGE_INCORRECT_NOTE_PAGE, payload: { id, isResultView: value } })
    }, [])


    return (
        <AsideBoxItem $color={id === selectId ? "blue" : ""}>
            <div>
                {title}
            </div>
            <AsideBoxItemButton>
                <Button size={"middle"} onClick={handleViewClick(false)}>오답노트</Button>
                <Button size={"middle"} onClick={handleViewClick(true)} >결과보기</Button>
            </AsideBoxItemButton>
        </AsideBoxItem>
    )
}

export default AsideItem;