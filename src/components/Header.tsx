import { resetTest } from "helpers/resetTest";
import { useEffect, useState , useRef} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setTheme,
    setTime,
    setType,
    setWordList,
    timerSet,
} from "store/actions";
import { State } from "store/reducer";
import "stylesheets/Header.scss";
import "stylesheets/AnimatedTheme.scss";

export interface Options {
    time: number[];
    type: string[];
}

interface AnimationProps {
    top: number;
    left: number;
    theme: string;
}

export const options: Options = {
    time: [15, 30, 45, 60, 120],
    type: ["easy", "medium", "hard"],
};

export default function Header() {
    const {
        preferences: { timeLimit, theme, type },
        time: { timerId },
    } = useSelector((state: State) => state);
    //const [animationProps, setAnimationProps] = useState<AnimationProps | null>();
    const dispatch = useDispatch();
    const rendercount = useRef(1);

    // used to choose the value of the theme , type , time and then settig the world list {which will call the word reducer in the case SET_WORDLIST and then changes the state}

    useEffect(() => {
        const theme = localStorage.getItem("theme") || "default";
        const type = localStorage.getItem("type") || "easy";
        const time = parseInt(localStorage.getItem("time") || "60", 10);
        import(`wordlists/${type}.json`).then((words) => {
            dispatch(setWordList(words.default));
        });
        dispatch(timerSet(time));
        dispatch(setType(type));
        dispatch(setTime(time));
    }, [dispatch]);


    // happens every time we choose another value of time 
    useEffect(() => {
        if (timeLimit !== 0) {
            document.querySelector(".time")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${timeLimit}"]`)
                ?.classList.add("selected");
            dispatch(setTime(timeLimit));
            localStorage.setItem("time", `${timeLimit}`);
            resetTest();
        }
    }, [dispatch, timeLimit]);

    useEffect(() => {
        rendercount.current = rendercount.current + 1;
    })

    // Set Type difficulty
    useEffect(() => {
        if (type !== "") {
            document.querySelector(".type")?.childNodes.forEach((el) => {
                if (el instanceof HTMLButtonElement)
                    el.classList.remove("selected");
            });
            document
                .querySelector(`button[value="${type}"]`)
                ?.classList.add("selected");
            dispatch(setType(type));
            localStorage.setItem("type", type);
            resetTest();
        }
    }, [dispatch, type]);

    const handleOptions = ({ target, clientX, clientY }: React.MouseEvent) => {
        if (target instanceof HTMLButtonElement && target.dataset.option) {
            if (target.value === theme || +target.value === timeLimit) {
                target.blur();
                return;
            }
            switch (target.dataset.option) {
                case "time":
                    dispatch(setTime(+target.value));
                    break;
                case "type":
                    dispatch(setType(target.value));
                    break;
            }
            target.blur();
        }
    };

    return ( 
        <header className={timerId ? "hidden" : undefined}>
            <a href="." className="brand">
                typing-test
            </a>
            {console.log(`header rendered ${rendercount.current}`)}
            <div className="buttons">
                {Object.entries(options).map(([option, choices]) => (
                    <div key={option} className={option}>
                        {option}:
                        {choices.map((choice: string) => (
                            <button
                                className="mini"
                                key={choice}
                                data-option={option}
                                value={choice}
                                onClick={(e) => handleOptions(e)}>
                                {choice}
                            </button>
                        ))}
                    </div>
                ))}
            </div>

        </header>
    );
}