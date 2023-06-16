
// 브라우저가 현재 클라이언트의 호스트 이름 얻어오기
const clientHostName = window.location.hostname;

// 백엔드 서버 호스트 이름
let backEndHostName;

if(clientHostName === 'localhost') {
    backEndHostName = 'http://localhost:8181';
}