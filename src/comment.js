const commentForm = document.getElementById("comment-form");
const inputMovieName = commentForm.querySelector("#input-movieName");
const inputName = commentForm.querySelector("#input-name");
const inputPwd = commentForm.querySelector("#input-pwd");
const inputComment = commentForm.querySelector("#input-comment");
const inputRate = commentForm.querySelector("#input-rate");
const commentList = document.getElementById("comment-list");

const COMMENT_KEY = "comments";

// 4. local storage 저장하기
// Local storage에는 array 저장 x, 텍스트만 저장 가능
// array가 업데이트 되어야 하므로 let 사용
let comments = [];

// 5. 자료를 string으로 바꾸기
// JSON.stringify([1, 2, 3, 4])
// > "[1, 2, 3, 4]" : string 으로 바꿔줌
function saveComments() {
  localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
}

// 댓글 delete
function deleteComment(event) {
  const deleteLi = event.target.parentElement;
  deleteLi.remove();
  comments = comments.filter((comment) => comment.id !== parseInt(deleteLi.id));
  // 첫 번째 id는 number, 두 번째 id는 string 이라서 처음에 작동이 안됨
  // parsInt를 이용해 문자를 숫자로 바꿔줌
  saveComments();
}

// 댓글 edit
function editComment(event) {
  const editLi = event.target.parentElement;
  const commentId = parseInt(editLi.id);

  const comment = comments.find((comment) => comment.id === commentId);
  if (comment) {
    inputMovieName.value = comment.movieName;
    inputName.value = comment.name;
    inputPwd.value = comment.pwd;
    inputComment.value = comment.comment;
    inputRate.value = comment.rate;

    comments = comments.filter((comment) => comment.id !== commentId);
    editLi.remove();
    saveComments();
  }
}

// 2. html 파일에 리스트 추가
function displayComment(newComment) {
  const commentLi = document.createElement("Li");
  commentLi.id = newComment.id; // 리스트에 고유 값을 지정하기 위해 id를 추가함

  const movieName = document.createElement("Span");
  movieName.innerText = newComment.movieName;
  movieName.id = "movieName";

  const name = document.createElement("Span");
  name.innerText = newComment.name;
  name.id = "name";

  const pwd = document.createElement("Span");
  pwd.innerText = newComment.pwd;
  pwd.id = "pwd";

  const comment = document.createElement("Span");
  comment.innerText = newComment.comment;
  comment.id = "comment";

  const rate = document.createElement("Span");
  rate.innerText = newComment.rate;
  rate.id = "rate";

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", deleteComment);
  deleteBtn.id = "list-btn";

  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.addEventListener("click", editComment);
  editBtn.id = "list-btn";

  commentLi.appendChild(movieName);
  commentLi.appendChild(comment);
  commentLi.appendChild(name);
  commentLi.appendChild(rate);
  commentLi.appendChild(deleteBtn);
  commentLi.appendChild(editBtn);

  commentList.appendChild(commentLi);
}

// 1. input 창 설정
function handleCommentSubmit(event) {
  event.preventDefault(); // 새로고침 제거

  const newMovieName = inputMovieName.value;
  const newName = inputName.value;
  const newPwd = inputPwd.value;
  const newComment = inputComment.value;
  const newRate = inputRate.value;

  inputMovieName.value = "";
  inputName.value = "";
  inputPwd.value = "";
  inputComment.value = "";
  inputRate.value = "";
  // 작성 후 input 값 공란으로 변경

  const newCommentObj = {
    movieName: newMovieName,
    name: newName,
    pwd: newPwd,
    comment: newComment,
    rate: newRate,
    id: Date.now(),
  };

  comments.push(newCommentObj); // push로 array에 배열 추가
  displayComment(newCommentObj);
  saveComments();
}

commentForm.addEventListener("submit", handleCommentSubmit);

// 6. sting을 array로 바꾸기
// JSON.parse("[1, 2, 3, 4]")
// > [1, 2, 3, 4] : string을 array 로 바꿔줌

// 7. array를 local storage에 저장하기
// 삭제 후 새로고침 했을 때 local storage의 정보가 다시 불러와지는 문제가 발생
const savedComments = localStorage.getItem(COMMENT_KEY);
if (savedComments !== null) {
  const parsedComments = JSON.parse(savedComments);
  comments = parsedComments; // 이전에 저장한 정보를 가져와서 새로고침해도 정보가 남아있도록 함
  parsedComments.forEach(displayComment);
}

// filter 함수는 반드시 true를 리턴함
// filter 함수를 사용해 false 요소를 감추고 true 요소만 가지고 array 생성 : 삭제 기능을 만들 수 있음
