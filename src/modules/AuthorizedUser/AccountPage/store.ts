import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {stateCallback} from "../../../Interfaces";
import { immer } from "zustand/middleware/immer";
import Cookies from "universal-cookie";

const cookies = new Cookies();

interface AuthorizedStore {
    currentChapter?: string,
    setCurrentChapter: stateCallback<string>,
    token: string,
    setToken: stateCallback<string>
}

export const useAuthorizedStore = create<AuthorizedStore>()(
    devtools(
        immer((set) => (
                {
                    setCurrentChapter: value => {
                        set(state => ({...state, currentChapter: value} as AuthorizedStore))
                    },
                    token: cookies.get('tu_token') as string ?? '',
                    setToken: value => {
                        if (!value) {
                            cookies.remove('tu_token');
                        } else {
                            cookies.set('tu_token', value);
                        }

                        set(state => ({...state, token: value}));
                    }
                }
            )
        )
    )
)