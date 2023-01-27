import React, { useEffect } from "react";
import Die from "./components/die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
    const [diceArray, setDiceArray] = React.useState(allNewDice);
    const [tenzies, setTenzies] = React.useState(false);

    function allNewDice() {
        let diceArray = [];
        for (let i = 0; i < 10; i++) {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            diceArray.push({
                id: nanoid(),
                value: randomNumber,
                isHeld: false,
            });
        }
        return diceArray;
    }

    function rollDice() {
        if (tenzies) {
            setDiceArray(allNewDice);
        } else {
            setDiceArray((prevDiceArray) => {
                const diceArray = allNewDice();
                return prevDiceArray.map((item, index) => {
                    return item.isHeld === true ? item : diceArray[index];
                });
            });
        }
    }

    function holdDice(id) {
        setDiceArray((prevDiceArray) => {
            return prevDiceArray.map((item) => {
                return item.id === id
                    ? { ...item, isHeld: !item.isHeld }
                    : item;
            });
        });
    }

    React.useEffect(() => {
        const checkIsHeld = diceArray.every((item) => item.isHeld);
        const referenceNumber = diceArray[0].value;
        const checkSameValues = diceArray.every(
            (item) => item.value === referenceNumber
        );

        if (checkSameValues && checkIsHeld) {
            setTenzies(true);
            console.log("you won");
        } else {
            setTenzies(false);
        }
    }, [diceArray]);

    const dieElements = diceArray.map((item) => {
        return (
            <Die
                key={item.id}
                id={item.id}
                number={item.value}
                isHeld={item.isHeld}
                holdDice={() => holdDice(item.id)}
            />
        );
    });

    return (
        <main>
            {tenzies && (
                <Confetti
                    width={window.innerWidth}
                    height={window.innerHeight}
                />
            )}
            <h1>Tenzies</h1>
            <p>
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dices-div">{dieElements}</div>
            <button className="roll-btn" onClick={rollDice}>
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    );
}
