type GetUpdateCurrentStateType = {
  currentState: {
    currentCategory: string,
    currentSorting: string,
    sortingActivePopup: boolean,
    mobileActiveMenu: boolean
  }
}

type ReturnUpdateCurrentStateType = {
  currentCategory: string,
  currentSorting: string,
  sortingActivePopup: boolean,
  mobileActiveMenu: boolean
}

const updateCurrentStateList = (state: GetUpdateCurrentStateType, { type, payload }: any): ReturnUpdateCurrentStateType => {
   if (state === undefined) {
     return {
       currentCategory: 'all',
       currentSorting: 'популярности',
       sortingActivePopup: false,
       mobileActiveMenu: false
     }
   }

  switch (type) {
    case "TOGGLE_CURRENT_CATEGORY":
      return {
        ...state.currentState,
        currentCategory: payload,
      }
    case "CURRENT_SORTING":
      return {
        ...state.currentState,
        currentSorting: payload
      }
    case "SORTING_ACTIVE_POPUP":
      return {
        ...state.currentState,
        sortingActivePopup: payload
      }
    case "TOGGLE_MOBILE_ACTIVE_MENU":
      return {
        ...state.currentState,
        mobileActiveMenu: payload,
      }

    default:
      return state.currentState;
  }
}

export default updateCurrentStateList