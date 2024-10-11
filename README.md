# 랜덤퀴즈 순위정하기 미니프로젝트

## 배포 웹사이트: https://random-quiz-ruby.vercel.app/

## 프로젝트 소개

- 제작 계기: 매일 스프린트 과정을 진행하면서 하게되는 팀미팅 시간에 팀원이 가져온 질문 한 가지씩을 랜덤으로 답변해보는 시간을 가지는데, 외부 랜덤추첨기를 사용했을 때 이름만 가지고 순위를 정해서 질문 따로 이름 따로 수동으로 매칭해야하는 번거로움이 있었습니다. 그러한 번거로움을 덜어보고자 만들게 되었습니다.

- 웹사이트가 기여할 수 있는 점
  - 질문과 답변을 하는 팀에서 랜덤으로 배정된 문제와 답변자를 보고 좀 더 빠르고 번거롭지 않게 진행할 수 있습니다.
  
- 제작 기간: 2024.10.05 ~ 2024.10.09
- 제작 인원: 1명 (프론트엔드 - 문창기)
- 사용 기술스택
  - 프론트엔드
    ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white)
    ![](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)
    ![](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white)
    ![](https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white)
    ![](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat-square&logo=TailwindCSS&logoColor=white)
  - 백엔드, 호스팅
    ![](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=MongoDB&logoColor=white)
    ![](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white)

## 시작 가이드

### 요구사항
  - React 18
  - Next.js 14.2.14
  - Tailwind CSS 3.4.1
  - Framer-motion 11.11.1
  - Typescript 5
  - react-hook-form 7.53.0
  - zod 3.23.8
  - react-hot-toast 2.4.1
  - mongoose 8.7.0
  - jotai 2.10.0
  - axios 1.7.7

### 설치

```
$ git clone https://github.com/byeolee1221/random-quiz.git
$ cd random-quiz
$ npm install
$ npm run dev
```

## 화면 구성

|                               팀 선택                                   |                            멤버 입력                                   |
| :--------------------------------------------------------------------: | :-------------------------------------------------------------------:  |
|       <img src="/public/images/team.png" width="400" height="400">     |    <img src="/public/images/member.png" width="400" height="400">      |
|                               질문 입력                                 |                            랜덤문제 및 답변자 배정                      |
|  <img src="/public/images/quesion.png" width="400" height="400">       |    <img src="/public/images/random.png" width="400" height="400">      |

## 주요 기능

### 랜덤문제 배정

- 아래와 같은 과정을 통해 한 팀의 각 팀원에게 특정 문제를 답변할 수 있도록 배정합니다.
  - 팀 선택
  - 팀원 입력 (최소 4명)
  - 질문 입력 (최소 4개)
  - 랜덤문제 생성 및 답변자 배정

### 출제자와 답변자 중복 시 다시 배정

- 출제자와 답변자가 같은 사람으로 배정되면 처음 과정부터 재시작할 필요없이 문제를 다시 한번 랜덤배정하여 진행할 수 있습니다.

## 피드백 반영 및 개선사항

- 각 단계별로 제출중일 때 버튼이 비활성화되도록 했습니다. (10.10)
- 팀원과 질문 입력 시 자동완성을 할 수 있도록 했습니다. (10.11)