import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {stateCallback} from "../../../Interfaces";
import {immer} from "zustand/middleware/immer";

interface AuthorizedStore {
    currentChapter?: string,
    setCurrentChapter: stateCallback<string>,
}

export const useAuthorizedStore = create<AuthorizedStore>()(
    devtools(
        immer((set) => ({
                setCurrentChapter: value => {
                    set(state => ({...state, currentChapter: value} as AuthorizedStore))
                }
            })
        )
    )
)