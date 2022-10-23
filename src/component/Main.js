import React from 'react'
import Wrapper from './hoc/Wrapper'
import Screen from './hoc/Screen'
import ButtonBox from './hoc/ButtonBox'
import { Button } from 'react-bootstrap'
import { useState } from "react";

const Main = () => {
    const btnValues = [
        ["C", "+-", "X", "/"],
        [7, 8, 9, "DW"],
        [4, 5, 6, "-"],
        [1, 2, 3, "+"],
        [0, ".", "=", 'UP'],
    ];
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });
    return (
        <div>
            <Wrapper >
                <Screen value={calc.num ? calc.num : calc.res} />
                <ButtonBox>
                    {
                        btnValues.flat().map((btn, i) => {
                            return (
                                <Button
                                    key={i}
                                    onClick={
                                        btn === "C"
                                            ? resetClickHandler
                                            : btn === "+-"
                                                ? invertClickHandler
                                                : btn === "%"
                                                    ? percentClickHandler
                                                    : btn === "="
                                                        ? equalsClickHandler
                                                        : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                                            ? signClickHandler
                                                            : btn === "."
                                                                ? commaClickHandler
                                                                : numClickHandler
                                    }
                                    className={`fs-1 ${btn === "=" ? 'bg-danger' : 'bg-primary'}`}
                                >
                                    {btn}
                                </Button>
                            )
                        })
                    }
                </ButtonBox>
            </Wrapper>
        </div>
    )
}

export default Main