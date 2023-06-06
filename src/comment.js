const commentForm = document.getElementById("comment-form");
const inputName= commentForm.querySelector("#input-name");
const inputPwd= commentForm.querySelector("#input-pwd");
const inputComment = commentForm.querySelector("#input-comment");
const commentList = document.getElementById("comment-list");

const COMMENT_KEY = "comments";

// displayComment newComment가 호출될 때 그 텍스트를 배열에 할당할 공간을 만듬.
let comments = [];

function saveComments () {
    localStorage.setItem(COMMENT_KEY, JSON.stringify(comments));
}

function deleteComment(event) {
    const deleteLi = event.target.parentElement;

    deleteLi.remove();

    // 클릭한 li.id와 다른 comment는 남김
    // li.id 은 string type이기 때문에 parseInt를 사용하여 문자열을 숫자로 바꿔줌 
    comments = comments.filter((comment) => comment.id !== parseInt(deleteLi.id));
    saveComments();
   
}

function displayComment (newComment) {
    // console.log(newComment);
    const commentLi = document.createElement("Li");
    commentLi.id = newComment.id;

    const name = document.createElement("Span");
    name.innerText = newComment.name;
    name.id = "name";

    const pwd = document.createElement("Span");
    pwd.innerText = newComment.pwd;
    pwd.id = "pwd";

    const comment = document.createElement("Span");
    comment.innerText = newComment.comment;
    comment.id = "comment";
  

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", deleteComment);

    commentLi.appendChild(name);
    commentLi.appendChild(comment);
    commentLi.appendChild(deleteBtn);

    commentList.appendChild(commentLi);
}

function handleCommentSubmit(event) {
    event.preventDefault();
    // 유효성 검사
    // console.log(commentInput.value);

    // commentInput.value로 비우지만
    // newComment까지 비우는 것은 아님 input의 value를 새로운 변수에 복사
    const newComment = inputComment.value;
    const newName = inputName.value;
    const newPwd = inputPwd.value;

    inputComment.value = "";
    inputName.value = "";
    inputPwd.value = "";

    const newCommentObj = {
        name : newName,
        pwd : newPwd,
        comment : newComment,
        id : Date.now(),
    }

    // comments의 배열을 가지고 와서 newComment를 할당
    comments.push(newCommentObj);
    // 화면에 comment를 보여줌
    displayComment(newCommentObj);
    saveComments();
}

commentForm.addEventListener("submit", handleCommentSubmit);


const savedComments = localStorage.getItem(COMMENT_KEY);

if(savedComments !== null) {
    const parsedComments = JSON.parse(savedComments);
    // Comments가 항상 빈 array로 시작하기 때문에 
    // localStorage에 이전 값을 저장하여 새롭게 입력한 값을 추가함.
    comments = parsedComments;
    parsedComments.forEach(displayComment);
}

