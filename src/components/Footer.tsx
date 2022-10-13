import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "store/reducer";
import "stylesheets/Footer.scss";

export default function Footer() {
    const { timerId } = useSelector((state: State) => state.time);
    const [showList, setShowList] = useState<boolean>(false);

    return (
        <div className={`bottom-area ${timerId ? "hidden" : ""}`}>
            <span className="hint">
                <kbd>Tab</kbd> to restart test
            </span>
            <footer>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/ismailovic77/fast_typing">
                    <span>&lt;/&gt;</span> github
                </a>
                <span>
                    created by{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/ismailovic77">
                        @ismail_yh
                    </a>
                    <span>   </span>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/nizarst">
                        @Nizar_st
                    </a>
                    <span>   </span>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://github.com/Linazizi9">
                        @lina_zizi
                    </a>
                </span>
            </footer>
        </div>
    );
}
