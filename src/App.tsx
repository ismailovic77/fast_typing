import { useEffect, useState , useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Header from "components/Header";
import Test from "components/Test";
import Result from "components/Result";
import Footer from "components/Footer";

//import CommandPallet from "components/CommandPallet";

import { State } from "store/reducer";
import { setTimerId } from "store/actions";

import { recordTest } from "helpers/recordTest";

import "stylesheets/themes.scss";



export default function App() {
    const {
        time: { timerId, timer },
        word: { currWord, typedWord, activeWordRef },
    } = useSelector((state: State) => state);
    const dispatch = useDispatch();

    const rendercount = useRef(1);

    useEffect(() => {
        document.onkeydown = (e) => {
            console.log("use effect in app 1")
            if (e.key.length === 1 || e.key === "Backspace" || e.key === "Tab") {
                recordTest(e.key, e.ctrlKey);
                e.preventDefault();
            }
        };
        return () => {
            document.onkeydown = null;
        };
    }, [dispatch]);


    // ca compare lettre par lettre du currWord et du typedWord
    useEffect(() => {
        let idx = typedWord.length - 1;
        const currWordEl = activeWordRef?.current!;
        if (currWordEl) {
            currWordEl.children[idx + 1].classList.add(
                currWord[idx] !== typedWord[idx] ? "wrong" : "right"
            );
        }
    }, [currWord, typedWord, activeWordRef]);


    //pas bien saisi l'interet 
    useEffect(() => {
        let idx = typedWord.length;
        const currWordEl = activeWordRef?.current!;
        if (currWordEl && idx < currWord.length)
            currWordEl.children[idx + 1].classList.remove("wrong", "right");
    }, [currWord.length, typedWord, activeWordRef]);

    //used for removing the intervall that decreses the timer , it will be removed when timer = 0 so we don't get negative values
    useEffect(() => {
        if (!timer && timerId) {
            clearInterval(timerId);
            dispatch(setTimerId(null));
        }
    }, [dispatch, timer, timerId]);

    useEffect(() => {
        rendercount.current = rendercount.current + 1;
    })


    return (
        <>
            <Header />
            {timer ? <Test /> : <Result />}
            {console.log(`app rendered ${rendercount.current}`)}
            <Footer />
        </>
    );
}