export default function loadingReducer(state, action) {
  switch (action.type) {
    case "start":
      return { ...state, loading: true };
    case "stop":
      return { ...state, loading: false };
    default:
      return state;
  }
}
