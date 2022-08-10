import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Checkbox, Wrap, WrapItem } from '@chakra-ui/react';
import { getPrefectureList, getPrefectureData, updatePref } from "../../population/populationSlice";

export const CheckBox = () => {
    const { result } = useSelector((state) => state.populations);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPrefectureList());
    }, [dispatch]);
    return(
        <Box
        as='div'
        width='90%'
        margin='0 auto'
        >
            <Box
            as='h2'
            fontSize='40px'
            color='#464646'
            marginTop='20px'
            >
                都道府県
            </Box>
            <Wrap
            marginTop='20px'
            >
            {result && result.map((pref,index) => {
                return (
                    <WrapItem
                    fontSize='20px'
                    border= 'solid 3px #464646'
                    borderRadius='10px'
                    spacing={10}
                    key={pref.prefCode}
                    >
                        <Checkbox
                        padding='0.5em 1em'
                        width='120px'
                        onChange={(e) => dispatch(getPrefectureData({id: index}),
                                        dispatch(updatePref({id:index, checked: e.target.checked})))}
                        >
                            {pref.prefName}
                        </Checkbox>
                    </WrapItem>
                )
            })}
            </Wrap>
        </Box>
    )
}