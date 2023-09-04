import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";

interface AppStore {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    checkDisplayView: (viewSize: number) => void;
}

const useAppStore = create<AppStore>()(
    devtools(
        immer(
            (set) => ({
                isMobile: false,
                isTablet: false,
                isDesktop: false,
                checkDisplayView: (viewSize) => {
                    const breakPoints = {
                        isMobile: false,
                        isTablet: false,
                        isDesktop: false,
                    }

                    if (viewSize < 450) {
                        breakPoints.isMobile = true;
                    } else if (viewSize >= 450 && viewSize < 720){
                        breakPoints.isTablet = true;
                    } else {
                        breakPoints.isDesktop = true;
                    }

                    set(state => ({...state, ...breakPoints} as AppStore));
                }
            })
        )
    )
)

export default useAppStore;