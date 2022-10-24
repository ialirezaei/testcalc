import Wrapper from './hoc/Wrapper'
import Screen from './hoc/Screen'
import ButtonBox from './hoc/ButtonBox'
import { Button } from 'react-bootstrap'
import { useState, } from "react";
const btnValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9, "+"],
    ["DW", 0, "UP", "="],
    ["*", "/", "-", "C"]
]

const Main2 = () => {
    const [calc, setCalc] = useState({
        number: 0,
        result: 0,
        opt: ""
    })
    var ops = ['+', '-', '*', '/', '=',];
    var regexp = new RegExp('^(' + ops.map(function (op) { return '\\' + op; }).join('|') + ')$');
    const log = (e) => {
        let value = e.target.innerHTML
        let num = value === "0" ? value = "0" : +value.split(/ /)[0].replace(/[^\d]/g, '');
        let opt = value.match(regexp);
        if (num) {
            setCalc({
                ...calc,
                number: num % 1 === 0 ? (calc.number ? parseInt((calc.number).toString() + (num).toString()) : num) : "",
                result: calc.result,
            })
        } else if (opt) {
            setCalc({
                ...calc,
                number: calc.result ? 0 : calc.number,
                result: calc.result ? calc.result : calc.number,
                opt: (opt ? opt[1] : calc.opt),
            })
        }
    }

    console.log(calc);
    const resetClickHandler = () => {
        setCalc({
            ...calc,
            number: 0,
            result: 0,
            opt: ''
        })

    }
    return (
        <div>
            <Wrapper >
                <Screen value={calc.number ? calc.number : calc.result} />
                <ButtonBox>
                    {
                        btnValues.flat().map((btn, i) => {
                            return (
                                <Button
                                    key={i}
                                    onClick={btn === "C" ? resetClickHandler : log}
                                    className={`fs-1 bg-opacity-50 ${btn === "=" ? 'btn-danger border-danger' : 'bg-gradient'} ${btn === "+" ? 'positive' : ''}`}
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

export default Main2