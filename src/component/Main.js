import React from 'react'
import Wrapper from './hoc/Wrapper'
import Screen from './hoc/Screen'
import ButtonBox from './hoc/ButtonBox'
import { Button } from 'react-bootstrap'
import { useState } from "react";
const btnValues = [
    ["C", "+-", "X", "/"],
    [7, 8, 9, "DW"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    [0, ".", "=", "UP"],
];
const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const Main = () => {
    let [calc, setCalc] = useState({
        sign: "",
        num: 0,
        res: 0,
    });
    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                    calc.num === 0 && value === "0"
                        ? "0"
                        : removeSpaces(calc.num) % 1 === 0
                            ? toLocaleString(Number(removeSpaces(calc.num + value)))
                            : toLocaleString(calc.num + value),
                res: !calc.sign ? 0 : calc.res,
            });
        }
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: 0,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a, b, sign) =>
                sign === "+"
                    ? a + b
                    : sign === "-"
                        ? a - b
                        : sign === "X"
                            ? a * b
                            : sign === "UP" ? calc.num + calc.res
                                : sign === "DW" ? calc.num + calc.res :
                                    a / b
            setCalc({
                ...calc,
                res:
                    calc.num === "0" && calc.sign === "/"
                        ? "Can't divide with 0"
                        : toLocaleString(
                            math(
                                Number(removeSpaces(calc.res)),
                                Number(removeSpaces(calc.num)),
                                calc.sign
                            )
                        ),
                sign: "",
                num: 0,
            });
        }
    };

    const invertClickHandler = () => {
        setCalc({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
            res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

        setCalc({
            ...calc,
            num: (num /= Math.pow(100, 1)),
            res: (res /= Math.pow(100, 1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc({
            ...calc,
            sign: "",
            num: 0,
            res: 0,
        });
    };
    const upClickHandler = (e) => {
        if (calc.num) {
            setCalc({
                ...calc,
                sign: "UP",
                num: parseFloat(removeSpaces(calc.num)) + 1,
            })
        } else if (calc.res) {
            setCalc({
                ...calc,
                sign: "UP",
                res: parseFloat(removeSpaces(calc.res)) + 1,
            })
        }
    }
    const downClickHandler = () => {
        if (calc.num) {
            setCalc({
                ...calc,
                sign: "DW",
                num: parseFloat(removeSpaces(calc.num)) - 1,
            })
        } else if (calc.res) {
            setCalc({
                ...calc,
                sign: "DW",
                res: parseFloat(removeSpaces(calc.res)) - 1,
            })
        }
    }
    console.log(calc);
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
                                                                : btn === "UP"
                                                                    ? upClickHandler
                                                                    : btn === "DW"
                                                                        ? downClickHandler
                                                                        : numClickHandler
                                    }
                                    className={`fs-1 bg-opacity-50 ${btn === "=" ? 'bg-danger' : 'bg-gradient'}`}
                                >
                                    {btn}
                                </Button>
                            )
                        })
                    }
                </ButtonBox>
            </Wrapper>
        </div >
    )
}

export default Main