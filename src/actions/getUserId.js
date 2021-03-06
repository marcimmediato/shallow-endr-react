import $ from 'jquery'

export default function getUserId(){
  return function(dispatch){
    $.ajax({
      url: 'https://shallow-endr-rails.herokuapp.com/users/getUserId',
      type: 'GET',
      data: { user: { jwt: localStorage.jwt } },
      dataType: "json",
      headers: { authorization: localStorage.jwt }
    }).done(function(response){
      dispatch({type: "GET_USER_ID", payload: response})
    })
  }
}
