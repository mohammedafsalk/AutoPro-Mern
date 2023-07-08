
export default function forgotReducer(state, action) {
  switch(action.type){
    case 'otp': return {...state, otp:action.payload}
    case 'showModal': return {...state, showModal:true}
    case 'hideModal': return {...state, showModal:false}
    case 'err': return {...state, err:action.payload}
    default: return state
  }
}
