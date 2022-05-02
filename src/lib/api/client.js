import axios from "axios";

const client = axios.create();
/* client.interceptors.response.use(
    function (response) {
      // 응답 데이터를 가공
      // ...
      console.log(response);
      return response;
    },
    function (error) {
      // 오류 응답을 처리
      // ...
      console.log(error);
      return Promise.reject(error);
    }); */
/* 
    글로벌 설정 예시 :
    // API 주소를 다른 곳으로 사용함
    client.defaults.baseURL = 'https://external-api-server.com/'

    // 헤더 설정
    client.defaults.headers.comon['Authorization'] = 'Bearer a1b2c3d4';

    // 인터셉터 설정
    axios.interceptors.response.use({
        response => {
            // 요청 성공 시 특정 작업 수행
            return response;
        },
        error => {
            // 요청 실패 시 특정 작업 수행
            return Promise.reject(error);
        }
    })
*/

export default client;