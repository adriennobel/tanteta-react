import { useState } from "react";

const useToggleTrueFalse = () => {
    const [currentState, setCurrentState] = useState(false);

    function toggleTrueFalse() {
        setCurrentState(currentState => !currentState);
    }

    return { currentState, toggleTrueFalse };
}

export default useToggleTrueFalse;
